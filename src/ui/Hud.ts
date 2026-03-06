import type { InventorySlot } from '../types/player';
import { getUiBlockColor } from '../world/BlockRegistry';

export class Hud {
  private readonly root = document.createElement('div');
  private readonly crosshair = document.createElement('div');
  private readonly generationLabel = document.createElement('div');
  private readonly fpsLabel = document.createElement('div');
  private readonly healthFill = document.createElement('div');
  private readonly healthLabel = document.createElement('div');
  private readonly levelFill = document.createElement('div');
  private readonly levelLabel = document.createElement('div');
  private readonly hotbar = document.createElement('div');
  private readonly slotElements: HTMLDivElement[] = [];

  constructor(parent: HTMLElement) {
    this.root.className = 'hud-layer';

    this.crosshair.className = 'crosshair';
    this.generationLabel.className = 'generation-label';
    this.generationLabel.textContent = 'Generating...';
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
      const slot = document.createElement('div');
      slot.className = 'hotbar-slot';

      const preview = document.createElement('div');
      preview.className = 'slot-preview';
      const count = document.createElement('div');
      count.className = 'slot-count';
      count.style.display = 'none';

      slot.append(preview, count);
      this.hotbar.append(slot);
      this.slotElements.push(slot);
    }

    this.root.append(
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
    this.root.style.display = visible ? '' : 'none';
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
      preview.style.background = getUiBlockColor(slot.blockId);

      if (slot.count > 0) {
        count.textContent = String(slot.count);
        count.style.display = '';
      } else {
        count.style.display = 'none';
      }
    });
  }
}
