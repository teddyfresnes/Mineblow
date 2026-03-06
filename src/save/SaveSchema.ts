import { CONTROL_ACTIONS } from '../game/Controls';
import type {
  ChunkDiffRecord,
  StoredGlobalStats,
  StoredSettings,
  WorldSave,
} from '../types/save';

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const isBlockId = (value: unknown): boolean =>
  isFiniteNumber(value) && Number.isInteger(value) && value >= 0 && value <= 15;

const isVector3 = (value: unknown): value is [number, number, number] =>
  Array.isArray(value) &&
  value.length === 3 &&
  value.every((element) => isFiniteNumber(element));

const isStringOrNull = (value: unknown): value is string | null =>
  value === null || typeof value === 'string';

const isWorldStats = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
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

export const isWorldSave = (value: unknown): value is WorldSave => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as WorldSave;
  return (
    candidate.schemaVersion === 4 &&
    candidate.worldId === 'default-world' &&
    typeof candidate.seed === 'string' &&
    typeof candidate.createdAt === 'string' &&
    candidate.player !== null &&
    typeof candidate.player === 'object' &&
    isVector3(candidate.player.position) &&
    isVector3(candidate.player.velocity) &&
    isVector3(candidate.player.spawnPoint) &&
    isFiniteNumber(candidate.player.yaw) &&
    isFiniteNumber(candidate.player.pitch) &&
    isFiniteNumber(candidate.player.selectedSlot) &&
    Array.isArray(candidate.inventory) &&
    candidate.inventory.every(
      (slot) =>
        slot &&
        typeof slot === 'object' &&
        isFiniteNumber(slot.count) &&
        (slot.blockId === null || isBlockId(slot.blockId)),
    ) &&
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
      typeof binding.primary === 'string' &&
      isStringOrNull(binding.secondary)
    );
  });

  return hasAllBindings && isStringOrNull(candidate.skinDataUrl);
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
