import {
  BoxGeometry,
  BufferAttribute,
  CanvasTexture,
  ClampToEdgeWrapping,
  FrontSide,
  Group,
  Mesh,
  MeshLambertMaterial,
  NearestFilter,
  SRGBColorSpace,
  Texture,
  Vector2,
} from 'three';

const TEXTURE_SIZE = 64;

export type SkinModelType = 'classic' | 'slim';

export interface LoadedSkinTexture {
  texture: CanvasTexture;
  model: SkinModelType;
}

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
  context.fillRect(20, 20, 8, 12);
  context.fillStyle = '#5a86c8';
  context.fillRect(44, 20, 4, 12);
  context.fillRect(36, 52, 4, 12);
  context.fillStyle = '#3a4f78';
  context.fillRect(4, 20, 4, 12);
  context.fillRect(20, 52, 4, 12);
  return canvas;
};

const createTextureFromCanvas = (canvas: HTMLCanvasElement): CanvasTexture => {
  const texture = new CanvasTexture(canvas);
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
};

const hasTransparency = (
  context: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  w: number,
  h: number,
): boolean => {
  const imgData = context.getImageData(x0, y0, w, h);
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      const offset = (x + y * w) * 4;
      if (imgData.data[offset + 3] !== 0xff) {
        return true;
      }
    }
  }
  return false;
};

const isAreaBlack = (
  context: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  w: number,
  h: number,
): boolean => {
  const imgData = context.getImageData(x0, y0, w, h);
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      const offset = (x + y * w) * 4;
      if (
        !(
          imgData.data[offset + 0] === 0 &&
          imgData.data[offset + 1] === 0 &&
          imgData.data[offset + 2] === 0 &&
          imgData.data[offset + 3] === 0xff
        )
      ) {
        return false;
      }
    }
  }
  return true;
};

const isAreaWhite = (
  context: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  w: number,
  h: number,
): boolean => {
  const imgData = context.getImageData(x0, y0, w, h);
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      const offset = (x + y * w) * 4;
      if (
        !(
          imgData.data[offset + 0] === 0xff &&
          imgData.data[offset + 1] === 0xff &&
          imgData.data[offset + 2] === 0xff &&
          imgData.data[offset + 3] === 0xff
        )
      ) {
        return false;
      }
    }
  }
  return true;
};

const computeSkinScale = (width: number): number => width / 64;

const fixOpaqueSkin = (
  context: CanvasRenderingContext2D,
  width: number,
  format1_8: boolean,
): void => {
  if (format1_8) {
    if (hasTransparency(context, 0, 0, width, width)) {
      return;
    }
  } else if (hasTransparency(context, 0, 0, width, width / 2)) {
    return;
  }

  const scale = computeSkinScale(width);
  const clearArea = (x: number, y: number, w: number, h: number): void => {
    context.clearRect(x * scale, y * scale, w * scale, h * scale);
  };

  clearArea(40, 0, 8, 8);
  clearArea(48, 0, 8, 8);
  clearArea(32, 8, 8, 8);
  clearArea(40, 8, 8, 8);
  clearArea(48, 8, 8, 8);
  clearArea(56, 8, 8, 8);

  if (!format1_8) {
    return;
  }

  clearArea(4, 32, 4, 4);
  clearArea(8, 32, 4, 4);
  clearArea(0, 36, 4, 12);
  clearArea(4, 36, 4, 12);
  clearArea(8, 36, 4, 12);
  clearArea(12, 36, 4, 12);

  clearArea(20, 32, 8, 4);
  clearArea(28, 32, 8, 4);
  clearArea(16, 36, 4, 12);
  clearArea(20, 36, 8, 12);
  clearArea(28, 36, 4, 12);
  clearArea(32, 36, 8, 12);

  clearArea(44, 32, 4, 4);
  clearArea(48, 32, 4, 4);
  clearArea(40, 36, 4, 12);
  clearArea(44, 36, 4, 12);
  clearArea(48, 36, 4, 12);
  clearArea(52, 36, 12, 12);

  clearArea(4, 48, 4, 4);
  clearArea(8, 48, 4, 4);
  clearArea(0, 52, 4, 12);
  clearArea(4, 52, 4, 12);
  clearArea(8, 52, 4, 12);
  clearArea(12, 52, 4, 12);

  clearArea(52, 48, 4, 4);
  clearArea(56, 48, 4, 4);
  clearArea(48, 52, 4, 12);
  clearArea(52, 52, 4, 12);
  clearArea(56, 52, 4, 12);
  clearArea(60, 52, 4, 12);
};

