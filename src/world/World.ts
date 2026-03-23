import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { ChunkDiffRecord } from '../types/save';
import type { ChunkCoord } from '../types/world';
import { distanceSquared2D } from '../utils/math';
import { Chunk } from './Chunk';
import { ChunkGenerationDispatcher } from './ChunkGenerationDispatcher';
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

interface CompletedChunk {
  coord: ChunkCoord;
  blocks: Uint8Array;
}

const MAX_IN_FLIGHT_GENERATION = 2;

export class World {
  readonly generator: TerrainGenerator;

  private readonly chunkStore = new ChunkStore();
  private readonly queuedKeys = new Set<string>();
  private readonly generationQueue: ChunkCoord[] = [];
  private readonly desiredKeys = new Set<string>();
  private readonly inFlightGeneration = new Map<string, ChunkCoord>();
  private readonly completedGenerationQueue: CompletedChunk[] = [];
  private readonly completedGenerationKeys = new Set<string>();
  private readonly meshDirtyKeys = new Set<string>();
  private readonly meshQueue: string[] = [];
  private readonly removedKeys = new Set<string>();
  private readonly chunkDiffs = new Map<string, Map<number, BlockId>>();
  private readonly diffDirtyKeys = new Set<string>();
  private readonly chunkGenerationDispatcher: ChunkGenerationDispatcher;

  constructor(readonly seed: string, persistedDiffs?: Map<string, ChunkDiffRecord>) {
    this.generator = new TerrainGenerator(seed);
    this.chunkGenerationDispatcher = new ChunkGenerationDispatcher(seed);

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
    return (
      this.generationQueue.length > 0 ||
      this.inFlightGeneration.size > 0 ||
      this.completedGenerationQueue.length > 0
    );
  }

  hasPendingMeshes(): boolean {
    return this.meshQueue.length > 0;
  }

  dispose(): void {
    this.chunkGenerationDispatcher.dispose();
    this.queuedKeys.clear();
    this.generationQueue.length = 0;
    this.desiredKeys.clear();
    this.inFlightGeneration.clear();
    this.completedGenerationQueue.length = 0;
    this.completedGenerationKeys.clear();
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
        if (
          !this.chunkStore.has(key) &&
          !this.queuedKeys.has(key) &&
          !this.inFlightGeneration.has(key) &&
          !this.completedGenerationKeys.has(key)
        ) {
          candidates.push({
            coord,
            distance: distanceSquared2D(chunkX, chunkZ, center.x, center.z),
          });
        }
      }
    }
    this.desiredKeys.clear();
    desired.forEach((key) => this.desiredKeys.add(key));
    this.dropStaleCompletedChunks();

    const retainedQueue = this.generationQueue.filter((coord) => {
      const key = toChunkKey(coord);
      return (
        desired.has(key) &&
        !this.chunkStore.has(key) &&
        !this.inFlightGeneration.has(key) &&
        !this.completedGenerationKeys.has(key)
      );
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
    const budget = Math.max(0, Math.floor(chunkBudget));

    // Phase 1: integrate completed worker chunks into world state.
    for (let index = 0; index < budget; index += 1) {
      const completed = this.completedGenerationQueue.shift();
      if (!completed) {
        break;
      }

      const key = toChunkKey(completed.coord);
      this.completedGenerationKeys.delete(key);
      if (!this.desiredKeys.has(key) || this.chunkStore.has(key)) {
        continue;
      }

      this.chunkStore.set(this.createChunkFromBlocks(completed.coord, completed.blocks));
      this.queueMeshUpdate(key);
      this.markNeighborsDirty(completed.coord);
    }

    // Phase 2: dispatch new async generation jobs conservatively for stable FPS.
    for (
      let index = 0;
      index < budget && this.inFlightGeneration.size < MAX_IN_FLIGHT_GENERATION;
      index += 1
    ) {
      const coord = this.generationQueue.shift();
      if (!coord) {
        return;
      }

      const key = toChunkKey(coord);
      this.queuedKeys.delete(key);
      if (
        this.chunkStore.has(key) ||
        !this.desiredKeys.has(key) ||
        this.inFlightGeneration.has(key) ||
        this.completedGenerationKeys.has(key)
      ) {
        continue;
      }

      this.inFlightGeneration.set(key, coord);
      void this.chunkGenerationDispatcher
        .generateBlocks(coord)
        .then((blocks) => {
          this.handleChunkGenerated(coord, blocks);
        })
        .catch(() => {
          this.handleChunkGenerationFailure(coord);
        });
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
    return this.createChunkFromBlocks(coord, this.generator.generateChunk(coord).blocks);
  }

  private createChunkFromBlocks(coord: ChunkCoord, blocks: Uint8Array): Chunk {
    const key = toChunkKey(coord);
    const chunk = new Chunk(coord, blocks);
    const diffMap = this.chunkDiffs.get(key);
    if (diffMap) {
      for (const [index, blockId] of diffMap.entries()) {
        chunk.blocks[index] = blockId;
      }
    }
    return chunk;
  }

  private handleChunkGenerated(coord: ChunkCoord, blocks: Uint8Array): void {
    const key = toChunkKey(coord);
    if (!this.inFlightGeneration.delete(key)) {
      return;
    }
    if (!this.desiredKeys.has(key) || this.chunkStore.has(key) || this.completedGenerationKeys.has(key)) {
      return;
    }

    this.completedGenerationQueue.push({ coord, blocks });
    this.completedGenerationKeys.add(key);
  }

  private handleChunkGenerationFailure(coord: ChunkCoord): void {
    const key = toChunkKey(coord);
    if (!this.inFlightGeneration.delete(key)) {
      return;
    }
    if (
      !this.desiredKeys.has(key) ||
      this.chunkStore.has(key) ||
      this.queuedKeys.has(key) ||
      this.completedGenerationKeys.has(key)
    ) {
      return;
    }

    this.generationQueue.unshift(coord);
    this.queuedKeys.add(key);
  }

  private dropStaleCompletedChunks(): void {
    if (this.completedGenerationQueue.length === 0) {
      return;
    }

    const retained: CompletedChunk[] = [];
    for (const entry of this.completedGenerationQueue) {
      const key = toChunkKey(entry.coord);
      if (this.desiredKeys.has(key) && !this.chunkStore.has(key)) {
        retained.push(entry);
      } else {
        this.completedGenerationKeys.delete(key);
      }
    }

    if (retained.length === this.completedGenerationQueue.length) {
      return;
    }

    this.completedGenerationQueue.length = 0;
    this.completedGenerationQueue.push(...retained);
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
