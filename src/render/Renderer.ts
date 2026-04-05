import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferAttribute,
  BoxGeometry,
  BufferGeometry,
  Color,
  DoubleSide,
  DirectionalLight,
  Fog,
  FrontSide,
  MeshLambertMaterial,
  MeshBasicMaterial,
  Mesh,
  Group,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { WORLD_CONFIG } from '../game/Config';
import type { BlockId } from '../types/blocks';
import type { WeatherVisualState } from '../types/weather';
import type { VoxelHit } from '../types/world';
import { createDefaultWeatherVisualState } from '../world/Weather';
import { getBlockDefinition } from '../world/BlockRegistry';
import type { World } from '../world/World';
import { RainField } from './RainField';
import { SUN_DIRECTION, addSceneLights, type SceneLights, updateSunForCamera } from './SceneLights';
import { createFirstPersonHand, disposeModel, loadSkinTexture } from './SkinModel';
import { SkyDome } from './SkyDome';
import { TextureAtlas } from './TextureAtlas';
import { VoxelCloudLayer } from './VoxelCloudLayer';

const BASE_FOV = 75;
const SPRINT_FOV_BOOST = 4.65;
const AIRBORNE_SPRINT_FOV_BOOST = 5.45;
const HAND_BASE_X = 0.98;
const HAND_BASE_Y = -0.93;
const HAND_BASE_Z = -0.96;
const HAND_BASE_ROT_X = -0.28;
const HAND_BASE_ROT_Y = -0.34;
const HAND_BASE_ROT_Z = -0.09;
const HAND_BASE_SCALE = 1.15;
const HAND_OVERLAY_NEAR = 0.01;
const HAND_OVERLAY_FAR = 12;
const HELD_ITEM_EDGE_SIZE = 0.78;
const HELD_ITEM_POS_X = 0.05;
const HELD_ITEM_POS_Y = -0.18;
const HELD_ITEM_POS_Z = 0.28;
const HELD_ITEM_ROT_X = 0.86;
const HELD_ITEM_ROT_Y = -0.52;
const HELD_ITEM_ROT_Z = 0.18;
const WATER_TINT_COLOR = new Color('#2f5da8');
const WATER_OPACITY = 0.82;
const WATER_TINT_STRENGTH = 0.32;
const WATER_TOP_TINT_BOOST = 0.2;
const WATER_TOP_ALPHA_BOOST = 0.1;
const WATER_TOP_ALPHA_GRAZE_BOOST = 0.18;
const WATER_LUMA_BLEND = 0.08;
const WATER_CONTRAST = 0.97;
const WATER_EMISSIVE_INTENSITY = 0.07;
const WATER_SURFACE_LINE_COLOR = new Color('#b9d8ff');
const WATER_SURFACE_LINE_STRENGTH_SHALLOW = 0.24;
const WATER_SURFACE_LINE_STRENGTH_DEEP = 0.1;
const AIR_FOG_COLOR = '#95b9dd';
const OVERCAST_FOG_COLOR = '#7b8996';
const STORM_FOG_COLOR = '#5f6975';
const AIR_FOG_NEAR = 60;
const AIR_FOG_FAR = 190;
const AIR_EXPOSURE = 1.03;
const AIR_FOG_NEAR_NIGHT = 42;
const AIR_FOG_FAR_NIGHT = 132;
const AIR_EXPOSURE_NIGHT = 0.46;
const TWILIGHT_FOG_COLOR = '#d38d6a';
const NIGHT_FOG_COLOR = '#101a29';
const TWILIGHT_BACKGROUND_COLOR = '#d79d76';
const NIGHT_BACKGROUND_COLOR = '#060b14';
const OVERCAST_BACKGROUND_COLOR = '#aab4bf';
const STORM_BACKGROUND_COLOR = '#7a828b';
const DAY_SKY_TOP_COLOR = '#7eb8f7';
const DAY_SKY_HORIZON_COLOR = '#c9e6ff';
const DAY_SKY_BOTTOM_COLOR = '#f7ddb1';
const OVERCAST_SKY_TOP_COLOR = '#6f7f91';
const OVERCAST_SKY_HORIZON_COLOR = '#a8b4c0';
const OVERCAST_SKY_BOTTOM_COLOR = '#c9d0d5';
const STORM_SKY_TOP_COLOR = '#4e5964';
const STORM_SKY_HORIZON_COLOR = '#69727c';
const STORM_SKY_BOTTOM_COLOR = '#8e949b';
const TWILIGHT_SKY_TOP_COLOR = '#4f6ea8';
const TWILIGHT_SKY_HORIZON_COLOR = '#f09a68';
const TWILIGHT_SKY_BOTTOM_COLOR = '#ffd29b';
const NIGHT_SKY_TOP_COLOR = '#08111f';
const NIGHT_SKY_HORIZON_COLOR = '#15263d';
const NIGHT_SKY_BOTTOM_COLOR = '#04070d';
const UNDERWATER_FOG_COLOR = '#284f7a';
const UNDERWATER_DEEP_FOG_COLOR = '#0f2236';
const UNDERWATER_FOG_NEAR = 6;
const UNDERWATER_FOG_FAR = 42;
const UNDERWATER_EXPOSURE = 0.78;
const UNDERWATER_DEEP_FOG_NEAR = 1.8;
const UNDERWATER_DEEP_FOG_FAR = 17;
const UNDERWATER_DEEP_EXPOSURE = 0.48;
const UNDERWATER_DEPTH_FOR_MAX_ATTENUATION = 28;
const UNDERWATER_LIGHT_SCALE_SHALLOW = 0.68;
const UNDERWATER_LIGHT_SCALE_DEEP = 0.34;
const MOON_PHASE_COUNT = 8;
const ORBIT_HORIZONTAL_DIRECTION = new Vector3(SUN_DIRECTION.x, 0, SUN_DIRECTION.z).normalize();

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, ratio: number): number => from + (to - from) * ratio;
const smoothstep = (edge0: number, edge1: number, value: number): number => {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }
  const ratio = clamp01((value - edge0) / (edge1 - edge0));
  return ratio * ratio * (3 - 2 * ratio);
};

