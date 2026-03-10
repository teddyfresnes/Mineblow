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
import { getCatalogSkins, getSkinCategories, type CatalogSkin, type SkinCategory } from './SkinCatalog';
import { MenuPanorama } from './MenuPanorama';
import { SkinViewer } from './SkinViewer';
import { createBitmapText } from './BitmapText';
import menuQuotesRaw from '../../assets/text/menu_quotes.txt?raw';

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
type MenuScreen =
  | 'home'
  | 'singleplayer'
  | 'create-world'
  | 'edit-world'
  | 'settings'
  | 'keybindings'
  | 'graphics'
  | 'stats'
  | 'pause'
  | 'wardrobe';
type BindingSlot = 'primary' | 'secondary';
type StatsCategory = 'general' | 'items';
type MenuSurface = 'panorama' | 'classic' | 'transparent';

interface PauseWorldSnapshot {
  id: string;
  name: string;
  seed: string;
  worldStats: WorldStats;
}

const CLASSIC_SCREENS = new Set<MenuScreen>([
  'singleplayer',
  'create-world',
  'edit-world',
  'settings',
  'keybindings',
  'graphics',
  'stats',
]);

const MENU_QUOTES = menuQuotesRaw
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const pickMenuQuote = (): string => {
  if (MENU_QUOTES.length === 0) {
    return 'Build your world, block by block.';
  }
  const index = Math.floor(Math.random() * MENU_QUOTES.length);
  return MENU_QUOTES[index];
};

export class StartMenu {
  private readonly root = document.createElement('div');
  private readonly panoramaHost = document.createElement('div');
  private readonly classicBackdrop = document.createElement('div');
  private readonly vignette = document.createElement('div');
  private readonly wardrobeShade = document.createElement('div');
  private readonly panel = document.createElement('div');
  private readonly panorama: MenuPanorama;
  private readonly views = new Map<MenuScreen, HTMLElement>();
  private readonly bindingButtons = new Map<string, HTMLButtonElement>();
  private readonly wardrobeCategoryButtons = new Map<SkinCategory, HTMLButtonElement>();
  private readonly statsCategoryButtons = new Map<StatsCategory, HTMLButtonElement>();
  private readonly worldPreviewCache = new Map<string, string>();
  private readonly worldList = document.createElement('div');
  private readonly editWorldPreview = document.createElement('div');
  private readonly editWorldTitle = document.createElement('h3');
  private readonly editWorldMeta = document.createElement('div');
  private readonly editNameInput = document.createElement('input');
  private readonly createNameInput = document.createElement('input');
  private readonly createSeedInput = document.createElement('input');
  private readonly playWorldButton = document.createElement('button');
  private readonly editWorldButton = document.createElement('button');
  private readonly deleteWorldButton = document.createElement('button');
  private readonly saveEditWorldButton = document.createElement('button');
  private readonly startupFullscreenToggleButton = document.createElement('button');
  private readonly statsList = document.createElement('div');
  private readonly wardrobeCategoryList = document.createElement('div');
  private readonly wardrobeGallery = document.createElement('div');
  private readonly wardrobeImportInput = document.createElement('input');
  private readonly wardrobeEmptyLabel = document.createElement('div');
  private readonly wardrobeSkinName = document.createElement('div');
  private readonly pauseTitle = document.createElement('h2');
  private readonly pauseMeta = document.createElement('div');
  private readonly pauseStats = document.createElement('dl');
  private homeSkinViewer!: SkinViewer;
  private wardrobeSkinViewer!: SkinViewer;
  private mode: MenuMode = 'boot';
  private currentScreen: MenuScreen = 'home';
  private settings: GameSettings = createDefaultSettings();
  private globalStats: GlobalStats = createEmptyGlobalStats();
  private worlds: WorldSummary[] = [];
  private selectedWorldId: string | null = null;
  private listeningBinding: { action: ControlAction; slot: BindingSlot } | null = null;
  private pauseWorld: PauseWorldSnapshot | null = null;
  private selectedWardrobeCategory: SkinCategory = '';
  private selectedSkinUrl: string | null = null;
  private selectedStatsCategory: StatsCategory = 'general';
  private wardrobeCategoryViewers: SkinViewer[] = [];
  private homeLeftColumn: HTMLDivElement | null = null;
  private homeActionsColumn: HTMLDivElement | null = null;
  private readonly handleHomeAlignmentResize = (): void => {
    this.alignHomeToViewportCenter();
  };

