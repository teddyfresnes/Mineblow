import type { InventorySlot } from '../types/player';
import { getBlockLabel, getUiBlockColor } from '../world/BlockRegistry';
import type { CraftingMode, Recipe } from '../inventory/RecipeBook';
import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';
import type { InventoryMessageKey } from '../i18n/messages';
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
  private readonly boardTitle = document.createElement('h3');
  private readonly boardHint = document.createElement('span');
  private readonly hotbarTitle = document.createElement('h3');
  private readonly paperdollTitle = document.createElement('h3');
  private readonly paperdollScale = document.createElement('div');
  private readonly skinLoader = document.createElement('label');
  private readonly equipmentTitle = document.createElement('h3');
  private readonly equipmentNote = document.createElement('p');
  private readonly closeButton = document.createElement('button');
  private readonly cursorLabel = document.createElement('div');
  private readonly hoverLabel = document.createElement('div');
  private readonly skinInput = document.createElement('input');
  private readonly slotButtons: HTMLButtonElement[] = [];
  private readonly equipmentSlots: HTMLElement[] = [];
  private readonly filterButtons = new Map<RecipeFilter, HTMLButtonElement>();
  private readonly skinViewer: SkinViewer;
  private visible = false;
  private loadedSkinDataUrl: string | null = null;
  private hoveredSlotIndex: number | null = null;
  private pointerX = 0;
  private pointerY = 0;
  private latestState: InventoryScreenState | null = null;
  private recipeFilter: RecipeFilter = 'craftable';
  private language: UiLanguage = DEFAULT_UI_LANGUAGE;

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
      this.createFilterButton('craftable'),
      this.createFilterButton('all'),
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
    this.boardTitle.className = 'inventory-section-title';
    this.boardHint.textContent = '';
    boardHeader.append(this.boardTitle, this.boardHint);

    const sectionMain = document.createElement('section');
    sectionMain.className = 'inventory-section';
    this.mainGrid.className = 'inventory-grid inventory-grid-main';

    const sectionHotbar = document.createElement('section');
    sectionHotbar.className = 'inventory-section inventory-hotbar-section';
    this.hotbarTitle.className = 'inventory-section-title';
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
    sectionHotbar.append(this.hotbarTitle, this.hotbarGrid);

    this.cursorLabel.className = 'inventory-cursor';
    this.hoverLabel.className = 'inventory-hover';

    inventoryBoard.append(boardHeader, sectionMain, sectionHotbar, this.cursorLabel);

    const previewPanel = document.createElement('div');
    previewPanel.className = 'inventory-preview';

    const paperdollCard = document.createElement('div');
    paperdollCard.className = 'inventory-side-card';
    this.paperdollTitle.className = 'inventory-section-title';
    const paperdoll = document.createElement('div');
    paperdoll.className = 'paperdoll';
    this.paperdollScale.className = 'paperdoll-scale';
    const paperdollStage = document.createElement('div');
    paperdollStage.className = 'paperdoll-stage';
    paperdoll.append(this.paperdollScale, paperdollStage);
    this.skinViewer = new SkinViewer(paperdollStage);

    this.skinLoader.className = 'skin-loader';
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
    this.skinLoader.append(this.skinInput);
    paperdollCard.append(this.paperdollTitle, paperdoll, this.skinLoader);

    const equipmentCard = document.createElement('div');
    equipmentCard.className = 'inventory-side-card';
    this.equipmentTitle.className = 'inventory-section-title';
    this.equipmentNote.className = 'inventory-side-note';
    const equipmentSlots = document.createElement('div');
    equipmentSlots.className = 'equipment-slot-column';
    for (let index = 0; index < 4; index += 1) {
      const slot = document.createElement('div');
      slot.className = 'equipment-slot';
      slot.textContent = '';
      this.equipmentSlots.push(slot);
      equipmentSlots.append(slot);
    }
    equipmentCard.append(this.equipmentTitle, this.equipmentNote, equipmentSlots);

    this.closeButton.type = 'button';
    this.closeButton.className = 'inventory-close';
    this.closeButton.addEventListener('click', () => this.handlers.onClose());

    sidebar.append(this.title, this.status, this.recipeList);
    workspace.append(inventoryBoard, this.closeButton);
    previewPanel.append(paperdollCard, equipmentCard);
    panel.append(rail, sidebar, workspace, previewPanel, this.hoverLabel);
    this.root.append(panel);
    parent.append(this.root);
    this.applyLanguage();
    this.setVisible(false);
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.root.style.display = visible ? 'grid' : 'none';
    this.skinViewer.setActive(visible);
    if (!visible) {
      this.hoveredSlotIndex = null;
      this.renderHoverLabel();
    }
  }

  isVisible(): boolean {
    return this.visible;
  }

  setLanguage(language: UiLanguage): void {
    if (this.language === language) {
      return;
    }
    this.language = language;
    this.applyLanguage();
    if (this.latestState) {
      this.render(this.latestState);
    }
  }

  private t(key: InventoryMessageKey): string {
    return translate(`inventory.${key}`, {}, this.language);
  }

  private tf(key: InventoryMessageKey, params: Record<string, string>): string {
    return translate(`inventory.${key}`, params, this.language);
  }

  private applyLanguage(): void {
    this.boardTitle.textContent = this.t('storage');
    this.boardHint.textContent = this.t('boardHint');
    this.hotbarTitle.textContent = this.t('hotbar');
    this.paperdollTitle.textContent = this.t('character');
    this.paperdollScale.textContent = this.t('paperdoll');
    this.skinLoader.replaceChildren(document.createTextNode(this.t('loadSkin')), this.skinInput);
    this.equipmentTitle.textContent = this.t('equipment');
    this.equipmentNote.textContent = this.t('equipmentNote');
    this.equipmentSlots.forEach((slot) => {
      slot.textContent = this.t('soon');
    });
    this.closeButton.textContent = this.t('close');
    const craftable = this.filterButtons.get('craftable');
    if (craftable) {
      craftable.textContent = this.t('filterCraftable');
    }
    const all = this.filterButtons.get('all');
    if (all) {
      all.textContent = this.t('filterAll');
    }
  }

  dispose(): void {
    this.skinViewer.dispose();
  }

  render(state: InventoryScreenState): void {
    this.latestState = state;
    this.title.textContent =
      state.mode === 'crafting_table' ? this.t('craftingTable') : this.t('inventory');

    const visibleRecipes =
      this.recipeFilter === 'craftable'
        ? state.recipes.filter((recipe) => state.craftableRecipeIds.has(recipe.id))
        : state.recipes;
    const craftableCount = state.recipes.filter((recipe) => state.craftableRecipeIds.has(recipe.id)).length;
    this.status.textContent =
      state.mode === 'crafting_table'
        ? this.tf('craftableOnTable', { count: String(craftableCount) })
        : this.tf('craftableInInventory', { count: String(craftableCount) });

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
          ? this.t('emptyCraftable')
          : this.t('emptyRecipes');
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
          chip.innerHTML = `<b style="background:${getUiBlockColor(ingredient.blockId)}"></b>${ingredient.count} x ${getBlockLabel(ingredient.blockId, this.language)}`;
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
      preview.textContent =
        slot.blockId === null ? '' : getBlockLabel(slot.blockId, this.language).slice(0, 1).toUpperCase();
      count.textContent = slot.count > 0 ? String(slot.count) : '';
      count.style.display = slot.count > 0 ? '' : 'none';
    });

    if (state.cursor.blockId === null || state.cursor.count === 0) {
      this.cursorLabel.textContent = this.t('cursorEmpty');
    } else {
      this.cursorLabel.textContent = this.tf('cursorValue', {
        count: String(state.cursor.count),
        name: getBlockLabel(state.cursor.blockId, this.language),
      });
    }
    this.renderHoverLabel();
  }

  private createFilterButton(filter: RecipeFilter): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'inventory-filter-button';
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
    this.hoverLabel.textContent = `${getBlockLabel(slot.blockId, this.language)} x${slot.count}`;
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
