import type { BlockId } from '../types/blocks';
import { hashString } from '../utils/noise';

export const SEA_LEVEL = 63;

export enum BiomeId {
  Ocean = 0,
  Plains = 1,
  Desert = 2,
  ExtremeHills = 3,
  Forest = 4,
  Taiga = 5,
  Swampland = 6,
  River = 7,
  FrozenOcean = 10,
  FrozenRiver = 11,
  IcePlains = 12,
  IceMountains = 13,
  MushroomIsland = 14,
  MushroomShore = 15,
  Beach = 16,
  DesertHills = 17,
  ForestHills = 18,
  TaigaHills = 19,
  ExtremeHillsEdge = 20,
  Jungle = 21,
  JungleHills = 22,
  JungleEdge = 23,
  DeepOcean = 24,
}

export interface BiomeDefinition {
  id: BiomeId;
  key: string;
  rootHeight: number;
  heightVariation: number;
  topBlock: BlockId;
  fillerBlock: BlockId;
  temperature: 'cold' | 'temperate' | 'warm';
  isOcean?: boolean;
  isRiver?: boolean;
  isBeach?: boolean;
}

const DEFAULT_BIOME: BiomeDefinition = {
  id: BiomeId.Plains,
  key: 'plains',
  rootHeight: 0.125,
  heightVariation: 0.05,
  topBlock: 1,
  fillerBlock: 2,
  temperature: 'temperate',
};

const BIOMES: Record<BiomeId, BiomeDefinition> = {
  [BiomeId.Ocean]: { id: BiomeId.Ocean, key: 'ocean', rootHeight: -1, heightVariation: 0.1, topBlock: 11, fillerBlock: 11, temperature: 'temperate', isOcean: true },
  [BiomeId.Plains]: { id: BiomeId.Plains, key: 'plains', rootHeight: 0.125, heightVariation: 0.05, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.Desert]: { id: BiomeId.Desert, key: 'desert', rootHeight: 0.125, heightVariation: 0.05, topBlock: 11, fillerBlock: 11, temperature: 'warm' },
  [BiomeId.ExtremeHills]: { id: BiomeId.ExtremeHills, key: 'extreme_hills', rootHeight: 1, heightVariation: 0.5, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.Forest]: { id: BiomeId.Forest, key: 'forest', rootHeight: 0.1, heightVariation: 0.2, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.Taiga]: { id: BiomeId.Taiga, key: 'taiga', rootHeight: 0.2, heightVariation: 0.2, topBlock: 1, fillerBlock: 2, temperature: 'cold' },
  [BiomeId.Swampland]: { id: BiomeId.Swampland, key: 'swampland', rootHeight: -0.2, heightVariation: 0.1, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.River]: { id: BiomeId.River, key: 'river', rootHeight: -0.5, heightVariation: 0, topBlock: 1, fillerBlock: 2, temperature: 'temperate', isRiver: true },
  [BiomeId.FrozenOcean]: { id: BiomeId.FrozenOcean, key: 'frozen_ocean', rootHeight: -1, heightVariation: 0.1, topBlock: 11, fillerBlock: 11, temperature: 'cold', isOcean: true },
  [BiomeId.FrozenRiver]: { id: BiomeId.FrozenRiver, key: 'frozen_river', rootHeight: -0.5, heightVariation: 0, topBlock: 11, fillerBlock: 11, temperature: 'cold', isRiver: true },
  [BiomeId.IcePlains]: { id: BiomeId.IcePlains, key: 'ice_plains', rootHeight: 0.125, heightVariation: 0.05, topBlock: 1, fillerBlock: 2, temperature: 'cold' },
  [BiomeId.IceMountains]: { id: BiomeId.IceMountains, key: 'ice_mountains', rootHeight: 0.45, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'cold' },
  [BiomeId.MushroomIsland]: { id: BiomeId.MushroomIsland, key: 'mushroom_island', rootHeight: 0.2, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.MushroomShore]: { id: BiomeId.MushroomShore, key: 'mushroom_shore', rootHeight: 0, heightVariation: 0.025, topBlock: 11, fillerBlock: 11, temperature: 'temperate', isBeach: true },
  [BiomeId.Beach]: { id: BiomeId.Beach, key: 'beach', rootHeight: 0, heightVariation: 0.025, topBlock: 11, fillerBlock: 11, temperature: 'temperate', isBeach: true },
  [BiomeId.DesertHills]: { id: BiomeId.DesertHills, key: 'desert_hills', rootHeight: 0.45, heightVariation: 0.3, topBlock: 11, fillerBlock: 11, temperature: 'warm' },
  [BiomeId.ForestHills]: { id: BiomeId.ForestHills, key: 'forest_hills', rootHeight: 0.45, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.TaigaHills]: { id: BiomeId.TaigaHills, key: 'taiga_hills', rootHeight: 0.45, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'cold' },
  [BiomeId.ExtremeHillsEdge]: { id: BiomeId.ExtremeHillsEdge, key: 'extreme_hills_edge', rootHeight: 0.8, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'temperate' },
  [BiomeId.Jungle]: { id: BiomeId.Jungle, key: 'jungle', rootHeight: 0.1, heightVariation: 0.2, topBlock: 1, fillerBlock: 2, temperature: 'warm' },
  [BiomeId.JungleHills]: { id: BiomeId.JungleHills, key: 'jungle_hills', rootHeight: 0.45, heightVariation: 0.3, topBlock: 1, fillerBlock: 2, temperature: 'warm' },
  [BiomeId.JungleEdge]: { id: BiomeId.JungleEdge, key: 'jungle_edge', rootHeight: 0.1, heightVariation: 0.2, topBlock: 1, fillerBlock: 2, temperature: 'warm' },
  [BiomeId.DeepOcean]: { id: BiomeId.DeepOcean, key: 'deep_ocean', rootHeight: -1.8, heightVariation: 0.1, topBlock: 16, fillerBlock: 16, temperature: 'temperate', isOcean: true },
};

