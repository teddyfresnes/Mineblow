import type { VoxelHit } from '../types/world';
import type { World } from './World';

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
      if (blockId !== 0) {
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
