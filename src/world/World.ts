import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { ChunkDiffRecord } from '../types/save';
import type { ChunkCoord } from '../types/world';
import { distanceSquared2D } from '../utils/math';
import { Chunk } from './Chunk';
import {
  chunkOriginX,
  chunkOriginZ,
  fromChunkKey,
  toChunkKey,
  worldToChunkCoord,
  worldToLocal,
} from './ChunkCoord';
import { ChunkStore } from './ChunkStore';
import { TerrainGenerator } from './TerrainGenerator';

export class World {
  readonly generator: TerrainGenerator;

  private readonly chunkStore = new ChunkStore();
  private readonly queuedKeys = new Set<string>();
  private readonly generationQueue: ChunkCoord[] = [];
  private readonly meshDirtyKeys = new Set<string>();
  private readonly meshQueue: string[] = [];
  private readonly removedKeys = new Set<string>();
  private readonly chunkDiffs = new Map<string, Map<number, BlockId>>();
  private readonly diffDirtyKeys = new Set<string>();

  constructor(readonly seed: string, persistedDiffs?: Map<string, ChunkDiffRecord>) {
    this.generator = new TerrainGenerator(seed);

    if (persistedDiffs) {
      for (const [chunkKey, record] of persistedDiffs.entries()) {
        this.chunkDiffs.set(
          chunkKey,
          new Map(record.changes.map((change) => [change.index, change.blockId])),
        );
      }
    }
  }

  getChunkCount(): number {
    return this.chunkStore.size;
  }

  hasPendingGeneration(): boolean {
    return this.generationQueue.length > 0;
  }

  hasPendingMeshes(): boolean {
    return this.meshQueue.length > 0;
  }

  getPlayerChunkCoord(x: number, z: number): ChunkCoord {
    return worldToChunkCoord(Math.floor(x), Math.floor(z));
  }

  enqueueStreamingAround(worldX: number, worldZ: number): void {
    const center = this.getPlayerChunkCoord(worldX, worldZ);
    const desired = new Set<string>();
    const candidates: Array<{ coord: ChunkCoord; distance: number }> = [];

    for (
      let chunkX = center.x - WORLD_CONFIG.preloadRadius;
      chunkX <= center.x + WORLD_CONFIG.preloadRadius;
      chunkX += 1
    ) {
      for (
        let chunkZ = center.z - WORLD_CONFIG.preloadRadius;
        chunkZ <= center.z + WORLD_CONFIG.preloadRadius;
        chunkZ += 1
      ) {
        const coord = { x: chunkX, z: chunkZ };
        const key = toChunkKey(coord);
        desired.add(key);
        if (!this.chunkStore.has(key) && !this.queuedKeys.has(key)) {
          candidates.push({
            coord,
            distance: distanceSquared2D(chunkX, chunkZ, center.x, center.z),
          });
        }
      }
    }

    const retainedQueue = this.generationQueue.filter((coord) => {
      const key = toChunkKey(coord);
      return desired.has(key) && !this.chunkStore.has(key);
    });
    this.generationQueue.length = 0;
    this.generationQueue.push(...retainedQueue);
    this.queuedKeys.clear();
    retainedQueue.forEach((coord) => {
      this.queuedKeys.add(toChunkKey(coord));
    });

    candidates
      .sort((left, right) => left.distance - right.distance)
      .forEach(({ coord }) => {
        this.generationQueue.push(coord);
        this.queuedKeys.add(toChunkKey(coord));
      });

    for (const [chunkKey, chunk] of this.chunkStore.entries()) {
      if (desired.has(chunkKey)) {
        continue;
      }

      this.chunkStore.delete(chunkKey);
      this.removedKeys.add(chunkKey);
      this.markNeighborsDirty(chunk.coord);
    }
  }

  processGenerationBudget(chunkBudget = WORLD_CONFIG.generationBudgetPerFrame): void {
    for (let index = 0; index < chunkBudget; index += 1) {
      const coord = this.generationQueue.shift();
      if (!coord) {
        return;
      }

      const key = toChunkKey(coord);
      this.queuedKeys.delete(key);
      if (this.chunkStore.has(key)) {
        continue;
      }

      this.chunkStore.set(this.createChunk(coord));
      this.queueMeshUpdate(key);
      this.markNeighborsDirty(coord);
    }
  }

  primeAround(worldX: number, worldZ: number, radius = 2): void {
    const center = this.getPlayerChunkCoord(worldX, worldZ);
    for (let chunkX = center.x - radius; chunkX <= center.x + radius; chunkX += 1) {
      for (let chunkZ = center.z - radius; chunkZ <= center.z + radius; chunkZ += 1) {
        const coord = { x: chunkX, z: chunkZ };
        const key = toChunkKey(coord);
        if (this.chunkStore.has(key)) {
          continue;
        }

        this.chunkStore.set(this.createChunk(coord));
        this.queueMeshUpdate(key);
      }
    }
  }

  getBlock(worldX: number, worldY: number, worldZ: number): BlockId {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return 0;
    }

    const coord = worldToChunkCoord(worldX, worldZ);
    const chunk = this.chunkStore.get(toChunkKey(coord));
    if (!chunk) {
      return 0;
    }

