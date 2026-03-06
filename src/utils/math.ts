export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number): number =>
  from + (to - from) * t;

export const inverseLerp = (from: number, to: number, value: number): number =>
  from === to ? 0 : (value - from) / (to - from);

export const smoothstep = (edge0: number, edge1: number, value: number): number => {
  const t = clamp(inverseLerp(edge0, edge1, value), 0, 1);
  return t * t * (3 - 2 * t);
};

export const floorDiv = (value: number, divisor: number): number =>
  Math.floor(value / divisor);

export const mod = (value: number, divisor: number): number => {
  const remainder = value % divisor;
  return remainder < 0 ? remainder + divisor : remainder;
};

export const distanceSquared2D = (
  ax: number,
  az: number,
  bx: number,
  bz: number,
): number => {
  const dx = ax - bx;
  const dz = az - bz;
  return dx * dx + dz * dz;
};
