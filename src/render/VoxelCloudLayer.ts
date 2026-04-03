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

const CLOUD_CELL_SIZE = 46;
const CLOUD_GRID_RADIUS = 5;
const CLOUD_VOXEL_SIZE = 8;
const CLOUD_VOXEL_HEIGHT = 4;
const CLOUD_ALTITUDE = WORLD_CONFIG.chunkSizeY - 10;
const CLOUD_COLUMNS = 5;
const CLOUD_ROWS = 5;
const CLOUD_LAYERS = 3;
const MAX_VOXELS_PER_CELL = CLOUD_COLUMNS * CLOUD_ROWS * CLOUD_LAYERS;
const CLOUD_FULL_RADIUS = CLOUD_CELL_SIZE * (CLOUD_GRID_RADIUS - 1.2);
const CLOUD_FADE_RADIUS = CLOUD_CELL_SIZE * (CLOUD_GRID_RADIUS + 0.45);

interface CloudVoxelRecord {
  x: number;
  y: number;
  z: number;
  threshold: number;
}

interface CloudCell {
  mesh: InstancedMesh;
  material: MeshLambertMaterial;
  cellX: number;
  cellZ: number;
  coverageThreshold: number;
  thresholds: number[];
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

export class VoxelCloudLayer {
  readonly group = new Group();

  private readonly geometry = new BoxGeometry(
    CLOUD_VOXEL_SIZE,
    CLOUD_VOXEL_HEIGHT,
    CLOUD_VOXEL_SIZE,
  );
  private readonly cells: CloudCell[] = [];
  private readonly dummy = new Object3D();
  private readonly targetColor = new Color('#ffffff');
  private readonly whiteColor = new Color('#ffffff');
  private readonly grayColor = new Color('#8d949c');
  private weather: WeatherVisualState = createDefaultWeatherVisualState();
  private currentCenterCellX = Number.NaN;
  private currentCenterCellZ = Number.NaN;