const convertSkinTo1_8 = (context: CanvasRenderingContext2D, width: number): void => {
  context.save();
  context.scale(-1, 1);
  const scale = computeSkinScale(width);
  const copySkin = (sX: number, sY: number, w: number, h: number, dX: number, dY: number): void => {
    context.drawImage(
      context.canvas,
      sX * scale,
      sY * scale,
      w * scale,
      h * scale,
      -dX * scale,
      dY * scale,
      -w * scale,
      h * scale,
    );
  };

  copySkin(4, 16, 4, 4, 20, 48);
  copySkin(8, 16, 4, 4, 24, 48);
  copySkin(0, 20, 4, 12, 24, 52);
  copySkin(4, 20, 4, 12, 20, 52);
  copySkin(8, 20, 4, 12, 16, 52);
  copySkin(12, 20, 4, 12, 28, 52);

  copySkin(44, 16, 4, 4, 36, 48);
  copySkin(48, 16, 4, 4, 40, 48);
  copySkin(40, 20, 4, 12, 40, 52);
  copySkin(44, 20, 4, 12, 36, 52);
  copySkin(48, 20, 4, 12, 32, 52);
  copySkin(52, 20, 4, 12, 44, 52);
  context.restore();
};

const inferModelType = (canvas: HTMLCanvasElement): SkinModelType => {
  const scale = computeSkinScale(canvas.width);
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return 'classic';
  }

  const checkTransparency = (x: number, y: number, w: number, h: number): boolean =>
    hasTransparency(context, x * scale, y * scale, w * scale, h * scale);
  const checkBlack = (x: number, y: number, w: number, h: number): boolean =>
    isAreaBlack(context, x * scale, y * scale, w * scale, h * scale);
  const checkWhite = (x: number, y: number, w: number, h: number): boolean =>
    isAreaWhite(context, x * scale, y * scale, w * scale, h * scale);

  const isSlim =
    checkTransparency(50, 16, 2, 4) ||
    checkTransparency(54, 20, 2, 12) ||
    checkTransparency(42, 48, 2, 4) ||
    checkTransparency(46, 52, 2, 12) ||
    (checkBlack(50, 16, 2, 4) &&
      checkBlack(54, 20, 2, 12) &&
      checkBlack(42, 48, 2, 4) &&
      checkBlack(46, 52, 2, 12)) ||
    (checkWhite(50, 16, 2, 4) &&
      checkWhite(54, 20, 2, 12) &&
      checkWhite(42, 48, 2, 4) &&
      checkWhite(46, 52, 2, 12));

  return isSlim ? 'slim' : 'classic';
};

const loadImage = async (dataUrl: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Skin image load error'));
    image.src = dataUrl;
  });

const prepareSkinCanvas = (image: HTMLImageElement): { canvas: HTMLCanvasElement; model: SkinModelType } => {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return { canvas, model: 'classic' };
  }

  context.imageSmoothingEnabled = false;
  context.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  const isOldFormat = image.width === image.height * 2;
  if (!isOldFormat && image.width !== image.height) {
    throw new Error(`Bad skin size: ${image.width}x${image.height}`);
  }

  if (isOldFormat) {
    context.drawImage(image, 0, 0, TEXTURE_SIZE, TEXTURE_SIZE / 2);
    convertSkinTo1_8(context, TEXTURE_SIZE);
    fixOpaqueSkin(context, TEXTURE_SIZE, false);
  } else {
    context.drawImage(image, 0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
    fixOpaqueSkin(context, TEXTURE_SIZE, true);
  }

  return {
    canvas,
    model: inferModelType(canvas),
  };
};

const toFaceVertices = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  textureWidth: number,
  textureHeight: number,
): [Vector2, Vector2, Vector2, Vector2] => [
  new Vector2(x1 / textureWidth, 1 - y2 / textureHeight),
  new Vector2(x2 / textureWidth, 1 - y2 / textureHeight),
  new Vector2(x2 / textureWidth, 1 - y1 / textureHeight),
  new Vector2(x1 / textureWidth, 1 - y1 / textureHeight),
];