const CLIMATE_WARM = 1;
const CLIMATE_MEDIUM = 2;
const CLIMATE_COLD = 3;
const CLIMATE_ICE = 4;

const warmBiomeChoices = [BiomeId.Desert, BiomeId.Desert, BiomeId.Desert, BiomeId.Plains, BiomeId.Plains, BiomeId.Forest, BiomeId.Jungle] as const;
const mediumBiomeChoices = [BiomeId.Forest, BiomeId.Forest, BiomeId.Plains, BiomeId.ExtremeHills, BiomeId.Swampland] as const;
const coldBiomeChoices = [BiomeId.Forest, BiomeId.Taiga, BiomeId.Plains, BiomeId.ExtremeHills] as const;
const iceBiomeChoices = [BiomeId.IcePlains, BiomeId.IcePlains, BiomeId.Taiga] as const;

const parabolicField = (() => {
  const values = new Float64Array(25);
  let index = 0;
  for (let z = -2; z <= 2; z += 1) {
    for (let x = -2; x <= 2; x += 1) {
      values[index] = 10 / Math.sqrt(x * x + z * z + 0.2);
      index += 1;
    }
  }
  return values;
})();

const mix32 = (value: number): number => {
  let hash = value | 0;
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x7feb352d);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x846ca68b);
  hash ^= hash >>> 16;
  return hash | 0;
};

const coordHash = (seed: number, x: number, z: number, salt: number): number =>
  mix32(seed ^ salt ^ Math.imul(x, 374761393) ^ Math.imul(z, 668265263));

const selectRandom = <T>(rng: () => number, values: readonly T[]): T =>
  values[Math.floor(rng() * values.length)] as T;

const isOceanic = (biomeId: number): boolean =>
  biomeId === BiomeId.Ocean || biomeId === BiomeId.DeepOcean || biomeId === BiomeId.FrozenOcean;

const isJungleFamily = (biomeId: number): boolean =>
  biomeId === BiomeId.Jungle || biomeId === BiomeId.JungleHills || biomeId === BiomeId.JungleEdge;

const clampBiomeId = (value: number): BiomeId => {
  if (Object.hasOwn(BIOMES, value)) {
    return value as BiomeId;
  }
  return BiomeId.Plains;
};

const hasAnyOceanNeighbor = (north: number, east: number, south: number, west: number): boolean =>
  isOceanic(north) || isOceanic(east) || isOceanic(south) || isOceanic(west);

abstract class GenLayer {
  protected worldSeed = 0;
  private readonly seedSalt: number;

  constructor(seedSalt: string, protected readonly parent: GenLayer | null = null) {
    this.seedSalt = hashString(`genlayer:${seedSalt}`) | 0;
  }

  initWorldSeed(seed: number): void {
    this.worldSeed = mix32(seed ^ this.seedSalt ^ 0x9e3779b9);
    if (this.parent) {
      this.parent.initWorldSeed(seed);
    }
  }

