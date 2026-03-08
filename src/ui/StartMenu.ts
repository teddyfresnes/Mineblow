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
  createEmptyWorldStats,
  type GlobalStats,
  type WorldStats,
  type WorldSummary,
} from '../types/save';
import { getCatalogSkins, SKIN_CATEGORIES, type CatalogSkin, type SkinCategory } from './SkinCatalog';
import { MenuPanorama } from './MenuPanorama';
import { SkinViewer } from './SkinViewer';

interface StartMenuHandlers {
  onPlayWorld: (worldId: string) => void;
  onCreateWorld: (name: string, seed: string) => void;
  onRenameWorld: (worldId: string, name: string) => void;
  onDeleteWorld: (worldId: string) => void;
  onResume: () => void;
  onQuitToTitle: () => void;
  onSettingsChange: (settings: GameSettings) => void;
}

type MenuMode = 'boot' | 'pause';
type MenuScreen = 'home' | 'singleplayer' | 'settings' | 'stats' | 'pause' | 'wardrobe';
type BindingSlot = 'primary' | 'secondary';

interface PauseWorldSnapshot {
  id: string;
  name: string;
  seed: string;
  worldStats: WorldStats;
}

export class StartMenu {
  private readonly root = document.createElement('div');
  private readonly panoramaHost = document.createElement('div');
  private readonly panel = document.createElement('div');
  private readonly panorama: MenuPanorama;
  private readonly views = new Map<MenuScreen, HTMLElement>();
  private readonly bindingButtons = new Map<string, HTMLButtonElement>();
  private readonly wardrobeCategoryButtons = new Map<SkinCategory, HTMLButtonElement>();
  private readonly globalStatsList = document.createElement('dl');
  private readonly selectedStatsList = document.createElement('dl');
  private readonly worldList = document.createElement('div');
  private readonly worldDetailTitle = document.createElement('h3');
  private readonly worldDetailMeta = document.createElement('div');
  private readonly worldDetailStats = document.createElement('dl');
  private readonly renameInput = document.createElement('input');
  private readonly createNameInput = document.createElement('input');
  private readonly createSeedInput = document.createElement('input');
  private readonly playWorldButton = document.createElement('button');
  private readonly renameWorldButton = document.createElement('button');
  private readonly deleteWorldButton = document.createElement('button');
  private readonly wardrobeGallery = document.createElement('div');
  private readonly wardrobeSelectedName = document.createElement('div');
  private readonly wardrobeImportInput = document.createElement('input');
  private readonly wardrobeEmptyLabel = document.createElement('div');
  private readonly pauseTitle = document.createElement('h2');
  private readonly pauseMeta = document.createElement('div');
  private readonly pauseStats = document.createElement('dl');
  private readonly settingsResumeButton = document.createElement('button');
  private readonly settingsQuitButton = document.createElement('button');
  private readonly settingsBackButton = document.createElement('button');
  private readonly homeSkinLabel = document.createElement('div');
  private homeSkinViewer!: SkinViewer;
  private wardrobeSkinViewer!: SkinViewer;
  private mode: MenuMode = 'boot';
  private settings: GameSettings = createDefaultSettings();
  private globalStats: GlobalStats = createEmptyGlobalStats();
  private worlds: WorldSummary[] = [];
  private selectedWorldId: string | null = null;
  private listeningBinding: { action: ControlAction; slot: BindingSlot } | null = null;
  private pauseWorld: PauseWorldSnapshot | null = null;
  private selectedWardrobeCategory: SkinCategory = 'boys';
  private selectedSkinUrl: string | null = null;
  private selectedSkinName = 'Default';

