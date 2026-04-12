import type { InventorySlot } from '../types/player';
import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';
import { getBlockLabel } from '../world/BlockRegistry';
import { createBlockSlotIconCanvas, renderBlockSlotIcon } from './BlockSlotIcon';

export interface HotbarInteractEvent {
  index: number;
  button: 'left' | 'right';
  shift: boolean;
}

interface HudHandlers {
  onHotbarInteract?: (event: HotbarInteractEvent) => void;
}

export class Hud {
  private readonly root = document.createElement('div');
  private readonly pointerUnlockPrompt = document.createElement('div');
  private readonly crosshair = document.createElement('div');
  private readonly generationLabel = document.createElement('div');
  private readonly fpsLabel = document.createElement('div');
  private readonly healthFill = document.createElement('div');
  private readonly healthLabel = document.createElement('div');
  private readonly levelFill = document.createElement('div');
  private readonly levelLabel = document.createElement('div');
  private readonly hotbarHoverLabel = document.createElement('div');
  private readonly hotbar = document.createElement('div');
  private readonly slotElements: HTMLButtonElement[] = [];
  private readonly hotbarSnapshot: Array<{ blockId: InventorySlot['blockId']; count: number }> =
    Array.from({ length: 9 }, () => ({ blockId: null, count: 0 }));
  private language: UiLanguage = DEFAULT_UI_LANGUAGE;
  private generatingActive = false;
  private displayedFps = 0;
  private healthCurrent = 20;
  private healthMax = 20;
  private displayedLevel = 1;
  private displayedLevelProgress = 0;
  private selectedHotbarIndex = -1;
  private hoveredHotbarIndex: number | null = null;
  private pointerX = 0;
  private pointerY = 0;