  protected createRng(x: number, z: number): () => number {
    let state = coordHash(this.worldSeed, x, z, this.seedSalt);
    return () => {
      state = (Math.imul(state, 1664525) + 1013904223) | 0;
      return (state >>> 0) / 4294967296;
    };
  }

  protected nextInt(rng: () => number, bound: number): number {
    return Math.floor(rng() * bound);
  }

  abstract getInts(x: number, z: number, width: number, height: number): Int32Array;
}

class GenLayerIsland extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    const output = new Int32Array(width * height);
    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const worldX = x + dx;
        const worldZ = z + dz;
        const rng = this.createRng(worldX, worldZ);
        const index = dx + dz * width;
        output[index] = this.nextInt(rng, 10) === 0 ? 1 : BiomeId.Ocean;
        if (worldX === 0 && worldZ === 0) {
          output[index] = 1;
        }
      }
    }
    return output;
  }
}

class GenLayerZoom extends GenLayer {
  constructor(seedSalt: string, parent: GenLayer, private readonly fuzzy: boolean) {
    super(seedSalt, parent);
  }

  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentX = x >> 1;
    const parentZ = z >> 1;
    const parentWidth = (width >> 1) + 2;
    const parentHeight = (height >> 1) + 2;
    const parentValues = this.parent.getInts(parentX, parentZ, parentWidth, parentHeight);
    const zoomedWidth = (parentWidth - 1) * 2;
    const zoomed = new Int32Array(zoomedWidth * ((parentHeight - 1) * 2));

    for (let pz = 0; pz < parentHeight - 1; pz += 1) {
      for (let px = 0; px < parentWidth - 1; px += 1) {
        const topLeft = parentValues[px + pz * parentWidth];
        const topRight = parentValues[px + 1 + pz * parentWidth];
        const bottomLeft = parentValues[px + (pz + 1) * parentWidth];
        const bottomRight = parentValues[px + 1 + (pz + 1) * parentWidth];
        const targetX = px * 2;
        const targetZ = pz * 2;
        const rng = this.createRng((parentX + px) << 1, (parentZ + pz) << 1);

        zoomed[targetX + targetZ * zoomedWidth] = topLeft;
        zoomed[targetX + 1 + targetZ * zoomedWidth] = this.pick(rng, topLeft, topRight);
        zoomed[targetX + (targetZ + 1) * zoomedWidth] = this.pick(rng, topLeft, bottomLeft);
        zoomed[targetX + 1 + (targetZ + 1) * zoomedWidth] = this.pickDiagonal(rng, topLeft, topRight, bottomLeft, bottomRight);
      }
    }

    const output = new Int32Array(width * height);
    const offsetX = x & 1;
    const offsetZ = z & 1;
    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        output[dx + dz * width] = zoomed[dx + offsetX + (dz + offsetZ) * zoomedWidth];
      }
    }

    return output;
  }

  private pick(rng: () => number, first: number, second: number): number {
    return this.nextInt(rng, 2) === 0 ? first : second;
  }

  private pickDiagonal(rng: () => number, topLeft: number, topRight: number, bottomLeft: number, bottomRight: number): number {
    if (this.fuzzy) {
      return selectRandom(rng, [topLeft, topRight, bottomLeft, bottomRight]);
    }

    if (topRight === bottomLeft && bottomLeft === bottomRight) return topRight;
    if (topLeft === topRight && topLeft === bottomLeft) return topLeft;
    if (topLeft === topRight && topLeft === bottomRight) return topLeft;
    if (topLeft === bottomLeft && topLeft === bottomRight) return topLeft;
    if (topLeft === topRight && bottomLeft !== bottomRight) return topLeft;
    if (topLeft === bottomLeft && topRight !== bottomRight) return topLeft;
    if (topLeft === bottomRight && topRight !== bottomLeft) return topLeft;
    if (topRight === bottomLeft && topLeft !== bottomRight) return topRight;
    if (topRight === bottomRight && topLeft !== bottomLeft) return topRight;
    if (bottomLeft === bottomRight && topLeft !== topRight) return bottomLeft;

    return selectRandom(rng, [topLeft, topRight, bottomLeft, bottomRight]);
  }
}
class GenLayerAddIsland extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentWidth = width + 2;
    const parentValues = this.parent.getInts(x - 1, z - 1, parentWidth, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * parentWidth];
        const north = parentValues[dx + 1 + dz * parentWidth];
        const east = parentValues[dx + 2 + (dz + 1) * parentWidth];
        const west = parentValues[dx + (dz + 1) * parentWidth];
        const south = parentValues[dx + 1 + (dz + 2) * parentWidth];
        const rng = this.createRng(x + dx, z + dz);
        const index = dx + dz * width;

        if (center === BiomeId.Ocean && (north !== BiomeId.Ocean || east !== BiomeId.Ocean || west !== BiomeId.Ocean || south !== BiomeId.Ocean)) {
          const candidates = [north, east, west, south].filter((value) => value !== BiomeId.Ocean);
          output[index] = candidates.length > 0 && this.nextInt(rng, 3) === 0
            ? candidates[this.nextInt(rng, candidates.length)] as number
            : center;
        } else if (
          center !== BiomeId.Ocean &&
          (north === BiomeId.Ocean || east === BiomeId.Ocean || west === BiomeId.Ocean || south === BiomeId.Ocean) &&
          this.nextInt(rng, 5) === 0
        ) {
          output[index] = BiomeId.Ocean;
        } else {
          output[index] = center;
        }
      }
    }

    return output;
  }
}

