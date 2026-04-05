import {
  BoxGeometry,
  Color,
  Group,
  InstancedMesh,
  MeshLambertMaterial,
  Object3D,
} from 'three';
import { WORLD_CONFIG } from '../game/Config';
import type { WeatherVisualState } from '../types/weather';
import { createDefaultWeatherVisualState } from '../world/Weather';

const CLOUD_PATCH_SIZE = 86;
const CLOUD_PATCH_RADIUS = 4;
const CLOUD_ALTITUDE = WORLD_CONFIG.chunkSizeY - 10;
const CLOUD_CLUSTER_SLOTS = 3;
const CLOUD_VOXEL_SIZE_XZ = 9;
const CLOUD_VOXEL_SIZE_Y = 4.6;
const CLOUD_VOXEL_STEP_XZ = 6.35;
const CLOUD_VOXEL_STEP_Y = 3.25;
const CLUSTER_GRID_COLUMNS = 10;
const CLUSTER_GRID_ROWS = 8;
const CLUSTER_GRID_LAYERS = 3;
const MAX_BOXES_PER_PATCH = 96;
const CLOUD_FULL_RADIUS = CLOUD_PATCH_SIZE * (CLOUD_PATCH_RADIUS - 0.6);
const CLOUD_FADE_RADIUS = CLOUD_PATCH_SIZE * (CLOUD_PATCH_RADIUS + 0.45);

interface CloudBoxRecord {
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  threshold: number;
}

interface CloudPatch {
  mesh: InstancedMesh;
  material: MeshLambertMaterial;
  patchX: number;
  patchZ: number;
  coverageThreshold: number;
  boxThresholds: number[];
}

interface ClusterLobe {
  x: number;
  y: number;
  z: number;
  radiusX: number;
  radiusY: number;
  radiusZ: number;
}

interface ClusterRect {
  x0: number;
  z0: number;
  width: number;
  depth: number;
  y0: number;
  height: number;
  threshold: number;
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, alpha: number): number => from + (to - from) * alpha;
const smoothstep = (edge0: number, edge1: number, value: number): number => {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }
  const ratio = clamp01((value - edge0) / (edge1 - edge0));
  return ratio * ratio * (3 - 2 * ratio);
};

const hash01 = (x: number, z: number, seed: number): number => {
  const value = Math.sin(x * 127.1 + z * 311.7 + seed * 74.7) * 43758.5453123;
  return value - Math.floor(value);
};

const valueNoise2D = (x: number, z: number, seed: number): number => {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const x1 = x0 + 1;
  const z1 = z0 + 1;
  const tx = x - x0;
  const tz = z - z0;
  const sx = tx * tx * (3 - 2 * tx);
  const sz = tz * tz * (3 - 2 * tz);

  const a = hash01(x0, z0, seed);
  const b = hash01(x1, z0, seed);
  const c = hash01(x0, z1, seed);
  const d = hash01(x1, z1, seed);
  const ab = lerp(a, b, sx);
  const cd = lerp(c, d, sx);
  return lerp(ab, cd, sz);
};

const toVoxelIndex = (column: number, row: number, layer: number): number =>
  layer * CLUSTER_GRID_COLUMNS * CLUSTER_GRID_ROWS + row * CLUSTER_GRID_COLUMNS + column;

export class VoxelCloudLayer {
  readonly group = new Group();

  private readonly geometry = new BoxGeometry(
    CLOUD_VOXEL_SIZE_XZ,
    CLOUD_VOXEL_SIZE_Y,
    CLOUD_VOXEL_SIZE_XZ,
  );
  private readonly patches: CloudPatch[] = [];
  private readonly dummy = new Object3D();
  private readonly targetColor = new Color('#ffffff');
  private readonly whiteColor = new Color('#ffffff');
  private readonly grayColor = new Color('#8d949c');
  private weather: WeatherVisualState = createDefaultWeatherVisualState();
  private currentCenterPatchX = Number.NaN;
  private currentCenterPatchZ = Number.NaN;

