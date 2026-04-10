import { WORLD_CONFIG } from '../game/Config';
import { normalizeRenderDistanceChunks } from '../game/Controls';
import type { BlockId } from '../types/blocks';
import type { ChunkDiffRecord } from '../types/save';
import type {
  WeatherSurfaceAction,
  WeatherSurfaceState,
  WeatherVisualState,
} from '../types/weather';
import type { ChunkCoord } from '../types/world';
import { distanceSquared2D } from '../utils/math';
import {
  blocksMovement,
  ICE_BLOCK_ID,
  getBlockCollisionHeight,
  getSnowCoverLevel,
  getWaterLevel,
  isPlantBlock,
  isSnowLayerBlock,
  isWaterBlock,
  isWaterSource,
  SNOW_BLOCK_ID,
  toSnowCoverBlockId,
  toFlowWaterId,
  WATER_FLOW_LEVEL_MAX,
  WATER_SOURCE_BLOCK_ID,
} from './BlockRegistry';
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

interface ChunkSurfaceState {
  blockId: BlockId;
  blockY: number;
  topY: number;
}

interface SurfaceActionProfile {
  snowSampleModulo: number;
  thawSampleModulo: number;
  freezeSampleModulo: number;
}

type FluidCell = [number, number, number];

const MAX_IN_FLIGHT_GENERATION = 2;
const FLUID_HORIZONTAL_OFFSETS: Array<[number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const FLUID_FLOW_SEARCH_MAX_DEPTH = 4;
const FLUID_NEIGHBORS: Array<[number, number, number]> = [
  [0, 0, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
];
const FLUID_INTERFACE_OFFSETS: Array<[number, number]> = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const FLUID_UPDATE_DELAY_TICKS = 5;
const WEATHER_ACCUMULATION_STEP_SECONDS = 8;
const DEFAULT_CHUNK_PRELOAD_BUFFER_RADIUS = Math.max(0, WORLD_CONFIG.preloadRadius - WORLD_CONFIG.loadRadius);
const ICE_THAW_BASE_SAMPLE_CHANCE = 0.045;
const ICE_THAW_HOLE_NEIGHBOR_BONUS = 0.28;
const ICE_THAW_MAX_SAMPLE_CHANCE = 0.92;
const ICE_THAW_SPREAD_FROM_HOLE_CHANCE = 0.82;
const SURFACE_WEATHER_ACTION_PROFILES: Record<WeatherSurfaceAction, SurfaceActionProfile> = {
  idle: {
    snowSampleModulo: Number.MAX_SAFE_INTEGER,
    thawSampleModulo: Number.MAX_SAFE_INTEGER,
    freezeSampleModulo: Number.MAX_SAFE_INTEGER,
  },
  snow: {
    snowSampleModulo: 4,
    thawSampleModulo: Number.MAX_SAFE_INTEGER,
    freezeSampleModulo: 10,
  },
  snow_heavy: {
    snowSampleModulo: 1,
    thawSampleModulo: Number.MAX_SAFE_INTEGER,
    freezeSampleModulo: 5,
  },
  thaw: {
    snowSampleModulo: Number.MAX_SAFE_INTEGER,
    thawSampleModulo: 3,
    freezeSampleModulo: Number.MAX_SAFE_INTEGER,
  },
};

const hash32 = (value: number): number => {
  let hashed = value | 0;
  hashed = Math.imul(hashed ^ (hashed >>> 16), 0x7feb352d);
  hashed = Math.imul(hashed ^ (hashed >>> 15), 0x846ca68b);
  return hashed ^ (hashed >>> 16);
};

const hashToUnitFloat = (value: number): number => ((value >>> 0) + 0.5) / 4294967296;

export const shouldAccumulateSnowLayerFromHash = (
  existingSnowLayers: number,
  accumulationHash: number,
): boolean => {
  const clampedLayers = Math.max(0, Math.floor(existingSnowLayers));
  const chance = Math.pow(0.5, clampedLayers);
  return hashToUnitFloat(accumulationHash) < chance;
};

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
  private readonly chunkSurfaceWeatherTicks = new Map<string, number>();
  private readonly diffDirtyKeys = new Set<string>();
  private readonly chunkGenerationDispatcher: ChunkGenerationDispatcher;
  private readonly fluidScheduledTicksByKey = new Map<string, number>();
  private readonly fluidBuckets = new Map<number, FluidCell[]>();
  private readonly surfaceWeatherHistory: WeatherSurfaceState['history'] = [];
  private fluidCurrentTick = 0;
  private fluidMinScheduledTick: number | null = null;
  private fluidTickAccumulator = 0;
  private weatherAccumulationAccumulator = 0;
  private weatherAccumulationTick = 0;
  private lastStreamingSignature: string | null = null;
  private readonly preloadBufferRadiusChunks = DEFAULT_CHUNK_PRELOAD_BUFFER_RADIUS;
  private renderDistanceChunks: number = Math.min(WORLD_CONFIG.loadRadius, WORLD_CONFIG.preloadRadius);
  private preloadRadiusChunks: number = WORLD_CONFIG.preloadRadius;

  constructor(
    readonly seed: string,
    persistedDiffs?: Map<string, ChunkDiffRecord>,
    persistedSurfaceWeather?: WeatherSurfaceState,
  ) {
    this.generator = new TerrainGenerator(seed);
    this.chunkGenerationDispatcher = new ChunkGenerationDispatcher(seed);

    if (persistedDiffs) {
      for (const [chunkKey, record] of persistedDiffs.entries()) {
        if (record.changes.length > 0) {
          this.chunkDiffs.set(
            chunkKey,
            new Map(record.changes.map((change) => [change.index, change.blockId])),
          );
        }
        if (
          typeof record.surfaceWeatherTick === 'number' &&
          Number.isFinite(record.surfaceWeatherTick) &&
          record.surfaceWeatherTick > 0
        ) {
          this.chunkSurfaceWeatherTicks.set(chunkKey, Math.floor(record.surfaceWeatherTick));
        }
      }
    }

    if (persistedSurfaceWeather) {
      this.weatherAccumulationAccumulator = Math.max(0, persistedSurfaceWeather.accumulatorSeconds);
      this.weatherAccumulationTick = Math.max(0, Math.floor(persistedSurfaceWeather.currentTick));
      this.surfaceWeatherHistory.push(
        ...persistedSurfaceWeather.history.map((entry) => ({
          startTick: Math.max(1, Math.floor(entry.startTick)),
          endTick: Math.max(1, Math.floor(entry.endTick)),
          action: entry.action,
        })),
      );
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

  getDesiredChunkCount(): number {
    return this.desiredKeys.size;
  }

  getLoadedDesiredChunkCount(): number {
    let loaded = 0;
    for (const key of this.desiredKeys) {
      if (this.chunkStore.has(key)) {
        loaded += 1;
      }
    }
    return loaded;
  }

  getPendingDesiredMeshCount(): number {
    let pending = 0;
    for (const key of this.meshDirtyKeys) {
      if (this.desiredKeys.has(key)) {
        pending += 1;
      }
    }
    return pending;
  }

  getStreamingProgress(): number {
    const desiredCount = this.getDesiredChunkCount();
    if (desiredCount <= 0) {
      return 1;
    }

    const loadedDesired = this.getLoadedDesiredChunkCount();
    const loadProgress = loadedDesired / desiredCount;
    const pendingDesiredMeshes = this.getPendingDesiredMeshCount();
    const meshProgress =
      loadedDesired <= 0 ? 0 : 1 - pendingDesiredMeshes / loadedDesired;

    return Math.max(0, Math.min(1, loadProgress * 0.78 + Math.max(0, meshProgress) * 0.22));
  }

  isDesiredRegionReady(): boolean {
    const desiredCount = this.getDesiredChunkCount();
    return (
      desiredCount > 0 &&
      this.getLoadedDesiredChunkCount() >= desiredCount &&
      this.getPendingDesiredMeshCount() === 0 &&
      !this.hasPendingGeneration()
    );
  }

  getSurfaceWeatherState(): WeatherSurfaceState {
    return {
      currentTick: this.weatherAccumulationTick,
      accumulatorSeconds: this.weatherAccumulationAccumulator,
      history: this.surfaceWeatherHistory.map((entry) => ({ ...entry })),
    };
  }

  dispose(): void {
    this.chunkGenerationDispatcher.dispose();
    this.queuedKeys.clear();
    this.generationQueue.length = 0;
    this.desiredKeys.clear();
    this.inFlightGeneration.clear();
    this.completedGenerationQueue.length = 0;
    this.completedGenerationKeys.clear();
    this.chunkSurfaceWeatherTicks.clear();
    this.surfaceWeatherHistory.length = 0;
    this.fluidScheduledTicksByKey.clear();
    this.fluidBuckets.clear();
    this.fluidCurrentTick = 0;
    this.fluidMinScheduledTick = null;
    this.fluidTickAccumulator = 0;
    this.weatherAccumulationAccumulator = 0;
    this.weatherAccumulationTick = 0;
    this.lastStreamingSignature = null;
  }

  getPlayerChunkCoord(x: number, z: number): ChunkCoord {
    return worldToChunkCoord(Math.floor(x), Math.floor(z));
  }

  setRenderDistanceChunks(renderDistanceChunks: number): void {
    this.renderDistanceChunks = normalizeRenderDistanceChunks(renderDistanceChunks);
    this.preloadRadiusChunks = this.renderDistanceChunks + this.preloadBufferRadiusChunks;
    this.lastStreamingSignature = null;
  }

  enqueueStreamingAround(worldX: number, worldZ: number): void {
    const center = this.getPlayerChunkCoord(worldX, worldZ);
    const preloadRadius = this.preloadRadiusChunks;
    const unloadRadius = preloadRadius + WORLD_CONFIG.unloadRadiusBuffer;
    const streamingSignature = `${center.x},${center.z}:${preloadRadius}:${unloadRadius}`;
    if (streamingSignature === this.lastStreamingSignature) {
      return;
    }
    this.lastStreamingSignature = streamingSignature;

    const desired = new Set<string>();
    const retainedLoaded = new Set<string>();
    const candidates: Array<{ coord: ChunkCoord; distance: number }> = [];

    for (
      let chunkX = center.x - preloadRadius;
      chunkX <= center.x + preloadRadius;
      chunkX += 1
    ) {
      for (
        let chunkZ = center.z - preloadRadius;
        chunkZ <= center.z + preloadRadius;
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

    for (
      let chunkX = center.x - unloadRadius;
      chunkX <= center.x + unloadRadius;
      chunkX += 1
    ) {
      for (
        let chunkZ = center.z - unloadRadius;
        chunkZ <= center.z + unloadRadius;
        chunkZ += 1
      ) {
        retainedLoaded.add(toChunkKey({ x: chunkX, z: chunkZ }));
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
      if (retainedLoaded.has(chunkKey)) {
        continue;
      }

      this.chunkStore.delete(chunkKey);
      this.removedKeys.add(chunkKey);
      this.markNeighborsDirty(chunk.coord);
    }
  }

  processGenerationBudget(chunkBudget: number = WORLD_CONFIG.generationBudgetPerFrame): void {
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

      const chunk = this.createChunkFromBlocks(completed.coord, completed.blocks);
      this.chunkStore.set(chunk);
      this.catchUpSurfaceWeatherForChunk(chunk);
      this.queueMeshUpdate(key);
      this.markNeighborsDirty(completed.coord);
      this.seedFluidInterfaces(completed.coord);
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

        const chunk = this.createChunk(coord);
        this.chunkStore.set(chunk);
        this.catchUpSurfaceWeatherForChunk(chunk);
        this.queueMeshUpdate(key);
        this.seedFluidInterfaces(coord);
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

  getBlockOrGenerated(worldX: number, worldY: number, worldZ: number): BlockId {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return 0;
    }

    const loaded = this.getBlockIfLoaded(worldX, worldY, worldZ);
    if (loaded !== null) {
      return loaded;
    }

    const coord = worldToChunkCoord(worldX, worldZ);
    const diffMap = this.chunkDiffs.get(toChunkKey(coord));
    if (diffMap) {
      const local = worldToLocal(worldX, worldY, worldZ);
      const diffBlock = diffMap.get(Chunk.getIndex(local.x, local.y, local.z));
      if (typeof diffBlock === 'number') {
        return diffBlock;
      }
    }

    return this.generator.getTerrainBlock(worldX, worldY, worldZ);
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
    const previousBlockId = chunk.getBlock(local.x, local.y, local.z);
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
    if (this.shouldScheduleFluidNeighborhood(worldX, worldY, worldZ, previousBlockId, blockId)) {
      this.enqueueFluidNeighborhood(worldX, worldY, worldZ);
    }
    return true;
  }

  getTopSolidBlockY(worldX: number, worldZ: number): number {
    return this.generator.getSurfaceHeight(worldX, worldZ);
  }

  getFlowVectorForWaterCell(
    worldX: number,
    worldY: number,
    worldZ: number,
  ): { x: number; z: number; magnitude: number; edgeBoost: number } {
    const blockId = this.getBlockIfLoaded(worldX, worldY, worldZ);
    if (blockId === null || !isWaterBlock(blockId) || isWaterSource(blockId)) {
      return { x: 0, z: 0, magnitude: 0, edgeBoost: 0 };
    }

    const currentLevel = getWaterLevel(blockId);
    if (currentLevel === null) {
      return { x: 0, z: 0, magnitude: 0, edgeBoost: 0 };
    }

    let vectorX = 0;
    let vectorZ = 0;
    for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
      const neighborX = worldX + offsetX;
      const neighborZ = worldZ + offsetZ;
      const neighbor = this.getBlockIfLoaded(neighborX, worldY, neighborZ);
      if (neighbor === null) {
        continue;
      }

      const neighborLevel = getWaterLevel(neighbor);
      if (neighborLevel !== null) {
        const delta = neighborLevel - currentLevel;
        vectorX += offsetX * delta;
        vectorZ += offsetZ * delta;
        continue;
      }

      if (!this.canWaterOccupy(neighbor)) {
        continue;
      }

      const belowNeighbor = this.getBlockIfLoaded(neighborX, worldY - 1, neighborZ);
      if (belowNeighbor === null) {
        continue;
      }

      const belowLevel = getWaterLevel(belowNeighbor);
      if (belowLevel !== null) {
        const delta = belowLevel - (currentLevel - 8);
        vectorX += offsetX * delta;
        vectorZ += offsetZ * delta;
        continue;
      }

      if (this.canWaterOccupy(belowNeighbor)) {
        const delta = 8 - currentLevel;
        vectorX += offsetX * delta;
        vectorZ += offsetZ * delta;
      }
    }

    const magnitude = Math.hypot(vectorX, vectorZ);
    if (magnitude <= 0.0001) {
      return { x: 0, z: 0, magnitude: 0, edgeBoost: 0 };
    }

    const normalizedX = vectorX / magnitude;
    const normalizedZ = vectorZ / magnitude;
    let edgeBoost = 0;
    if (currentLevel === WATER_FLOW_LEVEL_MAX) {
      for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
        const alignment = offsetX * normalizedX + offsetZ * normalizedZ;
        if (alignment < 0.6) {
          continue;
        }

        const next = this.getBlockIfLoaded(worldX + offsetX, worldY, worldZ + offsetZ);
        if (next === null || isWaterBlock(next) || !this.canWaterOccupy(next)) {
          continue;
        }

        edgeBoost = Math.max(edgeBoost, alignment);
      }
    }

    return {
      x: normalizedX,
      z: normalizedZ,
      magnitude: 1,
      edgeBoost,
    };
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

  tickFluids(dtSeconds: number): void {
    if (dtSeconds <= 0) {
      return;
    }

    this.fluidTickAccumulator += dtSeconds;
    while (this.fluidTickAccumulator >= WORLD_CONFIG.fluidTickSeconds) {
      this.fluidTickAccumulator -= WORLD_CONFIG.fluidTickSeconds;
      this.processFluidTick(WORLD_CONFIG.fluidBudgetPerTick);
      if (this.fluidScheduledTicksByKey.size === 0) {
        this.fluidTickAccumulator = 0;
        break;
      }
    }
  }

  tickWeatherAccumulation(dtSeconds: number, weatherState: WeatherVisualState): void {
    if (dtSeconds <= 0) {
      return;
    }

    this.weatherAccumulationAccumulator += dtSeconds;
    while (this.weatherAccumulationAccumulator >= WEATHER_ACCUMULATION_STEP_SECONDS) {
      this.weatherAccumulationAccumulator -= WEATHER_ACCUMULATION_STEP_SECONDS;
      this.weatherAccumulationTick += 1;
      this.processWeatherAccumulationStep(weatherState);
    }
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
    const chunkKeys = new Set<string>([
      ...this.chunkDiffs.keys(),
      ...this.chunkSurfaceWeatherTicks.keys(),
    ]);
    return [...chunkKeys].map((chunkKey) => this.getChunkDiffRecord(chunkKey));
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
    const surfaceWeatherTick = this.chunkSurfaceWeatherTicks.get(chunkKey);

    return {
      chunkKey,
      changes,
      revision,
      ...(typeof surfaceWeatherTick === 'number' ? { surfaceWeatherTick } : {}),
    };
  }

  private getChunkSurfaceWeatherTick(chunkKey: string): number {
    return this.chunkSurfaceWeatherTicks.get(chunkKey) ?? 0;
  }

  private setChunkSurfaceWeatherTick(chunkKey: string, tick: number): void {
    const normalizedTick = Math.max(0, Math.floor(tick));
    const previousTick = this.chunkSurfaceWeatherTicks.get(chunkKey) ?? 0;
    if (normalizedTick === previousTick) {
      return;
    }

    if (normalizedTick <= 0) {
      this.chunkSurfaceWeatherTicks.delete(chunkKey);
    } else {
      this.chunkSurfaceWeatherTicks.set(chunkKey, normalizedTick);
    }
    this.diffDirtyKeys.add(chunkKey);
  }

  private getSurfaceWeatherAction(weatherState: WeatherVisualState): WeatherSurfaceAction {
    if (weatherState.temperatureCelsius >= 0) {
      return 'thaw';
    }
    if (weatherState.rainIntensity <= 0.01) {
      return 'idle';
    }
    return weatherState.preset === 'snow_heavy' ? 'snow_heavy' : 'snow';
  }

  private recordSurfaceWeatherAction(action: WeatherSurfaceAction): void {
    if (this.weatherAccumulationTick <= 0) {
      return;
    }

    const last = this.surfaceWeatherHistory[this.surfaceWeatherHistory.length - 1];
    if (
      last &&
      last.action === action &&
      last.endTick + 1 >= this.weatherAccumulationTick
    ) {
      last.endTick = Math.max(last.endTick, this.weatherAccumulationTick);
      return;
    }

    this.surfaceWeatherHistory.push({
      startTick: this.weatherAccumulationTick,
      endTick: this.weatherAccumulationTick,
      action,
    });
  }

  private catchUpSurfaceWeatherForChunk(chunk: Chunk): void {
    const fromTick = this.getChunkSurfaceWeatherTick(chunk.key);
    if (fromTick >= this.weatherAccumulationTick || this.surfaceWeatherHistory.length === 0) {
      if (this.weatherAccumulationTick > 0 && fromTick !== this.weatherAccumulationTick) {
        this.setChunkSurfaceWeatherTick(chunk.key, this.weatherAccumulationTick);
      }
      return;
    }

    for (const segment of this.surfaceWeatherHistory) {
      if (segment.endTick <= fromTick) {
        continue;
      }
      if (segment.startTick > this.weatherAccumulationTick) {
        break;
      }

      const startTick = Math.max(segment.startTick, fromTick + 1);
      const endTick = Math.min(segment.endTick, this.weatherAccumulationTick);
      for (let tick = startTick; tick <= endTick; tick += 1) {
        this.applySurfaceWeatherStepToChunk(chunk, tick, segment.action);
      }
    }

    this.setChunkSurfaceWeatherTick(chunk.key, this.weatherAccumulationTick);
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

  private processFluidTick(budget: number): void {
    this.fluidCurrentTick += 1;
    const cappedBudget = Math.max(0, Math.floor(budget));
    let processed = 0;

    while (processed < cappedBudget) {
      const dueTick = this.fluidMinScheduledTick;
      if (dueTick === null || dueTick > this.fluidCurrentTick) {
        break;
      }

      const bucket = this.fluidBuckets.get(dueTick);
      if (!bucket || bucket.length === 0) {
        this.fluidBuckets.delete(dueTick);
        this.refreshFluidMinScheduledTick();
        continue;
      }

      const cell = bucket.shift();
      if (bucket.length === 0) {
        this.fluidBuckets.delete(dueTick);
        this.refreshFluidMinScheduledTick();
      }
      if (!cell) {
        continue;
      }

      const [worldX, worldY, worldZ] = cell;
      const key = this.getFluidCellKey(worldX, worldY, worldZ);
      const scheduledTick = this.fluidScheduledTicksByKey.get(key);
      if (scheduledTick !== dueTick) {
        continue;
      }

      this.fluidScheduledTicksByKey.delete(key);
      this.reevaluateFluidCell(worldX, worldY, worldZ);
      processed += 1;
    }
  }

  private getFluidCellKey(worldX: number, worldY: number, worldZ: number): string {
    return `${worldX},${worldY},${worldZ}`;
  }

  private refreshFluidMinScheduledTick(): void {
    if (this.fluidBuckets.size === 0) {
      this.fluidMinScheduledTick = null;
      return;
    }

    let minTick: number | null = null;
    for (const tick of this.fluidBuckets.keys()) {
      if (minTick === null || tick < minTick) {
        minTick = tick;
      }
    }
    this.fluidMinScheduledTick = minTick;
  }

  private reevaluateFluidCell(worldX: number, worldY: number, worldZ: number): void {
    const current = this.getBlockIfLoaded(worldX, worldY, worldZ);
    if (current === null || isWaterSource(current)) {
      return;
    }
    if (!this.canWaterOccupy(current)) {
      return;
    }

    const targetLevel = this.resolveFluidLevelForCell(worldX, worldY, worldZ);
    if (targetLevel === null) {
      if (!isWaterBlock(current)) {
        return;
      }
      if (isWaterSource(current)) {
        return;
      }
      if (!this.setBlock(worldX, worldY, worldZ, 0)) {
        return;
      }
      this.enqueueFluidNeighborhood(worldX, worldY, worldZ);
      return;
    }

    const targetBlock = toFlowWaterId(targetLevel);
    if (current === targetBlock) {
      return;
    }
    if (!this.setBlock(worldX, worldY, worldZ, targetBlock)) {
      return;
    }

    this.enqueueFluidNeighborhood(worldX, worldY, worldZ);
  }

  private resolveFluidLevelForCell(worldX: number, worldY: number, worldZ: number): number | null {
    const above = this.getBlockIfLoaded(worldX, worldY + 1, worldZ);
    if (above !== null && isWaterBlock(above)) {
      return 1;
    }

    let best: number | null = null;
    for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
      const neighborX = worldX + offsetX;
      const neighborZ = worldZ + offsetZ;
      const neighbor = this.getBlockIfLoaded(neighborX, worldY, neighborZ);
      if (neighbor === null || !isWaterBlock(neighbor)) {
        continue;
      }
      if (!this.canReceiveHorizontalFlowFrom(neighborX, worldY, neighborZ, worldX, worldY, worldZ)) {
        continue;
      }

      const neighborLevel = getWaterLevel(neighbor);
      if (neighborLevel === null) {
        continue;
      }

      const candidate = neighborLevel + 1;
      if (candidate > WATER_FLOW_LEVEL_MAX) {
        continue;
      }
      best = best === null ? candidate : Math.min(best, candidate);
    }

    return best;
  }

  private canReceiveHorizontalFlowFrom(
    sourceX: number,
    sourceY: number,
    sourceZ: number,
    targetX: number,
    targetY: number,
    targetZ: number,
  ): boolean {
    if (sourceY !== targetY) {
      return false;
    }

    const deltaX = targetX - sourceX;
    const deltaZ = targetZ - sourceZ;
    let directionIndex = -1;
    for (let index = 0; index < FLUID_HORIZONTAL_OFFSETS.length; index += 1) {
      const [offsetX, offsetZ] = FLUID_HORIZONTAL_OFFSETS[index];
      if (offsetX === deltaX && offsetZ === deltaZ) {
        directionIndex = index;
        break;
      }
    }
    if (directionIndex < 0) {
      return false;
    }

    const flowCosts = this.computeHorizontalFlowCosts(sourceX, sourceY, sourceZ);
    const targetCost = flowCosts[directionIndex];
    if (!Number.isFinite(targetCost)) {
      return false;
    }

    let bestCost = Number.POSITIVE_INFINITY;
    for (const cost of flowCosts) {
      if (cost < bestCost) {
        bestCost = cost;
      }
    }

    return Number.isFinite(bestCost) && targetCost === bestCost;
  }

  private computeHorizontalFlowCosts(worldX: number, worldY: number, worldZ: number): number[] {
    const costs = FLUID_HORIZONTAL_OFFSETS.map(() => Number.POSITIVE_INFINITY);
    const below = this.getBlockIfLoaded(worldX, worldY - 1, worldZ);
    if (below !== null && this.canWaterOccupy(below)) {
      // If this cell can fall, it should not spread horizontally.
      return costs;
    }

    for (let index = 0; index < FLUID_HORIZONTAL_OFFSETS.length; index += 1) {
      const [offsetX, offsetZ] = FLUID_HORIZONTAL_OFFSETS[index];
      const nextX = worldX + offsetX;
      const nextZ = worldZ + offsetZ;
      const next = this.getBlockIfLoaded(nextX, worldY, nextZ);
      if (next === null || !this.canWaterOccupy(next)) {
        continue;
      }

      const nextBelow = this.getBlockIfLoaded(nextX, worldY - 1, nextZ);
      if (nextBelow !== null && this.canWaterOccupy(nextBelow)) {
        costs[index] = 0;
        continue;
      }

      const visited = new Set<string>();
      visited.add(`${worldX},${worldY},${worldZ}`);
      visited.add(`${nextX},${worldY},${nextZ}`);
      const pathCost = this.findHorizontalFlowCost(nextX, worldY, nextZ, 1, visited);
      costs[index] = Number.isFinite(pathCost) ? pathCost : FLUID_FLOW_SEARCH_MAX_DEPTH + 1;
    }

    return costs;
  }

  private findHorizontalFlowCost(
    worldX: number,
    worldY: number,
    worldZ: number,
    depth: number,
    visited: Set<string>,
  ): number {
    if (depth >= FLUID_FLOW_SEARCH_MAX_DEPTH) {
      return Number.POSITIVE_INFINITY;
    }

    let best = Number.POSITIVE_INFINITY;
    for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
      const nextX = worldX + offsetX;
      const nextZ = worldZ + offsetZ;
      const key = `${nextX},${worldY},${nextZ}`;
      if (visited.has(key)) {
        continue;
      }

      const next = this.getBlockIfLoaded(nextX, worldY, nextZ);
      if (next === null || !this.canWaterOccupy(next)) {
        continue;
      }

      const nextBelow = this.getBlockIfLoaded(nextX, worldY - 1, nextZ);
      if (nextBelow !== null && this.canWaterOccupy(nextBelow)) {
        best = Math.min(best, depth);
        continue;
      }

      visited.add(key);
      const nested = this.findHorizontalFlowCost(nextX, worldY, nextZ, depth + 1, visited);
      visited.delete(key);
      if (nested < best) {
        best = nested;
      }
    }

    return best;
  }

  private canWaterOccupy(blockId: BlockId): boolean {
    return blockId === 0 || isPlantBlock(blockId) || (isWaterBlock(blockId) && !isWaterSource(blockId));
  }

  private shouldScheduleFluidNeighborhood(
    worldX: number,
    worldY: number,
    worldZ: number,
    previousBlockId: BlockId,
    nextBlockId: BlockId,
  ): boolean {
    if (isWaterBlock(previousBlockId) || isWaterBlock(nextBlockId)) {
      return true;
    }

    for (const [offsetX, offsetY, offsetZ] of FLUID_NEIGHBORS) {
      if (offsetX === 0 && offsetY === 0 && offsetZ === 0) {
        continue;
      }
      const neighbor = this.getBlockIfLoaded(worldX + offsetX, worldY + offsetY, worldZ + offsetZ);
      if (neighbor !== null && isWaterBlock(neighbor)) {
        return true;
      }
    }
    return false;
  }

  private getBlockIfLoaded(worldX: number, worldY: number, worldZ: number): BlockId | null {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return null;
    }

    const coord = worldToChunkCoord(worldX, worldZ);
    const chunk = this.chunkStore.get(toChunkKey(coord));
    if (!chunk) {
      return null;
    }

    const local = worldToLocal(worldX, worldY, worldZ);
    return chunk.getBlock(local.x, local.y, local.z);
  }

  private enqueueFluidCell(
    worldX: number,
    worldY: number,
    worldZ: number,
    delayTicks = FLUID_UPDATE_DELAY_TICKS,
  ): void {
    if (worldY < 0 || worldY >= WORLD_CONFIG.chunkSizeY) {
      return;
    }
    if (this.getBlockIfLoaded(worldX, worldY, worldZ) === null) {
      return;
    }

    const key = this.getFluidCellKey(worldX, worldY, worldZ);
    const dueTick = this.fluidCurrentTick + Math.max(0, Math.floor(delayTicks));
    const existingDueTick = this.fluidScheduledTicksByKey.get(key);
    if (existingDueTick !== undefined && existingDueTick <= dueTick) {
      return;
    }

    this.fluidScheduledTicksByKey.set(key, dueTick);
    const bucket = this.fluidBuckets.get(dueTick);
    if (bucket) {
      bucket.push([worldX, worldY, worldZ]);
    } else {
      this.fluidBuckets.set(dueTick, [[worldX, worldY, worldZ]]);
    }

    if (this.fluidMinScheduledTick === null || dueTick < this.fluidMinScheduledTick) {
      this.fluidMinScheduledTick = dueTick;
    }
  }

  private enqueueFluidNeighborhood(
    worldX: number,
    worldY: number,
    worldZ: number,
    delayTicks = FLUID_UPDATE_DELAY_TICKS,
  ): void {
    for (const [offsetX, offsetY, offsetZ] of FLUID_NEIGHBORS) {
      this.enqueueFluidCell(worldX + offsetX, worldY + offsetY, worldZ + offsetZ, delayTicks);
    }
  }

  private seedFluidInterfaces(coord: ChunkCoord): void {
    const chunkKey = toChunkKey(coord);
    if (!this.chunkStore.has(chunkKey)) {
      return;
    }

    const neighbors: Array<{
      coord: ChunkCoord;
      boundaryX: number;
      boundaryZ: number;
      stepX: number;
      stepZ: number;
      axis: 'x' | 'z';
    }> = [
      {
        coord: { x: coord.x + 1, z: coord.z },
        boundaryX: WORLD_CONFIG.chunkSizeX - 1,
        boundaryZ: 0,
        stepX: 1,
        stepZ: 0,
        axis: 'x',
      },
      {
        coord: { x: coord.x - 1, z: coord.z },
        boundaryX: 0,
        boundaryZ: 0,
        stepX: -1,
        stepZ: 0,
        axis: 'x',
      },
      {
        coord: { x: coord.x, z: coord.z + 1 },
        boundaryX: 0,
        boundaryZ: WORLD_CONFIG.chunkSizeZ - 1,
        stepX: 0,
        stepZ: 1,
        axis: 'z',
      },
      {
        coord: { x: coord.x, z: coord.z - 1 },
        boundaryX: 0,
        boundaryZ: 0,
        stepX: 0,
        stepZ: -1,
        axis: 'z',
      },
    ];

    const originX = chunkOriginX(coord);
    const originZ = chunkOriginZ(coord);

    for (const neighbor of neighbors) {
      if (!this.chunkStore.has(toChunkKey(neighbor.coord))) {
        continue;
      }

      if (neighbor.axis === 'x') {
        const worldX = originX + neighbor.boundaryX;
        for (let localZ = 0; localZ < WORLD_CONFIG.chunkSizeZ; localZ += 1) {
          const worldZ = originZ + localZ;
          this.seedFluidInterfaceCells(worldX, worldZ, neighbor.stepX, 0);
        }
        continue;
      }

      const worldZ = originZ + neighbor.boundaryZ;
      for (let localX = 0; localX < WORLD_CONFIG.chunkSizeX; localX += 1) {
        const worldX = originX + localX;
        this.seedFluidInterfaceCells(worldX, worldZ, 0, neighbor.stepZ);
      }
    }
  }

  private seedFluidInterfaceCells(worldX: number, worldZ: number, stepX: number, stepZ: number): void {
    for (let worldY = 0; worldY < WORLD_CONFIG.chunkSizeY; worldY += 1) {
      const local = this.getBlockIfLoaded(worldX, worldY, worldZ);
      const adjacent = this.getBlockIfLoaded(worldX + stepX, worldY, worldZ + stepZ);
      if (local === null || adjacent === null) {
        continue;
      }
      if (!isWaterBlock(local) && !isWaterBlock(adjacent)) {
        continue;
      }

      for (const [offsetX, offsetZ] of FLUID_INTERFACE_OFFSETS) {
        this.enqueueFluidCell(worldX + offsetX, worldY, worldZ + offsetZ);
        this.enqueueFluidCell(worldX + stepX + offsetX, worldY, worldZ + stepZ + offsetZ);
      }
      this.enqueueFluidCell(worldX, worldY + 1, worldZ);
      this.enqueueFluidCell(worldX, worldY - 1, worldZ);
      this.enqueueFluidCell(worldX + stepX, worldY + 1, worldZ + stepZ);
      this.enqueueFluidCell(worldX + stepX, worldY - 1, worldZ + stepZ);
    }
  }

  private processWeatherAccumulationStep(weatherState: WeatherVisualState): void {
    const action = this.getSurfaceWeatherAction(weatherState);
    this.recordSurfaceWeatherAction(action);

    if (this.chunkStore.size === 0) {
      return;
    }

    for (const chunk of this.chunkStore.values()) {
      this.applySurfaceWeatherStepToChunk(chunk, this.weatherAccumulationTick, action);
      this.setChunkSurfaceWeatherTick(chunk.key, this.weatherAccumulationTick);
    }
  }

  private applySurfaceWeatherStepToChunk(
    chunk: Chunk,
    weatherTick: number,
    action: WeatherSurfaceAction,
  ): void {
    if (action === 'idle') {
      return;
    }

    const profile = SURFACE_WEATHER_ACTION_PROFILES[action];
    const originX = chunkOriginX(chunk.coord);
    const originZ = chunkOriginZ(chunk.coord);
    const sampleHash = hash32(
      weatherTick ^
        Math.imul(chunk.coord.x, 0x45d9f3b) ^
        Math.imul(chunk.coord.z, 0x119de1f3) ^
        0x9e3779b9,
    );
    const localX = sampleHash & (WORLD_CONFIG.chunkSizeX - 1);
    const localZ = (sampleHash >>> 8) & (WORLD_CONFIG.chunkSizeZ - 1);

    if (action === 'snow' || action === 'snow_heavy') {
      if (profile.snowSampleModulo <= 1 || Math.abs(sampleHash) % profile.snowSampleModulo === 0) {
        this.tryAccumulateSnowAtColumn(
          chunk,
          originX,
          originZ,
          localX,
          localZ,
          sampleHash,
        );
      }

      const freezeHash = hash32(sampleHash ^ 0x5f3759df);
      if (
        profile.freezeSampleModulo <= 1 ||
        Math.abs(freezeHash) % profile.freezeSampleModulo === 0
      ) {
        this.tryFreezeWaterAtColumn(chunk, originX, originZ, localX, localZ);
      }
      return;
    }

    if (profile.thawSampleModulo <= 1 || Math.abs(sampleHash) % profile.thawSampleModulo === 0) {
      this.tryThawSurfaceAtColumn(chunk, originX, originZ, localX, localZ, sampleHash);
    }
  }

  private tryAccumulateSnowAtColumn(
    chunk: Chunk,
    originX: number,
    originZ: number,
    localX: number,
    localZ: number,
    sampleHash: number,
  ): void {
    const surface = this.getChunkSurfaceState(chunk, localX, localZ);
    if (!surface || surface.topY <= 0 || surface.topY >= WORLD_CONFIG.chunkSizeY - 0.0001) {
      return;
    }

    const worldX = originX + localX;
    const worldZ = originZ + localZ;
    const aboveWorldY = surface.blockY + 1;
    const aboveBlockId =
      aboveWorldY < WORLD_CONFIG.chunkSizeY ? this.getBlock(worldX, aboveWorldY, worldZ) : 0;
    const existingSnowLayers = this.getSnowColumnLayerCount(worldX, surface.blockY, worldZ);
    const accumulationHash = hash32(
      sampleHash ^
        Math.imul(worldX, 0x27d4eb2d) ^
        Math.imul(worldZ, 0x165667b1) ^
        Math.imul(surface.blockY + 1, 0x9e3779b9),
    );

    if (!shouldAccumulateSnowLayerFromHash(existingSnowLayers, accumulationHash)) {
      return;
    }

    if (surface.blockId === SNOW_BLOCK_ID) {
      if (aboveWorldY >= WORLD_CONFIG.chunkSizeY || aboveBlockId !== 0) {
        return;
      }
      void this.setBlock(worldX, aboveWorldY, worldZ, toSnowCoverBlockId(1));
      return;
    }

    const snowLevel = getSnowCoverLevel(surface.blockId);
    if (snowLevel !== null) {
      if (snowLevel >= 8) {
        return;
      }
      void this.setBlock(worldX, surface.blockY, worldZ, toSnowCoverBlockId(snowLevel + 1));
      return;
    }

    if (!this.canSupportSnowAccumulation(surface.blockId) || aboveBlockId !== 0) {
      return;
    }

    void this.setBlock(worldX, aboveWorldY, worldZ, toSnowCoverBlockId(1));
  }

  private tryFreezeWaterAtColumn(
    chunk: Chunk,
    originX: number,
    originZ: number,
    localX: number,
    localZ: number,
  ): void {
    const surface = this.getChunkSurfaceState(chunk, localX, localZ);
    if (!surface || !isWaterBlock(surface.blockId)) {
      return;
    }

    const worldX = originX + localX;
    const worldZ = originZ + localZ;
    if (!this.hasAdjacentSurfaceFreezeSupport(worldX, surface.blockY, worldZ)) {
      return;
    }

    void this.setBlock(worldX, surface.blockY, worldZ, ICE_BLOCK_ID);
  }

  private tryThawSurfaceAtColumn(
    chunk: Chunk,
    originX: number,
    originZ: number,
    localX: number,
    localZ: number,
    sampleHash: number,
  ): void {
    const surface = this.getChunkSurfaceState(chunk, localX, localZ);
    if (!surface) {
      return;
    }

    const worldX = originX + localX;
    const worldZ = originZ + localZ;
    const snowLevel = getSnowCoverLevel(surface.blockId);
    if (snowLevel !== null) {
      void this.setBlock(
        worldX,
        surface.blockY,
        worldZ,
        snowLevel <= 1 ? 0 : toSnowCoverBlockId(snowLevel - 1),
      );
      return;
    }

    if (surface.blockId === ICE_BLOCK_ID) {
      this.tryThawIceAtColumn(chunk, originX, originZ, localX, localZ, surface.blockY, sampleHash);
      return;
    }

    if (isWaterSource(surface.blockId)) {
      this.trySpreadIceThawFromHole(chunk, originX, originZ, localX, localZ, surface.blockY, sampleHash);
    }
  }

  private tryThawIceAtColumn(
    chunk: Chunk,
    originX: number,
    originZ: number,
    localX: number,
    localZ: number,
    worldY: number,
    sampleHash: number,
  ): void {
    if (!this.isSurfaceIceAtLocalColumn(chunk, localX, worldY, localZ)) {
      return;
    }

    const worldX = originX + localX;
    const worldZ = originZ + localZ;
    const holeNeighbors = this.countAdjacentIceHolesInChunk(chunk, localX, worldY, localZ);
    const thawChance = Math.min(
      ICE_THAW_MAX_SAMPLE_CHANCE,
      ICE_THAW_BASE_SAMPLE_CHANCE + holeNeighbors * ICE_THAW_HOLE_NEIGHBOR_BONUS,
    );
    const thawHash = hash32(
      sampleHash ^
        Math.imul(worldX, 0x632be59b) ^
        Math.imul(worldZ, 0x85157af5) ^
        Math.imul(worldY + 1, 0x9e3779b1),
    );
    if (hashToUnitFloat(thawHash) >= thawChance) {
      return;
    }

    void this.setBlock(worldX, worldY, worldZ, WATER_SOURCE_BLOCK_ID);
  }

  private trySpreadIceThawFromHole(
    chunk: Chunk,
    originX: number,
    originZ: number,
    localX: number,
    localZ: number,
    worldY: number,
    sampleHash: number,
  ): void {
    if (!this.isExposedWaterHoleAtLocalColumn(chunk, localX, worldY, localZ)) {
      return;
    }

    const candidateOffsets = FLUID_HORIZONTAL_OFFSETS.filter(([offsetX, offsetZ]) =>
      this.isSurfaceIceAtLocalColumn(chunk, localX + offsetX, worldY, localZ + offsetZ),
    );
    if (candidateOffsets.length === 0) {
      return;
    }

    const spreadHash = hash32(
      sampleHash ^
        Math.imul(originX + localX, 0x27d4eb2d) ^
        Math.imul(originZ + localZ, 0x165667b1) ^
        0x68e31da4,
    );
    if (hashToUnitFloat(spreadHash) >= ICE_THAW_SPREAD_FROM_HOLE_CHANCE) {
      return;
    }

    const choiceIndex = Math.floor(hashToUnitFloat(hash32(spreadHash ^ 0x94d049bb)) * candidateOffsets.length);
    const [offsetX, offsetZ] = candidateOffsets[Math.min(candidateOffsets.length - 1, choiceIndex)]!;
    void this.setBlock(
      originX + localX + offsetX,
      worldY,
      originZ + localZ + offsetZ,
      WATER_SOURCE_BLOCK_ID,
    );
  }

  private getSnowColumnLayerCount(worldX: number, worldY: number, worldZ: number): number {
    let totalLayers = 0;
    for (let scanY = worldY; scanY >= 0; scanY -= 1) {
      const snowLevel = getSnowCoverLevel(this.getBlock(worldX, scanY, worldZ));
      if (snowLevel === null) {
        break;
      }
      totalLayers += snowLevel;
    }
    return totalLayers;
  }

  private getChunkSurfaceState(
    chunk: Chunk,
    localX: number,
    localZ: number,
  ): ChunkSurfaceState | null {
    for (let y = WORLD_CONFIG.chunkSizeY - 1; y >= 0; y -= 1) {
      const blockId = chunk.getBlock(localX, y, localZ);
      if (blockId === 0) {
        continue;
      }
      if (isWaterBlock(blockId)) {
        return {
          blockId,
          blockY: y,
          topY: y + 1,
        };
      }
      if (!blocksMovement(blockId)) {
        continue;
      }
      return {
        blockId,
        blockY: y,
        topY: y + getBlockCollisionHeight(blockId),
      };
    }

    return null;
  }

  private canSupportSnowAccumulation(blockId: BlockId): boolean {
    return (
      blockId !== 0 &&
      blockId !== 4 &&
      blockId !== 5 &&
      !isPlantBlock(blockId) &&
      !isWaterBlock(blockId) &&
      !isSnowLayerBlock(blockId)
    );
  }

  private countAdjacentIceHolesInChunk(
    chunk: Chunk,
    localX: number,
    worldY: number,
    localZ: number,
  ): number {
    let count = 0;
    for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
      if (this.isExposedWaterHoleAtLocalColumn(chunk, localX + offsetX, worldY, localZ + offsetZ)) {
        count += 1;
      }
    }
    return count;
  }

  private isSurfaceIceAtLocalColumn(
    chunk: Chunk,
    localX: number,
    worldY: number,
    localZ: number,
  ): boolean {
    if (
      localX < 0 ||
      localZ < 0 ||
      localX >= WORLD_CONFIG.chunkSizeX ||
      localZ >= WORLD_CONFIG.chunkSizeZ ||
      worldY < 0 ||
      worldY >= WORLD_CONFIG.chunkSizeY - 1
    ) {
      return false;
    }

    return chunk.getBlock(localX, worldY, localZ) === ICE_BLOCK_ID && chunk.getBlock(localX, worldY + 1, localZ) === 0;
  }

  private isExposedWaterHoleAtLocalColumn(
    chunk: Chunk,
    localX: number,
    worldY: number,
    localZ: number,
  ): boolean {
    if (
      localX < 0 ||
      localZ < 0 ||
      localX >= WORLD_CONFIG.chunkSizeX ||
      localZ >= WORLD_CONFIG.chunkSizeZ ||
      worldY < 0 ||
      worldY >= WORLD_CONFIG.chunkSizeY - 1
    ) {
      return false;
    }

    return isWaterSource(chunk.getBlock(localX, worldY, localZ)) && chunk.getBlock(localX, worldY + 1, localZ) === 0;
  }

  private hasAdjacentSurfaceFreezeSupport(worldX: number, worldY: number, worldZ: number): boolean {
    for (const [offsetX, offsetZ] of FLUID_HORIZONTAL_OFFSETS) {
      const adjacent = this.getBlockOrGenerated(worldX + offsetX, worldY, worldZ + offsetZ);
      if (adjacent === ICE_BLOCK_ID) {
        return true;
      }
      if (isWaterBlock(adjacent) || isPlantBlock(adjacent)) {
        continue;
      }
      if (getBlockCollisionHeight(adjacent) >= 1) {
        return true;
      }
    }

    return false;
  }

  private queueMeshUpdate(chunkKey: string): void {
    if (this.meshDirtyKeys.has(chunkKey)) {
      return;
    }

    this.meshDirtyKeys.add(chunkKey);
    this.meshQueue.push(chunkKey);
  }
}
