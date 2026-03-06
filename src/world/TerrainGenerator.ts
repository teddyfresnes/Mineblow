import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { ChunkCoord } from '../types/world';
import { clamp } from '../utils/math';
import { hashString, ValueNoise2D } from '../utils/noise';
import { Chunk } from './Chunk';
import { chunkOriginX, chunkOriginZ } from './ChunkCoord';
import { TreeGenerator } from './TreeGenerator';

interface RiverSample {
  strength: number;
  depth: number;
  widthNoise: number;
  waterLevel: number;
}

interface TerrainColumn {
  surfaceHeight: number;
  biome: 'plains' | 'rolling' | 'peaks' | 'river';
  rockySurface: boolean;
  slope: number;
  riverStrength: number;
  riverDepth: number;
  waterLevel: number;
  sediment: 'sand' | 'clay' | 'mud' | 'dirt';
}

export class TerrainGenerator {
  private readonly continentalNoise: ValueNoise2D;
  private readonly hillNoise: ValueNoise2D;
  private readonly detailNoise: ValueNoise2D;
  private readonly peakMaskNoise: ValueNoise2D;
  private readonly peakRidgeNoise: ValueNoise2D;
  private readonly stonePatchNoise: ValueNoise2D;
  private readonly riverNoiseA: ValueNoise2D;
  private readonly riverNoiseB: ValueNoise2D;
  private readonly riverWarpNoise: ValueNoise2D;
  private readonly coverNoise: ValueNoise2D;
  private readonly sedimentNoise: ValueNoise2D;
  private readonly treeGenerator: TreeGenerator;
  private readonly columnCache = new Map<string, TerrainColumn>();

  constructor(seed: string) {
    this.continentalNoise = new ValueNoise2D(hashString(`${seed}:continental`));
    this.hillNoise = new ValueNoise2D(hashString(`${seed}:hills`));
    this.detailNoise = new ValueNoise2D(hashString(`${seed}:detail`));
    this.peakMaskNoise = new ValueNoise2D(hashString(`${seed}:peak-mask`));
    this.peakRidgeNoise = new ValueNoise2D(hashString(`${seed}:peak-ridge`));
    this.stonePatchNoise = new ValueNoise2D(hashString(`${seed}:stone-patch`));
    this.riverNoiseA = new ValueNoise2D(hashString(`${seed}:river-a`));
    this.riverNoiseB = new ValueNoise2D(hashString(`${seed}:river-b`));
    this.riverWarpNoise = new ValueNoise2D(hashString(`${seed}:river-warp`));
    this.coverNoise = new ValueNoise2D(hashString(`${seed}:cover`));
    this.sedimentNoise = new ValueNoise2D(hashString(`${seed}:sediment`));
    this.treeGenerator = new TreeGenerator(seed);
  }

  getSurfaceHeight(worldX: number, worldZ: number): number {
    return this.sampleColumn(worldX, worldZ).surfaceHeight;
  }

  getTerrainBlock(worldX: number, worldY: number, worldZ: number): BlockId {
    if (worldY <= 0) {
      return 6;
    }

    const column = this.sampleColumn(worldX, worldZ);
    if (worldY > column.surfaceHeight) {
      if (worldY <= column.waterLevel && column.riverStrength > 0.04) {
        return 10;
      }
      return 0;
    }

    const dirtDepth = this.getDirtDepth(column);
    const underwater = column.riverStrength > 0.04 && column.surfaceHeight <= column.waterLevel;

    if (worldY === column.surfaceHeight) {
      if (underwater) {
        return this.sedimentToBlock(column.sediment);
      }
      return column.rockySurface ? 3 : 1;
    }

    if (worldY >= column.surfaceHeight - dirtDepth) {
      if (underwater && worldY >= column.surfaceHeight - Math.max(1, dirtDepth - 1)) {
        return column.sediment === 'mud' ? 13 : 2;
      }
      return 2;
    }

    return 3;
  }

  generateChunk(coord: ChunkCoord): Chunk {
    const blocks = new Uint8Array(
      WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeY * WORLD_CONFIG.chunkSizeZ,
    );
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);

    for (let localX = 0; localX < WORLD_CONFIG.chunkSizeX; localX += 1) {
      for (let localZ = 0; localZ < WORLD_CONFIG.chunkSizeZ; localZ += 1) {
        const worldX = originX + localX;
        const worldZ = originZ + localZ;
        const column = this.sampleColumn(worldX, worldZ);

        const maxY = Math.min(WORLD_CONFIG.chunkSizeY - 1, Math.max(column.surfaceHeight, column.waterLevel));
        for (let worldY = 0; worldY <= maxY; worldY += 1) {
          const blockId = this.getTerrainBlock(worldX, worldY, worldZ);
          if (blockId !== 0) {
            blocks[Chunk.getIndex(localX, worldY, localZ)] = blockId;
          }
        }
      }
    }

