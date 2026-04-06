import type { VoxelHit } from '../types/world';
import { getBlockCollisionHeight, isWaterBlock } from './BlockRegistry';
import type { World } from './World';

const RAY_EPSILON = 1e-6;

const intersectPartialBlock = (
  origin: { x: number; y: number; z: number },
  direction: { x: number; y: number; z: number },
  blockX: number,
  blockY: number,
  blockZ: number,
  blockHeight: number,
  maxDistance: number,
): { distance: number; normalX: number; normalY: number; normalZ: number } | null => {
  let tMin = 0;
  let tMax = maxDistance;
  let normalX = 0;
  let normalY = 0;
  let normalZ = 0;

  const testAxis = (
    originValue: number,
    directionValue: number,
    minValue: number,
    maxValue: number,
    minNormal: [number, number, number],
    maxNormal: [number, number, number],
  ): boolean => {
    if (Math.abs(directionValue) <= RAY_EPSILON) {
      return originValue >= minValue && originValue <= maxValue;
    }

    let t1 = (minValue - originValue) / directionValue;
    let t2 = (maxValue - originValue) / directionValue;
    let entryNormal = minNormal;
    if (t1 > t2) {
      const swap = t1;
      t1 = t2;
      t2 = swap;
      entryNormal = maxNormal;
    }

    if (t1 > tMin) {
      tMin = t1;
      [normalX, normalY, normalZ] = entryNormal;
    }
    tMax = Math.min(tMax, t2);
    return tMin <= tMax;
  };

  if (
    !testAxis(origin.x, direction.x, blockX, blockX + 1, [-1, 0, 0], [1, 0, 0]) ||
    !testAxis(origin.y, direction.y, blockY, blockY + blockHeight, [0, -1, 0], [0, 1, 0]) ||
    !testAxis(origin.z, direction.z, blockZ, blockZ + 1, [0, 0, -1], [0, 0, 1])
  ) {
    return null;
  }

  if (tMin < 0 || tMin > maxDistance) {
    return null;
  }

  return {
    distance: tMin,
    normalX,
    normalY,
    normalZ,
  };
};

export class VoxelRaycaster {
  static cast(
    world: World,
    origin: { x: number; y: number; z: number },
    direction: { x: number; y: number; z: number },
    maxDistance: number,
  ): VoxelHit | null {
    let x = Math.floor(origin.x);
    let y = Math.floor(origin.y);
    let z = Math.floor(origin.z);

    const stepX = direction.x > 0 ? 1 : direction.x < 0 ? -1 : 0;
    const stepY = direction.y > 0 ? 1 : direction.y < 0 ? -1 : 0;
    const stepZ = direction.z > 0 ? 1 : direction.z < 0 ? -1 : 0;

    const tDeltaX = stepX === 0 ? Number.POSITIVE_INFINITY : Math.abs(1 / direction.x);
    const tDeltaY = stepY === 0 ? Number.POSITIVE_INFINITY : Math.abs(1 / direction.y);
    const tDeltaZ = stepZ === 0 ? Number.POSITIVE_INFINITY : Math.abs(1 / direction.z);

    const fract = (value: number): number => value - Math.floor(value);
    let tMaxX =
      stepX > 0
        ? (1 - fract(origin.x)) * tDeltaX
        : stepX < 0
          ? fract(origin.x) * tDeltaX
          : Number.POSITIVE_INFINITY;
    let tMaxY =
      stepY > 0
        ? (1 - fract(origin.y)) * tDeltaY
        : stepY < 0
          ? fract(origin.y) * tDeltaY
          : Number.POSITIVE_INFINITY;
    let tMaxZ =
      stepZ > 0
        ? (1 - fract(origin.z)) * tDeltaZ
        : stepZ < 0
          ? fract(origin.z) * tDeltaZ
          : Number.POSITIVE_INFINITY;

    let distance = 0;
    let normalX = 0;
    let normalY = 0;
    let normalZ = 0;

    while (distance <= maxDistance) {
      const blockId = world.getBlock(x, y, z);
      if (blockId !== 0 && !isWaterBlock(blockId)) {
        const blockHeight = getBlockCollisionHeight(blockId);
        if (blockHeight > 0 && blockHeight < 1) {
          const nextDistance = Math.min(tMaxX, tMaxY, tMaxZ);
          const partialHit = intersectPartialBlock(
            origin,
            direction,
            x,
            y,
            z,
            blockHeight,
            maxDistance,
          );
          if (partialHit && partialHit.distance <= nextDistance + RAY_EPSILON) {
            return {
              blockWorldX: x,
              blockWorldY: y,
              blockWorldZ: z,
              placeWorldX: x + partialHit.normalX,
              placeWorldY: y + partialHit.normalY,
              placeWorldZ: z + partialHit.normalZ,
              normalX: partialHit.normalX,
              normalY: partialHit.normalY,
              normalZ: partialHit.normalZ,
              blockId,
              distance: partialHit.distance,
            };
          }
        }

        return {
          blockWorldX: x,
          blockWorldY: y,
          blockWorldZ: z,
          placeWorldX: x + normalX,
          placeWorldY: y + normalY,
          placeWorldZ: z + normalZ,
          normalX,
          normalY,
          normalZ,
          blockId,
          distance,
        };
      }

      if (tMaxX < tMaxY && tMaxX < tMaxZ) {
        x += stepX;
        distance = tMaxX;
        tMaxX += tDeltaX;
        normalX = -stepX;
        normalY = 0;
        normalZ = 0;
      } else if (tMaxY < tMaxZ) {
        y += stepY;
        distance = tMaxY;
        tMaxY += tDeltaY;
        normalX = 0;
        normalY = -stepY;
        normalZ = 0;
      } else {
        z += stepZ;
        distance = tMaxZ;
        tMaxZ += tDeltaZ;
        normalX = 0;
        normalY = 0;
        normalZ = -stepZ;
      }
    }

    return null;
  }
}
