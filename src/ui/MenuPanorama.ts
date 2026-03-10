import {
  Clock,
  CubeTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

const PANORAMA_FACE_URLS = [
  new URL('../../assets/textures/gui/title/background/panorama_0.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_1.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_2.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_3.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_4.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_5.png', import.meta.url).href,
] as const;

const CUBEMAP_FACE_SOURCE_INDEX = [
  1, // +X
  3, // -X
  4, // +Y
  5, // -Y
  0, // +Z
  2, // -Z
] as const;

export class MenuPanorama {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(85, 1, 0.05, 10);
  private readonly renderer: WebGLRenderer;
  private readonly resizeObserver: ResizeObserver;
  private readonly clock = new Clock();
  private readonly cubeTexture = new CubeTexture();
  private rafId = 0;
  private disposed = false;

  constructor(private readonly container: HTMLElement) {
    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.domElement.className = 'menu-panorama-canvas';
    this.container.append(this.renderer.domElement);

    this.cubeTexture.colorSpace = SRGBColorSpace;
    this.cubeTexture.generateMipmaps = true;
    this.cubeTexture.magFilter = LinearFilter;
    this.cubeTexture.minFilter = LinearMipmapLinearFilter;
    this.cubeTexture.needsUpdate = true;
    this.scene.background = this.cubeTexture;
    void this.loadCubeTexture();
    this.camera.position.set(0, 0, 0);
    this.camera.rotation.order = 'YXZ';
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
    this.animate();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    this.scene.background = null;
    this.cubeTexture.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private resize(): void {
    const width = Math.max(20, this.container.clientWidth);
    const height = Math.max(20, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(width, height, false);
  }

  private async loadCubeTexture(): Promise<void> {
    try {
      const faces = await Promise.all(
        CUBEMAP_FACE_SOURCE_INDEX.map((sourceIndex) =>
          this.loadPanoramaFace(PANORAMA_FACE_URLS[sourceIndex]),
        ),
      );
      if (this.disposed) {
        return;
      }
      this.cubeTexture.images = faces;
      this.cubeTexture.needsUpdate = true;
    } catch {
      // Keep transparent background if any panorama face fails to load.
    }
  }

  private async loadPanoramaFace(url: string): Promise<HTMLImageElement> {
    return this.loadImage(url);
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load panorama face: ${url}`));
      image.src = url;
    });
  }

  private animate = (): void => {
    if (this.disposed) {
      return;
    }

    this.rafId = requestAnimationFrame(this.animate);
    const elapsedSeconds = this.clock.getElapsedTime();
    const pitch = ((25 + Math.sin(elapsedSeconds * 0.02) * 5) * Math.PI) / 180;
    const yaw = (elapsedSeconds * 2 * Math.PI) / 180;
    this.camera.rotation.x = -pitch;
    this.camera.rotation.y = yaw;
    this.camera.rotation.z = 0;
    this.renderer.render(this.scene, this.camera);
  };
}
