import { WORLD_CONFIG } from '../game/Config';
import { Chunk } from './Chunk';
import { LegacyRandom } from './LegacyRandom';

const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const CHUNK_SIZE = WORLD_CONFIG.chunkSizeX;
const CHUNK_HEIGHT = WORLD_CONFIG.chunkSizeY;
const COLUMN_STRIDE = WORLD_CONFIG.chunkSizeX * WORLD_CONFIG.chunkSizeZ;

const toSigned64 = (value: bigint): bigint => BigInt.asIntN(64, value);

const makeOdd = (value: bigint): bigint => {
  const signed = toSigned64(value);
  return toSigned64((signed / 2n) * 2n + 1n);
};

export class BetaCaveGenerator {
  private readonly range = 8;

  constructor(private readonly worldSeed: bigint) {}

  apply(chunkX: number, chunkZ: number, blocks: Uint8Array): void {
    const random = new LegacyRandom(this.worldSeed);
    const seedX = makeOdd(random.nextLong());
    const seedZ = makeOdd(random.nextLong());

    for (let sourceChunkX = chunkX - this.range; sourceChunkX <= chunkX + this.range; sourceChunkX += 1) {
      for (let sourceChunkZ = chunkZ - this.range; sourceChunkZ <= chunkZ + this.range; sourceChunkZ += 1) {
        const chunkSeed = toSigned64(
          BigInt(sourceChunkX) * seedX ^ BigInt(sourceChunkZ) * seedZ ^ this.worldSeed,
        );
        random.setSeed(chunkSeed);
        this.generateChunk(random, sourceChunkX, sourceChunkZ, chunkX, chunkZ, blocks);
      }
    }
  }

  private generateChunk(
    random: LegacyRandom,
    sourceChunkX: number,
    sourceChunkZ: number,
    targetChunkX: number,
    targetChunkZ: number,
    blocks: Uint8Array,
  ): void {
    let caveCount = random.nextInt(random.nextInt(random.nextInt(40) + 1) + 1);
    if (random.nextInt(15) !== 0) {
      caveCount = 0;
    }

    for (let caveIndex = 0; caveIndex < caveCount; caveIndex += 1) {
      const x = sourceChunkX * CHUNK_SIZE + random.nextInt(CHUNK_SIZE);
      const y = random.nextInt(random.nextInt(120) + 8);
      const z = sourceChunkZ * CHUNK_SIZE + random.nextInt(CHUNK_SIZE);
      let tunnelCount = 1;

      if (random.nextInt(4) === 0) {
        this.carveLargeNode(
          targetChunkX,
          targetChunkZ,
          blocks,
          x,
          y,
          z,
          random,
        );
        tunnelCount += random.nextInt(4);
      }

      for (let tunnelIndex = 0; tunnelIndex < tunnelCount; tunnelIndex += 1) {
        const yaw = random.nextFloat() * TAU;
        const pitch = (random.nextFloat() - 0.5) * 2 / 8;
        const radius = random.nextFloat() * 2 + random.nextFloat();
        this.carveTunnel(
          targetChunkX,
          targetChunkZ,
          blocks,
          x,
          y,
          z,
          radius,
          yaw,
          pitch,
          0,
          0,
          1,
          random.nextLong(),
        );
      }
    }
  }

  private carveLargeNode(
    chunkX: number,
    chunkZ: number,
    blocks: Uint8Array,
    x: number,
    y: number,
    z: number,
    random: LegacyRandom,
  ): void {
    const radius = 1 + random.nextFloat() * 6;
    this.carveTunnel(
      chunkX,
      chunkZ,
      blocks,
      x,
      y,
      z,
      radius,
      0,
      0,
      -1,
      -1,
      0.5,
      random.nextLong(),
    );
  }

