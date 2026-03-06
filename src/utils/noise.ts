import { lerp, smoothstep } from './math';

const hash2 = (seed: number, x: number, y: number): number => {
  let h = seed ^ (x * 374761393) ^ (y * 668265263);
  h = (h ^ (h >>> 13)) * 1274126177;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
};

export const hashString = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export class ValueNoise2D {
  constructor(private readonly seed: number) {}

  sample(x: number, y: number): number {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const tx = smoothstep(0, 1, x - x0);
    const ty = smoothstep(0, 1, y - y0);

    const n00 = hash2(this.seed, x0, y0);
    const n10 = hash2(this.seed, x1, y0);
    const n01 = hash2(this.seed, x0, y1);
    const n11 = hash2(this.seed, x1, y1);

    const nx0 = lerp(n00, n10, tx);
    const nx1 = lerp(n01, n11, tx);

    return lerp(nx0, nx1, ty) * 2 - 1;
  }

  fractal(
    x: number,
    y: number,
    octaves: number,
    frequency: number,
    persistence: number,
  ): number {
    let amplitude = 1;
    let maxAmplitude = 0;
    let sum = 0;
    let sampleFrequency = frequency;

    for (let octave = 0; octave < octaves; octave += 1) {
      sum += this.sample(x * sampleFrequency, y * sampleFrequency) * amplitude;
      maxAmplitude += amplitude;
      amplitude *= persistence;
      sampleFrequency *= 2;
    }

    return maxAmplitude === 0 ? 0 : sum / maxAmplitude;
  }
}
