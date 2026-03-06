import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { SAVE_CONFIG } from '../game/Config';
import { createDefaultSettings, type GameSettings } from '../game/Controls';
import type { InventorySlot, PlayerState } from '../types/player';
import {
  createEmptyGlobalStats,
  type ChunkDiffRecord,
  type GlobalStats,
  type StoredGlobalStats,
  type StoredSettings,
  type WorldSave,
  type WorldStats,
} from '../types/save';
import {
  isChunkDiffRecord,
  isStoredGlobalStats,
  isStoredSettings,
  isWorldSave,
} from './SaveSchema';

interface MineblowDb extends DBSchema {
  meta: {
    key: string;
    value: WorldSave;
  };
  chunkDiffs: {
    key: string;
    value: ChunkDiffRecord;
  };
  settings: {
    key: 'settings';
    value: StoredSettings;
  };
  globalStats: {
    key: 'global';
    value: StoredGlobalStats;
  };
}

export interface LoadedWorld {
  save: WorldSave;
  chunkDiffs: Map<string, ChunkDiffRecord>;
}

export class SaveRepository {
  private dbPromise: Promise<IDBPDatabase<MineblowDb>> | null = null;

  private getDb(): Promise<IDBPDatabase<MineblowDb>> {
    if (!this.dbPromise) {
      this.dbPromise = openDB<MineblowDb>('mineblow', 2, {
        upgrade(database) {
          if (!database.objectStoreNames.contains('meta')) {
            database.createObjectStore('meta');
          }
          if (!database.objectStoreNames.contains('chunkDiffs')) {
            database.createObjectStore('chunkDiffs');
          }
          if (!database.objectStoreNames.contains('settings')) {
            database.createObjectStore('settings');
          }
          if (!database.objectStoreNames.contains('globalStats')) {
            database.createObjectStore('globalStats');
          }
        },
      });
    }
    return this.dbPromise;
  }

  async hasContinueState(): Promise<boolean> {
    const db = await this.getDb();
    const save = await db.get('meta', SAVE_CONFIG.worldId);
    return isWorldSave(save);
  }

  async loadWorld(): Promise<LoadedWorld | null> {
    const db = await this.getDb();
    const save = await db.get('meta', SAVE_CONFIG.worldId);
    if (!isWorldSave(save)) {
      return null;
    }

    const chunkDiffs = new Map<string, ChunkDiffRecord>();
    const diffRecords = await db.getAll('chunkDiffs');
    for (const record of diffRecords) {
      if (isChunkDiffRecord(record)) {
        chunkDiffs.set(record.chunkKey, record);
      }
    }

    return {
      save,
      chunkDiffs,
    };
  }

  async loadWorldSummary(): Promise<WorldSave | null> {
    const db = await this.getDb();
    const save = await db.get('meta', SAVE_CONFIG.worldId);
    return isWorldSave(save) ? save : null;
  }

  async createNewWorld(
    seed: string,
    player: PlayerState,
    inventory: InventorySlot[],
    worldStats: WorldStats,
  ): Promise<void> {
    const db = await this.getDb();
    const transaction = db.transaction(['meta', 'chunkDiffs', 'globalStats'], 'readwrite');
    await transaction.objectStore('meta').put(
      {
        schemaVersion: SAVE_CONFIG.schemaVersion,
        worldId: SAVE_CONFIG.worldId,
        seed,
        createdAt: new Date().toISOString(),
        player,
        inventory,
        worldStats,
      },
      SAVE_CONFIG.worldId,
    );
    await transaction.objectStore('chunkDiffs').clear();
    const currentGlobal = await transaction.objectStore('globalStats').get('global');
    const globalStats = isStoredGlobalStats(currentGlobal)
      ? currentGlobal
      : {
          schemaVersion: 1 as const,
          ...createEmptyGlobalStats(),
        };
    await transaction.objectStore('globalStats').put(
      {
        ...globalStats,
        worldsCreated: globalStats.worldsCreated + 1,
      },
      'global',
    );
    await transaction.done;
  }

  async savePlayer(
    player: PlayerState,
    inventory: InventorySlot[],
    worldStats: WorldStats,
  ): Promise<void> {
    const db = await this.getDb();
    const current = await db.get('meta', SAVE_CONFIG.worldId);
    if (!isWorldSave(current)) {
      return;
    }

    await db.put(
      'meta',
      {
        ...current,
        player,
        inventory,
        worldStats,
      },
      SAVE_CONFIG.worldId,
    );
  }

  async saveChunkDiffs(records: ChunkDiffRecord[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    const db = await this.getDb();
    const transaction = db.transaction('chunkDiffs', 'readwrite');
    const store = transaction.objectStore('chunkDiffs');

    for (const record of records) {
      if (record.changes.length === 0) {
        await store.delete(record.chunkKey);
      } else {
        await store.put(record, record.chunkKey);
      }
    }

    await transaction.done;
  }

  async clear(): Promise<void> {
    const db = await this.getDb();
    const transaction = db.transaction(['meta', 'chunkDiffs'], 'readwrite');
    await transaction.objectStore('meta').delete(SAVE_CONFIG.worldId);
    await transaction.objectStore('chunkDiffs').clear();
    await transaction.done;
  }

  async loadSettings(): Promise<GameSettings> {
    const db = await this.getDb();
    const settings = await db.get('settings', 'settings');
    if (isStoredSettings(settings)) {
      return {
        keyBindings: settings.keyBindings,
        skinDataUrl: settings.skinDataUrl,
      };
    }

    const defaults = createDefaultSettings();
    await this.saveSettings(defaults);
    return defaults;
  }

  async saveSettings(settings: GameSettings): Promise<void> {
    const db = await this.getDb();
    await db.put(
      'settings',
      {
        schemaVersion: 1,
        ...settings,
      },
      'settings',
    );
  }

  async loadGlobalStats(): Promise<GlobalStats> {
    const db = await this.getDb();
    const stats = await db.get('globalStats', 'global');
    if (isStoredGlobalStats(stats)) {
      return {
        totalBlocksMined: stats.totalBlocksMined,
        totalBlocksPlaced: stats.totalBlocksPlaced,
        totalDistanceTravelled: stats.totalDistanceTravelled,
        totalPlayTimeMs: stats.totalPlayTimeMs,
        totalJumps: stats.totalJumps,
        totalCraftedItems: stats.totalCraftedItems,
        worldsCreated: stats.worldsCreated,
      };
    }

    const defaults = createEmptyGlobalStats();
    await this.saveGlobalStats(defaults);
    return defaults;
  }

  async saveGlobalStats(stats: GlobalStats): Promise<void> {
    const db = await this.getDb();
    await db.put(
      'globalStats',
      {
        schemaVersion: 1,
        ...stats,
      },
      'global',
    );
  }
}
