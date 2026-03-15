import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { BlockId } from '../types/blocks';
import {
  getBlockDefinition,
  isPlantBlock,
  isSolidBlock,
  isTransparentBlock,
  isWaterBlock,
} from '../world/BlockRegistry';
import type { Chunk } from '../world/Chunk';
import { chunkOriginX, chunkOriginZ } from '../world/ChunkCoord';
import type { World } from '../world/World';
import type { TextureAtlas } from './TextureAtlas';

type Face = {
  normal: [number, number, number];
  corners: Array<[number, number, number]>;
  texture: 'top' | 'bottom' | 'side';
};

const FACES: Face[] = [
  {
    normal: [1, 0, 0],
    corners: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    texture: 'side',
  },
  {
    normal: [-1, 0, 0],
    corners: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    texture: 'side',
  },
  {
    normal: [0, 1, 0],
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    texture: 'top',
  },
  {
    normal: [0, -1, 0],
    corners: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
    texture: 'bottom',
  },
  {
    normal: [0, 0, 1],
    corners: [
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
    ],
    texture: 'side',
  },
  {
    normal: [0, 0, -1],
    corners: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    texture: 'side',
  },
];

export class ChunkMesher {
  static buildGeometry(chunk: Chunk, world: World, atlas: TextureAtlas): BufferGeometry {
    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const originX = chunkOriginX(chunk.coord);
    const originZ = chunkOriginZ(chunk.coord);

    for (let y = 0; y < 96; y += 1) {
      for (let z = 0; z < 16; z += 1) {
        for (let x = 0; x < 16; x += 1) {
          const blockId = chunk.getBlock(x, y, z);
          if (blockId === 0) {
            continue;
          }

          if (isPlantBlock(blockId)) {
            const textureRect = ChunkMesher.getFaceTextureRect(blockId, 'side', atlas);
            ChunkMesher.pushPlantCross(positions, normals, uvs, x, y, z, textureRect);
            continue;
          }

          for (const face of FACES) {
            const neighborId = world.getBlock(
              originX + x + face.normal[0],
              y + face.normal[1],
              originZ + z + face.normal[2],
            );
            if (isWaterBlock(blockId) && isWaterBlock(neighborId)) {
              continue;
            }
            if (
              isSolidBlock(neighborId) &&
              !isPlantBlock(neighborId) &&
              !isTransparentBlock(neighborId)
            ) {
              continue;
            }

            const textureRect = ChunkMesher.getFaceTextureRect(blockId, face.texture, atlas);
            const faceUvs = [
              [textureRect.u0, textureRect.v1],
              [textureRect.u0, textureRect.v0],
              [textureRect.u1, textureRect.v0],
              [textureRect.u1, textureRect.v1],
            ] as const;
            const triangles = [0, 1, 2, 0, 2, 3];

            for (const triangleIndex of triangles) {
              const [cx, cy, cz] = face.corners[triangleIndex];
              positions.push(x + cx, y + cy, z + cz);
              normals.push(...face.normal);
              uvs.push(...faceUvs[triangleIndex]);
            }
          }
        }
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    geometry.computeBoundingSphere();
    return geometry;
  }

  private static pushPlantCross(
    positions: number[],
    normals: number[],
    uvs: number[],
    x: number,
    y: number,
    z: number,
    rect: { u0: number; v0: number; u1: number; v1: number },
  ): void {
    const min = 0.14;
    const max = 0.86;
    const top = 0.92;
    const quads: Array<[[number, number, number], [number, number, number], [number, number, number], [number, number, number], [number, number, number]]> = [
      [
        [x + min, y, z + min],
        [x + max, y, z + max],
        [x + max, y + top, z + max],
        [x + min, y + top, z + min],
        [0.7, 0, 0.7],
      ],
      [
        [x + max, y, z + min],
        [x + min, y, z + max],
        [x + min, y + top, z + max],
        [x + max, y + top, z + min],
        [-0.7, 0, 0.7],
      ],
    ];

    quads.forEach(([a, b, c, d, n]) => {
      ChunkMesher.pushQuadDoubleSided(positions, normals, uvs, a, b, c, d, n, rect);
    });
  }

  private static pushQuadDoubleSided(
    positions: number[],
    normals: number[],
    uvs: number[],
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    d: [number, number, number],
    normal: [number, number, number],
    rect: { u0: number; v0: number; u1: number; v1: number },
  ): void {
    const frontUvs = [
      [rect.u0, rect.v1],
      [rect.u1, rect.v1],
      [rect.u1, rect.v0],
      [rect.u0, rect.v0],
    ] as const;
    const frontTriangles = [0, 1, 2, 0, 2, 3];
    const backTriangles = [0, 2, 1, 0, 3, 2];
    const corners = [a, b, c, d] as const;

    frontTriangles.forEach((index) => {
      const corner = corners[index];
      positions.push(corner[0], corner[1], corner[2]);
      normals.push(normal[0], normal[1], normal[2]);
      uvs.push(...frontUvs[index]);
    });

    backTriangles.forEach((index) => {
      const corner = corners[index];
      positions.push(corner[0], corner[1], corner[2]);
      normals.push(-normal[0], -normal[1], -normal[2]);
      uvs.push(...frontUvs[index]);
    });
  }

  private static getFaceTextureRect(
    blockId: BlockId,
    face: 'top' | 'bottom' | 'side',
    atlas: TextureAtlas,
  ) {
    const definition = getBlockDefinition(blockId);
    if (face === 'top') {
      return atlas.getTileRect(definition.textureTop ?? definition.textureSide ?? 'dirt');
    }
    if (face === 'bottom') {
      return atlas.getTileRect(
        definition.textureBottom ?? definition.textureSide ?? definition.textureTop ?? 'dirt',
      );
    }
    return atlas.getTileRect(definition.textureSide ?? definition.textureTop ?? 'dirt');
  }
}
