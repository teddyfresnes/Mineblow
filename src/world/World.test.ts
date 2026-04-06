import { describe, expect, it, vi } from 'vitest';
import { WORLD_CONFIG } from '../game/Config';
import { buildWeatherVisualState } from './Weather';
import { World } from './World';

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

      const weather = {
        ...buildWeatherVisualState(
          {
            preset: 'snow_heavy',
            previousPreset: null,
            presetElapsedMs: 0,
            presetDurationMs: 1,
            transitionMs: 0,
            windOffsetX: 0,
            windOffsetZ: 0,
          },
          'manual',
        ),
        temperatureOffset: -1,
      };

      world.tickWeatherAccumulation(1.25, weather);

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
});