class GenLayerRemoveTooMuchOcean extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];
        const north = parentValues[dx + 1 + dz * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];
        const rng = this.createRng(x + dx, z + dz);

        output[dx + dz * width] =
          center === BiomeId.Ocean &&
          north === BiomeId.Ocean &&
          east === BiomeId.Ocean &&
          west === BiomeId.Ocean &&
          south === BiomeId.Ocean &&
          this.nextInt(rng, 2) === 0
            ? 1
            : center;
      }
    }

    return output;
  }
}

class GenLayerAddSnow extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const index = dx + dz * width;
        const value = parentValues[index];
        if (value === BiomeId.Ocean) {
          output[index] = value;
          continue;
        }

        const rng = this.createRng(x + dx, z + dz);
        const roll = this.nextInt(rng, 6);
        output[index] = roll === 0
          ? CLIMATE_ICE
          : roll <= 2
            ? CLIMATE_COLD
            : roll === 3
              ? CLIMATE_MEDIUM
              : CLIMATE_WARM;
      }
    }

    return output;
  }
}

type EdgeMode = 'COOL_WARM' | 'HEAT_ICE' | 'SPECIAL';

class GenLayerEdge extends GenLayer {
  constructor(seedSalt: string, parent: GenLayer, private readonly mode: EdgeMode) {
    super(seedSalt, parent);
  }

  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    if (this.mode === 'SPECIAL') {
      return this.applySpecial(x, z, width, height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];
        const north = parentValues[dx + 1 + dz * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];
        const index = dx + dz * width;

        if (this.mode === 'COOL_WARM') {
          output[index] =
            center === CLIMATE_WARM && (north === CLIMATE_ICE || east === CLIMATE_ICE || west === CLIMATE_ICE || south === CLIMATE_ICE)
              ? CLIMATE_MEDIUM
              : center;
          continue;
        }

        output[index] =
          center === CLIMATE_ICE && (north === CLIMATE_WARM || east === CLIMATE_WARM || west === CLIMATE_WARM || south === CLIMATE_WARM)
            ? CLIMATE_COLD
            : center;
      }
    }

    return output;
  }

  private applySpecial(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const index = dx + dz * width;
        const value = parentValues[index];
        if (value === BiomeId.Ocean) {
          output[index] = value;
          continue;
        }

        const rng = this.createRng(x + dx, z + dz);
        output[index] = this.nextInt(rng, 13) === 0
          ? value | ((1 + this.nextInt(rng, 15)) << 8)
          : value;
      }
    }

    return output;
  }
}

class GenLayerAddMushroomIsland extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];
        const north = parentValues[dx + 1 + dz * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];
        const rng = this.createRng(x + dx, z + dz);

        output[dx + dz * width] =
          center === BiomeId.Ocean &&
          north === BiomeId.Ocean &&
          east === BiomeId.Ocean &&
          west === BiomeId.Ocean &&
          south === BiomeId.Ocean &&
          this.nextInt(rng, 100) === 0
            ? BiomeId.MushroomIsland
            : center;
      }
    }

    return output;
  }
}

class GenLayerDeepOcean extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];
        if (center !== BiomeId.Ocean) {
          output[dx + dz * width] = center;
          continue;
        }

        const north = parentValues[dx + 1 + dz * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];

        output[dx + dz * width] =
          north === BiomeId.Ocean && east === BiomeId.Ocean && west === BiomeId.Ocean && south === BiomeId.Ocean
            ? BiomeId.DeepOcean
            : BiomeId.Ocean;
      }
    }

    return output;
  }
}

