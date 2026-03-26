import { describe, expect, it } from 'vitest';
import { VoxelRaycaster } from './VoxelRaycaster';
import { World } from './World';

describe('VoxelRaycaster', () => {
  it('hits the first solid block on a downward ray', () => {
    const world = new World('raycast');
    world.primeAround(0, 0, 1);
    const x = 0;
    const z = 0;
    const startY = world.getTopSolidBlockY(x, z) + 8;

    let expectedY = -1;
    for (let y = Math.floor(startY); y >= 0; y -= 1) {
      if (world.getBlock(x, y, z) !== 0) {
        expectedY = y;
        break;
      }
    }
    expect(expectedY).toBeGreaterThanOrEqual(0);

    const hit = VoxelRaycaster.cast(
      world,
      { x: x + 0.5, y: startY, z: z + 0.5 },
      { x: 0, y: -1, z: 0 },
      20,
    );

    expect(hit?.blockWorldY).toBe(expectedY);
    expect(hit?.placeWorldY).toBe(expectedY + 1);
  });

  it('treats water as non-blocking and targets solids behind it', () => {
    const world = new World('raycast-water');
    world.primeAround(0, 0, 1);
    expect(world.setBlock(0, 80, 0, 10)).toBe(true);
    expect(world.setBlock(0, 79, 0, 3)).toBe(true);

    const hit = VoxelRaycaster.cast(
      world,
      { x: 0.5, y: 82, z: 0.5 },
      { x: 0, y: -1, z: 0 },
      10,
    );

    expect(hit).not.toBeNull();
    expect(hit?.blockId).toBe(3);
    expect(hit?.blockWorldY).toBe(79);
    expect(hit?.placeWorldY).toBe(80);
  });
});
