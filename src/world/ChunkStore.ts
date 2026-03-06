import type { Chunk } from './Chunk';

export class ChunkStore {
  private readonly chunks = new Map<string, Chunk>();

  set(chunk: Chunk): void {
    this.chunks.set(chunk.key, chunk);
  }

  get(key: string): Chunk | undefined {
    return this.chunks.get(key);
  }

  delete(key: string): boolean {
    return this.chunks.delete(key);
  }

  has(key: string): boolean {
    return this.chunks.has(key);
  }

  values(): IterableIterator<Chunk> {
    return this.chunks.values();
  }

  entries(): IterableIterator<[string, Chunk]> {
    return this.chunks.entries();
  }

  get size(): number {
    return this.chunks.size;
  }

  clear(): void {
    this.chunks.clear();
  }
}
