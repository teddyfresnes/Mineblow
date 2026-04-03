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
    expect(pickNextWeatherPreset('overcast', () => 0.1)).toBe('cloudy_heavy');
    expect(pickNextWeatherPreset('overcast', () => 0.5)).toBe('overcast');
    expect(pickNextWeatherPreset('overcast', () => 0.9)).toBe('rain_light');
    expect(pickNextWeatherPreset('storm', () => 0.95)).toBe('storm');
  });

  it('interpolates visual values between the previous and current preset', () => {
    const state: WeatherState = {
      preset: 'rain_heavy',
      previousPreset: 'overcast',
      presetElapsedMs: 5_000,
      presetDurationMs: 60_000,
      transitionMs: 10_000,
      windOffsetX: 12,
      windOffsetZ: -4,
    };

    const previous = getWeatherProfile('overcast');
    const current = getWeatherProfile('rain_heavy');
    const visual = buildWeatherVisualState(state);

    expect(visual.transitionAlpha).toBe(0.5);
    expect(visual.cloudCoverage).toBeCloseTo((previous.cloudCoverage + current.cloudCoverage) / 2);
    expect(visual.cloudOpacity).toBeCloseTo((previous.cloudOpacity + current.cloudOpacity) / 2);
    expect(visual.sunVisibility).toBeCloseTo((previous.sunVisibility + current.sunVisibility) / 2);
    expect(visual.rainIntensity).toBeCloseTo(
      (previous.rainIntensity + current.rainIntensity) / 2,
    );
    expect(visual.windOffsetX).toBe(12);
    expect(visual.windOffsetZ).toBe(-4);
  });
});
