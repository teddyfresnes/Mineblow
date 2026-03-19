import { LegacyRandom } from './LegacyRandom';

const fade = (value: number): number => value * value * value * (value * (value * 6 - 15) + 10);
const lerp = (start: number, end: number, alpha: number): number => start + alpha * (end - start);

const grad3 = (hash: number, x: number, y: number, z: number): number => {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  const first = (h & 1) === 0 ? u : -u;
  const second = (h & 2) === 0 ? v : -v;
  return first + second;
};

const grad2 = (hash: number, x: number, y: number): number => {
  const h = hash & 15;
  const first = (1 - ((h & 8) >> 3)) * x;
  const second = h < 4 ? 0 : h === 12 || h === 14 ? x : y;
  return ((h & 1) === 0 ? first : -first) + ((h & 2) === 0 ? second : -second);
};

const simplexGradients: ReadonlyArray<readonly [number, number, number]> = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1],
];

const SIMPLEX_F2 = 0.5 * (Math.sqrt(3) - 1);
const SIMPLEX_G2 = (3 - Math.sqrt(3)) / 6;

const floorLegacy = (value: number): number => (value > 0 ? Math.floor(value) : Math.floor(value) - 1);

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
      grad3(this.permutations[aa], localX, localY, localZ),
      grad3(this.permutations[ba], localX - 1, localY, localZ),
      u,
    );
    const x2 = lerp(
      grad3(this.permutations[ab], localX, localY - 1, localZ),
      grad3(this.permutations[bb], localX - 1, localY - 1, localZ),
      u,
    );
    const y1 = lerp(x1, x2, v);

    const x3 = lerp(
      grad3(this.permutations[aa + 1], localX, localY, localZ - 1),
      grad3(this.permutations[ba + 1], localX - 1, localY, localZ - 1),
      u,
    );
    const x4 = lerp(
      grad3(this.permutations[ab + 1], localX, localY - 1, localZ - 1),
      grad3(this.permutations[bb + 1], localX - 1, localY - 1, localZ - 1),
      u,
    );
    const y2 = lerp(x3, x4, v);

    return lerp(y1, y2, w);
  }

  sample2D(x: number, z: number): number {
    return this.sample(x, 0, z);
  }
}

export class NoiseOctaves {
  private readonly octaves: ImprovedNoise[];

  constructor(random: LegacyRandom, octaveCount: number) {
    this.octaves = Array.from({ length: octaveCount }, () => new ImprovedNoise(random));
  }

  generateNoiseForCoordinate(x: number, z: number): number {
    let value = 0;
    let frequency = 1;
    for (const octave of this.octaves) {
      value += octave.sample2D(x * frequency, z * frequency) / frequency;
      frequency /= 2;
    }
    return value;
  }

  generateNoise(
    target: Float64Array | null,
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
    const result = target && target.length >= sizeX * sizeY * sizeZ
      ? target
      : new Float64Array(sizeX * sizeY * sizeZ);
    result.fill(0);

    let frequency = 1;
    for (const octave of this.octaves) {
      let index = 0;
      for (let x = 0; x < sizeX; x += 1) {
        const sampleX = (xOffset + x) * scaleX * frequency;
        for (let z = 0; z < sizeZ; z += 1) {
          const sampleZ = (zOffset + z) * scaleZ * frequency;
          for (let y = 0; y < sizeY; y += 1) {
            const sampleY = (yOffset + y) * scaleY * frequency;
            result[index] += octave.sample(sampleX, sampleY, sampleZ) / frequency;
            index += 1;
          }
        }
      }
      frequency /= 2;
    }

    return result;
  }

  generateNoise2D(
    target: Float64Array | null,
    xOffset: number,
    zOffset: number,
    sizeX: number,
    sizeZ: number,
    scaleX: number,
    scaleZ: number,
  ): Float64Array {
    return this.generateNoise(
      target,
      xOffset,
      10,
      zOffset,
      sizeX,
      1,
      sizeZ,
      scaleX,
      1,
      scaleZ,
    );
  }
}

