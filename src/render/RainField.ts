import {
  Box3,
  BufferAttribute,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  Frustum,
  Group,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Matrix4,
  Mesh,
  NearestFilter,
  RepeatWrapping,
  ShaderMaterial,
  Texture,
  TextureLoader,
  UniformsLib,
  UniformsUtils,
  type PerspectiveCamera,
} from 'three';
import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { WeatherVisualState } from '../types/weather';
import { isSolidBlock, isWaterBlock } from '../world/BlockRegistry';
import type { Chunk } from '../world/Chunk';
import { chunkOriginX, chunkOriginZ, toChunkKey, worldToChunkCoord } from '../world/ChunkCoord';
import { createDefaultWeatherVisualState } from '../world/Weather';
import type { World } from '../world/World';

const WEATHER_TEXTURE_LOADER = new TextureLoader();
const RAIN_TEXTURE_URL = new URL('../../assets/textures/environment/rain.png', import.meta.url).href;

const RAIN_GRID_SIZE = 32;
const RAIN_GRID_CENTER = RAIN_GRID_SIZE / 2;
const RAIN_DIRECTION_X = new Float32Array(RAIN_GRID_SIZE * RAIN_GRID_SIZE);
const RAIN_DIRECTION_Z = new Float32Array(RAIN_GRID_SIZE * RAIN_GRID_SIZE);

const RAIN_MIN_RENDER_RADIUS = 3;
const RAIN_MAX_RENDER_RADIUS = 8;
const RAIN_VERTICAL_RANGE = 8;
const RAIN_COLUMN_HALF_WIDTH = 0.38;
const RAIN_UV_SCALE_PER_BLOCK = 0.25;
const RAIN_SCROLL_SPEED_BASE = (1 / 0.05 / 32) * 3;
const RAIN_SCROLL_SPEED_RANGE = 1 / 0.05 / 32;
const RAIN_BASE_OPACITY_MIN = 0.56;
const RAIN_BASE_OPACITY_MAX = 0.94;
const RAIN_MAX_INSTANCES =
  (RAIN_MAX_RENDER_RADIUS * 2 + 1) * (RAIN_MAX_RENDER_RADIUS * 2 + 1);
const SPLASH_MAX_VARIANTS_PER_COLUMN = 4;
const SPLASH_MAX_INSTANCES = RAIN_MAX_INSTANCES * SPLASH_MAX_VARIANTS_PER_COLUMN;
const SPLASH_BASE_SIZE = 0.11;
const SPLASH_SPREAD = 0.8;
const SPLASH_HEIGHT_OFFSET = 0.035;
const SPLASH_OPACITY_MIN = 0.16;
const SPLASH_OPACITY_MAX = 0.34;
const SPLASH_COLOR = new Color(44 / 255, 95 / 255, 111 / 255);
const SPLASH_MIN_RENDER_RADIUS = 2;
const SPLASH_MAX_RENDER_RADIUS = 5;
const CACHE_PRUNE_INTERVAL_FRAMES = 60;
const CACHE_MAX_AGE_FRAMES = 180;

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, alpha: number): number => from + (to - from) * alpha;

const rainColumnBox = new Box3();

for (let gridZ = 0; gridZ < RAIN_GRID_SIZE; gridZ += 1) {
  for (let gridX = 0; gridX < RAIN_GRID_SIZE; gridX += 1) {
    const offsetX = gridX - RAIN_GRID_CENTER;
    const offsetZ = gridZ - RAIN_GRID_CENTER;
    const length = Math.hypot(offsetX, offsetZ);
    const index = (gridZ << 5) | gridX;
    if (length <= 0.0001) {
      RAIN_DIRECTION_X[index] = 0;
      RAIN_DIRECTION_Z[index] = RAIN_COLUMN_HALF_WIDTH;
      continue;
    }
    RAIN_DIRECTION_X[index] = (-offsetZ / length) * RAIN_COLUMN_HALF_WIDTH;
    RAIN_DIRECTION_Z[index] = (offsetX / length) * RAIN_COLUMN_HALF_WIDTH;
  }
}