    this.treeGenerator.applyTrees(
      blocks,
      coord,
      this.getSurfaceHeight.bind(this),
      this.getTerrainBlock.bind(this),
      (worldX, worldZ, surfaceY) => this.canSpawnTreeAt(worldX, worldZ, surfaceY),
    );
    this.applyGroundCover(blocks, coord);

    return new Chunk(coord, blocks);
  }

  findSpawnPoint(): [number, number, number] {
    for (let radius = 0; radius <= 14; radius += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        for (let z = -radius; z <= radius; z += 1) {
          const column = this.sampleColumn(x, z);
          if (
            column.surfaceHeight < WORLD_CONFIG.chunkSizeY - 8 &&
            column.riverStrength < 0.06 &&
            column.slope <= 1.2
          ) {
            return [x + 0.5, column.surfaceHeight + 1, z + 0.5];
          }
        }
      }
    }

    return [0.5, 40, 0.5];
  }

  private canSpawnTreeAt(worldX: number, worldZ: number, surfaceY: number): boolean {
    const column = this.sampleColumn(worldX, worldZ);
    if (column.surfaceHeight !== surfaceY) {
      return false;
    }

    return (
      column.biome !== 'peaks' &&
      column.riverStrength < 0.08 &&
      !column.rockySurface &&
      column.slope < 1.9
    );
  }

  private applyGroundCover(chunkBlocks: Uint8Array, coord: ChunkCoord): void {
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);

    for (let localX = 0; localX < WORLD_CONFIG.chunkSizeX; localX += 1) {
      for (let localZ = 0; localZ < WORLD_CONFIG.chunkSizeZ; localZ += 1) {
        const worldX = originX + localX;
        const worldZ = originZ + localZ;
        const column = this.sampleColumn(worldX, worldZ);
        const topY = column.surfaceHeight;
        if (topY < 2 || topY >= WORLD_CONFIG.chunkSizeY - 2) {
          continue;
        }
        if (column.riverStrength > 0.09 || column.rockySurface || column.biome === 'peaks') {
          continue;
        }
        if (this.getTerrainBlock(worldX, topY, worldZ) !== 1) {
          continue;
        }

        const localNoise = this.coverNoise.fractal(worldX, worldZ, 2, 0.16, 0.5);
        if (localNoise < 0.48) {
          continue;
        }

        const plantY = topY + 1;
        const localIndex = Chunk.getIndex(localX, plantY, localZ);
        if (chunkBlocks[localIndex] !== 0) {
          continue;
        }

        chunkBlocks[localIndex] = localNoise > 0.82 ? 15 : 14;
      }
    }
  }

  private getDirtDepth(column: TerrainColumn): number {
    if (column.rockySurface) {
      return 1;
    }
    if (column.biome === 'rolling') {
      return 3;
    }
    return column.slope < 0.9 ? 4 : 3;
  }

  private sedimentToBlock(sediment: TerrainColumn['sediment']): BlockId {
    switch (sediment) {
      case 'sand':
        return 11;
      case 'clay':
        return 12;
      case 'mud':
        return 13;
      case 'dirt':
      default:
        return 2;
    }
  }

  private sampleColumn(worldX: number, worldZ: number): TerrainColumn {
    const cacheKey = `${worldX},${worldZ}`;
    const cached = this.columnCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const river = this.sampleRiver(worldX, worldZ);
    const baseHeight = this.sampleBaseHeight(worldX, worldZ);
    const surfaceHeight = clamp(
      Math.round(baseHeight - river.depth),
      4,
      WORLD_CONFIG.chunkSizeY - 8,
    );
    const slope = this.estimateSlope(worldX, worldZ, surfaceHeight);
    const hillSignal = this.hillNoise.fractal(worldX, worldZ, 3, 0.0095, 0.56);
    const peakMask = clamp(
      (this.peakMaskNoise.fractal(worldX, worldZ, 3, 0.0025, 0.54) - 0.46) / 0.4,
      0,
      1,
    );
    const ridgeSignal = 1 - Math.abs(this.peakRidgeNoise.fractal(worldX, worldZ, 4, 0.0085, 0.56));
    const peakStrength = peakMask * Math.pow(clamp((ridgeSignal - 0.57) / 0.43, 0, 1), 1.5);
    const stonePatch = this.stonePatchNoise.fractal(worldX, worldZ, 2, 0.03, 0.5);

    let biome: TerrainColumn['biome'] = 'plains';
    if (river.strength > 0.11 && surfaceHeight <= river.waterLevel + 1) {
      biome = 'river';
    } else if (peakStrength > 0.24) {
      biome = 'peaks';
    } else if (hillSignal > 0.2 || slope > 1.2) {
      biome = 'rolling';
    }

    const rockySurface =
      biome === 'peaks' ||
      surfaceHeight >= 56 ||
      slope >= 2.4 ||
      (slope >= 1.9 && stonePatch > 0.26) ||
      stonePatch > 0.81;
    const sedimentNoise = this.sedimentNoise.fractal(worldX, worldZ, 2, 0.02, 0.52);
    const sediment: TerrainColumn['sediment'] =
      sedimentNoise > 0.36 ? 'clay' : sedimentNoise < -0.36 ? 'mud' : river.widthNoise > 0.62 ? 'sand' : 'dirt';

    const column: TerrainColumn = {
      surfaceHeight,
      biome,
      rockySurface,
      slope,
      riverStrength: river.strength,
      riverDepth: river.depth,
      waterLevel: river.waterLevel,
      sediment,
    };

    if (this.columnCache.size > 16384) {
      this.columnCache.clear();
    }
    this.columnCache.set(cacheKey, column);
    return column;
  }

  private sampleBaseHeight(worldX: number, worldZ: number): number {
    const continental = this.continentalNoise.fractal(worldX, worldZ, 3, 0.0038, 0.56) * 3.8;
    const rollingHills = this.hillNoise.fractal(worldX, worldZ, 4, 0.0115, 0.55) * 5.9;
    const microRelief = this.detailNoise.fractal(worldX, worldZ, 2, 0.04, 0.5) * 1.4;
    const peakMask = clamp(
      (this.peakMaskNoise.fractal(worldX, worldZ, 3, 0.0025, 0.54) - 0.48) / 0.38,
      0,
      1,
    );
    const ridgeSignal = 1 - Math.abs(this.peakRidgeNoise.fractal(worldX, worldZ, 4, 0.0085, 0.56));
    const peakShape = Math.pow(clamp((ridgeSignal - 0.58) / 0.42, 0, 1), 1.8);
    const rarePeaks = peakMask * (6 + peakShape * 18);

    return 30 + continental + rollingHills + microRelief + rarePeaks;
  }

  private sampleRiver(worldX: number, worldZ: number): RiverSample {
    const warp = this.riverWarpNoise.fractal(worldX, worldZ, 2, 0.0035, 0.55) * 18;
    const riverX = worldX + warp;
    const riverZ = worldZ - warp * 0.72;
    const primary = Math.abs(this.riverNoiseA.fractal(riverX, riverZ, 3, 0.0047, 0.56));
    const secondary = Math.abs(this.riverNoiseB.fractal(riverX * 1.21, riverZ * 1.21, 2, 0.0088, 0.53));
    const riverChannel = Math.min(primary, secondary * 0.82 + 0.055);

    const widthNoise = clamp(
      (this.riverNoiseB.fractal(worldX - 340, worldZ + 410, 2, 0.0029, 0.5) + 1) * 0.5,
      0,
      1,
    );
    const width = 0.046 + widthNoise * 0.1;
    const strength = clamp((width - riverChannel) / width, 0, 1);
    const depthNoise = clamp(
      (this.detailNoise.fractal(worldX + 820, worldZ - 700, 2, 0.01, 0.55) + 1) * 0.5,
      0,
      1,
    );
    const baseDepth = 1.6 + (1 - widthNoise) * 2.8 + depthNoise * 1.8;
    const depth = Math.pow(strength, 1.45) * baseDepth;

    const waterLevel = 30 + Math.round(this.continentalNoise.fractal(worldX + 1200, worldZ - 1200, 2, 0.0018, 0.5) * 2);
    return {
      strength,
      depth,
      widthNoise,
      waterLevel,
    };
  }

  private estimateSlope(worldX: number, worldZ: number, centerHeight: number): number {
    const dxPos = Math.abs(this.sampleBaseHeight(worldX + 1, worldZ) - centerHeight);
    const dxNeg = Math.abs(this.sampleBaseHeight(worldX - 1, worldZ) - centerHeight);
    const dzPos = Math.abs(this.sampleBaseHeight(worldX, worldZ + 1) - centerHeight);
    const dzNeg = Math.abs(this.sampleBaseHeight(worldX, worldZ - 1) - centerHeight);
    return Math.max(dxPos, dxNeg, dzPos, dzNeg);
  }
}
