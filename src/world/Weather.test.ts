import { describe, expect, it } from 'vitest';
import type { WeatherState } from '../types/weather';
import {
  buildWeatherVisualState,
  getWeatherProfile,
  pickNextWeatherPreset,
} from './Weather';

describe('Weather', () => {
  it('only moves to adjacent presets in the weather chain', () => {
    expect(pickNextWeatherPreset('clear', () => 0.05)).toBe('clear');
    expect(pickNextWeatherPreset('gray', () => 0.1)).toBe('many_white');
    expect(pickNextWeatherPreset('gray', () => 0.5)).toBe('gray');
    expect(pickNextWeatherPreset('gray', () => 0.9)).toBe('overcast');
    expect(pickNextWeatherPreset('heavy_precip', () => 0.95)).toBe('heavy_precip');
  });

  it('interpolates visual values between the previous and current preset', () => {
    const state: WeatherState = {
      preset: 'heavy_precip',
      previousPreset: 'overcast',
      presetElapsedMs: 5_000,
      presetDurationMs: 60_000,
      transitionMs: 10_000,
      windOffsetX: 12,
      windOffsetZ: -4,
      surfaceSnowTarget: 4,
      surfaceSnowProgressMs: 12_000,
    };

    const previous = getWeatherProfile('overcast');
    const current = getWeatherProfile('heavy_precip');
    const visual = buildWeatherVisualState(state);

    expect(visual.transitionAlpha).toBe(0.5);
    expect(visual.cloudCover).toBeCloseTo((previous.cloudCover + current.cloudCover) / 2);
    expect(visual.cloudOpacity).toBeCloseTo((previous.cloudOpacity + current.cloudOpacity) / 2);
    expect(visual.sunOcclusion).toBeCloseTo((previous.sunOcclusion + current.sunOcclusion) / 2);
    expect(visual.precipitationIntensity).toBeCloseTo(
      (previous.precipitationIntensity + current.precipitationIntensity) / 2,
    );
    expect(visual.windOffsetX).toBe(12);
    expect(visual.windOffsetZ).toBe(-4);
  });
});