export interface StableRainColumnVariation {
  readonly scrollOffset: number;
  readonly scrollSpeed: number;
  readonly alphaJitter: number;
  readonly splashSeed: number;
}

export interface RainChunkColumn {
  readonly worldX: number;
  readonly worldZ: number;
  readonly blockingY: number;
  readonly variation: StableRainColumnVariation;
}

export interface RainChunkCache {
  readonly revision: number;
  readonly columns: RainChunkColumn[];
  lastSeenFrame: number;
}

const hash32 = (value: number): number => {
  let hashed = value | 0;
  hashed = Math.imul(hashed ^ (hashed >>> 16), 0x7feb352d);
  hashed = Math.imul(hashed ^ (hashed >>> 15), 0x846ca68b);
  return hashed ^ (hashed >>> 16);
};

const hash2D = (x: number, z: number): number => hash32(Math.imul(x, 0x45d9f3b) ^ Math.imul(z, 0x119de1f3));

const toUnitFloat = (hash: number, shift: number): number => ((hash >>> shift) & 0xff) / 255;
const toLocalCoord = (value: number): number =>
  ((value % WORLD_CONFIG.chunkSizeX) + WORLD_CONFIG.chunkSizeX) % WORLD_CONFIG.chunkSizeX;

const isPrecipitationBlockingBlock = (blockId: BlockId): boolean =>
  blockId !== 0 && (isSolidBlock(blockId) || isWaterBlock(blockId));

const createRainTexture = (): Texture => {
  const texture = WEATHER_TEXTURE_LOADER.load(RAIN_TEXTURE_URL);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.generateMipmaps = false;
  return texture;
};

const createVerticalQuadGeometry = (): InstancedBufferGeometry => {
  const geometry = new InstancedBufferGeometry();
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.setAttribute(
    'position',
    new BufferAttribute(
      new Float32Array([
        -1, 0, 0,
         1, 0, 0,
         1, 1, 0,
        -1, 1, 0,
      ]),
      3,
    ),
  );
  geometry.setAttribute(
    'uv',
    new BufferAttribute(
      new Float32Array([
        0, 0,
        1, 0,
        1, 1,
        0, 1,
      ]),
      2,
    ),
  );
  geometry.instanceCount = 0;
  return geometry;
};

const createSplashGeometry = (): InstancedBufferGeometry => {
  const geometry = new InstancedBufferGeometry();
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.setAttribute(
    'position',
    new BufferAttribute(
      new Float32Array([
        -1, 0, -1,
         1, 0, -1,
         1, 0,  1,
        -1, 0,  1,
      ]),
      3,
    ),
  );
  geometry.setAttribute(
    'uv',
    new BufferAttribute(
      new Float32Array([
        0, 0,
        1, 0,
        1, 1,
        0, 1,
      ]),
      2,
    ),
  );
  geometry.instanceCount = 0;
  return geometry;
};

const createRainMaterial = (texture: Texture): ShaderMaterial =>
  new ShaderMaterial({
    uniforms: UniformsUtils.merge([
      UniformsLib.fog,
      {
        uMap: { value: texture },
        uOpacity: { value: 0 },
      },
    ]),
    transparent: true,
    depthWrite: false,
    fog: true,
    side: DoubleSide,
    toneMapped: false,
    vertexShader: `
      uniform float uOpacity;

      attribute vec3 instanceCenter;
      attribute vec2 instanceWidthDir;
      attribute float instanceHeight;
      attribute float instanceVScale;
      attribute float instanceVOffset;
      attribute float instanceAlpha;

      varying vec2 vRainUv;
      varying float vRainAlpha;

      #include <fog_pars_vertex>

      void main() {
        vec3 transformed = vec3(
          instanceCenter.x + position.x * instanceWidthDir.x,
          instanceCenter.y + position.y * instanceHeight,
          instanceCenter.z + position.x * instanceWidthDir.y
        );

        vRainUv = vec2(uv.x, uv.y * instanceVScale + instanceVOffset);
        vRainAlpha = instanceAlpha * uOpacity;

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        #include <fog_vertex>
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;

      varying vec2 vRainUv;
      varying float vRainAlpha;

      #include <fog_pars_fragment>

      void main() {
        vec4 texel = texture2D(uMap, vRainUv);
        float alpha = texel.a * vRainAlpha;
        if (alpha <= 0.01) {
          discard;
        }

        gl_FragColor = vec4(texel.rgb, alpha);

        #include <fog_fragment>
      }
    `,
  });

