import { describe, expect, it } from 'vitest';
import { Chunk } from './Chunk';

describe('Chunk', () => {
  it('creates stable linear indices for voxel coordinates', () => {
    expect(Chunk.getIndex(0, 0, 0)).toBe(0);
    expect(Chunk.getIndex(1, 0, 0)).toBe(1);
    expect(Chunk.getIndex(0, 0, 1)).toBe(16);
    expect(Chunk.getIndex(0, 1, 0)).toBe(256);
    expect(Chunk.getIndex(15, 95, 15)).toBe(24575);
  });
});