export type FirstPersonAnimationPreset = 'hand' | 'item';

export interface FirstPersonAnimationProfile {
  bobSpeed: number;
  walkBobX: number;
  walkBobY: number;
  walkBobZ: number;
  swingDuration: number;
  swingPitch: number;
  swingYaw: number;
  swingRoll: number;
  swingForward: number;
  swingRight: number;
  mineSpeed: number;
  minePitch: number;
  mineYaw: number;
  mineRoll: number;
  mineForward: number;
}

const HAND_ANIMATION_PROFILE: FirstPersonAnimationProfile = {
  bobSpeed: 3.8,
  walkBobX: 0.036,
  walkBobY: 0.018,
  walkBobZ: 0.009,
  swingDuration: 0.24,
  swingPitch: 0.62,
  swingYaw: 0.23,
  swingRoll: 0.41,
  swingForward: 0.09,
  swingRight: 0.11,
  mineSpeed: 9.2,
  minePitch: 1.12,
  mineYaw: 0.36,
  mineRoll: 0.58,
  mineForward: 0.16,
};

const ITEM_ANIMATION_PROFILE: FirstPersonAnimationProfile = {
  bobSpeed: 3.4,
  walkBobX: 0.026,
  walkBobY: 0.014,
  walkBobZ: 0.007,
  swingDuration: 0.22,
  swingPitch: 0.42,
  swingYaw: 0.18,
  swingRoll: 0.29,
  swingForward: 0.065,
  swingRight: 0.08,
  mineSpeed: 7.1,
  minePitch: 0.68,
  mineYaw: 0.24,
  mineRoll: 0.31,
  mineForward: 0.09,
};

export class Renderer {
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(BASE_FOV, 1, 0.1, 500);
  readonly handScene = new Scene();
  readonly handCamera = new PerspectiveCamera(BASE_FOV, 1, HAND_OVERLAY_NEAR, HAND_OVERLAY_FAR);
  readonly atlas = new TextureAtlas();
  readonly sky = new SkyDome();
  readonly clouds = new VoxelCloudLayer();
  readonly rain = new RainField();

