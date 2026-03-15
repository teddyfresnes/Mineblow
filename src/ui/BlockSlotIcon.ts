import type { BlockId } from '../types/blocks';
import { getBlockDefinition } from '../world/BlockRegistry';

interface Point {
  x: number;
  y: number;
}

const ICON_CANVAS_SIZE = 64;
const TEXEL_SIZE = 16;
const FRONT_SIZE = 30;
const FRONT_LEFT_X = 14;
const FRONT_TOP_Y = 19;
const DEPTH_X = 9;
const DEPTH_Y = 7;

const TILE_TEXTURES: Record<string, string> = {
  grass_top: new URL('../../assets/textures/blocks/grass_top.png', import.meta.url).href,
  grass_side: new URL('../../assets/textures/blocks/grass_side.png', import.meta.url).href,
  dirt: new URL('../../assets/textures/blocks/dirt.png', import.meta.url).href,
  stone: new URL('../../assets/textures/blocks/stone.png', import.meta.url).href,
  wood_side: new URL('../../assets/textures/blocks/log_oak.png', import.meta.url).href,
  wood_top: new URL('../../assets/textures/blocks/log_oak_top.png', import.meta.url).href,
  leaves: new URL('../../assets/textures/blocks/leaves_oak.png', import.meta.url).href,
  bedrock: new URL('../../assets/textures/blocks/cobblestone.png', import.meta.url).href,
  planks: new URL('../../assets/textures/blocks/planks_oak.png', import.meta.url).href,
  crafting_table_top: new URL('../../assets/textures/blocks/crafting_table_top.png', import.meta.url).href,
  crafting_table_side: new URL('../../assets/textures/blocks/crafting_table_side.png', import.meta.url).href,
  stone_bricks: new URL('../../assets/textures/blocks/stonebrick.png', import.meta.url).href,
  water: new URL('../../assets/textures/blocks/water_still.png', import.meta.url).href,
  sand: new URL('../../assets/textures/blocks/sand.png', import.meta.url).href,
  clay: new URL('../../assets/textures/blocks/clay.png', import.meta.url).href,
  mud: new URL('../../assets/textures/blocks/dirt.png', import.meta.url).href,
  grass_plant: new URL('../../assets/textures/blocks/tallgrass.png', import.meta.url).href,
  flower_red: new URL('../../assets/textures/blocks/flower_rose.png', import.meta.url).href,
};

const texturePromises = new Map<string, Promise<HTMLImageElement | null>>();

const loadTexture = (tileKey: string): Promise<HTMLImageElement | null> => {
  const existing = texturePromises.get(tileKey);
  if (existing) {
    return existing;
  }

  const url = TILE_TEXTURES[tileKey];
  if (!url) {
    return Promise.resolve(null);
  }

  const promise = new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
  texturePromises.set(tileKey, promise);
  return promise;
};

const toRenderToken = (canvas: HTMLCanvasElement): string => {
  const previous = Number(canvas.dataset.renderToken ?? '0');
  const next = Number.isFinite(previous) ? previous + 1 : 1;
  const token = String(next);
  canvas.dataset.renderToken = token;
  return token;
};

const drawFace = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  origin: Point,
  edgeU: Point,
  edgeV: Point,
): void => {
  context.save();
  context.setTransform(
    edgeU.x / TEXEL_SIZE,
    edgeU.y / TEXEL_SIZE,
    edgeV.x / TEXEL_SIZE,
    edgeV.y / TEXEL_SIZE,
    origin.x,
    origin.y,
  );
  context.imageSmoothingEnabled = false;
  context.drawImage(
    image,
    0,
    0,
    TEXEL_SIZE,
    TEXEL_SIZE,
    0,
    0,
    TEXEL_SIZE,
    TEXEL_SIZE,
  );
  context.restore();
};

const fillQuad = (
  context: CanvasRenderingContext2D,
  a: Point,
  b: Point,
  c: Point,
  d: Point,
  color: string,
): void => {
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.lineTo(c.x, c.y);
  context.lineTo(d.x, d.y);
  context.closePath();
  context.fillStyle = color;
  context.fill();
};

