import {
  WEATHER_PRESET_CHAIN,
  type WeatherPreset,
  type WorldEnvironmentState,
  type WeatherState,
  type WeatherVisualState,
} from '../types/weather';

interface WeatherProfile {
  cloudCover: number;
  cloudDensity: number;
  cloudGrayness: number;
  cloudOpacity: number;
  sunOcclusion: number;
  skyDesaturation: number;
  fogDimming: number;
  ambientDimming: number;
  precipitationIntensity: number;
  windSpeed: number;
  minDurationMs: number;
  maxDurationMs: number;
  minTransitionMs: number;
  maxTransitionMs: number;
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
const lerp = (from: number, to: number, alpha: number): number => from + (to - from) * alpha;

const WEATHER_PROFILE_BY_PRESET: Record<WeatherPreset, WeatherProfile> = {
  clear: {
    cloudCover: 0.02,
    cloudDensity: 0.4,
    cloudGrayness: 0,
    cloudOpacity: 0.04,
    sunOcclusion: 0,
    skyDesaturation: 0,
    fogDimming: 0,
    ambientDimming: 0,
    precipitationIntensity: 0,
    windSpeed: 0.0028,
    minDurationMs: 2 * 60_000,
    maxDurationMs: 5 * 60_000,
    minTransitionMs: 20_000,
    maxTransitionMs: 28_000,
  },
  few_white: {
    cloudCover: 0.14,
    cloudDensity: 0.48,
    cloudGrayness: 0.06,
    cloudOpacity: 0.26,
    sunOcclusion: 0.08,
    skyDesaturation: 0.03,
    fogDimming: 0.02,
    ambientDimming: 0.03,
    precipitationIntensity: 0,
    windSpeed: 0.0032,
    minDurationMs: 2 * 60_000,
    maxDurationMs: 6 * 60_000,
    minTransitionMs: 22_000,
    maxTransitionMs: 30_000,
  },
  many_white: {
    cloudCover: 0.32,
    cloudDensity: 0.58,
    cloudGrayness: 0.1,
    cloudOpacity: 0.42,
    sunOcclusion: 0.18,
    skyDesaturation: 0.08,
    fogDimming: 0.05,
    ambientDimming: 0.07,
    precipitationIntensity: 0,
    windSpeed: 0.0038,
    minDurationMs: 3 * 60_000,
    maxDurationMs: 6.5 * 60_000,
    minTransitionMs: 24_000,
    maxTransitionMs: 32_000,
  },
  gray: {
    cloudCover: 0.54,
    cloudDensity: 0.7,
    cloudGrayness: 0.42,
    cloudOpacity: 0.58,
    sunOcclusion: 0.44,
    skyDesaturation: 0.26,
    fogDimming: 0.12,
    ambientDimming: 0.16,
    precipitationIntensity: 0,
    windSpeed: 0.0045,
    minDurationMs: 2.5 * 60_000,
    maxDurationMs: 5.5 * 60_000,
    minTransitionMs: 24_000,
    maxTransitionMs: 34_000,
  },
  overcast: {
    cloudCover: 0.76,
    cloudDensity: 0.86,
    cloudGrayness: 0.66,
    cloudOpacity: 0.78,
    sunOcclusion: 0.72,
    skyDesaturation: 0.42,
    fogDimming: 0.22,
    ambientDimming: 0.24,
    precipitationIntensity: 0,
    windSpeed: 0.0052,
    minDurationMs: 2.5 * 60_000,
    maxDurationMs: 6 * 60_000,
    minTransitionMs: 28_000,
    maxTransitionMs: 36_000,
  },
  light_precip: {
    cloudCover: 0.84,
    cloudDensity: 0.92,
    cloudGrayness: 0.78,
    cloudOpacity: 0.86,
    sunOcclusion: 0.88,
    skyDesaturation: 0.58,
    fogDimming: 0.3,
    ambientDimming: 0.34,
    precipitationIntensity: 0.45,
    windSpeed: 0.0061,
    minDurationMs: 2 * 60_000,
    maxDurationMs: 5 * 60_000,
    minTransitionMs: 28_000,
    maxTransitionMs: 38_000,
  },
  heavy_precip: {
    cloudCover: 0.94,
    cloudDensity: 1,
    cloudGrayness: 0.9,
    cloudOpacity: 0.94,
    sunOcclusion: 0.98,
    skyDesaturation: 0.72,
    fogDimming: 0.4,
    ambientDimming: 0.42,
    precipitationIntensity: 1,
    windSpeed: 0.0074,
    minDurationMs: 2 * 60_000,
    maxDurationMs: 4.5 * 60_000,
    minTransitionMs: 30_000,
    maxTransitionMs: 40_000,
  },
};

const getRandomBetween = (min: number, max: number, random: () => number): number =>
  lerp(min, max, clamp(random(), 0, 1));

export const DEFAULT_WEATHER_PRESET: WeatherPreset = 'clear';
export const DEFAULT_TIME_OF_DAY = 0;
export const DEFAULT_MOON_PHASE = 0;

export const getWeatherProfile = (preset: WeatherPreset): WeatherProfile =>
  WEATHER_PROFILE_BY_PRESET[preset];

export const createInitialWeatherState = (random: () => number = Math.random): WeatherState => {
  const profile = getWeatherProfile(DEFAULT_WEATHER_PRESET);
  return {
    preset: DEFAULT_WEATHER_PRESET,
    previousPreset: null,
    presetElapsedMs: 0,
    presetDurationMs: getRandomBetween(profile.minDurationMs, profile.maxDurationMs, random),
    transitionMs: getRandomBetween(profile.minTransitionMs, profile.maxTransitionMs, random),
    windOffsetX: random() * 200 - 100,
    windOffsetZ: random() * 200 - 100,
    surfaceSnowTarget: 0,
    surfaceSnowProgressMs: 0,
  };
};

export const clampSurfaceSnowTarget = (value: number): number =>
  Math.max(0, Math.min(8, Math.floor(value)));

export const isWeatherPreset = (value: unknown): value is WeatherPreset =>
  typeof value === 'string' &&
  WEATHER_PRESET_CHAIN.includes(value as WeatherPreset);

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
    surfaceSnowTarget: clampSurfaceSnowTarget(state.surfaceSnowTarget ?? 0),
    surfaceSnowProgressMs:
      typeof state.surfaceSnowProgressMs === 'number' && Number.isFinite(state.surfaceSnowProgressMs)
        ? state.surfaceSnowProgressMs
        : 0,
  };
};

