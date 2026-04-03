export const WEATHER_PRESET_CHAIN = [
  'clear',
  'few_white',
  'many_white',
  'gray',
  'overcast',
  'light_precip',
  'heavy_precip',
] as const;

export type WeatherPreset = (typeof WEATHER_PRESET_CHAIN)[number];

export type LocalPrecipitationType = 'none' | 'rain' | 'snow';

export interface WeatherState {
  preset: WeatherPreset;
  previousPreset?: WeatherPreset | null;
  presetElapsedMs: number;
  presetDurationMs: number;
  transitionMs: number;
  windOffsetX: number;
  windOffsetZ: number;
  surfaceSnowTarget: number;
  surfaceSnowProgressMs?: number;
}

export interface WeatherVisualState {
  preset: WeatherPreset;
  previousPreset: WeatherPreset | null;
  transitionAlpha: number;
  cloudCover: number;
  cloudDensity: number;
  cloudGrayness: number;
  cloudOpacity: number;
  windOffsetX: number;
  windOffsetZ: number;
  sunOcclusion: number;
  skyDesaturation: number;
  fogDimming: number;
  ambientDimming: number;
  precipitationIntensity: number;
}

export interface WorldEnvironmentState {
  timeOfDay: number;
  moonPhase: number;
  weather: WeatherState;
}
