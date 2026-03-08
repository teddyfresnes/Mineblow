import {
  BackSide,
  Clock,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three';

const PANORAMA_URLS = [
  new URL('../../assets/textures/gui/title/background/panorama_0.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_1.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_2.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_3.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_4.png', import.meta.url).href,
  new URL('../../assets/textures/gui/title/background/panorama_5.png', import.meta.url).href,
] as const;

export class MenuPanorama {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(85, 1, 0.05, 10);
  private readonly renderer: WebGLRenderer;
  private readonly resizeObserver: ResizeObserver;
  private readonly clock = new Clock();
  private readonly root = new Group();
  private readonly planes: Mesh[] = [];
  private readonly materials: MeshBasicMaterial[];
  private readonly baseQuaternion = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI);
  private readonly pitchQuaternion = new Quaternion();
  private readonly yawQuaternion = new Quaternion();
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

    const loader = new TextureLoader();
    this.materials = PANORAMA_URLS.map((url) => {
      const texture = loader.load(url);
      texture.colorSpace = SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.magFilter = LinearFilter;
      texture.minFilter = LinearMipmapLinearFilter;
      return new MeshBasicMaterial({
        map: texture,
        side: BackSide,
      });
    });

    this.buildPanorama();
    this.scene.add(this.root);

    this.camera.position.set(0, 0, 0);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();
    this.animate();
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    this.planes.forEach((plane) => {
      plane.geometry.dispose();
    });
    this.materials.forEach((material) => {
      material.map?.dispose();
      material.dispose();
    });
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

  private animate = (): void => {
    if (this.disposed) {
      return;
    }

    this.rafId = requestAnimationFrame(this.animate);
    const elapsedSeconds = this.clock.getElapsedTime();
    const pitch = ((25 + Math.sin(elapsedSeconds * 0.02) * 5) * Math.PI) / 180;
    const yaw = (-elapsedSeconds * 2 * Math.PI) / 180;
    this.root.quaternion
      .copy(this.baseQuaternion)
      .multiply(this.pitchQuaternion.setFromAxisAngle(MenuPanorama.X_AXIS, pitch))
      .multiply(this.yawQuaternion.setFromAxisAngle(MenuPanorama.Y_AXIS, yaw));
    this.renderer.render(this.scene, this.camera);
  };

  private buildPanorama(): void {
    // Matches vanilla panorama face order: front, right, back, left, bottom, top.
    this.addFace(this.materials[0], 0, 0, 1, 0, 0, 0);
    this.addFace(this.materials[1], 1, 0, 0, 0, -Math.PI / 2, 0);
    this.addFace(this.materials[2], 0, 0, -1, 0, Math.PI, 0);
    this.addFace(this.materials[3], -1, 0, 0, 0, Math.PI / 2, 0);
    this.addFace(this.materials[4], 0, -1, 0, Math.PI / 2, 0, 0);
    this.addFace(this.materials[5], 0, 1, 0, -Math.PI / 2, 0, 0);
  }

  private addFace(
    material: MeshBasicMaterial,
    x: number,
    y: number,
    z: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
  ): void {
    const plane = new Mesh(new PlaneGeometry(2.01, 2.01), material);
    plane.position.set(x, y, z);
    plane.rotation.set(rotationX, rotationY, rotationZ);
    plane.frustumCulled = false;
    this.planes.push(plane);
    this.root.add(plane);
  }

  private static readonly X_AXIS = new Vector3(1, 0, 0);
  private static readonly Y_AXIS = new Vector3(0, 1, 0);
}
