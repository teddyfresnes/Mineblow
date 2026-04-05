import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  InstancedBufferGeometry,
  Mesh,
  PerspectiveCamera,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';
import { World } from '../world/World';
import { getWeatherProfile } from '../world/Weather';
import { RainField } from './RainField';

describe('RainField integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(TextureLoader.prototype, 'load').mockImplementation(() => new Texture());
  });

  it('emits visible rain instances for heavy rain in an exposed loaded world', () => {
    const world = new World('rain-field-render');
    world.primeAround(0, 0, 1);

    try {
      const rain = new RainField();
      const profile = getWeatherProfile('rain_heavy');
      rain.setWeatherState({
        preset: 'rain_heavy',
        previousPreset: null,
        transitionAlpha: 1,
        mode: 'manual',
        cloudCoverage: profile.cloudCoverage,
        cloudDensity: profile.cloudDensity,
        cloudThickness: profile.cloudThickness,
        cloudSharpness: profile.cloudSharpness,
        cloudGrayness: profile.cloudGrayness,
        cloudOpacity: profile.cloudOpacity,
        windOffsetX: 0,
        windOffsetZ: 0,
        windSpeed: profile.windSpeed,
        skyGrayness: profile.skyGrayness,
        skyBrightness: profile.skyBrightness,
        sunVisibility: profile.sunVisibility,
        fogDimming: profile.fogDimming,
        ambientDimming: profile.ambientDimming,
        rainIntensity: profile.rainIntensity,
        skyPreset: 'auto',
      });

      const camera = new PerspectiveCamera(75, 1, 0.1, 500);
      camera.position.set(0.5, 70, 0.5);
      camera.lookAt(new Vector3(0.5, 70, -10));
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();

      rain.update(1 / 60, camera, world);

      const rainMesh = rain.group.children[0] as Mesh;
      const splashMesh = rain.group.children[1] as Mesh;
      const rainGeometry = rainMesh.geometry as InstancedBufferGeometry;
      const splashGeometry = splashMesh.geometry as InstancedBufferGeometry;

      expect(rainMesh.visible).toBe(true);
      expect(rainGeometry.instanceCount).toBeGreaterThan(0);
      expect(splashGeometry.instanceCount).toBeGreaterThan(0);
    } finally {
      world.dispose();
    }
  });
});
