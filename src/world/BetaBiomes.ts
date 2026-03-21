import type { BlockId } from '../types/blocks';
import { LegacyRandom } from './LegacyRandom';
import { SimplexOctaves } from './LegacyNoise';
import { WORLDGEN_PROFILE } from './WorldgenProfile';

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const toSigned64 = (value: bigint): bigint => BigInt.asIntN(64, value);

const columnIndex = (x: number, z: number, width: number): number => x + z * width;

export const SEA_LEVEL = WORLDGEN_PROFILE.hydrology.floodLine;

export enum BetaBiomeId {
  Rainforest = 0,
  Swampland = 1,
  SeasonalForest = 2,
  Forest = 3,
  Savanna = 4,
  Shrubland = 5,
  Taiga = 6,
  Desert = 7,
  Plains = 8,
  Tundra = 9,
}

export interface BetaBiomeDefinition {
  id: BetaBiomeId;
  key: string;
  topBlock: BlockId;
  fillerBlock: BlockId;
}

const BIOMES: Record<BetaBiomeId, BetaBiomeDefinition> = {
  [BetaBiomeId.Rainforest]: {
    id: BetaBiomeId.Rainforest,
    key: 'rainforest',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Swampland]: {
    id: BetaBiomeId.Swampland,
    key: 'swampland',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.SeasonalForest]: {
    id: BetaBiomeId.SeasonalForest,
    key: 'seasonal_forest',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Forest]: {
    id: BetaBiomeId.Forest,
    key: 'forest',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Savanna]: {
    id: BetaBiomeId.Savanna,
    key: 'savanna',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Shrubland]: {
    id: BetaBiomeId.Shrubland,
    key: 'shrubland',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Taiga]: {
    id: BetaBiomeId.Taiga,
    key: 'taiga',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Desert]: {
    id: BetaBiomeId.Desert,
    key: 'desert',
    topBlock: 11,
    fillerBlock: 11,
  },
  [BetaBiomeId.Plains]: {
    id: BetaBiomeId.Plains,
    key: 'plains',
    topBlock: 1,
    fillerBlock: 2,
  },
  [BetaBiomeId.Tundra]: {
    id: BetaBiomeId.Tundra,
    key: 'tundra',
    topBlock: 1,
    fillerBlock: 2,
  },
};

export interface BetaBiomeSample {
  readonly biomes: BetaBiomeDefinition[];
  readonly temperatures: Float64Array;
  readonly rain: Float64Array;
}

const selectBiomeId = (temperature: number, rain: number): BetaBiomeId => {
  const humidity = rain * temperature;
  if (temperature < 0.1) {
    return BetaBiomeId.Tundra;
  }
  if (humidity < 0.2) {
    if (temperature < 0.5) {
      return BetaBiomeId.Tundra;
    }
    if (temperature < 0.95) {
      return BetaBiomeId.Savanna;
    }
    return BetaBiomeId.Desert;
  }
  if (humidity > 0.5 && temperature < 0.7) {
    return BetaBiomeId.Swampland;
  }
  if (temperature < 0.5) {
    return BetaBiomeId.Taiga;
  }
  if (temperature < 0.97) {
    return humidity < 0.35 ? BetaBiomeId.Shrubland : BetaBiomeId.Forest;
  }
  if (humidity < 0.45) {
    return BetaBiomeId.Plains;
  }
  if (humidity < 0.9) {
    return BetaBiomeId.SeasonalForest;
  }
  return BetaBiomeId.Rainforest;
};

export class BetaBiomeSampler {
  private readonly temperatureNoise: SimplexOctaves;
  private readonly rainNoise: SimplexOctaves;
  private readonly weirdNoise: SimplexOctaves;
  private temperatureBuffer: Float64Array | null = null;
  private rainBuffer: Float64Array | null = null;
  private weirdBuffer: Float64Array | null = null;

