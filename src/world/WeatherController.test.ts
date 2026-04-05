import { describe, expect, it } from 'vitest';
import { getWeatherProfile } from './Weather';
import { WeatherController } from './WeatherController';

describe('WeatherController', () => {
  it('applies forced presets immediately in manual mode', () => {
    const controller = new WeatherController(() => 0.5);

    controller.setPreset('rain_heavy');

    const debug = controller.getDebugState();
    const profile = getWeatherProfile('rain_heavy');

    expect(debug.mode).toBe('manual');
    expect(debug.preset).toBe('rain_heavy');
    expect(debug.transitionAlpha).toBe(1);
    expect(debug.visual.previousPreset).toBeNull();
    expect(debug.visual.rainIntensity).toBeCloseTo(profile.rainIntensity);
    expect(debug.visual.cloudCoverage).toBeCloseTo(profile.cloudCoverage);
    expect(debug.visual.sunVisibility).toBeCloseTo(profile.sunVisibility);
  });
});
