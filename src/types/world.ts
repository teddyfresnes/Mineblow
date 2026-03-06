import type { BlockId } from './blocks';

export interface ChunkCoord {
  x: number;
  z: number;
}

export interface ChunkData {
  coord: ChunkCoord;
  blocks: Uint8Array;
  dirty: boolean;
  revision: number;
}

export interface VoxelHit {
  blockWorldX: number;
  blockWorldY: number;
  blockWorldZ: number;
  placeWorldX: number;
  placeWorldY: number;
  placeWorldZ: number;
  normalX: number;
  normalY: number;
  normalZ: number;
  blockId: BlockId;
  distance: number;
}
