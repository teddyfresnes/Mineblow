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

interface TileAssetDefinition {
  textureUrl: string;
  animationMetaUrl?: string;
}

interface McmetaAnimationObjectFrame {
  index?: unknown;
  time?: unknown;
}

interface McmetaAnimationPayload {
  frametime?: unknown;
  frames?: unknown;
}

interface McmetaPayload {
  animation?: McmetaAnimationPayload;
}

export interface ParsedMcmetaAnimation {
  frametime: number;
  frames: Array<number | { index: number; time?: number }> | null;
}

export interface AnimationTimelineFrame {
  index: number;
  durationTicks: number;
}

export interface AnimationPlaybackState {
  timelineIndex: number;
  ticksIntoFrame: number;
  currentFrame: number;
}

interface AnimatedTileState {
  image: HTMLImageElement;
  frameSize: number;
  offset: { x: number; y: number };
  timeline: AnimationTimelineFrame[];
  timelineIndex: number;
  ticksIntoFrame: number;
  tickAccumulator: number;
  currentFrame: number;
}

const TILE_SIZE = 16;
const COLUMNS = 4;
const MINECRAFT_TICK_SECONDS = 0.05;

const tileKeys = [
  'grass_top',
  'grass_side',
  'grass_side_snowed',
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
  'water_still',
  'water_flow',
  'sand',
  'clay',
  'mud',
  'grass_plant',
  'flower_red',
  'gravel',
  'sandstone',
  'sandstone_top',
  'sandstone_bottom',
  'coal_ore',
  'iron_ore',
  'gold_ore',
  'redstone_ore',
  'diamond_ore',
  'lapis_ore',
  'snow',
  'ice',
] as const;

type TileKey = (typeof tileKeys)[number];

const BLOCK_TEXTURES: Record<TileKey, TileAssetDefinition> = {
  grass_top: {
    textureUrl: new URL('../../assets/textures/blocks/grass_top.png', import.meta.url).href,
  },
  grass_side: {
    textureUrl: new URL('../../assets/textures/blocks/grass_side.png', import.meta.url).href,
  },
  grass_side_snowed: {
    textureUrl: new URL('../../assets/textures/blocks/grass_side_snowed.png', import.meta.url).href,
  },
  dirt: {
    textureUrl: new URL('../../assets/textures/blocks/dirt.png', import.meta.url).href,
  },
  stone: {
    textureUrl: new URL('../../assets/textures/blocks/stone.png', import.meta.url).href,
  },
  wood_side: {
    textureUrl: new URL('../../assets/textures/blocks/log_oak.png', import.meta.url).href,
  },
  wood_top: {
    textureUrl: new URL('../../assets/textures/blocks/log_oak_top.png', import.meta.url).href,
  },
  leaves: {
    textureUrl: new URL('../../assets/textures/blocks/leaves_oak.png', import.meta.url).href,
  },
  bedrock: {
    textureUrl: new URL('../../assets/textures/blocks/cobblestone.png', import.meta.url).href,
  },
  planks: {
    textureUrl: new URL('../../assets/textures/blocks/planks_oak.png', import.meta.url).href,
  },
  crafting_table_top: {
    textureUrl: new URL('../../assets/textures/blocks/crafting_table_top.png', import.meta.url).href,
  },
  crafting_table_side: {
    textureUrl: new URL('../../assets/textures/blocks/crafting_table_side.png', import.meta.url).href,
  },
  stone_bricks: {
    textureUrl: new URL('../../assets/textures/blocks/stonebrick.png', import.meta.url).href,
  },
  water_still: {
    textureUrl: new URL('../../assets/textures/blocks/water_still.png', import.meta.url).href,
    animationMetaUrl: new URL('../../assets/textures/blocks/water_still.png.mcmeta', import.meta.url).href,
  },
  water_flow: {
    textureUrl: new URL('../../assets/textures/blocks/water_flow.png', import.meta.url).href,
    animationMetaUrl: new URL('../../assets/textures/blocks/water_flow.png.mcmeta', import.meta.url).href,
  },
  sand: {
    textureUrl: new URL('../../assets/textures/blocks/sand.png', import.meta.url).href,
  },
  clay: {
    textureUrl: new URL('../../assets/textures/blocks/clay.png', import.meta.url).href,
  },
  mud: {
    textureUrl: new URL('../../assets/textures/blocks/dirt.png', import.meta.url).href,
  },
  grass_plant: {
    textureUrl: new URL('../../assets/textures/blocks/tallgrass.png', import.meta.url).href,
  },
  flower_red: {
    textureUrl: new URL('../../assets/textures/blocks/flower_rose.png', import.meta.url).href,
  },
  gravel: {
    textureUrl: new URL('../../assets/textures/blocks/gravel.png', import.meta.url).href,
  },
  sandstone: {
    textureUrl: new URL('../../assets/textures/blocks/sandstone_normal.png', import.meta.url).href,
  },
  sandstone_top: {
    textureUrl: new URL('../../assets/textures/blocks/sandstone_top.png', import.meta.url).href,
  },
  sandstone_bottom: {
    textureUrl: new URL('../../assets/textures/blocks/sandstone_bottom.png', import.meta.url).href,
  },
  coal_ore: {
    textureUrl: new URL('../../assets/textures/blocks/coal_ore.png', import.meta.url).href,
  },
  iron_ore: {
    textureUrl: new URL('../../assets/textures/blocks/iron_ore.png', import.meta.url).href,
  },
  gold_ore: {
    textureUrl: new URL('../../assets/textures/blocks/gold_ore.png', import.meta.url).href,
  },
  redstone_ore: {
    textureUrl: new URL('../../assets/textures/blocks/redstone_ore.png', import.meta.url).href,
  },
  diamond_ore: {
    textureUrl: new URL('../../assets/textures/blocks/diamond_ore.png', import.meta.url).href,
  },
  lapis_ore: {
    textureUrl: new URL('../../assets/textures/blocks/lapis_ore.png', import.meta.url).href,
  },
  snow: {
    textureUrl: new URL('../../assets/textures/blocks/snow.png', import.meta.url).href,
  },
  // b1.7.3 parity fallback: use glass when ice texture is missing from assets.
  ice: {
    textureUrl: new URL('../../assets/textures/blocks/glass.png', import.meta.url).href,
  },
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

const toPositiveInt = (value: unknown, fallback: number): number => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }
  const normalized = Math.floor(value);
  return normalized >= 1 ? normalized : fallback;
};

