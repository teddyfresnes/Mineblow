import type { BlockId } from './blocks';

export interface PlayerState {
  position: [number, number, number];
  velocity: [number, number, number];
  yaw: number;
  pitch: number;
  selectedSlot: number;
  spawnPoint: [number, number, number];
}

export interface InventorySlot {
  blockId: BlockId | null;
  count: number;
}