class SimplexNoise {
  private readonly permutations = new Uint16Array(512);
  private readonly xOffset: number;
  private readonly yOffset: number;

  constructor(random: LegacyRandom) {
    this.xOffset = random.nextDouble() * 256;
    this.yOffset = random.nextDouble() * 256;

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

  add(
    target: Float64Array,
    xOffset: number,
    yOffset: number,
    sizeX: number,
    sizeY: number,
    scaleX: number,
    scaleY: number,
    amplitude: number,
  ): void {
    let index = 0;
    for (let x = 0; x < sizeX; x += 1) {
      const sampleX = (xOffset + x) * scaleX + this.xOffset;

      for (let y = 0; y < sizeY; y += 1) {
        const sampleY = (yOffset + y) * scaleY + this.yOffset;
        const skew = (sampleX + sampleY) * SIMPLEX_F2;
        const cellX = floorLegacy(sampleX + skew);
        const cellY = floorLegacy(sampleY + skew);
        const unskew = (cellX + cellY) * SIMPLEX_G2;
        const x0 = sampleX - (cellX - unskew);
        const y0 = sampleY - (cellY - unskew);
        const xOffsetCell = x0 > y0 ? 1 : 0;
        const yOffsetCell = x0 > y0 ? 0 : 1;
        const x1 = x0 - xOffsetCell + SIMPLEX_G2;
        const y1 = y0 - yOffsetCell + SIMPLEX_G2;
        const x2 = x0 - 1 + 2 * SIMPLEX_G2;
        const y2 = y0 - 1 + 2 * SIMPLEX_G2;
        const maskX = cellX & 255;
        const maskY = cellY & 255;
        const gi0 = this.permutations[maskX + this.permutations[maskY]] % 12;
        const gi1 = this.permutations[maskX + xOffsetCell + this.permutations[maskY + yOffsetCell]] % 12;
        const gi2 = this.permutations[maskX + 1 + this.permutations[maskY + 1]] % 12;

        const t0 = 0.5 - x0 * x0 - y0 * y0;
        const n0 = t0 < 0 ? 0 : (t0 * t0) * (t0 * t0) * (
          simplexGradients[gi0][0] * x0 + simplexGradients[gi0][1] * y0
        );

        const t1 = 0.5 - x1 * x1 - y1 * y1;
        const n1 = t1 < 0 ? 0 : (t1 * t1) * (t1 * t1) * (
          simplexGradients[gi1][0] * x1 + simplexGradients[gi1][1] * y1
        );

        const t2 = 0.5 - x2 * x2 - y2 * y2;
        const n2 = t2 < 0 ? 0 : (t2 * t2) * (t2 * t2) * (
          simplexGradients[gi2][0] * x2 + simplexGradients[gi2][1] * y2
        );

        target[index] += 70 * (n0 + n1 + n2) * amplitude;
        index += 1;
      }
    }
  }
}

export class SimplexOctaves {
  private readonly octaves: SimplexNoise[];

  constructor(random: LegacyRandom, octaveCount: number) {
    this.octaves = Array.from({ length: octaveCount }, () => new SimplexNoise(random));
  }

  generate(
    target: Float64Array | null,
    xOffset: number,
    yOffset: number,
    sizeX: number,
    sizeY: number,
    scaleX: number,
    scaleY: number,
    frequencyScale: number,
    amplitudeScale = 0.5,
  ): Float64Array {
    const result = target && target.length >= sizeX * sizeY
      ? target
      : new Float64Array(sizeX * sizeY);
    result.fill(0);

    let frequency = 1;
    let amplitude = 1;
    const normalizedScaleX = scaleX / 1.5;
    const normalizedScaleY = scaleY / 1.5;

    for (const octave of this.octaves) {
      octave.add(
        result,
        xOffset,
        yOffset,
        sizeX,
        sizeY,
        normalizedScaleX * frequency,
        normalizedScaleY * frequency,
        0.55 / amplitude,
      );
      frequency *= frequencyScale;
      amplitude *= amplitudeScale;
    }

    return result;
  }
}

export const legacyGrad2 = grad2;