  constructor() {
    const patchDiameter = CLOUD_PATCH_RADIUS * 2 + 1;
    const patchCount = patchDiameter * patchDiameter;

    for (let index = 0; index < patchCount; index += 1) {
      const material = new MeshLambertMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        flatShading: true,
      });
      const mesh = new InstancedMesh(this.geometry, material, MAX_BOXES_PER_PATCH);
      mesh.count = 0;
      mesh.frustumCulled = false;
      mesh.renderOrder = 2;
      this.group.add(mesh);
      this.patches.push({
        mesh,
        material,
        patchX: Number.NaN,
        patchZ: Number.NaN,
        coverageThreshold: 1,
        boxThresholds: [],
      });
    }
  }

  setWeatherState(state: WeatherVisualState): void {
    this.weather = state;
  }

  update(cameraX: number, cameraY: number, cameraZ: number): void {
    const centerPatchX = Math.floor((cameraX - this.weather.windOffsetX) / CLOUD_PATCH_SIZE);
    const centerPatchZ = Math.floor((cameraZ - this.weather.windOffsetZ) / CLOUD_PATCH_SIZE);
    if (
      centerPatchX !== this.currentCenterPatchX ||
      centerPatchZ !== this.currentCenterPatchZ
    ) {
      this.rebuildGrid(centerPatchX, centerPatchZ);
      this.currentCenterPatchX = centerPatchX;
      this.currentCenterPatchZ = centerPatchZ;
    }

    this.group.position.set(cameraX, cameraY, cameraZ);
    this.targetColor.copy(this.whiteColor).lerp(this.grayColor, this.weather.cloudGrayness);

    for (const patch of this.patches) {
      this.updatePatchVisual(patch, cameraX, cameraY, cameraZ);
    }
  }

  private rebuildGrid(centerPatchX: number, centerPatchZ: number): void {
    let patchIndex = 0;
    for (let offsetZ = -CLOUD_PATCH_RADIUS; offsetZ <= CLOUD_PATCH_RADIUS; offsetZ += 1) {
      for (let offsetX = -CLOUD_PATCH_RADIUS; offsetX <= CLOUD_PATCH_RADIUS; offsetX += 1) {
        const patch = this.patches[patchIndex];
        if (!patch) {
          continue;
        }
        this.populatePatch(patch, centerPatchX + offsetX, centerPatchZ + offsetZ);
        patchIndex += 1;
      }
    }
  }

  private populatePatch(patch: CloudPatch, patchX: number, patchZ: number): void {
    const boxRecords: CloudBoxRecord[] = [];
    for (let slotIndex = 0; slotIndex < CLOUD_CLUSTER_SLOTS; slotIndex += 1) {
      boxRecords.push(...this.buildClusterBoxes(patchX, patchZ, slotIndex));
    }

    boxRecords.sort((left, right) => left.threshold - right.threshold);
    const limitedRecords = boxRecords.slice(0, MAX_BOXES_PER_PATCH);
    patch.boxThresholds = limitedRecords.map((record) => record.threshold);
    patch.coverageThreshold = clamp01(
      valueNoise2D(patchX * 0.19, patchZ * 0.19, 97) * 0.78 +
        hash01(patchX, patchZ, 101) * 0.22,
    );
    patch.patchX = patchX;
    patch.patchZ = patchZ;

    limitedRecords.forEach((record, index) => {
      this.dummy.position.set(record.x, record.y, record.z);
      this.dummy.scale.set(record.scaleX, record.scaleY, record.scaleZ);
      this.dummy.updateMatrix();
      patch.mesh.setMatrixAt(index, this.dummy.matrix);
    });
    patch.mesh.instanceMatrix.needsUpdate = true;
  }

  private buildClusterBoxes(patchX: number, patchZ: number, slotIndex: number): CloudBoxRecord[] {
    const slotSeedX = patchX * 37 + slotIndex * 11;
    const slotSeedZ = patchZ * 41 - slotIndex * 13;
    const clusterThreshold = clamp01(
      0.06 +
        valueNoise2D(patchX * 0.31 + slotIndex * 1.73, patchZ * 0.31 - slotIndex * 1.89, 131) *
          0.44 +
        hash01(slotSeedX, slotSeedZ, 139) * 0.12 +
        slotIndex * 0.08,
    );

    const clusterCenterX =
      (hash01(slotSeedX, slotSeedZ, 149) - 0.5) * CLOUD_PATCH_SIZE * 0.92;
    const clusterCenterZ =
      (hash01(slotSeedX, slotSeedZ, 151) - 0.5) * CLOUD_PATCH_SIZE * 0.92;
    const clusterBaseY =
      (hash01(slotSeedX, slotSeedZ, 157) - 0.35) * CLOUD_VOXEL_STEP_Y;
    const lobeCount = 2 + Math.floor(hash01(slotSeedX, slotSeedZ, 163) * 3);
    const lobes: ClusterLobe[] = [];

    for (let lobeIndex = 0; lobeIndex < lobeCount; lobeIndex += 1) {
      const lobeSeedX = slotSeedX + lobeIndex * 17;
      const lobeSeedZ = slotSeedZ - lobeIndex * 19;
      lobes.push({
        x: (hash01(lobeSeedX, lobeSeedZ, 173) - 0.5) * 26,
        y: (hash01(lobeSeedX, lobeSeedZ, 179) - 0.4) * 5.2,
        z: (hash01(lobeSeedX, lobeSeedZ, 181) - 0.5) * 24,
        radiusX: lerp(16, 31, hash01(lobeSeedX, lobeSeedZ, 191)),
        radiusY: lerp(4.8, 9.4, hash01(lobeSeedX, lobeSeedZ, 193)),
        radiusZ: lerp(14, 28, hash01(lobeSeedX, lobeSeedZ, 197)),
      });
    }

    const occupied = new Array<boolean>(CLUSTER_GRID_COLUMNS * CLUSTER_GRID_ROWS * CLUSTER_GRID_LAYERS).fill(false);
    const thresholds = new Array<number>(occupied.length).fill(1);

    const halfColumns = (CLUSTER_GRID_COLUMNS - 1) * 0.5;
    const halfRows = (CLUSTER_GRID_ROWS - 1) * 0.5;

    for (let layer = 0; layer < CLUSTER_GRID_LAYERS; layer += 1) {
      for (let row = 0; row < CLUSTER_GRID_ROWS; row += 1) {
        for (let column = 0; column < CLUSTER_GRID_COLUMNS; column += 1) {
          const localX = (column - halfColumns) * CLOUD_VOXEL_STEP_XZ;
          const localY = layer * CLOUD_VOXEL_STEP_Y;
          const localZ = (row - halfRows) * CLOUD_VOXEL_STEP_XZ;
          const voxelIndex = toVoxelIndex(column, row, layer);

          let influence = -Infinity;
          for (const lobe of lobes) {
            const dx = (localX - lobe.x) / lobe.radiusX;
            const dy = (localY - lobe.y) / lobe.radiusY;
            const dz = (localZ - lobe.z) / lobe.radiusZ;
            const distance = dx * dx + dy * dy * 1.12 + dz * dz;
            influence = Math.max(influence, 1 - distance);
          }

          const ridgeNoise = valueNoise2D(
            patchX * 0.83 + column * 0.41 + slotIndex * 0.37,
            patchZ * 0.83 + row * 0.41 + layer * 0.23,
            211,
          );
          const erosionNoise = hash01(slotSeedX * 3 + column * 7 + layer * 5, slotSeedZ * 3 + row * 11, 223);
          const shapeScore =
            influence +
            (ridgeNoise - 0.5) * 0.3 -
            erosionNoise * 0.1;

          if (shapeScore <= 0.07) {
            continue;
          }

          occupied[voxelIndex] = true;
          thresholds[voxelIndex] = clamp01(
            clusterThreshold +
              (1 - clamp01(shapeScore)) * 0.42 +
              erosionNoise * 0.08 +
              layer * 0.04,
          );
        }
      }
    }

    this.smoothCluster(occupied, thresholds);
    return this.mergeClusterBoxes(
      occupied,
      thresholds,
      clusterCenterX,
      clusterBaseY,
      clusterCenterZ,
    );
  }

  private smoothCluster(occupied: boolean[], thresholds: number[]): void {
    const nextOccupied = occupied.slice();
    const nextThresholds = thresholds.slice();

    for (let layer = 0; layer < CLUSTER_GRID_LAYERS; layer += 1) {
      for (let row = 0; row < CLUSTER_GRID_ROWS; row += 1) {
        for (let column = 0; column < CLUSTER_GRID_COLUMNS; column += 1) {
          const voxelIndex = toVoxelIndex(column, row, layer);
          let neighborCount = 0;
          let neighborThresholdSum = 0;

          for (let dz = -1; dz <= 1; dz += 1) {
            for (let dx = -1; dx <= 1; dx += 1) {
              if (dx === 0 && dz === 0) {
                continue;
              }
              const neighborColumn = column + dx;
              const neighborRow = row + dz;
              if (
                neighborColumn < 0 ||
                neighborColumn >= CLUSTER_GRID_COLUMNS ||
                neighborRow < 0 ||
                neighborRow >= CLUSTER_GRID_ROWS
              ) {
                continue;
              }
              const neighborIndex = toVoxelIndex(neighborColumn, neighborRow, layer);
              if (!occupied[neighborIndex]) {
                continue;
              }
              neighborCount += 1;
              neighborThresholdSum += thresholds[neighborIndex];
            }
          }

          for (const verticalOffset of [-1, 1] as const) {
            const neighborLayer = layer + verticalOffset;
            if (neighborLayer < 0 || neighborLayer >= CLUSTER_GRID_LAYERS) {
              continue;
            }
            const neighborIndex = toVoxelIndex(column, row, neighborLayer);
            if (!occupied[neighborIndex]) {
              continue;
            }
            neighborCount += 1;
            neighborThresholdSum += thresholds[neighborIndex];
          }

          if (occupied[voxelIndex]) {
            if (neighborCount <= 1 && thresholds[voxelIndex] > 0.54) {
              nextOccupied[voxelIndex] = false;
              nextThresholds[voxelIndex] = 1;
            }
            continue;
          }

          if (neighborCount >= 5) {
            nextOccupied[voxelIndex] = true;
            nextThresholds[voxelIndex] = clamp01(
              neighborThresholdSum / Math.max(1, neighborCount) + 0.03,
            );
          }
        }
      }
    }

    for (let index = 0; index < occupied.length; index += 1) {
      occupied[index] = nextOccupied[index];
      thresholds[index] = nextThresholds[index];
    }
  }

  private mergeClusterBoxes(
    occupied: boolean[],
    thresholds: number[],
    clusterCenterX: number,
    clusterBaseY: number,
    clusterCenterZ: number,
  ): CloudBoxRecord[] {
    const rectangles: ClusterRect[] = [];
    let activeRectangles = new Map<string, ClusterRect>();

    const halfColumns = (CLUSTER_GRID_COLUMNS - 1) * 0.5;
    const halfRows = (CLUSTER_GRID_ROWS - 1) * 0.5;

    for (let layer = 0; layer < CLUSTER_GRID_LAYERS; layer += 1) {
      const visited = new Array<boolean>(CLUSTER_GRID_COLUMNS * CLUSTER_GRID_ROWS).fill(false);
      const layerRectangles: ClusterRect[] = [];

      for (let row = 0; row < CLUSTER_GRID_ROWS; row += 1) {
        for (let column = 0; column < CLUSTER_GRID_COLUMNS; column += 1) {
          const localIndex = row * CLUSTER_GRID_COLUMNS + column;
          if (visited[localIndex]) {
            continue;
          }

          const voxelIndex = toVoxelIndex(column, row, layer);
          if (!occupied[voxelIndex]) {
            continue;
          }

          let width = 1;
          while (column + width < CLUSTER_GRID_COLUMNS) {
            const candidateIndex = row * CLUSTER_GRID_COLUMNS + column + width;
            if (visited[candidateIndex] || !occupied[toVoxelIndex(column + width, row, layer)]) {
              break;
            }
            width += 1;
          }

          let depth = 1;
          let maxThreshold = thresholds[voxelIndex];
          let extending = true;
          while (extending && row + depth < CLUSTER_GRID_ROWS) {
            for (let offsetX = 0; offsetX < width; offsetX += 1) {
              const neighborColumn = column + offsetX;
              const candidateIndex = (row + depth) * CLUSTER_GRID_COLUMNS + neighborColumn;
              const candidateVoxelIndex = toVoxelIndex(neighborColumn, row + depth, layer);
              if (visited[candidateIndex] || !occupied[candidateVoxelIndex]) {
                extending = false;
                break;
              }
            }
            if (!extending) {
              break;
            }
            depth += 1;
          }

          for (let depthOffset = 0; depthOffset < depth; depthOffset += 1) {
            for (let widthOffset = 0; widthOffset < width; widthOffset += 1) {
              const visitedIndex =
                (row + depthOffset) * CLUSTER_GRID_COLUMNS + column + widthOffset;
              visited[visitedIndex] = true;
              maxThreshold = Math.max(
                maxThreshold,
                thresholds[toVoxelIndex(column + widthOffset, row + depthOffset, layer)],
              );
            }
          }

          layerRectangles.push({
            x0: column,
            z0: row,
            width,
            depth,
            y0: layer,
            height: 1,
            threshold: maxThreshold,
          });
        }
      }

      const nextActiveRectangles = new Map<string, ClusterRect>();
      for (const rectangle of layerRectangles) {
        const key = `${rectangle.x0}:${rectangle.z0}:${rectangle.width}:${rectangle.depth}`;
        const previous = activeRectangles.get(key);
        if (previous) {
          previous.height += 1;
          previous.threshold = Math.max(previous.threshold, rectangle.threshold);
          nextActiveRectangles.set(key, previous);
          continue;
        }
        rectangles.push(rectangle);
        nextActiveRectangles.set(key, rectangle);
      }
      activeRectangles = nextActiveRectangles;
    }

    return rectangles.map((rectangle) => {
      const centerColumn = rectangle.x0 + (rectangle.width - 1) * 0.5;
      const centerRow = rectangle.z0 + (rectangle.depth - 1) * 0.5;
      const centerLayer = rectangle.y0 + (rectangle.height - 1) * 0.5;

      return {
        x: clusterCenterX + (centerColumn - halfColumns) * CLOUD_VOXEL_STEP_XZ,
        y: clusterBaseY + centerLayer * CLOUD_VOXEL_STEP_Y,
        z: clusterCenterZ + (centerRow - halfRows) * CLOUD_VOXEL_STEP_XZ,
        scaleX:
          (CLOUD_VOXEL_SIZE_XZ + (rectangle.width - 1) * CLOUD_VOXEL_STEP_XZ + 1.1) /
          CLOUD_VOXEL_SIZE_XZ,
        scaleY:
          (CLOUD_VOXEL_SIZE_Y + (rectangle.height - 1) * CLOUD_VOXEL_STEP_Y + 0.55) /
          CLOUD_VOXEL_SIZE_Y,
        scaleZ:
          (CLOUD_VOXEL_SIZE_XZ + (rectangle.depth - 1) * CLOUD_VOXEL_STEP_XZ + 1.1) /
          CLOUD_VOXEL_SIZE_XZ,
        threshold: rectangle.threshold,
      };
    });
  }

  private updatePatchVisual(
    patch: CloudPatch,
    cameraX: number,
    cameraY: number,
    cameraZ: number,
  ): void {
    const patchCenterX =
      patch.patchX * CLOUD_PATCH_SIZE + CLOUD_PATCH_SIZE * 0.5 + this.weather.windOffsetX - cameraX;
    const patchCenterZ =
      patch.patchZ * CLOUD_PATCH_SIZE + CLOUD_PATCH_SIZE * 0.5 + this.weather.windOffsetZ - cameraZ;
    const distance = Math.hypot(patchCenterX, patchCenterZ);
    const edgeFade = 1 - smoothstep(CLOUD_FULL_RADIUS, CLOUD_FADE_RADIUS, distance);
    const coverageBlend = smoothstep(
      patch.coverageThreshold - 0.18,
      patch.coverageThreshold + 0.16,
      this.weather.cloudCoverage,
    );
    const fullness = clamp01(
      coverageBlend * 0.72 +
        this.weather.cloudDensity * 0.24 +
        this.weather.cloudThickness * 0.18 -
        this.weather.cloudSharpness * 0.08,
    );
    const visibleCount = this.countVisibleBoxes(patch.boxThresholds, fullness);
    if (edgeFade <= 0.01 || visibleCount <= 0) {
      patch.mesh.count = 0;
      patch.mesh.visible = false;
      return;
    }

    patch.mesh.visible = true;
    patch.mesh.count = visibleCount;
    patch.mesh.position.set(patchCenterX, CLOUD_ALTITUDE - cameraY, patchCenterZ);
    patch.material.color.copy(this.targetColor);
    patch.material.opacity =
      this.weather.cloudOpacity *
      edgeFade *
      lerp(0.46, 1, coverageBlend);
  }

  private countVisibleBoxes(thresholds: number[], fullness: number): number {
    let visibleCount = 0;
    for (const threshold of thresholds) {
      if (threshold > fullness) {
        break;
      }
      visibleCount += 1;
    }
    return visibleCount;
  }
}
