import { describe, expect, it } from 'vitest';
import { getWeatherProfile } from './Weather';
import { WeatherController } from './WeatherController';

describe('WeatherController', () => {
  it('keeps forced presets in manual mode while transitioning visuals progressively', () => {
    const controller = new WeatherController(() => 0.5);

    controller.setPreset('rain_heavy');

    const debug = controller.getDebugState();
    const profile = getWeatherProfile('rain_heavy');
    const previousProfile = getWeatherProfile('clear');

    expect(debug.mode).toBe('manual');
    expect(debug.preset).toBe('rain_heavy');
    expect(debug.transitionAlpha).toBe(0);
    expect(debug.visual.previousPreset).toBe('clear');
    expect(debug.visual.rainIntensity).toBeCloseTo(previousProfile.rainIntensity);
    expect(debug.visual.cloudCoverage).toBeCloseTo(previousProfile.cloudCoverage);
    expect(debug.visual.sunVisibility).toBeCloseTo(previousProfile.sunVisibility);
    expect(debug.visual.temperatureCelsius).toBe(16);

    controller.update(120_000);
    const settled = controller.getDebugState();
    expect(settled.transitionAlpha).toBe(1);
    expect(settled.visual.rainIntensity).toBeCloseTo(profile.rainIntensity);
    expect(settled.visual.cloudCoverage).toBeCloseTo(profile.cloudCoverage);
    expect(settled.visual.sunVisibility).toBeCloseTo(profile.sunVisibility);

    controller.setPreset('snow');
    expect(controller.getDebugState().visual.temperatureCelsius).toBeLessThan(0);
  });
});
