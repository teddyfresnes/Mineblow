import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import { hashString } from '../utils/noise';
import { Chunk } from './Chunk';
import { chunkOriginX, chunkOriginZ } from './ChunkCoord';

const TREE_THRESHOLD = 0.986;

const hashTree = (seed: number, x: number, z: number): number => {
  let hash = seed ^ Math.imul(x, 73428767) ^ Math.imul(z, 912931);
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  hash ^= hash >>> 16;
  return (hash >>> 0) / 4294967295;
};

export class TreeGenerator {
  private readonly seed = hashString('tree');

  constructor(private readonly worldSeed: string) {}

  shouldSpawnTree(worldX: number, worldZ: number): boolean {
    const baseSeed = hashString(this.worldSeed) ^ this.seed;
    return hashTree(baseSeed, worldX, worldZ) > TREE_THRESHOLD;
  }

  getTreeHeight(worldX: number, worldZ: number): number {
    const baseSeed = hashString(this.worldSeed) ^ (this.seed << 1);
    return 4 + Math.floor(hashTree(baseSeed, worldX, worldZ) * 3);
  }

  applyTrees(
    chunkBlocks: Uint8Array,
    coord: { x: number; z: number },
    surfaceHeightAt: (worldX: number, worldZ: number) => number,
    getTerrainBlock: (worldX: number, worldY: number, worldZ: number) => BlockId,
    canSpawnAt: (worldX: number, worldZ: number, surfaceY: number) => boolean,
  ): void {
    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);

    for (let worldX = originX - 2; worldX < originX + WORLD_CONFIG.chunkSizeX + 2; worldX += 1) {
      for (let worldZ = originZ - 2; worldZ < originZ + WORLD_CONFIG.chunkSizeZ + 2; worldZ += 1) {
        if (!this.shouldSpawnTree(worldX, worldZ)) {
          continue;
        }

        const surfaceY = surfaceHeightAt(worldX, worldZ);
        if (surfaceY < 1 || surfaceY >= WORLD_CONFIG.chunkSizeY - 8) {
          continue;
        }

        if (!canSpawnAt(worldX, worldZ, surfaceY)) {
          continue;
        }

        if (getTerrainBlock(worldX, surfaceY, worldZ) !== 1) {
          continue;
        }

        const height = this.getTreeHeight(worldX, worldZ);
        this.placeTrunk(chunkBlocks, coord, worldX, worldZ, surfaceY, height);
        this.placeLeaves(chunkBlocks, coord, worldX, worldZ, surfaceY + height, height);
      }
    }
  }

  private placeTrunk(
    chunkBlocks: Uint8Array,
    coord: { x: number; z: number },
    worldX: number,
    worldZ: number,
    surfaceY: number,
    height: number,
  ): void {
    for (let offset = 1; offset <= height; offset += 1) {
      this.setIfInsideChunk(chunkBlocks, coord, worldX, surfaceY + offset, worldZ, 4);
    }
  }

  private placeLeaves(
    chunkBlocks: Uint8Array,
    coord: { x: number; z: number },
    worldX: number,
    worldZ: number,
    canopyBaseY: number,
    height: number,
  ): void {
    const radius = 2;
    const topY = canopyBaseY + 1;

    for (let y = canopyBaseY - 1; y <= topY; y += 1) {
      for (let x = worldX - radius; x <= worldX + radius; x += 1) {
        for (let z = worldZ - radius; z <= worldZ + radius; z += 1) {
          const dx = Math.abs(x - worldX);
          const dz = Math.abs(z - worldZ);
          const dy = y - canopyBaseY;
          const isCorner = dx === radius && dz === radius;
          const isTopCorner = dy === 1 && dx + dz > 2;

          if (isCorner || isTopCorner) {
            continue;
          }

          this.setIfInsideChunk(chunkBlocks, coord, x, y, z, 5);
        }
      }
    }

    if (height >= 6) {
      this.setIfInsideChunk(chunkBlocks, coord, worldX, topY + 1, worldZ, 5);
    }
  }

  private setIfInsideChunk(
    chunkBlocks: Uint8Array,
    coord: { x: number; z: number },
    worldX: number,
    worldY: number,
    worldZ: number,
    blockId: BlockId,
  ): void {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return;
    }

    const localX = worldX - chunkOriginX(coord);
    const localZ = worldZ - chunkOriginZ(coord);
    if (
      localX < 0 ||
      localX >= WORLD_CONFIG.chunkSizeX ||
      localZ < 0 ||
      localZ >= WORLD_CONFIG.chunkSizeZ
    ) {
      return;
    }

    const index = Chunk.getIndex(localX, worldY, localZ);
    if (chunkBlocks[index] === 0) {
      chunkBlocks[index] = blockId;
    }
  }
}
