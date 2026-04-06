import type {
  WeatherControlMode,
  WeatherOverrides,
  WeatherPreset,
  WeatherSkyPreset,
  WeatherState,
  WeatherVisualState,
} from '../types/weather';
import {
  advanceWeatherState,
  buildWeatherVisualState,
  createInitialWeatherState,
  normalizeWeatherOverrides,
  normalizeWeatherState,
  retimeWeatherPreset,
} from './Weather';

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

export interface WeatherControllerDebugState {
  mode: WeatherControlMode;
  preset: WeatherPreset;
  previousPreset: WeatherPreset | null;
  transitionAlpha: number;
  overrides: WeatherOverrides;
  visual: WeatherVisualState;
}

export class WeatherController {
  private state: WeatherState;
  private mode: WeatherControlMode = 'auto';
  private overrides: WeatherOverrides = normalizeWeatherOverrides(null);

  constructor(private readonly random: () => number = Math.random) {
    this.state = createInitialWeatherState(this.random);
  }

  reset(state: Partial<WeatherState> | null | undefined = null): void {
    this.state = normalizeWeatherState(state, this.random);
    this.mode = 'auto';
    this.overrides = normalizeWeatherOverrides(null);
  }

  update(dtMs: number): void {
    advanceWeatherState(this.state, dtMs, this.random, this.mode === 'auto');
  }

  setAutoMode(): void {
    this.mode = 'auto';
  }

  setPreset(preset: WeatherPreset): void {
    this.mode = 'manual';
    retimeWeatherPreset(this.state, preset, this.random);
  }

  setCloudCoverage(value: number | null): void {
    this.overrides = {
      ...this.overrides,
      cloudCoverage: value === null ? null : clamp01(value),
    };
  }

  setRainIntensity(value: number | null): void {
    this.overrides = {
      ...this.overrides,
      rainIntensity: value === null ? null : clamp01(value),
    };
  }

  setSkyPreset(value: WeatherSkyPreset): void {
    this.overrides = {
      ...this.overrides,
      skyPreset: value,
    };
  }

  getWeatherState(): WeatherState {
    return {
      ...this.state,
    };
  }

  getVisualState(): WeatherVisualState {
    return buildWeatherVisualState(this.state, this.mode, this.overrides);
  }

  getDebugState(): WeatherControllerDebugState {
    const visual = this.getVisualState();
    return {
      mode: this.mode,
      preset: this.state.preset,
      previousPreset: visual.previousPreset,
      transitionAlpha: visual.transitionAlpha,
      overrides: {
        ...this.overrides,
      },
      visual,
    };
  }
}
