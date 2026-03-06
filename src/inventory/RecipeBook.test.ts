import { describe, expect, it } from 'vitest';
import { Inventory } from './Inventory';
import { canCraftRecipe, craftRecipe, getRecipesForMode } from './RecipeBook';

describe('RecipeBook', () => {
  it('gates workbench-only recipes from the player recipe list', () => {
    const playerRecipes = getRecipesForMode('player').map((recipe) => recipe.id);
    const tableRecipes = getRecipesForMode('crafting_table').map((recipe) => recipe.id);

    expect(playerRecipes).not.toContain('stone_bricks');
    expect(tableRecipes).toContain('stone_bricks');
  });

  it('consumes ingredients and adds output when crafting succeeds', () => {
    const inventory = new Inventory();
    inventory.addBlock(4, 1);
    const recipe = getRecipesForMode('player').find((candidate) => candidate.id === 'planks');

    expect(recipe).toBeDefined();
    expect(canCraftRecipe(inventory, recipe!)).toBe(true);
    expect(craftRecipe(inventory, recipe!)).toBe(true);
    expect(inventory.getBlockCount(4)).toBe(0);
    expect(inventory.getBlockCount(7)).toBe(4);
  });
});
