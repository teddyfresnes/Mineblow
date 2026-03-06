import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { ChunkCoord, ChunkData } from '../types/world';
import { toChunkKey } from './ChunkCoord';

export class Chunk implements ChunkData {
  readonly key: string;
  readonly coord: ChunkCoord;
  readonly blocks: Uint8Array;
  readonly baseBlocks: Uint8Array;
  dirty = true;
  revision = 0;

  constructor(coord: ChunkCoord, blocks: Uint8Array, baseBlocks?: Uint8Array) {
    this.coord = coord;
    this.blocks = blocks;
    this.baseBlocks = baseBlocks ? baseBlocks : blocks.slice();
    this.key = toChunkKey(coord);
  }

  static getIndex(x: number, y: number, z: number): number {
    return x + z * WORLD_CONFIG.chunkSizeX + y * WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeZ;
  }

  getBlock(x: number, y: number, z: number): BlockId {
    return this.blocks[Chunk.getIndex(x, y, z)] as BlockId;
  }

  setBlock(x: number, y: number, z: number, blockId: BlockId): boolean {
    const index = Chunk.getIndex(x, y, z);
    if (this.blocks[index] === blockId) {
      return false;
    }

    this.blocks[index] = blockId;
    this.dirty = true;
    this.revision += 1;
    return true;
  }
}
