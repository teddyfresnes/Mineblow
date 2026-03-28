import { describe, expect, it } from 'vitest';
import { toFlowWaterId, WATER_SOURCE_BLOCK_ID } from './BlockRegistry';
import {
  getWaterSurfaceHeightForBlock,
  isPointBelowWaterSurface,
  resolveWaterSubmersionWithHysteresis,
  sampleWaterSurfaceAtPoint,
  WATER_SURFACE_BASE_HEIGHT,
  WATER_SURFACE_MIN_HEIGHT,
} from './WaterSurface';
import { World } from './World';

describe('WaterSurface helpers', () => {
  it('computes source, flow and stacked surface heights', () => {
    const flow7 = toFlowWaterId(7);
    expect(getWaterSurfaceHeightForBlock(WATER_SOURCE_BLOCK_ID, 0)).toBeCloseTo(
      WATER_SURFACE_BASE_HEIGHT,
      6,
    );
    expect(getWaterSurfaceHeightForBlock(flow7, 0)).toBeCloseTo(WATER_SURFACE_MIN_HEIGHT, 6);
    expect(
      getWaterSurfaceHeightForBlock(WATER_SOURCE_BLOCK_ID, WATER_SOURCE_BLOCK_ID),
    ).toBeCloseTo(1, 6);
  });

  it('samples the top water surface for a deep column', () => {
    const world = new World('water-surface-column');
    world.primeAround(0, 0, 0);

    for (let y = 78; y <= 83; y += 1) {
      world.setBlock(2, y, 2, 0);
    }
    world.setBlock(2, 79, 2, toFlowWaterId(7));
    world.setBlock(2, 80, 2, toFlowWaterId(3));
    world.setBlock(2, 81, 2, WATER_SOURCE_BLOCK_ID);

    const sample = sampleWaterSurfaceAtPoint(world, 2.4, 80.2, 2.4);
    expect(sample).not.toBeNull();
    expect(sample?.blockY).toBe(81);
    expect(sample?.surfaceY).toBeCloseTo(81 + WATER_SURFACE_BASE_HEIGHT, 6);
    expect(isPointBelowWaterSurface(world, 2.4, 80.2, 2.4)).toBe(true);
    expect(isPointBelowWaterSurface(world, 2.4, 82.0, 2.4)).toBe(false);
    world.dispose();
  });

  it('keeps stable transitions with entry/exit hysteresis', () => {
    const surfaceY = 64.86;
    expect(resolveWaterSubmersionWithHysteresis(false, 64.84, surfaceY)).toBe(true);
    expect(resolveWaterSubmersionWithHysteresis(false, 64.85, surfaceY)).toBe(false);
    expect(resolveWaterSubmersionWithHysteresis(true, 64.88, surfaceY)).toBe(true);
    expect(resolveWaterSubmersionWithHysteresis(true, 64.89, surfaceY)).toBe(false);
    expect(resolveWaterSubmersionWithHysteresis(true, 64.5, null)).toBe(false);
  });
});