  constructor(parent: HTMLElement, private readonly handlers: StartMenuHandlers) {
    this.root.className = 'menu-layer';
    this.panoramaHost.className = 'menu-panorama';
    this.classicBackdrop.className = 'menu-classic-backdrop';
    this.vignette.className = 'menu-vignette';
    this.wardrobeShade.className = 'wardrobe-shade';
    this.panel.className = 'menu-panel';
    this.panorama = new MenuPanorama(this.panoramaHost);
    this.panoramaHost.dataset.panorama = this.panorama ? 'ready' : 'off';

    const homeView = this.buildHomeView();
    const singleplayerView = this.buildSingleplayerView();
    const createWorldView = this.buildCreateWorldView();
    const editWorldView = this.buildEditWorldView();
    const settingsView = this.buildSettingsView();
    const keybindingsView = this.buildKeybindingsView();
    const graphicsView = this.buildGraphicsView();
    const statsView = this.buildStatsView();
    const pauseView = this.buildPauseView();
    const wardrobeView = this.buildWardrobeView();

    this.views.set('home', homeView);
    this.views.set('singleplayer', singleplayerView);
    this.views.set('create-world', createWorldView);
    this.views.set('edit-world', editWorldView);
    this.views.set('settings', settingsView);
    this.views.set('keybindings', keybindingsView);
    this.views.set('graphics', graphicsView);
    this.views.set('stats', statsView);
    this.views.set('pause', pauseView);
    this.views.set('wardrobe', wardrobeView);

    this.panel.append(
      homeView,
      singleplayerView,
      createWorldView,
      editWorldView,
      settingsView,
      keybindingsView,
      graphicsView,
      statsView,
      pauseView,
      wardrobeView,
    );

    this.root.append(this.panoramaHost, this.classicBackdrop, this.vignette, this.wardrobeShade, this.panel);
    parent.append(this.root);
    window.addEventListener('resize', this.handleHomeAlignmentResize);

    this.createNameInput.value = 'New World';
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
          this.commitSkinSelection(reader.result);
          this.renderWardrobe();
          this.updateViewerSkins();
        }
      };
      reader.readAsDataURL(file);
      this.wardrobeImportInput.value = '';
    });
    this.handleKeyCapture = this.handleKeyCapture.bind(this);
    window.addEventListener('keydown', this.handleKeyCapture);

    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderStatsView();
    this.renderGraphicsView();
    this.renderWardrobe();
    this.renderPauseView();
    this.updateViewerSkins();
    this.showScreen('home');
    this.alignHomeToViewportCenter();
    this.hide();
  }

  setSettings(settings: GameSettings): void {
    this.settings = {
      keyBindings: cloneBindings(settings.keyBindings),
      skinDataUrl: settings.skinDataUrl,
      startFullscreen: settings.startFullscreen,
    };
    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    this.renderGraphicsView();
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
    if (this.currentScreen === 'edit-world' && !this.getSelectedWorld()) {
      this.showScreen('singleplayer');
      return;
    }
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderStatsView();
  }

  setSelectedWorld(worldId: string | null): void {
    if (worldId && this.worlds.some((world) => world.id === worldId)) {
      this.selectedWorldId = worldId;
    } else if (worldId === null) {
      this.selectedWorldId = null;
    }
    if (this.currentScreen === 'edit-world' && !this.getSelectedWorld()) {
      this.showScreen('singleplayer');
      return;
    }
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderStatsView();
  }

  setPauseWorld(world: PauseWorldSnapshot | null): void {
    this.pauseWorld = world
      ? { id: world.id, name: world.name, seed: world.seed, worldStats: { ...world.worldStats } }
      : null;
    this.renderPauseView();
  }

  showBoot(): void {
    this.mode = 'boot';
    this.root.style.display = 'grid';
    this.showScreen('home');
    this.alignHomeToViewportCenter();
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
    this.homeLeftColumn = left;

    const masthead = document.createElement('div');
    masthead.className = 'title-masthead';
    const titleBrand = document.createElement('div');
    titleBrand.className = 'title-brand';
    const title = createBitmapText('MINEBLOW', {
      className: 'menu-logo-text',
      ariaLabel: 'Mineblow',
    });
    const splash = document.createElement('div');
    splash.className = 'menu-splash';
    splash.textContent = '1.0 ALPHA BUILD !!';
    const subtitle = document.createElement('p');
    subtitle.textContent = pickMenuQuote();
    titleBrand.append(title, splash);
    masthead.append(titleBrand, subtitle);

    const actions = document.createElement('div');
    actions.className = 'title-actions';
    this.homeActionsColumn = actions;
    const mobileWardrobeButton = this.buildMainButton('Wardrobe', () => this.showScreen('wardrobe'));
    mobileWardrobeButton.classList.add('mobile-wardrobe-button');
    actions.append(
      this.buildMainButton('Solo', () => this.showScreen('singleplayer')),
      this.buildMainButton('Multijoueur (soon !)', () => undefined, true),
      this.buildMainButton('Stats', () => this.showScreen('stats')),
      this.buildMainButton('Settings', () => this.showScreen('settings')),
      mobileWardrobeButton,
    );

    left.append(masthead, actions);

    const right = document.createElement('div');
    right.className = 'home-right-column home-avatar-column';
    const viewerStage = document.createElement('div');
    viewerStage.className = 'menu-player-stage bare-player-stage home-avatar-stage';
    this.homeSkinViewer = new SkinViewer(viewerStage);

    const wardrobeButton = document.createElement('button');
    wardrobeButton.type = 'button';
    wardrobeButton.className = 'wardrobe-launch-button';
    wardrobeButton.setAttribute('aria-label', 'Vestiaire');
    wardrobeButton.addEventListener('click', () => this.showScreen('wardrobe'));
    const wardrobeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wardrobeIcon.setAttribute('viewBox', '0 0 24 24');
    wardrobeIcon.setAttribute('aria-hidden', 'true');
    wardrobeIcon.classList.add('wardrobe-launch-icon-svg');
    const wardrobeIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    wardrobeIconPath.setAttribute(
      'd',
      'M9 3h6l2.4 2 3.1 1.4V11h-2.1v10H5.6V11H3.5V6.4L6.6 5 9 3z',
    );
    wardrobeIconPath.setAttribute('fill', 'currentColor');
    wardrobeIcon.append(wardrobeIconPath);
    wardrobeButton.append(wardrobeIcon);

    right.append(viewerStage, wardrobeButton);
    layout.append(left, right);
    view.append(layout);
    return view;
  }

  private buildSingleplayerView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic singleplayer-view';

    view.append(this.buildClassicTitle('Select World'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame world-select-frame';

    this.worldList.className = 'minecraft-world-list';
    frame.append(this.worldList);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-stack';

    const primaryRow = document.createElement('div');
    primaryRow.className = 'classic-footer-row two-columns';

    this.playWorldButton.type = 'button';
    this.playWorldButton.className = 'menu-button';
    this.playWorldButton.textContent = 'Jouer';
    this.playWorldButton.addEventListener('click', () => {
      if (this.selectedWorldId) {
        this.handlers.onPlayWorld(this.selectedWorldId);
      }
    });

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.className = 'menu-button';
    createButton.textContent = 'Creer un monde';
    createButton.addEventListener('click', () => this.openCreateWorldScreen());

    primaryRow.append(this.playWorldButton, createButton);

    const secondaryRow = document.createElement('div');
    secondaryRow.className = 'classic-footer-row three-columns';

    this.editWorldButton.type = 'button';
    this.editWorldButton.className = 'menu-button';
    this.editWorldButton.textContent = 'Modifier';
    this.editWorldButton.addEventListener('click', () => this.openEditWorldScreen());

    this.deleteWorldButton.type = 'button';
    this.deleteWorldButton.className = 'menu-button';
    this.deleteWorldButton.textContent = 'Supprimer';
    this.deleteWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      if (window.confirm(`Supprimer le monde "${world.name}" ?`)) {
        this.handlers.onDeleteWorld(world.id);
      }
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('home'));

    secondaryRow.append(this.editWorldButton, this.deleteWorldButton, backButton);
    footer.append(primaryRow, secondaryRow);

    view.append(frame, footer);
    return view;
  }

  private buildCreateWorldView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic create-world-view';

    view.append(this.buildClassicTitle('Create New World'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame form-screen-frame';

    const content = document.createElement('div');
    content.className = 'classic-form-card';

    const nameGroup = document.createElement('label');
    nameGroup.className = 'classic-input-group';
    const nameLabel = document.createElement('span');
    nameLabel.textContent = 'World Name';
    this.createNameInput.type = 'text';
    this.createNameInput.placeholder = 'New World';
    nameGroup.append(nameLabel, this.createNameInput);

    const seedGroup = document.createElement('label');
    seedGroup.className = 'classic-input-group';
    const seedLabel = document.createElement('span');
    seedLabel.textContent = 'Seed for the world generator';
    this.createSeedInput.type = 'text';
    this.createSeedInput.placeholder = 'Laisse vide pour une seed aleatoire';
    seedGroup.append(seedLabel, this.createSeedInput);

    content.append(nameGroup, seedGroup);
    frame.append(content);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row two-columns';

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.className = 'menu-button';
    createButton.textContent = 'Create New World';
    createButton.addEventListener('click', () => {
      const name = this.createNameInput.value.trim() || 'New World';
      const seed = this.createSeedInput.value.trim();
      this.handlers.onCreateWorld(name, seed);
      this.createSeedInput.value = '';
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('singleplayer'));

    footer.append(createButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildEditWorldView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic edit-world-view';

    view.append(this.buildClassicTitle('Edit World'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame form-screen-frame';

    const content = document.createElement('div');
    content.className = 'world-edit-card';

    this.editWorldPreview.className = 'world-preview-large';

    const detail = document.createElement('div');
    detail.className = 'world-edit-detail';
    this.editWorldTitle.className = 'world-edit-title';
    this.editWorldMeta.className = 'world-edit-meta';

    const nameGroup = document.createElement('label');
    nameGroup.className = 'classic-input-group';
    const nameLabel = document.createElement('span');
    nameLabel.textContent = 'World Name';
    this.editNameInput.type = 'text';
    this.editNameInput.placeholder = 'World name';
    nameGroup.append(nameLabel, this.editNameInput);

    detail.append(this.editWorldTitle, this.editWorldMeta, nameGroup);
    content.append(this.editWorldPreview, detail);
    frame.append(content);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row two-columns';

    this.saveEditWorldButton.type = 'button';
    this.saveEditWorldButton.className = 'menu-button';
    this.saveEditWorldButton.textContent = 'Save';
    this.saveEditWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      this.handlers.onRenameWorld(world.id, this.editNameInput.value.trim());
      this.showScreen('singleplayer');
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('singleplayer'));

    footer.append(this.saveEditWorldButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildSettingsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic settings-view';

    view.append(this.buildClassicTitle('Settings'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const buttonStack = document.createElement('div');
    buttonStack.className = 'classic-button-stack settings-buttons-grid';
    const keyBindingsButton = document.createElement('button');
    keyBindingsButton.type = 'button';
    keyBindingsButton.className = 'menu-button settings-compact-button';
    keyBindingsButton.textContent = 'Assignation des touches';
    keyBindingsButton.addEventListener('click', () => this.showScreen('keybindings'));

    const graphicsButton = document.createElement('button');
    graphicsButton.type = 'button';
    graphicsButton.className = 'menu-button settings-compact-button';
    graphicsButton.textContent = 'Options graphiques';
    graphicsButton.addEventListener('click', () => this.showScreen('graphics'));

    buttonStack.append(keyBindingsButton, graphicsButton);
    frame.append(buttonStack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen(this.mode === 'pause' ? 'pause' : 'home'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildGraphicsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic graphics-view';

    view.append(this.buildClassicTitle('Options graphiques'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const stack = document.createElement('div');
    stack.className = 'classic-button-stack graphics-options-stack';

    this.startupFullscreenToggleButton.type = 'button';
    this.startupFullscreenToggleButton.className = 'menu-button graphics-toggle-button';
    this.startupFullscreenToggleButton.addEventListener('click', () => {
      this.settings = {
        keyBindings: cloneBindings(this.settings.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
        startFullscreen: !this.settings.startFullscreen,
      };
      this.renderGraphicsView();
      this.handlers.onSettingsChange({
        keyBindings: cloneBindings(this.settings.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
        startFullscreen: this.settings.startFullscreen,
      });
    });
    stack.append(this.startupFullscreenToggleButton);

    frame.append(stack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('settings'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildKeybindingsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic keybindings-view';

    view.append(this.buildClassicTitle('Key Bindings'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame keybindings-screen-frame';
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

    frame.append(list);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row two-columns';

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'menu-button';
    resetButton.textContent = 'Reset Defaults';
    resetButton.addEventListener('click', () => {
      const defaults = createDefaultSettings();
      this.settings = {
        keyBindings: cloneBindings(defaults.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
        startFullscreen: this.settings.startFullscreen,
      };
      this.renderBindings();
      this.handlers.onSettingsChange({
        keyBindings: cloneBindings(this.settings.keyBindings),
        skinDataUrl: this.settings.skinDataUrl,
        startFullscreen: this.settings.startFullscreen,
      });
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('settings'));

    footer.append(resetButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildStatsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic stats-view';

    view.append(this.buildClassicTitle('Statistiques globales'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame stats-screen-frame';

    const categories = document.createElement('div');
    categories.className = 'classic-tab-row';

    const generalButton = document.createElement('button');
    generalButton.type = 'button';
    generalButton.className = 'menu-button classic-tab-button';
    generalButton.textContent = 'General';
    generalButton.addEventListener('click', () => {
      this.selectedStatsCategory = 'general';
      this.renderStatsView();
    });
    this.statsCategoryButtons.set('general', generalButton);

    const itemsButton = document.createElement('button');
    itemsButton.type = 'button';
    itemsButton.className = 'menu-button classic-tab-button';
    itemsButton.textContent = 'Objets';
    itemsButton.addEventListener('click', () => {
      this.selectedStatsCategory = 'items';
      this.renderStatsView();
    });
    this.statsCategoryButtons.set('items', itemsButton);

    categories.append(generalButton, itemsButton);
    this.statsList.className = 'stats-line-list';
    frame.append(categories, this.statsList);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('home'));
    footer.append(backButton);

    view.append(frame, footer);
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
    view.className = 'menu-view wardrobe-view';

    view.append(this.buildClassicTitle('Wardrobe'));

    const layout = document.createElement('div');
    layout.className = 'classic-layout wardrobe-layout';

    const categoryRail = document.createElement('div');
    categoryRail.className = 'wardrobe-category-rail';
    this.wardrobeCategoryList.className = 'wardrobe-category-list';
    categoryRail.append(this.wardrobeCategoryList);

    const galleryWell = document.createElement('div');
    galleryWell.className = 'menu-well';
    this.wardrobeGallery.className = 'wardrobe-gallery';
    this.wardrobeEmptyLabel.className = 'empty-worlds';
    galleryWell.append(this.wardrobeGallery, this.wardrobeEmptyLabel);

    const previewWell = document.createElement('div');
    previewWell.className = 'wardrobe-preview-column';
    const stage = document.createElement('div');
    stage.className = 'menu-player-stage bare-player-stage wardrobe-stage';
    this.wardrobeSkinViewer = new SkinViewer(stage);
    this.wardrobeSkinName.className = 'wardrobe-skin-name';
    previewWell.append(stage, this.wardrobeSkinName);
    layout.append(categoryRail, galleryWell, previewWell);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => this.showScreen('home'));
    footer.append(backButton);

    view.append(layout, footer);
    return view;
  }

  private buildClassicTitle(titleText: string, subtitleText?: string): HTMLElement {
    const header = document.createElement('div');
    header.className = 'classic-screen-header';

    const titleBitmap = createBitmapText(titleText, {
      className: 'classic-screen-title classic-title-text',
      uppercase: true,
      ariaLabel: titleText,
      glyphGapEm: 0.04,
    });

    header.append(titleBitmap);
    if (subtitleText && subtitleText.trim().length > 0) {
      const subtitle = document.createElement('p');
      subtitle.className = 'classic-screen-subtitle';
      subtitle.textContent = subtitleText;
      header.append(subtitle);
    }
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
    this.currentScreen = screen;
    this.panel.dataset.mode = this.mode;
    this.panel.dataset.screen = screen;
    this.root.classList.toggle('wardrobe-darkened', screen === 'wardrobe');
    this.views.forEach((view, key) => {
      view.style.display = key === screen ? 'grid' : 'none';
    });
    this.applySurfaceForScreen(screen);
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderBindings();
    this.renderGraphicsView();
    this.renderPauseView();
    this.renderStatsView();
    this.renderWardrobe();
    if (screen === 'home') {
      this.alignHomeToViewportCenter();
    }
  }

  private applySurfaceForScreen(screen: MenuScreen): void {
    const surface = this.getSurfaceForScreen(screen);
    this.root.dataset.surface = surface;
    this.panoramaHost.style.display = surface === 'panorama' ? 'block' : 'none';
    this.vignette.style.display = surface === 'panorama' ? 'block' : 'none';
    this.classicBackdrop.style.display = surface === 'classic' ? 'block' : 'none';
  }

  private getSurfaceForScreen(screen: MenuScreen): MenuSurface {
    if (this.mode === 'pause' && screen === 'pause') {
      return 'transparent';
    }
    return CLASSIC_SCREENS.has(screen) ? 'classic' : 'panorama';
  }

  private openCreateWorldScreen(): void {
    if (!this.createNameInput.value.trim()) {
      this.createNameInput.value = 'New World';
    }
    this.showScreen('create-world');
  }

  private openEditWorldScreen(): void {
    const world = this.getSelectedWorld();
    if (!world) {
      return;
    }
    this.editNameInput.value = world.name;
    this.editNameInput.dataset.worldId = world.id;
    this.showScreen('edit-world');
  }

  private getSelectedWorld(): WorldSummary | null {
    return this.worlds.find((world) => world.id === this.selectedWorldId) ?? null;
  }

  private renderWorldSelection(): void {
    this.worldList.replaceChildren();

    if (this.worlds.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-worlds';
      empty.textContent = 'Aucun monde.';
      this.worldList.append(empty);
    } else {
      this.worlds.forEach((world) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'world-entry';
        button.classList.toggle('selected', world.id === this.selectedWorldId);
        button.addEventListener('click', () => {
          this.selectedWorldId = world.id;
          this.renderWorldSelection();
          this.renderEditWorldScreen();
        });
        button.addEventListener('dblclick', () => this.handlers.onPlayWorld(world.id));

        const preview = document.createElement('div');
        preview.className = 'world-entry-preview';
        preview.style.backgroundImage = `url("${this.getWorldPreviewUrl(world)}")`;

        const detail = document.createElement('div');
        detail.className = 'world-entry-detail';
        const title = document.createElement('strong');
        title.textContent = world.name;
        const created = document.createElement('span');
        created.textContent = `Creation : ${this.formatDate(world.createdAt)}`;
        const lastPlayed = document.createElement('span');
        lastPlayed.textContent = `Derniere partie : ${this.formatDate(world.lastPlayedAt)}`;
        detail.append(title, created, lastPlayed);

        button.append(preview, detail);
        this.worldList.append(button);
      });
    }

    const hasSelection = this.getSelectedWorld() !== null;
    this.playWorldButton.disabled = !hasSelection;
    this.editWorldButton.disabled = !hasSelection;
    this.deleteWorldButton.disabled = !hasSelection;
  }

  private renderEditWorldScreen(): void {
    const world = this.getSelectedWorld();
    if (!world) {
      this.editWorldPreview.style.backgroundImage = '';
      this.editWorldTitle.textContent = 'Aucun monde selectionne';
      this.editWorldMeta.textContent = '';
      this.editNameInput.value = '';
      this.saveEditWorldButton.disabled = true;
      return;
    }

    this.editWorldPreview.style.backgroundImage = `url("${this.getWorldPreviewUrl(world)}")`;
    this.editWorldTitle.textContent = world.name;
    this.editWorldMeta.textContent =
      `Creation : ${this.formatDate(world.createdAt)} | Derniere partie : ${this.formatDate(world.lastPlayedAt)}`;
    if (document.activeElement !== this.editNameInput || this.editNameInput.dataset.worldId !== world.id) {
      this.editNameInput.value = world.name;
      this.editNameInput.dataset.worldId = world.id;
    }
    this.saveEditWorldButton.disabled = false;
  }

  private renderStatsView(): void {
    this.statsCategoryButtons.forEach((button, category) => {
      button.classList.toggle('active', category === this.selectedStatsCategory);
    });

    const entries: Array<[string, string]> =
      this.selectedStatsCategory === 'general'
        ? [
            ['Temps de jeu', this.formatDuration(this.globalStats.totalPlayTimeMs)],
            ['Distance parcourue', `${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],
            ['Sauts', this.globalStats.totalJumps.toLocaleString()],
            ['Mondes crees', this.globalStats.worldsCreated.toLocaleString()],
          ]
        : [
            ['Blocs casses', this.globalStats.totalBlocksMined.toLocaleString()],
            ['Blocs poses', this.globalStats.totalBlocksPlaced.toLocaleString()],
            ['Objets craftes', this.globalStats.totalCraftedItems.toLocaleString()],
            ['Mondes sauvegardes', this.worlds.length.toLocaleString()],
          ];

    this.statsList.replaceChildren(...this.buildStatsRows(entries));
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
      ...this.buildDefinitionListEntries([
        ['Play Time', this.formatDuration(snapshot.worldStats.playTimeMs)],
        ['Blocks Mined', snapshot.worldStats.blocksMined.toLocaleString()],
        ['Blocks Placed', snapshot.worldStats.blocksPlaced.toLocaleString()],
        ['Distance', `${Math.round(snapshot.worldStats.distanceTravelled).toLocaleString()} m`],
      ]),
    );
  }

  private renderGraphicsView(): void {
    this.startupFullscreenToggleButton.textContent = `Activer le plein ecran au demarrage du jeu : ${
      this.settings.startFullscreen ? 'ON' : 'OFF'
    }`;
  }

  private renderWardrobe(): void {
    this.disposeWardrobeCategoryViewers();
    this.wardrobeCategoryButtons.clear();
    this.wardrobeCategoryList.replaceChildren();

    const categories = getSkinCategories();
    if (categories.length > 0 && !categories.some((category) => category.name === this.selectedWardrobeCategory)) {
      this.selectedWardrobeCategory = categories[0].name;
    }

    categories.forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wardrobe-category-tile';
      button.classList.toggle('active', category.name === this.selectedWardrobeCategory);
      button.addEventListener('click', () => {
        this.selectedWardrobeCategory = category.name;
        this.renderWardrobe();
      });

      const stage = document.createElement('div');
      stage.className = 'wardrobe-category-stage';
      if (category.previewSkinUrl) {
        const viewer = new SkinViewer(stage);
        this.wardrobeCategoryViewers.push(viewer);
        void viewer.setSkin(category.previewSkinUrl);
      } else {
        stage.classList.add('empty');
      }

      const label = document.createElement('span');
      label.textContent = category.name;
      button.append(stage, label);
      this.wardrobeCategoryButtons.set(category.name, button);
      this.wardrobeCategoryList.append(button);
    });

    const importTile = document.createElement('label');
    importTile.className = 'wardrobe-category-tile wardrobe-import-tile';
    const importIcon = document.createElement('span');
    importIcon.className = 'wardrobe-import-plus';
    importIcon.textContent = '+';
    const importLabel = document.createElement('span');
    importLabel.textContent = 'Import';
    importTile.append(importIcon, importLabel, this.wardrobeImportInput);
    this.wardrobeCategoryList.append(importTile);

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
    this.wardrobeEmptyLabel.textContent =
      categories.length === 0
        ? 'Aucune categorie.'
        : 'Aucun skin.';

    const allCatalogSkins = categories.flatMap((category) => category.skins);
    const selectedName =
      allCatalogSkins.find((skin) => skin.url === this.settings.skinDataUrl)?.name ??
      (this.settings.skinDataUrl ? 'Imported Skin' : 'Default Skin');
    this.renderWardrobeSkinName(selectedName);
  }

  private selectCatalogSkin(skin: CatalogSkin): void {
    this.selectedWardrobeCategory = skin.category;
    this.selectedSkinUrl = skin.url;
    this.commitSkinSelection(skin.url);
    this.renderWardrobe();
    this.updateViewerSkins();
  }

  private syncSkinSelectionFromSettings(): void {
    const selectedUrl = this.settings.skinDataUrl;
    const catalogSkin =
      selectedUrl === null
        ? null
        : getSkinCategories()
            .flatMap((category) => category.skins)
            .find((skin) => skin.url === selectedUrl) ?? null;

    if (catalogSkin) {
      this.selectedWardrobeCategory = catalogSkin.category;
      this.selectedSkinUrl = catalogSkin.url;
    } else if (selectedUrl) {
      this.selectedSkinUrl = selectedUrl;
    } else {
      this.selectedSkinUrl = null;
    }
  }

  private updateViewerSkins(): void {
    void this.homeSkinViewer.setSkin(this.settings.skinDataUrl);
    void this.wardrobeSkinViewer.setSkin(this.settings.skinDataUrl);
  }

  private alignHomeToViewportCenter(): void {
    if (this.currentScreen !== 'home' || !this.homeActionsColumn || !this.homeLeftColumn) {
      return;
    }

    this.panel.style.setProperty('--home-center-nudge', '0px');

    const refine = (pass: number): void => {
      if (!this.homeActionsColumn || !this.homeLeftColumn || this.currentScreen !== 'home') {
        return;
      }

      const rect = this.homeActionsColumn.getBoundingClientRect();
      const currentCenter = rect.left + rect.width / 2;
      const targetCenter = window.innerWidth / 2;
      const delta = targetCenter - currentCenter;
      if (Math.abs(delta) < 0.5 || pass >= 3) {
        return;
      }

      const currentNudge = Number.parseFloat(
        this.panel.style.getPropertyValue('--home-center-nudge').replace('px', ''),
      );
      const nextNudge = (Number.isFinite(currentNudge) ? currentNudge : 0) + delta;
      this.panel.style.setProperty('--home-center-nudge', `${nextNudge}px`);

      requestAnimationFrame(() => refine(pass + 1));
    };

    requestAnimationFrame(() => refine(0));
  }

  private renderWardrobeSkinName(name: string): void {
    const label = createBitmapText(name, {
      className: 'wardrobe-skin-name-text',
      uppercase: true,
      ariaLabel: name,
      glyphGapEm: 0.02,
    });
    this.wardrobeSkinName.replaceChildren(label);
  }

  private disposeWardrobeCategoryViewers(): void {
    this.wardrobeCategoryViewers.forEach((viewer) => viewer.dispose());
    this.wardrobeCategoryViewers = [];
  }

  private commitSkinSelection(skinDataUrl: string | null): void {
    this.settings = {
      keyBindings: cloneBindings(this.settings.keyBindings),
      skinDataUrl,
      startFullscreen: this.settings.startFullscreen,
    };
    this.handlers.onSettingsChange({
      keyBindings: cloneBindings(this.settings.keyBindings),
      skinDataUrl,
      startFullscreen: this.settings.startFullscreen,
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
      startFullscreen: this.settings.startFullscreen,
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

  private buildStatsRows(entries: Array<[string, string]>): HTMLElement[] {
    return entries.map(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'stats-line-row';
      const key = document.createElement('span');
      key.className = 'stats-line-label';
      key.textContent = label;
      const content = document.createElement('strong');
      content.className = 'stats-line-value';
      content.textContent = value;
      row.append(key, content);
      return row;
    });
  }

  private buildDefinitionListEntries(entries: Array<[string, string]>): HTMLElement[] {
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

  private getWorldPreviewUrl(world: WorldSummary): string {
    if (world.previewImageDataUrl && world.previewImageDataUrl.length > 1200) {
      return world.previewImageDataUrl;
    }

    const cacheKey = `${world.id}:${world.seed}:${world.createdAt}`;
    const cached = this.worldPreviewCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 108;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return '';
    }

    const random = this.createSeededRandom(`${world.seed}|${world.name}|${world.createdAt}`);

    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, '#79aef5');
    sky.addColorStop(0.6, '#a4cbff');
    sky.addColorStop(1, '#d7ecff');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff8c2';
    ctx.fillRect(18, 14, 14, 14);

    this.drawMountainRange(ctx, canvas.width, canvas.height, random, '#627c96', 0.46, 20, 9);
    this.drawMountainRange(ctx, canvas.width, canvas.height, random, '#46627f', 0.58, 26, 12);
    this.drawMountainRange(ctx, canvas.width, canvas.height, random, '#35556b', 0.72, 32, 16);

    const groundY = Math.floor(canvas.height * 0.68);
    ctx.fillStyle = '#5a452d';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
    ctx.fillStyle = '#4f8d3d';
    ctx.fillRect(0, groundY, canvas.width, 8);

    for (let index = 0; index < 7; index += 1) {
      const x = Math.floor(random() * (canvas.width - 26));
      const height = 16 + Math.floor(random() * 18);
      ctx.fillStyle = '#3e2e1f';
      ctx.fillRect(x + 7, groundY - height, 6, height);
      ctx.fillStyle = '#2f6a2c';
      ctx.fillRect(x, groundY - height - 14, 20, 14);
    }

    for (let index = 0; index < 28; index += 1) {
      const x = Math.floor(random() * canvas.width);
      const y = groundY + 10 + Math.floor(random() * 22);
      ctx.fillStyle = random() > 0.5 ? '#75604d' : '#6a5544';
      ctx.fillRect(x, y, 6, 6);
    }

    const url = canvas.toDataURL('image/png');
    this.worldPreviewCache.set(cacheKey, url);
    return url;
  }

  private drawMountainRange(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    random: () => number,
    color: string,
    baseRatio: number,
    stepMin: number,
    stepVariance: number,
  ): void {
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, Math.floor(height * baseRatio));
    let x = 0;
    while (x < width + stepMin) {
      const peakHeight = Math.floor(height * (baseRatio - 0.18 + random() * 0.12));
      const step = stepMin + Math.floor(random() * stepVariance);
      ctx.lineTo(x, peakHeight);
      x += step;
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  private createSeededRandom(source: string): () => number {
    let hash = 2166136261;
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    let state = hash >>> 0;
    return () => {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  private formatDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat('fr-FR', {
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

