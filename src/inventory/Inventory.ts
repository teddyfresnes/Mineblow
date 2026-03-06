import type { BlockId } from '../types/blocks';
import type { InventorySlot } from '../types/player';

export const MAX_STACK = 128;
const MAIN_SLOT_COUNT = 27;
const HOTBAR_SLOT_COUNT = 9;
const TOTAL_SLOT_COUNT = MAIN_SLOT_COUNT + HOTBAR_SLOT_COUNT;
const HOTBAR_START = MAIN_SLOT_COUNT;

const createEmptySlot = (): InventorySlot => ({
  blockId: null,
  count: 0,
});

export class Inventory {
  private readonly slots: InventorySlot[];
  private selectedHotbarIndex = 0;

  constructor(initialSlots?: InventorySlot[], selectedHotbarIndex = 0) {
    this.slots = Array.from({ length: TOTAL_SLOT_COUNT }, (_, index) => {
      const source = initialSlots?.[index];
      return source ? { ...source } : createEmptySlot();
    });
    this.selectedHotbarIndex = Math.max(0, Math.min(HOTBAR_SLOT_COUNT - 1, selectedHotbarIndex));
  }

  getSlots(): InventorySlot[] {
    return this.slots.map((slot) => ({ ...slot }));
  }

  getMainSlots(): InventorySlot[] {
    return this.slots.slice(0, MAIN_SLOT_COUNT).map((slot) => ({ ...slot }));
  }

  getHotbarSlots(): InventorySlot[] {
    return this.slots.slice(HOTBAR_START).map((slot) => ({ ...slot }));
  }

  getSelectedHotbarIndex(): number {
    return this.selectedHotbarIndex;
  }

  setSelectedHotbarIndex(index: number): void {
    if (index < 0 || index >= HOTBAR_SLOT_COUNT) {
      return;
    }
    this.selectedHotbarIndex = index;
  }

  shiftSelectedHotbar(delta: number): void {
    this.selectedHotbarIndex =
      (((this.selectedHotbarIndex + delta) % HOTBAR_SLOT_COUNT) + HOTBAR_SLOT_COUNT) %
      HOTBAR_SLOT_COUNT;
  }

  getSelectedBlock(): BlockId | null {
    return this.slots[HOTBAR_START + this.selectedHotbarIndex].blockId;
  }

  getSelectedAbsoluteSlotIndex(): number {
    return HOTBAR_START + this.selectedHotbarIndex;
  }

  getSlot(index: number): InventorySlot {
    return { ...this.slots[index] };
  }

  setSlot(index: number, slot: InventorySlot): void {
    if (index < 0 || index >= TOTAL_SLOT_COUNT) {
      return;
    }

    const clampedCount = slot.blockId === null ? 0 : Math.max(1, Math.min(MAX_STACK, slot.count));
    this.slots[index] = {
      blockId: slot.blockId,
      count: clampedCount,
    };
  }

  pickUpSlot(index: number): InventorySlot {
    const slot = this.getSlot(index);
    this.slots[index] = createEmptySlot();
    return slot;
  }

  placeCursor(index: number, cursor: InventorySlot): InventorySlot {
    if (cursor.blockId === null || cursor.count <= 0) {
      return createEmptySlot();
    }

    const target = this.slots[index];
    if (target.blockId === null || target.count === 0) {
      this.slots[index] = { ...cursor };
      return createEmptySlot();
    }

    if (target.blockId === cursor.blockId) {
      const transferable = Math.min(MAX_STACK - target.count, cursor.count);
      this.slots[index] = {
        blockId: target.blockId,
        count: target.count + transferable,
      };
      const remainder = cursor.count - transferable;
      return remainder > 0
        ? {
            blockId: cursor.blockId,
            count: remainder,
          }
        : createEmptySlot();
    }

    this.slots[index] = { ...cursor };
    return { ...target };
  }

  addBlock(blockId: BlockId, count = 1): boolean {
    if (!this.canAddBlock(blockId, count)) {
      return false;
    }

    let remaining = count;
    for (const slot of this.iterateHotbarThenMain()) {
      if (slot.blockId === blockId && slot.count < MAX_STACK) {
        const added = Math.min(MAX_STACK - slot.count, remaining);
        slot.count += added;
        remaining -= added;
        if (remaining === 0) {
          return true;
        }
      }
    }

    for (const slot of this.iterateHotbarThenMain()) {
      if (slot.blockId === null || slot.count === 0) {
        const added = Math.min(MAX_STACK, remaining);
        slot.blockId = blockId;
        slot.count = added;
        remaining -= added;
        if (remaining === 0) {
          return true;
        }
      }
    }

    return remaining === 0;
  }

  canAddBlock(blockId: BlockId, count = 1): boolean {
    let remaining = count;

    for (const slot of this.iterateHotbarThenMain()) {
      if (slot.blockId === blockId) {
        remaining -= MAX_STACK - slot.count;
      } else if (slot.blockId === null || slot.count === 0) {
        remaining -= MAX_STACK;
      }

      if (remaining <= 0) {
        return true;
      }
    }

    return false;
  }

  removeBlock(blockId: BlockId, count: number): boolean {
    if (this.getBlockCount(blockId) < count) {
      return false;
    }

    let remaining = count;
    for (let index = 0; index < this.slots.length; index += 1) {
      const slot = this.slots[index];
      if (slot.blockId !== blockId) {
        continue;
      }

      const removed = Math.min(slot.count, remaining);
      slot.count -= removed;
      remaining -= removed;
      if (slot.count === 0) {
        slot.blockId = null;
      }
      if (remaining === 0) {
        return true;
      }
    }

    return false;
  }

  consumeSelectedBlock(): BlockId | null {
    const index = this.getSelectedAbsoluteSlotIndex();
    const slot = this.slots[index];
    if (slot.blockId === null || slot.count <= 0) {
      return null;
    }

    slot.count -= 1;
    const blockId = slot.blockId;
    if (slot.count === 0) {
      slot.blockId = null;
    }
    return blockId;
  }

  getBlockCount(blockId: BlockId): number {
    return this.slots.reduce((count, slot) => {
      if (slot.blockId !== blockId) {
        return count;
      }
      return count + slot.count;
    }, 0);
  }

  snapshot(): InventorySlot[] {
    return this.getSlots();
  }

  returnCursor(cursor: InventorySlot): InventorySlot {
    if (cursor.blockId === null || cursor.count === 0) {
      return createEmptySlot();
    }

    const returned = this.addBlock(cursor.blockId, cursor.count);
    return returned ? createEmptySlot() : cursor;
  }

  private *iterateHotbarThenMain(): Generator<InventorySlot> {
    for (let index = HOTBAR_START; index < TOTAL_SLOT_COUNT; index += 1) {
      yield this.slots[index];
    }
    for (let index = 0; index < HOTBAR_START; index += 1) {
      yield this.slots[index];
    }
  }
}

export const INVENTORY_LAYOUT = {
  mainSlotCount: MAIN_SLOT_COUNT,
  hotbarSlotCount: HOTBAR_SLOT_COUNT,
  totalSlotCount: TOTAL_SLOT_COUNT,
  hotbarStart: HOTBAR_START,
} as const;
