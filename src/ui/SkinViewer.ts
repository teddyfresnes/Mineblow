import {
  AmbientLight,
  Box3,
  Clock,
  Color,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { createPlayerModel, disposeModel, loadSkinTexture } from '../render/SkinModel';

type SkinAnimationMode = 'spin' | 'idle' | 'showcase';

interface SkinViewerOptions {
  animated?: boolean;
  animationMode?: SkinAnimationMode;
}

interface RigPart {
  node: Group;
  basePosition: Vector3;
}

interface SkinRig {
  head: RigPart | null;
  body: RigPart | null;
  leftArm: RigPart | null;
  rightArm: RigPart | null;
  leftLeg: RigPart | null;
  rightLeg: RigPart | null;
}

interface PartRotation {
  x: number;
  y: number;
  z: number;
}

interface ShowcasePose {
  modelRotationY: number;
  modelPositionY: number;
  head: PartRotation;
  body: PartRotation;
  leftArm: PartRotation;
  rightArm: PartRotation;
  leftLeg: PartRotation;
  rightLeg: PartRotation;
}

interface ShowcasePoseOverrides {
  modelRotationY?: number;
  modelPositionY?: number;
  head?: Partial<PartRotation>;
  body?: Partial<PartRotation>;
  leftArm?: Partial<PartRotation>;
  rightArm?: Partial<PartRotation>;
  leftLeg?: Partial<PartRotation>;
  rightLeg?: Partial<PartRotation>;
}

interface ShowcaseClip {
  duration: number;
  sample: (localTime: number, progress: number) => ShowcasePose;
}

const SHOWCASE_BASE_POSE: ShowcasePose = {
  modelRotationY: -0.46,
  modelPositionY: 0,
  head: { x: 0.02, y: 0, z: 0 },
  body: { x: 0, y: 0, z: 0 },
  leftArm: { x: -0.14, y: 0, z: -0.06 },
  rightArm: { x: -0.14, y: 0, z: 0.06 },
  leftLeg: { x: 0.04, y: 0, z: 0 },
  rightLeg: { x: -0.04, y: 0, z: 0 },
};

const IS_FIREFOX = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
const ANIMATED_PIXEL_RATIO_CAP = IS_FIREFOX ? 0.9 : 1;
const STATIC_PIXEL_RATIO_CAP = IS_FIREFOX ? 0.95 : 1;
const MAX_FRAME_DELTA_SECONDS = 1 / 20;
const ANIMATED_TARGET_FPS = IS_FIREFOX ? 24 : 30;
const ANIMATED_MIN_FRAME_MS = 1000 / ANIMATED_TARGET_FPS;

export class SkinViewer {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(42, 1, 0.1, 20);
  private readonly renderer: WebGLRenderer;
  private readonly clock = new Clock();
  private readonly resizeObserver: ResizeObserver;
  private readonly animated: boolean;
  private readonly animationMode: SkinAnimationMode;
  private readonly pixelRatioCap: number;
  private readonly showcaseTimeline: ShowcaseClip[];
  private readonly showcaseCycleDuration: number;
  private readonly showcaseBlendDuration = 0.65;
  private model: Group | null = null;
  private rig: SkinRig | null = null;
  private rafId = 0;
  private skinRequestId = 0;
  private elapsedSeconds = 0;
  private active = true;
  private contextLost = false;
  private lastAnimatedRenderAt = 0;
  private disposed = false;

  constructor(
    private readonly container: HTMLElement,
    initialSkinDataUrl: string | null = null,
    options: SkinViewerOptions = {},
  ) {
    this.animated = options.animated ?? true;
    this.animationMode = options.animationMode ?? 'spin';
    this.pixelRatioCap = this.animated ? ANIMATED_PIXEL_RATIO_CAP : STATIC_PIXEL_RATIO_CAP;
    this.showcaseTimeline = this.buildShowcaseTimeline();
    this.showcaseCycleDuration = this.showcaseTimeline.reduce(
      (total, clip) => total + clip.duration,
      0,
    );
    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.pixelRatioCap));
    this.renderer.setClearColor(new Color('#000000'), 0);
    this.renderer.domElement.className = 'paperdoll-canvas';
    this.renderer.domElement.addEventListener('webglcontextlost', this.handleContextLost, false);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.handleContextRestored, false);
    this.container.append(this.renderer.domElement);

    this.camera.position.set(0, 1.02, 3.9);
    this.scene.add(new AmbientLight('#dbe9ff', 0.6));
    const key = new DirectionalLight('#ffe9bd', 1.1);
    key.position.set(3.2, 4, 2.4);
    this.scene.add(key);
    const fill = new DirectionalLight('#8ab8ff', 0.38);
    fill.position.set(-3, 2.2, -1.8);
    this.scene.add(fill);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
    this.startAnimationLoop();
    void this.setSkin(initialSkinDataUrl);
  }

  setActive(active: boolean): void {
    if (this.disposed || this.active === active) {
      return;
    }

    this.active = active;
    if (this.animated) {
      if (this.active) {
        this.startAnimationLoop();
      } else {
        this.stopAnimationLoop();
      }
      return;
    }

    if (this.active) {
      this.renderFrame();
    }
  }

  async setSkin(dataUrl: string | null): Promise<void> {
    const requestId = ++this.skinRequestId;
    let skin: Awaited<ReturnType<typeof loadSkinTexture>>;
    if (!dataUrl) {
      skin = await loadSkinTexture(null);
    } else {
      try {
        skin = await loadSkinTexture(dataUrl);
      } catch {
        skin = await loadSkinTexture(null);
      }
    }
    if (this.disposed || requestId !== this.skinRequestId) {
      skin.texture.dispose();
      return;
    }

    if (this.model) {
      this.scene.remove(this.model);
      disposeModel(this.model);
      this.model = null;
    }

    this.model = createPlayerModel(skin.texture, skin.model);
    this.rig = this.captureRig(this.model);
    this.applyPose(this.elapsedSeconds);
    this.scene.add(this.model);
    if (!this.animated && this.active) {
      this.renderFrame();
    }
  }

  dispose(): void {
    this.disposed = true;
    this.contextLost = true;
    this.resizeObserver.disconnect();
    this.stopAnimationLoop();
    this.renderer.domElement.removeEventListener('webglcontextlost', this.handleContextLost);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this.handleContextRestored);
    if (this.model) {
      this.scene.remove(this.model);
      disposeModel(this.model);
      this.model = null;
    }
    this.rig = null;
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private resize(): void {
    if (this.disposed || this.contextLost) {
      return;
    }
    const width = Math.max(20, this.container.clientWidth);
    const height = Math.max(20, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.pixelRatioCap));
    this.renderer.setSize(width, height, false);
    if (!this.animated && this.active) {
      this.renderFrame();
    }
  }

  private renderFrame(): void {
    if (this.disposed || this.contextLost || !this.active) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
  }

  private startAnimationLoop(): void {
    if (!this.animated || !this.active || this.disposed || this.contextLost || this.rafId !== 0) {
      return;
    }
    this.lastAnimatedRenderAt = 0;
    this.clock.start();
    this.clock.getDelta();
    this.rafId = requestAnimationFrame(this.animate);
  }

  private stopAnimationLoop(): void {
    if (this.rafId !== 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.clock.stop();
  }

  private readonly handleContextLost = (event: Event): void => {
    event.preventDefault();
    if (this.disposed) {
      return;
    }
    this.contextLost = true;
    this.stopAnimationLoop();
  };

  private readonly handleContextRestored = (): void => {
    if (this.disposed) {
      return;
    }
    this.contextLost = false;
    this.resize();
    if (this.animated) {
      this.startAnimationLoop();
    } else {
      this.renderFrame();
    }
  };

  private captureRig(model: Group): SkinRig {
    model.updateMatrixWorld(true);

    const parts = model.children.filter((child): child is Group => child instanceof Group);
    const createCenteredPart = (node: Group): RigPart => ({
      node,
      basePosition: node.position.clone(),
    });
    const createAnchoredPart = (node: Group): RigPart => {
      const parent = node.parent;
      if (!parent) {
        return createCenteredPart(node);
      }

      const box = new Box3().setFromObject(node);
      if (!Number.isFinite(box.min.y) || !Number.isFinite(box.max.y)) {
        return createCenteredPart(node);
      }

      // Keep the top of the limb fixed (shoulder for arms, hip for legs).
      const maxLocalY = box.max.y - node.position.y;
      const pivot = new Group();
      pivot.position.set(node.position.x, node.position.y + maxLocalY, node.position.z);
      parent.add(pivot);
      pivot.add(node);
      node.position.set(0, -maxLocalY, 0);
      return {
        node: pivot,
        basePosition: pivot.position.clone(),
      };
    };

    const readPart = (index: number): RigPart | null => {
      const node = parts[index];
      if (!node) {
        return null;
      }
      return createCenteredPart(node);
    };

    const leftArmNode = parts[2] ?? null;
    const rightArmNode = parts[3] ?? null;
    const leftLegNode = parts[4] ?? null;
    const rightLegNode = parts[5] ?? null;

    return {
      head: readPart(0),
      body: readPart(1),
      leftArm: leftArmNode ? createAnchoredPart(leftArmNode) : null,
      rightArm: rightArmNode ? createAnchoredPart(rightArmNode) : null,
      leftLeg: leftLegNode ? createAnchoredPart(leftLegNode) : null,
      rightLeg: rightLegNode ? createAnchoredPart(rightLegNode) : null,
    };
  }

  private resetPose(): void {
    if (!this.model) {
      return;
    }

    this.model.rotation.set(0, 0, 0);
    this.model.position.y = 0;

    if (!this.rig) {
      return;
    }

    const resetPart = (part: RigPart | null): void => {
      if (!part) {
        return;
      }
      part.node.rotation.set(0, 0, 0);
      part.node.position.copy(part.basePosition);
    };

    resetPart(this.rig.head);
    resetPart(this.rig.body);
    resetPart(this.rig.leftArm);
    resetPart(this.rig.rightArm);
    resetPart(this.rig.leftLeg);
    resetPart(this.rig.rightLeg);
  }

  private applyPose(timeSeconds: number): void {
    if (!this.model) {
      return;
    }

    this.resetPose();
    switch (this.animationMode) {
      case 'idle':
        this.applyIdlePose(timeSeconds);
        break;
      case 'showcase':
        this.applyShowcasePose(timeSeconds);
        break;
      case 'spin':
      default:
        this.applySpinPose(timeSeconds);
        break;
    }
  }

  private applySpinPose(timeSeconds: number): void {
    if (!this.model) {
      return;
    }

    this.model.rotation.y = -0.6 + timeSeconds * 0.55;
    this.model.position.y = Math.sin(timeSeconds * 1.8) * 0.03;
  }

  private applyIdlePose(timeSeconds: number): void {
    if (!this.model) {
      return;
    }

    const sway = Math.sin(timeSeconds * 0.75);
    const breathe = Math.sin(timeSeconds * 2.1);
    this.model.rotation.y = -0.46 + sway * 0.14;
    this.model.position.y = breathe * 0.02;

    this.setPartRotation(this.rig?.head, Math.sin(timeSeconds * 0.9) * 0.04, sway * 0.2, 0);
    this.setPartRotation(
      this.rig?.leftArm,
      -0.08 + Math.sin(timeSeconds * 1.2 + Math.PI) * 0.08,
      0,
      -0.03,
    );
    this.setPartRotation(
      this.rig?.rightArm,
      -0.08 + Math.sin(timeSeconds * 1.2) * 0.08,
      0,
      0.03,
    );
    this.setPartRotation(this.rig?.leftLeg, Math.sin(timeSeconds * 1.2) * 0.04, 0, 0);
    this.setPartRotation(this.rig?.rightLeg, Math.sin(timeSeconds * 1.2 + Math.PI) * 0.04, 0, 0);
  }

  private applyShowcasePose(timeSeconds: number): void {
    if (!this.model || this.showcaseTimeline.length === 0 || this.showcaseCycleDuration <= 0) {
      return;
    }

    const cycleTime =
      ((timeSeconds % this.showcaseCycleDuration) + this.showcaseCycleDuration) %
      this.showcaseCycleDuration;

    let elapsed = 0;
    let clipIndex = this.showcaseTimeline.length - 1;
    for (let index = 0; index < this.showcaseTimeline.length; index += 1) {
      const clip = this.showcaseTimeline[index];
      if (cycleTime < elapsed + clip.duration) {
        clipIndex = index;
        break;
      }
      elapsed += clip.duration;
    }

    const clip = this.showcaseTimeline[clipIndex];
    const localTime = cycleTime - elapsed;
    const progress = clip.duration > 0 ? this.clamp01(localTime / clip.duration) : 0;
    let pose = clip.sample(localTime, progress);

    const blendWindow = Math.min(this.showcaseBlendDuration, clip.duration * 0.45);
    if (blendWindow > 0 && localTime >= clip.duration - blendWindow) {
      const nextClip = this.showcaseTimeline[(clipIndex + 1) % this.showcaseTimeline.length];
      const blendT = this.smooth((localTime - (clip.duration - blendWindow)) / blendWindow);
      // Blend toward the exact entry pose of the next clip to avoid pre-playing
      // part of the next animation, which caused visible "repeat/restart" beats.
      const previewTime = 0;
      const previewProgress = 0;
      const nextPose = nextClip.sample(previewTime, previewProgress);
      pose = this.blendPose(pose, nextPose, blendT);
    }

    this.applyShowcasePoseState(pose);
  }

  private buildShowcaseTimeline(): ShowcaseClip[] {
    return [
      { duration: 6.4, sample: (localTime, progress) => this.sampleShowcaseSurvey(localTime, progress) },
      { duration: 5.8, sample: (localTime, progress) => this.sampleShowcaseWave(localTime, progress) },
      { duration: 6.6, sample: (localTime, progress) => this.sampleShowcaseRun(localTime, progress) },
      { duration: 6.2, sample: (localTime, progress) => this.sampleShowcaseCrouch(localTime, progress) },
      { duration: 6.8, sample: (localTime, progress) => this.sampleShowcaseTurn(localTime, progress) },
      { duration: 7.4, sample: (localTime, progress) => this.sampleShowcaseGroove(localTime, progress) },
    ];
  }

  private sampleShowcaseSurvey(localTime: number, progress: number): ShowcasePose {
    const envelope = Math.sin(progress * Math.PI);
    const sway = Math.sin(localTime * 1.08);
    const breathe = Math.sin(localTime * 2.02);
    return this.createShowcasePose({
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY + sway * 0.24 * envelope,
      modelPositionY: breathe * 0.022,
      head: {
        x: SHOWCASE_BASE_POSE.head.x + breathe * 0.048,
        y: sway * 0.62 * envelope,
      },
      leftArm: {
        x: SHOWCASE_BASE_POSE.leftArm.x + Math.sin(localTime * 1.35 + Math.PI) * 0.1 * envelope,
        z: -0.1,
      },
      rightArm: {
        x: SHOWCASE_BASE_POSE.rightArm.x + Math.sin(localTime * 1.35) * 0.1 * envelope,
        z: 0.1,
      },
      leftLeg: { x: Math.sin(localTime * 1.35) * 0.06 * envelope },
      rightLeg: { x: Math.sin(localTime * 1.35 + Math.PI) * 0.06 * envelope },
    });
  }

  private sampleShowcaseWave(localTime: number, progress: number): ShowcasePose {
    const envelope = Math.sin(progress * Math.PI);
    const wave = Math.sin(localTime * 7.4);
    const sway = Math.sin(localTime * 2.1);
    return this.createShowcasePose({
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY + envelope * 0.28,
      modelPositionY: Math.sin(localTime * 4.3) * 0.018 * envelope,
      body: { z: 0.08 * envelope },
      head: { x: -0.06 * envelope, y: 0.28 * envelope + sway * 0.18 * envelope },
      leftArm: {
        x: SHOWCASE_BASE_POSE.leftArm.x + 0.12 * envelope + Math.sin(localTime * 1.8 + Math.PI) * 0.08 * envelope,
        z: -0.14,
      },
      rightArm: {
        x: SHOWCASE_BASE_POSE.rightArm.x - 1.05 * envelope + wave * 0.2 * envelope,
        y: -0.08 * envelope,
        z: 0.16 + 0.48 * envelope + wave * 0.14 * envelope,
      },
      leftLeg: { x: Math.sin(localTime * 1.8 + Math.PI) * 0.05 * envelope },
      rightLeg: { x: Math.sin(localTime * 1.8) * 0.05 * envelope },
    });
  }

  private sampleShowcaseRun(localTime: number, progress: number): ShowcasePose {
    const envelope = Math.sin(progress * Math.PI);
    const stride = Math.sin(localTime * 7.2);
    const bounce = Math.abs(Math.sin(localTime * 7.2));
    const armSwing = stride * 1.02 * envelope;
    const legSwing = stride * 0.88 * envelope;
    const outward = 0.24 + Math.abs(stride) * 0.08;
    return this.createShowcasePose({
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY + Math.sin(localTime * 3.6) * 0.07 * envelope,
      modelPositionY: bounce * 0.055 * envelope,
      body: { x: bounce * 0.06 * envelope },
      head: { x: -0.03 * envelope, y: Math.sin(localTime * 2.4) * 0.14 * envelope },
      leftArm: {
        x: SHOWCASE_BASE_POSE.leftArm.x + armSwing,
        y: 0.1 * envelope,
        z: -outward,
      },
      rightArm: {
        x: SHOWCASE_BASE_POSE.rightArm.x - armSwing,
        y: -0.1 * envelope,
        z: outward,
      },
      leftLeg: { x: -legSwing },
      rightLeg: { x: legSwing },
    });
  }

  private sampleShowcaseCrouch(localTime: number, progress: number): ShowcasePose {
    const envelope = Math.sin(progress * Math.PI);
    const crouchPulse = Math.sin(localTime * 2.8) * 0.006 * envelope;
    const crouchDepth = 0.08 * envelope + crouchPulse;
    return this.createShowcasePose({
      // Keep the character upright in yaw; crouch is driven by torso pitch only.
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY,
      modelPositionY: -crouchDepth,
      body: { x: 0.34 * envelope, z: 0 },
      head: { x: -0.1 * envelope, y: 0 },
      leftArm: {
        x: 0.22 * envelope,
        z: -0.1,
      },
      rightArm: {
        x: 0.22 * envelope,
        z: 0.1,
      },
      leftLeg: { x: 0, y: 0, z: 0 },
      rightLeg: { x: 0, y: 0, z: 0 },
    });
  }

  private sampleShowcaseTurn(localTime: number, progress: number): ShowcasePose {
    const turn = Math.sin(progress * Math.PI);
    const sway = Math.sin(localTime * 2.2);
    return this.createShowcasePose({
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY + turn * Math.PI * 0.95 + sway * 0.07 * (1 - turn),
      modelPositionY: Math.sin(localTime * 3.2) * 0.016 * turn,
      head: { y: -0.5 * turn + sway * 0.24 * turn },
      leftArm: { x: -0.2 + turn * 0.12, z: -0.12 },
      rightArm: { x: -0.2 + turn * 0.12, z: 0.12 },
      leftLeg: { x: Math.sin(localTime * 1.85) * 0.08 * turn },
      rightLeg: { x: Math.sin(localTime * 1.85 + Math.PI) * 0.08 * turn },
    });
  }

  private sampleShowcaseGroove(localTime: number, progress: number): ShowcasePose {
    const envelope = Math.sin(progress * Math.PI);
    const beat = localTime * 4.2;
    const pulse = Math.sin(beat);
    const pulseOffset = Math.sin(beat + Math.PI / 2);
    const side = Math.sin(localTime * 1.6);
    return this.createShowcasePose({
      modelRotationY: SHOWCASE_BASE_POSE.modelRotationY + side * 0.22 * envelope,
      modelPositionY: 0.012 * envelope + Math.max(0, pulse) * 0.045 * envelope,
      body: { z: pulse * 0.1 * envelope },
      head: { x: pulseOffset * 0.08 * envelope, y: side * 0.32 * envelope },
      leftArm: {
        x: 0.06 + Math.sin(beat + Math.PI * 0.4) * 0.5 * envelope,
        z: -0.22 - pulse * 0.1 * envelope,
      },
      rightArm: {
        x: 0.06 + Math.sin(beat + Math.PI * 1.4) * 0.5 * envelope,
        z: 0.22 + pulse * 0.1 * envelope,
      },
      leftLeg: { x: Math.sin(beat + Math.PI) * 0.32 * envelope },
      rightLeg: { x: Math.sin(beat) * 0.32 * envelope },
    });
  }

  private createShowcasePose(overrides: ShowcasePoseOverrides): ShowcasePose {
    return {
      modelRotationY: overrides.modelRotationY ?? SHOWCASE_BASE_POSE.modelRotationY,
      modelPositionY: overrides.modelPositionY ?? SHOWCASE_BASE_POSE.modelPositionY,
      head: this.mergeShowcasePart(SHOWCASE_BASE_POSE.head, overrides.head),
      body: this.mergeShowcasePart(SHOWCASE_BASE_POSE.body, overrides.body),
      leftArm: this.mergeShowcasePart(SHOWCASE_BASE_POSE.leftArm, overrides.leftArm),
      rightArm: this.mergeShowcasePart(SHOWCASE_BASE_POSE.rightArm, overrides.rightArm),
      leftLeg: this.mergeShowcasePart(SHOWCASE_BASE_POSE.leftLeg, overrides.leftLeg),
      rightLeg: this.mergeShowcasePart(SHOWCASE_BASE_POSE.rightLeg, overrides.rightLeg),
    };
  }

  private mergeShowcasePart(base: PartRotation, override?: Partial<PartRotation>): PartRotation {
    return {
      x: override?.x ?? base.x,
      y: override?.y ?? base.y,
      z: override?.z ?? base.z,
    };
  }

  private blendShowcasePart(from: PartRotation, to: PartRotation, t: number): PartRotation {
    return {
      x: this.lerp(from.x, to.x, t),
      y: this.lerp(from.y, to.y, t),
      z: this.lerp(from.z, to.z, t),
    };
  }

  private blendPose(from: ShowcasePose, to: ShowcasePose, t: number): ShowcasePose {
    return {
      modelRotationY: this.lerp(from.modelRotationY, to.modelRotationY, t),
      modelPositionY: this.lerp(from.modelPositionY, to.modelPositionY, t),
      head: this.blendShowcasePart(from.head, to.head, t),
      body: this.blendShowcasePart(from.body, to.body, t),
      leftArm: this.blendShowcasePart(from.leftArm, to.leftArm, t),
      rightArm: this.blendShowcasePart(from.rightArm, to.rightArm, t),
      leftLeg: this.blendShowcasePart(from.leftLeg, to.leftLeg, t),
      rightLeg: this.blendShowcasePart(from.rightLeg, to.rightLeg, t),
    };
  }

  private applyShowcasePoseState(pose: ShowcasePose): void {
    if (!this.model) {
      return;
    }
    this.model.rotation.y = pose.modelRotationY;
    this.model.position.y = pose.modelPositionY;
    this.setPartRotation(this.rig?.head, pose.head.x, pose.head.y, pose.head.z);
    this.setPartRotation(this.rig?.body, pose.body.x, pose.body.y, pose.body.z);
    this.setPartRotation(this.rig?.leftArm, pose.leftArm.x, pose.leftArm.y, pose.leftArm.z);
    this.setPartRotation(this.rig?.rightArm, pose.rightArm.x, pose.rightArm.y, pose.rightArm.z);
    this.setPartRotation(this.rig?.leftLeg, pose.leftLeg.x, pose.leftLeg.y, pose.leftLeg.z);
    this.setPartRotation(this.rig?.rightLeg, pose.rightLeg.x, pose.rightLeg.y, pose.rightLeg.z);
  }

  private setPartRotation(
    part: RigPart | null | undefined,
    x: number,
    y = 0,
    z = 0,
  ): void {
    if (!part) {
      return;
    }
    part.node.rotation.set(x, y, z);
    part.node.position.copy(part.basePosition);
  }

  private clamp01(value: number): number {
    return Math.max(0, Math.min(1, value));
  }

  private smooth(value: number): number {
    const clamped = this.clamp01(value);
    return clamped * clamped * (3 - 2 * clamped);
  }

  private lerp(from: number, to: number, t: number): number {
    return from + (to - from) * t;
  }

  private animate = (timestamp: number): void => {
    if (this.disposed || !this.animated || !this.active || this.contextLost) {
      this.rafId = 0;
      return;
    }
    this.rafId = requestAnimationFrame(this.animate);
    if (
      this.lastAnimatedRenderAt !== 0 &&
      timestamp - this.lastAnimatedRenderAt < ANIMATED_MIN_FRAME_MS
    ) {
      return;
    }
    this.lastAnimatedRenderAt = timestamp;
    this.elapsedSeconds += Math.min(this.clock.getDelta(), MAX_FRAME_DELTA_SECONDS);
    this.applyPose(this.elapsedSeconds);
    this.renderFrame();
  };
}
