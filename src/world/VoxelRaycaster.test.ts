import { describe, expect, it } from 'vitest';
import { VoxelRaycaster } from './VoxelRaycaster';
import { World } from './World';

describe('VoxelRaycaster', () => {
  it('hits the first solid block on a downward ray', () => {
    const world = new World('raycast');
    world.primeAround(0, 0, 0);
    const surfaceY = world.getTopSolidBlockY(0, 0);

    const hit = VoxelRaycaster.cast(
      world,
      { x: 0.5, y: surfaceY + 4, z: 0.5 },
      { x: 0, y: -1, z: 0 },
      10,
    );

    expect(hit?.blockWorldY).toBe(surfaceY);
    expect(hit?.placeWorldY).toBe(surfaceY + 1);
  });
});
