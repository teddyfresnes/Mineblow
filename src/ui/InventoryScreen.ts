import type { InventorySlot } from '../types/player';
import { getBlockLabel, getUiBlockColor } from '../world/BlockRegistry';
import type { CraftingMode, Recipe } from '../inventory/RecipeBook';
import { SkinViewer } from './SkinViewer';

export interface SlotInteractEvent {
  index: number;
  button: 'left' | 'right';
  shift: boolean;
}

interface InventoryScreenHandlers {
  onClose: () => void;
  onSlotInteract: (event: SlotInteractEvent) => void;
  onRecipeCraft: (recipeId: string) => void;
  onSkinChange: (skinDataUrl: string | null) => void;
}

export interface InventoryScreenState {
  mode: CraftingMode;
  slots: InventorySlot[];
  selectedHotbarIndex: number;
  cursor: InventorySlot;
  recipes: Recipe[];
  craftableRecipeIds: Set<string>;
  skinDataUrl: string | null;
}

type RecipeFilter = 'craftable' | 'all';

export class InventoryScreen {
  private readonly root = document.createElement('div');
  private readonly title = document.createElement('h2');
  private readonly status = document.createElement('div');
  private readonly recipeList = document.createElement('div');
  private readonly mainGrid = document.createElement('div');
  private readonly hotbarGrid = document.createElement('div');
  private readonly cursorLabel = document.createElement('div');
  private readonly hoverLabel = document.createElement('div');
  private readonly skinInput = document.createElement('input');
  private readonly slotButtons: HTMLButtonElement[] = [];
  private readonly filterButtons = new Map<RecipeFilter, HTMLButtonElement>();
  private readonly skinViewer: SkinViewer;
  private visible = false;
  private loadedSkinDataUrl: string | null = null;
  private hoveredSlotIndex: number | null = null;
  private pointerX = 0;
  private pointerY = 0;
  private latestState: InventoryScreenState | null = null;
  private recipeFilter: RecipeFilter = 'craftable';

  constructor(parent: HTMLElement, private readonly handlers: InventoryScreenHandlers) {
    this.root.className = 'inventory-layer';
    this.root.addEventListener('mousemove', (event) => {
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      this.positionHoverLabel();
    });

    const panel = document.createElement('div');
    panel.className = 'inventory-panel';

    const rail = document.createElement('div');
    rail.className = 'inventory-rail';
    rail.append(
      this.createFilterButton('craftable', 'Craftable'),
      this.createFilterButton('all', 'All'),
    );

    const sidebar = document.createElement('div');
    sidebar.className = 'inventory-sidebar';

    this.title.className = 'inventory-title';
    this.status.className = 'inventory-status';
    this.recipeList.className = 'recipe-list';

    const workspace = document.createElement('div');
    workspace.className = 'inventory-workspace';

    const inventoryBoard = document.createElement('div');
    inventoryBoard.className = 'inventory-board';

    const boardHeader = document.createElement('div');
    boardHeader.className = 'inventory-board-header';
    const boardTitle = document.createElement('h3');
    boardTitle.className = 'inventory-section-title';
    boardTitle.textContent = 'Storage';
    const boardHint = document.createElement('span');
    boardHint.textContent = 'Left click swap, right click split, shift click quick-move.';
    boardHeader.append(boardTitle, boardHint);

    const sectionMain = document.createElement('section');
    sectionMain.className = 'inventory-section';
    this.mainGrid.className = 'inventory-grid inventory-grid-main';

    const sectionHotbar = document.createElement('section');
    sectionHotbar.className = 'inventory-section inventory-hotbar-section';
    const sectionHotbarTitle = document.createElement('h3');
    sectionHotbarTitle.className = 'inventory-section-title';
    sectionHotbarTitle.textContent = 'Hotbar';
    this.hotbarGrid.className = 'inventory-grid inventory-grid-hotbar';

    for (let index = 0; index < 36; index += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `inventory-slot${index >= 27 ? ' hotbar' : ''}`;
      button.addEventListener('click', (event) => {
        this.handlers.onSlotInteract({
          index,
          button: 'left',
          shift: event.shiftKey,
        });
      });
      button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        this.handlers.onSlotInteract({
          index,
          button: 'right',
          shift: event.shiftKey,
        });
      });
      button.addEventListener('mouseenter', () => {
        this.hoveredSlotIndex = index;
        this.renderHoverLabel();
      });
      button.addEventListener('mouseleave', () => {
        this.hoveredSlotIndex = null;
        this.renderHoverLabel();
      });

