import {
  CONTROL_ACTIONS,
  MAX_INTERFACE_SIZE,
  MAX_RENDER_DISTANCE_CHUNKS,
  MIN_INTERFACE_SIZE,
  MIN_RENDER_DISTANCE_CHUNKS,
} from '../game/Controls';
import { isUiLanguage } from '../i18n/Language';
import { WEATHER_PRESET_CHAIN, WEATHER_SURFACE_ACTIONS } from '../types/weather';
import type {
  ChunkDiffRecord,
  StoredAppMeta,
  StoredChunkDiffRecord,
  StoredGlobalStats,
  StoredSettings,
  WorldSave,
} from '../types/save';

interface LegacyWorldSave {
  schemaVersion: 4;
  worldId: 'default-world';
  seed: string;
  createdAt: string;
  player: {
    position: [number, number, number];
    velocity: [number, number, number];
    yaw: number;
    pitch: number;
    selectedSlot: number;
    spawnPoint: [number, number, number];
  };
  inventory: Array<{
    blockId: number | null;
    count: number;
  }>;
  worldStats: {
    blocksMined: number;
    blocksPlaced: number;
    distanceTravelled: number;
    playTimeMs: number;
    jumps: number;
    craftedItems: number;
  };
}

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isBlockId = (value: unknown): boolean =>
  isFiniteNumber(value) && Number.isInteger(value) && value >= 0 && value <= 39;

const isVector3 = (value: unknown): value is [number, number, number] =>
  Array.isArray(value) && value.length === 3 && value.every((element) => isFiniteNumber(element));

const isStringOrNull = (value: unknown): value is string | null =>
  value === null || typeof value === 'string';

const isIsoString = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0;

const isWeatherPresetValue = (value: unknown): boolean =>
  typeof value === 'string' && WEATHER_PRESET_CHAIN.includes(value as (typeof WEATHER_PRESET_CHAIN)[number]);

const isWeatherSurfaceActionValue = (value: unknown): boolean =>
  typeof value === 'string' &&
  WEATHER_SURFACE_ACTIONS.includes(value as (typeof WEATHER_SURFACE_ACTIONS)[number]);

const isInterfaceSize = (value: unknown): value is number =>
  isFiniteNumber(value) &&
  Number.isInteger(value) &&
  value >= MIN_INTERFACE_SIZE &&
  value <= MAX_INTERFACE_SIZE;

const isRenderDistanceChunks = (value: unknown): value is number =>
  isFiniteNumber(value) &&
  Number.isInteger(value) &&
  value >= MIN_RENDER_DISTANCE_CHUNKS &&
  value <= MAX_RENDER_DISTANCE_CHUNKS;

const isWorldStats = (value: unknown): boolean => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const stats = value as Record<string, unknown>;
  return (
    isFiniteNumber(stats.blocksMined) &&
    isFiniteNumber(stats.blocksPlaced) &&
    isFiniteNumber(stats.distanceTravelled) &&
    isFiniteNumber(stats.playTimeMs) &&
    isFiniteNumber(stats.jumps) &&
    isFiniteNumber(stats.craftedItems)
  );
};

const isInventorySnapshot = (value: unknown): boolean =>
  Array.isArray(value) &&
  value.every(
    (slot) =>
      slot &&
      typeof slot === 'object' &&
      isFiniteNumber((slot as { count: unknown }).count) &&
      ((slot as { blockId: unknown }).blockId === null || isBlockId((slot as { blockId: unknown }).blockId)),
  );

const isPlayerState = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const player = value as Record<string, unknown>;
  return (
    isVector3(player.position) &&
    isVector3(player.velocity) &&
    isVector3(player.spawnPoint) &&
    isFiniteNumber(player.yaw) &&
    isFiniteNumber(player.pitch) &&
    isFiniteNumber(player.selectedSlot)
  );
};

const isWeatherState = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const weather = value as Record<string, unknown>;
  return (
    isWeatherPresetValue(weather.preset) &&
    (typeof weather.previousPreset === 'undefined' ||
      weather.previousPreset === null ||
      isWeatherPresetValue(weather.previousPreset)) &&
    isFiniteNumber(weather.presetElapsedMs) &&
    isFiniteNumber(weather.presetDurationMs) &&
    isFiniteNumber(weather.transitionMs) &&
    isFiniteNumber(weather.windOffsetX) &&
    isFiniteNumber(weather.windOffsetZ) &&
    (typeof weather.temperatureCelsius === 'undefined' || isFiniteNumber(weather.temperatureCelsius)) &&
    (typeof weather.temperatureDriftElapsedMs === 'undefined' ||
      isFiniteNumber(weather.temperatureDriftElapsedMs))
  );
};

const isEnvironmentState = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const environment = value as Record<string, unknown>;
  const surfaceWeather = environment.surfaceWeather;
  return (
    isFiniteNumber(environment.timeOfDay) &&
    isFiniteNumber(environment.moonPhase) &&
    isWeatherState(environment.weather) &&
    (typeof surfaceWeather === 'undefined' ||
      (!!surfaceWeather &&
        typeof surfaceWeather === 'object' &&
        isFiniteNumber((surfaceWeather as { currentTick?: unknown }).currentTick) &&
        isFiniteNumber((surfaceWeather as { accumulatorSeconds?: unknown }).accumulatorSeconds) &&
        Array.isArray((surfaceWeather as { history?: unknown[] }).history) &&
        (surfaceWeather as { history: unknown[] }).history.every(
          (entry) =>
            !!entry &&
            typeof entry === 'object' &&
            isFiniteNumber((entry as { startTick?: unknown }).startTick) &&
            isFiniteNumber((entry as { endTick?: unknown }).endTick) &&
            isWeatherSurfaceActionValue((entry as { action?: unknown }).action),
        )))
  );
};

