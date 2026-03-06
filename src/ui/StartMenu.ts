import {
  CONTROL_ACTIONS,
  CONTROL_LABELS,
  cloneBindings,
  createDefaultSettings,
  formatKeyCode,
  type ControlAction,
  type GameSettings,
} from '../game/Controls';
import {
  createEmptyGlobalStats,
  type GlobalStats,
  type WorldStats,
} from '../types/save';

interface StartMenuHandlers {
  onContinue: () => void;
  onNewGame: (seed: string) => void;
  onResume: () => void;
  onSettingsChange: (settings: GameSettings) => void;
}

type MenuMode = 'boot' | 'pause';
type MenuTab = 'play' | 'settings' | 'stats';
type BindingSlot = 'primary' | 'secondary';

export class StartMenu {
  private readonly root = document.createElement('div');
  private readonly panel = document.createElement('div');
  private readonly subtitle = document.createElement('p');
  private readonly seedInput = document.createElement('input');
  private readonly continueButton = document.createElement('button');
  private readonly newGameButton = document.createElement('button');
  private readonly resumeButton = document.createElement('button');
  private readonly tabButtons = new Map<MenuTab, HTMLButtonElement>();
  private readonly tabPanels = new Map<MenuTab, HTMLElement>();
  private readonly bindingButtons = new Map<string, HTMLButtonElement>();
  private readonly globalStatsList = document.createElement('dl');
  private readonly worldStatsList = document.createElement('dl');
  private mode: MenuMode = 'boot';
  private continueAvailable = false;
  private settings: GameSettings = createDefaultSettings();
  private globalStats: GlobalStats = createEmptyGlobalStats();
  private worldStats: WorldStats | null = null;
  private listeningBinding: { action: ControlAction; slot: BindingSlot } | null = null;

  constructor(parent: HTMLElement, private readonly handlers: StartMenuHandlers) {
    this.root.className = 'menu-layer';
    this.panel.className = 'menu-panel menu-panel-large';

    const header = document.createElement('div');
    header.className = 'menu-header';
    const title = document.createElement('h1');
    title.textContent = 'Mineblow';
    this.subtitle.textContent = 'Voxel sandbox solo. Procedural world, mining, crafting et survie.';
    header.append(title, this.subtitle);

    const tabs = document.createElement('div');
    tabs.className = 'menu-tabs';
    this.createTabButton(tabs, 'play', 'World');
    this.createTabButton(tabs, 'settings', 'Options');
    this.createTabButton(tabs, 'stats', 'Statistics');

    const content = document.createElement('div');
    content.className = 'menu-content';

    const playPanel = this.buildPlayPanel();
    const settingsPanel = this.buildSettingsPanel();
    const statsPanel = this.buildStatsPanel();

    this.tabPanels.set('play', playPanel);
    this.tabPanels.set('settings', settingsPanel);
    this.tabPanels.set('stats', statsPanel);
    content.append(playPanel, settingsPanel, statsPanel);

    this.panel.append(header, tabs, content);
    this.root.append(this.panel);
    parent.append(this.root);

    this.handleKeyCapture = this.handleKeyCapture.bind(this);
    window.addEventListener('keydown', this.handleKeyCapture);

    this.selectTab('play');
    this.renderBindings();
    this.renderStats();
    this.hide();
  }

  setContinueAvailable(available: boolean): void {
    this.continueAvailable = available;
    this.continueButton.disabled = !available;
  }

  setSettings(settings: GameSettings): void {
    this.settings = {
      keyBindings: cloneBindings(settings.keyBindings),
      skinDataUrl: settings.skinDataUrl,
    };
    this.renderBindings();
  }

  setGlobalStats(stats: GlobalStats): void {
    this.globalStats = { ...stats };
    this.renderStats();
  }

  setWorldStats(stats: WorldStats | null): void {
    this.worldStats = stats ? { ...stats } : null;
    this.renderStats();
  }

  showBoot(): void {
    this.mode = 'boot';
    this.subtitle.textContent =
      'Solo world. Procedural terrain. Local saves. Minecraft-style controls and crafting.';
    this.resumeButton.style.display = 'none';
    this.continueButton.style.display = '';
    this.continueButton.disabled = !this.continueAvailable;
    this.continueButton.textContent = 'Continue World';
    this.newGameButton.textContent = 'Create New World';
    this.seedInput.parentElement?.setAttribute('style', '');
    this.root.style.display = 'grid';
    this.selectTab('play');
  }

