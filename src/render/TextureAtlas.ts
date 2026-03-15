import {
  CanvasTexture,
  MeshLambertMaterial,
  NearestFilter,
  SRGBColorSpace,
} from 'three';

interface TileRect {
  u0: number;
  v0: number;
  u1: number;
  v1: number;
}

const TILE_SIZE = 16;
const COLUMNS = 4;

const tileKeys = [
  'grass_top',
  'grass_side',
  'dirt',
  'stone',
  'wood_side',
  'wood_top',
  'leaves',
  'bedrock',
  'planks',
  'crafting_table_top',
  'crafting_table_side',
  'stone_bricks',
  'water',
  'sand',
  'clay',
  'mud',
  'grass_plant',
  'flower_red',
] as const;

type TileKey = (typeof tileKeys)[number];

const BLOCK_TEXTURES: Record<TileKey, string> = {
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

const PLACEHOLDER_COLORS = ['#5f5f5f', '#7b7b7b', '#8f8f8f', '#6b6b6b'] as const;

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load texture: ${url}`));
    image.src = url;
  });

export class TextureAtlas {
  readonly material: MeshLambertMaterial;
  private readonly tileMap = new Map<TileKey, TileRect>();
  private readonly tileOffsets = new Map<TileKey, { x: number; y: number }>();
  private readonly texture: CanvasTexture;

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = COLUMNS * TILE_SIZE;
    canvas.height = Math.ceil(tileKeys.length / COLUMNS) * TILE_SIZE;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to create texture atlas.');
    }
    context.imageSmoothingEnabled = false;

    tileKeys.forEach((key, index) => {
      const column = index % COLUMNS;
      const row = Math.floor(index / COLUMNS);
      const x = column * TILE_SIZE;
      const y = row * TILE_SIZE;

      this.tileOffsets.set(key, { x, y });
      this.drawPlaceholder(context, x, y);
      const inset = 0.5;
      this.tileMap.set(key, {
        u0: (x + inset) / canvas.width,
        v0: (y + inset) / canvas.height,
        u1: (x + TILE_SIZE - inset) / canvas.width,
        v1: (y + TILE_SIZE - inset) / canvas.height,
      });
    });

    this.texture = new CanvasTexture(canvas);
    this.texture.magFilter = NearestFilter;
    this.texture.minFilter = NearestFilter;
    this.texture.colorSpace = SRGBColorSpace;
    this.texture.generateMipmaps = false;
    this.texture.flipY = false;

    this.material = new MeshLambertMaterial({
      map: this.texture,
      transparent: true,
      alphaTest: 0.35,
    });

    void this.drawAssetTiles(context);
  }

  getTileRect(key: string): TileRect {
    const rect = this.tileMap.get(key as TileKey);
    if (!rect) {
      throw new Error(`Unknown atlas tile ${key}`);
    }
    return rect;
  }

  private drawPlaceholder(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ): void {
    const stripeHeight = 4;
    for (let row = 0; row < TILE_SIZE; row += stripeHeight) {
      const paletteIndex = Math.floor(row / stripeHeight) % PLACEHOLDER_COLORS.length;
      context.fillStyle = PLACEHOLDER_COLORS[paletteIndex];
      context.fillRect(x, y + row, TILE_SIZE, stripeHeight);
    }
  }

  private async drawAssetTiles(context: CanvasRenderingContext2D): Promise<void> {
    const drawTasks = tileKeys.map(async (key) => {
      const url = BLOCK_TEXTURES[key];
      const offset = this.tileOffsets.get(key);
      if (!offset) {
        return;
      }

      try {
        const image = await loadImage(url);
        this.drawImage(context, image, offset.x, offset.y);
      } catch {
        // Keep placeholder if a texture file fails to load.
      }
    });

    await Promise.all(drawTasks);
    this.texture.needsUpdate = true;
  }

  private drawImage(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
  ): void {
    const sourceSize = Math.min(TILE_SIZE, image.width, image.height);
    context.clearRect(x, y, TILE_SIZE, TILE_SIZE);
    context.drawImage(
      image,
      0,
      0,
      sourceSize,
      sourceSize,
      x,
      y,
      TILE_SIZE,
      TILE_SIZE,
    );
  }
}