const createSplashMaterial = (): ShaderMaterial =>
  new ShaderMaterial({
    uniforms: UniformsUtils.merge([
      UniformsLib.fog,
      {
        uOpacity: { value: 0 },
        uColor: { value: SPLASH_COLOR.clone() },
        uTime: { value: 0 },
      },
    ]),
    transparent: true,
    depthWrite: false,
    fog: true,
    side: DoubleSide,
    toneMapped: false,
    vertexShader: `
      attribute vec3 instanceCenter;
      attribute float instanceSize;
      attribute float instanceAlpha;

      varying vec2 vSplashUv;
      varying float vSplashAlpha;
      varying float vSplashPhase;

      #include <fog_pars_vertex>

      void main() {
        vec3 transformed = vec3(
          instanceCenter.x + position.x * instanceSize,
          instanceCenter.y,
          instanceCenter.z + position.z * instanceSize
        );

        vSplashUv = uv;
        vSplashAlpha = instanceAlpha;
        vSplashPhase =
          fract(sin(dot(instanceCenter.xz, vec2(12.9898, 78.233))) * 43758.5453);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        #include <fog_vertex>
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uColor;
      uniform float uTime;

      varying vec2 vSplashUv;
      varying float vSplashAlpha;
      varying float vSplashPhase;

      #include <fog_pars_fragment>

      void main() {
        vec2 centered = vSplashUv - 0.5;
        float radius = length(centered);
        float cycle = fract(uTime * 2.35 + vSplashPhase);
        float ringRadius = mix(0.08, 0.4, cycle);
        float ringWidth = mix(0.16, 0.025, cycle);
        float ring = smoothstep(ringWidth, 0.0, abs(radius - ringRadius));
        float core = smoothstep(0.18, 0.0, radius) * (1.0 - cycle);
        float fade = 1.0 - cycle * 0.82;
        float alpha = (ring * 0.9 + core * 0.42) * fade * vSplashAlpha * uOpacity;

        if (alpha <= 0.01) {
          discard;
        }

        gl_FragColor = vec4(uColor, alpha);

        #include <fog_fragment>
      }
    `,
  });

const setDynamicUsage = (attribute: InstancedBufferAttribute): InstancedBufferAttribute => {
  attribute.setUsage(DynamicDrawUsage);
  return attribute;
};

export const buildStableRainColumnVariation = (worldX: number, worldZ: number): StableRainColumnVariation => {
  const hash = hash2D(worldX, worldZ);
  return {
    scrollOffset: toUnitFloat(hash, 0),
    scrollSpeed: RAIN_SCROLL_SPEED_BASE + toUnitFloat(hash, 8) * RAIN_SCROLL_SPEED_RANGE,
    alphaJitter: lerp(0.88, 1.08, toUnitFloat(hash, 16)),
    splashSeed: hash32(hash ^ 0x5f3759df) ^ Math.floor(toUnitFloat(hash, 24) * 65535),
  };
};

export const getOrRefreshRainChunkCache = (
  existing: RainChunkCache | null | undefined,
  revision: number,
  rebuild: () => RainChunkCache,
): RainChunkCache => {
  if (existing && existing.revision === revision) {
    return existing;
  }
  return rebuild();
};