  showPause(): void {
    this.mode = 'pause';
    this.subtitle.textContent = 'Game paused. Change options, inspect stats, or return to gameplay.';
    this.resumeButton.style.display = '';
    this.resumeButton.textContent = 'Back to Game';
    this.continueButton.style.display = 'none';
    this.newGameButton.textContent = 'Restart World';
    this.seedInput.parentElement?.setAttribute('style', 'display:none;');
    this.root.style.display = 'grid';
    this.selectTab('play');
  }

  hide(): void {
    this.root.style.display = 'none';
    this.listeningBinding = null;
    this.renderBindings();
  }

  isVisible(): boolean {
    return this.root.style.display !== 'none';
  }

  getMode(): MenuMode {
    return this.mode;
  }

  private buildPlayPanel(): HTMLElement {
    const panel = document.createElement('section');
    panel.className = 'menu-tab-panel';

    const stack = document.createElement('div');
    stack.className = 'menu-stack';

    const inputWrap = document.createElement('label');
    inputWrap.className = 'menu-input';
    const inputLabel = document.createElement('span');
    inputLabel.textContent = 'Seed';
    this.seedInput.type = 'text';
    this.seedInput.placeholder = 'Leave blank for random seed';
    inputWrap.append(inputLabel, this.seedInput);

    const actions = document.createElement('div');
    actions.className = 'menu-actions';

    this.resumeButton.className = 'menu-button';
    this.resumeButton.textContent = 'Resume';
    this.resumeButton.addEventListener('click', () => {
      this.hide();
      this.handlers.onResume();
    });

    this.continueButton.className = 'menu-button';
    this.continueButton.textContent = 'Continue World';
    this.continueButton.addEventListener('click', () => {
      this.hide();
      this.handlers.onContinue();
    });

    this.newGameButton.className = 'menu-button secondary';
    this.newGameButton.textContent = 'Create New World';
    this.newGameButton.addEventListener('click', () => {
      this.hide();
      this.handlers.onNewGame(this.seedInput.value.trim());
    });

    actions.append(this.resumeButton, this.continueButton, this.newGameButton);

    const controlsNote = document.createElement('div');
    controlsNote.className = 'controls-note';
    controlsNote.textContent =
      'Controls: WASD/Arrows move, Right Ctrl jump, Num0/Left Ctrl crouch, Shift or double-forward sprint, I inventory.';

    stack.append(inputWrap, actions, controlsNote);
    panel.append(stack);
    return panel;
  }

