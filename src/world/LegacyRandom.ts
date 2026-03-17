const MULTIPLIER = 0x5deece66dn;
const ADDEND = 0xbn;
const MASK = (1n << 48n) - 1n;

export class LegacyRandom {
  private seed: bigint;

  constructor(seed: number | bigint) {
    this.seed = 0n;
    this.setSeed(seed);
  }

  setSeed(seed: number | bigint): void {
    this.seed = (BigInt(seed) ^ MULTIPLIER) & MASK;
  }

  next(bits: number): number {
    this.seed = (this.seed * MULTIPLIER + ADDEND) & MASK;
    return Number(this.seed >> BigInt(48 - bits));
  }

  nextInt(bound?: number): number {
    if (typeof bound === 'undefined') {
      return this.next(32) | 0;
    }

    if (bound <= 0) {
      throw new Error(`bound must be positive, got ${bound}`);
    }

    if ((bound & (bound - 1)) === 0) {
      return Math.floor((bound * this.next(31)) / 0x80000000);
    }

    while (true) {
      const bits = this.next(31);
      const value = bits % bound;
      if (bits - value + (bound - 1) >= 0) {
        return value;
      }
    }
  }

  nextLong(): bigint {
    const upper = BigInt(this.next(32));
    const lower = BigInt(this.next(32)) & 0xffffffffn;
    return (upper << 32n) + lower;
  }

  nextFloat(): number {
    return this.next(24) / (1 << 24);
  }

  nextDouble(): number {
    const upper = this.next(26);
    const lower = this.next(27);
    return ((upper * (1 << 27)) + lower) / 9007199254740992;
  }
}