  constructor(worldSeed: bigint) {
    this.temperatureNoise = new SimplexOctaves(
      new LegacyRandom(toSigned64(worldSeed * WORLDGEN_PROFILE.seeds.climateTemperature)),
      4,
    );
    this.rainNoise = new SimplexOctaves(
      new LegacyRandom(toSigned64(worldSeed * WORLDGEN_PROFILE.seeds.climateHumidity)),
      4,
    );
    this.weirdNoise = new SimplexOctaves(
      new LegacyRandom(toSigned64(worldSeed * WORLDGEN_PROFILE.seeds.climateWeirdness)),
      2,
    );
  }

  sampleBiomes(x: number, z: number, width: number, height: number): BetaBiomeSample {
    this.temperatureBuffer = this.temperatureNoise.generate(
      this.temperatureBuffer,
      x,
      z,
      width,
      height,
      WORLDGEN_PROFILE.climateNoise.temperatureScale,
      WORLDGEN_PROFILE.climateNoise.temperatureScale,
      WORLDGEN_PROFILE.climateNoise.temperatureFreqFalloff,
    );
    this.rainBuffer = this.rainNoise.generate(
      this.rainBuffer,
      x,
      z,
      width,
      height,
      WORLDGEN_PROFILE.climateNoise.humidityScale,
      WORLDGEN_PROFILE.climateNoise.humidityScale,
      WORLDGEN_PROFILE.climateNoise.humidityFreqFalloff,
    );
    this.weirdBuffer = this.weirdNoise.generate(
      this.weirdBuffer,
      x,
      z,
      width,
      height,
      WORLDGEN_PROFILE.climateNoise.weirdnessScale,
      WORLDGEN_PROFILE.climateNoise.weirdnessScale,
      WORLDGEN_PROFILE.climateNoise.weirdnessFreqFalloff,
    );

    const biomes = new Array<BetaBiomeDefinition>(width * height);
    const temperatures = new Float64Array(width * height);
    const rain = new Float64Array(width * height);

    for (let localZ = 0; localZ < height; localZ += 1) {
      for (let localX = 0; localX < width; localX += 1) {
        const index = columnIndex(localX, localZ, width);
        const weirdness = this.weirdBuffer[index] * 1.1 + 0.5;

        let temperature =
          (this.temperatureBuffer[index] * 0.15 + 0.7) * 0.99 + weirdness * 0.01;
        let humidity = (this.rainBuffer[index] * 0.15 + 0.5) * 0.998 + weirdness * 0.002;

        temperature = 1 - (1 - temperature) * (1 - temperature);
        temperature = clamp01(temperature);
        humidity = clamp01(humidity);

        temperatures[index] = temperature;
        rain[index] = humidity;
        biomes[index] = BIOMES[selectBiomeId(temperature, humidity)];
      }
    }

    return {
      biomes,
      temperatures,
      rain,
    };
  }

  sampleTemperatures(
    target: Float64Array | null,
    x: number,
    z: number,
    width: number,
    height: number,
  ): Float64Array {
    const output = target && target.length >= width * height
      ? target
      : new Float64Array(width * height);
    output.fill(0);

    this.temperatureBuffer = this.temperatureNoise.generate(
      this.temperatureBuffer,
      x,
      z,
      width,
      height,
      WORLDGEN_PROFILE.climateNoise.temperatureScale,
      WORLDGEN_PROFILE.climateNoise.temperatureScale,
      WORLDGEN_PROFILE.climateNoise.temperatureFreqFalloff,
    );
    this.weirdBuffer = this.weirdNoise.generate(
      this.weirdBuffer,
      x,
      z,
      width,
      height,
      WORLDGEN_PROFILE.climateNoise.weirdnessScale,
      WORLDGEN_PROFILE.climateNoise.weirdnessScale,
      WORLDGEN_PROFILE.climateNoise.weirdnessFreqFalloff,
    );

    for (let localZ = 0; localZ < height; localZ += 1) {
      for (let localX = 0; localX < width; localX += 1) {
        const index = columnIndex(localX, localZ, width);
        const weirdness = this.weirdBuffer[index] * 1.1 + 0.5;
        let temperature =
          (this.temperatureBuffer[index] * 0.15 + 0.7) * 0.99 + weirdness * 0.01;
        temperature = 1 - (1 - temperature) * (1 - temperature);
        output[index] = clamp01(temperature);
      }
    }

    return output;
  }
}