  constructor() {
    const gridDiameter = CLOUD_GRID_RADIUS * 2 + 1;
    const cellCount = gridDiameter * gridDiameter;

    for (let index = 0; index < cellCount; index += 1) {
      const material = new MeshLambertMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        flatShading: true,
      });
      const mesh = new InstancedMesh(this.geometry, material, MAX_VOXELS_PER_CELL);
      mesh.count = 0;
      mesh.frustumCulled = false;
      this.group.add(mesh);
      this.cells.push({
        mesh,
        material,
        cellX: Number.NaN,
        cellZ: Number.NaN,
        coverageThreshold: 1,
        thresholds: [],
      });
    }
  }

  setWeatherState(state: WeatherVisualState): void {
    this.weather = state;
  }

  update(cameraX: number, cameraY: number, cameraZ: number): void {
    const centerCellX = Math.floor((cameraX - this.weather.windOffsetX) / CLOUD_CELL_SIZE);
    const centerCellZ = Math.floor((cameraZ - this.weather.windOffsetZ) / CLOUD_CELL_SIZE);
    if (
      centerCellX !== this.currentCenterCellX ||
      centerCellZ !== this.currentCenterCellZ
    ) {
      this.rebuildGrid(centerCellX, centerCellZ);
      this.currentCenterCellX = centerCellX;
      this.currentCenterCellZ = centerCellZ;
    }

    this.group.position.set(cameraX, cameraY, cameraZ);
    this.targetColor.copy(this.whiteColor).lerp(this.grayColor, this.weather.cloudGrayness);

    for (const cell of this.cells) {
      this.updateCellVisual(cell, cameraX, cameraY, cameraZ);
    }
  }

  private rebuildGrid(centerCellX: number, centerCellZ: number): void {
    let cellIndex = 0;
    for (let offsetZ = -CLOUD_GRID_RADIUS; offsetZ <= CLOUD_GRID_RADIUS; offsetZ += 1) {
      for (let offsetX = -CLOUD_GRID_RADIUS; offsetX <= CLOUD_GRID_RADIUS; offsetX += 1) {
        const cell = this.cells[cellIndex];
        if (!cell) {
          continue;
        }
        this.populateCell(cell, centerCellX + offsetX, centerCellZ + offsetZ);
        cellIndex += 1;
      }
    }
  }

  private populateCell(cell: CloudCell, cellX: number, cellZ: number): void {
    const voxelRecords: CloudVoxelRecord[] = [];
    const centerOffsetX = (hash01(cellX, cellZ, 19) - 0.5) * 10;
    const centerOffsetZ = (hash01(cellX, cellZ, 23) - 0.5) * 10;
    const centerLayerLift = hash01(cellX, cellZ, 29) * 1.2;

    for (let layer = 0; layer < CLOUD_LAYERS; layer += 1) {
      for (let row = 0; row < CLOUD_ROWS; row += 1) {
        for (let column = 0; column < CLOUD_COLUMNS; column += 1) {
          const radialX = (column - (CLOUD_COLUMNS - 1) * 0.5) / 2.1;
          const radialZ = (row - (CLOUD_ROWS - 1) * 0.5) / 2.1;
          const radialDistance = Math.hypot(radialX, radialZ);
          const densityNoise = valueNoise2D(
            cellX * 0.8 + column * 0.31 + layer * 0.07,
            cellZ * 0.8 + row * 0.31 + layer * 0.11,
            41,
          );
          const erosionNoise = hash01(cellX * 13 + column * 7 + layer * 3, cellZ * 11 + row * 5, 53);
          const threshold = clamp01(
            0.08 +
              radialDistance * 0.29 +
              layer * 0.19 +
              erosionNoise * 0.23 -
              densityNoise * 0.18,
          );

          voxelRecords.push({
            x:
              (column - (CLOUD_COLUMNS - 1) * 0.5) * CLOUD_VOXEL_SIZE * 0.94 +
              centerOffsetX +
              (hash01(cellX * 5 + column, cellZ * 5 + row, 61) - 0.5) * 1.3,
            y: layer * CLOUD_VOXEL_HEIGHT * 0.92 + centerLayerLift,
            z:
              (row - (CLOUD_ROWS - 1) * 0.5) * CLOUD_VOXEL_SIZE * 0.94 +
              centerOffsetZ +
              (hash01(cellX * 7 + column, cellZ * 7 + row, 67) - 0.5) * 1.3,
            threshold,
          });
        }
      }
    }

    voxelRecords.sort((left, right) => left.threshold - right.threshold);
    cell.thresholds = voxelRecords.map((record) => record.threshold);
    cell.coverageThreshold = valueNoise2D(cellX * 0.42, cellZ * 0.42, 83);
    cell.cellX = cellX;
    cell.cellZ = cellZ;

    voxelRecords.forEach((record, index) => {
      this.dummy.position.set(record.x, record.y, record.z);
      this.dummy.scale.set(1, 1, 1);
      this.dummy.updateMatrix();
      cell.mesh.setMatrixAt(index, this.dummy.matrix);
    });
    cell.mesh.instanceMatrix.needsUpdate = true;
  }

  private updateCellVisual(
    cell: CloudCell,
    cameraX: number,
    cameraY: number,
    cameraZ: number,
  ): void {
    const meshCenterX = cell.cellX * CLOUD_CELL_SIZE + CLOUD_CELL_SIZE * 0.5 + this.weather.windOffsetX - cameraX;
    const meshCenterZ = cell.cellZ * CLOUD_CELL_SIZE + CLOUD_CELL_SIZE * 0.5 + this.weather.windOffsetZ - cameraZ;
    const distance = Math.hypot(meshCenterX, meshCenterZ);
    const edgeFade = 1 - smoothstep(CLOUD_FULL_RADIUS, CLOUD_FADE_RADIUS, distance);
    const coverageBlend = smoothstep(
      cell.coverageThreshold - 0.18,
      cell.coverageThreshold + 0.18,
      this.weather.cloudCoverage,
    );
    const fullness = clamp01(
      coverageBlend * 0.64 +
        this.weather.cloudDensity * 0.3 +
        this.weather.cloudThickness * 0.28 -
        this.weather.cloudSharpness * 0.11,
    );
    const visibleCount = this.countVisibleVoxels(cell.thresholds, fullness);
    if (edgeFade <= 0.01 || visibleCount <= 0) {
      cell.mesh.count = 0;
      cell.mesh.visible = false;
      return;
    }

    cell.mesh.visible = true;
    cell.mesh.count = visibleCount;
    cell.mesh.position.set(meshCenterX, CLOUD_ALTITUDE - cameraY, meshCenterZ);
    cell.material.color.copy(this.targetColor);
    cell.material.opacity =
      this.weather.cloudOpacity *
      edgeFade *
      lerp(0.34, 1, coverageBlend);
  }

  private countVisibleVoxels(thresholds: number[], fullness: number): number {
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
