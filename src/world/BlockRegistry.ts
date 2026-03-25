import type { BlockDefinition, BlockId, BlockKey } from '../types/blocks';
import { getCurrentLanguage, translate, type UiLanguage } from '../i18n/Language';
import type { BlockMessageKey } from '../i18n/messages';

interface InternalBlockDefinition extends BlockDefinition {
  uiColor: string;
}

export const WATER_SOURCE_BLOCK_ID = 10 as const;
export const WATER_FLOW_LEVEL_MIN = 1 as const;
export const WATER_FLOW_LEVEL_MAX = 7 as const;
const WATER_FLOW_BLOCK_IDS = [26, 27, 28, 29, 30, 31, 32] as const;

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
    label: 'Herbe',
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
    label: 'Terre',
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
    label: 'Pierre',
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
    label: 'Buche',
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
    label: 'Feuilles',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 500,
    textureTop: 'leaves',
    textureSide: 'leaves',
    textureBottom: 'leaves',
    transparent: true,
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
    label: 'Planches',
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
    label: 'Table de craft',
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
    label: 'Briques de pierre',
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
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  sand: {
    id: 11,
    key: 'sand',
    label: 'Sable',
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
    label: 'Argile',
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
    label: 'Boue',
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
    label: 'Hautes herbes',
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
    label: 'Fleur rouge',
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
  gravel: {
    id: 16,
    key: 'gravel',
    label: 'Gravier',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 760,
    textureTop: 'gravel',
    textureSide: 'gravel',
    textureBottom: 'gravel',
    uiColor: '#7b7772',
  },
  sandstone: {
    id: 17,
    key: 'sandstone',
    label: 'Gres',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 980,
    textureTop: 'sandstone_top',
    textureSide: 'sandstone',
    textureBottom: 'sandstone_bottom',
    uiColor: '#d0ba8a',
  },
  coal_ore: {
    id: 18,
    key: 'coal_ore',
    label: 'Minerai de charbon',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 1950,
    textureTop: 'coal_ore',
    textureSide: 'coal_ore',
    textureBottom: 'coal_ore',
    uiColor: '#565656',
  },
  iron_ore: {
    id: 19,
    key: 'iron_ore',
    label: 'Minerai de fer',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 2050,
    textureTop: 'iron_ore',
    textureSide: 'iron_ore',
    textureBottom: 'iron_ore',
    uiColor: '#a28c73',
  },
  gold_ore: {
    id: 20,
    key: 'gold_ore',
    label: 'Minerai d or',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 2100,
    textureTop: 'gold_ore',
    textureSide: 'gold_ore',
    textureBottom: 'gold_ore',
    uiColor: '#d1aa4f',
  },
  redstone_ore: {
    id: 21,
    key: 'redstone_ore',
    label: 'Minerai de redstone',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 2200,
    textureTop: 'redstone_ore',
    textureSide: 'redstone_ore',
    textureBottom: 'redstone_ore',
    uiColor: '#9f2e2e',
  },
  diamond_ore: {
    id: 22,
    key: 'diamond_ore',
    label: 'Minerai de diamant',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 2250,
    textureTop: 'diamond_ore',
    textureSide: 'diamond_ore',
    textureBottom: 'diamond_ore',
    uiColor: '#4da5b9',
  },
  lapis_ore: {
    id: 23,
    key: 'lapis_ore',
    label: 'Minerai de lapis',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 2050,
    textureTop: 'lapis_ore',
    textureSide: 'lapis_ore',
    textureBottom: 'lapis_ore',
    uiColor: '#3651ab',
  },
  snow: {
    id: 24,
    key: 'snow',
    label: 'Neige',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 320,
    textureTop: 'snow',
    textureSide: 'snow',
    textureBottom: 'snow',
    uiColor: '#e2e8ef',
  },
  ice: {
    id: 25,
    key: 'ice',
    label: 'Glace',
    solid: true,
    mineable: true,
    placeable: true,
    mineDurationMs: 780,
    textureTop: 'ice',
    textureSide: 'ice',
    textureBottom: 'ice',
    transparent: true,
    uiColor: '#8db6d8',
  },
  water_flow_1: {
    id: 26,
    key: 'water_flow_1',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_2: {
    id: 27,
    key: 'water_flow_2',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_3: {
    id: 28,
    key: 'water_flow_3',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_4: {
    id: 29,
    key: 'water_flow_4',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_5: {
    id: 30,
    key: 'water_flow_5',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_6: {
    id: 31,
    key: 'water_flow_6',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
  },
  water_flow_7: {
    id: 32,
    key: 'water_flow_7',
    label: 'Eau',
    solid: false,
    mineable: false,
    placeable: false,
    mineDurationMs: 0,
    textureTop: 'water_still',
    textureSide: 'water_flow',
    textureBottom: 'water_still',
    transparent: true,
    liquid: true,
    uiColor: '#4f89d6',
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

export const getBlockLabel = (
  blockId: BlockId,
  language: UiLanguage = getCurrentLanguage(),
): string => {
  const blockKey: BlockMessageKey = getBlockDefinition(blockId).key;
  return translate(`blocks.${blockKey}`, {}, language);
};

export const getUiBlockColor = (blockId: BlockId | null): string =>
  blockId === null ? 'transparent' : byId.get(blockId)?.uiColor ?? '#000';

export const getMineDurationMs = (blockId: BlockId): number => getBlockDefinition(blockId).mineDurationMs;

export const isSolidBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).solid;

export const isMineableBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).mineable;

export const isPlaceableBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).placeable;

export const isWaterBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).liquid === true;

export const isWaterSource = (blockId: BlockId): boolean => blockId === WATER_SOURCE_BLOCK_ID;

export const isWaterFlowBlock = (blockId: BlockId): boolean =>
  WATER_FLOW_BLOCK_IDS.includes(blockId as (typeof WATER_FLOW_BLOCK_IDS)[number]);

export const getWaterLevel = (blockId: BlockId): number | null => {
  if (blockId === WATER_SOURCE_BLOCK_ID) {
    return 0;
  }
  if (!isWaterFlowBlock(blockId)) {
    return null;
  }

  return blockId - WATER_FLOW_BLOCK_IDS[0] + 1;
};

export const toFlowWaterId = (level: number): BlockId => {
  const clamped = Math.max(WATER_FLOW_LEVEL_MIN, Math.min(WATER_FLOW_LEVEL_MAX, Math.floor(level)));
  return WATER_FLOW_BLOCK_IDS[clamped - 1] as BlockId;
};

export const isTransparentBlock = (blockId: BlockId): boolean =>
  getBlockDefinition(blockId).transparent === true;

export const isPlantBlock = (blockId: BlockId): boolean => getBlockDefinition(blockId).plant === true;