  private buildSettingsPanel(): HTMLElement {
    const panel = document.createElement('section');
    panel.className = 'menu-tab-panel';

    const title = document.createElement('h3');
    title.className = 'menu-section-title';
    title.textContent = 'Controls';

    const help = document.createElement('p');
    help.className = 'menu-section-subtitle';
    help.textContent = 'Assign primary and secondary keys. Click a slot then press any key.';

    const list = document.createElement('div');
    list.className = 'binding-list';

    CONTROL_ACTIONS.forEach((action) => {
      const row = document.createElement('div');
      row.className = 'binding-row';
      const label = document.createElement('div');
      label.className = 'binding-label';
      label.textContent = CONTROL_LABELS[action];

      const buttons = document.createElement('div');
      buttons.className = 'binding-buttons';

      const primaryButton = document.createElement('button');
      primaryButton.type = 'button';
      primaryButton.className = 'binding-button';
      primaryButton.addEventListener('click', () => this.startBindingCapture(action, 'primary'));
      this.bindingButtons.set(`${action}:primary`, primaryButton);

      const secondaryButton = document.createElement('button');
      secondaryButton.type = 'button';
      secondaryButton.className = 'binding-button';
      secondaryButton.addEventListener('click', () => this.startBindingCapture(action, 'secondary'));
      this.bindingButtons.set(`${action}:secondary`, secondaryButton);

      buttons.append(primaryButton, secondaryButton);
      row.append(label, buttons);
      list.append(row);
    });

    const footer = document.createElement('div');
    footer.className = 'settings-footer';

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'menu-button secondary';
    resetButton.textContent = 'Reset Default Keys';
    resetButton.addEventListener('click', () => {
      this.settings = createDefaultSettings();
      this.renderBindings();
      this.handlers.onSettingsChange({
        keyBindings: cloneBindings(this.settings.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
      });
    });
    footer.append(resetButton);

    panel.append(title, help, list, footer);
    return panel;
  }

  private buildStatsPanel(): HTMLElement {
    const panel = document.createElement('section');
    panel.className = 'menu-tab-panel';

    const layout = document.createElement('div');
    layout.className = 'stats-layout';

    const globalCard = document.createElement('div');
    globalCard.className = 'stats-card';
    const globalTitle = document.createElement('h3');
    globalTitle.textContent = 'Global Stats';
    this.globalStatsList.className = 'stats-list';
    globalCard.append(globalTitle, this.globalStatsList);

    const worldCard = document.createElement('div');
    worldCard.className = 'stats-card';
    const worldTitle = document.createElement('h3');
    worldTitle.textContent = 'Current World Stats';
    this.worldStatsList.className = 'stats-list';
    worldCard.append(worldTitle, this.worldStatsList);

    layout.append(globalCard, worldCard);
    panel.append(layout);
    return panel;
  }

  private createTabButton(container: HTMLElement, tab: MenuTab, label: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-tab-button';
    button.textContent = label;
    button.addEventListener('click', () => this.selectTab(tab));
    this.tabButtons.set(tab, button);
    container.append(button);
  }

  private selectTab(tab: MenuTab): void {
    this.tabButtons.forEach((button, buttonTab) => {
      button.classList.toggle('active', buttonTab === tab);
    });
    this.tabPanels.forEach((panel, panelTab) => {
      panel.style.display = panelTab === tab ? 'grid' : 'none';
    });
  }

  private startBindingCapture(action: ControlAction, slot: BindingSlot): void {
    this.listeningBinding = { action, slot };
    this.renderBindings();
  }

  private handleKeyCapture(event: KeyboardEvent): void {
    if (!this.isVisible() || !this.listeningBinding) {
      return;
    }

    event.preventDefault();
    const { action, slot } = this.listeningBinding;
    if (event.code === 'Escape') {
      this.listeningBinding = null;
      this.renderBindings();
      return;
    }

    if (slot === 'secondary' && (event.code === 'Backspace' || event.code === 'Delete')) {
      this.settings.keyBindings[action].secondary = null;
    } else if (slot === 'primary') {
      this.settings.keyBindings[action].primary = event.code;
    } else {
      this.settings.keyBindings[action].secondary = event.code;
    }
    this.listeningBinding = null;
    this.renderBindings();
    this.handlers.onSettingsChange({
      keyBindings: cloneBindings(this.settings.keyBindings),
      skinDataUrl: this.settings.skinDataUrl,
    });
  }

  private renderBindings(): void {
    CONTROL_ACTIONS.forEach((action) => {
      (['primary', 'secondary'] as const).forEach((slot) => {
        const button = this.bindingButtons.get(`${action}:${slot}`);
        if (!button) {
          return;
        }
        const binding = this.settings.keyBindings[action][slot];
        const isListening =
          this.listeningBinding?.action === action && this.listeningBinding.slot === slot;
        button.textContent = isListening ? 'Press key...' : formatKeyCode(binding);
        button.classList.toggle('listening', isListening);
      });
    });
  }

  private renderStats(): void {
    this.globalStatsList.replaceChildren(
      ...this.buildStatEntries([
        ['Play Time', this.formatDuration(this.globalStats.totalPlayTimeMs)],
        ['Blocks Mined', this.globalStats.totalBlocksMined.toLocaleString()],
        ['Blocks Placed', this.globalStats.totalBlocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],
        ['Jumps', this.globalStats.totalJumps.toLocaleString()],
        ['Crafted', this.globalStats.totalCraftedItems.toLocaleString()],
        ['Worlds Created', this.globalStats.worldsCreated.toLocaleString()],
      ]),
    );

    if (!this.worldStats) {
      this.worldStatsList.replaceChildren(
        ...this.buildStatEntries([['No Save', 'Start or continue a world to track stats.']]),
      );
      return;
    }

    this.worldStatsList.replaceChildren(
      ...this.buildStatEntries([
        ['Play Time', this.formatDuration(this.worldStats.playTimeMs)],
        ['Blocks Mined', this.worldStats.blocksMined.toLocaleString()],
        ['Blocks Placed', this.worldStats.blocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(this.worldStats.distanceTravelled).toLocaleString()} m`],
        ['Jumps', this.worldStats.jumps.toLocaleString()],
        ['Crafted', this.worldStats.craftedItems.toLocaleString()],
      ]),
    );
  }

  private buildStatEntries(entries: Array<[string, string]>): HTMLElement[] {
    const nodes: HTMLElement[] = [];
    entries.forEach(([label, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      nodes.push(dt, dd);
    });
    return nodes;
  }

  private formatDuration(ms: number): string {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }
}