  private readonly renderer: WebGLRenderer;
  private readonly waterMaterial: MeshLambertMaterial;
  private readonly chunkMeshes = new Map<string, Mesh>();
  private readonly droppedItems = new Map<string, Mesh>();
  private readonly breakParticles: Array<{
    mesh: Mesh;
    velocity: Vector3;
    lifeMs: number;
    maxLifeMs: number;
  }> = [];
  private readonly lights: SceneLights;
  private readonly sceneFog: Fog;
  private readonly airFogColor = new Color(AIR_FOG_COLOR);
  private readonly overcastFogColor = new Color(OVERCAST_FOG_COLOR);
  private readonly stormFogColor = new Color(STORM_FOG_COLOR);
  private readonly currentAirFogColor = new Color(AIR_FOG_COLOR);
  private readonly twilightFogColor = new Color(TWILIGHT_FOG_COLOR);
  private readonly nightFogColor = new Color(NIGHT_FOG_COLOR);
  private readonly underwaterFogColor = new Color(UNDERWATER_FOG_COLOR);
  private readonly underwaterDeepFogColor = new Color(UNDERWATER_DEEP_FOG_COLOR);
  private readonly airBackgroundColor = new Color(WORLD_CONFIG.skyColor);
  private readonly overcastBackgroundColor = new Color(OVERCAST_BACKGROUND_COLOR);
  private readonly stormBackgroundColor = new Color(STORM_BACKGROUND_COLOR);
  private readonly twilightBackgroundColor = new Color(TWILIGHT_BACKGROUND_COLOR);
  private readonly nightBackgroundColor = new Color(NIGHT_BACKGROUND_COLOR);
  private readonly daySkyTopColor = new Color(DAY_SKY_TOP_COLOR);
  private readonly daySkyHorizonColor = new Color(DAY_SKY_HORIZON_COLOR);
  private readonly daySkyBottomColor = new Color(DAY_SKY_BOTTOM_COLOR);
  private readonly overcastSkyTopColor = new Color(OVERCAST_SKY_TOP_COLOR);
  private readonly overcastSkyHorizonColor = new Color(OVERCAST_SKY_HORIZON_COLOR);
  private readonly overcastSkyBottomColor = new Color(OVERCAST_SKY_BOTTOM_COLOR);
  private readonly stormSkyTopColor = new Color(STORM_SKY_TOP_COLOR);
  private readonly stormSkyHorizonColor = new Color(STORM_SKY_HORIZON_COLOR);
  private readonly stormSkyBottomColor = new Color(STORM_SKY_BOTTOM_COLOR);
  private readonly twilightSkyTopColor = new Color(TWILIGHT_SKY_TOP_COLOR);
  private readonly twilightSkyHorizonColor = new Color(TWILIGHT_SKY_HORIZON_COLOR);
  private readonly twilightSkyBottomColor = new Color(TWILIGHT_SKY_BOTTOM_COLOR);
  private readonly nightSkyTopColor = new Color(NIGHT_SKY_TOP_COLOR);
  private readonly nightSkyHorizonColor = new Color(NIGHT_SKY_HORIZON_COLOR);
  private readonly nightSkyBottomColor = new Color(NIGHT_SKY_BOTTOM_COLOR);
  private readonly fogMixColor = new Color();
  private readonly skyTopColor = new Color(DAY_SKY_TOP_COLOR);
  private readonly skyHorizonColor = new Color(DAY_SKY_HORIZON_COLOR);
  private readonly skyBottomColor = new Color(DAY_SKY_BOTTOM_COLOR);
  private readonly currentSunDirection = SUN_DIRECTION.clone();
  private readonly currentMoonDirection = SUN_DIRECTION.clone().multiplyScalar(-1);
  private readonly weatherState: WeatherVisualState = createDefaultWeatherVisualState();
  private readonly miningOverlay: Mesh;
  private readonly handRig = new Group();
  private readonly heldItemAnchor = new Group();
  private readonly baseAmbientIntensity: number;
  private readonly baseSkyBounceIntensity: number;
  private readonly baseSunIntensity: number;
  private airExposure = AIR_EXPOSURE;
  private airFogNear = AIR_FOG_NEAR;
  private airFogFar = AIR_FOG_FAR;
  private airAmbientIntensity = 0;
  private airSkyBounceIntensity = 0;
  private airSunIntensity = 0;
  private timeOfDay = 0;
  private moonPhase = 0;
  private underwaterEnabled = false;
  private underwaterDepth = 0;
  private waterSurfaceLineStrength = 0;
  private waterSurfaceLineStrengthUniform: { value: number } | null = null;
  private handModel: Group | null = null;
  private heldItemMesh: Mesh | null = null;
  private heldBlockId: BlockId | null = null;
  private handPhase = 0;
  private miningPhase = 0;
  private miningBlend = 0;
  private wasMiningActive = false;
  private actionTimer = 0;
  private actionStrength = 0;
  private jumpTimer = 0;
  private jumpStrength = 0;
  private handAnimationProfile: FirstPersonAnimationProfile = { ...HAND_ANIMATION_PROFILE };
  private skinRequestId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    this.renderer.setSize(
      canvas.clientWidth || window.innerWidth,
      canvas.clientHeight || window.innerHeight,
      false,
    );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = AIR_EXPOSURE;
    this.renderer.setClearColor(this.airBackgroundColor);
    this.scene.background = this.airBackgroundColor;
    this.sceneFog = new Fog(this.airFogColor.clone(), AIR_FOG_NEAR, AIR_FOG_FAR);
    this.scene.fog = this.sceneFog;
    const atlasMap = this.atlas.material.map;
    if (!atlasMap) {
      throw new Error('Texture atlas map is missing.');
    }
    this.atlas.material.transparent = false;
    this.atlas.material.alphaTest = 0.35;
    this.atlas.material.depthWrite = true;
    this.waterMaterial = new MeshLambertMaterial({
      map: atlasMap,
      color: WATER_TINT_COLOR.clone(),
      emissive: WATER_TINT_COLOR.clone().multiplyScalar(0.24),
      emissiveIntensity: WATER_EMISSIVE_INTENSITY,
      transparent: true,
      opacity: WATER_OPACITY,
      depthWrite: false,
      alphaTest: 0.01,
    });
    this.waterMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uWaterTint = { value: WATER_TINT_COLOR.clone() };
      shader.uniforms.uWaterTintStrength = { value: WATER_TINT_STRENGTH };
      shader.uniforms.uWaterTopTintBoost = { value: WATER_TOP_TINT_BOOST };
      shader.uniforms.uWaterTopAlphaBoost = { value: WATER_TOP_ALPHA_BOOST };
      shader.uniforms.uWaterTopAlphaGrazeBoost = { value: WATER_TOP_ALPHA_GRAZE_BOOST };
      shader.uniforms.uWaterLumaBlend = { value: WATER_LUMA_BLEND };
      shader.uniforms.uWaterContrast = { value: WATER_CONTRAST };
      shader.uniforms.uWaterSurfaceLineColor = { value: WATER_SURFACE_LINE_COLOR.clone() };
      shader.uniforms.uWaterSurfaceLineStrength = { value: this.waterSurfaceLineStrength };
      this.waterSurfaceLineStrengthUniform = shader.uniforms.uWaterSurfaceLineStrength as {
        value: number;
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
uniform vec3 uWaterTint;
uniform float uWaterTintStrength;
uniform float uWaterTopTintBoost;
uniform float uWaterTopAlphaBoost;
uniform float uWaterTopAlphaGrazeBoost;
uniform float uWaterLumaBlend;
uniform float uWaterContrast;
uniform vec3 uWaterSurfaceLineColor;
uniform float uWaterSurfaceLineStrength;
`,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `#include <map_fragment>
vec3 waterLuma = vec3(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114)));
diffuseColor.rgb = mix(diffuseColor.rgb, waterLuma, uWaterLumaBlend);
diffuseColor.rgb = mix(diffuseColor.rgb, uWaterTint, uWaterTintStrength);
float waterTopFaceMask = smoothstep(0.72, 0.95, normalize(vNormal).y);
diffuseColor.rgb = mix(diffuseColor.rgb, uWaterTint, waterTopFaceMask * uWaterTopTintBoost);
float waterTopViewFacing = clamp(abs(dot(normalize(vNormal), normalize(vViewPosition))), 0.0, 1.0);
float waterTopSurfaceOpacity = waterTopFaceMask * (uWaterTopAlphaBoost + (1.0 - waterTopViewFacing) * uWaterTopAlphaGrazeBoost);
float waterBackFaceMask = gl_FrontFacing ? 0.0 : 1.0;
float waterSurfaceLine = waterTopFaceMask * waterBackFaceMask * pow(1.0 - waterTopViewFacing, 3.0);
diffuseColor.rgb += uWaterSurfaceLineColor * (waterSurfaceLine * uWaterSurfaceLineStrength);
diffuseColor.rgb = mix(vec3(0.5), diffuseColor.rgb, uWaterContrast);
diffuseColor.a = min(1.0, diffuseColor.a + waterTopSurfaceOpacity + waterSurfaceLine * uWaterSurfaceLineStrength * 0.35);
`,
      );
    };
    this.waterMaterial.customProgramCacheKey = () => 'water-tint-filter-v4';
    this.scene.add(this.sky.group);
    this.scene.add(this.clouds.group);
    this.scene.add(this.rain.group);
    this.scene.add(this.camera);
    this.handScene.add(this.handCamera);
    this.handCamera.add(this.handRig);
    this.handRig.position.set(HAND_BASE_X, HAND_BASE_Y, HAND_BASE_Z);
    this.handRig.rotation.set(HAND_BASE_ROT_X, HAND_BASE_ROT_Y, HAND_BASE_ROT_Z);
    this.handRig.scale.set(HAND_BASE_SCALE, HAND_BASE_SCALE, HAND_BASE_SCALE);
    this.heldItemAnchor.position.set(HELD_ITEM_POS_X, HELD_ITEM_POS_Y, HELD_ITEM_POS_Z);
    this.handRig.add(this.heldItemAnchor);
    const handAmbient = new AmbientLight('#ffffff', 0.6);
    const handKey = new DirectionalLight('#fff2db', 0.95);
    handKey.position.set(1.6, 2.2, 2.1);
    this.handScene.add(handAmbient, handKey);
    this.lights = addSceneLights(this.scene);
    this.baseAmbientIntensity = this.lights.ambient.intensity;
    this.baseSkyBounceIntensity = this.lights.skyBounce.intensity;
    this.baseSunIntensity = this.lights.sun.intensity;
    this.clouds.setWeatherState(this.weatherState);
    this.rain.setWeatherState(this.weatherState);
    this.setCelestialState(0, 0);
    updateSunForCamera(this.lights, 0, 0, this.currentSunDirection);
    void this.setPlayerSkin(null);

    this.miningOverlay = new Mesh(
      new BoxGeometry(1.01, 1.01, 1.01),
      new MeshBasicMaterial({
        color: '#111317',
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    this.miningOverlay.visible = false;
    this.miningOverlay.renderOrder = 10;
    this.scene.add(this.miningOverlay);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.handCamera.aspect = width / height;
    this.handCamera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(width, height, false);
  }

  setCameraTransform(
    position: { x: number; y: number; z: number },
    yaw: number,
    pitch: number,
  ): void {
    this.camera.position.set(position.x, position.y, position.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = yaw;
    this.camera.rotation.x = pitch;
    this.sky.update(position.x, position.y, position.z);
    updateSunForCamera(this.lights, position.x, position.z, this.currentSunDirection);
  }

  setWeatherState(state: WeatherVisualState): void {
    this.weatherState.preset = state.preset;
    this.weatherState.previousPreset = state.previousPreset;
    this.weatherState.transitionAlpha = state.transitionAlpha;
    this.weatherState.mode = state.mode;
    this.weatherState.cloudCoverage = state.cloudCoverage;
    this.weatherState.cloudDensity = state.cloudDensity;
    this.weatherState.cloudThickness = state.cloudThickness;
    this.weatherState.cloudSharpness = state.cloudSharpness;
    this.weatherState.cloudGrayness = state.cloudGrayness;
    this.weatherState.cloudOpacity = state.cloudOpacity;
    this.weatherState.windOffsetX = state.windOffsetX;
    this.weatherState.windOffsetZ = state.windOffsetZ;
    this.weatherState.windSpeed = state.windSpeed;
    this.weatherState.skyGrayness = state.skyGrayness;
    this.weatherState.skyBrightness = state.skyBrightness;
    this.weatherState.sunVisibility = state.sunVisibility;
    this.weatherState.fogDimming = state.fogDimming;
    this.weatherState.ambientDimming = state.ambientDimming;
    this.weatherState.rainIntensity = state.rainIntensity;
    this.weatherState.skyPreset = state.skyPreset;

    this.clouds.setWeatherState(this.weatherState);
    this.rain.setWeatherState(this.weatherState);
    this.updateAirAtmosphere();
    this.applyViewAtmosphere();
  }

  updateWeatherEffects(
    dt: number,
    cameraPosition: { x: number; y: number; z: number },
    world: World,
  ): void {
    this.clouds.update(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.rain.update(dt, this.camera, world);
  }

  upsertChunkMesh(
    chunkKey: string,
    geometry: BufferGeometry,
    origin: { x: number; z: number },
  ): void {
    const existing = this.chunkMeshes.get(chunkKey);
    if (geometry.getAttribute('position').count === 0) {
      geometry.dispose();
      if (existing) {
        this.scene.remove(existing);
        existing.geometry.dispose();
        this.chunkMeshes.delete(chunkKey);
      }
      return;
    }

    if (existing) {
      existing.geometry.dispose();
      existing.geometry = geometry;
      existing.position.set(origin.x, 0, origin.z);
      return;
    }

    const mesh = new Mesh(geometry, [this.atlas.material, this.waterMaterial]);
    mesh.position.set(origin.x, 0, origin.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.chunkMeshes.set(chunkKey, mesh);
  }

  removeChunkMesh(chunkKey: string): void {
    const mesh = this.chunkMeshes.get(chunkKey);
    if (!mesh) {
      return;
    }

    this.scene.remove(mesh);
    mesh.geometry.dispose();
    this.chunkMeshes.delete(chunkKey);
  }

  clearChunks(): void {
    for (const chunkKey of [...this.chunkMeshes.keys()]) {
      this.removeChunkMesh(chunkKey);
    }
  }

  setPlayerSkin(dataUrl: string | null): void {
    void this.applyPlayerSkin(dataUrl);
  }

  setFirstPersonHandVisible(visible: boolean): void {
    this.handRig.visible = visible;
  }

  setFirstPersonHeldBlock(blockId: BlockId | null): void {
    if (this.heldBlockId === blockId) {
      return;
    }

    this.heldBlockId = blockId;
    this.clearHeldItemMesh();

    if (blockId === null) {
      if (this.handModel) {
        this.handModel.visible = true;
      }
      return;
    }

    const mesh = new Mesh(
      this.createBlockGeometry(blockId, HELD_ITEM_EDGE_SIZE),
      new MeshLambertMaterial({
        map: this.atlas.material.map,
        transparent: true,
        alphaTest: 0.25,
      }),
    );
    mesh.rotation.set(HELD_ITEM_ROT_X, HELD_ITEM_ROT_Y, HELD_ITEM_ROT_Z);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    this.heldItemAnchor.add(mesh);
    this.heldItemMesh = mesh;
    if (this.handModel) {
      this.handModel.visible = false;
    }
  }

  setFirstPersonAnimationPreset(preset: FirstPersonAnimationPreset): void {
    this.handAnimationProfile =
      preset === 'item' ? { ...ITEM_ANIMATION_PROFILE } : { ...HAND_ANIMATION_PROFILE };
  }

  setFirstPersonAnimationProfile(profile: Partial<FirstPersonAnimationProfile>): void {
    this.handAnimationProfile = {
      ...this.handAnimationProfile,
      ...profile,
    };
  }

  triggerFirstPersonAction(strength = 1): void {
    const clampedStrength = Math.max(0.25, Math.min(1.6, strength));
    this.actionStrength = Math.max(this.actionStrength, clampedStrength);
    this.actionTimer = this.handAnimationProfile.swingDuration;
  }

  triggerFirstPersonJump(strength = 1): void {
    const clampedStrength = Math.max(0.3, Math.min(1, strength));
    this.jumpStrength = Math.max(this.jumpStrength, clampedStrength);
    this.jumpTimer = 0.16;
  }

  updateHand(dt: number, movementIntensity: number, miningActive: boolean): void {
    const profile = this.handAnimationProfile;
    this.handPhase += dt * (profile.bobSpeed + movementIntensity * 4.4);
    const moveAmount = Math.max(0, movementIntensity - 0.04);
    const stride = Math.sin(this.handPhase);
    const walkBobX = stride * (moveAmount * profile.walkBobX);
    const walkBobY =
      (1 - Math.cos(this.handPhase * 2)) * 0.5 * moveAmount * profile.walkBobY * 0.42;
    const walkBobZ = stride * moveAmount * profile.walkBobZ * 0.22;

    if (this.actionTimer > 0) {
      this.actionTimer = Math.max(0, this.actionTimer - dt);
    }
    const actionProgressRaw =
      profile.swingDuration > 0 ? 1 - this.actionTimer / profile.swingDuration : 1;
    const actionProgress = Math.max(0, Math.min(1, actionProgressRaw));
    const actionPulse = Math.sin(actionProgress * Math.PI) * Math.min(1, this.actionStrength);
    if (this.actionTimer <= 0) {
      this.actionStrength = Math.max(0, this.actionStrength - dt * 8);
    }

    if (this.jumpTimer > 0) {
      this.jumpTimer = Math.max(0, this.jumpTimer - dt);
    }
    const jumpProgressRaw = 1 - this.jumpTimer / 0.16;
    const jumpProgress = Math.max(0, Math.min(1, jumpProgressRaw));
    const jumpPulse = this.jumpTimer > 0 ? Math.sin(jumpProgress * Math.PI) : 0;
    const jumpAmount = jumpPulse * this.jumpStrength;
    if (this.jumpTimer <= 0) {
      this.jumpStrength = Math.max(0, this.jumpStrength - dt * 7.5);
    }

    if (miningActive && !this.wasMiningActive) {
      this.miningPhase = 0;
      this.miningBlend = 0;
    }
    const miningTarget = miningActive ? 1 : 0;
    const blendSpeed = miningActive ? 26 : 7;
    this.miningBlend += (miningTarget - this.miningBlend) * Math.min(1, dt * blendSpeed);
    const miningRate = 0.9 + this.miningBlend * 1.9;
    this.miningPhase += dt * profile.mineSpeed * miningRate;
    const miningWaveBase = (Math.sin(this.miningPhase) + 1) * 0.5;
    const miningWaveSnap = (Math.sin(this.miningPhase * 2 + 0.35) + 1) * 0.5;
    const miningPulse = this.miningBlend * (miningWaveBase * 0.78 + miningWaveSnap * 0.22);
    this.wasMiningActive = miningActive;
    const combinedHitPulse = miningPulse + actionPulse;

    this.handRig.position.x = HAND_BASE_X + walkBobX + combinedHitPulse * 0.11;
    this.handRig.position.y =
      HAND_BASE_Y -
      walkBobY -
      combinedHitPulse * 0.058 -
      jumpAmount * 0.018;
    this.handRig.position.z =
      HAND_BASE_Z +
      walkBobZ +
      -combinedHitPulse * profile.mineForward +
      jumpAmount * 0.01;
    this.handRig.rotation.x =
      HAND_BASE_ROT_X -
      movementIntensity * 0.022 -
      combinedHitPulse * profile.minePitch -
      jumpAmount * 0.06;
    this.handRig.rotation.y = HAND_BASE_ROT_Y + combinedHitPulse * profile.mineYaw;
    this.handRig.rotation.z =
      HAND_BASE_ROT_Z -
      combinedHitPulse * profile.mineRoll +
      jumpAmount * 0.024;
  }

  updateSpeedFov(dt: number, sprinting: boolean, moving: boolean, grounded: boolean): void {
    const targetFov =
      sprinting && moving
        ? BASE_FOV + (grounded ? SPRINT_FOV_BOOST : AIRBORNE_SPRINT_FOV_BOOST)
        : BASE_FOV;
    const blend = 1 - Math.exp(-dt * 10);
    const nextFov = this.camera.fov + (targetFov - this.camera.fov) * blend;
    if (Math.abs(nextFov - this.camera.fov) > 0.01) {
      this.camera.fov = nextFov;
      this.camera.updateProjectionMatrix();
      this.handCamera.fov = nextFov;
      this.handCamera.updateProjectionMatrix();
    }
  }

  setCelestialState(timeOfDay: number, moonPhase: number): void {
    this.timeOfDay = ((timeOfDay % 1) + 1) % 1;
    this.moonPhase = ((Math.floor(moonPhase) % MOON_PHASE_COUNT) + MOON_PHASE_COUNT) % MOON_PHASE_COUNT;
    this.updateAirAtmosphere();
    this.applyViewAtmosphere();
  }

  private updateAirAtmosphere(): void {
    const orbitAngle = this.timeOfDay * Math.PI * 2;
    this.currentSunDirection.copy(ORBIT_HORIZONTAL_DIRECTION).multiplyScalar(Math.cos(orbitAngle));
    this.currentSunDirection.y = Math.sin(orbitAngle);
    this.currentSunDirection.normalize();
    this.currentMoonDirection.copy(this.currentSunDirection).multiplyScalar(-1);

    const sunHeight = this.currentSunDirection.y;
    const moonHeight = this.currentMoonDirection.y;
    const daylight = smoothstep(-0.12, 0.18, sunHeight);
    const twilight = 1 - smoothstep(0.04, 0.34, Math.abs(sunHeight));
    const directSun = smoothstep(-0.03, 0.16, sunHeight);
    const dayWeatherInfluence = clamp01(daylight + twilight * 0.42);
    const skyGrayness = clamp01(this.weatherState.skyGrayness);
    const skyBrightness = clamp01(this.weatherState.skyBrightness);
    const sunVisibility = clamp01(this.weatherState.sunVisibility);
    const fogDimming = clamp01(this.weatherState.fogDimming);
    const ambientDimming = clamp01(this.weatherState.ambientDimming);
    const stormBlend = clamp01(this.weatherState.rainIntensity * 0.68 + Math.max(0, skyGrayness - 0.55));
    const moonGlow =
      smoothstep(-0.14, 0.14, moonHeight) *
      (0.32 + (1 - daylight) * 0.58) *
      lerp(1, 0.52, skyGrayness * dayWeatherInfluence);

    this.skyTopColor.copy(this.nightSkyTopColor).lerp(this.daySkyTopColor, daylight);
    this.skyTopColor.lerp(this.twilightSkyTopColor, twilight * 0.34);
    this.skyTopColor.lerp(this.overcastSkyTopColor, skyGrayness * dayWeatherInfluence);
    this.skyTopColor.lerp(this.stormSkyTopColor, stormBlend * dayWeatherInfluence);
    this.skyHorizonColor.copy(this.nightSkyHorizonColor).lerp(this.daySkyHorizonColor, daylight);
    this.skyHorizonColor.lerp(this.twilightSkyHorizonColor, twilight * 0.66);
    this.skyHorizonColor.lerp(this.overcastSkyHorizonColor, skyGrayness * dayWeatherInfluence);
    this.skyHorizonColor.lerp(this.stormSkyHorizonColor, stormBlend * dayWeatherInfluence);
    this.skyBottomColor.copy(this.nightSkyBottomColor).lerp(this.daySkyBottomColor, daylight);
    this.skyBottomColor.lerp(this.twilightSkyBottomColor, twilight * 0.56);
    this.skyBottomColor.lerp(this.overcastSkyBottomColor, skyGrayness * dayWeatherInfluence);
    this.skyBottomColor.lerp(this.stormSkyBottomColor, stormBlend * dayWeatherInfluence);
    this.skyTopColor.multiplyScalar(lerp(1, skyBrightness, dayWeatherInfluence));
    this.skyHorizonColor.multiplyScalar(lerp(1, skyBrightness, dayWeatherInfluence));
    this.skyBottomColor.multiplyScalar(lerp(1, skyBrightness, dayWeatherInfluence));

    this.currentAirFogColor.copy(this.nightFogColor).lerp(this.airFogColor, daylight);
    this.currentAirFogColor.lerp(this.twilightFogColor, twilight * 0.42);
    this.currentAirFogColor.lerp(this.overcastFogColor, skyGrayness * dayWeatherInfluence);
    this.currentAirFogColor.lerp(this.stormFogColor, stormBlend * dayWeatherInfluence);
    this.airBackgroundColor.copy(this.nightBackgroundColor).lerp(this.daySkyHorizonColor, daylight);
    this.airBackgroundColor.lerp(this.twilightBackgroundColor, twilight * 0.32);
    this.airBackgroundColor.lerp(this.overcastBackgroundColor, skyGrayness * dayWeatherInfluence);
    this.airBackgroundColor.lerp(this.stormBackgroundColor, stormBlend * dayWeatherInfluence);

    this.airFogNear =
      lerp(AIR_FOG_NEAR_NIGHT, AIR_FOG_NEAR, daylight) *
      lerp(1, 0.82, fogDimming);
    this.airFogFar =
      lerp(AIR_FOG_FAR_NIGHT, AIR_FOG_FAR, daylight) *
      lerp(1, 0.54, fogDimming);
    this.airExposure =
      lerp(AIR_EXPOSURE_NIGHT, AIR_EXPOSURE, daylight) *
      lerp(0.76, 1, skyBrightness);
    this.airAmbientIntensity =
      (this.baseAmbientIntensity * lerp(0.18, 1, daylight) + twilight * 0.04) *
      lerp(1, 0.74, ambientDimming);
    this.airSkyBounceIntensity =
      (this.baseSkyBounceIntensity * lerp(0.14, 1, daylight) + twilight * 0.05) *
      lerp(1, 0.68, ambientDimming);
    this.airSunIntensity = this.baseSunIntensity * directSun * sunVisibility;

    this.sky.setCelestialState({
      topColor: this.skyTopColor,
      horizonColor: this.skyHorizonColor,
      bottomColor: this.skyBottomColor,
      sunDirection: this.currentSunDirection,
      moonDirection: this.currentMoonDirection,
      sunIntensity: lerp(0.18, 0.96, directSun) * sunVisibility,
      moonIntensity: moonGlow,
      moonPhase: this.moonPhase,
    });
  }

  private applyViewAtmosphere(): void {
    if (!this.underwaterEnabled) {
      this.sceneFog.color.copy(this.currentAirFogColor);
      this.sceneFog.near = this.airFogNear;
      this.sceneFog.far = this.airFogFar;
      this.renderer.toneMappingExposure = this.airExposure;
      this.renderer.setClearColor(this.airBackgroundColor);
      this.scene.background = this.airBackgroundColor;
      this.lights.ambient.intensity = this.airAmbientIntensity;
      this.lights.skyBounce.intensity = this.airSkyBounceIntensity;
      this.lights.sun.intensity = this.airSunIntensity;
      return;
    }

    const depthRatio = clamp01(this.underwaterDepth / UNDERWATER_DEPTH_FOR_MAX_ATTENUATION);
    this.waterSurfaceLineStrength = lerp(
      WATER_SURFACE_LINE_STRENGTH_SHALLOW,
      WATER_SURFACE_LINE_STRENGTH_DEEP,
      depthRatio,
    );
    if (this.waterSurfaceLineStrengthUniform) {
      this.waterSurfaceLineStrengthUniform.value = this.waterSurfaceLineStrength;
    }
    const fogColor = this.fogMixColor
      .copy(this.underwaterFogColor)
      .lerp(this.underwaterDeepFogColor, depthRatio);
    this.sceneFog.color.copy(fogColor);
    this.sceneFog.near = lerp(UNDERWATER_FOG_NEAR, UNDERWATER_DEEP_FOG_NEAR, depthRatio);
    this.sceneFog.far = lerp(UNDERWATER_FOG_FAR, UNDERWATER_DEEP_FOG_FAR, depthRatio);
    this.renderer.toneMappingExposure = lerp(
      UNDERWATER_EXPOSURE,
      UNDERWATER_DEEP_EXPOSURE,
      depthRatio,
    );
    this.renderer.setClearColor(this.sceneFog.color);
    this.scene.background = this.sceneFog.color;

    const lightScale = lerp(UNDERWATER_LIGHT_SCALE_SHALLOW, UNDERWATER_LIGHT_SCALE_DEEP, depthRatio);
    this.lights.ambient.intensity = this.airAmbientIntensity * lightScale;
    this.lights.skyBounce.intensity = this.airSkyBounceIntensity * lightScale * 0.82;
    this.lights.sun.intensity = this.airSunIntensity * lightScale * 0.7;
  }

  setUnderwaterView(enabled: boolean, depth = 0): void {
    const targetWaterSide = enabled ? DoubleSide : FrontSide;
    if (this.waterMaterial.side !== targetWaterSide) {
      this.waterMaterial.side = targetWaterSide;
      this.waterMaterial.needsUpdate = true;
    }

    this.underwaterEnabled = enabled;
    this.underwaterDepth = depth;
    this.sky.group.visible = !enabled;
    this.clouds.group.visible = !enabled;
    this.rain.group.visible = !enabled;
    if (!enabled) {
      this.waterSurfaceLineStrength = 0;
      if (this.waterSurfaceLineStrengthUniform) {
        this.waterSurfaceLineStrengthUniform.value = 0;
      }
      this.applyViewAtmosphere();
      return;
    }
    this.applyViewAtmosphere();
  }

  spawnDroppedItem(itemId: string, blockId: BlockId, x: number, y: number, z: number): void {
    const existing = this.droppedItems.get(itemId);
    if (existing) {
      this.scene.remove(existing);
      existing.geometry.dispose();
      (existing.material as MeshLambertMaterial).dispose();
    }

    const mesh = new Mesh(
      this.createDroppedItemGeometry(blockId),
      new MeshLambertMaterial({
        map: this.atlas.material.map,
        transparent: true,
        alphaTest: 0.35,
      }),
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.droppedItems.set(itemId, mesh);
  }

  updateDroppedItem(itemId: string, x: number, y: number, z: number, yaw: number, bob: number): void {
    const mesh = this.droppedItems.get(itemId);
    if (!mesh) {
      return;
    }

    mesh.position.set(x, y + bob, z);
    mesh.rotation.y = yaw;
  }

  removeDroppedItem(itemId: string): void {
    const mesh = this.droppedItems.get(itemId);
    if (!mesh) {
      return;
    }

    this.scene.remove(mesh);
    mesh.geometry.dispose();
    (mesh.material as MeshLambertMaterial).dispose();
    this.droppedItems.delete(itemId);
  }

  clearDroppedItems(): void {
    for (const itemId of [...this.droppedItems.keys()]) {
      this.removeDroppedItem(itemId);
    }
  }

  spawnBreakParticles(color: string, x: number, y: number, z: number): void {
    for (let index = 0; index < 11; index += 1) {
      const mesh = new Mesh(
        new BoxGeometry(0.08, 0.08, 0.08),
        new MeshBasicMaterial({
          color: new Color(color),
          transparent: true,
          opacity: 0.9,
        }),
      );
      mesh.position.set(
        x + 0.5 + (Math.random() - 0.5) * 0.6,
        y + 0.5 + (Math.random() - 0.5) * 0.6,
        z + 0.5 + (Math.random() - 0.5) * 0.6,
      );
      this.scene.add(mesh);

      this.breakParticles.push({
        mesh,
        velocity: new Vector3(
          (Math.random() - 0.5) * 4.5,
          Math.random() * 3.2 + 1.2,
          (Math.random() - 0.5) * 4.5,
        ),
        lifeMs: 360 + Math.random() * 260,
        maxLifeMs: 360 + Math.random() * 260,
      });
    }
  }

  updateTransientEffects(dt: number): void {
    const dtMs = dt * 1000;
    for (let index = this.breakParticles.length - 1; index >= 0; index -= 1) {
      const particle = this.breakParticles[index];
      particle.lifeMs -= dtMs;
      particle.velocity.y -= 12.5 * dt;
      particle.mesh.position.x += particle.velocity.x * dt;
      particle.mesh.position.y += particle.velocity.y * dt;
      particle.mesh.position.z += particle.velocity.z * dt;
      particle.mesh.rotation.x += dt * 8;
      particle.mesh.rotation.y += dt * 10;

      const ratio = Math.max(0, particle.lifeMs / particle.maxLifeMs);
      const material = particle.mesh.material as MeshBasicMaterial;
      material.opacity = ratio;
      particle.mesh.scale.setScalar(Math.max(0.2, ratio));

      if (particle.lifeMs <= 0) {
        this.scene.remove(particle.mesh);
        particle.mesh.geometry.dispose();
        material.dispose();
        this.breakParticles.splice(index, 1);
      }
    }
  }

  updateAnimatedTextures(dt: number): void {
    this.atlas.update(dt);
  }

  setMiningOverlay(hit: VoxelHit | null, progress: number): void {
    if (!hit || progress <= 0) {
      this.miningOverlay.visible = false;
      return;
    }

    const material = this.miningOverlay.material as MeshBasicMaterial;
    const clamped = Math.max(0, Math.min(1, progress));
    material.opacity = 0.08 + clamped * 0.4;
    this.miningOverlay.scale.setScalar(1.005 + clamped * 0.02);
    this.miningOverlay.position.set(
      hit.blockWorldX + 0.5,
      hit.blockWorldY + 0.5,
      hit.blockWorldZ + 0.5,
    );
    this.miningOverlay.visible = true;
  }

  render(): void {
    // Pass 1: world.
    this.renderer.autoClear = true;
    this.renderer.render(this.scene, this.camera);

    // Pass 2: hand overlay on top.
    if (!this.handRig.visible) {
      return;
    }
    this.renderer.autoClear = false;
    this.renderer.clearDepth();
    this.renderer.render(this.handScene, this.handCamera);
    this.renderer.autoClear = true;
  }

  private async applyPlayerSkin(dataUrl: string | null): Promise<void> {
    const requestId = ++this.skinRequestId;
    let skin = await loadSkinTexture(null);
    if (dataUrl) {
      try {
        skin = await loadSkinTexture(dataUrl);
      } catch {
        skin = await loadSkinTexture(null);
      }
    }
    if (requestId !== this.skinRequestId) {
      skin.texture.dispose();
      return;
    }

    if (this.handModel) {
      this.handRig.remove(this.handModel);
      disposeModel(this.handModel);
      this.handModel = null;
    }

    this.handModel = createFirstPersonHand(skin.texture, skin.model);
    this.handRig.add(this.handModel);
    this.handModel.visible = this.heldBlockId === null;
  }

  private createDroppedItemGeometry(blockId: BlockId): BoxGeometry {
    return this.createBlockGeometry(blockId, 0.26);
  }

  private clearHeldItemMesh(): void {
    if (!this.heldItemMesh) {
      return;
    }

    this.heldItemAnchor.remove(this.heldItemMesh);
    this.heldItemMesh.geometry.dispose();
    const material = this.heldItemMesh.material;
    if (material instanceof MeshLambertMaterial) {
      material.dispose();
    }
    this.heldItemMesh = null;
  }

  private createBlockGeometry(blockId: BlockId, edgeSize: number): BoxGeometry {
    const geometry = new BoxGeometry(edgeSize, edgeSize, edgeSize);
    const uv = geometry.getAttribute('uv');
    if (!(uv instanceof BufferAttribute)) {
      return geometry;
    }

    const definition = getBlockDefinition(blockId);
    const topRect = this.atlas.getTileRect(definition.textureTop ?? definition.textureSide ?? 'dirt');
    const sideRect = this.atlas.getTileRect(definition.textureSide ?? definition.textureTop ?? 'dirt');
    const bottomRect = this.atlas.getTileRect(
      definition.textureBottom ?? definition.textureSide ?? 'dirt',
    );
    const faces = [sideRect, sideRect, topRect, bottomRect, sideRect, sideRect] as const;

    faces.forEach((rect, faceIndex) => {
      const isSideFace = faceIndex === 0 || faceIndex === 1 || faceIndex === 4 || faceIndex === 5;
      const vTop = isSideFace ? rect.v1 : rect.v0;
      const vBottom = isSideFace ? rect.v0 : rect.v1;
      const vertexOffset = faceIndex * 4;
      uv.setXY(vertexOffset, rect.u0, vBottom);
      uv.setXY(vertexOffset + 1, rect.u1, vBottom);
      uv.setXY(vertexOffset + 2, rect.u0, vTop);
      uv.setXY(vertexOffset + 3, rect.u1, vTop);
    });
    uv.needsUpdate = true;
    return geometry;
  }
}
