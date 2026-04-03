import {
  BoxGeometry,
  Group,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
} from 'three';
import type { WeatherVisualState } from '../types/weather';
import { createDefaultWeatherVisualState } from '../world/Weather';

const RAIN_DROP_COUNT = 320;
const RAIN_FIELD_RADIUS = 24;
const RAIN_FIELD_INNER_RADIUS = 3.5;
const RAIN_TOP_OFFSET = 18;
const RAIN_FALL_DISTANCE = 34;
const RAIN_DROP_HEIGHT = 4.6;

interface RainAnchor {
  angle: number;
  radius: number;
  phase: number;
  speed: number;
  sway: number;
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, alpha: number): number => from + (to - from) * alpha;

export class RainField {
  readonly group = new Group();

  private readonly geometry = new BoxGeometry(0.08, RAIN_DROP_HEIGHT, 0.08);
  private readonly material = new MeshBasicMaterial({
    color: '#c5d7ea',
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: true,
    toneMapped: false,
  });
  private readonly mesh = new InstancedMesh(this.geometry, this.material, RAIN_DROP_COUNT);
  private readonly anchors: RainAnchor[] = [];
  private readonly dummy = new Object3D();
  private weather: WeatherVisualState = createDefaultWeatherVisualState();
  private elapsedMs = 0;

  constructor() {
    for (let index = 0; index < RAIN_DROP_COUNT; index += 1) {
      const ratio = (index + 0.5) / RAIN_DROP_COUNT;
      this.anchors.push({
        angle: ratio * Math.PI * 8 + index * 0.37,
        radius: lerp(RAIN_FIELD_INNER_RADIUS, RAIN_FIELD_RADIUS, Math.sqrt(ratio)),
        phase: (index * 0.61803398875) % 1,
        speed: 1 + (index % 9) * 0.06,
        sway: ((index % 7) - 3) * 0.22,
      });
    }

    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.group.add(this.mesh);
  }

  setWeatherState(state: WeatherVisualState): void {
    this.weather = state;
  }

  update(dt: number, cameraX: number, cameraY: number, cameraZ: number): void {
    this.elapsedMs += dt * 1000;
    this.group.position.set(cameraX, cameraY, cameraZ);

    const intensity = clamp01(this.weather.rainIntensity);
    if (intensity <= 0.01) {
      this.mesh.count = 0;
      this.mesh.visible = false;
      return;
    }

    const visibleCount = Math.max(1, Math.round(RAIN_DROP_COUNT * intensity));
    const windLean = lerp(0.06, 0.18, intensity);
    const windShift = lerp(0.4, 1.9, intensity);

    for (let index = 0; index < visibleCount; index += 1) {
      const anchor = this.anchors[index];
      if (!anchor) {
        continue;
      }

      const fallCycle = ((this.elapsedMs * 0.0011 * anchor.speed) + anchor.phase) % 1;
      const height = RAIN_TOP_OFFSET - fallCycle * RAIN_FALL_DISTANCE;
      const drift = (1 - fallCycle) * windShift;
      const radius = anchor.radius + Math.sin(this.elapsedMs * 0.00035 + anchor.phase * 8) * 0.45;
      const x = Math.cos(anchor.angle) * radius + drift + anchor.sway;
      const z = Math.sin(anchor.angle) * radius + drift * 0.35 - anchor.sway * 0.4;

      this.dummy.position.set(x, height, z);
      this.dummy.rotation.set(0.04, 0, -windLean);
      this.dummy.scale.set(1, lerp(0.85, 1.12, intensity), 1);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(index, this.dummy.matrix);
    }

    this.mesh.count = visibleCount;
    this.mesh.visible = true;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.material.opacity = lerp(0.14, 0.38, intensity);
  }
}
