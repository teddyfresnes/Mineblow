export type BlockId =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type BlockKey =
  | 'air'
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'wood'
  | 'leaves'
  | 'bedrock'
  | 'planks'
  | 'crafting_table'
  | 'stone_bricks'
  | 'water'
  | 'sand'
  | 'clay'
  | 'mud'
  | 'grass_plant'
  | 'flower_red';

export interface BlockDefinition {
  id: BlockId;
  key: BlockKey;
  label: string;
  solid: boolean;
  mineable: boolean;
  placeable: boolean;
  mineDurationMs: number;
  textureTop?: string;
  textureSide?: string;
  textureBottom?: string;
  transparent?: boolean;
  liquid?: boolean;
  plant?: boolean;
}
