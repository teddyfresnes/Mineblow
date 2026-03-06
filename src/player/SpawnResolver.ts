import type { World } from '../world/World';

export class SpawnResolver {
  static resolve(world: World): [number, number, number] {
    for (let radius = 0; radius <= 8; radius += 1) {
      for (let worldX = -radius; worldX <= radius; worldX += 1) {
        for (let worldZ = -radius; worldZ <= radius; worldZ += 1) {
          const surfaceY = world.getTopSolidBlockY(worldX, worldZ);
          const feetY = surfaceY + 1;
          if (
            world.getBlock(worldX, feetY, worldZ) === 0 &&
            world.getBlock(worldX, feetY + 1, worldZ) === 0
          ) {
            return [worldX + 0.5, feetY, worldZ + 0.5];
          }
        }
      }
    }

    return [0.5, 48, 0.5];
  }
}
