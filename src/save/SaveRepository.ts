import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { SAVE_CONFIG } from '../game/Config';
import {
  CONTROL_ACTIONS,
  DEFAULT_RENDER_DISTANCE_CHUNKS,
  DEFAULT_INTERFACE_SIZE,
  createDefaultSettings,
  normalizeInterfaceSize,
  normalizeRenderDistanceChunks,
  type GameSettings,
} from '../game/Controls';
import { DEFAULT_UI_LANGUAGE } from '../i18n/Language';
import type { InventorySlot, PlayerState } from '../types/player';
import type { WorldEnvironmentState } from '../types/weather';
import {
  createEmptyGlobalStats,
  type ChunkDiffRecord,
  type GlobalStats,
  type StoredAppMeta,
  type StoredChunkDiffRecord,
  type StoredGlobalStats,
  type StoredSettings,
  type WorldSave,
  type WorldStats,
  type WorldSummary,
} from '../types/save';
import {
  isChunkDiffRecord,
  isLegacyWorldSave,
  isStoredAppMeta,
  isStoredChunkDiffRecord,
  isStoredGlobalStats,
  isStoredSettings,
  isWorldSave,
} from './SaveSchema';
import { normalizeEnvironmentState } from '../world/Weather';

interface MineblowDb extends DBSchema {
  meta: {
    key: string;
    value: WorldSave | StoredAppMeta;
  };
  worlds: {
    key: string;
    value: WorldSave;
  };
  chunkDiffs: {
    key: string;
    value: ChunkDiffRecord | StoredChunkDiffRecord;
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

const DEFAULT_APP_META: StoredAppMeta = {
  schemaVersion: 1,
  activeWorldId: null,
  lastWorldId: null,
};

const hydrateSettings = (value: unknown): GameSettings | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const defaults = createDefaultSettings();
  const candidate = value as Partial<StoredSettings>;
  const mergedBindings = createDefaultSettings().keyBindings;

  if (candidate.keyBindings && typeof candidate.keyBindings === 'object') {
    CONTROL_ACTIONS.forEach((action) => {
      const binding = candidate.keyBindings?.[action];
      if (!binding || typeof binding !== 'object') {
        return;
      }

      mergedBindings[action] = {
        primary:
          typeof binding.primary === 'string' || binding.primary === null
            ? binding.primary
            : defaults.keyBindings[action].primary,
        secondary:
          typeof binding.secondary === 'string' || binding.secondary === null
            ? binding.secondary
            : defaults.keyBindings[action].secondary,
      };
    });
  }

  return {
    keyBindings: mergedBindings,
    skinDataUrl:
      typeof candidate.skinDataUrl === 'string' || candidate.skinDataUrl === null
        ? candidate.skinDataUrl
        : defaults.skinDataUrl,
    startFullscreen:
      typeof candidate.startFullscreen === 'boolean'
        ? candidate.startFullscreen
        : defaults.startFullscreen,
    interfaceSize: normalizeInterfaceSize(candidate.interfaceSize ?? DEFAULT_INTERFACE_SIZE),
    language: candidate.language ?? DEFAULT_UI_LANGUAGE,
    developerDebugMode:
      typeof candidate.developerDebugMode === 'boolean'
        ? candidate.developerDebugMode
        : defaults.developerDebugMode,
    renderDistanceChunks: normalizeRenderDistanceChunks(
      candidate.renderDistanceChunks ?? DEFAULT_RENDER_DISTANCE_CHUNKS,
    ),
    animateWater:
      typeof candidate.animateWater === 'boolean'
        ? candidate.animateWater
        : defaults.animateWater,
    showClouds:
      typeof candidate.showClouds === 'boolean' ? candidate.showClouds : defaults.showClouds,
  };
};

const sortWorlds = (worlds: WorldSummary[]): WorldSummary[] =>
  [...worlds].sort((left, right) => {
    const leftScore = Date.parse(left.lastPlayedAt || left.updatedAt || left.createdAt);
    const rightScore = Date.parse(right.lastPlayedAt || right.updatedAt || right.createdAt);
    return rightScore - leftScore;
  });

const toSummary = (save: WorldSave): WorldSummary => ({
  id: save.id,
  name: save.name,
  seed: save.seed,
  previewImageDataUrl: save.previewImageDataUrl ?? null,
  createdAt: save.createdAt,
  updatedAt: save.updatedAt,
  lastPlayedAt: save.lastPlayedAt,
  worldStats: { ...save.worldStats },
});

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);

export class SaveRepository {
  private dbPromise: Promise<IDBPDatabase<MineblowDb>> | null = null;
  private migrationPromise: Promise<void> | null = null;