export const parseMcmetaAnimation = (raw: string): ParsedMcmetaAnimation | null => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  const animation = (parsed as McmetaPayload).animation;
  if (!animation || typeof animation !== 'object') {
    return null;
  }

  const frametime = toPositiveInt(animation.frametime, 1);
  const rawFrames = Array.isArray(animation.frames) ? animation.frames : null;
  if (!rawFrames) {
    return { frametime, frames: null };
  }

  const frames: Array<number | { index: number; time?: number }> = [];
  for (const frame of rawFrames) {
    if (typeof frame === 'number' && Number.isFinite(frame)) {
      frames.push(Math.floor(frame));
      continue;
    }
    if (!frame || typeof frame !== 'object') {
      continue;
    }

    const typedFrame = frame as McmetaAnimationObjectFrame;
    if (typeof typedFrame.index !== 'number' || !Number.isFinite(typedFrame.index)) {
      continue;
    }

    const index = Math.floor(typedFrame.index);
    const time = typedFrame.time;
    if (typeof time === 'number' && Number.isFinite(time)) {
      frames.push({
        index,
        time: Math.floor(time),
      });
      continue;
    }
    frames.push({ index });
  }

  return {
    frametime,
    frames,
  };
};

export const resolveAnimationTimeline = (
  frameCount: number,
  parsed: ParsedMcmetaAnimation | null,
): AnimationTimelineFrame[] => {
  const safeFrameCount = Math.max(1, Math.floor(frameCount));
  const fallbackFrametime = toPositiveInt(parsed?.frametime ?? 1, 1);
  const timeline: AnimationTimelineFrame[] = [];
  const rawFrames = parsed?.frames;

  if (rawFrames && rawFrames.length > 0) {
    for (const frame of rawFrames) {
      if (typeof frame === 'number') {
        const index = Math.floor(frame);
        if (index < 0 || index >= safeFrameCount) {
          continue;
        }
        timeline.push({
          index,
          durationTicks: fallbackFrametime,
        });
        continue;
      }

      const index = Math.floor(frame.index);
      if (index < 0 || index >= safeFrameCount) {
        continue;
      }
      timeline.push({
        index,
        durationTicks: toPositiveInt(frame.time, fallbackFrametime),
      });
    }
  }

  if (timeline.length > 0) {
    return timeline;
  }

  for (let frameIndex = 0; frameIndex < safeFrameCount; frameIndex += 1) {
    timeline.push({
      index: frameIndex,
      durationTicks: fallbackFrametime,
    });
  }
  return timeline;
};

export const advanceAnimationPlayback = (
  timeline: AnimationTimelineFrame[],
  state: AnimationPlaybackState,
  wholeTicks: number,
): AnimationPlaybackState & { changed: boolean } => {
  if (timeline.length === 0 || wholeTicks <= 0) {
    return {
      ...state,
      changed: false,
    };
  }

  let ticksRemaining = Math.floor(wholeTicks);
  let timelineIndex = state.timelineIndex;
  let ticksIntoFrame = state.ticksIntoFrame;
  let currentFrame = state.currentFrame;
  let changed = false;

  while (ticksRemaining > 0) {
    ticksRemaining -= 1;
    ticksIntoFrame += 1;
    const step = timeline[timelineIndex];
    if (ticksIntoFrame < step.durationTicks) {
      continue;
    }

    ticksIntoFrame = 0;
    timelineIndex = (timelineIndex + 1) % timeline.length;
    const nextFrame = timeline[timelineIndex].index;
    if (nextFrame !== currentFrame) {
      currentFrame = nextFrame;
      changed = true;
    }
  }

  return {
    timelineIndex,
    ticksIntoFrame,
    currentFrame,
    changed,
  };
};

