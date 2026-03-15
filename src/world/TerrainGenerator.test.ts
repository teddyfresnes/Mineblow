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

  it('always places bedrock on the last layer', () => {
    const generator = new TerrainGenerator('alpha');
    for (let x = -24; x <= 24; x += 6) {
      for (let z = -24; z <= 24; z += 6) {
        expect(generator.getTerrainBlock(x, 0, z)).toBe(6);
      }
    }
  });

  it('generates only grass, stone and bedrock for terrain', () => {
    const generator = new TerrainGenerator('alpha');
    const allowed = new Set([0, 1, 3, 6]);

    for (let x = -64; x <= 64; x += 8) {
      for (let z = -64; z <= 64; z += 8) {
        const surfaceY = generator.getSurfaceHeight(x, z);
        for (let y = 0; y <= surfaceY + 2; y += 1) {
          expect(allowed.has(generator.getTerrainBlock(x, y, z))).toBe(true);
        }
      }
    }
  });

  it('populates chunks with only grass, stone, bedrock, wood and leaves', () => {
    const generator = new TerrainGenerator('alpha');
    const chunk = generator.generateChunk({ x: 0, z: 0 });
    const allowed = new Set([0, 1, 3, 4, 5, 6]);

    for (const blockId of chunk.blocks) {
      expect(allowed.has(blockId)).toBe(true);
    }
  });
});
