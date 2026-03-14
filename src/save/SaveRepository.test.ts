import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { INVENTORY_LAYOUT } from '../inventory/Inventory';
import { SaveRepository } from './SaveRepository';

describe('SaveRepository', () => {
  it('persists world metadata and chunk diffs', async () => {
    const repository = new SaveRepository();
    await repository.clear();

    const created = await repository.createNewWorld(
      'Test World',
      'seed-123',
      {
        position: [1, 2, 3],
        velocity: [0, 0, 0],
        yaw: 0.25,
        pitch: -0.1,
        selectedSlot: 2,
        spawnPoint: [1, 2, 3],
      },
      Array.from({ length: INVENTORY_LAYOUT.totalSlotCount }, (_, index) => ({
        blockId: index === 0 ? 3 : null,
        count: index === 0 ? 4 : 0,
      })),
      {
        blocksMined: 2,
        blocksPlaced: 1,
        distanceTravelled: 14.2,
        playTimeMs: 4000,
        jumps: 3,
        craftedItems: 0,
      },
    );

    await repository.saveChunkDiffs(created.id, [
      {
        chunkKey: '0,0',
        revision: 1,
        changes: [{ index: 12, blockId: 0 }],
      },
    ]);
    await repository.saveWorldPreview(created.id, 'data:image/png;base64,test');

    const loaded = await repository.loadWorld(created.id);
    const worlds = await repository.listWorlds();
    expect(loaded?.save.seed).toBe('seed-123');
    expect(loaded?.save.name).toBe('Test World');
    expect(loaded?.save.inventory[0]).toEqual({
      blockId: 3,
      count: 4,
    });
    expect(loaded?.save.worldStats.blocksMined).toBe(2);
    expect(worlds).toHaveLength(1);
    expect(worlds[0]?.previewImageDataUrl).toBe('data:image/png;base64,test');
    expect(loaded?.chunkDiffs.get('0,0')).toEqual({
      chunkKey: '0,0',
      revision: 1,
      changes: [{ index: 12, blockId: 0 }],
    });
  });
});
