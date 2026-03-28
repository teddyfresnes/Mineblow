import { describe, expect, it } from 'vitest';
import {
  buildWaterTopUvs,
  computeWaterTopFlow,
  shouldRenderWaterTopFace,
  smoothWaterCornerHeight,
  waterLevelToSurfaceHeight,
  WATER_TOP_FLOW_MIN_MAGNITUDE,
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

  it('derives a directional top flow vector from corner heights', () => {
    const flow = computeWaterTopFlow(1, 1, 0.5, 0.5);
    expect(flow.magnitude).toBeGreaterThan(WATER_TOP_FLOW_MIN_MAGNITUDE);
    expect(flow.z).toBeGreaterThan(0);
  });

  it('uses inset rotated UVs for flowing water and full-tile UVs for still water', () => {
    const rect = { u0: 0, v0: 0, u1: 1, v1: 1 };
    const stillUvs = buildWaterTopUvs(rect, { x: 0, z: 0, magnitude: 0 });
    expect(stillUvs).toEqual([
      [0, 1],
      [0, 0],
      [1, 0],
      [1, 1],
    ]);

    const flowUvs = buildWaterTopUvs(rect, { x: 1, z: 0, magnitude: 1 });
    for (const [u, v] of flowUvs) {
      expect(u).toBeGreaterThan(0);
      expect(u).toBeLessThan(1);
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThan(1);
    }
  });
});
