import { describe, expect, it } from 'vitest';
import { Inventory } from './Inventory';

describe('Inventory', () => {
  it('adds blocks to existing stacks before using free slots', () => {
    const inventory = new Inventory();

    inventory.addBlock(3);
    inventory.addBlock(3);

    expect(inventory.getSlots()[27]).toEqual({
      blockId: 3,
      count: 2,
    });
  });

  it('consumes the selected hotbar stack and clears it when empty', () => {
    const inventory = new Inventory();
    inventory.setSlot(27, { blockId: 4, count: 1 });

    expect(inventory.consumeSelectedBlock()).toBe(4);
    expect(inventory.getHotbarSlots()[0]).toEqual({
      blockId: null,
      count: 0,
    });
  });

  it('merges cursor stacks into matching slots', () => {
    const inventory = new Inventory();
    inventory.setSlot(0, { blockId: 7, count: 4 });

    const cursor = inventory.placeCursor(0, { blockId: 7, count: 3 });
    expect(cursor).toEqual({ blockId: null, count: 0 });
    expect(inventory.getSlot(0)).toEqual({ blockId: 7, count: 7 });
  });
});
