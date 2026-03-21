export const WORLDGEN_PROFILE = {
  layout: {
    coarseGridXZ: 5,
    coarseGridY: 17,
    coarseStepXZ: 4,
    coarseStepY: 8,
  },
  hydrology: {
    floodLine: 1 << 6,
    freezeTemperature: 0.5,
    shorelineBand: 4,
  },
  terrainNoise: {
    baseScale: 684.412,
    depthFieldScale: 1.121,
    elevationFieldScale: 200.0,
    roofFadeSlices: 4,
  },
  climateNoise: {
    temperatureScale: 0.02500000037252903,
    humidityScale: 0.05000000074505806,
    weirdnessScale: 0.25,
    temperatureFreqFalloff: 0.25,
    humidityFreqFalloff: 0.3333333333333333,
    weirdnessFreqFalloff: 0.5882352941176471,
  },
  surfaceNoise: {
    baseScale: 0.03125,
    gravelYOffset: 109.0134,
  },
  seeds: {
    terrainX: 341873128712n,
    terrainZ: 132897987541n,
    climateTemperature: 9871n,
    climateHumidity: 39811n,
    climateWeirdness: 543321n,
  },
  caves: {
    chunkReach: 8,
    maxCarveY: 120,
  },
  cache: {
    maxChunks: 256,
    pruneFraction: 0.25,
  },
} as const;
