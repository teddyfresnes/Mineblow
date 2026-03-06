import {
  BoxGeometry,
  CanvasTexture,
  Group,
  LinearFilter,
  Mesh,
  MeshLambertMaterial,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
  type BufferGeometry,
} from 'three';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CuboidUv {
  right: Rect;
  left: Rect;
  top: Rect;
  bottom: Rect;
  front: Rect;
  back: Rect;
}

const TEXTURE_SIZE = 64;

const HEAD_UV: CuboidUv = {
  right: { x: 0, y: 8, w: 8, h: 8 },
  left: { x: 16, y: 8, w: 8, h: 8 },
  top: { x: 8, y: 0, w: 8, h: 8 },
  bottom: { x: 16, y: 0, w: 8, h: 8 },
  front: { x: 8, y: 8, w: 8, h: 8 },
  back: { x: 24, y: 8, w: 8, h: 8 },
};

const BODY_UV: CuboidUv = {
  right: { x: 16, y: 20, w: 4, h: 12 },
  left: { x: 28, y: 20, w: 4, h: 12 },
  top: { x: 20, y: 16, w: 8, h: 4 },
  bottom: { x: 28, y: 16, w: 8, h: 4 },
  front: { x: 20, y: 20, w: 8, h: 12 },
  back: { x: 32, y: 20, w: 8, h: 12 },
};

const RIGHT_ARM_UV: CuboidUv = {
  right: { x: 40, y: 20, w: 4, h: 12 },
  left: { x: 48, y: 20, w: 4, h: 12 },
  top: { x: 44, y: 16, w: 4, h: 4 },
  bottom: { x: 48, y: 16, w: 4, h: 4 },
  front: { x: 44, y: 20, w: 4, h: 12 },
  back: { x: 52, y: 20, w: 4, h: 12 },
};

const LEFT_ARM_UV: CuboidUv = {
  right: { x: 32, y: 52, w: 4, h: 12 },
  left: { x: 40, y: 52, w: 4, h: 12 },
  top: { x: 36, y: 48, w: 4, h: 4 },
  bottom: { x: 40, y: 48, w: 4, h: 4 },
  front: { x: 36, y: 52, w: 4, h: 12 },
  back: { x: 44, y: 52, w: 4, h: 12 },
};

const RIGHT_LEG_UV: CuboidUv = {
  right: { x: 0, y: 20, w: 4, h: 12 },
  left: { x: 8, y: 20, w: 4, h: 12 },
  top: { x: 4, y: 16, w: 4, h: 4 },
  bottom: { x: 8, y: 16, w: 4, h: 4 },
  front: { x: 4, y: 20, w: 4, h: 12 },
  back: { x: 12, y: 20, w: 4, h: 12 },
};

const LEFT_LEG_UV: CuboidUv = {
  right: { x: 16, y: 52, w: 4, h: 12 },
  left: { x: 24, y: 52, w: 4, h: 12 },
  top: { x: 20, y: 48, w: 4, h: 4 },
  bottom: { x: 24, y: 48, w: 4, h: 4 },
  front: { x: 20, y: 52, w: 4, h: 12 },
  back: { x: 28, y: 52, w: 4, h: 12 },
};

const createDefaultSkinCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return canvas;
  }

  context.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  context.fillStyle = '#d9ab84';
  context.fillRect(8, 8, 8, 8);
  context.fillStyle = '#6098d9';
  context.fillRect(20, 20, 8, 12);
  context.fillStyle = '#4f7dbf';
  context.fillRect(4, 20, 4, 12);
  context.fillRect(44, 20, 4, 12);
  context.fillStyle = '#3a4f78';
  context.fillRect(4, 20, 4, 12);
  context.fillRect(20, 52, 4, 12);
  context.fillRect(36, 52, 4, 12);
  return canvas;
};

const createTextureFromCanvas = (canvas: HTMLCanvasElement): CanvasTexture => {
  const texture = new CanvasTexture(canvas);
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearFilter;
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
};