export const buildRainChunkCache = (chunk: Chunk, _world: World): RainChunkCache => {
  const columns: RainChunkColumn[] = [];
  const originX = chunkOriginX(chunk.coord);
  const originZ = chunkOriginZ(chunk.coord);

  for (let localZ = 0; localZ < WORLD_CONFIG.chunkSizeZ; localZ += 1) {
    for (let localX = 0; localX < WORLD_CONFIG.chunkSizeX; localX += 1) {
      let blockingY = -1;
      for (let worldY = WORLD_CONFIG.chunkSizeY - 1; worldY >= 0; worldY -= 1) {
        const blockId = chunk.getBlock(localX, worldY, localZ);
        if (!isPrecipitationBlockingBlock(blockId)) {
          continue;
        }
        blockingY = worldY;
        break;
      }

      const worldX = originX + localX;
      const worldZ = originZ + localZ;
      columns.push({
        worldX,
        worldZ,
        blockingY,
        variation: buildStableRainColumnVariation(worldX, worldZ),
      });
    }
  }

  return {
    revision: chunk.revision,
    columns,
    lastSeenFrame: 0,
  };
};

export const shouldRenderRainColumn = (
  frustum: Frustum,
  cameraX: number,
  cameraZ: number,
  worldX: number,
  worldZ: number,
  columnHalfExtent: number,
  radius: number,
): boolean => {
  const centerX = worldX + 0.5;
  const centerZ = worldZ + 0.5;
  const deltaX = centerX - cameraX;
  const deltaZ = centerZ - cameraZ;
  const maxDistance = radius + columnHalfExtent;

  if (deltaX * deltaX + deltaZ * deltaZ > maxDistance * maxDistance) {
    return false;
  }

  rainColumnBox.min.set(centerX - columnHalfExtent, 0, centerZ - columnHalfExtent);
  rainColumnBox.max.set(centerX + columnHalfExtent, WORLD_CONFIG.chunkSizeY, centerZ + columnHalfExtent);
  return frustum.intersectsBox(rainColumnBox);
};

export class RainField {
  readonly group = new Group();

  private readonly rainGeometry = createVerticalQuadGeometry();
  private readonly splashGeometry = createSplashGeometry();
  private readonly rainMaterial = createRainMaterial(createRainTexture());
  private readonly splashMaterial = createSplashMaterial();
  private readonly rainMesh = new Mesh(this.rainGeometry, this.rainMaterial);
  private readonly splashMesh = new Mesh(this.splashGeometry, this.splashMaterial);
  private readonly rainCenters = new Float32Array(RAIN_MAX_INSTANCES * 3);
  private readonly rainWidthDirs = new Float32Array(RAIN_MAX_INSTANCES * 2);
  private readonly rainHeights = new Float32Array(RAIN_MAX_INSTANCES);
  private readonly rainVScales = new Float32Array(RAIN_MAX_INSTANCES);
  private readonly rainVOffsets = new Float32Array(RAIN_MAX_INSTANCES);
  private readonly rainAlphas = new Float32Array(RAIN_MAX_INSTANCES);
  private readonly splashCenters = new Float32Array(SPLASH_MAX_INSTANCES * 3);
  private readonly splashSizes = new Float32Array(SPLASH_MAX_INSTANCES);
  private readonly splashAlphas = new Float32Array(SPLASH_MAX_INSTANCES);
  private readonly frustum = new Frustum();
  private readonly frustumMatrix = new Matrix4();
  private readonly chunkCaches = new Map<string, RainChunkCache>();
  private weather: WeatherVisualState = createDefaultWeatherVisualState();
  private elapsedSeconds = 0;
  private frameId = 0;