const setUVs = (
  geometry: BoxGeometry,
  u: number,
  v: number,
  width: number,
  height: number,
  depth: number,
  textureWidth: number,
  textureHeight: number,
): void => {
  const top = toFaceVertices(u + depth, v, u + width + depth, v + depth, textureWidth, textureHeight);
  const bottom = toFaceVertices(
    u + width + depth,
    v,
    u + width * 2 + depth,
    v + depth,
    textureWidth,
    textureHeight,
  );
  const left = toFaceVertices(
    u,
    v + depth,
    u + depth,
    v + depth + height,
    textureWidth,
    textureHeight,
  );
  const front = toFaceVertices(
    u + depth,
    v + depth,
    u + width + depth,
    v + depth + height,
    textureWidth,
    textureHeight,
  );
  const right = toFaceVertices(
    u + width + depth,
    v + depth,
    u + width + depth * 2,
    v + height + depth,
    textureWidth,
    textureHeight,
  );
  const back = toFaceVertices(
    u + width + depth * 2,
    v + depth,
    u + width * 2 + depth * 2,
    v + height + depth,
    textureWidth,
    textureHeight,
  );

  const uvRight = [right[3], right[2], right[0], right[1]];
  const uvLeft = [left[3], left[2], left[0], left[1]];
  const uvTop = [top[3], top[2], top[0], top[1]];
  const uvBottom = [bottom[0], bottom[1], bottom[3], bottom[2]];
  const uvFront = [front[3], front[2], front[0], front[1]];
  const uvBack = [back[3], back[2], back[0], back[1]];
  const uvData: number[] = [];

  for (const uvArray of [uvRight, uvLeft, uvTop, uvBottom, uvFront, uvBack]) {
    for (const uv of uvArray) {
      uvData.push(uv.x, uv.y);
    }
  }

  const uvAttribute = geometry.getAttribute('uv') as BufferAttribute;
  uvAttribute.set(new Float32Array(uvData));
  uvAttribute.needsUpdate = true;
};

const setSkinUVs = (
  geometry: BoxGeometry,
  u: number,
  v: number,
  width: number,
  height: number,
  depth: number,
): void => {
  setUVs(geometry, u, v, width, height, depth, TEXTURE_SIZE, TEXTURE_SIZE);
};

const OVERLAY_THICKNESS_PX = 0.42;
const OVERLAY_GAP_PX = 0.01;
const OVERLAY_ALPHA_THRESHOLD = 16;

type OverlayFace = 'top' | 'bottom' | 'left' | 'right' | 'front' | 'back';

interface OverlayRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SkinSampler {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

const getSkinSampler = (texture: Texture): SkinSampler | null => {
  const image = texture.image;
  if (!(image instanceof HTMLCanvasElement)) {
    return null;
  }
  const context = image.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return null;
  }
  const imageData = context.getImageData(0, 0, image.width, image.height);
  return {
    width: image.width,
    height: image.height,
    data: imageData.data,
  };
};