    const local = worldToLocal(worldX, worldY, worldZ);
    return chunk.getBlock(local.x, local.y, local.z);
  }

  setBlock(worldX: number, worldY: number, worldZ: number, blockId: BlockId): boolean {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return false;
    }

    const coord = worldToChunkCoord(worldX, worldZ);
    const chunk = this.chunkStore.get(toChunkKey(coord));
    if (!chunk) {
      return false;
    }

    const local = worldToLocal(worldX, worldY, worldZ);
    const changed = chunk.setBlock(local.x, local.y, local.z, blockId);
    if (!changed) {
      return false;
    }

    const blockIndex = Chunk.getIndex(local.x, local.y, local.z);
    const diffMap = this.chunkDiffs.get(chunk.key) ?? new Map<number, BlockId>();
    const baseBlock = chunk.baseBlocks[blockIndex] as BlockId;
    if (baseBlock === blockId) {
      diffMap.delete(blockIndex);
    } else {
      diffMap.set(blockIndex, blockId);
    }

    if (diffMap.size === 0) {
      this.chunkDiffs.delete(chunk.key);
    } else {
      this.chunkDiffs.set(chunk.key, diffMap);
    }

    this.queueMeshUpdate(chunk.key);
    this.diffDirtyKeys.add(chunk.key);
    this.markBoundaryNeighborsDirty(coord, local.x, local.z);
    return true;
  }

  getTopSolidBlockY(worldX: number, worldZ: number): number {
    return this.generator.getSurfaceHeight(worldX, worldZ);
  }

  getChunkByKey(chunkKey: string): Chunk | undefined {
    return this.chunkStore.get(chunkKey);
  }

  getChunkOrigin(chunkKey: string): { x: number; z: number } {
    const coord = fromChunkKey(chunkKey);
    return {
      x: chunkOriginX(coord),
      z: chunkOriginZ(coord),
    };
  }

  drainMeshUpdates(budget = WORLD_CONFIG.meshBudgetPerFrame): Chunk[] {
    const chunks: Chunk[] = [];
    for (let index = 0; index < budget; index += 1) {
      const chunkKey = this.meshQueue.shift();
      if (!chunkKey) {
        break;
      }

      this.meshDirtyKeys.delete(chunkKey);
      const chunk = this.chunkStore.get(chunkKey);
      if (chunk) {
        chunks.push(chunk);
      }
    }

    return chunks;
  }

  drainRemovedChunkKeys(): string[] {
    const removed = [...this.removedKeys];
    this.removedKeys.clear();
    return removed;
  }

  drainDirtyDiffs(): ChunkDiffRecord[] {
    const records: ChunkDiffRecord[] = [];
    for (const chunkKey of this.diffDirtyKeys) {
      records.push(this.getChunkDiffRecord(chunkKey));
    }
    this.diffDirtyKeys.clear();
    return records;
  }

  getAllDiffRecords(): ChunkDiffRecord[] {
    return [...this.chunkDiffs.keys()].map((chunkKey) => this.getChunkDiffRecord(chunkKey));
  }

  private createChunk(coord: ChunkCoord): Chunk {
    const key = toChunkKey(coord);
    const chunk = this.generator.generateChunk(coord);
    const diffMap = this.chunkDiffs.get(key);
    if (diffMap) {
      for (const [index, blockId] of diffMap.entries()) {
        chunk.blocks[index] = blockId;
      }
    }
    return chunk;
  }

  private getChunkDiffRecord(chunkKey: string): ChunkDiffRecord {
    const chunk = this.chunkStore.get(chunkKey);
    const revision = chunk?.revision ?? 0;
    const diffMap = this.chunkDiffs.get(chunkKey) ?? new Map<number, BlockId>();
    const changes = [...diffMap.entries()]
      .sort((left, right) => left[0] - right[0])
      .map(([index, blockId]) => ({ index, blockId }));

    return {
      chunkKey,
      changes,
      revision,
    };
  }

  private markNeighborsDirty(coord: ChunkCoord): void {
    const neighbors: ChunkCoord[] = [
      { x: coord.x + 1, z: coord.z },
      { x: coord.x - 1, z: coord.z },
      { x: coord.x, z: coord.z + 1 },
      { x: coord.x, z: coord.z - 1 },
    ];

    for (const neighbor of neighbors) {
      const key = toChunkKey(neighbor);
      if (this.chunkStore.has(key)) {
        this.queueMeshUpdate(key);
      }
    }
  }

  private markBoundaryNeighborsDirty(coord: ChunkCoord, localX: number, localZ: number): void {
    if (localX === 0) {
      this.queueMeshUpdate(toChunkKey({ x: coord.x - 1, z: coord.z }));
    }
    if (localX === WORLD_CONFIG.chunkSizeX - 1) {
      this.queueMeshUpdate(toChunkKey({ x: coord.x + 1, z: coord.z }));
    }
    if (localZ === 0) {
      this.queueMeshUpdate(toChunkKey({ x: coord.x, z: coord.z - 1 }));
    }
    if (localZ === WORLD_CONFIG.chunkSizeZ - 1) {
      this.queueMeshUpdate(toChunkKey({ x: coord.x, z: coord.z + 1 }));
    }
  }

  private queueMeshUpdate(chunkKey: string): void {
    if (this.meshDirtyKeys.has(chunkKey)) {
      return;
    }

    this.meshDirtyKeys.add(chunkKey);
    this.meshQueue.push(chunkKey);
  }
}