  constructor() {
    this.group.visible = false;
    this.group.matrixAutoUpdate = false;
    this.group.updateMatrix();
    this.rainGeometry.setAttribute(
      'instanceCenter',
      setDynamicUsage(new InstancedBufferAttribute(this.rainCenters, 3)),
    );
    this.rainGeometry.setAttribute(
      'instanceWidthDir',
      setDynamicUsage(new InstancedBufferAttribute(this.rainWidthDirs, 2)),
    );
    this.rainGeometry.setAttribute(
      'instanceHeight',
      setDynamicUsage(new InstancedBufferAttribute(this.rainHeights, 1)),
    );
    this.rainGeometry.setAttribute(
      'instanceVScale',
      setDynamicUsage(new InstancedBufferAttribute(this.rainVScales, 1)),
    );
    this.rainGeometry.setAttribute(
      'instanceVOffset',
      setDynamicUsage(new InstancedBufferAttribute(this.rainVOffsets, 1)),
    );
    this.rainGeometry.setAttribute(
      'instanceAlpha',
      setDynamicUsage(new InstancedBufferAttribute(this.rainAlphas, 1)),
    );

    this.splashGeometry.setAttribute(
      'instanceCenter',
      setDynamicUsage(new InstancedBufferAttribute(this.splashCenters, 3)),
    );
    this.splashGeometry.setAttribute(
      'instanceSize',
      setDynamicUsage(new InstancedBufferAttribute(this.splashSizes, 1)),
    );
    this.splashGeometry.setAttribute(
      'instanceAlpha',
      setDynamicUsage(new InstancedBufferAttribute(this.splashAlphas, 1)),
    );

    this.rainMesh.frustumCulled = false;
    this.rainMesh.matrixAutoUpdate = false;
    this.rainMesh.updateMatrix();
    this.rainMesh.renderOrder = 4;
    this.rainMesh.visible = false;
    this.splashMesh.frustumCulled = false;
    this.splashMesh.matrixAutoUpdate = false;
    this.splashMesh.updateMatrix();
    this.splashMesh.renderOrder = 5;
    this.splashMesh.visible = false;
    this.group.add(this.rainMesh, this.splashMesh);
  }

  setWeatherState(state: WeatherVisualState): void {
    this.weather = state;
  }

  update(dtSeconds: number, camera: PerspectiveCamera, world: World): void {
    this.elapsedSeconds += Math.max(0, dtSeconds);
    this.frameId += 1;

    const intensity = clamp01(this.weather.rainIntensity);
    if (intensity <= 0.01) {
      this.clearVisibleRain();
      return;
    }
    this.group.visible = true;

    camera.updateMatrixWorld();
    this.frustumMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.frustumMatrix);

    const cameraX = camera.position.x;
    const cameraY = camera.position.y;
    const cameraZ = camera.position.z;
    const cameraBlockX = Math.floor(cameraX);
    const cameraBlockY = Math.floor(cameraY);
    const cameraBlockZ = Math.floor(cameraZ);
    const renderRadius = Math.round(lerp(RAIN_MIN_RENDER_RADIUS, RAIN_MAX_RENDER_RADIUS, intensity));
    const renderRadiusSq = (renderRadius + 0.5) * (renderRadius + 0.5);
    const splashRenderRadius = Math.min(
      renderRadius,
      Math.round(lerp(SPLASH_MIN_RENDER_RADIUS, SPLASH_MAX_RENDER_RADIUS, intensity)),
    );
    const splashRenderRadiusSq = (splashRenderRadius + 0.5) * (splashRenderRadius + 0.5);
    const splashVariantsPerColumn = Math.max(
      1,
      Math.round(lerp(1, SPLASH_MAX_VARIANTS_PER_COLUMN, intensity)),
    );

    let rainCount = 0;
    let splashCount = 0;
    let activeChunkKey = '';
    let activeCache: RainChunkCache | null = null;

