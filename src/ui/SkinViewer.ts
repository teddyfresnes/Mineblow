import {
  AmbientLight,
  Clock,
  Color,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { createPlayerModel, disposeModel, loadSkinTexture } from '../render/SkinModel';

export class SkinViewer {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(38, 1, 0.1, 20);
  private readonly renderer: WebGLRenderer;
  private readonly clock = new Clock();
  private readonly resizeObserver: ResizeObserver;
  private model: Group | null = null;
  private rafId = 0;
  private skinRequestId = 0;
  private disposed = false;

  constructor(private readonly container: HTMLElement) {
    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(new Color('#000000'), 0);
    this.renderer.domElement.className = 'paperdoll-canvas';
    this.container.append(this.renderer.domElement);

    this.camera.position.set(0, 1.6, 3.1);
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
    this.animate();
    void this.setSkin(null);
  }

  async setSkin(dataUrl: string | null): Promise<void> {
    const requestId = ++this.skinRequestId;
    let skin = await loadSkinTexture(null);
    if (dataUrl) {
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
    this.model.position.y = 0;
    this.scene.add(this.model);
  }

  dispose(): void {
    this.disposed = true;
    this.resizeObserver.disconnect();
    cancelAnimationFrame(this.rafId);
    if (this.model) {
      this.scene.remove(this.model);
      disposeModel(this.model);
      this.model = null;
    }
    this.renderer.dispose();
  }

  private resize(): void {
    const width = Math.max(20, this.container.clientWidth);
    const height = Math.max(20, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(width, height, false);
  }

  private animate = (): void => {
    this.rafId = requestAnimationFrame(this.animate);
    const dt = this.clock.getDelta();
    if (this.model) {
      this.model.rotation.y += dt * 0.55;
      this.model.position.y = Math.sin(performance.now() * 0.0018) * 0.03;
    }
    this.renderer.render(this.scene, this.camera);
  };
}
