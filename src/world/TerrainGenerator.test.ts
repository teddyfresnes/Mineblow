import { describe, expect, it } from 'vitest';
import { TerrainGenerator } from './TerrainGenerator';

describe('TerrainGenerator', () => {
  it('is deterministic for the same seed', () => {
    const left = new TerrainGenerator('alpha').generateChunk({ x: 2, z: -3 }).blocks;
    const right = new TerrainGenerator('alpha').generateChunk({ x: 2, z: -3 }).blocks;

    expect([...left]).toEqual([...right]);
  });

  it('varies heights across coordinates', () => {
    const generator = new TerrainGenerator('alpha');
    const heights = [
      generator.getSurfaceHeight(0, 0),
      generator.getSurfaceHeight(24, 24),
      generator.getSurfaceHeight(-30, 18),
    ];

    expect(new Set(heights).size).toBeGreaterThan(1);
  });

  it('can generate river water in some areas', () => {
    const generator = new TerrainGenerator('alpha');
    let foundWater = false;

    for (let x = -160; x <= 160 && !foundWater; x += 8) {
      for (let z = -160; z <= 160 && !foundWater; z += 8) {
        const surfaceY = generator.getSurfaceHeight(x, z);
        foundWater = generator.getTerrainBlock(x, surfaceY + 1, z) === 10;
      }
    }

    expect(foundWater).toBe(true);
  });
});