export const isWorldSave = (value: unknown): value is WorldSave => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as WorldSave;
  const previewImageDataUrl = (candidate as { previewImageDataUrl?: unknown }).previewImageDataUrl;
  const environment = (candidate as { environment?: unknown }).environment;
  return (
    (candidate.schemaVersion === 5 || candidate.schemaVersion === 6) &&
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.worldId === 'string' &&
    candidate.worldId.length > 0 &&
    typeof candidate.name === 'string' &&
    candidate.name.length > 0 &&
    typeof candidate.seed === 'string' &&
    (typeof previewImageDataUrl === 'undefined' || isStringOrNull(previewImageDataUrl)) &&
    isIsoString(candidate.createdAt) &&
    isIsoString(candidate.updatedAt) &&
    isIsoString(candidate.lastPlayedAt) &&
    isPlayerState(candidate.player) &&
    isInventorySnapshot(candidate.inventory) &&
    isWorldStats(candidate.worldStats) &&
    (typeof environment === 'undefined' || isEnvironmentState(environment))
  );
};

export const isLegacyWorldSave = (value: unknown): value is LegacyWorldSave => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as LegacyWorldSave;
  return (
    candidate.schemaVersion === 4 &&
    candidate.worldId === 'default-world' &&
    typeof candidate.seed === 'string' &&
    isIsoString(candidate.createdAt) &&
    isPlayerState(candidate.player) &&
    isInventorySnapshot(candidate.inventory) &&
    isWorldStats(candidate.worldStats)
  );
};

export const isChunkDiffRecord = (value: unknown): value is ChunkDiffRecord => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as ChunkDiffRecord;
  return (
    typeof candidate.chunkKey === 'string' &&
    typeof candidate.revision === 'number' &&
    (typeof candidate.surfaceWeatherTick === 'undefined' ||
      (isFiniteNumber(candidate.surfaceWeatherTick) && candidate.surfaceWeatherTick >= 0)) &&
    Array.isArray(candidate.changes) &&
    candidate.changes.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        isFiniteNumber(entry.index) &&
        isBlockId(entry.blockId),
    )
  );
};

export const isStoredChunkDiffRecord = (value: unknown): value is StoredChunkDiffRecord => {
  if (!isChunkDiffRecord(value)) {
    return false;
  }

  const candidate = value as StoredChunkDiffRecord;
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.worldId === 'string' &&
    candidate.worldId.length > 0
  );
};

export const isStoredSettings = (value: unknown): value is StoredSettings => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as StoredSettings;
  if (candidate.schemaVersion !== 1 || !candidate.keyBindings || typeof candidate.keyBindings !== 'object') {
    return false;
  }

  const hasAllBindings = CONTROL_ACTIONS.every((action) => {
    const binding = candidate.keyBindings[action];
    return (
      binding &&
      typeof binding === 'object' &&
      isStringOrNull(binding.primary) &&
      isStringOrNull(binding.secondary)
    );
  });

  return (
    hasAllBindings &&
    isStringOrNull(candidate.skinDataUrl) &&
    (typeof candidate.startFullscreen === 'boolean' || typeof candidate.startFullscreen === 'undefined') &&
    (typeof candidate.interfaceSize === 'undefined' || isInterfaceSize(candidate.interfaceSize)) &&
    (typeof candidate.language === 'undefined' || isUiLanguage(candidate.language)) &&
    (typeof candidate.developerDebugMode === 'boolean' ||
      typeof candidate.developerDebugMode === 'undefined') &&
    (typeof candidate.renderDistanceChunks === 'undefined' ||
      isRenderDistanceChunks(candidate.renderDistanceChunks)) &&
    (typeof candidate.animateWater === 'boolean' || typeof candidate.animateWater === 'undefined') &&
    (typeof candidate.showClouds === 'boolean' || typeof candidate.showClouds === 'undefined')
  );
};

export const isStoredGlobalStats = (value: unknown): value is StoredGlobalStats => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as StoredGlobalStats;
  return (
    candidate.schemaVersion === 1 &&
    isFiniteNumber(candidate.totalBlocksMined) &&
    isFiniteNumber(candidate.totalBlocksPlaced) &&
    isFiniteNumber(candidate.totalDistanceTravelled) &&
    isFiniteNumber(candidate.totalPlayTimeMs) &&
    isFiniteNumber(candidate.totalJumps) &&
    isFiniteNumber(candidate.totalCraftedItems) &&
    isFiniteNumber(candidate.worldsCreated)
  );
};

export const isStoredAppMeta = (value: unknown): value is StoredAppMeta => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as StoredAppMeta;
  return (
    candidate.schemaVersion === 1 &&
    isStringOrNull(candidate.activeWorldId) &&
    isStringOrNull(candidate.lastWorldId)
  );
};
