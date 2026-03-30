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
  TextureLoader,
  BoxGeometry,
} from 'three';
import { SUN_DIRECTION } from './SceneLights';

const SUN_TEXTURE_URL = new URL('../../assets/textures/environment/sun.png', import.meta.url).href;
const SUN_DISTANCE = 220;
const SUN_SIZE = 40;
const sunTextureLoader = new TextureLoader();

export class SkyDome {
  readonly group = new Group();

  constructor() {
    const skyMaterial = new ShaderMaterial({
      side: BackSide,
      uniforms: {
        topColor: { value: new Color('#7eb8f7') },
        horizonColor: { value: new Color('#c9e6ff') },
        bottomColor: { value: new Color('#f7ddb1') },
        sunDirection: { value: SUN_DIRECTION.clone() },
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
        varying vec3 vWorldPosition;
        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = dir.y * 0.5 + 0.5;
          vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.45, h));
          color = mix(color, topColor, smoothstep(0.45, 1.0, h));
          float sunDot = max(dot(dir, normalize(sunDirection)), 0.0);
          float sunGlow = smoothstep(0.985, 0.9992, sunDot);
          float halo = pow(sunDot, 26.0);
          float rays = pow(sunDot, 9.0) * (0.5 + 0.5 * sin(atan(dir.x - sunDirection.x, dir.y - sunDirection.y) * 16.0));
          color += vec3(1.0, 0.88, 0.62) * sunGlow * 0.12;
          color += vec3(1.0, 0.82, 0.48) * halo * 0.24;
          color += vec3(1.0, 0.86, 0.65) * rays * 0.06;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });

    const skySphere = new Mesh(new SphereGeometry(280, 24, 16), skyMaterial);
    skySphere.frustumCulled = false;
    this.group.add(skySphere);

    const sunTexture = sunTextureLoader.load(SUN_TEXTURE_URL);
    sunTexture.colorSpace = SRGBColorSpace;
    sunTexture.generateMipmaps = false;
    sunTexture.minFilter = LinearFilter;
    sunTexture.magFilter = LinearFilter;
    sunTexture.wrapS = ClampToEdgeWrapping;
    sunTexture.wrapT = ClampToEdgeWrapping;

    const sunMaterial = new MeshBasicMaterial({
      map: sunTexture,
      color: '#fff5d0',
      transparent: true,
      blending: AdditiveBlending,
      side: DoubleSide,
      fog: false,
      depthWrite: false,
      toneMapped: false,
    });
    const sun = new Mesh(new PlaneGeometry(SUN_SIZE, SUN_SIZE), sunMaterial);
    sun.position.copy(SUN_DIRECTION).multiplyScalar(SUN_DISTANCE);
    sun.lookAt(0, 0, 0);
    sun.frustumCulled = false;
    sun.renderOrder = 1;
    this.group.add(sun);

    const cloudMaterial = new MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const cloudGeometry = new BoxGeometry(10, 2.4, 6);
    const cloudPositions = [
      [-70, 54, -50],
      [48, 60, -20],
      [96, 58, 36],
      [-108, 62, 18],
      [8, 56, 88],
      [-34, 64, 104],
    ] as const;

    cloudPositions.forEach(([x, y, z], index) => {
      const cloud = new Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(x, y, z);
      cloud.scale.set(1.4 + (index % 3) * 0.24, 1, 1.15 + (index % 2) * 0.18);
      cloud.rotation.y = index * 0.28;
      this.group.add(cloud);
    });
  }

  update(cameraX: number, cameraZ: number): void {
    this.group.position.set(cameraX, 0, cameraZ);
  }
}