class GenLayerRiverInit extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const index = dx + dz * width;
        const value = parentValues[index];
        if (isOceanic(value) || value === BiomeId.MushroomIsland) {
          output[index] = 0;
          continue;
        }

        const rng = this.createRng(x + dx, z + dz);
        output[index] = this.nextInt(rng, 299999) + 2;
      }
    }

    return output;
  }
}

class GenLayerBiome extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let index = 0; index < output.length; index += 1) {
      const value = parentValues[index];
      const variation = (value & 0xf00) >> 8;
      const climate = value & 0xff;
      const worldX = x + (index % width);
      const worldZ = z + Math.floor(index / width);
      const rng = this.createRng(worldX, worldZ);

      if (isOceanic(climate) || climate === BiomeId.MushroomIsland || climate === BiomeId.MushroomShore) {
        output[index] = climate;
        continue;
      }

      if (climate === CLIMATE_WARM) {
        output[index] = variation > 0
          ? selectRandom(rng, [BiomeId.ExtremeHills, BiomeId.Forest])
          : selectRandom(rng, warmBiomeChoices);
        continue;
      }

      if (climate === CLIMATE_MEDIUM) {
        output[index] = selectRandom(rng, mediumBiomeChoices);
        continue;
      }

      if (climate === CLIMATE_COLD) {
        output[index] = selectRandom(rng, coldBiomeChoices);
        continue;
      }

      output[index] = selectRandom(rng, iceBiomeChoices);
    }

    return output;
  }
}

class GenLayerBiomeEdge extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];
        const north = parentValues[dx + 1 + dz * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];

        let result = center;
        if (center === BiomeId.Desert) {
          if (north === BiomeId.IcePlains || east === BiomeId.IcePlains || west === BiomeId.IcePlains || south === BiomeId.IcePlains) {
            result = BiomeId.Plains;
          }
        } else if (center === BiomeId.Swampland) {
          if (
            north === BiomeId.Desert || east === BiomeId.Desert || west === BiomeId.Desert || south === BiomeId.Desert ||
            north === BiomeId.IcePlains || east === BiomeId.IcePlains || west === BiomeId.IcePlains || south === BiomeId.IcePlains
          ) {
            result = BiomeId.Plains;
          }
        } else if (isJungleFamily(center)) {
          const jungleCompatible =
            isJungleFamily(north) && isJungleFamily(east) && isJungleFamily(west) && isJungleFamily(south);
          if (!jungleCompatible && hasAnyOceanNeighbor(north, east, south, west)) {
            result = BiomeId.Beach;
          } else if (!jungleCompatible) {
            result = BiomeId.JungleEdge;
          }
        }

        output[dx + dz * width] = result;
      }
    }

    return output;
  }
}
class GenLayerHills extends GenLayer {
  constructor(seedSalt: string, parent: GenLayer, private readonly riverInitLayer: GenLayer) {
    super(seedSalt, parent);
  }

  override initWorldSeed(seed: number): void {
    super.initWorldSeed(seed);
    this.riverInitLayer.initWorldSeed(seed);
  }

  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const biomeValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const riverValues = this.riverInitLayer.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const centerIndex = dx + 1 + (dz + 1) * (width + 2);
        const centerBiome = clampBiomeId(biomeValues[centerIndex]);
        const riverValue = riverValues[centerIndex];
        const rng = this.createRng(x + dx, z + dz);

        const shouldMutate = ((riverValue - 2) % 29 === 0) || this.nextInt(rng, 3) === 0;
        let targetBiome = centerBiome;

        if (shouldMutate) {
          targetBiome = this.getHillBiome(centerBiome);
        }

        if (targetBiome !== centerBiome) {
          const north = clampBiomeId(biomeValues[dx + 1 + dz * (width + 2)]);
          const east = clampBiomeId(biomeValues[dx + 2 + (dz + 1) * (width + 2)]);
          const west = clampBiomeId(biomeValues[dx + (dz + 1) * (width + 2)]);
          const south = clampBiomeId(biomeValues[dx + 1 + (dz + 2) * (width + 2)]);
          const similarNeighbors = [north, east, west, south].filter((neighbor) => neighbor === centerBiome).length;
          if (similarNeighbors >= 3) {
            output[dx + dz * width] = targetBiome;
            continue;
          }
        }

