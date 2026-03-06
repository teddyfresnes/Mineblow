import type { BlockId } from '../types/blocks';
import type { Inventory } from './Inventory';

export type CraftingMode = 'player' | 'crafting_table';

export interface RecipeIngredient {
  blockId: BlockId;
  count: number;
}

export interface Recipe {
  id: string;
  label: string;
  description: string;
  mode: CraftingMode | 'both';
  ingredients: RecipeIngredient[];
  output: {
    blockId: BlockId;
    count: number;
  };
}

const RECIPES: Recipe[] = [
  {
    id: 'planks',
    label: 'Planks x4',
    description: 'Turn one log into four planks.',
    mode: 'both',
    ingredients: [{ blockId: 4, count: 1 }],
    output: { blockId: 7, count: 4 },
  },
  {
    id: 'crafting_table',
    label: 'Crafting Table',
    description: 'Four planks form a workbench.',
    mode: 'both',
    ingredients: [{ blockId: 7, count: 4 }],
    output: { blockId: 8, count: 1 },
  },
  {
    id: 'stone_bricks',
    label: 'Stone Bricks x4',
    description: 'Workbench recipe for a cleaner stone block.',
    mode: 'crafting_table',
    ingredients: [{ blockId: 3, count: 4 }],
    output: { blockId: 9, count: 4 },
  },
];

export const getRecipesForMode = (mode: CraftingMode): Recipe[] =>
  RECIPES.filter((recipe) => recipe.mode === 'both' || recipe.mode === mode);

export const canCraftRecipe = (inventory: Inventory, recipe: Recipe): boolean => {
  if (!inventory.canAddBlock(recipe.output.blockId, recipe.output.count)) {
    return false;
  }

  return recipe.ingredients.every(
    (ingredient) => inventory.getBlockCount(ingredient.blockId) >= ingredient.count,
  );
};

export const craftRecipe = (inventory: Inventory, recipe: Recipe): boolean => {
  if (!canCraftRecipe(inventory, recipe)) {
    return false;
  }

  recipe.ingredients.forEach((ingredient) => {
    inventory.removeBlock(ingredient.blockId, ingredient.count);
  });

  return inventory.addBlock(recipe.output.blockId, recipe.output.count);
};
