import {
  WEATHER_PRESET_CHAIN,
  WEATHER_SURFACE_ACTIONS,
  WEATHER_SKY_PRESET_OPTIONS,
  type WeatherControlMode,
  type WeatherOverrides,
  type WeatherPreset,
  type WeatherSurfaceAction,
  type WeatherSurfaceHistoryEntry,
  type WeatherSurfaceState,
  type WeatherSkyPreset,
  type WeatherState,
  type WeatherVisualState,
  type WorldEnvironmentState,
} from '../types/weather';

export interface WeatherProfile {
  cloudCoverage: number;
  cloudDensity: number;
  cloudThickness: number;
  cloudSharpness: number;
  cloudGrayness: number;
  cloudOpacity: number;
  skyGrayness: number;
  skyBrightness: number;
  sunVisibility: number;
  fogDimming: number;
  ambientDimming: number;
  rainIntensity: number;
  windSpeed: number;
  minDurationMs: number;
  maxDurationMs: number;
  minTransitionMs: number;
  maxTransitionMs: number;
}

interface SkyPresetProfile {
  skyGrayness: number;
  skyBrightness: number;
  sunVisibility: number;
  fogDimming: number;
  ambientDimming: number;
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
const clamp01 = (value: number): number => clamp(value, 0, 1);
const lerp = (from: number, to: number, alpha: number): number => from + (to - from) * alpha;

const WEATHER_TEMPERATURE_BASELINE_C = 16;
const WEATHER_TEMPERATURE_MIN_C = -24;
const WEATHER_TEMPERATURE_MAX_C = 48;
const WEATHER_TEMPERATURE_DRIFT_INTERVAL_MS = 15_000;
const WEATHER_MANUAL_SNOW_TEMPERATURE_C = -4;
const WEATHER_MANUAL_SNOW_HEAVY_TEMPERATURE_C = -10;

const WEATHER_PROFILE_BY_PRESET: Record<WeatherPreset, WeatherProfile> = {
  clear: {
    cloudCoverage: 0.04,
    cloudDensity: 0.2,
    cloudThickness: 0.16,
    cloudSharpness: 0.84,
    cloudGrayness: 0.02,
    cloudOpacity: 0.94,
    skyGrayness: 0.02,
    skyBrightness: 1.02,
    sunVisibility: 0.98,
    fogDimming: 0.02,
    ambientDimming: 0.02,
    rainIntensity: 0,
    windSpeed: 0.00024,
    minDurationMs: 95_000,
    maxDurationMs: 210_000,
    minTransitionMs: 16_000,
    maxTransitionMs: 24_000,
  },
  cloudy_light: {
    cloudCoverage: 0.18,
    cloudDensity: 0.42,
    cloudThickness: 0.28,
    cloudSharpness: 0.72,
    cloudGrayness: 0.05,
    cloudOpacity: 0.95,
    skyGrayness: 0.08,
    skyBrightness: 0.99,
    sunVisibility: 0.9,
    fogDimming: 0.05,
    ambientDimming: 0.08,
    rainIntensity: 0,
    windSpeed: 0.00029,
    minDurationMs: 90_000,
    maxDurationMs: 185_000,
    minTransitionMs: 18_000,
    maxTransitionMs: 28_000,
  },
  cloudy_heavy: {
    cloudCoverage: 0.42,
    cloudDensity: 0.62,
    cloudThickness: 0.44,
    cloudSharpness: 0.58,
    cloudGrayness: 0.1,
    cloudOpacity: 0.96,
    skyGrayness: 0.18,
    skyBrightness: 0.94,
    sunVisibility: 0.74,
    fogDimming: 0.12,
    ambientDimming: 0.16,
    rainIntensity: 0,
    windSpeed: 0.00035,
    minDurationMs: 80_000,
    maxDurationMs: 165_000,
    minTransitionMs: 22_000,
    maxTransitionMs: 30_000,
  },
  overcast: {
    cloudCoverage: 0.76,
    cloudDensity: 0.8,
    cloudThickness: 0.64,
    cloudSharpness: 0.42,
    cloudGrayness: 0.52,
    cloudOpacity: 0.97,
    skyGrayness: 0.48,
    skyBrightness: 0.8,
    sunVisibility: 0.36,
    fogDimming: 0.24,
    ambientDimming: 0.28,
    rainIntensity: 0,
    windSpeed: 0.00043,
    minDurationMs: 75_000,
    maxDurationMs: 150_000,
    minTransitionMs: 24_000,
    maxTransitionMs: 34_000,
  },
  rain: {
    cloudCoverage: 0.81,
    cloudDensity: 0.84,
    cloudThickness: 0.7,
    cloudSharpness: 0.38,
    cloudGrayness: 0.58,
    cloudOpacity: 0.975,
    skyGrayness: 0.56,
    skyBrightness: 0.76,
    sunVisibility: 0.24,
    fogDimming: 0.28,
    ambientDimming: 0.3,
    rainIntensity: 0.16,
    windSpeed: 0.00048,
    minDurationMs: 74_000,
    maxDurationMs: 142_000,
    minTransitionMs: 25_000,
    maxTransitionMs: 35_000,
  },
  rain_light: {
    cloudCoverage: 0.88,
    cloudDensity: 0.88,
    cloudThickness: 0.78,
    cloudSharpness: 0.35,
    cloudGrayness: 0.68,
    cloudOpacity: 0.98,
    skyGrayness: 0.62,
    skyBrightness: 0.72,
    sunVisibility: 0.18,
    fogDimming: 0.34,
    ambientDimming: 0.36,
    rainIntensity: 0.38,
    windSpeed: 0.00052,
    minDurationMs: 70_000,
    maxDurationMs: 135_000,
    minTransitionMs: 26_000,
    maxTransitionMs: 36_000,
  },
  rain_heavy: {
    cloudCoverage: 0.96,
    cloudDensity: 0.95,
    cloudThickness: 0.9,
    cloudSharpness: 0.28,
    cloudGrayness: 0.82,
    cloudOpacity: 0.99,
    skyGrayness: 0.76,
    skyBrightness: 0.62,
    sunVisibility: 0.08,
    fogDimming: 0.46,
    ambientDimming: 0.44,
    rainIntensity: 0.9,
    windSpeed: 0.00064,
    minDurationMs: 55_000,
    maxDurationMs: 120_000,
    minTransitionMs: 28_000,
    maxTransitionMs: 40_000,
  },
  snow: {
    cloudCoverage: 0.95,
    cloudDensity: 0.94,
    cloudThickness: 0.9,
    cloudSharpness: 0.26,
    cloudGrayness: 0.86,
    cloudOpacity: 0.99,
    skyGrayness: 0.82,
    skyBrightness: 0.64,
    sunVisibility: 0.06,
    fogDimming: 0.48,
    ambientDimming: 0.46,
    rainIntensity: 0.56,
    windSpeed: 0.00042,
    minDurationMs: 52_000,
    maxDurationMs: 112_000,
    minTransitionMs: 28_000,
    maxTransitionMs: 40_000,
  },
  snow_heavy: {
    cloudCoverage: 1,
    cloudDensity: 1,
    cloudThickness: 1,
    cloudSharpness: 0.2,
    cloudGrayness: 0.94,
    cloudOpacity: 1,
    skyGrayness: 0.9,
    skyBrightness: 0.54,
    sunVisibility: 0.03,
    fogDimming: 0.56,
    ambientDimming: 0.52,
    rainIntensity: 0.94,
    windSpeed: 0.0005,
    minDurationMs: 42_000,
    maxDurationMs: 88_000,
    minTransitionMs: 30_000,
    maxTransitionMs: 42_000,
  },
  storm: {
    cloudCoverage: 1,
    cloudDensity: 1,
    cloudThickness: 1,
    cloudSharpness: 0.22,
    cloudGrayness: 0.94,
    cloudOpacity: 1,
    skyGrayness: 0.88,
    skyBrightness: 0.52,
    sunVisibility: 0.02,
    fogDimming: 0.56,
    ambientDimming: 0.52,
    rainIntensity: 1,
    windSpeed: 0.00078,
    minDurationMs: 45_000,
    maxDurationMs: 95_000,
    minTransitionMs: 30_000,
    maxTransitionMs: 42_000,
  },
};

const SKY_PROFILE_BY_PRESET: Record<Exclude<WeatherSkyPreset, 'auto'>, SkyPresetProfile> = {
  blue: {
    skyGrayness: 0.02,
    skyBrightness: 1.04,
    sunVisibility: 1,
    fogDimming: 0.02,
    ambientDimming: 0.03,
  },
  soft: {
    skyGrayness: 0.22,
    skyBrightness: 0.9,
    sunVisibility: 0.66,
    fogDimming: 0.16,
    ambientDimming: 0.18,
  },
  gray: {
    skyGrayness: 0.68,
    skyBrightness: 0.66,
    sunVisibility: 0.14,
    fogDimming: 0.38,
    ambientDimming: 0.38,
  },
  storm: {
    skyGrayness: 0.92,
    skyBrightness: 0.46,
    sunVisibility: 0.01,
    fogDimming: 0.6,
    ambientDimming: 0.56,
  },
};

const DEFAULT_WEATHER_OVERRIDES: WeatherOverrides = {
  cloudCoverage: null,
  rainIntensity: null,
  skyPreset: 'auto',
};

const getRandomBetween = (min: number, max: number, random: () => number): number =>
  lerp(min, max, clamp01(random()));

const clampWeatherTemperature = (value: number): number =>
  clamp(value, WEATHER_TEMPERATURE_MIN_C, WEATHER_TEMPERATURE_MAX_C);

const getManualWeatherTemperature = (preset: WeatherPreset): number => {
  switch (preset) {
    case 'snow':
      return WEATHER_MANUAL_SNOW_TEMPERATURE_C;
    case 'snow_heavy':
      return WEATHER_MANUAL_SNOW_HEAVY_TEMPERATURE_C;
    default:
      return WEATHER_TEMPERATURE_BASELINE_C;
  }
};

const stepWeatherTemperature = (
  temperatureCelsius: number,
  random: () => number = Math.random,
): number => {
  const clampedTemperature = clampWeatherTemperature(temperatureCelsius);
  const deltaFromBaseline = clampedTemperature - WEATHER_TEMPERATURE_BASELINE_C;
  const distance = Math.abs(deltaFromBaseline);
  const normalizedDistance = clamp01(distance / 24);
  const directionToBaseline = deltaFromBaseline === 0 ? 0 : -Math.sign(deltaFromBaseline);
  const directionAwayFromBaseline =
    directionToBaseline === 0
      ? random() < 0.5
        ? -1
        : 1
      : -directionToBaseline;
  const moveTowardProbability =
    directionToBaseline === 0 ? 0 : lerp(0.21, 0.68, normalizedDistance);
  const moveAwayProbability = lerp(0.18, 0.03, normalizedDistance);
  const roll = clamp01(random());

  if (directionToBaseline !== 0 && roll < moveTowardProbability) {
    return clampWeatherTemperature(clampedTemperature + directionToBaseline);
  }
  if (roll < moveTowardProbability + moveAwayProbability) {
    return clampWeatherTemperature(clampedTemperature + directionAwayFromBaseline);
  }
  return clampedTemperature;
};

export const DEFAULT_WEATHER_PRESET: WeatherPreset = 'clear';
export const DEFAULT_TIME_OF_DAY = 0;
export const DEFAULT_MOON_PHASE = 0;
export const DEFAULT_WEATHER_SURFACE_ACTION: WeatherSurfaceAction = 'idle';

export const getWeatherProfile = (preset: WeatherPreset): WeatherProfile =>
  WEATHER_PROFILE_BY_PRESET[preset];

export const isWeatherPreset = (value: unknown): value is WeatherPreset =>
  typeof value === 'string' && WEATHER_PRESET_CHAIN.includes(value as WeatherPreset);

export const isWeatherSkyPreset = (value: unknown): value is WeatherSkyPreset =>
  typeof value === 'string' && WEATHER_SKY_PRESET_OPTIONS.includes(value as WeatherSkyPreset);

export const isWeatherSurfaceAction = (value: unknown): value is WeatherSurfaceAction =>
  typeof value === 'string' && WEATHER_SURFACE_ACTIONS.includes(value as WeatherSurfaceAction);

export const createInitialWeatherState = (random: () => number = Math.random): WeatherState => {
  const profile = getWeatherProfile(DEFAULT_WEATHER_PRESET);
  return {
    preset: DEFAULT_WEATHER_PRESET,
    previousPreset: null,
    presetElapsedMs: 0,
    presetDurationMs: getRandomBetween(profile.minDurationMs, profile.maxDurationMs, random),
    transitionMs: getRandomBetween(profile.minTransitionMs, profile.maxTransitionMs, random),
    windOffsetX: random() * 240 - 120,
    windOffsetZ: random() * 240 - 120,
    temperatureCelsius: WEATHER_TEMPERATURE_BASELINE_C,
    temperatureDriftElapsedMs: 0,
  };
};

export const normalizeWeatherOverrides = (
  overrides: Partial<WeatherOverrides> | null | undefined,
): WeatherOverrides => ({
  cloudCoverage:
    typeof overrides?.cloudCoverage === 'number' && Number.isFinite(overrides.cloudCoverage)
      ? clamp01(overrides.cloudCoverage)
      : null,
  rainIntensity:
    typeof overrides?.rainIntensity === 'number' && Number.isFinite(overrides.rainIntensity)
      ? clamp01(overrides.rainIntensity)
      : null,
  skyPreset: isWeatherSkyPreset(overrides?.skyPreset) ? overrides.skyPreset : 'auto',
});

export const normalizeWeatherState = (
  state: Partial<WeatherState> | null | undefined,
  random: () => number = Math.random,
): WeatherState => {
  const fallback = createInitialWeatherState(random);
  if (!state || typeof state !== 'object' || !isWeatherPreset(state.preset)) {
    return fallback;
  }

  const profile = getWeatherProfile(state.preset);
  const previousPreset = isWeatherPreset(state.previousPreset) ? state.previousPreset : null;

  return {
    preset: state.preset,
    previousPreset,
    presetElapsedMs:
      typeof state.presetElapsedMs === 'number' && Number.isFinite(state.presetElapsedMs)
        ? Math.max(0, state.presetElapsedMs)
        : 0,
    presetDurationMs:
      typeof state.presetDurationMs === 'number' && Number.isFinite(state.presetDurationMs)
        ? Math.max(1, state.presetDurationMs)
        : getRandomBetween(profile.minDurationMs, profile.maxDurationMs, random),
    transitionMs:
      typeof state.transitionMs === 'number' && Number.isFinite(state.transitionMs)
        ? Math.max(0, state.transitionMs)
        : getRandomBetween(profile.minTransitionMs, profile.maxTransitionMs, random),
    windOffsetX:
      typeof state.windOffsetX === 'number' && Number.isFinite(state.windOffsetX)
        ? state.windOffsetX
        : fallback.windOffsetX,
    windOffsetZ:
      typeof state.windOffsetZ === 'number' && Number.isFinite(state.windOffsetZ)
        ? state.windOffsetZ
        : fallback.windOffsetZ,
    temperatureCelsius:
      typeof state.temperatureCelsius === 'number' && Number.isFinite(state.temperatureCelsius)
        ? clampWeatherTemperature(state.temperatureCelsius)
        : WEATHER_TEMPERATURE_BASELINE_C,
    temperatureDriftElapsedMs:
      typeof state.temperatureDriftElapsedMs === 'number' &&
      Number.isFinite(state.temperatureDriftElapsedMs)
        ? Math.max(0, state.temperatureDriftElapsedMs)
        : 0,
  };
};

export const createInitialEnvironmentState = (
  random: () => number = Math.random,
): WorldEnvironmentState => ({
  timeOfDay: DEFAULT_TIME_OF_DAY,
  moonPhase: DEFAULT_MOON_PHASE,
  weather: createInitialWeatherState(random),
  surfaceWeather: {
    currentTick: 0,
    accumulatorSeconds: 0,
    history: [],
  },
});

export const normalizeWeatherSurfaceState = (
  state: Partial<WeatherSurfaceState> | null | undefined,
): WeatherSurfaceState => {
  const history = Array.isArray(state?.history)
    ? state.history
        .filter(
          (entry): entry is WeatherSurfaceHistoryEntry =>
            !!entry &&
            typeof entry === 'object' &&
            typeof entry.startTick === 'number' &&
            Number.isFinite(entry.startTick) &&
            typeof entry.endTick === 'number' &&
            Number.isFinite(entry.endTick) &&
            isWeatherSurfaceAction(entry.action),
        )
        .map((entry) => ({
          startTick: Math.max(1, Math.floor(entry.startTick)),
          endTick: Math.max(1, Math.floor(entry.endTick)),
          action: entry.action,
        }))
        .filter((entry) => entry.endTick >= entry.startTick)
        .sort((left, right) => left.startTick - right.startTick)
    : [];

  return {
    currentTick:
      typeof state?.currentTick === 'number' && Number.isFinite(state.currentTick)
        ? Math.max(0, Math.floor(state.currentTick))
        : 0,
    accumulatorSeconds:
      typeof state?.accumulatorSeconds === 'number' && Number.isFinite(state.accumulatorSeconds)
        ? Math.max(0, state.accumulatorSeconds)
        : 0,
    history,
  };
};

export const normalizeEnvironmentState = (
  state: Partial<WorldEnvironmentState> | null | undefined,
  random: () => number = Math.random,
): WorldEnvironmentState => {
  const fallback = createInitialEnvironmentState(random);
  return {
    timeOfDay:
      typeof state?.timeOfDay === 'number' && Number.isFinite(state.timeOfDay)
        ? ((state.timeOfDay % 1) + 1) % 1
        : fallback.timeOfDay,
    moonPhase:
      typeof state?.moonPhase === 'number' && Number.isFinite(state.moonPhase)
        ? ((Math.floor(state.moonPhase) % 8) + 8) % 8
        : fallback.moonPhase,
    weather: normalizeWeatherState(state?.weather, random),
    surfaceWeather: normalizeWeatherSurfaceState(state?.surfaceWeather),
  };
};

export const pickNextWeatherPreset = (
  currentPreset: WeatherPreset,
  random: () => number = Math.random,
  temperatureCelsius = WEATHER_TEMPERATURE_BASELINE_C,
): WeatherPreset => {
  const roll = clamp01(random());
  const freezing = temperatureCelsius < 0;

  switch (currentPreset) {
    case 'rain_heavy':
      if (roll < 0.2) {
        return 'rain_light';
      }
      if (!freezing || roll < 0.94) {
        return 'rain_heavy';
      }
      return 'snow';
    case 'snow':
      if (!freezing) {
        return 'rain_heavy';
      }
      if (roll < 0.28) {
        return 'rain_heavy';
      }
      if (roll < 0.92) {
        return 'snow';
      }
      return 'snow_heavy';
    case 'snow_heavy':
      if (!freezing) {
        return 'rain_heavy';
      }
      if (roll < 0.36) {
        return 'snow';
      }
      if (roll < 0.98) {
        return 'snow_heavy';
      }
      return 'storm';
    case 'storm':
      return freezing && roll < 0.04 ? 'snow_heavy' : 'storm';
    default: {
      const availablePresets = freezing
        ? WEATHER_PRESET_CHAIN
        : WEATHER_PRESET_CHAIN.filter((preset) => preset !== 'snow' && preset !== 'snow_heavy');
      const currentIndex = availablePresets.indexOf(currentPreset);
      if (currentIndex < 0) {
        return DEFAULT_WEATHER_PRESET;
      }

      let step = 0;
      if (roll < 0.23) {
        step = -1;
      } else if (roll > 0.77) {
        step = 1;
      }

      const nextIndex = clamp(currentIndex + step, 0, availablePresets.length - 1);
      return availablePresets[nextIndex] ?? DEFAULT_WEATHER_PRESET;
    }
  }
};

export const retimeWeatherPreset = (
  state: WeatherState,
  preset: WeatherPreset,
  random: () => number = Math.random,
): void => {
  const profile = getWeatherProfile(preset);
  state.previousPreset = state.preset;
  state.preset = preset;
  state.presetElapsedMs = 0;
  state.presetDurationMs = getRandomBetween(profile.minDurationMs, profile.maxDurationMs, random);
  state.transitionMs = getRandomBetween(profile.minTransitionMs, profile.maxTransitionMs, random);
};

export const forceWeatherPreset = (
  state: WeatherState,
  preset: WeatherPreset,
  random: () => number = Math.random,
): void => {
  retimeWeatherPreset(state, preset, random);
  state.temperatureCelsius = getManualWeatherTemperature(preset);
  state.temperatureDriftElapsedMs = 0;
};

export const advanceWeatherState = (
  state: WeatherState,
  dtMs: number,
  random: () => number = Math.random,
  allowPresetTransition = true,
): void => {
  if (dtMs <= 0) {
    return;
  }

  state.presetElapsedMs += dtMs;
  const profile = getWeatherProfile(state.preset);
  const windStep = profile.windSpeed * dtMs;
  state.windOffsetX += windStep;
  state.windOffsetZ += windStep * 0.56;

  if (allowPresetTransition) {
    state.temperatureDriftElapsedMs += dtMs;
    while (state.temperatureDriftElapsedMs >= WEATHER_TEMPERATURE_DRIFT_INTERVAL_MS) {
      state.temperatureDriftElapsedMs -= WEATHER_TEMPERATURE_DRIFT_INTERVAL_MS;
      state.temperatureCelsius = stepWeatherTemperature(state.temperatureCelsius, random);
    }
  } else {
    state.temperatureDriftElapsedMs = 0;
  }

  if (!allowPresetTransition || state.presetElapsedMs < state.presetDurationMs) {
    return;
  }

  const nextPreset = pickNextWeatherPreset(state.preset, random, state.temperatureCelsius);
  retimeWeatherPreset(state, nextPreset, random);
};

const applySkyOverride = (
  visual: WeatherVisualState,
  preset: WeatherSkyPreset,
): WeatherVisualState => {
  if (preset === 'auto') {
    return visual;
  }

  const profile = SKY_PROFILE_BY_PRESET[preset];
  return {
    ...visual,
    skyGrayness: profile.skyGrayness,
    skyBrightness: profile.skyBrightness,
    sunVisibility: profile.sunVisibility,
    fogDimming: profile.fogDimming,
    ambientDimming: profile.ambientDimming,
    skyPreset: preset,
  };
};

export const buildWeatherVisualState = (
  state: WeatherState,
  mode: WeatherControlMode = 'auto',
  rawOverrides: Partial<WeatherOverrides> | null | undefined = DEFAULT_WEATHER_OVERRIDES,
): WeatherVisualState => {
  const overrides = normalizeWeatherOverrides(rawOverrides);
  const current = getWeatherProfile(state.preset);
  const previousPreset = state.previousPreset && isWeatherPreset(state.previousPreset)
    ? state.previousPreset
    : null;
  const previous = previousPreset ? getWeatherProfile(previousPreset) : current;
  const transitionAlpha =
    state.transitionMs > 0
      ? clamp01(state.presetElapsedMs / state.transitionMs)
      : 1;

  const baseVisual: WeatherVisualState = {
    preset: state.preset,
    previousPreset,
    transitionAlpha,
    mode,
    cloudCoverage: lerp(previous.cloudCoverage, current.cloudCoverage, transitionAlpha),
    cloudDensity: lerp(previous.cloudDensity, current.cloudDensity, transitionAlpha),
    cloudThickness: lerp(previous.cloudThickness, current.cloudThickness, transitionAlpha),
    cloudSharpness: lerp(previous.cloudSharpness, current.cloudSharpness, transitionAlpha),
    cloudGrayness: lerp(previous.cloudGrayness, current.cloudGrayness, transitionAlpha),
    cloudOpacity: lerp(previous.cloudOpacity, current.cloudOpacity, transitionAlpha),
    windOffsetX: state.windOffsetX,
    windOffsetZ: state.windOffsetZ,
    windSpeed: lerp(previous.windSpeed, current.windSpeed, transitionAlpha),
    skyGrayness: lerp(previous.skyGrayness, current.skyGrayness, transitionAlpha),
    skyBrightness: lerp(previous.skyBrightness, current.skyBrightness, transitionAlpha),
    sunVisibility: lerp(previous.sunVisibility, current.sunVisibility, transitionAlpha),
    fogDimming: lerp(previous.fogDimming, current.fogDimming, transitionAlpha),
    ambientDimming: lerp(previous.ambientDimming, current.ambientDimming, transitionAlpha),
    rainIntensity: lerp(previous.rainIntensity, current.rainIntensity, transitionAlpha),
    temperatureCelsius: state.temperatureCelsius,
    skyPreset: overrides.skyPreset,
  };

  const withOverrides: WeatherVisualState = {
    ...baseVisual,
    cloudCoverage:
      overrides.cloudCoverage === null ? baseVisual.cloudCoverage : overrides.cloudCoverage,
    rainIntensity:
      overrides.rainIntensity === null ? baseVisual.rainIntensity : overrides.rainIntensity,
  };

  return applySkyOverride(withOverrides, overrides.skyPreset);
};

export const createDefaultWeatherVisualState = (): WeatherVisualState =>
  buildWeatherVisualState(createInitialWeatherState(() => 0.5));
