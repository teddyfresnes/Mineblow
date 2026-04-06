import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { ChunkCoord } from '../types/world';
import { floorDiv, mod } from '../utils/math';
import { hashString } from '../utils/noise';
import { BetaBiomeId, BetaBiomeSampler, SEA_LEVEL, type BetaBiomeDefinition } from './BetaBiomes';
import { BetaCaveGenerator } from './BetaCaveGenerator';
import { Chunk } from './Chunk';
import { chunkOriginX, chunkOriginZ, toChunkKey } from './ChunkCoord';
import { NoiseOctaves } from './LegacyNoise';
import { LegacyRandom } from './LegacyRandom';
import { getSignedPrecipitationTemperature } from './Precipitation';
import { WORLDGEN_PROFILE } from './WorldgenProfile';
import { isSnowCoverBlock } from './BlockRegistry';

const CHUNK_WIDTH = WORLD_CONFIG.chunkSizeX;
const CHUNK_HEIGHT = WORLD_CONFIG.chunkSizeY;
const CHUNK_DEPTH = WORLD_CONFIG.chunkSizeZ;
const CHUNK_VOLUME = CHUNK_WIDTH * CHUNK_HEIGHT * CHUNK_DEPTH;

const DENSITY_GRID_XZ = WORLDGEN_PROFILE.layout.coarseGridXZ;
const DENSITY_GRID_Y = WORLDGEN_PROFILE.layout.coarseGridY;
const INTERPOLATION_XZ = WORLDGEN_PROFILE.layout.coarseStepXZ;
const INTERPOLATION_Y = WORLDGEN_PROFILE.layout.coarseStepY;
const DENSITY_SCALE = WORLDGEN_PROFILE.terrainNoise.baseScale;
const MAX_CACHED_CHUNKS = WORLDGEN_PROFILE.cache.maxChunks;

const toSigned64 = (value: bigint): bigint => BigInt.asIntN(64, value);

const makeOdd = (value: bigint): bigint => {
  const signed = toSigned64(value);
  return toSigned64((signed / 2n) * 2n + 1n);
};

const columnIndex = (x: number, z: number, width: number): number => x + z * width;

const densityIndex = (x: number, y: number, z: number): number =>
  ((x * DENSITY_GRID_XZ) + z) * DENSITY_GRID_Y + y;

interface CachedChunk {
  blocks: Uint8Array;
  surfaceHeights: Uint8Array;
}

export class TerrainGenerator {
  private readonly worldSeed: bigint;
  private readonly minLimitNoise: NoiseOctaves;
  private readonly maxLimitNoise: NoiseOctaves;
  private readonly mainNoise: NoiseOctaves;
  private readonly surfaceNoise: NoiseOctaves;
  private readonly scaleNoise: NoiseOctaves;
  private readonly depthNoise: NoiseOctaves;
  private readonly biomeScaleNoise: NoiseOctaves;
  private readonly treeNoise: NoiseOctaves;
  private readonly biomeSampler: BetaBiomeSampler;
  private readonly caveGenerator: BetaCaveGenerator;

  private readonly chunkCache = new Map<string, CachedChunk>();
  private densityField: Float64Array | null = null;
  private sandNoise: Float64Array | null = null;
  private gravelNoise: Float64Array | null = null;
  private depthNoiseSurface: Float64Array | null = null;
  private lowFrequencyDepthNoise: Float64Array | null = null;
  private lowFrequencyScaleNoise: Float64Array | null = null;
  private minLimitNoiseField: Float64Array | null = null;
  private maxLimitNoiseField: Float64Array | null = null;
  private mainNoiseField: Float64Array | null = null;
  private snowTemperatureBuffer: Float64Array | null = null;

  constructor(seed: string) {
    this.worldSeed = toSigned64(BigInt(hashString(seed)));

    const random = new LegacyRandom(this.worldSeed);
    this.minLimitNoise = new NoiseOctaves(random, 16);
    this.maxLimitNoise = new NoiseOctaves(random, 16);
    this.mainNoise = new NoiseOctaves(random, 8);
    this.surfaceNoise = new NoiseOctaves(random, 4);
    this.scaleNoise = new NoiseOctaves(random, 4);
    this.depthNoise = new NoiseOctaves(random, 10);
    this.biomeScaleNoise = new NoiseOctaves(random, 16);
    this.treeNoise = new NoiseOctaves(random, 8);

    this.biomeSampler = new BetaBiomeSampler(this.worldSeed);
    this.caveGenerator = new BetaCaveGenerator(this.worldSeed);
  }