const loadAnimationMeta = async (url: string): Promise<ParsedMcmetaAnimation | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const raw = await response.text();
    return parseMcmetaAnimation(raw);
  } catch {
    return null;
  }
};

export class TextureAtlas {
  readonly material: MeshLambertMaterial;
  private readonly tileMap = new Map<TileKey, TileRect>();
  private readonly tileOffsets = new Map<TileKey, { x: number; y: number }>();
  private readonly texture: CanvasTexture;
  private readonly context: CanvasRenderingContext2D;
  private readonly animatedTiles: AnimatedTileState[] = [];

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.width = COLUMNS * TILE_SIZE;
    canvas.height = Math.ceil(tileKeys.length / COLUMNS) * TILE_SIZE;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to create texture atlas.');
    }
    context.imageSmoothingEnabled = false;
    this.context = context;

    tileKeys.forEach((key, index) => {
      const column = index % COLUMNS;
      const row = Math.floor(index / COLUMNS);
      const x = column * TILE_SIZE;
      const y = row * TILE_SIZE;

      this.tileOffsets.set(key, { x, y });
      this.drawPlaceholder(x, y);
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

    void this.drawAssetTiles();
  }

  update(dtSeconds: number): void {
    if (this.animatedTiles.length === 0 || dtSeconds <= 0) {
      return;
    }

    let changed = false;
    for (const tile of this.animatedTiles) {
      tile.tickAccumulator += dtSeconds / MINECRAFT_TICK_SECONDS;

      const wholeTicks = Math.floor(tile.tickAccumulator);
      if (wholeTicks <= 0) {
        continue;
      }
      tile.tickAccumulator -= wholeTicks;
      const nextState = advanceAnimationPlayback(
        tile.timeline,
        {
          timelineIndex: tile.timelineIndex,
          ticksIntoFrame: tile.ticksIntoFrame,
          currentFrame: tile.currentFrame,
        },
        wholeTicks,
      );
      tile.timelineIndex = nextState.timelineIndex;
      tile.ticksIntoFrame = nextState.ticksIntoFrame;
      tile.currentFrame = nextState.currentFrame;

      if (!nextState.changed) {
        continue;
      }

      this.drawAnimationFrame(tile);
      changed = true;
    }

    if (changed) {
      this.texture.needsUpdate = true;
    }
  }

  getTileRect(key: string): TileRect {
    const rect = this.tileMap.get(key as TileKey);
    if (!rect) {
      throw new Error(`Unknown atlas tile ${key}`);
    }
    return rect;
  }

  private drawPlaceholder(x: number, y: number): void {
    const stripeHeight = 4;
    for (let row = 0; row < TILE_SIZE; row += stripeHeight) {
      const paletteIndex = Math.floor(row / stripeHeight) % PLACEHOLDER_COLORS.length;
      this.context.fillStyle = PLACEHOLDER_COLORS[paletteIndex];
      this.context.fillRect(x, y + row, TILE_SIZE, stripeHeight);
    }
  }

  private async drawAssetTiles(): Promise<void> {
    const drawTasks = tileKeys.map(async (key) => {
      const definition = BLOCK_TEXTURES[key];
      const offset = this.tileOffsets.get(key);
      if (!offset) {
        return;
      }

      try {
        const image = await loadImage(definition.textureUrl);
        const frameSize = Math.max(1, Math.floor(image.width));
        const frameCount = Math.max(1, Math.floor(image.height / frameSize));
        const hasAnimationMetadata = !!definition.animationMetaUrl;

        if (hasAnimationMetadata && frameCount > 1) {
          const parsed = definition.animationMetaUrl
            ? await loadAnimationMeta(definition.animationMetaUrl)
            : null;
          const timeline = resolveAnimationTimeline(frameCount, parsed);
          const initialFrame = timeline[0]?.index ?? 0;
          const animated: AnimatedTileState = {
            image,
            frameSize,
            offset,
            timeline,
            timelineIndex: 0,
            ticksIntoFrame: 0,
            tickAccumulator: 0,
            currentFrame: initialFrame,
          };
          this.animatedTiles.push(animated);
          this.drawAnimationFrame(animated);
          return;
        }

        this.drawStaticImage(image, offset.x, offset.y);
      } catch {
        // Keep placeholder if a texture file fails to load.
      }
    });

    await Promise.all(drawTasks);
    this.texture.needsUpdate = true;
  }

  private drawAnimationFrame(tile: AnimatedTileState): void {
    const sourceY = tile.currentFrame * tile.frameSize;
    this.context.clearRect(tile.offset.x, tile.offset.y, TILE_SIZE, TILE_SIZE);
    this.context.drawImage(
      tile.image,
      0,
      sourceY,
      tile.frameSize,
      tile.frameSize,
      tile.offset.x,
      tile.offset.y,
      TILE_SIZE,
      TILE_SIZE,
    );
  }

  private drawStaticImage(
    image: HTMLImageElement,
    x: number,
    y: number,
  ): void {
    const sourceSize = Math.min(TILE_SIZE, image.width, image.height);
    this.context.clearRect(x, y, TILE_SIZE, TILE_SIZE);
    this.context.drawImage(
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
