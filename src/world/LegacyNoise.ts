import { LegacyRandom } from './LegacyRandom';

const fade = (value: number): number => value * value * value * (value * (value * 6 - 15) + 10);
const lerp = (start: number, end: number, alpha: number): number => start + alpha * (end - start);

const grad = (hash: number, x: number, y: number, z: number): number => {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  const first = (h & 1) === 0 ? u : -u;
  const second = (h & 2) === 0 ? v : -v;
  return first + second;
};

export class ImprovedNoise {
  private readonly permutations = new Uint16Array(512);
  private readonly xOffset: number;
  private readonly yOffset: number;
  private readonly zOffset: number;

  constructor(random: LegacyRandom) {
    this.xOffset = random.nextDouble() * 256;
    this.yOffset = random.nextDouble() * 256;
    this.zOffset = random.nextDouble() * 256;

    const source = new Uint16Array(256);
    for (let index = 0; index < 256; index += 1) {
      source[index] = index;
    }

    for (let index = 0; index < 256; index += 1) {
      const swapWith = index + random.nextInt(256 - index);
      const hold = source[index];
      source[index] = source[swapWith];
      source[swapWith] = hold;
      this.permutations[index] = source[index];
      this.permutations[index + 256] = source[index];
    }
  }

  sample(x: number, y: number, z: number): number {
    const shiftedX = x + this.xOffset;
    const shiftedY = y + this.yOffset;
    const shiftedZ = z + this.zOffset;

    const baseX = Math.floor(shiftedX);
    const baseY = Math.floor(shiftedY);
    const baseZ = Math.floor(shiftedZ);

    const localX = shiftedX - baseX;
    const localY = shiftedY - baseY;
    const localZ = shiftedZ - baseZ;

    const u = fade(localX);
    const v = fade(localY);
    const w = fade(localZ);

    const xMask = baseX & 255;
    const yMask = baseY & 255;
    const zMask = baseZ & 255;

    const a = this.permutations[xMask] + yMask;
    const aa = this.permutations[a] + zMask;
    const ab = this.permutations[a + 1] + zMask;
    const b = this.permutations[xMask + 1] + yMask;
    const ba = this.permutations[b] + zMask;
    const bb = this.permutations[b + 1] + zMask;

    const x1 = lerp(
      grad(this.permutations[aa], localX, localY, localZ),
      grad(this.permutations[ba], localX - 1, localY, localZ),
      u,
    );
    const x2 = lerp(
      grad(this.permutations[ab], localX, localY - 1, localZ),
      grad(this.permutations[bb], localX - 1, localY - 1, localZ),
      u,
    );
    const y1 = lerp(x1, x2, v);

    const x3 = lerp(
      grad(this.permutations[aa + 1], localX, localY, localZ - 1),
      grad(this.permutations[ba + 1], localX - 1, localY, localZ - 1),
      u,
    );
    const x4 = lerp(
      grad(this.permutations[ab + 1], localX, localY - 1, localZ - 1),
      grad(this.permutations[bb + 1], localX - 1, localY - 1, localZ - 1),
      u,
    );
    const y2 = lerp(x3, x4, v);

    return lerp(y1, y2, w);
  }
}

export class NoiseOctaves {
  private readonly octaves: ImprovedNoise[];

  constructor(random: LegacyRandom, octaveCount: number) {
    this.octaves = Array.from({ length: octaveCount }, () => new ImprovedNoise(random));
  }

  sample(
    xOffset: number,
    yOffset: number,
    zOffset: number,
    sizeX: number,
    sizeY: number,
    sizeZ: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
  ): Float64Array {
    const values = new Float64Array(sizeX * sizeY * sizeZ);
    this.add(values, xOffset, yOffset, zOffset, sizeX, sizeY, sizeZ, scaleX, scaleY, scaleZ);
    return values;
  }

  add(
    target: Float64Array,
    xOffset: number,
    yOffset: number,
    zOffset: number,
    sizeX: number,
    sizeY: number,
    sizeZ: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
  ): void {
    let frequency = 1;
    let amplitude = 1;

    for (const octave of this.octaves) {
      let index = 0;
      for (let x = 0; x < sizeX; x += 1) {
        const sampleX = (xOffset + x) * scaleX * frequency;
        for (let z = 0; z < sizeZ; z += 1) {
          const sampleZ = (zOffset + z) * scaleZ * frequency;
          for (let y = 0; y < sizeY; y += 1) {
            const sampleY = (yOffset + y) * scaleY * frequency;
            target[index] += octave.sample(sampleX, sampleY, sampleZ) * amplitude;
            index += 1;
          }
        }
      }

      frequency *= 2;
      amplitude *= 0.5;
    }
  }
}
