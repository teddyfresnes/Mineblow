import { describe, expect, it, vi } from 'vitest';
import { WORLD_CONFIG } from '../game/Config';
import { buildWeatherVisualState } from './Weather';
import { shouldAccumulateSnowLayerFromHash, World } from './World';

const buildManualWeather = (
  preset: 'clear' | 'snow' | 'snow_heavy',
  temperatureCelsius: number,
) =>
  buildWeatherVisualState(
    {
      preset,
      previousPreset: null,
      presetElapsedMs: 0,
      presetDurationMs: 1,
      transitionMs: 0,
      windOffsetX: 0,
      windOffsetZ: 0,
      temperatureCelsius,
      temperatureDriftElapsedMs: 0,
    },
    'manual',
  );

describe('World diffs', () => {
  it('tracks modified blocks and drops the diff when restored to base terrain', () => {
    const world = new World('diffs');
    world.primeAround(0, 0, 0);

    const surfaceY = world.getTopSolidBlockY(0, 0);
    expect(world.setBlock(0, surfaceY, 0, 0)).toBe(true);
    expect(world.getAllDiffRecords()).toHaveLength(1);

    const baseBlock = world.generator.getTerrainBlock(0, surfaceY, 0);
    expect(world.setBlock(0, surfaceY, 0, baseBlock)).toBe(true);
    expect(world.getAllDiffRecords()).toHaveLength(0);
    world.dispose();
  });

  it('counts in-flight generation as pending and drains after integration', async () => {
    const config = WORLD_CONFIG as { preloadRadius: number };
    const previousPreloadRadius = config.preloadRadius;
    config.preloadRadius = 0;
    const world = new World('pending');

    try {
      world.enqueueStreamingAround(0, 0);
      expect(world.hasPendingGeneration()).toBe(true);

      world.processGenerationBudget(1);
      expect(world.hasPendingGeneration()).toBe(true);

      await Promise.resolve();
      world.processGenerationBudget(1);
      await Promise.resolve();

      expect(world.hasPendingGeneration()).toBe(false);
    } finally {
      world.dispose();
      config.preloadRadius = previousPreloadRadius;
    }
  });

  it('does not rebuild chunk streaming when staying inside the same chunk', () => {
    const world = new World('streaming-cache');

    try {
      const dropStaleSpy = vi.spyOn(world as any, 'dropStaleCompletedChunks');

      world.enqueueStreamingAround(0.2, 0.2);
      world.enqueueStreamingAround(0.8, 0.8);

      expect(dropStaleSpy).toHaveBeenCalledTimes(1);
    } finally {
      world.dispose();
    }
  });

  it('accumulates snow layers on exposed loaded surfaces during snowy weather', () => {
    const world = new World('weather-accumulation');
    world.primeAround(0, 0, 0);

    try {
      for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
        for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
          world.setBlock(x, 90, z, 3);
          for (let y = 91; y < WORLD_CONFIG.chunkSizeY; y += 1) {
            world.setBlock(x, y, z, 0);
          }
        }
      }

      const weather = buildManualWeather('snow_heavy', -10);

      world.tickWeatherAccumulation(8, weather);

      let accumulatedColumns = 0;
      for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
        for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
          if (world.getBlock(x, 91, z) === 33) {
            accumulatedColumns += 1;
          }
        }
      }

      expect(accumulatedColumns).toBeGreaterThan(0);
    } finally {
      world.dispose();
    }
  });

  it('makes higher snow layers increasingly rarer to accumulate', () => {
    expect(shouldAccumulateSnowLayerFromHash(0, 0x7fffffff)).toBe(true);
    expect(shouldAccumulateSnowLayerFromHash(1, 0x1fffffff)).toBe(true);
    expect(shouldAccumulateSnowLayerFromHash(1, 0x80000000)).toBe(false);
    expect(shouldAccumulateSnowLayerFromHash(2, 0x0fffffff)).toBe(true);
    expect(shouldAccumulateSnowLayerFromHash(2, 0x40000000)).toBe(false);
  });

  it('freezes exposed surface water into ice during snowy weather when a solid edge supports it', () => {
    const world = new World('surface-freeze');
    world.primeAround(0, 0, 0);

    try {
      for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
        for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
          world.setBlock(x, 89, z, 3);
          world.setBlock(x, 90, z, x % 2 === 0 ? 3 : 10);
          for (let y = 91; y < WORLD_CONFIG.chunkSizeY; y += 1) {
            world.setBlock(x, y, z, 0);
          }
        }
      }

      const snowWeather = buildManualWeather('snow_heavy', -10);
      for (let tick = 0; tick < 160; tick += 1) {
        world.tickWeatherAccumulation(8, snowWeather);
      }

      let iceColumns = 0;
      for (let x = 1; x < WORLD_CONFIG.chunkSizeX; x += 2) {
        for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
          if (world.getBlock(x, 90, z) === 25) {
            iceColumns += 1;
          }
        }
      }

      expect(iceColumns).toBeGreaterThan(0);
    } finally {
      world.dispose();
    }
  });

  it('replays missed snow and thaw history when a chunk is loaded later', () => {
    const eagerWorld = new World('surface-catch-up');
    const delayedWorld = new World('surface-catch-up');

    try {
      eagerWorld.primeAround(0, 0, 0);
      eagerWorld.primeAround(WORLD_CONFIG.chunkSizeX, 0, 0);
      delayedWorld.primeAround(0, 0, 0);

      const snowWeather = buildManualWeather('snow_heavy', -10);
      const thawWeather = buildManualWeather('clear', 16);

      for (let tick = 0; tick < 48; tick += 1) {
        eagerWorld.tickWeatherAccumulation(8, snowWeather);
        delayedWorld.tickWeatherAccumulation(8, snowWeather);
      }
      for (let tick = 0; tick < 24; tick += 1) {
        eagerWorld.tickWeatherAccumulation(8, thawWeather);
        delayedWorld.tickWeatherAccumulation(8, thawWeather);
      }

      delayedWorld.primeAround(WORLD_CONFIG.chunkSizeX, 0, 0);

      expect(Array.from(delayedWorld.getChunkByKey('1,0')!.blocks)).toEqual(
        Array.from(eagerWorld.getChunkByKey('1,0')!.blocks),
      );
    } finally {
      eagerWorld.dispose();
      delayedWorld.dispose();
    }
  });
});