    for (let offsetZ = -renderRadius; offsetZ <= renderRadius; offsetZ += 1) {
      for (let offsetX = -renderRadius; offsetX <= renderRadius; offsetX += 1) {
        const distanceSq = offsetX * offsetX + offsetZ * offsetZ;
        if (distanceSq > renderRadiusSq) {
          continue;
        }

        const worldX = cameraBlockX + offsetX;
        const worldZ = cameraBlockZ + offsetZ;
        if (
          !shouldRenderRainColumn(
            this.frustum,
            cameraX,
            cameraZ,
            worldX,
            worldZ,
            RAIN_COLUMN_HALF_WIDTH,
            renderRadius,
          )
        ) {
          continue;
        }

        const chunkCoord = worldToChunkCoord(worldX, worldZ);
        const chunkKey = toChunkKey(chunkCoord);
        if (chunkKey !== activeChunkKey) {
          activeChunkKey = chunkKey;
          const chunk = world.getChunkByKey(chunkKey);
          if (!chunk) {
            activeCache = null;
            continue;
          }

          activeCache = getOrRefreshRainChunkCache(
            this.chunkCaches.get(chunkKey),
            chunk.revision,
            () => buildRainChunkCache(chunk, world),
          );
          activeCache.lastSeenFrame = this.frameId;
          this.chunkCaches.set(chunkKey, activeCache);
        }
        if (!activeCache) {
          continue;
        }

        const localX = toLocalCoord(worldX);
        const localZ = toLocalCoord(worldZ);
        const column = activeCache.columns[localX + localZ * WORLD_CONFIG.chunkSizeX];
        if (!column) {
          continue;
        }

        const precipitationY = Math.max(0, column.blockingY + 1);
        const visibleBottom = Math.max(cameraBlockY - RAIN_VERTICAL_RANGE, precipitationY);
        const visibleTop = Math.max(cameraBlockY + RAIN_VERTICAL_RANGE, precipitationY);
        const rainHeight = visibleTop - visibleBottom;

        if (rainHeight <= 0) {
          continue;
        }

        const directionIndex = ((offsetZ + RAIN_GRID_CENTER) << 5) | (offsetX + RAIN_GRID_CENTER);
        const rainWidthX = RAIN_DIRECTION_X[directionIndex] ?? 0;
        const rainWidthZ = RAIN_DIRECTION_Z[directionIndex] ?? RAIN_COLUMN_HALF_WIDTH;
        const distanceAlpha = (1 - clamp01(distanceSq / renderRadiusSq)) * 0.45 + 0.55;
        const rainAlpha = intensity * distanceAlpha * column.variation.alphaJitter;

        if (rainAlpha <= 0.015) {
          continue;
        }

        if (rainCount < RAIN_MAX_INSTANCES) {
          const rainCenterIndex = rainCount * 3;
          const rainWidthIndex = rainCount * 2;
          this.rainCenters[rainCenterIndex] = worldX + 0.5;
          this.rainCenters[rainCenterIndex + 1] = visibleBottom;
          this.rainCenters[rainCenterIndex + 2] = worldZ + 0.5;
          this.rainWidthDirs[rainWidthIndex] = rainWidthX;
          this.rainWidthDirs[rainWidthIndex + 1] = rainWidthZ;
          this.rainHeights[rainCount] = rainHeight;
          this.rainVScales[rainCount] = rainHeight * RAIN_UV_SCALE_PER_BLOCK;
          this.rainVOffsets[rainCount] =
            visibleBottom * RAIN_UV_SCALE_PER_BLOCK +
            column.variation.scrollOffset +
            this.elapsedSeconds * column.variation.scrollSpeed;
          this.rainAlphas[rainCount] = rainAlpha;
          rainCount += 1;
        }

        const splashWithinView =
          precipitationY >= cameraY - RAIN_VERTICAL_RANGE - 1 &&
          precipitationY <= cameraY + RAIN_VERTICAL_RANGE + 2;
        if (!splashWithinView || distanceSq > splashRenderRadiusSq) {
          continue;
        }

        for (
          let splashVariant = 0;
          splashVariant < splashVariantsPerColumn && splashCount < SPLASH_MAX_INSTANCES;
          splashVariant += 1
        ) {
          const splashSeed = hash32(
            column.variation.splashSeed ^ Math.imul(splashVariant + 1, 0x9e3779b9),
          );
          const splashDistanceAlpha = (1 - clamp01(distanceSq / splashRenderRadiusSq)) * 0.3 + 0.7;
          const splashIndex = splashCount * 3;
          this.splashCenters[splashIndex] =
            worldX + 0.5 + (toUnitFloat(splashSeed, 0) - 0.5) * SPLASH_SPREAD;
          this.splashCenters[splashIndex + 1] = precipitationY + SPLASH_HEIGHT_OFFSET;
          this.splashCenters[splashIndex + 2] =
            worldZ + 0.5 + (toUnitFloat(splashSeed, 8) - 0.5) * SPLASH_SPREAD;
          this.splashSizes[splashCount] =
            SPLASH_BASE_SIZE * lerp(0.82, 1.48, toUnitFloat(splashSeed, 16));
          this.splashAlphas[splashCount] =
            rainAlpha * splashDistanceAlpha * lerp(0.62, 0.96, toUnitFloat(splashSeed, 24));
          splashCount += 1;
        }
      }
    }

