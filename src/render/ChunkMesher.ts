import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { BlockId } from '../types/blocks';
import {
  getBlockDefinition,
  getWaterLevel,
  isPlantBlock,
  isSolidBlock,
  isTransparentBlock,
  isWaterBlock,
  WATER_FLOW_LEVEL_MAX,
} from '../world/BlockRegistry';
import type { Chunk } from '../world/Chunk';
import { chunkOriginX, chunkOriginZ } from '../world/ChunkCoord';
import type { World } from '../world/World';
import { WORLD_CONFIG } from '../game/Config';
import type { TextureAtlas } from './TextureAtlas';

type Face = {
  normal: [number, number, number];
  corners: Array<[number, number, number]>;
  texture: 'top' | 'bottom' | 'side';
};

type Rect = {
  u0: number;
  v0: number;
  u1: number;
  v1: number;
};

export type WaterTopFlow = {
  x: number;
  z: number;
  magnitude: number;
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

export const WATER_SURFACE_BASE_HEIGHT = 0.86;
export const WATER_SURFACE_MIN_HEIGHT = 0.125;
export const WATER_TOP_FLOW_MIN_MAGNITUDE = 0.03;
const WATER_TOP_FLOW_UV_SCALE = 0.5;
const WATER_TOP_BASE_COORDS: Array<[number, number]> = [
  [0, 1],
  [0, 0],
  [1, 0],
  [1, 1],
];

export const waterLevelToSurfaceHeight = (level: number): number => {
  if (!Number.isFinite(level) || level <= 0) {
    return WATER_SURFACE_BASE_HEIGHT;
  }
  if (level >= WATER_FLOW_LEVEL_MAX) {
    return WATER_SURFACE_MIN_HEIGHT;
  }

  const step = (WATER_SURFACE_BASE_HEIGHT - WATER_SURFACE_MIN_HEIGHT) / WATER_FLOW_LEVEL_MAX;
  return WATER_SURFACE_BASE_HEIGHT - step * level;
};

export const smoothWaterCornerHeight = (
  samples: Array<number | null>,
  fallbackHeight: number,
): number => {
  let sum = 0;
  let count = 0;
  for (const sample of samples) {
    if (sample === null) {
      continue;
    }
    sum += sample;
    count += 1;
  }
  if (count === 0) {
    return fallbackHeight;
  }
  return sum / count;
};

export const propagateWaterCornerHeight = (
  samples: Array<number | null>,
  fallbackHeight: number,
): number => {
  let best = fallbackHeight;
  let hasSample = false;
  for (const sample of samples) {
    if (sample === null) {
      continue;
    }
    hasSample = true;
    if (sample > best) {
      best = sample;
    }
  }
  return hasSample ? best : fallbackHeight;
};

export const shouldRenderWaterTopFace = (aboveBlockId: BlockId): boolean =>
  !isWaterBlock(aboveBlockId);

export const computeWaterTopFlow = (
  cornerH00: number,
  cornerH10: number,
  cornerH11: number,
  cornerH01: number,
): WaterTopFlow => {
  if (
    !Number.isFinite(cornerH00) ||
    !Number.isFinite(cornerH10) ||
    !Number.isFinite(cornerH11) ||
    !Number.isFinite(cornerH01)
  ) {
    return { x: 0, z: 0, magnitude: 0 };
  }

  const slopeX = ((cornerH10 + cornerH11) - (cornerH00 + cornerH01)) * 0.5;
  const slopeZ = ((cornerH01 + cornerH11) - (cornerH00 + cornerH10)) * 0.5;
  const x = -slopeX;
  const z = -slopeZ;
  const magnitude = Math.hypot(x, z);
  return { x, z, magnitude };
};

const mapTopUvToRect = (rect: Rect, s: number, t: number): [number, number] => [
  rect.u0 + (rect.u1 - rect.u0) * s,
  rect.v0 + (rect.v1 - rect.v0) * t,
];

export const buildWaterTopUvs = (
  rect: Rect,
  flow: WaterTopFlow,
): Array<[number, number]> => {
  if (flow.magnitude <= WATER_TOP_FLOW_MIN_MAGNITUDE) {
    return WATER_TOP_BASE_COORDS.map(([s, t]) => mapTopUvToRect(rect, s, t));
  }

  const angle = Math.atan2(flow.z, flow.x) - Math.PI / 2;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const scale = WATER_TOP_FLOW_UV_SCALE;

  return WATER_TOP_BASE_COORDS.map(([s, t]) => {
    const offsetS = (s - 0.5) * scale;
    const offsetT = (t - 0.5) * scale;
    const rotatedS = 0.5 + offsetS * cos - offsetT * sin;
    const rotatedT = 0.5 + offsetS * sin + offsetT * cos;
    return mapTopUvToRect(rect, rotatedS, rotatedT);
  });
};

export class ChunkMesher {
  static buildGeometry(chunk: Chunk, world: World, atlas: TextureAtlas): BufferGeometry {
    const solidPositions: number[] = [];
    const solidNormals: number[] = [];
    const solidUvs: number[] = [];
    const waterPositions: number[] = [];
    const waterNormals: number[] = [];
    const waterUvs: number[] = [];
    const originX = chunkOriginX(chunk.coord);
    const originZ = chunkOriginZ(chunk.coord);
    const chunkSizeX = WORLD_CONFIG.chunkSizeX;
    const chunkSizeY = WORLD_CONFIG.chunkSizeY;
    const chunkSizeZ = WORLD_CONFIG.chunkSizeZ;

    for (let y = 0; y < chunkSizeY; y += 1) {
      for (let z = 0; z < chunkSizeZ; z += 1) {
        for (let x = 0; x < chunkSizeX; x += 1) {
          const blockId = chunk.getBlock(x, y, z);
          if (blockId === 0) {
            continue;
          }
          const blockDefinition = getBlockDefinition(blockId);
          const renderDoubleSided = blockDefinition.key === 'leaves';

          if (isPlantBlock(blockId)) {
            const textureRect = ChunkMesher.getFaceTextureRect(blockId, 'side', atlas);
            ChunkMesher.pushPlantCross(solidPositions, solidNormals, solidUvs, x, y, z, textureRect);
            continue;
          }

          if (isWaterBlock(blockId)) {
            ChunkMesher.pushWaterBlock(
              waterPositions,
              waterNormals,
              waterUvs,
              chunk,
              world,
              atlas,
              originX,
              originZ,
              x,
              y,
              z,
              blockId,
            );
            continue;
          }

          for (const face of FACES) {
            const neighborX = x + face.normal[0];
            const neighborY = y + face.normal[1];
            const neighborZ = z + face.normal[2];
            const neighborId = ChunkMesher.getBlockAt(
              chunk,
              world,
              originX,
              originZ,
              neighborX,
              neighborY,
              neighborZ,
            );
            if (
              neighborId === blockId &&
              !ChunkMesher.shouldRenderSharedLeafFace(face.normal, renderDoubleSided)
            ) {
              continue;
            }
            if (ChunkMesher.isOpaqueOccluder(neighborId)) {
              continue;
            }

            const textureRect = ChunkMesher.getFaceTextureRect(blockId, face.texture, atlas);
            const faceUvs = [
              [textureRect.u0, textureRect.v1],
              [textureRect.u0, textureRect.v0],
              [textureRect.u1, textureRect.v0],
              [textureRect.u1, textureRect.v1],
            ] as const;
            const frontTriangles = [0, 1, 2, 0, 2, 3];
            const backTriangles = [0, 2, 1, 0, 3, 2];

            for (const triangleIndex of frontTriangles) {
              const [cx, cy, cz] = face.corners[triangleIndex];
              solidPositions.push(x + cx, y + cy, z + cz);
              solidNormals.push(...face.normal);
              solidUvs.push(...faceUvs[triangleIndex]);
            }

            if (renderDoubleSided) {
              for (const triangleIndex of backTriangles) {
                const [cx, cy, cz] = face.corners[triangleIndex];
                solidPositions.push(x + cx, y + cy, z + cz);
                solidNormals.push(-face.normal[0], -face.normal[1], -face.normal[2]);
                solidUvs.push(...faceUvs[triangleIndex]);
              }
            }
          }
        }
      }
    }

    const geometry = new BufferGeometry();
    const positions = solidPositions.concat(waterPositions);
    const normals = solidNormals.concat(waterNormals);
    const uvs = solidUvs.concat(waterUvs);
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    const solidVertexCount = solidPositions.length / 3;
    const waterVertexCount = waterPositions.length / 3;
    if (solidVertexCount > 0) {
      geometry.addGroup(0, solidVertexCount, 0);
    }
    if (waterVertexCount > 0) {
      geometry.addGroup(solidVertexCount, waterVertexCount, 1);
    }
    geometry.computeBoundingSphere();
    return geometry;
  }

  private static pushWaterBlock(
    positions: number[],
    normals: number[],
    uvs: number[],
    chunk: Chunk,
    world: World,
    atlas: TextureAtlas,
    originX: number,
    originZ: number,
    x: number,
    y: number,
    z: number,
    blockId: BlockId,
  ): void {
    const stillTopRect = ChunkMesher.getFaceTextureRect(blockId, 'top', atlas);
    const sideRect = ChunkMesher.getFaceTextureRect(blockId, 'side', atlas);
    const bottomRect = ChunkMesher.getFaceTextureRect(blockId, 'bottom', atlas);
    const aboveId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y + 1, z);
    const belowId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y - 1, z);

    const currentHeight = ChunkMesher.getRenderableWaterHeight(blockId, aboveId);
    const cornerH00 = ChunkMesher.computeWaterCornerHeight(
      chunk,
      world,
      originX,
      originZ,
      x,
      y,
      z,
      [
        [0, 0],
        [-1, 0],
        [0, -1],
        [-1, -1],
      ],
      currentHeight,
    );
    const cornerH10 = ChunkMesher.computeWaterCornerHeight(
      chunk,
      world,
      originX,
      originZ,
      x,
      y,
      z,
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1],
      ],
      currentHeight,
    );
    const cornerH11 = ChunkMesher.computeWaterCornerHeight(
      chunk,
      world,
      originX,
      originZ,
      x,
      y,
      z,
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      currentHeight,
    );
    const cornerH01 = ChunkMesher.computeWaterCornerHeight(
      chunk,
      world,
      originX,
      originZ,
      x,
      y,
      z,
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [-1, 1],
      ],
      currentHeight,
    );

    const topFlow = computeWaterTopFlow(cornerH00, cornerH10, cornerH11, cornerH01);
    const topRect = topFlow.magnitude > WATER_TOP_FLOW_MIN_MAGNITUDE ? sideRect : stillTopRect;
    const topUvs = buildWaterTopUvs(topRect, topFlow);

    if (shouldRenderWaterTopFace(aboveId) && !ChunkMesher.isOpaqueOccluder(aboveId)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x, y + cornerH01, z + 1],
          [x + 1, y + cornerH11, z + 1],
          [x + 1, y + cornerH10, z],
          [x, y + cornerH00, z],
        ],
        [0, 1, 0],
        topUvs,
      );
    }

    if (!isWaterBlock(belowId) && !ChunkMesher.isOpaqueOccluder(belowId)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x, y, z],
          [x + 1, y, z],
          [x + 1, y, z + 1],
          [x, y, z + 1],
        ],
        [0, -1, 0],
        [
          [bottomRect.u0, bottomRect.v1],
          [bottomRect.u0, bottomRect.v0],
          [bottomRect.u1, bottomRect.v0],
          [bottomRect.u1, bottomRect.v1],
        ],
      );
    }

    const plusX = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x + 1, y, z);
    if (!isWaterBlock(plusX) && !ChunkMesher.isOpaqueOccluder(plusX)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x + 1, y, z],
          [x + 1, y + cornerH10, z],
          [x + 1, y + cornerH11, z + 1],
          [x + 1, y, z + 1],
        ],
        [1, 0, 0],
        [
          [sideRect.u0, sideRect.v1],
          [sideRect.u0, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH10)],
          [sideRect.u1, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH11)],
          [sideRect.u1, sideRect.v1],
        ],
      );
    }

    const minusX = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x - 1, y, z);
    if (!isWaterBlock(minusX) && !ChunkMesher.isOpaqueOccluder(minusX)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x, y, z + 1],
          [x, y + cornerH01, z + 1],
          [x, y + cornerH00, z],
          [x, y, z],
        ],
        [-1, 0, 0],
        [
          [sideRect.u0, sideRect.v1],
          [sideRect.u0, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH01)],
          [sideRect.u1, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH00)],
          [sideRect.u1, sideRect.v1],
        ],
      );
    }

    const plusZ = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y, z + 1);
    if (!isWaterBlock(plusZ) && !ChunkMesher.isOpaqueOccluder(plusZ)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x + 1, y, z + 1],
          [x + 1, y + cornerH11, z + 1],
          [x, y + cornerH01, z + 1],
          [x, y, z + 1],
        ],
        [0, 0, 1],
        [
          [sideRect.u0, sideRect.v1],
          [sideRect.u0, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH11)],
          [sideRect.u1, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH01)],
          [sideRect.u1, sideRect.v1],
        ],
      );
    }

    const minusZ = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y, z - 1);
    if (!isWaterBlock(minusZ) && !ChunkMesher.isOpaqueOccluder(minusZ)) {
      ChunkMesher.pushQuad(
        positions,
        normals,
        uvs,
        [
          [x, y, z],
          [x, y + cornerH00, z],
          [x + 1, y + cornerH10, z],
          [x + 1, y, z],
        ],
        [0, 0, -1],
        [
          [sideRect.u0, sideRect.v1],
          [sideRect.u0, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH00)],
          [sideRect.u1, ChunkMesher.mapSideV(sideRect.v0, sideRect.v1, cornerH10)],
          [sideRect.u1, sideRect.v1],
        ],
      );
    }
  }

  private static computeWaterCornerHeight(
    chunk: Chunk,
    world: World,
    originX: number,
    originZ: number,
    x: number,
    y: number,
    z: number,
    offsets: Array<[number, number]>,
    fallbackHeight: number,
  ): number {
    const samples = offsets.map(([offsetX, offsetZ]) =>
      ChunkMesher.sampleWaterHeight(
        chunk,
        world,
        originX,
        originZ,
        x + offsetX,
        y,
        z + offsetZ,
      ),
    );
    return propagateWaterCornerHeight(samples, fallbackHeight);
  }

  private static sampleWaterHeight(
    chunk: Chunk,
    world: World,
    originX: number,
    originZ: number,
    x: number,
    y: number,
    z: number,
  ): number | null {
    const blockId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y, z);
    if (!isWaterBlock(blockId)) {
      return null;
    }
    const aboveId = ChunkMesher.getBlockAt(chunk, world, originX, originZ, x, y + 1, z);
    return ChunkMesher.getRenderableWaterHeight(blockId, aboveId);
  }

  private static getRenderableWaterHeight(blockId: BlockId, aboveId: BlockId): number {
    if (isWaterBlock(aboveId)) {
      return 1;
    }
    const level = getWaterLevel(blockId);
    if (level === null) {
      return WATER_SURFACE_BASE_HEIGHT;
    }
    return waterLevelToSurfaceHeight(level);
  }

  private static mapSideV(vTop: number, vBottom: number, height: number): number {
    const clamped = Math.max(0, Math.min(1, height));
    return vBottom + (vTop - vBottom) * clamped;
  }

  private static isOpaqueOccluder(blockId: BlockId): boolean {
    return (
      isSolidBlock(blockId) &&
      !isPlantBlock(blockId) &&
      !isTransparentBlock(blockId)
    );
  }

  private static shouldRenderSharedLeafFace(
    normal: [number, number, number],
    isLeafBlock: boolean,
  ): boolean {
    if (!isLeafBlock) {
      return false;
    }
    return normal[0] > 0 || normal[1] > 0 || normal[2] > 0;
  }

  private static getBlockAt(
    chunk: Chunk,
    world: World,
    originX: number,
    originZ: number,
    x: number,
    y: number,
    z: number,
  ): BlockId {
    if (
      x >= 0 &&
      x < WORLD_CONFIG.chunkSizeX &&
      y >= 0 &&
      y < WORLD_CONFIG.chunkSizeY &&
      z >= 0 &&
      z < WORLD_CONFIG.chunkSizeZ
    ) {
      return chunk.getBlock(x, y, z);
    }

    return world.getBlock(originX + x, y, originZ + z);
  }

  private static pushQuad(
    positions: number[],
    normals: number[],
    uvs: number[],
    corners: Array<[number, number, number]>,
    normal: [number, number, number],
    quadUvs: Array<[number, number]>,
  ): void {
    const frontTriangles = [0, 1, 2, 0, 2, 3];
    for (const triangleIndex of frontTriangles) {
      const [cx, cy, cz] = corners[triangleIndex];
      positions.push(cx, cy, cz);
      normals.push(normal[0], normal[1], normal[2]);
      uvs.push(...quadUvs[triangleIndex]);
    }
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
        definition.textureBottom ?? definition.textureSide ?? 'dirt',
      );
    }
    return atlas.getTileRect(definition.textureSide ?? definition.textureTop ?? 'dirt');
  }
}
