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

const pixelHash = (x: number, y: number, seed: number): number => {
  let hash = Math.imul(x + seed * 157, 374761393) ^ Math.imul(y + seed * 311, 668265263);
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967295;
};

const pickFromPalette = (palette: readonly string[], value: number): string =>
  palette[Math.min(palette.length - 1, Math.floor(value * palette.length))];

const drawPaletteNoise = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  palette: readonly string[],
  seed: number,
): void => {
  for (let row = 0; row < TILE_SIZE; row += 1) {
    for (let column = 0; column < TILE_SIZE; column += 1) {
      context.fillStyle = pickFromPalette(palette, pixelHash(column, row, seed));
      context.fillRect(x + column, y + row, 1, 1);
    }
  }
};

const drawVerticalTint = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  from: string,
  to: string,
  opacity = 0.25,
): void => {
  const gradient = context.createLinearGradient(0, y, 0, y + TILE_SIZE);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  context.globalAlpha = opacity;
  context.fillStyle = gradient;
  context.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  context.globalAlpha = 1;
};

const drawSpeckles = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  seed: number,
  threshold: number,
): void => {
  context.fillStyle = color;
  for (let row = 0; row < TILE_SIZE; row += 1) {
    for (let column = 0; column < TILE_SIZE; column += 1) {
      if (pixelHash(column, row, seed) > threshold) {
        context.fillRect(x + column, y + row, 1, 1);
      }
    }
  }
};

export class TextureAtlas {
  readonly material: MeshLambertMaterial;
  private readonly tileMap = new Map<TileKey, TileRect>();

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