        output[dx + dz * width] = centerBiome;
      }
    }

    return output;
  }

  private getHillBiome(biome: BiomeId): BiomeId {
    switch (biome) {
      case BiomeId.Desert:
        return BiomeId.DesertHills;
      case BiomeId.Forest:
        return BiomeId.ForestHills;
      case BiomeId.Taiga:
        return BiomeId.TaigaHills;
      case BiomeId.Plains:
        return BiomeId.Forest;
      case BiomeId.IcePlains:
        return BiomeId.IceMountains;
      case BiomeId.ExtremeHills:
        return BiomeId.ExtremeHillsEdge;
      case BiomeId.Jungle:
        return BiomeId.JungleHills;
      default:
        return biome;
    }
  }
}

class GenLayerRareBiome extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const index = dx + dz * width;
        const biome = clampBiomeId(parentValues[index]);
        const rng = this.createRng(x + dx, z + dz);
        output[index] = biome === BiomeId.Plains && this.nextInt(rng, 57) === 0
          ? BiomeId.Forest
          : biome;
      }
    }

    return output;
  }
}

class GenLayerShore extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = clampBiomeId(parentValues[dx + 1 + (dz + 1) * (width + 2)]);
        const north = clampBiomeId(parentValues[dx + 1 + dz * (width + 2)]);
        const east = clampBiomeId(parentValues[dx + 2 + (dz + 1) * (width + 2)]);
        const west = clampBiomeId(parentValues[dx + (dz + 1) * (width + 2)]);
        const south = clampBiomeId(parentValues[dx + 1 + (dz + 2) * (width + 2)]);

        if (isOceanic(center) || center === BiomeId.River || center === BiomeId.FrozenRiver) {
          output[dx + dz * width] = center;
          continue;
        }

        if (center === BiomeId.MushroomIsland && hasAnyOceanNeighbor(north, east, south, west)) {
          output[dx + dz * width] = BiomeId.MushroomShore;
          continue;
        }

        if (center === BiomeId.ExtremeHills || center === BiomeId.ExtremeHillsEdge) {
          output[dx + dz * width] = hasAnyOceanNeighbor(north, east, south, west)
            ? BiomeId.Beach
            : center;
          continue;
        }

        if (isJungleFamily(center)) {
          output[dx + dz * width] = hasAnyOceanNeighbor(north, east, south, west)
            ? BiomeId.Beach
            : center;
          continue;
        }

        output[dx + dz * width] = hasAnyOceanNeighbor(north, east, south, west)
          ? BiomeId.Beach
          : center;
      }
    }

    return output;
  }
}

class GenLayerSmooth extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const west = parentValues[dx + (dz + 1) * (width + 2)];
        const east = parentValues[dx + 2 + (dz + 1) * (width + 2)];
        const north = parentValues[dx + 1 + dz * (width + 2)];
        const south = parentValues[dx + 1 + (dz + 2) * (width + 2)];
        const center = parentValues[dx + 1 + (dz + 1) * (width + 2)];

        if (west === east && north === south) {
          const rng = this.createRng(x + dx, z + dz);
          output[dx + dz * width] = this.nextInt(rng, 2) === 0 ? west : north;
        } else if (west === east) {
          output[dx + dz * width] = west;
        } else if (north === south) {
          output[dx + dz * width] = north;
        } else {
          output[dx + dz * width] = center;
        }
      }
    }

    return output;
  }
}

const riverFilter = (value: number): number => (value >= 2 ? 2 + (value & 1) : value);

class GenLayerRiver extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const parentValues = this.parent.getInts(x - 1, z - 1, width + 2, height + 2);
    const output = new Int32Array(width * height);

    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        const center = riverFilter(parentValues[dx + 1 + (dz + 1) * (width + 2)]);
        const north = riverFilter(parentValues[dx + 1 + dz * (width + 2)]);
        const east = riverFilter(parentValues[dx + 2 + (dz + 1) * (width + 2)]);
        const west = riverFilter(parentValues[dx + (dz + 1) * (width + 2)]);
        const south = riverFilter(parentValues[dx + 1 + (dz + 2) * (width + 2)]);

        output[dx + dz * width] = center === north && center === east && center === west && center === south
          ? -1
          : BiomeId.River;
      }
    }

    return output;
  }
}

class GenLayerRiverMix extends GenLayer {
  constructor(seedSalt: string, parent: GenLayer, private readonly riverLayer: GenLayer) {
    super(seedSalt, parent);
  }