  constructor(parent: HTMLElement, private readonly handlers: StartMenuHandlers) {
    this.root.className = 'menu-layer';
    this.panoramaHost.className = 'menu-panorama';
    this.panel.className = 'menu-panel';
    this.panorama = new MenuPanorama(this.panoramaHost);
    this.panoramaHost.dataset.panorama = this.panorama ? 'ready' : 'off';

    const homeView = this.buildHomeView();
    const singleplayerView = this.buildSingleplayerView();
    const settingsView = this.buildSettingsView();
    const statsView = this.buildStatsView();
    const pauseView = this.buildPauseView();
    const wardrobeView = this.buildWardrobeView();

    this.views.set('home', homeView);
    this.views.set('singleplayer', singleplayerView);
    this.views.set('settings', settingsView);
    this.views.set('stats', statsView);
    this.views.set('pause', pauseView);
    this.views.set('wardrobe', wardrobeView);

    this.panel.append(homeView, singleplayerView, settingsView, statsView, pauseView, wardrobeView);

    const vignette = document.createElement('div');
    vignette.className = 'menu-vignette';
    this.root.append(this.panoramaHost, vignette, this.panel);
    parent.append(this.root);

    this.handleKeyCapture = this.handleKeyCapture.bind(this);
    window.addEventListener('keydown', this.handleKeyCapture);

    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    this.renderWorldSelection();
    this.renderStatsView();
    this.renderWardrobe();
    this.renderPauseView();
    this.updateViewerSkins();
    this.showScreen('home');
    this.hide();
  }

  setSettings(settings: GameSettings): void {
    this.settings = {
      keyBindings: cloneBindings(settings.keyBindings),
      skinDataUrl: settings.skinDataUrl,
    };
    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    this.renderWardrobe();
    this.updateViewerSkins();
  }

  setGlobalStats(stats: GlobalStats): void {
    this.globalStats = { ...stats };
    this.renderStatsView();
  }

  setWorlds(worlds: WorldSummary[]): void {
    this.worlds = [...worlds];
    if (!this.selectedWorldId || !this.worlds.some((world) => world.id === this.selectedWorldId)) {
      this.selectedWorldId = this.worlds[0]?.id ?? null;
    }
    this.renderWorldSelection();
    this.renderStatsView();
  }

  setSelectedWorld(worldId: string | null): void {
    if (worldId && this.worlds.some((world) => world.id === worldId)) {
      this.selectedWorldId = worldId;
    } else if (worldId === null) {
      this.selectedWorldId = null;
    }
    this.renderWorldSelection();
    this.renderStatsView();
  }

  setPauseWorld(world: PauseWorldSnapshot | null): void {
    this.pauseWorld = world
      ? { id: world.id, name: world.name, seed: world.seed, worldStats: { ...world.worldStats } }
      : null;
    this.renderPauseView();
    this.renderStatsView();
  }

  showBoot(): void {
    this.mode = 'boot';
    this.root.style.display = 'grid';
    this.showScreen('home');
  }

  showPause(): void {
    this.mode = 'pause';
    this.root.style.display = 'grid';
    this.showScreen('pause');
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

  private buildHomeView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view home-view';

    const layout = document.createElement('div');
    layout.className = 'home-layout';

    const left = document.createElement('div');
    left.className = 'home-left-column';

    const masthead = document.createElement('div');
    masthead.className = 'title-masthead';
    const title = document.createElement('h1');
    title.textContent = 'Mineblow';
    const splash = document.createElement('div');
    splash.className = 'menu-splash';
    splash.textContent = 'Beta!!!';
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Voxel sandbox. Solo worlds. Pause menu. Inventory. Wardrobe.';
    masthead.append(title, splash, subtitle);

    const actions = document.createElement('div');
    actions.className = 'title-actions';
    actions.append(
      this.buildMainButton('Solo', () => this.showScreen('singleplayer')),
      this.buildMainButton('Multijoueur (soon !)', () => undefined, true),
      this.buildMainButton('Stats', () => this.showScreen('stats')),
      this.buildMainButton('Settings', () => this.showScreen('settings')),
    );

    left.append(masthead, actions);

    const right = document.createElement('div');
    right.className = 'home-right-column menu-well';
    const previewTitle = document.createElement('h3');
    previewTitle.textContent = 'Player';
    this.homeSkinLabel.className = 'menu-label';
    const viewerStage = document.createElement('div');
    viewerStage.className = 'menu-player-stage';
    this.homeSkinViewer = new SkinViewer(viewerStage);

    const wardrobeButton = document.createElement('button');
    wardrobeButton.type = 'button';
    wardrobeButton.className = 'menu-square-button';
    wardrobeButton.textContent = 'Vestiaire';
    wardrobeButton.addEventListener('click', () => this.showScreen('wardrobe'));

    right.append(previewTitle, viewerStage, this.homeSkinLabel, wardrobeButton);
    layout.append(left, right);
    view.append(layout);
    return view;
  }

