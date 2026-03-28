import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import { getWaterLevel, isWaterBlock, WATER_FLOW_LEVEL_MAX } from './BlockRegistry';

export const WATER_SURFACE_BASE_HEIGHT = 0.86;
export const WATER_SURFACE_MIN_HEIGHT = 0.125;

export interface WaterSurfaceSample {
  blockX: number;
  blockY: number;
  blockZ: number;
  surfaceY: number;
}

export const waterLevelToSurfaceHeight = (level: number): number => {
  if (!Number.isFinite(level) || level <= 0) {
    return WATER_SURFACE_BASE_HEIGHT;
  }
  if (level >= WATER_FLOW_LEVEL_MAX) {
    return WATER_SURFACE_MIN_HEIGHT;
  }

  const step = (WATER_SURFACE_BASE_HEIGHT - WATER_SURFACE_MIN_HEIGHT) / WATER_FLOW_LEVEL_MAX;
  return WATER_SURFACE_BASE_HEIGHT - step * level;
};

export const getWaterSurfaceHeightForBlock = (
  blockId: BlockId,
  aboveBlockId: BlockId,
): number | null => {
  if (!isWaterBlock(blockId)) {
    return null;
  }
  if (isWaterBlock(aboveBlockId)) {
    return 1;
  }
  const level = getWaterLevel(blockId);
  if (level === null) {
    return WATER_SURFACE_BASE_HEIGHT;
  }
  return waterLevelToSurfaceHeight(level);
};

export const sampleWaterSurfaceAtPoint = (
  world: { getBlock(x: number, y: number, z: number): BlockId },
  x: number,
  y: number,
  z: number,
  maxCellsBelow = 1,
): WaterSurfaceSample | null => {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  const startY = Math.floor(y);
  let best: WaterSurfaceSample | null = null;

  for (let offset = 0; offset <= maxCellsBelow; offset += 1) {
    const candidateY = startY - offset;
    if (candidateY < 0 || candidateY >= WORLD_CONFIG.chunkSizeY) {
      continue;
    }

    const candidateBlockId = world.getBlock(blockX, candidateY, blockZ);
    if (!isWaterBlock(candidateBlockId)) {
      continue;
    }

    let topY = candidateY;
    while (
      topY + 1 < WORLD_CONFIG.chunkSizeY &&
      isWaterBlock(world.getBlock(blockX, topY + 1, blockZ))
    ) {
      topY += 1;
    }

    const topBlockId = world.getBlock(blockX, topY, blockZ);
    const aboveBlockId =
      topY + 1 < WORLD_CONFIG.chunkSizeY ? world.getBlock(blockX, topY + 1, blockZ) : 0;
    const surfaceHeight = getWaterSurfaceHeightForBlock(topBlockId, aboveBlockId);
    if (surfaceHeight === null) {
      continue;
    }

    const sample: WaterSurfaceSample = {
      blockX,
      blockY: topY,
      blockZ,
      surfaceY: topY + surfaceHeight,
    };
    if (!best || sample.surfaceY > best.surfaceY) {
      best = sample;
    }
  }

  return best;
};

export const resolveWaterSubmersionWithHysteresis = (
  currentlySubmerged: boolean,
  eyeY: number,
  surfaceY: number | null,
  enterOffset = 0.02,
  exitOffset = 0.03,
): boolean => {
  if (surfaceY === null) {
    return false;
  }
  if (currentlySubmerged) {
    return eyeY < surfaceY + exitOffset;
  }
  return eyeY <= surfaceY - enterOffset;
};

export const isPointBelowWaterSurface = (
  world: { getBlock(x: number, y: number, z: number): BlockId },
  x: number,
  y: number,
  z: number,
  maxCellsBelow = 1,
): boolean => {
  const sample = sampleWaterSurfaceAtPoint(world, x, y, z, maxCellsBelow);
  if (!sample) {
    return false;
  }
  return y < sample.surfaceY;
};
