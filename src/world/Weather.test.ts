import { describe, expect, it } from 'vitest';
import type { WeatherState } from '../types/weather';
import {
  advanceWeatherState,
  buildWeatherVisualState,
  forceWeatherPreset,
  getWeatherProfile,
  pickNextWeatherPreset,
} from './Weather';

describe('Weather', () => {
  it('only allows snow transitions while the hidden temperature is below zero', () => {
    expect(pickNextWeatherPreset('clear', () => 0.05, 16)).toBe('clear');
    expect(pickNextWeatherPreset('overcast', () => 0.1, 16)).toBe('cloudy_heavy');
    expect(pickNextWeatherPreset('overcast', () => 0.9, 16)).toBe('rain');
    expect(pickNextWeatherPreset('rain_heavy', () => 0.95, 16)).toBe('rain_heavy');
    expect(pickNextWeatherPreset('rain_heavy', () => 0.95, -4)).toBe('snow');
    expect(pickNextWeatherPreset('snow', () => 0.95, -4)).toBe('snow_heavy');
    expect(pickNextWeatherPreset('snow', () => 0.5, 16)).toBe('rain_heavy');
    expect(pickNextWeatherPreset('storm', () => 0.03, -4)).toBe('snow_heavy');
    expect(pickNextWeatherPreset('storm', () => 0.03, 16)).toBe('storm');
  });

  it('interpolates visual values between presets while keeping the hidden temperature global', () => {
    const state: WeatherState = {
      preset: 'rain_heavy',
      previousPreset: 'overcast',
      presetElapsedMs: 5_000,
      presetDurationMs: 60_000,
      transitionMs: 10_000,
      windOffsetX: 12,
      windOffsetZ: -4,
      temperatureCelsius: -3,
      temperatureDriftElapsedMs: 0,
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
    expect(visual.temperatureCelsius).toBe(-3);
    expect(visual.windOffsetX).toBe(12);
    expect(visual.windOffsetZ).toBe(-4);
  });

  it('keeps precipitation intensity ordered and nudges auto temperature back toward 16C', () => {
    expect(getWeatherProfile('rain').rainIntensity).toBeLessThan(
      getWeatherProfile('rain_light').rainIntensity,
    );
    expect(getWeatherProfile('rain_light').rainIntensity).toBeLessThan(
      getWeatherProfile('rain_heavy').rainIntensity,
    );
    expect(getWeatherProfile('rain_heavy').rainIntensity).toBeLessThan(
      getWeatherProfile('storm').rainIntensity,
    );

    const state: WeatherState = {
      preset: 'overcast',
      previousPreset: null,
      presetElapsedMs: 0,
      presetDurationMs: 999_999,
      transitionMs: 10_000,
      windOffsetX: 0,
      windOffsetZ: 0,
      temperatureCelsius: 30,
      temperatureDriftElapsedMs: 0,
    };

    advanceWeatherState(state, 15_000, () => 0, true);
    expect(state.temperatureCelsius).toBe(29);

    forceWeatherPreset(state, 'snow', () => 0.5);
    expect(state.previousPreset).toBe('overcast');
    expect(state.transitionMs).toBeGreaterThan(0);
    expect(state.temperatureCelsius).toBeLessThan(0);

    forceWeatherPreset(state, 'rain', () => 0.5);
    expect(state.temperatureCelsius).toBe(16);
  });
});