export const loadSkinTexture = async (dataUrl: string | null): Promise<CanvasTexture> => {
  if (!dataUrl) {
    return createTextureFromCanvas(createDefaultSkinCanvas());
  }

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const nextImage = new Image();
    nextImage.onload = () => resolve(nextImage);
    nextImage.onerror = () => reject(new Error('Skin image load error'));
    nextImage.src = dataUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return createTextureFromCanvas(createDefaultSkinCanvas());
  }

  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  if (image.width === TEXTURE_SIZE && image.height === TEXTURE_SIZE) {
    context.drawImage(image, 0, 0);
  } else {
    context.drawImage(image, 0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  }
  return createTextureFromCanvas(canvas);
};

const rectToUv = (rect: Rect): [number, number, number, number] => {
  const u0 = rect.x / TEXTURE_SIZE;
  const u1 = (rect.x + rect.w) / TEXTURE_SIZE;
  const v0 = 1 - (rect.y + rect.h) / TEXTURE_SIZE;
  const v1 = 1 - rect.y / TEXTURE_SIZE;
  return [u0, v0, u1, v1];
};

const applyCuboidUv = (geometry: BufferGeometry, uv: CuboidUv): void => {
  const uvAttribute = geometry.getAttribute('uv');
  const faces: Rect[] = [uv.right, uv.left, uv.top, uv.bottom, uv.front, uv.back];

  faces.forEach((faceRect, faceIndex) => {
    const [u0, v0, u1, v1] = rectToUv(faceRect);
    const offset = faceIndex * 4;
    uvAttribute.setXY(offset + 0, u1, v1);
    uvAttribute.setXY(offset + 1, u0, v1);
    uvAttribute.setXY(offset + 2, u1, v0);
    uvAttribute.setXY(offset + 3, u0, v0);
  });

  uvAttribute.needsUpdate = true;
};

const createCuboidMesh = (
  width: number,
  height: number,
  depth: number,
  uvMap: CuboidUv,
  texture: Texture,
): Mesh => {
  const geometry = new BoxGeometry(width / 16, height / 16, depth / 16);
  applyCuboidUv(geometry, uvMap);
  const material = new MeshLambertMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.2,
  });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

export const createPlayerModel = (texture: Texture): Group => {
  const root = new Group();

  const head = createCuboidMesh(8, 8, 8, HEAD_UV, texture);
  head.position.set(0, 28 / 16, 0);

  const body = createCuboidMesh(8, 12, 4, BODY_UV, texture);
  body.position.set(0, 18 / 16, 0);

  const rightArm = createCuboidMesh(4, 12, 4, RIGHT_ARM_UV, texture);
  rightArm.position.set(-6 / 16, 18 / 16, 0);

  const leftArm = createCuboidMesh(4, 12, 4, LEFT_ARM_UV, texture);
  leftArm.position.set(6 / 16, 18 / 16, 0);

  const rightLeg = createCuboidMesh(4, 12, 4, RIGHT_LEG_UV, texture);
  rightLeg.position.set(-2 / 16, 6 / 16, 0);

  const leftLeg = createCuboidMesh(4, 12, 4, LEFT_LEG_UV, texture);
  leftLeg.position.set(2 / 16, 6 / 16, 0);

  root.add(head, body, rightArm, leftArm, rightLeg, leftLeg);
  return root;
};

export const createFirstPersonHand = (texture: Texture): Group => {
  const hand = new Group();
  const arm = createCuboidMesh(4, 12, 4, RIGHT_ARM_UV, texture);
  arm.position.set(0, 0, 0);
  arm.rotation.z = -0.08;
  hand.add(arm);
  hand.scale.set(1.9, 1.9, 1.9);
  return hand;
};

export const disposeModel = (group: Group): void => {
  group.traverse((node) => {
    const mesh = node as Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    if (mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const mapped = material as MeshLambertMaterial;
        mapped.map?.dispose();
        material.dispose();
      });
    }
  });
};
