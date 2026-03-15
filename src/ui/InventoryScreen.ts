import { INVENTORY_LAYOUT } from '../inventory/Inventory';
import type { CraftingMode, Recipe } from '../inventory/RecipeBook';
import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';
import type { InventoryMessageKey } from '../i18n/messages';
import type { InventorySlot } from '../types/player';
import { getBlockLabel, getUiBlockColor } from '../world/BlockRegistry';
import { createBlockSlotIconCanvas, renderBlockSlotIcon } from './BlockSlotIcon';
import { SkinViewer } from './SkinViewer';

export interface SlotInteractEvent {
  index: number;
  button: 'left' | 'right';
  shift: boolean;
}

interface InventoryScreenHandlers {
  onSlotInteract: (event: SlotInteractEvent) => void;
  onRecipeCraft: (recipeId: string) => void;
  onCursorDrop: () => void;
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

interface ActiveDragSelection {
  pointerId: number;
  originIndex: number;
  originX: number;
  originY: number;
  button: 'left' | 'right';
  shift: boolean;
  pickedFromOrigin: boolean;
}

type RecipeFilter = 'craftable' | 'all';

export class InventoryScreen {
  private readonly root = document.createElement('div');
  private readonly panel = document.createElement('div');
  private readonly recipeList = document.createElement('div');
  private readonly mainGrid = document.createElement('div');
  private readonly hoverLabel = document.createElement('div');
  private readonly cursorGhost = document.createElement('div');
  private readonly cursorGhostPreview = document.createElement('div');
  private readonly cursorGhostCount = document.createElement('div');
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
  private activeDrag: ActiveDragSelection | null = null;
  private readonly heldModifierCodes = new Set<string>();

