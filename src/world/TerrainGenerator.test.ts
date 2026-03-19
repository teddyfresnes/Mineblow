import { describe, expect, it } from 'vitest';
import { WORLD_CONFIG } from '../game/Config';
import { Chunk } from './Chunk';
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

  it('uses 128 world height and irregular bedrock floor', () => {
    const generator = new TerrainGenerator('alpha');
    const chunk = generator.generateChunk({ x: 0, z: 0 });
    expect(chunk.blocks.length).toBe(
      WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeY * WORLD_CONFIG.chunkSizeZ,
    );

    let bedrockAtY0 = 0;
    let bedrockInUpperFloor = 0;

    for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
      for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
        if (chunk.blocks[Chunk.getIndex(x, 0, z)] === 6) {
          bedrockAtY0 += 1;
        }
        for (let y = 1; y <= 4; y += 1) {
          if (chunk.blocks[Chunk.getIndex(x, y, z)] === 6) {
            bedrockInUpperFloor += 1;
          }
        }
      }
    }

    expect(bedrockAtY0).toBe(WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeZ);
    expect(bedrockInUpperFloor).toBeGreaterThan(0);
    expect(bedrockInUpperFloor).toBeLessThan(
      WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeZ * 4,
    );
  });

  it('keeps sea-level fluids around y=64', () => {
    const generator = new TerrainGenerator('alpha');
    let fluidColumns = 0;

    for (let chunkX = -2; chunkX <= 2; chunkX += 1) {
      for (let chunkZ = -2; chunkZ <= 2; chunkZ += 1) {
        const chunk = generator.generateChunk({ x: chunkX, z: chunkZ });
        for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
          for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
            const block = chunk.blocks[Chunk.getIndex(x, 63, z)];
            if (block === 10 || block === 25) {
              fluidColumns += 1;
            }
          }
        }
      }
    }

    expect(fluidColumns).toBeGreaterThan(0);
  });

  it('generates caves and ores in expected vertical ranges', () => {
    const generator = new TerrainGenerator('alpha');

    let caveAir = 0;
    let coalCount = 0;
    let ironCount = 0;
    let goldCount = 0;
    let redstoneCount = 0;
    let diamondCount = 0;
    let lapisCount = 0;

    for (let chunkX = -2; chunkX <= 2; chunkX += 1) {
      for (let chunkZ = -2; chunkZ <= 2; chunkZ += 1) {
        const chunk = generator.generateChunk({ x: chunkX, z: chunkZ });
        for (let x = 0; x < WORLD_CONFIG.chunkSizeX; x += 1) {
          for (let z = 0; z < WORLD_CONFIG.chunkSizeZ; z += 1) {
            for (let y = 1; y < WORLD_CONFIG.chunkSizeY - 1; y += 1) {
              const index = Chunk.getIndex(x, y, z);
              const block = chunk.blocks[index];

              if (block === 0 && y > 5 && y < 60) {
                const above = chunk.blocks[Chunk.getIndex(x, y + 1, z)];
                const below = chunk.blocks[Chunk.getIndex(x, y - 1, z)];
                if (above !== 0 && below !== 0) {
                  caveAir += 1;
                }
              }

              if (block === 18) {
                coalCount += 1;
              } else if (block === 19) {
                ironCount += 1;
                expect(y).toBeLessThanOrEqual(67);
              } else if (block === 20) {
                goldCount += 1;
                expect(y).toBeLessThanOrEqual(35);
              } else if (block === 21) {
                redstoneCount += 1;
                expect(y).toBeLessThanOrEqual(19);
              } else if (block === 22) {
                diamondCount += 1;
                expect(y).toBeLessThanOrEqual(19);
              } else if (block === 23) {
                lapisCount += 1;
                expect(y).toBeLessThanOrEqual(35);
              }
            }
          }
        }
      }
    }

    expect(caveAir).toBeGreaterThan(50);
    expect(coalCount).toBeGreaterThan(0);
    expect(ironCount).toBeGreaterThan(0);
    expect(goldCount).toBeGreaterThan(0);
    expect(redstoneCount).toBeGreaterThan(0);
    expect(diamondCount).toBeGreaterThan(0);
    expect(lapisCount).toBeGreaterThan(0);
  });
});
