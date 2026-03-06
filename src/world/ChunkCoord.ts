import { WORLD_CONFIG } from '../game/Config';
import type { ChunkCoord } from '../types/world';
import { floorDiv, mod } from '../utils/math';

export const toChunkKey = ({ x, z }: ChunkCoord): string => `${x},${z}`;

export const fromChunkKey = (key: string): ChunkCoord => {
  const [x, z] = key.split(',').map((part) => Number.parseInt(part, 10));
  return { x, z };
};

export const worldToChunkCoord = (worldX: number, worldZ: number): ChunkCoord => ({
  x: floorDiv(worldX, WORLD_CONFIG.chunkSizeX),
  z: floorDiv(worldZ, WORLD_CONFIG.chunkSizeZ),
});

export const worldToLocal = (
  worldX: number,
  worldY: number,
  worldZ: number,
): { x: number; y: number; z: number } => ({
  x: mod(worldX, WORLD_CONFIG.chunkSizeX),
  y: worldY,
  z: mod(worldZ, WORLD_CONFIG.chunkSizeZ),
});

export const chunkOriginX = (coord: ChunkCoord): number => coord.x * WORLD_CONFIG.chunkSizeX;

export const chunkOriginZ = (coord: ChunkCoord): number => coord.z * WORLD_CONFIG.chunkSizeZ;