  override initWorldSeed(seed: number): void {
    super.initWorldSeed(seed);
    this.riverLayer.initWorldSeed(seed);
  }

  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const biomeValues = this.parent.getInts(x, z, width, height);
    const riverValues = this.riverLayer.getInts(x, z, width, height);
    const output = new Int32Array(width * height);

    for (let index = 0; index < output.length; index += 1) {
      const biome = clampBiomeId(biomeValues[index]);
      const river = riverValues[index];

      if (isOceanic(biome)) {
        output[index] = biome;
        continue;
      }

      if (river === BiomeId.River) {
        output[index] = biome === BiomeId.IcePlains
          ? BiomeId.FrozenRiver
          : biome === BiomeId.MushroomIsland || biome === BiomeId.MushroomShore
            ? BiomeId.MushroomShore
            : BiomeId.River;
        continue;
      }

      output[index] = biome;
    }

    return output;
  }
}

class GenLayerVoronoiZoom extends GenLayer {
  override getInts(x: number, z: number, width: number, height: number): Int32Array {
    if (!this.parent) {
      return new Int32Array(width * height);
    }

    const shiftedX = x - 2;
    const shiftedZ = z - 2;
    const parentX = shiftedX >> 2;
    const parentZ = shiftedZ >> 2;
    const parentWidth = (width >> 2) + 2;
    const parentHeight = (height >> 2) + 2;
    const parentValues = this.parent.getInts(parentX, parentZ, parentWidth, parentHeight);
    const zoomedWidth = (parentWidth - 1) * 4;
    const zoomed = new Int32Array(zoomedWidth * ((parentHeight - 1) * 4));

    for (let pz = 0; pz < parentHeight - 1; pz += 1) {
      for (let px = 0; px < parentWidth - 1; px += 1) {
        const topLeft = parentValues[px + pz * parentWidth];
        const topRight = parentValues[px + 1 + pz * parentWidth];
        const bottomLeft = parentValues[px + (pz + 1) * parentWidth];
        const bottomRight = parentValues[px + 1 + (pz + 1) * parentWidth];

        const rngTopLeft = this.createRng((parentX + px) * 4, (parentZ + pz) * 4);
        const rngTopRight = this.createRng((parentX + px + 1) * 4, (parentZ + pz) * 4);
        const rngBottomLeft = this.createRng((parentX + px) * 4, (parentZ + pz + 1) * 4);
        const rngBottomRight = this.createRng((parentX + px + 1) * 4, (parentZ + pz + 1) * 4);

        const jitterTopLeftX = (rngTopLeft() - 0.5) * 3.6;
        const jitterTopLeftZ = (rngTopLeft() - 0.5) * 3.6;
        const jitterTopRightX = 4 + (rngTopRight() - 0.5) * 3.6;
        const jitterTopRightZ = (rngTopRight() - 0.5) * 3.6;
        const jitterBottomLeftX = (rngBottomLeft() - 0.5) * 3.6;
        const jitterBottomLeftZ = 4 + (rngBottomLeft() - 0.5) * 3.6;
        const jitterBottomRightX = 4 + (rngBottomRight() - 0.5) * 3.6;
        const jitterBottomRightZ = 4 + (rngBottomRight() - 0.5) * 3.6;

        for (let localZ = 0; localZ < 4; localZ += 1) {
          for (let localX = 0; localX < 4; localX += 1) {
            const distTopLeft = (localX - jitterTopLeftX) * (localX - jitterTopLeftX) + (localZ - jitterTopLeftZ) * (localZ - jitterTopLeftZ);
            const distTopRight = (localX - jitterTopRightX) * (localX - jitterTopRightX) + (localZ - jitterTopRightZ) * (localZ - jitterTopRightZ);
            const distBottomLeft = (localX - jitterBottomLeftX) * (localX - jitterBottomLeftX) + (localZ - jitterBottomLeftZ) * (localZ - jitterBottomLeftZ);
            const distBottomRight = (localX - jitterBottomRightX) * (localX - jitterBottomRightX) + (localZ - jitterBottomRightZ) * (localZ - jitterBottomRightZ);

            let biome = topLeft;
            let minDistance = distTopLeft;
            if (distTopRight < minDistance) {
              biome = topRight;
              minDistance = distTopRight;
            }
            if (distBottomLeft < minDistance) {
              biome = bottomLeft;
              minDistance = distBottomLeft;
            }
            if (distBottomRight < minDistance) {
              biome = bottomRight;
            }

            const outX = px * 4 + localX;
            const outZ = pz * 4 + localZ;
            zoomed[outX + outZ * zoomedWidth] = biome;
          }
        }
      }
    }

    const output = new Int32Array(width * height);
    const offsetX = shiftedX & 3;
    const offsetZ = shiftedZ & 3;
    for (let dz = 0; dz < height; dz += 1) {
      for (let dx = 0; dx < width; dx += 1) {
        output[dx + dz * width] = zoomed[dx + offsetX + (dz + offsetZ) * zoomedWidth];
      }
    }

    return output;
  }
}