const drawOutline = (
  context: CanvasRenderingContext2D,
  segments: Array<[Point, Point]>,
): void => {
  context.save();
  context.strokeStyle = 'rgba(0, 0, 0, 0.48)';
  context.lineWidth = 1.2;
  segments.forEach(([start, end]) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  });
  context.restore();
};

const clearIcon = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const drawCubeIcon = (
  context: CanvasRenderingContext2D,
  topImage: HTMLImageElement,
  sideImage: HTMLImageElement,
): void => {
  const frontTopLeft: Point = { x: FRONT_LEFT_X, y: FRONT_TOP_Y };
  const frontTopRight: Point = { x: frontTopLeft.x + FRONT_SIZE, y: frontTopLeft.y };
  const frontBottomRight: Point = { x: frontTopRight.x, y: frontTopRight.y + FRONT_SIZE };
  const frontBottomLeft: Point = { x: frontTopLeft.x, y: frontTopLeft.y + FRONT_SIZE };
  const backTopLeft: Point = { x: frontTopLeft.x + DEPTH_X, y: frontTopLeft.y - DEPTH_Y };
  const backTopRight: Point = { x: frontTopRight.x + DEPTH_X, y: frontTopRight.y - DEPTH_Y };
  const backBottomRight: Point = {
    x: frontBottomRight.x + DEPTH_X,
    y: frontBottomRight.y - DEPTH_Y,
  };

  drawFace(
    context,
    topImage,
    backTopLeft,
    { x: backTopRight.x - backTopLeft.x, y: backTopRight.y - backTopLeft.y },
    { x: frontTopLeft.x - backTopLeft.x, y: frontTopLeft.y - backTopLeft.y },
  );
  drawFace(
    context,
    sideImage,
    backTopRight,
    { x: frontTopRight.x - backTopRight.x, y: frontTopRight.y - backTopRight.y },
    { x: backBottomRight.x - backTopRight.x, y: backBottomRight.y - backTopRight.y },
  );
  drawFace(
    context,
    sideImage,
    frontTopLeft,
    { x: frontTopRight.x - frontTopLeft.x, y: frontTopRight.y - frontTopLeft.y },
    { x: frontBottomLeft.x - frontTopLeft.x, y: frontBottomLeft.y - frontTopLeft.y },
  );

  fillQuad(
    context,
    backTopRight,
    frontTopRight,
    frontBottomRight,
    backBottomRight,
    'rgba(0, 0, 0, 0.24)',
  );
  fillQuad(
    context,
    frontTopLeft,
    frontTopRight,
    frontBottomRight,
    frontBottomLeft,
    'rgba(0, 0, 0, 0.07)',
  );
  fillQuad(
    context,
    backTopLeft,
    backTopRight,
    frontTopRight,
    frontTopLeft,
    'rgba(255, 255, 255, 0.07)',
  );

  drawOutline(context, [
    [backTopLeft, backTopRight],
    [backTopRight, frontTopRight],
    [frontTopRight, frontTopLeft],
    [frontTopLeft, backTopLeft],
    [backTopRight, backBottomRight],
    [frontTopRight, frontBottomRight],
    [frontTopLeft, frontBottomLeft],
    [frontBottomLeft, frontBottomRight],
    [frontBottomRight, backBottomRight],
  ]);
};

export const createBlockSlotIconCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.className = 'block-slot-icon';
  canvas.width = ICON_CANVAS_SIZE;
  canvas.height = ICON_CANVAS_SIZE;
  return canvas;
};

export const renderBlockSlotIcon = (canvas: HTMLCanvasElement, blockId: BlockId | null): void => {
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const token = toRenderToken(canvas);
  clearIcon(canvas, context);

  if (blockId === null) {
    return;
  }

  const definition = getBlockDefinition(blockId);
  const topKey = definition.textureTop ?? definition.textureSide ?? 'dirt';
  const sideKey = definition.textureSide ?? definition.textureTop ?? 'dirt';

  void Promise.all([loadTexture(topKey), loadTexture(sideKey)]).then(([topImage, sideImage]) => {
    if (canvas.dataset.renderToken !== token) {
      return;
    }
    clearIcon(canvas, context);
    if (!topImage || !sideImage) {
      return;
    }
    drawCubeIcon(context, topImage, sideImage);
  });
};
