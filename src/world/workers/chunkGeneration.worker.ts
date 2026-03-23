/// <reference lib="webworker" />

import type {
  ChunkGenerationWorkerRequest,
  ChunkGenerationWorkerResponse,
} from '../ChunkGenerationProtocol';
import { TerrainGenerator } from '../TerrainGenerator';

const workerScope: DedicatedWorkerGlobalScope = self as unknown as DedicatedWorkerGlobalScope;

let generator: TerrainGenerator | null = null;

const postMessage = (message: ChunkGenerationWorkerResponse, transfer?: Transferable[]): void => {
  workerScope.postMessage(message, transfer ?? []);
};

workerScope.addEventListener('message', (event: MessageEvent<ChunkGenerationWorkerRequest>) => {
  const message = event.data;

  if (message.type === 'init') {
    generator = new TerrainGenerator(message.seed);
    postMessage({ type: 'ready' });
    return;
  }

  if (!generator) {
    postMessage({
      type: 'error',
      requestId: message.requestId,
      message: 'Chunk generator worker is not initialized.',
    });
    return;
  }

  try {
    const chunk = generator.generateChunk(message.coord);
    const blocks = chunk.blocks;
    postMessage(
      {
        type: 'generated',
        requestId: message.requestId,
        coord: message.coord,
        blocks,
      },
      [blocks.buffer],
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Unknown worker error';
    postMessage({
      type: 'error',
      requestId: message.requestId,
      message: detail,
    });
  }
});

export {};

