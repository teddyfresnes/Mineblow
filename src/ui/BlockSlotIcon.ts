import type { BlockId } from '../types/blocks';
import { getBlockDefinition } from '../world/BlockRegistry';

interface Point {
  x: number;
  y: number;
}

const ICON_CANVAS_SIZE = 64;
const TEXEL_SIZE = 16;
const TOP: Point = { x: 32, y: 1 };
const RIGHT: Point = { x: 62, y: 18 };
const TOP_BOTTOM: Point = { x: 32, y: 35 };
const LEFT: Point = { x: 2, y: 18 };
const RIGHT_BOTTOM: Point = { x: 62, y: 50 };
const BOTTOM_CENTER: Point = { x: 32, y: 63 };
const LEFT_BOTTOM: Point = { x: 2, y: 50 };

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
  water_still: new URL('../../assets/textures/blocks/water_still.png', import.meta.url).href,
  water_flow: new URL('../../assets/textures/blocks/water_flow.png', import.meta.url).href,
  sand: new URL('../../assets/textures/blocks/sand.png', import.meta.url).href,
  clay: new URL('../../assets/textures/blocks/clay.png', import.meta.url).href,
  mud: new URL('../../assets/textures/blocks/dirt.png', import.meta.url).href,
  grass_plant: new URL('../../assets/textures/blocks/tallgrass.png', import.meta.url).href,
  flower_red: new URL('../../assets/textures/blocks/flower_rose.png', import.meta.url).href,
  gravel: new URL('../../assets/textures/blocks/gravel.png', import.meta.url).href,
  sandstone: new URL('../../assets/textures/blocks/sandstone_normal.png', import.meta.url).href,
  sandstone_top: new URL('../../assets/textures/blocks/sandstone_top.png', import.meta.url).href,
  sandstone_bottom: new URL('../../assets/textures/blocks/sandstone_bottom.png', import.meta.url).href,
  coal_ore: new URL('../../assets/textures/blocks/coal_ore.png', import.meta.url).href,
  iron_ore: new URL('../../assets/textures/blocks/iron_ore.png', import.meta.url).href,
  gold_ore: new URL('../../assets/textures/blocks/gold_ore.png', import.meta.url).href,
  redstone_ore: new URL('../../assets/textures/blocks/redstone_ore.png', import.meta.url).href,
  diamond_ore: new URL('../../assets/textures/blocks/diamond_ore.png', import.meta.url).href,
  lapis_ore: new URL('../../assets/textures/blocks/lapis_ore.png', import.meta.url).href,
  snow: new URL('../../assets/textures/blocks/snow.png', import.meta.url).href,
  ice: new URL('../../assets/textures/blocks/glass.png', import.meta.url).href,
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
  context.strokeStyle = 'rgba(0, 0, 0, 0.42)';
  context.lineWidth = 1;
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

const lerpPoint = (from: Point, to: Point, t: number): Point => ({
  x: Math.round(from.x + (to.x - from.x) * t),
  y: Math.round(from.y + (to.y - from.y) * t),
});

const drawCubeIcon = (
  context: CanvasRenderingContext2D,
  topImage: HTMLImageElement,
  sideImage: HTMLImageElement,
): void => {
  const leftMid = lerpPoint(LEFT, LEFT_BOTTOM, 0.5);
  const rightMid = lerpPoint(RIGHT, RIGHT_BOTTOM, 0.5);
  const centerMid = lerpPoint(TOP_BOTTOM, BOTTOM_CENTER, 0.5);

  drawFace(
    context,
    topImage,
    TOP,
    { x: RIGHT.x - TOP.x, y: RIGHT.y - TOP.y },
    { x: LEFT.x - TOP.x, y: LEFT.y - TOP.y },
  );
  drawFace(
    context,
    sideImage,
    LEFT,
    { x: TOP_BOTTOM.x - LEFT.x, y: TOP_BOTTOM.y - LEFT.y },
    { x: LEFT_BOTTOM.x - LEFT.x, y: LEFT_BOTTOM.y - LEFT.y },
  );
  drawFace(
    context,
    sideImage,
    TOP_BOTTOM,
    { x: RIGHT.x - TOP_BOTTOM.x, y: RIGHT.y - TOP_BOTTOM.y },
    { x: BOTTOM_CENTER.x - TOP_BOTTOM.x, y: BOTTOM_CENTER.y - TOP_BOTTOM.y },
  );

  // Flat pixel-art shading: top lighter, left medium, right darker.
  fillQuad(context, TOP, RIGHT, TOP_BOTTOM, LEFT, 'rgba(255, 255, 255, 0.08)');
  fillQuad(context, LEFT, TOP_BOTTOM, BOTTOM_CENTER, LEFT_BOTTOM, 'rgba(0, 0, 0, 0.12)');
  fillQuad(
    context,
    TOP_BOTTOM,
    RIGHT,
    RIGHT_BOTTOM,
    BOTTOM_CENTER,
    'rgba(0, 0, 0, 0.2)',
  );

  // Lower halves are a little darker to reinforce volume, still pixel-flat.
  fillQuad(
    context,
    leftMid,
    centerMid,
    BOTTOM_CENTER,
    LEFT_BOTTOM,
    'rgba(0, 0, 0, 0.1)',
  );
  fillQuad(
    context,
    centerMid,
    rightMid,
    RIGHT_BOTTOM,
    BOTTOM_CENTER,
    'rgba(0, 0, 0, 0.12)',
  );

  drawOutline(context, [
    [TOP, RIGHT],
    [RIGHT, TOP_BOTTOM],
    [TOP_BOTTOM, LEFT],
    [LEFT, TOP],
    [LEFT, LEFT_BOTTOM],
    [LEFT_BOTTOM, BOTTOM_CENTER],
    [BOTTOM_CENTER, RIGHT_BOTTOM],
    [RIGHT_BOTTOM, RIGHT],
    [TOP_BOTTOM, BOTTOM_CENTER],
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