      const preview = document.createElement('div');
      preview.className = 'inventory-slot-preview';
      const count = document.createElement('div');
      count.className = 'inventory-slot-count';
      button.append(preview, count);

      if (index < 27) {
        this.mainGrid.append(button);
      } else {
        this.hotbarGrid.append(button);
      }
      this.slotButtons.push(button);
    }

    sectionMain.append(this.mainGrid);
    sectionHotbar.append(sectionHotbarTitle, this.hotbarGrid);

    this.cursorLabel.className = 'inventory-cursor';
    this.hoverLabel.className = 'inventory-hover';

    inventoryBoard.append(boardHeader, sectionMain, sectionHotbar, this.cursorLabel);

    const previewPanel = document.createElement('div');
    previewPanel.className = 'inventory-preview';

    const paperdollCard = document.createElement('div');
    paperdollCard.className = 'inventory-side-card';
    const paperdollTitle = document.createElement('h3');
    paperdollTitle.className = 'inventory-section-title';
    paperdollTitle.textContent = 'Character';
    const paperdoll = document.createElement('div');
    paperdoll.className = 'paperdoll';
    paperdoll.innerHTML = `
      <div class="paperdoll-scale">3D player preview</div>
      <div class="paperdoll-stage"></div>
    `;
    const paperdollStage = paperdoll.querySelector<HTMLElement>('.paperdoll-stage');
    if (!paperdollStage) {
      throw new Error('Paperdoll stage missing');
    }
    this.skinViewer = new SkinViewer(paperdollStage);

    const skinLoader = document.createElement('label');
    skinLoader.className = 'skin-loader';
    skinLoader.textContent = 'Load skin (64x64 PNG)';
    this.skinInput.type = 'file';
    this.skinInput.accept = 'image/png';
    this.skinInput.addEventListener('change', () => {
      const file = this.skinInput.files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.loadedSkinDataUrl = reader.result;
          void this.skinViewer.setSkin(reader.result);
          this.handlers.onSkinChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
      this.skinInput.value = '';
    });
    skinLoader.append(this.skinInput);
    paperdollCard.append(paperdollTitle, paperdoll, skinLoader);

    const equipmentCard = document.createElement('div');
    equipmentCard.className = 'inventory-side-card';
    const equipmentTitle = document.createElement('h3');
    equipmentTitle.className = 'inventory-section-title';
    equipmentTitle.textContent = 'Equipment';
    const equipmentNote = document.createElement('p');
    equipmentNote.className = 'inventory-side-note';
    equipmentNote.textContent = 'Reserved vertical slots for future armor/equipment.';
    const equipmentSlots = document.createElement('div');
    equipmentSlots.className = 'equipment-slot-column';
    for (let index = 0; index < 4; index += 1) {
      const slot = document.createElement('div');
      slot.className = 'equipment-slot';
      slot.textContent = 'Soon';
      equipmentSlots.append(slot);
    }
    equipmentCard.append(equipmentTitle, equipmentNote, equipmentSlots);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'inventory-close';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => this.handlers.onClose());

    sidebar.append(this.title, this.status, this.recipeList);
    workspace.append(inventoryBoard, closeButton);
    previewPanel.append(paperdollCard, equipmentCard);
    panel.append(rail, sidebar, workspace, previewPanel, this.hoverLabel);
    this.root.append(panel);
    parent.append(this.root);
    this.setVisible(false);
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.root.style.display = visible ? 'grid' : 'none';
    if (!visible) {
      this.hoveredSlotIndex = null;
      this.renderHoverLabel();
    }
  }

  isVisible(): boolean {
    return this.visible;
  }

  dispose(): void {
    this.skinViewer.dispose();
  }

  render(state: InventoryScreenState): void {
    this.latestState = state;
    this.title.textContent =
      state.mode === 'crafting_table' ? 'Crafting Table' : 'Inventory';

    const visibleRecipes =
      this.recipeFilter === 'craftable'
        ? state.recipes.filter((recipe) => state.craftableRecipeIds.has(recipe.id))
        : state.recipes;
    const craftableCount = state.recipes.filter((recipe) => state.craftableRecipeIds.has(recipe.id)).length;
    this.status.textContent =
      state.mode === 'crafting_table'
        ? `${craftableCount} recipe(s) available on the table.`
        : `${craftableCount} recipe(s) available from the player inventory.`;

    this.filterButtons.forEach((button, filter) => {
      button.classList.toggle('active', filter === this.recipeFilter);
    });

    if (this.loadedSkinDataUrl !== state.skinDataUrl) {
      this.loadedSkinDataUrl = state.skinDataUrl;
      void this.skinViewer.setSkin(state.skinDataUrl);
    }

    this.recipeList.replaceChildren();
    if (visibleRecipes.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'recipe-empty';
      empty.textContent =
        this.recipeFilter === 'craftable'
          ? 'Nothing craftable right now.'
          : 'No recipes available in this mode.';
      this.recipeList.append(empty);
    } else {
      visibleRecipes.forEach((recipe) => {
        const craftable = state.craftableRecipeIds.has(recipe.id);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'recipe-card';
        button.disabled = !craftable;
        button.addEventListener('click', () => this.handlers.onRecipeCraft(recipe.id));

        const icon = document.createElement('div');
        icon.className = 'recipe-icon';
        icon.style.background = getUiBlockColor(recipe.output.blockId);

        const body = document.createElement('div');
        body.className = 'recipe-card-body';
        const label = document.createElement('strong');
        label.textContent = recipe.label;
        const description = document.createElement('span');
        description.textContent = recipe.description;

        const ingredients = document.createElement('div');
        ingredients.className = 'recipe-ingredients';
        recipe.ingredients.forEach((ingredient) => {
          const chip = document.createElement('div');
          chip.className = 'recipe-chip';
          chip.innerHTML = `<b style="background:${getUiBlockColor(ingredient.blockId)}"></b>${ingredient.count} x ${getBlockLabel(ingredient.blockId)}`;
          ingredients.append(chip);
        });

        body.append(label, description, ingredients);
        button.append(icon, body);
        this.recipeList.append(button);
      });
    }

    state.slots.forEach((slot, index) => {
      const button = this.slotButtons[index];
      const preview = button.children[0] as HTMLDivElement;
      const count = button.children[1] as HTMLDivElement;
      const hotbarIndex = index - 27;

      button.classList.toggle('selected', hotbarIndex === state.selectedHotbarIndex && hotbarIndex >= 0);
      button.classList.toggle('filled', slot.blockId !== null && slot.count > 0);
      preview.style.background = getUiBlockColor(slot.blockId);
      preview.textContent = slot.blockId === null ? '' : getBlockLabel(slot.blockId).slice(0, 1).toUpperCase();
      count.textContent = slot.count > 0 ? String(slot.count) : '';
      count.style.display = slot.count > 0 ? '' : 'none';
    });

    if (state.cursor.blockId === null || state.cursor.count === 0) {
      this.cursorLabel.textContent = 'Cursor: empty';
    } else {
      this.cursorLabel.textContent = `Cursor: ${state.cursor.count} x ${getBlockLabel(state.cursor.blockId)}`;
    }
    this.renderHoverLabel();
  }

  private createFilterButton(filter: RecipeFilter, label: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'inventory-filter-button';
    button.textContent = label;
    button.addEventListener('click', () => {
      this.recipeFilter = filter;
      if (this.latestState) {
        this.render(this.latestState);
      }
    });
    this.filterButtons.set(filter, button);
    return button;
  }

  private renderHoverLabel(): void {
    if (!this.latestState || this.hoveredSlotIndex === null) {
      this.hoverLabel.style.visibility = 'hidden';
      this.hoverLabel.textContent = '';
      return;
    }

    const slot = this.latestState.slots[this.hoveredSlotIndex];
    if (!slot || slot.blockId === null || slot.count <= 0) {
      this.hoverLabel.style.visibility = 'hidden';
      this.hoverLabel.textContent = '';
      return;
    }

    this.hoverLabel.style.visibility = 'visible';
    this.hoverLabel.textContent = `${getBlockLabel(slot.blockId)} x${slot.count}`;
    this.positionHoverLabel();
  }

  private positionHoverLabel(): void {
    if (this.hoverLabel.style.visibility !== 'visible') {
      return;
    }
    const offsetX = 14;
    const offsetY = 18;
    this.hoverLabel.style.left = `${this.pointerX + offsetX}px`;
    this.hoverLabel.style.top = `${this.pointerY + offsetY}px`;
  }
}