  getSurfaceHeight(worldX: number, worldZ: number): number {
    const chunkX = floorDiv(worldX, CHUNK_WIDTH);
    const chunkZ = floorDiv(worldZ, CHUNK_DEPTH);
    const localX = mod(worldX, CHUNK_WIDTH);
    const localZ = mod(worldZ, CHUNK_DEPTH);
    const snapshot = this.getChunkSnapshot({ x: chunkX, z: chunkZ });
    return snapshot.surfaceHeights[columnIndex(localX, localZ, CHUNK_WIDTH)];
  }

  getTerrainBlock(worldX: number, worldY: number, worldZ: number): BlockId {
    if (worldY < 0 || worldY >= CHUNK_HEIGHT) {
      return 0;
    }

    const chunkX = floorDiv(worldX, CHUNK_WIDTH);
    const chunkZ = floorDiv(worldZ, CHUNK_DEPTH);
    const localX = mod(worldX, CHUNK_WIDTH);
    const localZ = mod(worldZ, CHUNK_DEPTH);
    const snapshot = this.getChunkSnapshot({ x: chunkX, z: chunkZ });
    return snapshot.blocks[Chunk.getIndex(localX, worldY, localZ)] as BlockId;
  }

  generateChunk(coord: ChunkCoord): Chunk {
    const snapshot = this.getChunkSnapshot(coord);
    return new Chunk(coord, snapshot.blocks.slice());
  }

  sampleBiomeTemperatures(
    target: Float64Array | null,
    originX: number,
    originZ: number,
    width: number,
    depth: number,
  ): Float64Array {
    return this.biomeSampler.sampleTemperatures(target, originX + 8, originZ + 8, width, depth);
  }

  findSpawnPoint(): [number, number, number] {
    for (let radius = 0; radius <= 32; radius += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        for (let z = -radius; z <= radius; z += 1) {
          const surfaceY = this.getSurfaceHeight(x, z);
          if (surfaceY <= SEA_LEVEL || surfaceY >= CHUNK_HEIGHT - 8) {
            continue;
          }

          const block = this.getTerrainBlock(x, surfaceY, z);
          const above = this.getTerrainBlock(x, surfaceY + 1, z);
          if (above === 0 && block !== 10 && block !== 25) {
            return [x + 0.5, surfaceY + 1, z + 0.5];
          }
        }
      }
    }

