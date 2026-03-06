import {
  BackSide,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  SphereGeometry,
  BoxGeometry,
} from 'three';

export class SkyDome {
  readonly group = new Group();

  constructor() {
    const skyMaterial = new ShaderMaterial({
      side: BackSide,
      uniforms: {
        topColor: { value: new Color('#7eb8f7') },
        horizonColor: { value: new Color('#c9e6ff') },
        bottomColor: { value: new Color('#f7ddb1') },
        sunDirection: { value: { x: 0.28, y: 0.82, z: 0.46 } },
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
          float sunDisc = smoothstep(0.992, 0.9994, sunDot);
          float halo = pow(sunDot, 26.0);
          float rays = pow(sunDot, 9.0) * (0.5 + 0.5 * sin(atan(dir.x - sunDirection.x, dir.y - sunDirection.y) * 16.0));
          color += vec3(1.0, 0.88, 0.62) * sunDisc * 0.95;
          color += vec3(1.0, 0.82, 0.48) * halo * 0.3;
          color += vec3(1.0, 0.86, 0.65) * rays * 0.08;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
    });

    const skySphere = new Mesh(new SphereGeometry(280, 24, 16), skyMaterial);
    skySphere.frustumCulled = false;
    this.group.add(skySphere);

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