export const createInitialEnvironmentState = (
  random: () => number = Math.random,
): WorldEnvironmentState => ({
  timeOfDay: DEFAULT_TIME_OF_DAY,
  moonPhase: DEFAULT_MOON_PHASE,
  weather: createInitialWeatherState(random),
});

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
  };
};

export const pickNextWeatherPreset = (
  currentPreset: WeatherPreset,
  random: () => number = Math.random,
): WeatherPreset => {
  const currentIndex = WEATHER_PRESET_CHAIN.indexOf(currentPreset);
  if (currentIndex < 0) {
    return DEFAULT_WEATHER_PRESET;
  }

  const stepRoll = clamp(random(), 0, 0.999999);
  let step = 0;
  if (stepRoll < 0.28) {
    step = -1;
  } else if (stepRoll > 0.72) {
    step = 1;
  }

  const nextIndex = clamp(currentIndex + step, 0, WEATHER_PRESET_CHAIN.length - 1);
  return WEATHER_PRESET_CHAIN[nextIndex];
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
  state.previousPreset = null;
  state.transitionMs = 0;
  state.surfaceSnowProgressMs = 0;
};

export const advanceWeatherState = (
  state: WeatherState,
  dtMs: number,
  random: () => number = Math.random,
): void => {
  if (dtMs <= 0) {
    return;
  }

  state.presetElapsedMs += dtMs;
  const profile = getWeatherProfile(state.preset);
  const windStep = profile.windSpeed * dtMs;
  state.windOffsetX += windStep;
  state.windOffsetZ += windStep * 0.58;

  if (state.presetElapsedMs < state.presetDurationMs) {
    return;
  }

  const nextPreset = pickNextWeatherPreset(state.preset, random);
  retimeWeatherPreset(state, nextPreset, random);
};

export const buildWeatherVisualState = (state: WeatherState): WeatherVisualState => {
  const current = getWeatherProfile(state.preset);
  const previousPreset = state.previousPreset && isWeatherPreset(state.previousPreset)
    ? state.previousPreset
    : null;
  const previous = previousPreset ? getWeatherProfile(previousPreset) : current;
  const transitionAlpha =
    state.transitionMs > 0
      ? clamp(state.presetElapsedMs / state.transitionMs, 0, 1)
      : 1;

  return {
    preset: state.preset,
    previousPreset,
    transitionAlpha,
    cloudCover: lerp(previous.cloudCover, current.cloudCover, transitionAlpha),
    cloudDensity: lerp(previous.cloudDensity, current.cloudDensity, transitionAlpha),
    cloudGrayness: lerp(previous.cloudGrayness, current.cloudGrayness, transitionAlpha),
    cloudOpacity: lerp(previous.cloudOpacity, current.cloudOpacity, transitionAlpha),
    windOffsetX: state.windOffsetX,
    windOffsetZ: state.windOffsetZ,
    sunOcclusion: lerp(previous.sunOcclusion, current.sunOcclusion, transitionAlpha),
    skyDesaturation: lerp(previous.skyDesaturation, current.skyDesaturation, transitionAlpha),
    fogDimming: lerp(previous.fogDimming, current.fogDimming, transitionAlpha),
    ambientDimming: lerp(previous.ambientDimming, current.ambientDimming, transitionAlpha),
    precipitationIntensity: lerp(
      previous.precipitationIntensity,
      current.precipitationIntensity,
      transitionAlpha,
    ),
  };
};

export const getSurfaceSnowTargetStepMs = (preset: WeatherPreset): number | null => {
  if (preset === 'light_precip') {
    return 180_000;
  }
  if (preset === 'heavy_precip') {
    return 75_000;
  }
  if (preset === 'clear' || preset === 'few_white' || preset === 'many_white') {
    return -120_000;
  }
  return null;
};
