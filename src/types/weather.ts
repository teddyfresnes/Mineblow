export const WEATHER_PRESET_CHAIN = [
  'clear',
  'cloudy_light',
  'cloudy_heavy',
  'overcast',
  'rain',
  'rain_light',
  'rain_heavy',
  'snow',
  'snow_heavy',
  'storm',
] as const;

export const WEATHER_SKY_PRESET_OPTIONS = [
  'auto',
  'blue',
  'soft',
  'gray',
  'storm',
] as const;

export type WeatherPreset = (typeof WEATHER_PRESET_CHAIN)[number];
export type WeatherSkyPreset = (typeof WEATHER_SKY_PRESET_OPTIONS)[number];
export type WeatherControlMode = 'auto' | 'manual';
export type LocalPrecipitationType = 'none' | 'rain' | 'snow';

export interface WeatherState {
  preset: WeatherPreset;
  previousPreset?: WeatherPreset | null;
  presetElapsedMs: number;
  presetDurationMs: number;
  transitionMs: number;
  windOffsetX: number;
  windOffsetZ: number;
}

export interface WeatherOverrides {
  cloudCoverage: number | null;
  rainIntensity: number | null;
  skyPreset: WeatherSkyPreset;
}

export interface WeatherVisualState {
  preset: WeatherPreset;
  previousPreset: WeatherPreset | null;
  transitionAlpha: number;
  mode: WeatherControlMode;
  cloudCoverage: number;
  cloudDensity: number;
  cloudThickness: number;
  cloudSharpness: number;
  cloudGrayness: number;
  cloudOpacity: number;
  windOffsetX: number;
  windOffsetZ: number;
  windSpeed: number;
  skyGrayness: number;
  skyBrightness: number;
  sunVisibility: number;
  fogDimming: number;
  ambientDimming: number;
  rainIntensity: number;
  temperatureOffset: number;
  skyPreset: WeatherSkyPreset;
}

export interface WorldEnvironmentState {
  timeOfDay: number;
  moonPhase: number;
  weather: WeatherState;
}