const zoomLayer = (prefix: string, parent: GenLayer, fuzzy = false): GenLayer =>
  new GenLayerZoom(prefix, parent, fuzzy);

const buildLayers = (): { terrainLayer: GenLayer; voronoiLayer: GenLayer } => {
  let layer: GenLayer = new GenLayerIsland('island');
  layer = zoomLayer('fuzzy_zoom', layer, true);
  layer = new GenLayerAddIsland('add_island_1', layer);
  layer = zoomLayer('zoom_1', layer);
  layer = new GenLayerAddIsland('add_island_2', layer);
  layer = new GenLayerAddIsland('add_island_3', layer);
  layer = new GenLayerAddIsland('add_island_4', layer);
  layer = new GenLayerRemoveTooMuchOcean('remove_too_much_ocean', layer);
  layer = new GenLayerAddSnow('add_snow', layer);
  layer = new GenLayerAddIsland('add_island_5', layer);
  layer = new GenLayerEdge('edge_cool_warm', layer, 'COOL_WARM');
  layer = new GenLayerEdge('edge_heat_ice', layer, 'HEAT_ICE');
  layer = new GenLayerEdge('edge_special', layer, 'SPECIAL');
  layer = zoomLayer('zoom_2', layer);
  layer = zoomLayer('zoom_3', layer);
  layer = new GenLayerAddIsland('add_island_6', layer);
  layer = new GenLayerAddMushroomIsland('add_mushroom', layer);
  layer = new GenLayerDeepOcean('deep_ocean', layer);

  let riverLayer: GenLayer = new GenLayerRiverInit('river_init', layer);
  let biomeLayer: GenLayer = new GenLayerBiome('biome', layer);
  biomeLayer = new GenLayerBiomeEdge('biome_edge', biomeLayer);
  biomeLayer = new GenLayerHills('hills', biomeLayer, riverLayer);
  biomeLayer = new GenLayerRareBiome('rare_biome', biomeLayer);

  for (let zoom = 0; zoom < 4; zoom += 1) {
    biomeLayer = zoomLayer(`biome_zoom_${zoom + 1}`, biomeLayer);
    riverLayer = zoomLayer(`river_zoom_${zoom + 1}`, riverLayer);

    if (zoom === 0) {
      biomeLayer = new GenLayerAddIsland('final_add_island', biomeLayer);
    }
    if (zoom === 1) {
      biomeLayer = new GenLayerShore('shore', biomeLayer);
    }
  }

  biomeLayer = new GenLayerSmooth('biome_smooth', biomeLayer);
  riverLayer = new GenLayerRiver('river', riverLayer);
  riverLayer = new GenLayerSmooth('river_smooth', riverLayer);

  const terrainLayer = new GenLayerRiverMix('river_mix', biomeLayer, riverLayer);
  const voronoiLayer = new GenLayerVoronoiZoom('voronoi', terrainLayer);
  return {
    terrainLayer,
    voronoiLayer,
  };
};

export const getBiomeDefinition = (biomeId: number): BiomeDefinition =>
  BIOMES[clampBiomeId(biomeId)] ?? DEFAULT_BIOME;

export const getBiomeKernelWeight = (index: number): number => parabolicField[index];

export class LegacyBiomeGenerator {
  private readonly terrainLayer: GenLayer;
  private readonly voronoiLayer: GenLayer;

  constructor(seed: string) {
    const { terrainLayer, voronoiLayer } = buildLayers();
    this.terrainLayer = terrainLayer;
    this.voronoiLayer = voronoiLayer;

    const worldSeed = hashString(seed) | 0;
    this.terrainLayer.initWorldSeed(worldSeed);
    this.voronoiLayer.initWorldSeed(worldSeed);
  }

  getBiomes(x: number, z: number, width: number, height: number): Int32Array {
    return this.terrainLayer.getInts(x, z, width, height);
  }

  getVoronoiBiomes(x: number, z: number, width: number, height: number): Int32Array {
    return this.voronoiLayer.getInts(x, z, width, height);
  }
}
