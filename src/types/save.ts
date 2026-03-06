import type { BlockId } from './blocks';
import type { InventorySlot, PlayerState } from './player';
import type { GameSettings } from '../game/Controls';

export interface ChunkDiffEntry {
  index: number;
  blockId: BlockId;
}

export interface ChunkDiffRecord {
  chunkKey: string;
  changes: ChunkDiffEntry[];
  revision: number;
}

export interface WorldStats {
  blocksMined: number;
  blocksPlaced: number;
  distanceTravelled: number;
  playTimeMs: number;
  jumps: number;
  craftedItems: number;
}

export interface GlobalStats {
  totalBlocksMined: number;
  totalBlocksPlaced: number;
  totalDistanceTravelled: number;
  totalPlayTimeMs: number;
  totalJumps: number;
  totalCraftedItems: number;
  worldsCreated: number;
}

export interface WorldSave {
  schemaVersion: 4;
  worldId: 'default-world';
  seed: string;
  createdAt: string;
  player: PlayerState;
  inventory: InventorySlot[];
  worldStats: WorldStats;
}

export interface StoredSettings extends GameSettings {
  schemaVersion: 1;
}

export interface StoredGlobalStats extends GlobalStats {
  schemaVersion: 1;
}

export const createEmptyWorldStats = (): WorldStats => ({
  blocksMined: 0,
  blocksPlaced: 0,
  distanceTravelled: 0,
  playTimeMs: 0,
  jumps: 0,
  craftedItems: 0,
});

export const createEmptyGlobalStats = (): GlobalStats => ({
  totalBlocksMined: 0,
  totalBlocksPlaced: 0,
  totalDistanceTravelled: 0,
  totalPlayTimeMs: 0,
  totalJumps: 0,
  totalCraftedItems: 0,
  worldsCreated: 0,
});
