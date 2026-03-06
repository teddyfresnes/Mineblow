import { describe, expect, it } from 'vitest';
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
  });
});
