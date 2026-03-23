import type { ChunkCoord } from '../types/world';
import type {
  ChunkGenerationWorkerRequest,
  ChunkGenerationWorkerResponse,
} from './ChunkGenerationProtocol';
import { TerrainGenerator } from './TerrainGenerator';

interface PendingChunkRequest {
  coord: ChunkCoord;
  resolve: (blocks: Uint8Array) => void;
  reject: (reason?: unknown) => void;
}

export class ChunkGenerationDispatcher {
  private readonly fallbackGenerator: TerrainGenerator;
  private worker: Worker | null = null;
  private readonly pending = new Map<number, PendingChunkRequest>();
  private nextRequestId = 1;

  constructor(seed: string) {
    this.fallbackGenerator = new TerrainGenerator(seed);

    if (typeof Worker !== 'function') {
      return;
    }

    try {
      this.worker = new Worker(new URL('./workers/chunkGeneration.worker.ts', import.meta.url), {
        type: 'module',
      });
      this.worker.addEventListener('message', this.handleWorkerMessage);
      this.worker.addEventListener('error', this.handleWorkerError);

      const initMessage: ChunkGenerationWorkerRequest = {
        type: 'init',
        seed,
      };
      this.worker.postMessage(initMessage);
    } catch {
      this.worker = null;
    }
  }

  isAsyncEnabled(): boolean {
    return this.worker !== null;
  }

  generateBlocks(coord: ChunkCoord): Promise<Uint8Array> {
    if (!this.worker) {
      return Promise.resolve(this.fallbackGenerator.generateChunk(coord).blocks);
    }

    return new Promise<Uint8Array>((resolve, reject) => {
      const requestId = this.nextRequestId;
      this.nextRequestId += 1;
      this.pending.set(requestId, { coord, resolve, reject });

      const request: ChunkGenerationWorkerRequest = {
        type: 'generate',
        requestId,
        coord,
      };
      this.worker?.postMessage(request);
    });
  }

  dispose(): void {
    this.teardownWorker();
    for (const pending of this.pending.values()) {
      pending.reject(new Error('Chunk generation dispatcher disposed.'));
    }
    this.pending.clear();
  }

  private readonly handleWorkerMessage = (
    event: MessageEvent<ChunkGenerationWorkerResponse>,
  ): void => {
    const message = event.data;
    if (message.type === 'ready') {
      return;
    }

    const pending = this.pending.get(message.requestId);
    if (!pending) {
      return;
    }

    this.pending.delete(message.requestId);
    if (message.type === 'generated') {
      pending.resolve(message.blocks);
      return;
    }

    pending.resolve(this.fallbackGenerator.generateChunk(pending.coord).blocks);
  };

  private readonly handleWorkerError = (): void => {
    this.teardownWorker();

    for (const [requestId, pending] of this.pending.entries()) {
      this.pending.delete(requestId);
      pending.resolve(this.fallbackGenerator.generateChunk(pending.coord).blocks);
    }
  };

  private teardownWorker(): void {
    if (!this.worker) {
      return;
    }

    this.worker.removeEventListener('message', this.handleWorkerMessage);
    this.worker.removeEventListener('error', this.handleWorkerError);
    this.worker.terminate();
    this.worker = null;
  }
}