  private carveTunnel(
    chunkX: number,
    chunkZ: number,
    blocks: Uint8Array,
    x: number,
    y: number,
    z: number,
    horizontalRadius: number,
    yaw: number,
    pitch: number,
    step: number,
    maxStep: number,
    verticalScale: number,
    seed: bigint,
  ): void {
    const centerX = chunkX * CHUNK_SIZE + CHUNK_SIZE / 2;
    const centerZ = chunkZ * CHUNK_SIZE + CHUNK_SIZE / 2;
    let yawChange = 0;
    let pitchChange = 0;
    const random = new LegacyRandom(seed);

    if (maxStep <= 0) {
      const maxRange = this.range * CHUNK_SIZE - CHUNK_SIZE;
      maxStep = maxRange - random.nextInt(Math.max(1, Math.floor(maxRange / 4)));
    }

    let mainBranch = false;
    if (step === -1) {
      step = Math.floor(maxStep / 2);
      mainBranch = true;
    }

    const splitStep = random.nextInt(Math.max(1, Math.floor(maxStep / 2))) + Math.floor(maxStep / 4);
    const reducePitch = random.nextInt(6) === 0;

    for (; step < maxStep; step += 1) {
      const stepScale = Math.sin((step * Math.PI) / maxStep);
      const radiusXZ = 1.5 + stepScale * horizontalRadius;
      const radiusY = radiusXZ * verticalScale;

      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      x += Math.cos(yaw) * cosPitch;
      y += sinPitch;
      z += Math.sin(yaw) * cosPitch;

      pitch *= reducePitch ? 0.92 : 0.7;
      pitch += pitchChange * 0.1;
      yaw += yawChange * 0.1;
      pitchChange *= 0.9;
      yawChange *= 0.75;
      pitchChange += (random.nextFloat() - random.nextFloat()) * random.nextFloat() * 2;
      yawChange += (random.nextFloat() - random.nextFloat()) * random.nextFloat() * 4;

      if (!mainBranch && step === splitStep && horizontalRadius > 1) {
        const childRadiusA = random.nextFloat() * 0.5 + 0.5;
        const childRadiusB = random.nextFloat() * 0.5 + 0.5;
        this.carveTunnel(
          chunkX,
          chunkZ,
          blocks,
          x,
          y,
          z,
          childRadiusA,
          yaw - HALF_PI,
          pitch / 3,
          step,
          maxStep,
          1,
          random.nextLong(),
        );
        this.carveTunnel(
          chunkX,
          chunkZ,
          blocks,
          x,
          y,
          z,
          childRadiusB,
          yaw + HALF_PI,
          pitch / 3,
          step,
          maxStep,
          1,
          random.nextLong(),
        );
        return;
      }

      if (!mainBranch && random.nextInt(4) === 0) {
        continue;
      }

      const distanceX = x - centerX;
      const distanceZ = z - centerZ;
      const stepsLeft = maxStep - step;
      const safeRadius = horizontalRadius + 2 + CHUNK_SIZE;

      if (distanceX * distanceX + distanceZ * distanceZ - stepsLeft * stepsLeft > safeRadius * safeRadius) {
        return;
      }

      if (
        x < centerX - CHUNK_SIZE - radiusXZ * 2 ||
        z < centerZ - CHUNK_SIZE - radiusXZ * 2 ||
        x > centerX + CHUNK_SIZE + radiusXZ * 2 ||
        z > centerZ + CHUNK_SIZE + radiusXZ * 2
      ) {
        continue;
      }

      let minX = Math.floor(x - radiusXZ) - chunkX * CHUNK_SIZE - 1;
      let maxX = Math.floor(x + radiusXZ) - chunkX * CHUNK_SIZE + 1;
      let minY = Math.floor(y - radiusY) - 1;
      let maxY = Math.floor(y + radiusY) + 1;
      let minZ = Math.floor(z - radiusXZ) - chunkZ * CHUNK_SIZE - 1;
      let maxZ = Math.floor(z + radiusXZ) - chunkZ * CHUNK_SIZE + 1;

      if (minX < 0) minX = 0;
      if (maxX > CHUNK_SIZE) maxX = CHUNK_SIZE;
      if (minY < 1) minY = 1;
      if (maxY > 120) maxY = 120;
      if (minZ < 0) minZ = 0;
      if (maxZ > CHUNK_SIZE) maxZ = CHUNK_SIZE;

      let intersectsWater = false;
      for (let localX = minX; !intersectsWater && localX < maxX; localX += 1) {
        for (let localZ = minZ; !intersectsWater && localZ < maxZ; localZ += 1) {
          for (let scanY = maxY + 1; !intersectsWater && scanY >= minY - 1; scanY -= 1) {
            if (scanY < 0 || scanY >= CHUNK_HEIGHT) {
              continue;
            }
            const block = blocks[Chunk.getIndex(localX, scanY, localZ)];
            if (block === 10) {
              intersectsWater = true;
              break;
            }
            if (
              scanY !== minY - 1 &&
              localX !== minX &&
              localX !== maxX - 1 &&
              localZ !== minZ &&
              localZ !== maxZ - 1
            ) {
              scanY = minY;
            }
          }
        }
      }

      if (intersectsWater) {
        continue;
      }

      for (let localX = minX; localX < maxX; localX += 1) {
        const dx = ((localX + chunkX * CHUNK_SIZE) + 0.5 - x) / radiusXZ;
        for (let localZ = minZ; localZ < maxZ; localZ += 1) {
          const dz = ((localZ + chunkZ * CHUNK_SIZE) + 0.5 - z) / radiusXZ;
          if (dx * dx + dz * dz >= 1) {
            continue;
          }

          let index = Chunk.getIndex(localX, maxY, localZ);
          let hitGrass = false;

          for (let localY = maxY - 1; localY >= minY; localY -= 1) {
            const dy = (localY + 0.5 - y) / radiusY;
            if (dy > -0.7 && dx * dx + dy * dy + dz * dz < 1) {
              const block = blocks[index];
              if (block === 1) {
                hitGrass = true;
              }
              if (block === 1 || block === 2 || block === 3) {
                blocks[index] = 0;
                if (hitGrass && localY > 0) {
                  const belowIndex = Chunk.getIndex(localX, localY - 1, localZ);
                  if (blocks[belowIndex] === 2) {
                    blocks[belowIndex] = 1;
                  }
                }
              }
            }

            index -= COLUMN_STRIDE;
          }
        }
      }

      if (mainBranch) {
        break;
      }
    }
  }
}