    this.commitInstanceData(rainCount, splashCount, intensity);
    this.pruneChunkCaches();
  }

  private clearVisibleRain(): void {
    this.group.visible = false;
    this.rainGeometry.instanceCount = 0;
    this.rainMesh.visible = false;
    this.splashGeometry.instanceCount = 0;
    this.splashMesh.visible = false;
    this.rainMaterial.uniforms.uOpacity.value = 0;
    this.splashMaterial.uniforms.uOpacity.value = 0;
    this.splashMaterial.uniforms.uTime.value = this.elapsedSeconds;
    if (this.chunkCaches.size > 0) {
      this.chunkCaches.clear();
    }
  }

  private commitInstanceData(rainCount: number, splashCount: number, intensity: number): void {
    this.group.visible = rainCount > 0 || splashCount > 0;
    this.rainGeometry.instanceCount = rainCount;
    this.rainMesh.visible = rainCount > 0;
    this.splashGeometry.instanceCount = splashCount;
    this.splashMesh.visible = splashCount > 0;

    this.rainMaterial.uniforms.uOpacity.value = lerp(
      RAIN_BASE_OPACITY_MIN,
      RAIN_BASE_OPACITY_MAX,
      Math.sqrt(intensity),
    );
    this.splashMaterial.uniforms.uOpacity.value = lerp(
      SPLASH_OPACITY_MIN,
      SPLASH_OPACITY_MAX,
      intensity,
    );
    this.splashMaterial.uniforms.uTime.value = this.elapsedSeconds;

    (
      this.rainGeometry.getAttribute('instanceCenter') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.rainGeometry.getAttribute('instanceWidthDir') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.rainGeometry.getAttribute('instanceHeight') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.rainGeometry.getAttribute('instanceVScale') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.rainGeometry.getAttribute('instanceVOffset') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.rainGeometry.getAttribute('instanceAlpha') as InstancedBufferAttribute
    ).needsUpdate = rainCount > 0;
    (
      this.splashGeometry.getAttribute('instanceCenter') as InstancedBufferAttribute
    ).needsUpdate = splashCount > 0;
    (
      this.splashGeometry.getAttribute('instanceSize') as InstancedBufferAttribute
    ).needsUpdate = splashCount > 0;
    (
      this.splashGeometry.getAttribute('instanceAlpha') as InstancedBufferAttribute
    ).needsUpdate = splashCount > 0;
  }

  private pruneChunkCaches(): void {
    if (this.frameId % CACHE_PRUNE_INTERVAL_FRAMES !== 0) {
      return;
    }

    for (const [chunkKey, cache] of this.chunkCaches.entries()) {
      if (this.frameId - cache.lastSeenFrame <= CACHE_MAX_AGE_FRAMES) {
        continue;
      }
      this.chunkCaches.delete(chunkKey);
    }
  }
}
