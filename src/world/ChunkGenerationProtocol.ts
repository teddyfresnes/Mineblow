import type { ChunkCoord } from '../types/world';

export type ChunkGenerationWorkerRequest =
  | {
      type: 'init';
      seed: string;
    }
  | {
      type: 'generate';
      requestId: number;
      coord: ChunkCoord;
    };

export type ChunkGenerationWorkerResponse =
  | {
      type: 'ready';
    }
  | {
      type: 'generated';
      requestId: number;
      coord: ChunkCoord;
      blocks: Uint8Array;
    }
  | {
      type: 'error';
      requestId: number;
      message: string;
    };