const samplePixel = (
  sampler: SkinSampler,
  x: number,
  y: number,
): { r: number; g: number; b: number; a: number } => {
  if (x < 0 || y < 0 || x >= sampler.width || y >= sampler.height) {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  const offset = (y * sampler.width + x) * 4;
  return {
    r: sampler.data[offset],
    g: sampler.data[offset + 1],
    b: sampler.data[offset + 2],
    a: sampler.data[offset + 3],
  };
};

const createOverlayMaterial = (r: number, g: number, b: number, a: number): MeshLambertMaterial =>
  new MeshLambertMaterial({
    color: (r << 16) | (g << 8) | b,
    transparent: a < 255,
    opacity: Math.max(0.02, a / 255),
    alphaTest: 0.02,
    side: FrontSide,
    depthWrite: a >= 254,
  });

const computeOverlayRects = (
  u: number,
  v: number,
  width: number,
  height: number,
  depth: number,
): Record<OverlayFace, OverlayRect> => ({
  top: { x: u + depth, y: v, w: width, h: depth },
  bottom: { x: u + width + depth, y: v, w: width, h: depth },
  left: { x: u, y: v + depth, w: depth, h: height },
  front: { x: u + depth, y: v + depth, w: width, h: height },
  right: { x: u + width + depth, y: v + depth, w: depth, h: height },
  back: { x: u + width + depth * 2, y: v + depth, w: width, h: height },
});

const createOverlayVoxelLayer = (
  sampler: SkinSampler | null,
  width: number,
  height: number,
  depth: number,
  overlayUv: [number, number],
  hiddenFaces: OverlayFace[] = [],
): Group => {
  const group = new Group();
  if (!sampler) {
    return group;
  }

  const rects = computeOverlayRects(overlayUv[0], overlayUv[1], width, height, depth);
  const hiddenFaceSet = new Set(hiddenFaces);
  const materialCache = new Map<number, MeshLambertMaterial>();
  const halfThickness = OVERLAY_THICKNESS_PX / 2;
  const geomX = new BoxGeometry(OVERLAY_THICKNESS_PX / 16, 1 / 16, 1 / 16);
  const geomY = new BoxGeometry(1 / 16, OVERLAY_THICKNESS_PX / 16, 1 / 16);
  const geomZ = new BoxGeometry(1 / 16, 1 / 16, OVERLAY_THICKNESS_PX / 16);

  const resolveVoxelPosition = (
    face: OverlayFace,
    px: number,
    py: number,
  ): { x: number; y: number; z: number; geometry: BoxGeometry } => {
    const y = height / 2 - py - 0.5;

    switch (face) {
      case 'front':
        return {
          x: -width / 2 + px + 0.5,
          y,
          z: depth / 2 + halfThickness + OVERLAY_GAP_PX,
          geometry: geomZ,
        };
      case 'back':
        return {
          x: width / 2 - px - 0.5,
          y,
          z: -depth / 2 - halfThickness - OVERLAY_GAP_PX,
          geometry: geomZ,
        };
      case 'right':
        return {
          x: width / 2 + halfThickness + OVERLAY_GAP_PX,
          y,
          z: depth / 2 - px - 0.5,
          geometry: geomX,
        };
      case 'left':
        return {
          x: -width / 2 - halfThickness - OVERLAY_GAP_PX,
          y,
          z: -depth / 2 + px + 0.5,
          geometry: geomX,
        };
      case 'top':
        return {
          x: -width / 2 + px + 0.5,
          y: height / 2 + halfThickness + OVERLAY_GAP_PX,
          z: -depth / 2 + py + 0.5,
          geometry: geomY,
        };
      case 'bottom':
      default:
        return {
          x: -width / 2 + px + 0.5,
          y: -height / 2 - halfThickness - OVERLAY_GAP_PX,
          z: depth / 2 - py - 0.5,
          geometry: geomY,
        };
    }
  };

  (Object.keys(rects) as OverlayFace[]).forEach((face) => {
    if (hiddenFaceSet.has(face)) {
      return;
    }
    const rect = rects[face];
    for (let py = 0; py < rect.h; py += 1) {
      for (let px = 0; px < rect.w; px += 1) {
        const skinX = rect.x + px;
        const skinY = rect.y + py;
        const { r, g, b, a } = samplePixel(sampler, skinX, skinY);
        if (a < OVERLAY_ALPHA_THRESHOLD) {
          continue;
        }

        const key = (r << 24) | (g << 16) | (b << 8) | a;
        let material = materialCache.get(key);
        if (!material) {
          material = createOverlayMaterial(r, g, b, a);
          materialCache.set(key, material);
        }

        const voxel = resolveVoxelPosition(face, px, py);
        const mesh = new Mesh(voxel.geometry, material);
        mesh.position.set(voxel.x / 16, voxel.y / 16, voxel.z / 16);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);
      }
    }
  });

  return group;
};

