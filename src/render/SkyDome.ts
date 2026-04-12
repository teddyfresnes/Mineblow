import {
  AdditiveBlending,
  BackSide,
  ClampToEdgeWrapping,
  Color,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';
import { SUN_DIRECTION } from './SceneLights';

const SUN_TEXTURE_URL = new URL('../../assets/textures/environment/sun.png', import.meta.url).href;
const MOON_TEXTURE_URL = new URL('../../assets/textures/environment/moon_phases.png', import.meta.url).href;
const SUN_DISTANCE = 220;
const SUN_SIZE = 40;
const MOON_DISTANCE = 218;
const MOON_SIZE = 40;
const MOON_PHASE_COLUMNS = 4;
const MOON_PHASE_ROWS = 2;
const celestialTextureLoader = new TextureLoader();

const loadCelestialTexture = (url: string): Texture => {
  const texture = celestialTextureLoader.load(url);
  texture.colorSpace = SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  return texture;
};

export interface SkyDomeState {
  topColor: Color;
  horizonColor: Color;
  bottomColor: Color;
  sunDirection: Vector3;
  moonDirection: Vector3;
  sunIntensity: number;
  moonIntensity: number;
  moonPhase: number;
}

export class SkyDome {
  readonly group = new Group();
  private readonly skyMaterial: ShaderMaterial;
  private readonly sun: Mesh;
  private readonly sunMaterial: MeshBasicMaterial;
  private readonly moon: Mesh;
  private readonly moonMaterial: MeshBasicMaterial;
  private readonly moonTexture: Texture;
  private readonly cameraWorldPosition = new Vector3();
  private readonly currentSunDirection = SUN_DIRECTION.clone();
  private readonly currentMoonDirection = SUN_DIRECTION.clone().multiplyScalar(-1);
  private moonPhase = -1;

  constructor() {
    this.skyMaterial = new ShaderMaterial({
      side: BackSide,
      uniforms: {
        topColor: { value: new Color('#7eb8f7') },
        horizonColor: { value: new Color('#c9e6ff') },
        bottomColor: { value: new Color('#f7ddb1') },
        sunDirection: { value: SUN_DIRECTION.clone() },
        sunIntensity: { value: 0.96 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDirection;
        uniform float sunIntensity;
        varying vec3 vWorldPosition;
        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = dir.y * 0.5 + 0.5;
          vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.45, h));
          color = mix(color, topColor, smoothstep(0.45, 1.0, h));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });

    const skySphere = new Mesh(new SphereGeometry(280, 24, 16), this.skyMaterial);
    skySphere.frustumCulled = false;
    this.group.add(skySphere);

    const sunTexture = loadCelestialTexture(SUN_TEXTURE_URL);
    this.sunMaterial = new MeshBasicMaterial({
      map: sunTexture,
      color: '#fff5d0',
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
      fog: false,
      depthWrite: false,
      toneMapped: false,
      opacity: 0.96,
    });
    this.sun = new Mesh(new PlaneGeometry(SUN_SIZE, SUN_SIZE), this.sunMaterial);
    this.sun.frustumCulled = false;
    this.sun.renderOrder = 1;
    this.group.add(this.sun);

    this.moonTexture = loadCelestialTexture(MOON_TEXTURE_URL);
    this.moonTexture.repeat.set(1 / MOON_PHASE_COLUMNS, 1 / MOON_PHASE_ROWS);
    this.moonMaterial = new MeshBasicMaterial({
      map: this.moonTexture,
      color: '#d8e2ff',
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
      fog: false,
      depthWrite: false,
      toneMapped: false,
      opacity: 0.82,
    });
    this.moon = new Mesh(new PlaneGeometry(MOON_SIZE, MOON_SIZE), this.moonMaterial);
    this.moon.frustumCulled = false;
    this.moon.renderOrder = 1;
    this.group.add(this.moon);

    this.setCelestialState({
      topColor: new Color('#7eb8f7'),
      horizonColor: new Color('#c9e6ff'),
      bottomColor: new Color('#f7ddb1'),
      sunDirection: SUN_DIRECTION.clone(),
      moonDirection: SUN_DIRECTION.clone().multiplyScalar(-1),
      sunIntensity: 0.96,
      moonIntensity: 0.82,
      moonPhase: 0,
    });
  }

  update(cameraX: number, cameraY: number, cameraZ: number): void {
    this.cameraWorldPosition.set(cameraX, cameraY, cameraZ);
    this.group.position.copy(this.cameraWorldPosition);
    this.updateCelestialBodies();
  }

  setCelestialState(state: SkyDomeState): void {
    const uniforms = this.skyMaterial.uniforms;
    (uniforms.topColor.value as Color).copy(state.topColor);
    (uniforms.horizonColor.value as Color).copy(state.horizonColor);
    (uniforms.bottomColor.value as Color).copy(state.bottomColor);
    (uniforms.sunDirection.value as Vector3).copy(state.sunDirection);
    uniforms.sunIntensity.value = state.sunIntensity;

    this.currentSunDirection.copy(state.sunDirection);
    this.sunMaterial.opacity = state.sunIntensity;

    this.currentMoonDirection.copy(state.moonDirection);
    this.moonMaterial.opacity = state.moonIntensity;
    this.setMoonPhase(state.moonPhase);
    this.updateCelestialBodies();
  }

  private updateCelestialBodies(): void {
    this.updateCelestialBody(this.sun, this.currentSunDirection, SUN_DISTANCE);
    this.updateCelestialBody(this.moon, this.currentMoonDirection, MOON_DISTANCE);
  }

  private updateCelestialBody(mesh: Mesh, direction: Vector3, distance: number): void {
    mesh.position.copy(direction).normalize().multiplyScalar(distance);
    mesh.lookAt(this.cameraWorldPosition);
  }

  private setMoonPhase(phase: number): void {
    const normalizedPhase = ((Math.floor(phase) % 8) + 8) % 8;
    if (normalizedPhase === this.moonPhase) {
      return;
    }

    const column = normalizedPhase % MOON_PHASE_COLUMNS;
    const row = Math.floor(normalizedPhase / MOON_PHASE_COLUMNS);
    this.moonTexture.offset.set(
      column / MOON_PHASE_COLUMNS,
      row === 0 ? 1 / MOON_PHASE_ROWS : 0,
    );
    this.moonTexture.needsUpdate = true;
    this.moonPhase = normalizedPhase;
  }
}
