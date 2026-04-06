import { describe, expect, it, vi } from 'vitest';
import { WORLD_CONFIG } from '../game/Config';
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
});