    return [0.5, SEA_LEVEL + 2, 0.5];
  }

  private getChunkSnapshot(coord: ChunkCoord): CachedChunk {
    const key = toChunkKey(coord);
    const cached = this.chunkCache.get(key);
    if (cached) {
      return cached;
    }

    const generated = this.buildChunkSnapshot(coord);
    this.rememberChunk(key, generated);
    return generated;
  }

  private rememberChunk(key: string, snapshot: CachedChunk): void {
    if (this.chunkCache.size >= MAX_CACHED_CHUNKS) {
      const pruneTarget = Math.max(
        1,
        Math.floor(MAX_CACHED_CHUNKS * WORLDGEN_PROFILE.cache.pruneFraction),
      );
      let removed = 0;
      for (const cachedKey of this.chunkCache.keys()) {
        this.chunkCache.delete(cachedKey);
        removed += 1;
        if (removed >= pruneTarget) {
          break;
        }
      }
    }

    this.chunkCache.set(key, snapshot);
  }

  private buildChunkSnapshot(coord: ChunkCoord): CachedChunk {
    const blocks = new Uint8Array(CHUNK_VOLUME);
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);

    const biomeSample = this.biomeSampler.sampleBiomes(originX, originZ, CHUNK_WIDTH, CHUNK_DEPTH);

    this.generateBaseTerrain(coord, blocks, biomeSample.temperatures, biomeSample.rain);
    this.applySurface(coord, blocks, biomeSample.biomes);
    this.caveGenerator.apply(coord.x, coord.z, blocks);
    this.populate(coord, blocks, biomeSample.biomes);
    this.applySnow(coord, blocks);

    return {
      blocks,
      surfaceHeights: this.computeSurfaceHeights(blocks),
    };
  }

  private generateBaseTerrain(
    coord: ChunkCoord,
    blocks: Uint8Array,
    temperatures: Float64Array,
    rain: Float64Array,
  ): void {
    const density = this.sampleDensityField(coord, temperatures, rain);

    for (let coarseX = 0; coarseX < DENSITY_GRID_XZ - 1; coarseX += 1) {
      for (let coarseZ = 0; coarseZ < DENSITY_GRID_XZ - 1; coarseZ += 1) {
        for (let coarseY = 0; coarseY < DENSITY_GRID_Y - 1; coarseY += 1) {
          const yLerp = 0.125;
          let density00 = density[densityIndex(coarseX, coarseY, coarseZ)];
          let density01 = density[densityIndex(coarseX, coarseY, coarseZ + 1)];
          let density10 = density[densityIndex(coarseX + 1, coarseY, coarseZ)];
          let density11 = density[densityIndex(coarseX + 1, coarseY, coarseZ + 1)];
          const density00Step =
            (density[densityIndex(coarseX, coarseY + 1, coarseZ)] - density00) * yLerp;
          const density01Step =
            (density[densityIndex(coarseX, coarseY + 1, coarseZ + 1)] - density01) * yLerp;
          const density10Step =
            (density[densityIndex(coarseX + 1, coarseY + 1, coarseZ)] - density10) * yLerp;
          const density11Step =
            (density[densityIndex(coarseX + 1, coarseY + 1, coarseZ + 1)] - density11) * yLerp;

          for (let subY = 0; subY < INTERPOLATION_Y; subY += 1) {
            const xLerp = 0.25;
            let densityX0 = density00;
            let densityX1 = density01;
            const densityX0Step = (density10 - density00) * xLerp;
            const densityX1Step = (density11 - density01) * xLerp;

            for (let subX = 0; subX < INTERPOLATION_XZ; subX += 1) {
              const zLerp = 0.25;
              let densityAtPoint = densityX0;
              const densityAtPointStep = (densityX1 - densityX0) * zLerp;

              for (let subZ = 0; subZ < INTERPOLATION_XZ; subZ += 1) {
                const localX = coarseX * INTERPOLATION_XZ + subX;
                const localY = coarseY * INTERPOLATION_Y + subY;
                const localZ = coarseZ * INTERPOLATION_XZ + subZ;

                const temperature = temperatures[columnIndex(localX, localZ, CHUNK_WIDTH)];
                let block = this.pickFluidBlock(localY, temperature);

                if (densityAtPoint > 0) {
                  block = 3;
                }

                if (block !== 0) {
                  blocks[Chunk.getIndex(localX, localY, localZ)] = block;
                }
                densityAtPoint += densityAtPointStep;
              }

              densityX0 += densityX0Step;
              densityX1 += densityX1Step;
            }

            density00 += density00Step;
            density01 += density01Step;
            density10 += density10Step;
            density11 += density11Step;
          }
        }
      }
    }
  }

  private sampleDensityField(
    coord: ChunkCoord,
    temperatures: Float64Array,
    rain: Float64Array,
  ): Float64Array {
    const coarseStartX = coord.x * INTERPOLATION_XZ;
    const coarseStartZ = coord.z * INTERPOLATION_XZ;

    this.lowFrequencyDepthNoise = this.depthNoise.generateNoise2D(
      this.lowFrequencyDepthNoise,
      coarseStartX,
      coarseStartZ,
      DENSITY_GRID_XZ,
      DENSITY_GRID_XZ,
      WORLDGEN_PROFILE.terrainNoise.depthFieldScale,
      WORLDGEN_PROFILE.terrainNoise.depthFieldScale,
    );
    this.lowFrequencyScaleNoise = this.biomeScaleNoise.generateNoise2D(
      this.lowFrequencyScaleNoise,
      coarseStartX,
      coarseStartZ,
      DENSITY_GRID_XZ,
      DENSITY_GRID_XZ,
      WORLDGEN_PROFILE.terrainNoise.elevationFieldScale,
      WORLDGEN_PROFILE.terrainNoise.elevationFieldScale,
    );
    this.mainNoiseField = this.mainNoise.generateNoise(
      this.mainNoiseField,
      coarseStartX,
      0,
      coarseStartZ,
      DENSITY_GRID_XZ,
      DENSITY_GRID_Y,
      DENSITY_GRID_XZ,
      DENSITY_SCALE / 80,
      DENSITY_SCALE / 160,
      DENSITY_SCALE / 80,
    );
    this.minLimitNoiseField = this.minLimitNoise.generateNoise(
      this.minLimitNoiseField,
      coarseStartX,
      0,
      coarseStartZ,
      DENSITY_GRID_XZ,
      DENSITY_GRID_Y,
      DENSITY_GRID_XZ,
      DENSITY_SCALE,
      DENSITY_SCALE,
      DENSITY_SCALE,
    );
    this.maxLimitNoiseField = this.maxLimitNoise.generateNoise(
      this.maxLimitNoiseField,
      coarseStartX,
      0,
      coarseStartZ,
      DENSITY_GRID_XZ,
      DENSITY_GRID_Y,
      DENSITY_GRID_XZ,
      DENSITY_SCALE,
      DENSITY_SCALE,
      DENSITY_SCALE,
    );

    if (!this.densityField || this.densityField.length < DENSITY_GRID_XZ * DENSITY_GRID_Y * DENSITY_GRID_XZ) {
      this.densityField = new Float64Array(DENSITY_GRID_XZ * DENSITY_GRID_Y * DENSITY_GRID_XZ);
    }

    let densityWriteIndex = 0;
    let climateReadIndex = 0;
    const climateScale = Math.floor(CHUNK_WIDTH / DENSITY_GRID_XZ);

    for (let coarseX = 0; coarseX < DENSITY_GRID_XZ; coarseX += 1) {
      const sampleX = coarseX * climateScale + Math.floor(climateScale / 2);

      for (let coarseZ = 0; coarseZ < DENSITY_GRID_XZ; coarseZ += 1) {
        const sampleZ = coarseZ * climateScale + Math.floor(climateScale / 2);
        const climateIndex = columnIndex(sampleX, sampleZ, CHUNK_WIDTH);
        const temperature = temperatures[climateIndex];
        const humidity = rain[climateIndex] * temperature;

        let climateBlend = 1 - humidity;
        climateBlend *= climateBlend;
        climateBlend *= climateBlend;
        climateBlend = 1 - climateBlend;

        let depth = (this.lowFrequencyDepthNoise[climateReadIndex] + 256) / 512;
        depth *= climateBlend;
        if (depth > 1) {
          depth = 1;
        }

        let scale = this.lowFrequencyScaleNoise[climateReadIndex] / 8000;
        if (scale < 0) {
          scale = -scale * 0.3;
        }
        scale = scale * 3 - 2;

        if (scale < 0) {
          scale /= 2;
          if (scale < -1) {
            scale = -1;
          }
          scale /= 1.4;
          scale /= 2;
          depth = 0;
        } else {
          if (scale > 1) {
            scale = 1;
          }
          scale /= 8;
        }

        if (depth < 0) {
          depth = 0;
        }
        depth += 0.5;

        scale = (scale * DENSITY_GRID_Y) / 16;
        const centerHeight = DENSITY_GRID_Y / 2 + scale * 4;

        climateReadIndex += 1;

        for (let coarseY = 0; coarseY < DENSITY_GRID_Y; coarseY += 1) {
          let value: number;
          let verticalGradient = ((coarseY - centerHeight) * 12) / depth;
          if (verticalGradient < 0) {
            verticalGradient *= 4;
          }

          const minValue = this.minLimitNoiseField[densityWriteIndex] / 512;
          const maxValue = this.maxLimitNoiseField[densityWriteIndex] / 512;
          const noiseMix = (this.mainNoiseField[densityWriteIndex] / 10 + 1) / 2;

          if (noiseMix < 0) {
            value = minValue;
          } else if (noiseMix > 1) {
            value = maxValue;
          } else {
            value = minValue + (maxValue - minValue) * noiseMix;
          }

          value -= verticalGradient;
          if (coarseY > DENSITY_GRID_Y - WORLDGEN_PROFILE.terrainNoise.roofFadeSlices) {
            const alpha = (
              coarseY - (DENSITY_GRID_Y - WORLDGEN_PROFILE.terrainNoise.roofFadeSlices)
            ) / (WORLDGEN_PROFILE.terrainNoise.roofFadeSlices - 1);
            value = value * (1 - alpha) + -10 * alpha;
          }

          this.densityField[densityWriteIndex] = value;
          densityWriteIndex += 1;
        }
      }
    }

    return this.densityField;
  }

  private applySurface(coord: ChunkCoord, blocks: Uint8Array, biomes: BetaBiomeDefinition[]): void {
    const random = new LegacyRandom(
      toSigned64(
        BigInt(coord.x) * WORLDGEN_PROFILE.seeds.terrainX +
        BigInt(coord.z) * WORLDGEN_PROFILE.seeds.terrainZ,
      ),
    );
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);
    const noiseScale = WORLDGEN_PROFILE.surfaceNoise.baseScale;

    this.sandNoise = this.surfaceNoise.generateNoise(
      this.sandNoise,
      originX,
      originZ,
      0,
      CHUNK_WIDTH,
      CHUNK_DEPTH,
      1,
      noiseScale,
      noiseScale,
      1,
    );
    this.gravelNoise = this.surfaceNoise.generateNoise(
      this.gravelNoise,
      originX,
      WORLDGEN_PROFILE.surfaceNoise.gravelYOffset,
      originZ,
      CHUNK_WIDTH,
      1,
      CHUNK_DEPTH,
      noiseScale,
      1,
      noiseScale,
    );
    this.depthNoiseSurface = this.scaleNoise.generateNoise(
      this.depthNoiseSurface,
      originX,
      originZ,
      0,
      CHUNK_WIDTH,
      CHUNK_DEPTH,
      1,
      noiseScale * 2,
      noiseScale * 2,
      noiseScale * 2,
    );

    for (let localX = 0; localX < CHUNK_WIDTH; localX += 1) {
      for (let localZ = 0; localZ < CHUNK_DEPTH; localZ += 1) {
        const noiseIndex = localX * CHUNK_DEPTH + localZ;
        const biome = biomes[columnIndex(localX, localZ, CHUNK_WIDTH)];

        const useSand = this.sandNoise[noiseIndex] + random.nextDouble() * 0.2 > 0;
        const useGravel = this.gravelNoise[noiseIndex] + random.nextDouble() * 0.2 > 3;
        const surfaceDepth = Math.floor(this.depthNoiseSurface[noiseIndex] / 3 + 3 + random.nextDouble() * 0.25);

        let layerDepth = -1;
        let topBlock: BlockId = biome.topBlock;
        let fillerBlock: BlockId = biome.fillerBlock;

        for (let y = CHUNK_HEIGHT - 1; y >= 0; y -= 1) {
          const index = Chunk.getIndex(localX, y, localZ);

          if (y <= random.nextInt(5)) {
            blocks[index] = 6;
            continue;
          }

          const block = blocks[index] as BlockId;
          if (block === 0) {
            layerDepth = -1;
            continue;
          }
          if (block !== 3) {
            continue;
          }

          if (layerDepth === -1) {
            if (surfaceDepth <= 0) {
              topBlock = 0;
              fillerBlock = 3;
            } else if (y >= SEA_LEVEL - WORLDGEN_PROFILE.hydrology.shorelineBand && y <= SEA_LEVEL + 1) {
              topBlock = biome.topBlock;
              fillerBlock = biome.fillerBlock;
              if (useGravel) {
                topBlock = 0;
                fillerBlock = 16;
              }
              if (useSand) {
                topBlock = 11;
                fillerBlock = 11;
              }
            }

            if (y < SEA_LEVEL && topBlock === 0) {
              topBlock = 10;
            }

            layerDepth = surfaceDepth;
            blocks[index] = y >= SEA_LEVEL - 1 ? topBlock : fillerBlock;
            continue;
          }

          if (layerDepth > 0) {
            layerDepth -= 1;
            blocks[index] = fillerBlock;
            if (layerDepth === 0 && fillerBlock === 11) {
              layerDepth = random.nextInt(4);
              fillerBlock = 17;
            }
          }
        }
      }
    }
  }

  private populate(coord: ChunkCoord, blocks: Uint8Array, biomes: BetaBiomeDefinition[]): void {
    const random = this.getPopulateRandom(coord);
    const biome = biomes[columnIndex(8, 8, CHUNK_WIDTH)];

    this.generateOrePass(random, blocks, 2, 20, 32, CHUNK_HEIGHT);
    this.generateOrePass(random, blocks, 16, 10, 32, CHUNK_HEIGHT);
    this.generateOrePass(random, blocks, 18, 20, 16, CHUNK_HEIGHT);
    this.generateOrePass(random, blocks, 19, 20, 8, 64);
    this.generateOrePass(random, blocks, 20, 2, 8, 32);
    this.generateOrePass(random, blocks, 21, 8, 7, 16);
    this.generateOrePass(random, blocks, 22, 1, 7, 16);
    this.generateOrePass(random, blocks, 23, 1, 6, 32);

    this.populateTrees(random, blocks, biome, coord);
    this.populateFlora(random, blocks, biome);
    this.generateWaterSprings(random, blocks);
  }

  private populateTrees(
    random: LegacyRandom,
    blocks: Uint8Array,
    biome: BetaBiomeDefinition,
    coord: ChunkCoord,
  ): void {
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);
    let treeCount = Math.floor(
      (
        this.treeNoise.generateNoiseForCoordinate(originX * 0.5, originZ * 0.5) / 8 +
        random.nextDouble() * 4 +
        4
      ) / 3,
    );

    if (random.nextInt(10) === 0) {
      treeCount += 1;
    }

    if (biome.id === BetaBiomeId.Forest || biome.id === BetaBiomeId.Rainforest || biome.id === BetaBiomeId.Taiga) {
      treeCount += treeCount + 5;
    } else if (biome.id === BetaBiomeId.SeasonalForest) {
      treeCount += treeCount + 2;
    } else if (
      biome.id === BetaBiomeId.Desert ||
      biome.id === BetaBiomeId.Tundra ||
      biome.id === BetaBiomeId.Plains
    ) {
      treeCount -= 20;
    }

    if (treeCount <= 0) {
      return;
    }

    for (let index = 0; index < treeCount; index += 1) {
      const localX = random.nextInt(CHUNK_WIDTH);
      const localZ = random.nextInt(CHUNK_DEPTH);
      const surfaceY = this.getHighestSolidY(blocks, localX, localZ);
      if (surfaceY <= 0 || surfaceY >= CHUNK_HEIGHT - 8) {
        continue;
      }
      if (localX < 2 || localX > CHUNK_WIDTH - 3 || localZ < 2 || localZ > CHUNK_DEPTH - 3) {
        continue;
      }

      const height = random.nextInt(10) === 0
        ? 7 + random.nextInt(4)
        : 4 + random.nextInt(3);
      this.placeTree(blocks, localX, surfaceY + 1, localZ, height, random);
    }
  }

  private placeTree(
    blocks: Uint8Array,
    trunkX: number,
    trunkY: number,
    trunkZ: number,
    height: number,
    random: LegacyRandom,
  ): void {
    if (trunkY <= 1 || trunkY + height + 1 >= CHUNK_HEIGHT) {
      return;
    }

    const groundIndex = Chunk.getIndex(trunkX, trunkY - 1, trunkZ);
    const ground = blocks[groundIndex] as BlockId;
    if (ground !== 1 && ground !== 2) {
      return;
    }

    for (let y = trunkY; y <= trunkY + 1 + height; y += 1) {
      const radius = y === trunkY ? 0 : y >= trunkY + height - 1 ? 2 : 1;
      for (let x = trunkX - radius; x <= trunkX + radius; x += 1) {
        for (let z = trunkZ - radius; z <= trunkZ + radius; z += 1) {
          if (!this.isInside(x, y, z)) {
            return;
          }
          const block = blocks[Chunk.getIndex(x, y, z)] as BlockId;
          if (
            block !== 0 &&
            block !== 5 &&
            block !== 14 &&
            block !== 15 &&
            !isSnowCoverBlock(block)
          ) {
            return;
          }
        }
      }
    }

    blocks[groundIndex] = 2;

    for (let y = trunkY - 3 + height; y <= trunkY + height; y += 1) {
      const yOffset = y - (trunkY + height);
      const radius = yOffset < 0 ? 2 : 1;
      for (let x = trunkX - radius; x <= trunkX + radius; x += 1) {
        const dx = Math.abs(x - trunkX);
        for (let z = trunkZ - radius; z <= trunkZ + radius; z += 1) {
          const dz = Math.abs(z - trunkZ);
          if (!this.isInside(x, y, z)) {
            continue;
          }
          if (dx === radius && dz === radius && random.nextInt(2) === 0 && yOffset !== 0) {
            continue;
          }
          const leafIndex = Chunk.getIndex(x, y, z);
          if (this.canReplaceForLeaves(blocks[leafIndex] as BlockId)) {
            blocks[leafIndex] = 5;
          }
        }
      }
    }

    for (let y = 0; y < height; y += 1) {
      const index = Chunk.getIndex(trunkX, trunkY + y, trunkZ);
      const block = blocks[index] as BlockId;
      if (block === 0 || block === 5 || block === 14 || block === 15 || isSnowCoverBlock(block)) {
        blocks[index] = 4;
      }
    }
  }

  private canReplaceForLeaves(block: BlockId): boolean {
    return block === 0 || block === 5 || block === 14 || block === 15 || isSnowCoverBlock(block);
  }

  private populateFlora(
    random: LegacyRandom,
    blocks: Uint8Array,
    biome: BetaBiomeDefinition,
  ): void {
    let flowerCount = 0;
    if (biome.id === BetaBiomeId.Forest) flowerCount = 2;
    if (biome.id === BetaBiomeId.SeasonalForest) flowerCount = 4;
    if (biome.id === BetaBiomeId.Taiga) flowerCount = 2;
    if (biome.id === BetaBiomeId.Plains) flowerCount = 3;

    let grassCount = 0;
    if (biome.id === BetaBiomeId.Forest) grassCount = 2;
    if (biome.id === BetaBiomeId.Rainforest) grassCount = 10;
    if (biome.id === BetaBiomeId.SeasonalForest) grassCount = 2;
    if (biome.id === BetaBiomeId.Taiga) grassCount = 1;
    if (biome.id === BetaBiomeId.Plains) grassCount = 10;

    for (let index = 0; index < flowerCount; index += 1) {
      this.placeSurfacePlant(random, blocks, 15);
    }
    for (let index = 0; index < grassCount; index += 1) {
      this.placeSurfacePlant(random, blocks, 14);
    }

    if (random.nextInt(2) === 0) {
      this.placeSurfacePlant(random, blocks, 15);
    }
  }

  private placeSurfacePlant(random: LegacyRandom, blocks: Uint8Array, blockId: BlockId): void {
    const localX = random.nextInt(CHUNK_WIDTH);
    const localZ = random.nextInt(CHUNK_DEPTH);
    const surfaceY = this.getHighestSolidY(blocks, localX, localZ);
    const plantY = surfaceY + 1;

    if (!this.isInside(localX, plantY, localZ)) {
      return;
    }

    const support = blocks[Chunk.getIndex(localX, plantY - 1, localZ)] as BlockId;
    if (support !== 1 && support !== 2 && support !== 11 && support !== 16) {
      return;
    }

    const index = Chunk.getIndex(localX, plantY, localZ);
    if (blocks[index] === 0) {
      blocks[index] = blockId;
    }
  }

  private generateWaterSprings(random: LegacyRandom, blocks: Uint8Array): void {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      const x = random.nextInt(CHUNK_WIDTH);
      const y = random.nextInt(random.nextInt(120) + 8);
      const z = random.nextInt(CHUNK_DEPTH);
      if (!this.isInside(x, y, z) || y <= 0 || y >= CHUNK_HEIGHT - 1) {
        continue;
      }

      const centerIndex = Chunk.getIndex(x, y, z);
      if (blocks[centerIndex] !== 3) {
        continue;
      }
      if (blocks[Chunk.getIndex(x, y + 1, z)] !== 3 || blocks[Chunk.getIndex(x, y - 1, z)] !== 3) {
        continue;
      }

      let solidSides = 0;
      let airSides = 0;
      const neighbors: Array<[number, number, number]> = [
        [x - 1, y, z],
        [x + 1, y, z],
        [x, y, z - 1],
        [x, y, z + 1],
      ];
      for (const [nx, ny, nz] of neighbors) {
        if (!this.isInside(nx, ny, nz)) {
          continue;
        }
        const neighbor = blocks[Chunk.getIndex(nx, ny, nz)] as BlockId;
        if (neighbor === 3) {
          solidSides += 1;
        } else if (neighbor === 0) {
          airSides += 1;
        }
      }

      if (solidSides === 3 && airSides === 1) {
        blocks[centerIndex] = 10;
      }
    }
  }

  private generateOrePass(
    random: LegacyRandom,
    blocks: Uint8Array,
    blockId: BlockId,
    count: number,
    veinSize: number,
    maxY: number,
  ): void {
    for (let index = 0; index < count; index += 1) {
      const x = random.nextInt(CHUNK_WIDTH);
      const y = random.nextInt(Math.min(CHUNK_HEIGHT, maxY));
      const z = random.nextInt(CHUNK_DEPTH);
      this.generateOreVein(random, blocks, blockId, veinSize, x, y, z);
    }
  }

  private generateOreVein(
    random: LegacyRandom,
    blocks: Uint8Array,
    blockId: BlockId,
    veinSize: number,
    startX: number,
    startY: number,
    startZ: number,
  ): void {
    if (veinSize <= 0) {
      return;
    }

    const angle = random.nextFloat() * Math.PI;
    const x0 = startX + Math.sin(angle) * veinSize / 8;
    const x1 = startX - Math.sin(angle) * veinSize / 8;
    const z0 = startZ + Math.cos(angle) * veinSize / 8;
    const z1 = startZ - Math.cos(angle) * veinSize / 8;
    const y0 = startY + random.nextInt(3) + 2;
    const y1 = startY + random.nextInt(3) + 2;

    for (let step = 0; step <= veinSize; step += 1) {
      const centerX = x0 + (x1 - x0) * step / veinSize;
      const centerY = y0 + (y1 - y0) * step / veinSize;
      const centerZ = z0 + (z1 - z0) * step / veinSize;
      const radiusNoise = random.nextDouble() * veinSize / 16;
      const radius = (Math.sin((step * Math.PI) / veinSize) + 1) * radiusNoise + 1;
      const radiusY = radius;

      const minX = Math.floor(centerX - radius / 2);
      const minY = Math.floor(centerY - radiusY / 2);
      const minZ = Math.floor(centerZ - radius / 2);
      const maxX = Math.floor(centerX + radius / 2);
      const maxY = Math.floor(centerY + radiusY / 2);
      const maxZ = Math.floor(centerZ + radius / 2);

      for (let x = minX; x <= maxX; x += 1) {
        const nx = (x + 0.5 - centerX) / (radius / 2);
        if (nx * nx >= 1) {
          continue;
        }
        for (let y = minY; y <= maxY; y += 1) {
          const ny = (y + 0.5 - centerY) / (radiusY / 2);
          if (nx * nx + ny * ny >= 1) {
            continue;
          }
          for (let z = minZ; z <= maxZ; z += 1) {
            const nz = (z + 0.5 - centerZ) / (radius / 2);
            if (nx * nx + ny * ny + nz * nz >= 1) {
              continue;
            }
            if (!this.isInside(x, y, z)) {
              continue;
            }
            const index = Chunk.getIndex(x, y, z);
            if (blocks[index] === 3) {
              blocks[index] = blockId;
            }
          }
        }
      }
    }
  }

  private applySnow(coord: ChunkCoord, blocks: Uint8Array): void {
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);
    this.snowTemperatureBuffer = this.sampleBiomeTemperatures(
      this.snowTemperatureBuffer,
      originX,
      originZ,
      CHUNK_WIDTH,
      CHUNK_DEPTH,
    );

    for (let localX = 0; localX < CHUNK_WIDTH; localX += 1) {
      for (let localZ = 0; localZ < CHUNK_DEPTH; localZ += 1) {
        const topY = this.getHighestNonAirY(blocks, localX, localZ);
        if (topY <= 0 || topY >= CHUNK_HEIGHT - 1) {
          continue;
        }

        const signedTemperature = getSignedPrecipitationTemperature(
          this.snowTemperatureBuffer[columnIndex(localX, localZ, CHUNK_WIDTH)],
          topY,
        );
        if (signedTemperature >= 0) {
          continue;
        }

        const topIndex = Chunk.getIndex(localX, topY, localZ);
        const aboveIndex = Chunk.getIndex(localX, topY + 1, localZ);
        const topBlock = blocks[topIndex] as BlockId;

        if (topBlock === 10) {
          blocks[topIndex] = 25;
          continue;
        }

        if (blocks[aboveIndex] !== 0) {
          continue;
        }
        if (!this.canSupportSnow(topBlock)) {
          continue;
        }

        blocks[aboveIndex] = 33;
      }
    }
  }

  private canSupportSnow(blockId: BlockId): boolean {
    return (
      blockId !== 0 &&
      blockId !== 10 &&
      blockId !== 4 &&
      blockId !== 5 &&
      blockId !== 14 &&
      blockId !== 15 &&
      !isSnowCoverBlock(blockId)
    );
  }

  private computeSurfaceHeights(blocks: Uint8Array): Uint8Array {
    const heights = new Uint8Array(CHUNK_WIDTH * CHUNK_DEPTH);
    for (let localX = 0; localX < CHUNK_WIDTH; localX += 1) {
      for (let localZ = 0; localZ < CHUNK_DEPTH; localZ += 1) {
        heights[columnIndex(localX, localZ, CHUNK_WIDTH)] = this.getHighestSolidY(
          blocks,
          localX,
          localZ,
        );
      }
    }
    return heights;
  }

  private getHighestNonAirY(blocks: Uint8Array, localX: number, localZ: number): number {
    for (let y = CHUNK_HEIGHT - 1; y >= 0; y -= 1) {
      if (blocks[Chunk.getIndex(localX, y, localZ)] !== 0) {
        return y;
      }
    }
    return 0;
  }

  private getHighestSolidY(blocks: Uint8Array, localX: number, localZ: number): number {
    for (let y = CHUNK_HEIGHT - 1; y >= 0; y -= 1) {
      const block = blocks[Chunk.getIndex(localX, y, localZ)] as BlockId;
      if (
        block === 0 ||
        block === 10 ||
        block === 4 ||
        block === 5 ||
        block === 14 ||
        block === 15 ||
        isSnowCoverBlock(block)
      ) {
        continue;
      }
      return y;
    }
    return 0;
  }

  private getPopulateRandom(coord: ChunkCoord): LegacyRandom {
    const random = new LegacyRandom(this.worldSeed);
    const seedX = makeOdd(random.nextLong());
    const seedZ = makeOdd(random.nextLong());
    const chunkSeed = toSigned64(
      BigInt(coord.x) * seedX + BigInt(coord.z) * seedZ ^ this.worldSeed,
    );
    random.setSeed(chunkSeed);
    return random;
  }

  private pickFluidBlock(localY: number, temperature: number): BlockId {
    if (localY >= SEA_LEVEL) {
      return 0;
    }

    const isSurfaceSlice = localY >= SEA_LEVEL - 1;
    const shouldFreeze = getSignedPrecipitationTemperature(temperature, localY) < 0;
    return isSurfaceSlice && shouldFreeze ? 25 : 10;
  }

  private isInside(localX: number, localY: number, localZ: number): boolean {
    return (
      localX >= 0 &&
      localX < CHUNK_WIDTH &&
      localZ >= 0 &&
      localZ < CHUNK_DEPTH &&
      localY >= 0 &&
      localY < CHUNK_HEIGHT
    );
  }
}