  constructor(parent: HTMLElement, private readonly handlers: HudHandlers = {}) {
    this.root.className = 'hud-layer';
    this.pointerUnlockPrompt.className = 'pointer-unlock-prompt';
    this.pointerUnlockPrompt.textContent = translate('hud.pointerUnlockPrompt', {}, this.language);

    this.crosshair.className = 'crosshair';
    this.generationLabel.className = 'generation-label';
    this.generationLabel.textContent = translate('hud.generating', {}, this.language);
    this.generationLabel.style.display = 'none';
    this.fpsLabel.className = 'fps-label';
    this.fpsLabel.textContent = 'FPS 0';
    const bars = document.createElement('div');
    bars.className = 'status-bars';

    const healthBar = document.createElement('div');
    healthBar.className = 'status-bar health';
    this.healthFill.className = 'status-fill';
    this.healthLabel.className = 'status-label';
    this.healthLabel.textContent = 'HP 20/20';
    healthBar.append(this.healthFill, this.healthLabel);

    const levelBar = document.createElement('div');
    levelBar.className = 'status-bar level';
    this.levelFill.className = 'status-fill';
    this.levelLabel.className = 'status-label';
    this.levelLabel.textContent = 'LVL 1';
    levelBar.append(this.levelFill, this.levelLabel);
    bars.append(healthBar, levelBar);

    this.hotbar.className = 'hotbar';

    for (let index = 0; index < 9; index += 1) {
      const slot = document.createElement('button');
      slot.type = 'button';
      slot.className = 'hotbar-slot';
      slot.dataset.hotbarIndex = String(index);
      slot.addEventListener('contextmenu', (event) => event.preventDefault());
      slot.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 && event.button !== 2) {
          return;
        }
        if (this.root.classList.contains('inventory-open')) {
          return;
        }
        event.preventDefault();
        this.handlers.onHotbarInteract?.({
          index,
          button: event.button === 0 ? 'left' : 'right',
          shift: event.shiftKey,
        });
      });
      slot.addEventListener('pointerenter', (event) => {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.hoveredHotbarIndex = index;
        this.renderHotbarHoverLabel();
      });
      slot.addEventListener('pointerleave', () => {
        if (this.hoveredHotbarIndex !== index) {
          return;
        }
        this.hoveredHotbarIndex = null;
        this.renderHotbarHoverLabel();
      });
      slot.addEventListener('pointermove', (event) => {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
        this.positionHotbarHoverLabel();
      });

      const preview = document.createElement('div');
      preview.className = 'slot-preview';
      preview.append(createBlockSlotIconCanvas());
      const count = document.createElement('div');
      count.className = 'slot-count';
      count.style.display = 'none';

      slot.append(preview, count);
      this.hotbar.append(slot);
      this.slotElements.push(slot);
    }

    this.hotbarHoverLabel.className = 'hotbar-hover';
    this.root.append(
      this.pointerUnlockPrompt,
      this.crosshair,
      this.generationLabel,
      this.fpsLabel,
      bars,
      this.hotbar,
      this.hotbarHoverLabel,
    );
    parent.append(this.root);
    this.setHealth(20, 20);
    this.setLevel(1, 0);
  }

  setVisible(visible: boolean): void {
    if (!visible) {
      this.setPointerUnlockPromptVisible(false);
      this.hoveredHotbarIndex = null;
      this.renderHotbarHoverLabel();
    }
    this.root.style.display = visible ? '' : 'none';
  }

  setInventoryOverlayActive(active: boolean): void {
    this.root.classList.toggle('inventory-open', active);
    if (!active) {
      this.hoveredHotbarIndex = null;
      this.renderHotbarHoverLabel();
    }
  }

  setLanguage(language: UiLanguage): void {
    this.language = language;
    this.generationLabel.textContent = translate('hud.generating', {}, this.language);
    this.pointerUnlockPrompt.textContent = translate('hud.pointerUnlockPrompt', {}, this.language);
    this.renderHotbarHoverLabel();
  }

  setPointerUnlockPromptVisible(visible: boolean): void {
    this.pointerUnlockPrompt.classList.toggle('visible', visible);
    this.root.classList.toggle('pointer-unlock-active', visible);
    document.body.classList.remove('pointer-cursor-hidden');
  }

  setTargetLabel(label: string | null): void {
    void label;
  }

  setGenerating(active: boolean): void {
    if (this.generatingActive === active) {
      return;
    }
    this.generatingActive = active;
    this.generationLabel.style.display = active ? '' : 'none';
  }

  setFps(fps: number): void {
    if (this.displayedFps === fps) {
      return;
    }
    this.displayedFps = fps;
    this.fpsLabel.textContent = `FPS ${fps}`;
  }

  setMiningProgress(progress: number): void {
    if (progress <= 0) {
      this.crosshair.classList.remove('mining');
      return;
    }

    this.crosshair.classList.add('mining');
  }

  setHealth(current: number, max: number): void {
    if (this.healthCurrent === current && this.healthMax === max) {
      return;
    }
    this.healthCurrent = current;
    this.healthMax = max;
    const safeMax = Math.max(1, max);
    const ratio = Math.max(0, Math.min(1, current / safeMax));
    this.healthFill.style.width = `${ratio * 100}%`;
    this.healthLabel.textContent = `HP ${Math.round(current)}/${safeMax}`;
  }

  setLevel(level: number, progress: number): void {
    const ratio = Math.max(0, Math.min(1, progress));
    const displayLevel = Math.max(1, Math.floor(level));
    if (this.displayedLevel === displayLevel && this.displayedLevelProgress === ratio) {
      return;
    }
    this.displayedLevel = displayLevel;
    this.displayedLevelProgress = ratio;
    this.levelFill.style.width = `${ratio * 100}%`;
    this.levelLabel.textContent = `LVL ${displayLevel}`;
  }

  setHandSkin(dataUrl: string | null): void {
    void dataUrl;
  }

  updateHand(dt: number, movementIntensity: number, miningActive: boolean): void {
    void dt;
    void movementIntensity;
    void miningActive;
  }

  updateHotbar(slots: InventorySlot[], selectedIndex: number): void {
    if (this.selectedHotbarIndex !== selectedIndex) {
      if (this.selectedHotbarIndex >= 0) {
        this.slotElements[this.selectedHotbarIndex]?.classList.remove('selected');
      }
      this.slotElements[selectedIndex]?.classList.add('selected');
      this.selectedHotbarIndex = selectedIndex;
    }

    slots.forEach((slot, index) => {
      const previous = this.hotbarSnapshot[index];
      const blockChanged = previous.blockId !== slot.blockId;
      const countChanged = previous.count !== slot.count;
      if (!blockChanged && !countChanged) {
        return;
      }

      const slotElement = this.slotElements[index];
      const preview = slotElement.children[0] as HTMLDivElement;
      const count = slotElement.children[1] as HTMLDivElement;
      if (blockChanged) {
        const icon = preview.firstElementChild;
        if (icon instanceof HTMLCanvasElement) {
          renderBlockSlotIcon(icon, slot.blockId);
        }
      }

      if (countChanged) {
        if (slot.count > 0) {
          count.textContent = String(slot.count);
          count.style.display = '';
        } else {
          count.style.display = 'none';
        }
      }

      previous.blockId = slot.blockId;
      previous.count = slot.count;
    });
    this.renderHotbarHoverLabel();
  }

  private renderHotbarHoverLabel(): void {
    if (!this.root.classList.contains('inventory-open') || this.hoveredHotbarIndex === null) {
      this.hotbarHoverLabel.style.visibility = 'hidden';
      this.hotbarHoverLabel.textContent = '';
      return;
    }

    const hovered = this.hotbarSnapshot[this.hoveredHotbarIndex];
    if (!hovered || hovered.blockId === null || hovered.count <= 0) {
      this.hotbarHoverLabel.style.visibility = 'hidden';
      this.hotbarHoverLabel.textContent = '';
      return;
    }

    this.hotbarHoverLabel.textContent = `${getBlockLabel(hovered.blockId, this.language)} x${hovered.count}`;
    this.hotbarHoverLabel.style.visibility = 'visible';
    this.positionHotbarHoverLabel();
  }

  private positionHotbarHoverLabel(): void {
    if (this.hotbarHoverLabel.style.visibility !== 'visible') {
      return;
    }

    const zoom = this.getUiZoomFactor();
    this.hotbarHoverLabel.style.left = `${this.pointerX / zoom + 10}px`;
    this.hotbarHoverLabel.style.top = `${this.pointerY / zoom + 14}px`;
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