  private buildSingleplayerView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view classic-view';

    view.append(
      this.buildHeader(
        'Select World',
        'Choose a world, then play, create, rename or delete it.',
        () => this.showScreen('home'),
      ),
    );

    const layout = document.createElement('div');
    layout.className = 'classic-layout singleplayer-layout';

    const listWell = document.createElement('div');
    listWell.className = 'menu-well world-browser';
    const worldListTitle = document.createElement('div');
    worldListTitle.className = 'well-title';
    worldListTitle.textContent = 'Saved Worlds';
    this.worldList.className = 'world-list';
    listWell.append(worldListTitle, this.worldList);

    const detailWell = document.createElement('div');
    detailWell.className = 'menu-well world-detail-well';
    const detailTitle = document.createElement('div');
    detailTitle.className = 'well-title';
    detailTitle.textContent = 'World Details';
    this.worldDetailMeta.className = 'world-detail-meta';
    this.worldDetailStats.className = 'stats-list';

    const renameBlock = document.createElement('div');
    renameBlock.className = 'field-stack';
    const renameLabel = document.createElement('label');
    renameLabel.className = 'field-label';
    renameLabel.textContent = 'Rename selected world';
    this.renameInput.type = 'text';
    this.renameInput.placeholder = 'World name';
    this.renameWorldButton.type = 'button';
    this.renameWorldButton.className = 'menu-button';
    this.renameWorldButton.textContent = 'Rename';
    this.renameWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      this.handlers.onRenameWorld(world.id, this.renameInput.value.trim());
    });
    renameBlock.append(renameLabel, this.renameInput, this.renameWorldButton);

    const createBlock = document.createElement('div');
    createBlock.className = 'field-stack';
    const createLabel = document.createElement('label');
    createLabel.className = 'field-label';
    createLabel.textContent = 'Create a new world';
    this.createNameInput.type = 'text';
    this.createNameInput.placeholder = 'World name';
    this.createNameInput.value = 'New World';
    this.createSeedInput.type = 'text';
    this.createSeedInput.placeholder = 'Seed (optional)';
    createBlock.append(createLabel, this.createNameInput, this.createSeedInput);

    detailWell.append(
      detailTitle,
      this.worldDetailTitle,
      this.worldDetailMeta,
      this.worldDetailStats,
      renameBlock,
      createBlock,
    );
    layout.append(listWell, detailWell);

    const footer = document.createElement('div');
    footer.className = 'classic-footer';

    this.playWorldButton.type = 'button';
    this.playWorldButton.className = 'menu-button';
    this.playWorldButton.textContent = 'Play Selected World';
    this.playWorldButton.addEventListener('click', () => {
      if (this.selectedWorldId) {
        this.handlers.onPlayWorld(this.selectedWorldId);
      }
    });

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.className = 'menu-button';
    createButton.textContent = 'Create New World';
    createButton.addEventListener('click', () => {
      this.handlers.onCreateWorld(this.createNameInput.value.trim(), this.createSeedInput.value.trim());
      this.createSeedInput.value = '';
    });

    this.deleteWorldButton.type = 'button';
    this.deleteWorldButton.className = 'menu-button';
    this.deleteWorldButton.textContent = 'Delete';
    this.deleteWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      if (window.confirm(`Delete "${world.name}"?`)) {
        this.handlers.onDeleteWorld(world.id);
      }
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Cancel';
    backButton.addEventListener('click', () => this.showScreen('home'));

    footer.append(this.playWorldButton, createButton, this.deleteWorldButton, backButton);
    view.append(layout, footer);
    return view;
  }

  private buildSettingsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view classic-view';

    view.append(
      this.buildHeader('Controls', 'Click a slot, then press a key.', () =>
        this.showScreen(this.mode === 'pause' ? 'pause' : 'home'),
      ),
    );

    const well = document.createElement('div');
    well.className = 'menu-well settings-well';
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

    well.append(list);

    const footer = document.createElement('div');
    footer.className = 'classic-footer';

    this.settingsBackButton.type = 'button';
    this.settingsBackButton.className = 'menu-button secondary';
    this.settingsBackButton.textContent = 'Back';
    this.settingsBackButton.addEventListener('click', () => this.showScreen(this.mode === 'pause' ? 'pause' : 'home'));

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'menu-button';
    resetButton.textContent = 'Reset Defaults';
    resetButton.addEventListener('click', () => {
      this.settings = createDefaultSettings();
      this.renderBindings();
      this.handlers.onSettingsChange({
        keyBindings: cloneBindings(this.settings.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
      });
    });

    this.settingsResumeButton.type = 'button';
    this.settingsResumeButton.className = 'menu-button';
    this.settingsResumeButton.textContent = 'Back to Game';
    this.settingsResumeButton.addEventListener('click', () => {
      this.hide();
      this.handlers.onResume();
    });

    this.settingsQuitButton.type = 'button';
    this.settingsQuitButton.className = 'menu-button';
    this.settingsQuitButton.textContent = 'Quitter la partie';
    this.settingsQuitButton.addEventListener('click', () => this.handlers.onQuitToTitle());

    footer.append(this.settingsBackButton, resetButton, this.settingsResumeButton, this.settingsQuitButton);
    view.append(well, footer);
    return view;
  }

  private buildStatsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view classic-view';

    view.append(
      this.buildHeader('Statistics', 'Global stats and selected world stats.', () =>
        this.showScreen('home'),
      ),
    );

    const layout = document.createElement('div');
    layout.className = 'classic-layout stats-layout';

    const globalWell = document.createElement('div');
    globalWell.className = 'menu-well';
    const globalTitle = document.createElement('div');
    globalTitle.className = 'well-title';
    globalTitle.textContent = 'Global Stats';
    this.globalStatsList.className = 'stats-list';
    globalWell.append(globalTitle, this.globalStatsList);

    const selectedWell = document.createElement('div');
    selectedWell.className = 'menu-well';
    const selectedTitle = document.createElement('div');
    selectedTitle.className = 'well-title';
    selectedTitle.textContent = 'Selected World';
    this.selectedStatsList.className = 'stats-list';
    selectedWell.append(selectedTitle, this.selectedStatsList);

    layout.append(globalWell, selectedWell);

    const footer = document.createElement('div');
    footer.className = 'classic-footer';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('home'));
    footer.append(backButton);

    view.append(layout, footer);
    return view;
  }

  private buildPauseView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view pause-view';

    const panel = document.createElement('div');
    panel.className = 'menu-well pause-well';
    this.pauseMeta.className = 'menu-label';
    this.pauseStats.className = 'stats-list';

    const actions = document.createElement('div');
    actions.className = 'title-actions';
    actions.append(
      this.buildMainButton('Back to Game', () => {
        this.hide();
        this.handlers.onResume();
      }),
      this.buildMainButton('Settings', () => this.showScreen('settings')),
      this.buildMainButton('Quitter la partie', () => this.handlers.onQuitToTitle()),
    );

    panel.append(this.pauseTitle, this.pauseMeta, this.pauseStats, actions);
    view.append(panel);
    return view;
  }

  private buildWardrobeView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view classic-view';

    view.append(
      this.buildHeader('Wardrobe', 'Choose a skin category or import a custom PNG.', () =>
        this.showScreen('home'),
      ),
    );

    const layout = document.createElement('div');
    layout.className = 'classic-layout wardrobe-layout';

    const categoryWell = document.createElement('div');
    categoryWell.className = 'menu-well';
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'well-title';
    categoryTitle.textContent = 'Categories';
    const categoryList = document.createElement('div');
    categoryList.className = 'wardrobe-category-list';
    SKIN_CATEGORIES.forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-button wardrobe-category-button';
      button.textContent = category;
      button.addEventListener('click', () => {
        this.selectedWardrobeCategory = category;
        this.renderWardrobe();
      });
      this.wardrobeCategoryButtons.set(category, button);
      categoryList.append(button);
    });
    categoryWell.append(categoryTitle, categoryList);

    const galleryWell = document.createElement('div');
    galleryWell.className = 'menu-well';
    const galleryTitle = document.createElement('div');
    galleryTitle.className = 'well-title';
    galleryTitle.textContent = 'Skin Gallery';
    this.wardrobeGallery.className = 'wardrobe-gallery';
    this.wardrobeEmptyLabel.className = 'empty-worlds';
    galleryWell.append(galleryTitle, this.wardrobeGallery, this.wardrobeEmptyLabel);

    const previewWell = document.createElement('div');
    previewWell.className = 'menu-well wardrobe-preview-well';
    const previewTitle = document.createElement('div');
    previewTitle.className = 'well-title';
    previewTitle.textContent = 'Selected Skin';
    const stage = document.createElement('div');
    stage.className = 'menu-player-stage wardrobe-stage';
    this.wardrobeSkinViewer = new SkinViewer(stage);
    this.wardrobeSelectedName.className = 'menu-label';

    const importLabel = document.createElement('label');
    importLabel.className = 'menu-button wardrobe-import-button';
    importLabel.textContent = 'Import PNG';
    this.wardrobeImportInput.type = 'file';
    this.wardrobeImportInput.accept = 'image/png';
    this.wardrobeImportInput.addEventListener('change', () => {
      const file = this.wardrobeImportInput.files?.[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.selectedSkinUrl = reader.result;
          this.selectedSkinName = file.name.replace(/\.[^.]+$/, '');
          this.commitSkinSelection(reader.result);
          this.renderWardrobe();
          this.updateViewerSkins();
        }
      };
      reader.readAsDataURL(file);
      this.wardrobeImportInput.value = '';
    });
    importLabel.append(this.wardrobeImportInput);

    previewWell.append(previewTitle, stage, this.wardrobeSelectedName, importLabel);
    layout.append(categoryWell, galleryWell, previewWell);

    const footer = document.createElement('div');
    footer.className = 'classic-footer';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('home'));
    footer.append(backButton);

    view.append(layout, footer);
    return view;
  }

  private buildHeader(titleText: string, subtitleText: string, onBack: () => void): HTMLElement {
    const header = document.createElement('div');
    header.className = 'menu-screen-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'screen-title-wrap';
    const title = document.createElement('h2');
    title.textContent = titleText;
    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleText;
    titleWrap.append(title, subtitle);

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', onBack);

    header.append(titleWrap, backButton);
    return header;
  }

  private buildMainButton(label: string, onClick: () => void, disabled = false): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-button menu-button-large';
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener('click', onClick);
    return button;
  }

  private showScreen(screen: MenuScreen): void {
    this.panel.dataset.mode = this.mode;
    this.panel.dataset.screen = screen;
    this.views.forEach((view, key) => {
      view.style.display = key === screen ? 'grid' : 'none';
    });
    this.settingsResumeButton.style.display = this.mode === 'pause' ? '' : 'none';
    this.settingsQuitButton.style.display = this.mode === 'pause' ? '' : 'none';
    this.renderPauseView();
    this.renderStatsView();
    this.renderWardrobe();
  }

  private getSelectedWorld(): WorldSummary | null {
    return this.worlds.find((world) => world.id === this.selectedWorldId) ?? null;
  }

  private renderWorldSelection(): void {
    this.worldList.replaceChildren();
    if (this.worlds.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-worlds';
      empty.textContent = 'No worlds yet. Create one on the right.';
      this.worldList.append(empty);
    } else {
      this.worlds.forEach((world) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'world-card';
        button.classList.toggle('selected', world.id === this.selectedWorldId);
        button.addEventListener('click', () => {
          this.selectedWorldId = world.id;
          this.renderWorldSelection();
          this.renderStatsView();
        });
        button.addEventListener('dblclick', () => this.handlers.onPlayWorld(world.id));

        const name = document.createElement('strong');
        name.textContent = world.name;
        const meta = document.createElement('span');
        meta.textContent = `${this.formatDate(world.lastPlayedAt)} | Seed ${world.seed}`;
        const stats = document.createElement('em');
        stats.textContent = `${this.formatDuration(world.worldStats.playTimeMs)} | ${world.worldStats.blocksMined.toLocaleString()} mined`;
        button.append(name, meta, stats);
        this.worldList.append(button);
      });
    }

    const selected = this.getSelectedWorld();
    if (!selected) {
      this.worldDetailTitle.textContent = 'No world selected';
      this.worldDetailMeta.textContent = 'Pick a world from the list or create a new one.';
      this.worldDetailStats.replaceChildren(...this.buildStatEntries([['Stats', 'No data'], ['Seed', 'N/A']]));
      this.playWorldButton.disabled = true;
      this.renameWorldButton.disabled = true;
      this.deleteWorldButton.disabled = true;
      this.renameInput.value = '';
      return;
    }

    this.worldDetailTitle.textContent = selected.name;
    this.worldDetailMeta.textContent =
      `Created ${this.formatDate(selected.createdAt)} | Last played ${this.formatDate(selected.lastPlayedAt)} | Seed ${selected.seed}`;
    this.worldDetailStats.replaceChildren(
      ...this.buildStatEntries([
        ['Play Time', this.formatDuration(selected.worldStats.playTimeMs)],
        ['Blocks Mined', selected.worldStats.blocksMined.toLocaleString()],
        ['Blocks Placed', selected.worldStats.blocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(selected.worldStats.distanceTravelled).toLocaleString()} m`],
        ['Jumps', selected.worldStats.jumps.toLocaleString()],
        ['Crafted', selected.worldStats.craftedItems.toLocaleString()],
      ]),
    );
    this.playWorldButton.disabled = false;
    this.renameWorldButton.disabled = false;
    this.deleteWorldButton.disabled = false;
    if (document.activeElement !== this.renameInput || this.renameInput.dataset.worldId !== selected.id) {
      this.renameInput.value = selected.name;
      this.renameInput.dataset.worldId = selected.id;
    }
  }

  private renderStatsView(): void {
    this.globalStatsList.replaceChildren(
      ...this.buildStatEntries([
        ['Worlds', this.worlds.length.toString()],
        ['Play Time', this.formatDuration(this.globalStats.totalPlayTimeMs)],
        ['Blocks Mined', this.globalStats.totalBlocksMined.toLocaleString()],
        ['Blocks Placed', this.globalStats.totalBlocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],
        ['Jumps', this.globalStats.totalJumps.toLocaleString()],
        ['Crafted', this.globalStats.totalCraftedItems.toLocaleString()],
      ]),
    );

    const selected = this.pauseWorld ?? this.getSelectedWorld();
    if (!selected) {
      this.selectedStatsList.replaceChildren(
        ...this.buildStatEntries([['Selected World', 'No world selected'], ['Seed', 'N/A']]),
      );
      return;
    }

    this.selectedStatsList.replaceChildren(
      ...this.buildStatEntries([
        ['World', selected.name],
        ['Seed', selected.seed],
        ['Play Time', this.formatDuration(selected.worldStats.playTimeMs)],
        ['Blocks Mined', selected.worldStats.blocksMined.toLocaleString()],
        ['Blocks Placed', selected.worldStats.blocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(selected.worldStats.distanceTravelled).toLocaleString()} m`],
        ['Jumps', selected.worldStats.jumps.toLocaleString()],
        ['Crafted', selected.worldStats.craftedItems.toLocaleString()],
      ]),
    );
  }

  private renderPauseView(): void {
    const snapshot = this.pauseWorld ?? {
      id: 'none',
      name: 'Game Paused',
      seed: 'N/A',
      worldStats: createEmptyWorldStats(),
    };

    this.pauseTitle.textContent = snapshot.name;
    this.pauseMeta.textContent = `Seed ${snapshot.seed}`;
    this.pauseStats.replaceChildren(
      ...this.buildStatEntries([
        ['Play Time', this.formatDuration(snapshot.worldStats.playTimeMs)],
        ['Blocks Mined', snapshot.worldStats.blocksMined.toLocaleString()],
        ['Blocks Placed', snapshot.worldStats.blocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(snapshot.worldStats.distanceTravelled).toLocaleString()} m`],
      ]),
    );
  }

  private renderWardrobe(): void {
    this.wardrobeCategoryButtons.forEach((button, category) => {
      button.classList.toggle('active', category === this.selectedWardrobeCategory);
    });

    const skins = getCatalogSkins(this.selectedWardrobeCategory);
    this.wardrobeGallery.replaceChildren();
    skins.forEach((skin) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wardrobe-skin-card';
      button.classList.toggle('selected', skin.url === this.selectedSkinUrl);
      button.addEventListener('click', () => this.selectCatalogSkin(skin));

      const label = document.createElement('span');
      label.textContent = skin.name;
      button.append(label);
      this.wardrobeGallery.append(button);
    });

    this.wardrobeEmptyLabel.style.display = skins.length === 0 ? '' : 'none';
    this.wardrobeEmptyLabel.textContent = `Drop PNG skins into assets/skins/${this.selectedWardrobeCategory}.`;
    this.wardrobeSelectedName.textContent = `Selected: ${this.selectedSkinName}`;
  }

  private selectCatalogSkin(skin: CatalogSkin): void {
    this.selectedWardrobeCategory = skin.category;
    this.selectedSkinUrl = skin.url;
    this.selectedSkinName = skin.name;
    this.commitSkinSelection(skin.url);
    this.renderWardrobe();
    this.updateViewerSkins();
  }

  private syncSkinSelectionFromSettings(): void {
    const selectedUrl = this.settings.skinDataUrl;
    const catalogSkin =
      selectedUrl === null
        ? null
        : SKIN_CATEGORIES.flatMap((category) => getCatalogSkins(category)).find((skin) => skin.url === selectedUrl) ?? null;

    if (catalogSkin) {
      this.selectedWardrobeCategory = catalogSkin.category;
      this.selectedSkinUrl = catalogSkin.url;
      this.selectedSkinName = catalogSkin.name;
    } else if (selectedUrl) {
      this.selectedSkinUrl = selectedUrl;
      this.selectedSkinName = 'Imported skin';
    } else {
      this.selectedSkinUrl = null;
      this.selectedSkinName = 'Default';
    }
    this.homeSkinLabel.textContent = `Skin: ${this.selectedSkinName}`;
  }

  private updateViewerSkins(): void {
    void this.homeSkinViewer.setSkin(this.settings.skinDataUrl);
    void this.wardrobeSkinViewer.setSkin(this.settings.skinDataUrl);
    this.homeSkinLabel.textContent = `Skin: ${this.selectedSkinName}`;
  }

  private commitSkinSelection(skinDataUrl: string | null): void {
    this.settings = {
      keyBindings: cloneBindings(this.settings.keyBindings),
      skinDataUrl,
    };
    this.handlers.onSettingsChange({
      keyBindings: cloneBindings(this.settings.keyBindings),
      skinDataUrl,
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

  private formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
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
