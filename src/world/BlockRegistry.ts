import type { BlockDefinition, BlockId, BlockKey } from '../types/blocks';

interface InternalBlockDefinition extends BlockDefinition {
  uiColor: string;
}

const definitions: Record<BlockKey, InternalBlockDefinition> = {
  air: {
    id: 0,
    key: 'air',
    label: 'Air',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    uiColor: 'transparent',
  },
  grass: {
    id: 1,
    key: 'grass',
    label: 'Grass',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 600,
    textureTop: 'grass_top',
    textureSide: 'grass_side',
    textureBottom: 'dirt',
    uiColor: '#6eb75e',
  },
  dirt: {
    id: 2,
    key: 'dirt',
    label: 'Dirt',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 550,
    textureTop: 'dirt',
    textureSide: 'dirt',
    textureBottom: 'dirt',
    uiColor: '#8d5a34',
  },
  stone: {
    id: 3,
    key: 'stone',
    label: 'Stone',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 1700,
    textureTop: 'stone',
    textureSide: 'stone',
    textureBottom: 'stone',
    uiColor: '#87898e',
  },
  wood: {
    id: 4,
    key: 'wood',
    label: 'Log',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 1250,
    textureTop: 'wood_top',
    textureSide: 'wood_side',
    textureBottom: 'wood_top',
    uiColor: '#8c6239',
  },
  leaves: {
    id: 5,
    key: 'leaves',
    label: 'Leaves',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 500,
    textureTop: 'leaves',
    textureSide: 'leaves',
    textureBottom: 'leaves',
    uiColor: '#4d8748',
  },
  bedrock: {
    id: 6,
    key: 'bedrock',
    label: 'Bedrock',
    solid: true,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'bedrock',
    textureSide: 'bedrock',
    textureBottom: 'bedrock',
    uiColor: '#393a3c',
  },
  planks: {
    id: 7,
    key: 'planks',
    label: 'Planks',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 700,
    textureTop: 'planks',
    textureSide: 'planks',
    textureBottom: 'planks',
    uiColor: '#c08b51',
  },
  crafting_table: {
    id: 8,
    key: 'crafting_table',
    label: 'Crafting Table',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 1200,
    textureTop: 'crafting_table_top',
    textureSide: 'crafting_table_side',
    textureBottom: 'planks',
    uiColor: '#8b623c',
  },
  stone_bricks: {
    id: 9,
    key: 'stone_bricks',
    label: 'Stone Bricks',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 1900,
    textureTop: 'stone_bricks',
    textureSide: 'stone_bricks',
    textureBottom: 'stone_bricks',
    uiColor: '#8a8d95',
  },
  water: {
    id: 10,
    key: 'water',
    label: 'Water',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water',
    textureSide: 'water',
    textureBottom: 'water',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  sand: {
    id: 11,
    key: 'sand',
    label: 'Sand',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 650,
    textureTop: 'sand',
    textureSide: 'sand',
    textureBottom: 'sand',
    uiColor: '#d8c07f',
  },
  clay: {
    id: 12,
    key: 'clay',
    label: 'Clay',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 900,
    textureTop: 'clay',
    textureSide: 'clay',
    textureBottom: 'clay',
    uiColor: '#8ea2b7',
  },
  mud: {
    id: 13,
    key: 'mud',
    label: 'Mud',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 820,
    textureTop: 'mud',
    textureSide: 'mud',
    textureBottom: 'mud',
    uiColor: '#4f463c',
  },
  grass_plant: {
    id: 14,
    key: 'grass_plant',
    label: 'Tall Grass',
    solid: false,
    mineable: true,
    placeable: true,
    mineDurationMs: 280,
    textureTop: 'grass_plant',
    textureSide: 'grass_plant',
    textureBottom: 'grass_plant',
    transparent: true,
    plant: true,
    uiColor: '#6cab58',
  },
  flower_red: {
    id: 15,
    key: 'flower_red',
    label: 'Red Flower',
    solid: false,
    mineable: true,
    placeable: true,
    mineDurationMs: 260,
    textureTop: 'flower_red',
    textureSide: 'flower_red',
    textureBottom: 'flower_red',
    transparent: true,
    plant: true,
    uiColor: '#d3504f',
  },
};

const byId = new Map<BlockId, InternalBlockDefinition>(
  Object.values(definitions).map((definition) => [definition.id, definition]),
);

export const getBlockDefinition = (blockId: BlockId): BlockDefinition => {
  const definition = byId.get(blockId);
  if (!definition) {
    throw new Error(`Unknown block id ${blockId}`);
  }
  return definition;
};

export const getBlockKey = (blockId: BlockId): BlockKey => getBlockDefinition(blockId).key;

export const getBlockLabel = (blockId: BlockId): string => getBlockDefinition(blockId).label;

export const getUiBlockColor = (blockId: BlockId | null): string =>
  blockId === null ? 'transparent' : byId.get(blockId)?.uiColor ?? '#000';

export const getMineDurationMs = (blockId: BlockId): number => getBlockDefinition(blockId).mineDurationMs;

export const isSolidBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).solid;

export const isMineableBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).mineable;

export const isPlaceableBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).placeable;

export const isWaterBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).liquid === true;

export const isTransparentBlock = (blockId: BlockId): boolean =>
  getBlockDefinition(blockId).transparent === true;

export const isPlantBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).plant === true;