  constructor(parent: HTMLElement, private readonly handlers: InventoryScreenHandlers) {
    this.root.className = 'inventory-layer';
    this.root.addEventListener('pointermove', this.handlePointerMove);
    this.root.addEventListener('contextmenu', (event) => event.preventDefault());
    window.addEventListener('pointerdown', this.handleWindowPointerDown, true);
    window.addEventListener('pointerup', this.handleWindowPointerUp);
    window.addEventListener('pointercancel', this.handleWindowPointerCancel);
    window.addEventListener('keydown', this.handleWindowKeyDown);
    window.addEventListener('keyup', this.handleWindowKeyUp);
    window.addEventListener('blur', this.handleWindowBlur);

    this.panel.className = 'inventory-panel';

    const craftingColumn = document.createElement('section');
    craftingColumn.className = 'inventory-crafting-column';
    const filterRow = document.createElement('div');
    filterRow.className = 'inventory-filter-row';
    filterRow.append(this.createFilterButton('craftable'), this.createFilterButton('all'));
    this.recipeList.className = 'recipe-list';
    craftingColumn.append(filterRow, this.recipeList);

    const centerColumn = document.createElement('section');
    centerColumn.className = 'inventory-center-column';
    const inventoryBoard = document.createElement('div');
    inventoryBoard.className = 'inventory-board inventory-center-board';

    const sectionMain = document.createElement('section');
    sectionMain.className = 'inventory-section';
    this.mainGrid.className = 'inventory-grid inventory-grid-main';

    for (let index = 0; index < INVENTORY_LAYOUT.hotbarStart; index += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'inventory-slot';
      button.dataset.slotIndex = String(index);
      button.addEventListener('pointerdown', (event) => this.handleSlotPointerDown(event, index));
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
      preview.append(createBlockSlotIconCanvas());
      const count = document.createElement('div');
      count.className = 'inventory-slot-count';
      button.append(preview, count);

      this.mainGrid.append(button);
      this.slotButtons.push(button);
    }

    sectionMain.append(this.mainGrid);
    inventoryBoard.append(sectionMain);
    centerColumn.append(inventoryBoard);

    const characterColumn = document.createElement('section');
    characterColumn.className = 'inventory-character-column';
    const characterCard = document.createElement('div');
    characterCard.className = 'inventory-side-card inventory-character-card';

    const paperdoll = document.createElement('div');
    paperdoll.className = 'paperdoll';
    const paperdollStage = document.createElement('div');
    paperdollStage.className = 'paperdoll-stage';
    paperdoll.append(paperdollStage);
    this.skinViewer = new SkinViewer(paperdollStage, null, { animationMode: 'idle' });

    const equipmentGrid = document.createElement('div');
    equipmentGrid.className = 'equipment-slot-grid';
    for (let index = 0; index < 8; index += 1) {
      const slot = document.createElement('div');
      slot.className = 'equipment-slot locked';
      this.equipmentSlots.push(slot);
      equipmentGrid.append(slot);
    }

    characterCard.append(paperdoll, equipmentGrid);
    characterColumn.append(characterCard);

    this.hoverLabel.className = 'inventory-hover';
    this.cursorGhost.className = 'inventory-cursor-ghost';
    this.cursorGhostPreview.className = 'inventory-cursor-ghost-preview';
    this.cursorGhostPreview.append(createBlockSlotIconCanvas());
    this.cursorGhostCount.className = 'inventory-cursor-ghost-count';
    this.cursorGhost.append(this.cursorGhostPreview, this.cursorGhostCount);

    this.panel.append(craftingColumn, centerColumn, characterColumn, this.hoverLabel, this.cursorGhost);
    this.root.append(this.panel);
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
      this.activeDrag = null;
      this.renderHoverLabel();
      this.renderCursorGhost();
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

  private applyLanguage(): void {
    const craftable = this.filterButtons.get('craftable');
    if (craftable) {
      craftable.textContent = this.t('filterCraftable');
    }
    const all = this.filterButtons.get('all');
    if (all) {
      all.textContent = this.t('filterAll');
    }
    this.equipmentSlots.forEach((slot) => {
      slot.textContent = 'LOCK';
    });
  }

  dispose(): void {
    window.removeEventListener('pointerdown', this.handleWindowPointerDown, true);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
    window.removeEventListener('pointercancel', this.handleWindowPointerCancel);
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    window.removeEventListener('keyup', this.handleWindowKeyUp);
    window.removeEventListener('blur', this.handleWindowBlur);
    this.skinViewer.dispose();
  }

  render(state: InventoryScreenState): void {
    this.latestState = state;

    const visibleRecipes =
      this.recipeFilter === 'craftable'
        ? state.recipes.filter((recipe) => state.craftableRecipeIds.has(recipe.id))
        : state.recipes;

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

    for (let index = 0; index < this.slotButtons.length; index += 1) {
      const button = this.slotButtons[index];
      const slot = state.slots[index];
      if (!button || !slot) {
        continue;
      }
      const preview = button.children[0] as HTMLDivElement;
      const count = button.children[1] as HTMLDivElement;

      button.classList.toggle('filled', slot.blockId !== null && slot.count > 0);
      const icon = preview.firstElementChild;
      if (icon instanceof HTMLCanvasElement) {
        renderBlockSlotIcon(icon, slot.blockId);
      }
      count.textContent = slot.count > 0 ? String(slot.count) : '';
      count.style.display = slot.count > 0 ? '' : 'none';
    }

    this.renderHoverLabel();
    this.renderCursorGhost();
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

  private handleSlotPointerDown(event: PointerEvent, index: number): void {
    if (event.button !== 0 && event.button !== 2) {
      return;
    }
    if (!this.latestState) {
      return;
    }
    event.preventDefault();
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.positionHoverLabel();
    this.positionCursorGhost();

    const shiftHeld = this.isShiftHeld(event);
    const button = event.button === 0 ? 'left' : 'right';
    const startedWithCursorItem = this.hasCursorItem();
    const originSlot = this.latestState.slots[index];

    if (!startedWithCursorItem && shiftHeld) {
      this.handlers.onSlotInteract({
        index,
        button,
        shift: true,
      });
      return;
    }

    if (button === 'right' && !startedWithCursorItem) {
      this.handlers.onSlotInteract({
        index,
        button: 'right',
        shift: false,
      });
      return;
    }

    let pickedFromOrigin = false;
    if (button === 'left' && !startedWithCursorItem) {
      if (!originSlot || originSlot.blockId === null || originSlot.count <= 0) {
        return;
      }
      this.handlers.onSlotInteract({
        index,
        button: 'left',
        shift: false,
      });
      pickedFromOrigin = true;
    }

    this.activeDrag = {
      pointerId: event.pointerId,
      originIndex: index,
      originX: event.clientX,
      originY: event.clientY,
      button,
      shift: shiftHeld,
      pickedFromOrigin,
    };
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.positionHoverLabel();
    this.positionCursorGhost();

    if (!this.activeDrag || event.pointerId !== this.activeDrag.pointerId) {
      return;
    }

    const buttonMask = this.activeDrag.button === 'left' ? 1 : 2;
    if ((event.buttons & buttonMask) === 0) {
      return;
    }

    if (this.activeDrag.shift || !this.hasCursorItem()) {
      return;
    }
    const movedEnough =
      this.getSlotIndexUnderPointer(event.clientX, event.clientY) !== this.activeDrag.originIndex ||
      Math.hypot(
        event.clientX - this.activeDrag.originX,
        event.clientY - this.activeDrag.originY,
      ) >= 3;
    if (!movedEnough) {
      return;
    }
  };

  private readonly handleWindowPointerDown = (event: PointerEvent): void => {
    if (!this.visible || !this.latestState) {
      return;
    }
    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const hotbarSlot = target.closest('.hotbar-slot') as HTMLElement | null;
    const hotbarIndex = hotbarSlot?.dataset.hotbarIndex;
    if (!hotbarSlot || !hotbarIndex) {
      return;
    }

    const parsed = Number(hotbarIndex);
    if (!Number.isInteger(parsed)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    this.handleSlotPointerDown(event, INVENTORY_LAYOUT.hotbarStart + parsed);
  };

  private readonly handleWindowPointerUp = (event: PointerEvent): void => {
    if (!this.activeDrag) {
      return;
    }
    if (event.pointerType !== 'mouse' && event.pointerId !== this.activeDrag.pointerId) {
      return;
    }

    const drag = this.activeDrag;
    this.activeDrag = null;

    const index = this.getSlotIndexUnderPointer(event.clientX, event.clientY);
    if (index !== null) {
      this.handlers.onSlotInteract({
        index,
        button: drag.button,
        shift: drag.shift,
      });
      return;
    }

    if (!this.isPointInsidePanel(event.clientX, event.clientY)) {
      if (this.hasCursorItem()) {
        this.handlers.onCursorDrop();
      }
      return;
    }

    if (drag.pickedFromOrigin && this.hasCursorItem()) {
      this.handlers.onSlotInteract({
        index: drag.originIndex,
        button: 'left',
        shift: false,
      });
    }
  };

  private readonly handleWindowPointerCancel = (): void => {
    this.activeDrag = null;
  };

  private getSlotIndexUnderPointer(clientX: number, clientY: number): number | null {
    const target = document.elementFromPoint(clientX, clientY);
    if (!(target instanceof HTMLElement)) {
      return null;
    }

    const slotButton = target.closest('.inventory-slot') as HTMLElement | null;
    if (slotButton && this.panel.contains(slotButton)) {
      const value = slotButton.dataset.slotIndex;
      if (!value) {
        return null;
      }
      const parsed = Number(value);
      return Number.isInteger(parsed) ? parsed : null;
    }

    const hotbarSlot = target.closest('.hotbar-slot') as HTMLElement | null;
    const value = hotbarSlot?.dataset.hotbarIndex;
    if (!value) {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isInteger(parsed)) {
      return null;
    }
    return INVENTORY_LAYOUT.hotbarStart + parsed;
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

    const zoom = this.getUiZoomFactor();
    const x = this.pointerX / zoom;
    const y = this.pointerY / zoom;
    this.hoverLabel.style.left = `${x + 10}px`;
    this.hoverLabel.style.top = `${y + 14}px`;
  }

  private renderCursorGhost(): void {
    if (
      !this.latestState ||
      this.latestState.cursor.blockId === null ||
      this.latestState.cursor.count <= 0
    ) {
      this.cursorGhost.style.visibility = 'hidden';
      const icon = this.cursorGhostPreview.firstElementChild;
      if (icon instanceof HTMLCanvasElement) {
        renderBlockSlotIcon(icon, null);
      }
      this.cursorGhostCount.textContent = '';
      return;
    }

    const { blockId, count } = this.latestState.cursor;
    this.cursorGhost.style.visibility = 'visible';
    const icon = this.cursorGhostPreview.firstElementChild;
    if (icon instanceof HTMLCanvasElement) {
      renderBlockSlotIcon(icon, blockId);
    }
    this.cursorGhostCount.textContent = String(count);
    this.positionCursorGhost();
  }

  private positionCursorGhost(): void {
    if (this.cursorGhost.style.visibility !== 'visible') {
      return;
    }

    const zoom = this.getUiZoomFactor();
    const x = this.pointerX / zoom;
    const y = this.pointerY / zoom;
    this.cursorGhost.style.left = `${x + 2}px`;
    this.cursorGhost.style.top = `${y + 2}px`;
  }

  private hasCursorItem(): boolean {
    return (
      !!this.latestState &&
      this.latestState.cursor.blockId !== null &&
      this.latestState.cursor.count > 0
    );
  }

  private isPointInsidePanel(clientX: number, clientY: number): boolean {
    const rect = this.panel.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  private readonly handleWindowKeyDown = (event: KeyboardEvent): void => {
    if (
      event.code === 'ShiftLeft' ||
      event.code === 'ShiftRight' ||
      event.code === 'ControlLeft' ||
      event.code === 'ControlRight'
    ) {
      this.heldModifierCodes.add(event.code);
    }
  };

  private readonly handleWindowKeyUp = (event: KeyboardEvent): void => {
    if (
      event.code === 'ShiftLeft' ||
      event.code === 'ShiftRight' ||
      event.code === 'ControlLeft' ||
      event.code === 'ControlRight'
    ) {
      this.heldModifierCodes.delete(event.code);
    }
  };

  private readonly handleWindowBlur = (): void => {
    this.heldModifierCodes.clear();
  };

  private isShiftHeld(event?: PointerEvent): boolean {
    const left = this.heldModifierCodes.has('ShiftLeft');
    const right = this.heldModifierCodes.has('ShiftRight');
    if (!left && !right && event?.shiftKey) {
      return true;
    }
    return left || right;
  }

  private getUiZoomFactor(): number {
    const logicalWidth = this.root.offsetWidth;
    const renderedWidth = this.root.getBoundingClientRect().width;
    if (logicalWidth <= 0 || renderedWidth <= 0) {
      return 1;
    }
    const zoom = renderedWidth / logicalWidth;
    return Number.isFinite(zoom) && zoom > 0.01 ? zoom : 1;
  }
}