      this.drawTile(context, key, x, y);
      const inset = 0.5;
      this.tileMap.set(key, {
        u0: (x + inset) / canvas.width,
        v0: (y + inset) / canvas.height,
        u1: (x + TILE_SIZE - inset) / canvas.width,
        v1: (y + TILE_SIZE - inset) / canvas.height,
      });
    });

    const texture = new CanvasTexture(canvas);
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.flipY = false;

    this.material = new MeshLambertMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.35,
    });
  }

  getTileRect(key: string): TileRect {
    const rect = this.tileMap.get(key as TileKey);
    if (!rect) {
      throw new Error(`Unknown atlas tile ${key}`);
    }
    return rect;
  }

  private drawTile(
    context: CanvasRenderingContext2D,
    key: TileKey,
    x: number,
    y: number,
  ): void {
    switch (key) {
      case 'grass_top':
        drawPaletteNoise(context, x, y, ['#4b8038', '#5a9441', '#67a74a', '#79bb58'], 11);
        drawSpeckles(context, x, y, '#8ecb69', 12, 0.9);
        drawSpeckles(context, x, y, '#3f6f31', 13, 0.92);
        drawVerticalTint(context, x, y, '#fef08a', '#000000', 0.08);
        break;
      case 'grass_side':
        drawPaletteNoise(context, x, y, ['#71462a', '#7b4d2e', '#845735', '#8d5f3c'], 21);
        for (let row = 0; row < 5; row += 1) {
          for (let column = 0; column < TILE_SIZE; column += 1) {
            const hash = pixelHash(column, row, 22);
            context.fillStyle = pickFromPalette(
              ['#4f873a', '#5d9842', '#6aad4e', '#7bbe60'],
              hash,
            );
            context.fillRect(x + column, y + row, 1, 1);
          }
        }
        context.fillStyle = '#5f9d45';
        for (let column = 1; column < TILE_SIZE; column += 2) {
          const bladeHeight = 1 + Math.floor(pixelHash(column, 6, 23) * 3);
          context.fillRect(x + column, y + 5, 1, bladeHeight);
        }
        break;
      case 'dirt':
        drawPaletteNoise(context, x, y, ['#6d4327', '#78492c', '#845233', '#915b3a'], 31);
        drawSpeckles(context, x, y, '#ab774f', 32, 0.93);
        drawSpeckles(context, x, y, '#59361f', 33, 0.94);
        break;
      case 'stone':
        drawPaletteNoise(context, x, y, ['#6f7379', '#7d8289', '#8c9299', '#999fa6'], 41);
        context.fillStyle = '#60646a';
        for (let row = 3; row < TILE_SIZE; row += 5) {
          context.fillRect(x, y + row, TILE_SIZE, 1);
        }
        drawSpeckles(context, x, y, '#b2b7bf', 42, 0.94);
        break;
      case 'wood_side':
        drawPaletteNoise(context, x, y, ['#6f4929', '#7b5330', '#885d36', '#956844'], 51);
        context.fillStyle = '#5f3f24';
        for (let column = 1; column < TILE_SIZE; column += 3) {
          context.fillRect(x + column, y, 1, TILE_SIZE);
        }
        drawVerticalTint(context, x, y, '#f5d7a6', '#000000', 0.1);
        break;
      case 'wood_top':
        for (let row = 0; row < TILE_SIZE; row += 1) {
          for (let column = 0; column < TILE_SIZE; column += 1) {
            const dx = column - 7.5;
            const dy = row - 7.5;
            const ring = Math.sin(Math.hypot(dx, dy) * 1.8 + pixelHash(column, row, 61) * 0.8);
            const shade = (ring * 0.5 + 0.5) * 0.8 + 0.2;
            context.fillStyle = pickFromPalette(
              ['#7b522d', '#8b6238', '#9f7546', '#b28653'],
              shade,
            );
            context.fillRect(x + column, y + row, 1, 1);
          }
        }
        context.fillStyle = '#5e3f22';
        context.fillRect(x + 7, y, 1, TILE_SIZE);
        context.fillRect(x, y + 7, TILE_SIZE, 1);
        break;
      case 'leaves':
        drawPaletteNoise(context, x, y, ['#356937', '#3e7840', '#4e8b4e', '#5f9f5b'], 71);
        drawSpeckles(context, x, y, '#2d572e', 72, 0.91);
        drawSpeckles(context, x, y, '#78bb71', 73, 0.93);
        break;
      case 'bedrock':
        drawPaletteNoise(context, x, y, ['#2c2f33', '#34383d', '#3d4247', '#474c52'], 81);
        context.fillStyle = '#1d2024';
        context.fillRect(x + 2, y + 4, 11, 1);
        context.fillRect(x + 4, y + 9, 8, 1);
        break;
      case 'planks':
        drawPaletteNoise(context, x, y, ['#b5834c', '#bf8b52', '#cb9861', '#d7a56e'], 91);
        context.fillStyle = '#8a5d34';
        for (let row = 4; row < TILE_SIZE; row += 6) {
          context.fillRect(x, y + row, TILE_SIZE, 1);
        }
        drawVerticalTint(context, x, y, '#f9d7a1', '#000000', 0.09);
        break;
      case 'crafting_table_top':
        drawPaletteNoise(context, x, y, ['#6d4b2c', '#7a5632', '#87603a', '#946e43'], 101);
        context.fillStyle = '#c99d66';
        context.fillRect(x + 1, y + 1, TILE_SIZE - 2, 1);
        context.fillRect(x + 1, y + TILE_SIZE - 2, TILE_SIZE - 2, 1);
        context.fillRect(x + 1, y + 1, 1, TILE_SIZE - 2);
        context.fillRect(x + TILE_SIZE - 2, y + 1, 1, TILE_SIZE - 2);
        context.fillStyle = '#5f3f24';
        context.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        break;
      case 'crafting_table_side':
        drawPaletteNoise(context, x, y, ['#79512f', '#865b36', '#93653d', '#9f7249'], 111);
        context.fillStyle = '#5d3c22';
        context.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        context.fillStyle = '#b78c57';
        context.fillRect(x + 4, y + 4, TILE_SIZE - 8, 3);
        context.fillRect(x + 4, y + 9, TILE_SIZE - 8, 3);
        break;
      case 'stone_bricks':
        drawPaletteNoise(context, x, y, ['#7b7f85', '#878c93', '#949aa2', '#a0a6ad'], 121);
        context.fillStyle = '#5e6268';
        context.fillRect(x, y + 5, TILE_SIZE, 1);
        context.fillRect(x, y + 11, TILE_SIZE, 1);
        context.fillRect(x + 6, y, 1, 6);
        context.fillRect(x + 12, y + 5, 1, 7);
        drawSpeckles(context, x, y, '#c0c5cd', 122, 0.95);
        break;
      case 'water':
        drawPaletteNoise(context, x, y, ['#356eb5', '#3f7dc6', '#4f90db', '#5ca2ea'], 131);
        drawVerticalTint(context, x, y, '#d6f2ff', '#0c2f66', 0.22);
        context.fillStyle = 'rgba(255,255,255,0.24)';
        for (let row = 2; row < TILE_SIZE; row += 5) {
          context.fillRect(x, y + row, TILE_SIZE, 1);
        }
        break;
      case 'sand':
        drawPaletteNoise(context, x, y, ['#c6b172', '#d1bb7d', '#dbc78e', '#e4d49f'], 141);
        drawSpeckles(context, x, y, '#b29d63', 142, 0.92);
        break;
      case 'clay':
        drawPaletteNoise(context, x, y, ['#7f93a8', '#8ea2b7', '#9eb1c5', '#aebfd0'], 151);
        drawSpeckles(context, x, y, '#6a7e95', 152, 0.93);
        break;
      case 'mud':
        drawPaletteNoise(context, x, y, ['#3f382f', '#4a4238', '#564d42', '#62584b'], 161);
        drawVerticalTint(context, x, y, '#8f7d65', '#261f18', 0.17);
        drawSpeckles(context, x, y, '#746652', 162, 0.93);
        break;
      case 'grass_plant':
        context.fillStyle = '#00000000';
        context.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        context.fillStyle = '#5ca246';
        for (let row = TILE_SIZE - 1; row >= 4; row -= 1) {
          const left = 3 + Math.floor((TILE_SIZE - row) / 4);
          const right = TILE_SIZE - left - 1;
          context.fillRect(x + left, y + row, 1, 1);
          context.fillRect(x + right, y + row, 1, 1);
        }
        context.fillStyle = '#7ec960';
        context.fillRect(x + 7, y + 4, 2, TILE_SIZE - 4);
        break;
      case 'flower_red':
        context.fillStyle = '#00000000';
        context.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        context.fillStyle = '#5e9f49';
        context.fillRect(x + 7, y + 6, 2, TILE_SIZE - 6);
        context.fillStyle = '#dd5a52';
        context.fillRect(x + 4, y + 2, 8, 5);
        context.fillStyle = '#f2d7a5';
        context.fillRect(x + 7, y + 4, 2, 2);
        break;
      default:
        context.fillStyle = '#ff00ff';
        context.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }
}
