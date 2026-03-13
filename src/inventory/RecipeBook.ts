import type { BlockId } from '../types/blocks';
import type { Inventory } from './Inventory';
import { getCurrentLanguage, translate, type UiLanguage } from '../i18n/Language';
import type { RecipeMessageKey } from '../i18n/messages';

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

interface RecipeDefinition extends Omit<Recipe, 'id' | 'label' | 'description'> {
  id: RecipeMessageKey;
}

const RECIPES: RecipeDefinition[] = [
  {
    id: 'planks',
    mode: 'both',
    ingredients: [{ blockId: 4, count: 1 }],
    output: { blockId: 7, count: 4 },
  },
  {
    id: 'crafting_table',
    mode: 'both',
    ingredients: [{ blockId: 7, count: 4 }],
    output: { blockId: 8, count: 1 },
  },
  {
    id: 'stone_bricks',
    mode: 'crafting_table',
    ingredients: [{ blockId: 3, count: 4 }],
    output: { blockId: 9, count: 4 },
  },
];

const localizeRecipe = (recipe: RecipeDefinition, language: UiLanguage): Recipe => ({
  id: recipe.id,
  label: translate(`recipes.${recipe.id}.label`, {}, language),
  description: translate(`recipes.${recipe.id}.description`, {}, language),
  mode: recipe.mode,
  ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient })),
  output: { ...recipe.output },
});

export const getRecipesForMode = (
  mode: CraftingMode,
  language: UiLanguage = getCurrentLanguage(),
): Recipe[] =>
  RECIPES
    .filter((recipe) => recipe.mode === 'both' || recipe.mode === mode)
    .map((recipe) => localizeRecipe(recipe, language));

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
