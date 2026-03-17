import type { InventorySlot } from '../types/player';
import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';
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
  private readonly hotbar = document.createElement('div');
  private readonly slotElements: HTMLButtonElement[] = [];
  private language: UiLanguage = DEFAULT_UI_LANGUAGE;

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

    this.root.append(
      this.pointerUnlockPrompt,
      this.crosshair,
      this.generationLabel,
      this.fpsLabel,
      bars,
      this.hotbar,
    );
    parent.append(this.root);
    this.setHealth(20, 20);
    this.setLevel(1, 0);
  }

  setVisible(visible: boolean): void {
    if (!visible) {
      this.setPointerUnlockPromptVisible(false);
    }
    this.root.style.display = visible ? '' : 'none';
  }

  setInventoryOverlayActive(active: boolean): void {
    this.root.classList.toggle('inventory-open', active);
  }

  setLanguage(language: UiLanguage): void {
    this.language = language;
    this.generationLabel.textContent = translate('hud.generating', {}, this.language);
    this.pointerUnlockPrompt.textContent = translate('hud.pointerUnlockPrompt', {}, this.language);
  }

  setPointerUnlockPromptVisible(visible: boolean): void {
    this.pointerUnlockPrompt.classList.toggle('visible', visible);
    document.body.classList.toggle('pointer-cursor-hidden', visible);
  }

  setTargetLabel(label: string | null): void {
    void label;
  }

  setGenerating(active: boolean): void {
    this.generationLabel.style.display = active ? '' : 'none';
  }

  setFps(fps: number): void {
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
    const safeMax = Math.max(1, max);
    const ratio = Math.max(0, Math.min(1, current / safeMax));
    this.healthFill.style.width = `${ratio * 100}%`;
    this.healthLabel.textContent = `HP ${Math.round(current)}/${safeMax}`;
  }

  setLevel(level: number, progress: number): void {
    const ratio = Math.max(0, Math.min(1, progress));
    this.levelFill.style.width = `${ratio * 100}%`;
    this.levelLabel.textContent = `LVL ${Math.max(1, Math.floor(level))}`;
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
    slots.forEach((slot, index) => {
      const slotElement = this.slotElements[index];
      const preview = slotElement.children[0] as HTMLDivElement;
      const count = slotElement.children[1] as HTMLDivElement;

      slotElement.classList.toggle('selected', index === selectedIndex);
      const icon = preview.firstElementChild;
      if (icon instanceof HTMLCanvasElement) {
        renderBlockSlotIcon(icon, slot.blockId);
      }

      if (slot.count > 0) {
        count.textContent = String(slot.count);
        count.style.display = '';
      } else {
        count.style.display = 'none';
      }
    });
  }
}
