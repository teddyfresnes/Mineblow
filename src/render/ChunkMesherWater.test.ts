import { describe, expect, it } from 'vitest';
import {
  shouldRenderWaterTopFace,
  smoothWaterCornerHeight,
  waterLevelToSurfaceHeight,
  WATER_SURFACE_BASE_HEIGHT,
  WATER_SURFACE_MIN_HEIGHT,
} from './ChunkMesher';

describe('ChunkMesher water helpers', () => {
  it('maps water levels to descending surface heights', () => {
    expect(waterLevelToSurfaceHeight(0)).toBeCloseTo(WATER_SURFACE_BASE_HEIGHT, 6);
    expect(waterLevelToSurfaceHeight(1)).toBeLessThan(WATER_SURFACE_BASE_HEIGHT);
    expect(waterLevelToSurfaceHeight(7)).toBeCloseTo(WATER_SURFACE_MIN_HEIGHT, 6);
  });

  it('hides top faces when water is directly above', () => {
    expect(shouldRenderWaterTopFace(10)).toBe(false);
    expect(shouldRenderWaterTopFace(26)).toBe(false);
    expect(shouldRenderWaterTopFace(0)).toBe(true);
  });

  it('smooths water corner heights from neighboring samples', () => {
    const height = smoothWaterCornerHeight([1, 0.5, null, 0.25], 0.875);
    expect(height).toBeCloseTo((1 + 0.5 + 0.25) / 3, 6);
    expect(smoothWaterCornerHeight([null, null, null, null], 0.875)).toBeCloseTo(0.875, 6);
  });
});