  private getDb(): Promise<IDBPDatabase<MineblowDb>> {
    if (!this.dbPromise) {
      this.dbPromise = openDB<MineblowDb>('mineblow', SAVE_CONFIG.databaseVersion, {
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
          if (!database.objectStoreNames.contains('worlds')) {
            database.createObjectStore('worlds');
          }
        },
      });
    }
    return this.dbPromise;
  }

  async hasContinueState(): Promise<boolean> {
    await this.ensureMigrated();
    const db = await this.getDb();
    return (await db.count('worlds')) > 0;
  }

  async listWorlds(): Promise<WorldSummary[]> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const saves = await db.getAll('worlds');
    return sortWorlds(saves.filter(isWorldSave).map((save) => toSummary(save)));
  }

  async loadWorld(worldId?: string): Promise<LoadedWorld | null> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const targetWorldId = worldId ?? (await this.getPreferredWorldId(db));
    if (!targetWorldId) {
      return null;
    }

    const transaction = db.transaction(['worlds', 'chunkDiffs', 'meta'], 'readwrite');
    const worldStore = transaction.objectStore('worlds');
    const save = await worldStore.get(targetWorldId);
    if (!isWorldSave(save)) {
      await transaction.done;
      return null;
    }

    const now = new Date().toISOString();
    const updatedSave: WorldSave = {
      ...save,
      updatedAt: now,
      lastPlayedAt: now,
      environment: normalizeEnvironmentState(save.environment),
    };
    await worldStore.put(updatedSave, updatedSave.id);
    await transaction.objectStore('meta').put(
      {
        schemaVersion: 1,
        activeWorldId: updatedSave.id,
        lastWorldId: updatedSave.id,
      },
      SAVE_CONFIG.appMetaKey,
    );

    const chunkDiffs = new Map<string, ChunkDiffRecord>();
    const diffRecords = await transaction.objectStore('chunkDiffs').getAll();
    for (const record of diffRecords) {
      if (isStoredChunkDiffRecord(record) && record.worldId === updatedSave.id) {
        chunkDiffs.set(record.chunkKey, {
          chunkKey: record.chunkKey,
          revision: record.revision,
          changes: record.changes,
          ...(typeof record.surfaceWeatherTick === 'number'
            ? { surfaceWeatherTick: record.surfaceWeatherTick }
            : {}),
        });
      }
    }

    await transaction.done;
    return {
      save: updatedSave,
      chunkDiffs,
    };
  }

  async loadWorldSummary(worldId?: string): Promise<WorldSummary | null> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const targetWorldId = worldId ?? (await this.getPreferredWorldId(db));
    if (!targetWorldId) {
      return null;
    }

    const save = await db.get('worlds', targetWorldId);
    return isWorldSave(save) ? toSummary(save) : null;
  }

  async createNewWorld(
    name: string,
    seed: string,
    player: PlayerState,
    inventory: InventorySlot[],
    worldStats: WorldStats,
    environment: WorldEnvironmentState,
  ): Promise<WorldSave> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const now = new Date().toISOString();
    const worldId = await this.createUniqueWorldId(name);
    const worldName = name.trim() || `Nouveau monde ${new Date().toLocaleDateString('fr-CA')}`;
    const save: WorldSave = {
      schemaVersion: SAVE_CONFIG.schemaVersion,
      id: worldId,
      worldId,
      name: worldName,
      seed,
      previewImageDataUrl: null,
      createdAt: now,
      updatedAt: now,
      lastPlayedAt: now,
      player,
      inventory,
      worldStats,
      environment: normalizeEnvironmentState(environment),
    };

    const transaction = db.transaction(['worlds', 'meta', 'globalStats'], 'readwrite');
    await transaction.objectStore('worlds').put(save, save.id);
    await transaction.objectStore('meta').put(
      {
        schemaVersion: 1,
        activeWorldId: save.id,
        lastWorldId: save.id,
      },
      SAVE_CONFIG.appMetaKey,
    );

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
    return save;
  }

  async renameWorld(worldId: string, name: string): Promise<WorldSummary | null> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const save = await db.get('worlds', worldId);
    if (!isWorldSave(save)) {
      return null;
    }

    const nextName = name.trim();
    if (!nextName) {
      return toSummary(save);
    }

    const updated: WorldSave = {
      ...save,
      name: nextName,
      updatedAt: new Date().toISOString(),
    };
    await db.put('worlds', updated, updated.id);
    return toSummary(updated);
  }

  async saveWorldPreview(worldId: string, previewImageDataUrl: string | null): Promise<void> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const save = await db.get('worlds', worldId);
    if (!isWorldSave(save)) {
      return;
    }

    const normalizedPreview =
      typeof previewImageDataUrl === 'string' && previewImageDataUrl.length > 0
        ? previewImageDataUrl
        : null;
    await db.put(
      'worlds',
      {
        ...save,
        previewImageDataUrl: normalizedPreview,
        updatedAt: new Date().toISOString(),
      },
      save.id,
    );
  }

  async deleteWorld(worldId: string): Promise<void> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const worlds = (await db.getAll('worlds')).filter(isWorldSave);
    const appMeta = await this.loadAppMeta(db);
    const remainingWorlds = worlds.filter((world) => world.id !== worldId);
    const fallbackWorldId = sortWorlds(remainingWorlds.map((world) => toSummary(world)))[0]?.id ?? null;

    const transaction = db.transaction(['worlds', 'chunkDiffs', 'meta'], 'readwrite');
    await transaction.objectStore('worlds').delete(worldId);

    const chunkStore = transaction.objectStore('chunkDiffs');
    const keys = await chunkStore.getAllKeys();
    const values = await chunkStore.getAll();
    for (let index = 0; index < values.length; index += 1) {
      const value = values[index];
      const key = keys[index];
      if (isStoredChunkDiffRecord(value) && value.worldId === worldId && typeof key === 'string') {
        await chunkStore.delete(key);
      }
    }

    const nextMeta: StoredAppMeta = {
      schemaVersion: 1,
      activeWorldId: appMeta.activeWorldId === worldId ? fallbackWorldId : appMeta.activeWorldId,
      lastWorldId: appMeta.lastWorldId === worldId ? fallbackWorldId : appMeta.lastWorldId,
    };
    if (nextMeta.activeWorldId && !remainingWorlds.some((world) => world.id === nextMeta.activeWorldId)) {
      nextMeta.activeWorldId = fallbackWorldId;
    }
    if (nextMeta.lastWorldId && !remainingWorlds.some((world) => world.id === nextMeta.lastWorldId)) {
      nextMeta.lastWorldId = fallbackWorldId;
    }
    await transaction.objectStore('meta').put(nextMeta, SAVE_CONFIG.appMetaKey);
    await transaction.done;
  }

  async savePlayer(
    worldId: string,
    player: PlayerState,
    inventory: InventorySlot[],
    worldStats: WorldStats,
    environment: WorldEnvironmentState,
  ): Promise<void> {
    await this.ensureMigrated();
    const db = await this.getDb();
    const current = await db.get('worlds', worldId);
    if (!isWorldSave(current)) {
      return;
    }

    await db.put(
      'worlds',
      {
        ...current,
        player,
        inventory,
        worldStats,
        environment: normalizeEnvironmentState(environment),
        updatedAt: new Date().toISOString(),
      },
      current.id,
    );
  }

  async saveChunkDiffs(worldId: string, records: ChunkDiffRecord[]): Promise<void> {
    await this.ensureMigrated();
    if (records.length === 0) {
      return;
    }

    const db = await this.getDb();
    const transaction = db.transaction('chunkDiffs', 'readwrite');
    const store = transaction.objectStore('chunkDiffs');

    for (const record of records) {
      const recordKey = this.getChunkRecordKey(worldId, record.chunkKey);
      const hasSurfaceWeatherSync =
        typeof record.surfaceWeatherTick === 'number' && Number.isFinite(record.surfaceWeatherTick);
      if (record.changes.length === 0 && !hasSurfaceWeatherSync) {
        await store.delete(recordKey);
      } else {
        await store.put(
          {
            id: recordKey,
            worldId,
            chunkKey: record.chunkKey,
            revision: record.revision,
            changes: record.changes,
            surfaceWeatherTick: record.surfaceWeatherTick,
          },
          recordKey,
        );
      }
    }

    await transaction.done;
  }

  async clear(): Promise<void> {
    const db = await this.getDb();
    const transaction = db.transaction(['worlds', 'chunkDiffs', 'meta'], 'readwrite');
    await transaction.objectStore('worlds').clear();
    await transaction.objectStore('chunkDiffs').clear();
    await transaction.objectStore('meta').delete(SAVE_CONFIG.appMetaKey);
    await transaction.objectStore('meta').delete(SAVE_CONFIG.legacyWorldId);
    await transaction.done;
  }

  async loadSettings(): Promise<GameSettings> {
    const db = await this.getDb();
    const settings = await db.get('settings', 'settings');
    if (isStoredSettings(settings)) {
      return {
        keyBindings: settings.keyBindings,
        skinDataUrl: settings.skinDataUrl,
        startFullscreen: settings.startFullscreen ?? true,
        interfaceSize: normalizeInterfaceSize(settings.interfaceSize ?? DEFAULT_INTERFACE_SIZE),
        language: settings.language ?? DEFAULT_UI_LANGUAGE,
        developerDebugMode: settings.developerDebugMode ?? false,
        renderDistanceChunks: normalizeRenderDistanceChunks(
          settings.renderDistanceChunks ?? DEFAULT_RENDER_DISTANCE_CHUNKS,
        ),
        animateWater: settings.animateWater ?? true,
        showClouds: settings.showClouds ?? true,
      };
    }

    const hydrated = hydrateSettings(settings);
    if (hydrated) {
      await this.saveSettings(hydrated);
      return hydrated;
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

  private async ensureMigrated(): Promise<void> {
    if (!this.migrationPromise) {
      this.migrationPromise = this.runMigration();
    }
    await this.migrationPromise;
  }

  private async runMigration(): Promise<void> {
    const db = await this.getDb();
    const existingWorlds = (await db.getAll('worlds')).filter(isWorldSave);
    const appMetaValue = await db.get('meta', SAVE_CONFIG.appMetaKey);
    if (existingWorlds.length > 0) {
      if (!isStoredAppMeta(appMetaValue)) {
        const latestWorldId = sortWorlds(existingWorlds.map((world) => toSummary(world)))[0]?.id ?? null;
        await db.put(
          'meta',
          {
            schemaVersion: 1,
            activeWorldId: latestWorldId,
            lastWorldId: latestWorldId,
          },
          SAVE_CONFIG.appMetaKey,
        );
      }
      return;
    }

    const legacyValue: unknown = await db.get('meta', SAVE_CONFIG.legacyWorldId);
    if (!isLegacyWorldSave(legacyValue)) {
      if (!isStoredAppMeta(appMetaValue)) {
        await db.put('meta', DEFAULT_APP_META, SAVE_CONFIG.appMetaKey);
      }
      return;
    }

    const migratedWorld: WorldSave = {
      schemaVersion: SAVE_CONFIG.schemaVersion,
      id: SAVE_CONFIG.legacyWorldId,
      worldId: SAVE_CONFIG.legacyWorldId,
      name: 'Imported World',
      seed: legacyValue.seed,
      previewImageDataUrl: null,
      createdAt: legacyValue.createdAt,
      updatedAt: legacyValue.createdAt,
      lastPlayedAt: legacyValue.createdAt,
      player: legacyValue.player as PlayerState,
      inventory: legacyValue.inventory as InventorySlot[],
      worldStats: legacyValue.worldStats,
      environment: normalizeEnvironmentState(null),
    };

    const transaction = db.transaction(['worlds', 'chunkDiffs', 'meta'], 'readwrite');
    await transaction.objectStore('worlds').put(migratedWorld, migratedWorld.id);

    const chunkStore = transaction.objectStore('chunkDiffs');
    const keys = await chunkStore.getAllKeys();
    const values = await chunkStore.getAll();
    for (let index = 0; index < values.length; index += 1) {
      const value = values[index];
      const key = keys[index];
      if (!isChunkDiffRecord(value) || isStoredChunkDiffRecord(value)) {
        continue;
      }

      const recordKey = this.getChunkRecordKey(migratedWorld.id, value.chunkKey);
      await chunkStore.put(
        {
          id: recordKey,
          worldId: migratedWorld.id,
          chunkKey: value.chunkKey,
          revision: value.revision,
          changes: value.changes,
        },
        recordKey,
      );
      if (typeof key === 'string' && key !== recordKey) {
        await chunkStore.delete(key);
      }
    }

    await transaction.objectStore('meta').put(
      {
        schemaVersion: 1,
        activeWorldId: migratedWorld.id,
        lastWorldId: migratedWorld.id,
      },
      SAVE_CONFIG.appMetaKey,
    );
    await transaction.objectStore('meta').delete(SAVE_CONFIG.legacyWorldId);
    await transaction.done;
  }

  private async createUniqueWorldId(name: string): Promise<string> {
    const db = await this.getDb();
    const base = slugify(name) || 'world';
    let candidate = base;
    let suffix = 1;
    while (await db.get('worlds', candidate)) {
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
    return candidate;
  }

  private async getPreferredWorldId(db: IDBPDatabase<MineblowDb>): Promise<string | null> {
    const meta = await this.loadAppMeta(db);
    if (meta.activeWorldId) {
      return meta.activeWorldId;
    }
    if (meta.lastWorldId) {
      return meta.lastWorldId;
    }
    const worlds = (await db.getAll('worlds')).filter(isWorldSave).map((world) => toSummary(world));
    return sortWorlds(worlds)[0]?.id ?? null;
  }

  private async loadAppMeta(db: IDBPDatabase<MineblowDb>): Promise<StoredAppMeta> {
    const value = await db.get('meta', SAVE_CONFIG.appMetaKey);
    return isStoredAppMeta(value) ? value : DEFAULT_APP_META;
  }

  private getChunkRecordKey(worldId: string, chunkKey: string): string {
    return `${worldId}:${chunkKey}`;
  }
}
