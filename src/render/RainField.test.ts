import { describe, expect, it, vi } from 'vitest';
import { Frustum, Matrix4, PerspectiveCamera, Vector3 } from 'three';
import { WORLD_CONFIG } from '../game/Config';
import { World } from '../world/World';
import {
  buildRainChunkCache,
  buildStableRainColumnVariation,
  getOrRefreshRainChunkCache,
  shouldRenderRainColumn,
  type RainChunkCache,
} from './RainField';

describe('RainField helpers', () => {
  it('reuses a chunk cache until the revision changes', () => {
    const existing: RainChunkCache = {
      revision: 4,
      columns: [],
      lastSeenFrame: 0,
    };
    const rebuild = vi.fn((): RainChunkCache => ({
      revision: 5,
      columns: [],
      lastSeenFrame: 0,
    }));

    expect(getOrRefreshRainChunkCache(existing, 4, rebuild)).toBe(existing);
    expect(rebuild).not.toHaveBeenCalled();

    const refreshed = getOrRefreshRainChunkCache(existing, 5, rebuild);
    expect(rebuild).toHaveBeenCalledTimes(1);
    expect(refreshed).not.toBe(existing);
    expect(refreshed.revision).toBe(5);
  });

  it('keeps per-column rain variation stable in world space', () => {
    const first = buildStableRainColumnVariation(12, -7);
    const second = buildStableRainColumnVariation(12, -7);
    const other = buildStableRainColumnVariation(13, -7);

    expect(second).toEqual(first);
    expect(other).not.toEqual(first);
  });

  it('updates cached precipitation surface heights when a roof is placed or removed', () => {
    const world = new World('rain-field-cache');
    world.primeAround(0, 0, 0);

    try {
      const chunk = world.getChunkByKey('0,0');
      expect(chunk).toBeDefined();

      const initial = buildRainChunkCache(chunk!, world);
      const initialColumn = initial.columns.find((column) => column.worldX === 0 && column.worldZ === 0);
      expect(initialColumn).toBeDefined();

      const baseSurfaceTopY = initialColumn?.surfaceTopY ?? -1;
      const roofY = Math.min(WORLD_CONFIG.chunkSizeY - 2, Math.floor(baseSurfaceTopY) + 8);
      expect(world.setBlock(0, roofY, 0, 3)).toBe(true);

      const withRoof = buildRainChunkCache(world.getChunkByKey('0,0')!, world);
      const roofColumn = withRoof.columns.find((column) => column.worldX === 0 && column.worldZ === 0);
      expect(roofColumn?.surfaceTopY).toBe(roofY + 1);

      expect(world.setBlock(0, roofY, 0, 0)).toBe(true);

      const restored = buildRainChunkCache(world.getChunkByKey('0,0')!, world);
      const restoredColumn = restored.columns.find((column) => column.worldX === 0 && column.worldZ === 0);
      expect(restoredColumn?.surfaceTopY).toBe(baseSurfaceTopY);
    } finally {
      world.dispose();
    }
  });

  it('filters columns that are outside the frustum or weather radius', () => {
    const camera = new PerspectiveCamera(70, 1, 0.1, 100);
    camera.position.set(0.5, 12, 0.5);
    camera.lookAt(new Vector3(0.5, 12, -8));
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    const frustum = new Frustum().setFromProjectionMatrix(
      new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse),
    );

    expect(shouldRenderRainColumn(frustum, camera.position.x, camera.position.z, 0, -5, 1, 20)).toBe(
      true,
    );
    expect(shouldRenderRainColumn(frustum, camera.position.x, camera.position.z, 0, 5, 1, 20)).toBe(
      false,
    );
    expect(
      shouldRenderRainColumn(frustum, camera.position.x, camera.position.z, 28, -5, 1, 20),
    ).toBe(false);
  });
});
