import {
  ACESFilmicToneMapping,
  BoxGeometry,
  BufferGeometry,
  Color,
  Fog,
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
import type { VoxelHit } from '../types/world';
import { addSceneLights, type SceneLights, updateSunForCamera } from './SceneLights';
import { createFirstPersonHand, disposeModel, loadSkinTexture } from './SkinModel';
import { SkyDome } from './SkyDome';
import { TextureAtlas } from './TextureAtlas';

export class Renderer {
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(75, 1, 0.1, 500);
  readonly atlas = new TextureAtlas();
  readonly sky = new SkyDome();

  private readonly renderer: WebGLRenderer;
  private readonly chunkMeshes = new Map<string, Mesh>();
  private readonly droppedItems = new Map<string, Mesh>();
  private readonly breakParticles: Array<{
    mesh: Mesh;
    velocity: Vector3;
    lifeMs: number;
    maxLifeMs: number;
  }> = [];
  private readonly lights: SceneLights;
  private readonly miningOverlay: Mesh;
  private readonly handRig = new Group();
  private handModel: Group | null = null;
  private handPhase = 0;
  private skinRequestId = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: false,
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
    this.renderer.toneMappingExposure = 1.03;
    this.renderer.setClearColor(new Color(WORLD_CONFIG.skyColor));
    this.scene.background = new Color(WORLD_CONFIG.skyColor);
    this.scene.fog = new Fog(new Color('#95b9dd'), 60, 190);
    this.scene.add(this.sky.group);
    this.camera.add(this.handRig);
    this.handRig.position.set(0.54, -0.55, -0.86);
    this.handRig.rotation.set(0, 0.1, -0.12);
    this.handRig.scale.set(1.5, 1.5, 1.5);
    this.lights = addSceneLights(this.scene);
    updateSunForCamera(this.lights, 0, 0);
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
    this.sky.update(position.x, position.z);
    updateSunForCamera(this.lights, position.x, position.z);
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

    const mesh = new Mesh(geometry, this.atlas.material);
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

  updateHand(dt: number, movementIntensity: number, miningActive: boolean): void {
    this.handPhase += dt * (4.6 + movementIntensity * 8);
    const swingX = Math.sin(this.handPhase) * (0.035 + movementIntensity * 0.1);
    const swingY = Math.abs(Math.cos(this.handPhase * 0.75)) * movementIntensity * 0.08;
    const miningKick = miningActive ? Math.sin(this.handPhase * 2.8) * 0.15 : 0;

    this.handRig.position.x = 0.54 + swingX + miningKick * 0.35;
    this.handRig.position.y = -0.55 - swingY + (miningActive ? 0.03 : 0);
    this.handRig.rotation.z = -0.12 - miningKick * 0.5;
    this.handRig.rotation.x = -0.12 - movementIntensity * 0.05 - miningKick;
  }

  spawnDroppedItem(itemId: string, color: string, x: number, y: number, z: number): void {
    const existing = this.droppedItems.get(itemId);
    if (existing) {
      this.scene.remove(existing);
      existing.geometry.dispose();
      (existing.material as MeshLambertMaterial).dispose();
    }

    const mesh = new Mesh(
      new BoxGeometry(0.26, 0.26, 0.26),
      new MeshLambertMaterial({
        color: new Color(color),
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
    this.renderer.render(this.scene, this.camera);
  }

  private async applyPlayerSkin(dataUrl: string | null): Promise<void> {
    const requestId = ++this.skinRequestId;
    let texture = await loadSkinTexture(null);
    if (dataUrl) {
      try {
        texture = await loadSkinTexture(dataUrl);
      } catch {
        texture = await loadSkinTexture(null);
      }
    }
    if (requestId !== this.skinRequestId) {
      texture.dispose();
      return;
    }

    if (this.handModel) {
      this.handRig.remove(this.handModel);
      disposeModel(this.handModel);
      this.handModel = null;
    }

    this.handModel = createFirstPersonHand(texture);
    this.handRig.add(this.handModel);
  }
}