const createLayerMesh = (
  width: number,
  height: number,
  depth: number,
  u: number,
  v: number,
  texture: Texture,
): Mesh => {
  const geometry = new BoxGeometry(width / 16, height / 16, depth / 16);
  setSkinUVs(geometry, u, v, width, height, depth);
  const material = new MeshLambertMaterial({
    map: texture,
    side: FrontSide,
    transparent: false,
  });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

const addBodyPart = (
  root: Group,
  options: {
    width: number;
    height: number;
    depth: number;
    innerUv: [number, number];
    outerUv: [number, number];
    sampler: SkinSampler | null;
    hiddenOverlayFaces?: OverlayFace[];
    position: [number, number, number];
    texture: Texture;
  },
): void => {
  const group = new Group();
  const inner = createLayerMesh(
    options.width,
    options.height,
    options.depth,
    options.innerUv[0],
    options.innerUv[1],
    options.texture,
  );
  const overlay = createOverlayVoxelLayer(
    options.sampler,
    options.width,
    options.height,
    options.depth,
    options.outerUv,
    options.hiddenOverlayFaces,
  );

  group.add(inner, overlay);
  group.position.set(...options.position);
  root.add(group);
};

export const loadSkinTexture = async (dataUrl: string | null): Promise<LoadedSkinTexture> => {
  if (!dataUrl) {
    const canvas = createDefaultSkinCanvas();
    return {
      texture: createTextureFromCanvas(canvas),
      model: 'classic',
    };
  }

  const image = await loadImage(dataUrl);
  const prepared = prepareSkinCanvas(image);
  return {
    texture: createTextureFromCanvas(prepared.canvas),
    model: prepared.model,
  };
};

export const createPlayerModel = (texture: Texture, model: SkinModelType = 'classic'): Group => {
  const root = new Group();
  const armWidth = model === 'slim' ? 3 : 4;
  const armOffset = model === 'slim' ? 5.5 / 16 : 6 / 16;
  const sampler = getSkinSampler(texture);

  addBodyPart(root, {
    width: 8,
    height: 8,
    depth: 8,
    innerUv: [0, 0],
    outerUv: [32, 0],
    sampler,
    position: [0, 28 / 16, 0],
    texture,
  });

  addBodyPart(root, {
    width: 8,
    height: 12,
    depth: 4,
    innerUv: [16, 16],
    outerUv: [16, 32],
    sampler,
    hiddenOverlayFaces: ['left', 'right'],
    position: [0, 18 / 16, 0],
    texture,
  });

  addBodyPart(root, {
    width: armWidth,
    height: 12,
    depth: 4,
    innerUv: [40, 16],
    outerUv: [40, 32],
    sampler,
    hiddenOverlayFaces: ['right', 'top'],
    position: [-armOffset, 18 / 16, 0],
    texture,
  });

  addBodyPart(root, {
    width: armWidth,
    height: 12,
    depth: 4,
    innerUv: [32, 48],
    outerUv: [48, 48],
    sampler,
    hiddenOverlayFaces: ['left', 'top'],
    position: [armOffset, 18 / 16, 0],
    texture,
  });

  addBodyPart(root, {
    width: 4,
    height: 12,
    depth: 4,
    innerUv: [0, 16],
    outerUv: [0, 32],
    sampler,
    hiddenOverlayFaces: ['right'],
    position: [-2 / 16, 6 / 16, -0.1 / 16],
    texture,
  });

  addBodyPart(root, {
    width: 4,
    height: 12,
    depth: 4,
    innerUv: [16, 48],
    outerUv: [0, 48],
    sampler,
    hiddenOverlayFaces: ['left'],
    position: [2 / 16, 6 / 16, -0.1 / 16],
    texture,
  });

  return root;
};

export const createFirstPersonHand = (
  texture: Texture,
  model: SkinModelType = 'classic',
): Group => {
  const armWidth = model === 'slim' ? 3 : 4;
  const hand = new Group();
  const arm = new Group();
  const sampler = getSkinSampler(texture);
  addBodyPart(arm, {
    width: armWidth,
    height: 12,
    depth: 4,
    innerUv: [40, 16],
    outerUv: [40, 32],
    sampler,
    position: [0, 0, 0],
    texture,
  });
  // Flip vertically and rotate 180deg around the arm axis (watch/outer side swap).
  arm.rotation.set(Math.PI, Math.PI, 0);
  hand.add(arm);
  hand.position.x = 0.12;
  hand.position.y = -0.01;
  hand.position.z = 0.045;
  hand.rotation.x = -0.14;
  hand.rotation.y = -0.80;
  hand.rotation.z = 0.44;
  hand.scale.set(1.25, 1.25, 1.25);
  return hand;
};

export const disposeModel = (group: Group): void => {
  const disposedGeometries = new Set<BoxGeometry>();
  const disposedMaterials = new Set<MeshLambertMaterial>();
  const disposedTextures = new Set<Texture>();
  group.traverse((node) => {
    const mesh = node as Mesh;
    if (mesh.geometry) {
      const geometry = mesh.geometry as BoxGeometry;
      if (!disposedGeometries.has(geometry)) {
        geometry.dispose();
        disposedGeometries.add(geometry);
      }
    }
    if (mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const mapped = material as MeshLambertMaterial;
        if (mapped.map && !disposedTextures.has(mapped.map)) {
          mapped.map.dispose();
          disposedTextures.add(mapped.map);
        }
        if (!disposedMaterials.has(mapped)) {
          mapped.dispose();
          disposedMaterials.add(mapped);
        }
      });
    }
  });
};
