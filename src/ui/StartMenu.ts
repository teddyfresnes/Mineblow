import {
  CONTROL_ACTIONS,
  MAX_RENDER_DISTANCE_CHUNKS,
  MIN_RENDER_DISTANCE_CHUNKS,
  cloneBindings,
  createDefaultSettings,
  getControlLabel,
  formatKeyCode,
  normalizeRenderDistanceChunks,
  type ControlAction,
  type GameSettings,
} from '../game/Controls';
import { UI_LANGUAGES, getLanguageLabel, translate, type UiLanguage } from '../i18n/Language';
import type { MenuMessageKey } from '../i18n/messages';
import {
  createEmptyGlobalStats,
  createEmptyWorldStats,
  type GlobalStats,
  type WorldStats,
  type WorldSummary,
} from '../types/save';
import {
  clearCatalogSkinLookupCache,
  findCatalogSkinByUrl,
  findCatalogSkinNameByUrl,
  getCatalogSkins,
  getSkinCategories,
  loadCatalogSkinUrl,
  type CatalogCategory,
  type CatalogSkin,
  type SkinCategory,
} from './SkinCatalog';
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
  | 'languages'
  | 'performance'
  | 'keybindings'
  | 'graphics'
  | 'stats'
  | 'pause'
  | 'wardrobe';
type BindingSlot = 'primary' | 'secondary';
type StatsCategory = 'general' | 'items';
type MenuSurface = 'panorama' | 'classic' | 'transparent';
type WardrobeGenderFilter = 'all' | 'male' | 'female';

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
  'languages',
  'performance',
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
    return 'Construis ton monde, bloc par bloc.';
  }
  const index = Math.floor(Math.random() * MENU_QUOTES.length);
  return MENU_QUOTES[index];
};

type HomeActionIcon = 'solo' | 'multiplayer' | 'stats' | 'settings' | 'wardrobe';

const HOME_ACTION_ICON_PATHS: Record<HomeActionIcon, readonly string[]> = {
  solo: ['M8 6l10 6-10 6V6Z'],
  multiplayer: [
    'M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-6 1.17-6 3.5V19h7v-2.5c0-1.02.47-1.93 1.27-2.67A9.78 9.78 0 0 0 8 13Zm8 0c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5Z',
  ],
  stats: ['M4 19h16v2H4v-2Zm2-8h3v6H6v-6Zm5-5h3v11h-3V6Zm5 8h3v3h-3v-3Z'],
  settings: [
    'M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.07-.94l2.03-1.58c.18-.14.23-.4.12-.61l-1.92-3.32c-.12-.22-.38-.3-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.63-.94l-.36-2.54A.488.488 0 0 0 14.01 2h-4c-.24 0-.44.17-.48.41l-.36 2.54c-.59.24-1.14.54-1.65.94l-2.39-.96a.497.497 0 0 0-.61.22L2.2 8.46c-.12.21-.07.47.12.61l2.03 1.58c-.05.31-.08.65-.08.97 0 .32.03.65.08.96l-2.03 1.57a.494.494 0 0 0-.12.61l1.92 3.32c.12.22.38.3.61.22l2.39-.96c.51.39 1.06.72 1.65.94l.36 2.54c.04.24.24.41.48.41h4c.24 0 .44-.17.48-.41l.36-2.54c.58-.24 1.13-.55 1.63-.94l2.39.96c.23.09.49 0 .61-.22l1.92-3.32a.494.494 0 0 0-.12-.61l-2.01-1.57ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z',
  ],
  wardrobe: ['M9 3h6l2.4 2 3.1 1.4V11h-2.1v10H5.6V11H3.5V6.4L6.6 5 9 3z'],
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
  private readonly languageButtons = new Map<UiLanguage, HTMLButtonElement>();
  private readonly wardrobeCategoryButtons = new Map<SkinCategory, HTMLButtonElement>();
  private readonly statsCategoryButtons = new Map<StatsCategory, HTMLButtonElement>();
  private readonly localizedUpdaters: Array<() => void> = [];
  private readonly worldPreviewCache = new Map<string, string>();
  private readonly worldList = document.createElement('div');
  private readonly editWorldPreview = document.createElement('div');
  private readonly editWorldTitle = document.createElement('h3');
  private readonly editWorldMeta = document.createElement('div');
  private readonly editNameInput = document.createElement('input');
  private readonly createNameInput = document.createElement('input');
  private readonly createSeedInput = document.createElement('input');
  private readonly playWorldButton = document.createElement('button');
  private readonly deleteWorldButton = document.createElement('button');
  private readonly saveEditWorldButton = document.createElement('button');
  private readonly startupFullscreenToggleButton = document.createElement('button');
  private readonly developerDebugModeToggleButton = document.createElement('button');
  private readonly renderDistanceSlider = document.createElement('input');
  private readonly renderDistanceValue = document.createElement('div');
  private readonly statsTitleHost = document.createElement('div');
  private readonly statsList = document.createElement('div');
  private readonly wardrobeCategorySelect = document.createElement('select');
  private readonly wardrobeCategoryList = document.createElement('div');
  private readonly wardrobeGalleryHeader = document.createElement('div');
  private readonly wardrobeCategoryTitle = document.createElement('div');
  private readonly wardrobeHeaderRight = document.createElement('div');
  private readonly wardrobeFilterBar = document.createElement('div');
  private readonly wardrobeFilterButtons = new Map<WardrobeGenderFilter, HTMLButtonElement>();
  private readonly wardrobeLoadingIndicator = document.createElement('span');
  private readonly wardrobeGallery = document.createElement('div');
  private readonly wardrobeImportInput = document.createElement('input');
  private readonly wardrobeEmptyLabel = document.createElement('div');
  private readonly wardrobeSkinName = document.createElement('div');
  private readonly wardrobeValidateButton = document.createElement('button');
  private readonly pauseTitle = document.createElement('h2');
  private readonly pauseMeta = document.createElement('div');
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
  private wardrobeGenderFilter: WardrobeGenderFilter = 'all';
  private wardrobeRenderRequestId = 0;
  private wardrobeCategoriesRenderKey = '';
  private wardrobeCategoryScrollTop = 0;
  private readonly wardrobeCategoriesByName = new Map<SkinCategory, CatalogCategory>();
  private readonly wardrobeGalleryScrollByKey = new Map<string, number>();
  private readonly wardrobeCardViewers = new Map<HTMLElement, SkinViewer>();
  private wardrobeCardObserver: IntersectionObserver | null = null;
  private readonly wardrobeCategoryViewers = new Map<HTMLElement, SkinViewer>();
  private wardrobeCategoryObserver: IntersectionObserver | null = null;
  private currentWardrobeGalleryKey: string | null = null;
  private selectedSkinUrl: string | null = null;
  private importedSkinName: string | null = null;
  private selectedSkinName: string | null = null;
  private wardrobePendingSkinUrl: string | null = null;
  private wardrobePendingImportedSkinName: string | null = null;
  private wardrobePendingSkinName: string | null = null;
  private wardrobeGalleryLoadObserver: IntersectionObserver | null = null;
  private wardrobeGallerySentinel: HTMLDivElement | null = null;
  private wardrobeGalleryPendingSkins: CatalogSkin[] = [];
  private wardrobeGalleryNextIndex = 0;
  private wardrobeGalleryLoading = false;
  private readonly wardrobeGalleryChunkSize = 6;
  private selectedStatsCategory: StatsCategory = 'general';
  private skipNextEscapeShortcut = false;
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
    const languagesView = this.buildLanguagesView();
    const keybindingsView = this.buildKeybindingsView();
    const graphicsView = this.buildGraphicsView();
    const performanceView = this.buildPerformanceView();
    const statsView = this.buildStatsView();
    const pauseView = this.buildPauseView();
    const wardrobeView = this.buildWardrobeView();

    this.views.set('home', homeView);
    this.views.set('singleplayer', singleplayerView);
    this.views.set('create-world', createWorldView);
    this.views.set('edit-world', editWorldView);
    this.views.set('settings', settingsView);
    this.views.set('languages', languagesView);
    this.views.set('performance', performanceView);
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
      languagesView,
      performanceView,
      keybindingsView,
      graphicsView,
      statsView,
      pauseView,
      wardrobeView,
    );

    this.root.append(this.panoramaHost, this.classicBackdrop, this.vignette, this.wardrobeShade, this.panel);
    parent.append(this.root);
    window.addEventListener('resize', this.handleHomeAlignmentResize);

    this.createNameInput.value = this.t('worldNamePlaceholder');
    this.wardrobeImportInput.type = 'file';
    this.wardrobeImportInput.accept = 'image/png';
    this.wardrobeImportInput.addEventListener('change', () => {
      const file = this.wardrobeImportInput.files?.[0];
      if (!file) {
        return;
      }
      const importedSkinName = file.name.replace(/\.[^.]+$/, '');
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.wardrobePendingImportedSkinName = importedSkinName;
          this.wardrobePendingSkinName = importedSkinName;
          this.wardrobePendingSkinUrl = reader.result;
          if (this.currentScreen === 'wardrobe') {
            this.highlightSelectedWardrobeCard();
            this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName());
            void this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl);
            this.updateWardrobeValidateButton();
          }
        }
      };
      reader.readAsDataURL(file);
      this.wardrobeImportInput.value = '';
    });
    this.handleKeyCapture = this.handleKeyCapture.bind(this);
    this.handleMenuNavigationKey = this.handleMenuNavigationKey.bind(this);
    window.addEventListener('keydown', this.handleKeyCapture);
    window.addEventListener('keydown', this.handleMenuNavigationKey);

    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    this.resetWardrobePendingSelection();
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderStatsView();
    this.renderGraphicsView();
    this.renderPerformanceView();
    this.renderPauseView();
    this.renderLanguageView();
    this.refreshLocalizedText();
    this.updateViewerSkins();
    this.showScreen('home');
    this.alignHomeToViewportCenter();
    this.hide();
  }

  setSettings(settings: GameSettings): void {
    const previousSkinDataUrl = this.settings.skinDataUrl;
    const previousSelectedCategory = this.selectedWardrobeCategory;
    const previousLanguage = this.settings.language;
    this.settings = this.createSettingsSnapshot({}, settings);
    const languageChanged = previousLanguage !== this.settings.language;
    this.renderBindings();
    this.syncSkinSelectionFromSettings();
    if (languageChanged) {
      this.refreshLocalizedText();
    }
    const skinChanged = this.settings.skinDataUrl !== previousSkinDataUrl;
    if (skinChanged) {
      this.resetWardrobePendingSelection();
    }
    this.renderGraphicsView();
    this.renderPerformanceView();
    this.renderLanguageView();
    if (this.currentScreen === 'wardrobe') {
      if (this.wardrobeCategoriesByName.size === 0) {
        this.renderWardrobe();
      } else if (this.selectedWardrobeCategory !== previousSelectedCategory) {
        const selectedCategory = this.wardrobeCategoriesByName.get(this.selectedWardrobeCategory) ?? null;
        this.updateWardrobeCategoryButtons();
        this.renderWardrobeFilterBar(selectedCategory, this.wardrobeCategoriesByName.size);
        void this.renderWardrobeGallery(selectedCategory, this.wardrobeCategoriesByName.size);
      } else if (skinChanged) {
        this.highlightSelectedWardrobeCard();
        this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName());
        void this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl);
      }
      this.updateWardrobeValidateButton();
    }
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
    this.renderStatsView();
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
    this.updateMenuRenderActivity();
  }

  isVisible(): boolean {
    return this.root.style.display !== 'none';
  }

  private updateMenuRenderActivity(): void {
    const visible = this.isVisible();
    const surface = this.getSurfaceForScreen(this.currentScreen);
    this.panorama.setActive(visible && surface === 'panorama');
    this.homeSkinViewer.setActive(visible && this.currentScreen === 'home');
    this.wardrobeSkinViewer.setActive(visible && this.currentScreen === 'wardrobe');
  }

  getMode(): MenuMode {
    return this.mode;
  }

  handleEscapeShortcut(): boolean {
    if (!this.isVisible()) {
      return false;
    }

    if (this.skipNextEscapeShortcut) {
      this.skipNextEscapeShortcut = false;
      return true;
    }

    if (this.listeningBinding) {
      this.listeningBinding = null;
      this.renderBindings();
      return true;
    }

    if (this.mode === 'pause' && this.currentScreen === 'pause') {
      this.hide();
      this.handlers.onResume();
      return true;
    }

    const backScreen = this.getBackScreenForEscape(this.currentScreen);
    if (!backScreen) {
      return false;
    }

    this.showScreen(backScreen);
    return true;
  }

  private t(key: MenuMessageKey): string {
    return translate(`menu.${key}`, {}, this.settings.language);
  }

  private tf(key: MenuMessageKey, params: Record<string, string>): string {
    return translate(`menu.${key}`, params, this.settings.language);
  }

  private registerLocalized(updater: () => void): void {
    this.localizedUpdaters.push(updater);
    updater();
  }

  private localizeText(node: HTMLElement, key: MenuMessageKey): void {
    this.registerLocalized(() => {
      node.textContent = this.t(key);
    });
  }

  private localizeInputPlaceholder(input: HTMLInputElement, key: MenuMessageKey): void {
    this.registerLocalized(() => {
      input.placeholder = this.t(key);
    });
  }

  private createSettingsSnapshot(
    overrides: Partial<GameSettings> = {},
    baseSettings: GameSettings = this.settings,
  ): GameSettings {
    return {
      keyBindings: cloneBindings(overrides.keyBindings ?? baseSettings.keyBindings),
      skinDataUrl:
        typeof overrides.skinDataUrl !== 'undefined' ? overrides.skinDataUrl : baseSettings.skinDataUrl,
      startFullscreen:
        typeof overrides.startFullscreen === 'boolean'
          ? overrides.startFullscreen
          : baseSettings.startFullscreen,
      interfaceSize:
        typeof overrides.interfaceSize === 'number'
          ? overrides.interfaceSize
          : baseSettings.interfaceSize,
      language: overrides.language ?? baseSettings.language,
      developerDebugMode:
        typeof overrides.developerDebugMode === 'boolean'
          ? overrides.developerDebugMode
          : baseSettings.developerDebugMode,
      renderDistanceChunks: normalizeRenderDistanceChunks(
        typeof overrides.renderDistanceChunks === 'number'
          ? overrides.renderDistanceChunks
          : baseSettings.renderDistanceChunks,
      ),
    };
  }

  private emitSettingsChange(): void {
    this.handlers.onSettingsChange(this.createSettingsSnapshot());
  }

  private refreshLocalizedText(): void {
    this.localizedUpdaters.forEach((updater) => updater());
    const knownDefaults = new Set<string>(
      UI_LANGUAGES.map((language) => translate('menu.worldNamePlaceholder', {}, language)),
    );
    const currentCreateName = this.createNameInput.value.trim();
    if (!currentCreateName || knownDefaults.has(currentCreateName)) {
      this.createNameInput.value = this.t('worldNamePlaceholder');
    }
    this.renderWorldSelection();
    this.renderEditWorldScreen();
    this.renderBindings();
    this.renderGraphicsView();
    this.renderPerformanceView();
    this.renderStatsView();
    this.renderPauseView();
    this.renderLanguageView();
    if (this.currentScreen === 'wardrobe') {
      this.renderWardrobe();
    }
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
    const subtitle = document.createElement('p');
    subtitle.textContent = pickMenuQuote();
    titleBrand.append(title);
    masthead.append(titleBrand, subtitle);

    const actions = document.createElement('div');
    actions.className = 'title-actions home-text-actions';
    this.homeActionsColumn = actions;
    const mobileWardrobeButton = this.buildMainButton('homeWardrobe', () => this.showScreen('wardrobe'));
    mobileWardrobeButton.classList.add('mobile-wardrobe-button');
    actions.append(
      this.buildMainButton('homeSolo', () => this.showScreen('singleplayer')),
      this.buildMainButton('homeMultiplayerSoon', () => undefined, true),
      this.buildMainButton('homeStats', () => this.showScreen('stats')),
      this.buildMainButton('homeSettings', () => this.showScreen('settings')),
      mobileWardrobeButton,
    );

    left.append(masthead, actions);

    const right = document.createElement('div');
    right.className = 'home-right-column home-avatar-column';
    const viewerStage = document.createElement('div');
    viewerStage.className = 'menu-player-stage bare-player-stage home-avatar-stage';
    this.homeSkinViewer = new SkinViewer(viewerStage, null, { animationMode: 'idle', targetFps: 60 });

    const mobileActions = document.createElement('div');
    mobileActions.className = 'home-mobile-actions';
    mobileActions.append(
      this.buildHomeIconButton('homeSolo', 'solo', () => this.showScreen('singleplayer')),
      this.buildHomeIconButton('homeMultiplayerSoon', 'multiplayer', () => undefined, true),
      this.buildHomeIconButton('homeStats', 'stats', () => this.showScreen('stats')),
      this.buildHomeIconButton('homeSettings', 'settings', () => this.showScreen('settings')),
      this.buildHomeIconButton('homeWardrobe', 'wardrobe', () => this.showScreen('wardrobe')),
    );

    const wardrobeButton = document.createElement('button');
    wardrobeButton.type = 'button';
    wardrobeButton.className = 'wardrobe-launch-button';
    this.registerLocalized(() => {
      wardrobeButton.setAttribute('aria-label', this.t('homeWardrobe'));
    });
    wardrobeButton.addEventListener('click', () => this.showScreen('wardrobe'));
    const wardrobeIcon = this.createHomeActionIcon('wardrobe', 'wardrobe-launch-icon-svg');
    wardrobeButton.append(wardrobeIcon);

    right.append(viewerStage, wardrobeButton, mobileActions);
    layout.append(left, right);
    view.append(layout);
    return view;
  }

  private buildSingleplayerView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic singleplayer-view';

    view.append(this.buildClassicTitle('singleplayerTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame world-select-frame';

    this.worldList.className = 'minecraft-world-list';
    frame.append(this.worldList);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-stack';

    const actionsRow = document.createElement('div');
    actionsRow.className = 'classic-footer-row two-columns';

    this.playWorldButton.type = 'button';
    this.playWorldButton.className = 'menu-button';
    this.localizeText(this.playWorldButton, 'play');
    this.playWorldButton.addEventListener('click', () => {
      if (this.selectedWorldId) {
        this.handlers.onPlayWorld(this.selectedWorldId);
      }
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('home'));

    actionsRow.append(this.playWorldButton, backButton);
    footer.append(actionsRow);

    view.append(frame, footer);
    return view;
  }

  private buildCreateWorldView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic create-world-view';

    view.append(this.buildClassicTitle('createWorldTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame form-screen-frame';

    const content = document.createElement('div');
    content.className = 'classic-form-card';

    const nameGroup = document.createElement('label');
    nameGroup.className = 'classic-input-group';
    const nameLabel = document.createElement('span');
    this.localizeText(nameLabel, 'worldNameLabel');
    this.createNameInput.type = 'text';
    this.localizeInputPlaceholder(this.createNameInput, 'worldNamePlaceholder');
    nameGroup.append(nameLabel, this.createNameInput);

    const seedGroup = document.createElement('label');
    seedGroup.className = 'classic-input-group';
    const seedLabel = document.createElement('span');
    this.localizeText(seedLabel, 'worldSeedLabel');
    this.createSeedInput.type = 'text';
    this.localizeInputPlaceholder(this.createSeedInput, 'worldSeedPlaceholder');
    seedGroup.append(seedLabel, this.createSeedInput);

    content.append(nameGroup, seedGroup);
    frame.append(content);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row two-columns';

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.className = 'menu-button';
    this.localizeText(createButton, 'createWorldAction');
    createButton.addEventListener('click', () => {
      const name = this.createNameInput.value.trim() || this.t('worldNamePlaceholder');
      const seed = this.createSeedInput.value.trim();
      this.handlers.onCreateWorld(name, seed);
      this.createSeedInput.value = '';
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('singleplayer'));

    footer.append(createButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildEditWorldView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic edit-world-view';

    view.append(this.buildClassicTitle('editWorldTitle'));

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
    this.localizeText(nameLabel, 'worldNameLabel');
    this.editNameInput.type = 'text';
    this.localizeInputPlaceholder(this.editNameInput, 'worldNameLabel');
    nameGroup.append(nameLabel, this.editNameInput);

    detail.append(this.editWorldTitle, this.editWorldMeta, nameGroup);
    content.append(this.editWorldPreview, detail);
    frame.append(content);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row three-columns';

    this.saveEditWorldButton.type = 'button';
    this.saveEditWorldButton.className = 'menu-button';
    this.localizeText(this.saveEditWorldButton, 'save');
    this.saveEditWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      this.handlers.onRenameWorld(world.id, this.editNameInput.value.trim());
      this.showScreen('singleplayer');
    });

    this.deleteWorldButton.type = 'button';
    this.deleteWorldButton.className = 'menu-button danger';
    this.localizeText(this.deleteWorldButton, 'delete');
    this.deleteWorldButton.addEventListener('click', () => {
      const world = this.getSelectedWorld();
      if (!world) {
        return;
      }
      if (window.confirm(this.tf('deleteWorldConfirm', { world: world.name }))) {
        this.handlers.onDeleteWorld(world.id);
        this.showScreen('singleplayer');
      }
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('singleplayer'));

    footer.append(this.saveEditWorldButton, this.deleteWorldButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildSettingsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic settings-view';

    view.append(this.buildClassicTitle('settingsTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const buttonStack = document.createElement('div');
    buttonStack.className = 'classic-button-stack settings-buttons-grid';
    const keyBindingsButton = document.createElement('button');
    keyBindingsButton.type = 'button';
    keyBindingsButton.className = 'menu-button settings-compact-button';
    this.localizeText(keyBindingsButton, 'keyBindings');
    keyBindingsButton.addEventListener('click', () => this.showScreen('keybindings'));

    const graphicsButton = document.createElement('button');
    graphicsButton.type = 'button';
    graphicsButton.className = 'menu-button settings-compact-button';
    this.localizeText(graphicsButton, 'graphics');
    graphicsButton.addEventListener('click', () => this.showScreen('graphics'));

    const languageButton = document.createElement('button');
    languageButton.type = 'button';
    languageButton.className = 'menu-button settings-compact-button';
    this.registerLocalized(() => {
      const languageName = getLanguageLabel(this.settings.language, this.settings.language);
      languageButton.textContent = `${this.t('language')}: ${languageName}`;
    });
    languageButton.addEventListener('click', () => this.showScreen('languages'));

    const performanceButton = document.createElement('button');
    performanceButton.type = 'button';
    performanceButton.className = 'menu-button settings-compact-button';
    this.localizeText(performanceButton, 'performance');
    performanceButton.addEventListener('click', () => this.showScreen('performance'));

    buttonStack.append(keyBindingsButton, graphicsButton, languageButton, performanceButton);
    frame.append(buttonStack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen(this.mode === 'pause' ? 'pause' : 'home'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildLanguagesView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic languages-view';

    view.append(this.buildClassicTitle('languagesTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const stack = document.createElement('div');
    stack.className = 'classic-button-stack graphics-options-stack';

    UI_LANGUAGES.forEach((language) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-button settings-compact-button classic-tab-button';
      this.registerLocalized(() => {
        button.textContent = getLanguageLabel(language, this.settings.language);
      });
      button.addEventListener('click', () => {
        if (this.settings.language === language) {
          return;
        }
        this.settings = this.createSettingsSnapshot({ language });
        this.refreshLocalizedText();
        this.emitSettingsChange();
      });
      this.languageButtons.set(language, button);
      stack.append(button);
    });

    frame.append(stack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('settings'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildPerformanceView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic performance-view';

    view.append(this.buildClassicTitle('performanceTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const stack = document.createElement('div');
    stack.className = 'classic-button-stack graphics-options-stack performance-options-stack';

    const sliderGroup = document.createElement('label');
    sliderGroup.className = 'performance-slider-group';

    const sliderHeader = document.createElement('div');
    sliderHeader.className = 'performance-slider-header';
    const sliderLabel = document.createElement('span');
    sliderLabel.className = 'performance-slider-label';
    this.localizeText(sliderLabel, 'renderDistance');
    this.renderDistanceValue.className = 'performance-slider-value';
    sliderHeader.append(sliderLabel, this.renderDistanceValue);
    sliderGroup.append(sliderHeader);

    this.renderDistanceSlider.type = 'range';
    this.renderDistanceSlider.className = 'performance-slider';
    this.renderDistanceSlider.min = String(MIN_RENDER_DISTANCE_CHUNKS);
    this.renderDistanceSlider.max = String(MAX_RENDER_DISTANCE_CHUNKS);
    this.renderDistanceSlider.step = '1';
    this.registerLocalized(() => {
      this.renderDistanceSlider.setAttribute('aria-label', this.t('renderDistance'));
    });
    this.renderDistanceSlider.addEventListener('input', () => {
      const nextValue = normalizeRenderDistanceChunks(Number(this.renderDistanceSlider.value));
      if (nextValue === this.settings.renderDistanceChunks) {
        this.renderPerformanceView();
        return;
      }
      this.settings = this.createSettingsSnapshot({
        renderDistanceChunks: nextValue,
      });
      this.renderPerformanceView();
      this.emitSettingsChange();
    });

    const sliderWell = document.createElement('div');
    sliderWell.className = 'performance-slider-well';
    sliderWell.append(this.renderDistanceSlider);
    sliderGroup.append(sliderWell);

    const sliderLegend = document.createElement('div');
    sliderLegend.className = 'performance-slider-legend';
    const minLabel = document.createElement('span');
    minLabel.textContent = String(MIN_RENDER_DISTANCE_CHUNKS);
    const maxLabel = document.createElement('span');
    maxLabel.textContent = String(MAX_RENDER_DISTANCE_CHUNKS);
    sliderLegend.append(minLabel, maxLabel);
    sliderGroup.append(sliderLegend);

    stack.append(sliderGroup);
    frame.append(stack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('settings'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildGraphicsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic graphics-view';

    view.append(this.buildClassicTitle('graphicsTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame settings-screen-frame';

    const stack = document.createElement('div');
    stack.className = 'classic-button-stack graphics-options-stack';

    this.startupFullscreenToggleButton.type = 'button';
    this.startupFullscreenToggleButton.className = 'menu-button settings-compact-button';
    this.startupFullscreenToggleButton.addEventListener('click', () => {
      this.settings = this.createSettingsSnapshot({
        startFullscreen: !this.settings.startFullscreen,
      });
      this.renderGraphicsView();
      this.emitSettingsChange();
    });

    this.developerDebugModeToggleButton.type = 'button';
    this.developerDebugModeToggleButton.className = 'menu-button settings-compact-button';
    this.developerDebugModeToggleButton.addEventListener('click', () => {
      const enabling = !this.settings.developerDebugMode;
      if (enabling && !window.confirm(this.t('developerDebugWarning'))) {
        return;
      }
      this.settings = this.createSettingsSnapshot({ developerDebugMode: enabling });
      this.renderGraphicsView();
      this.emitSettingsChange();
    });

    stack.append(
      this.startupFullscreenToggleButton,
      this.developerDebugModeToggleButton,
    );

    frame.append(stack);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('settings'));
    footer.append(backButton);

    view.append(frame, footer);
    return view;
  }

  private buildKeybindingsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic keybindings-view';

    view.append(this.buildClassicTitle('keybindingsTitle'));

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame keybindings-screen-frame';
    const list = document.createElement('div');
    list.className = 'binding-list';

    CONTROL_ACTIONS.forEach((action) => {
      const row = document.createElement('div');
      row.className = 'binding-row';
      const label = document.createElement('div');
      label.className = 'binding-label';
      this.registerLocalized(() => {
        label.textContent = getControlLabel(action, this.settings.language);
      });

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
    this.localizeText(resetButton, 'resetDefaults');
    resetButton.addEventListener('click', () => {
      const defaults = createDefaultSettings();
      this.settings = this.createSettingsSnapshot({
        keyBindings: defaults.keyBindings,
      });
      this.renderBindings();
      this.emitSettingsChange();
    });

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen('settings'));

    footer.append(resetButton, backButton);
    view.append(frame, footer);
    return view;
  }

  private buildStatsView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view menu-view-classic stats-view';

    const header = document.createElement('div');
    header.className = 'classic-screen-header';
    header.append(this.statsTitleHost);
    view.append(header);

    const frame = document.createElement('div');
    frame.className = 'classic-screen-frame stats-screen-frame';

    const categories = document.createElement('div');
    categories.className = 'classic-tab-row';

    const generalButton = document.createElement('button');
    generalButton.type = 'button';
    generalButton.className = 'menu-button classic-tab-button';
    this.localizeText(generalButton, 'statsGeneralTab');
    generalButton.addEventListener('click', () => {
      this.selectedStatsCategory = 'general';
      this.renderStatsView();
    });
    this.statsCategoryButtons.set('general', generalButton);

    const itemsButton = document.createElement('button');
    itemsButton.type = 'button';
    itemsButton.className = 'menu-button classic-tab-button';
    this.localizeText(itemsButton, 'statsItemsTab');
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
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => this.showScreen(this.mode === 'pause' ? 'pause' : 'home'));
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

    const actions = document.createElement('div');
    actions.className = 'title-actions';
    actions.append(
      this.buildMainButton('pauseBackToGame', () => {
        this.hide();
        this.handlers.onResume();
      }),
      this.buildMainButton('pauseStats', () => this.showScreen('stats')),
      this.buildMainButton('pauseSettings', () => this.showScreen('settings')),
      this.buildMainButton('pauseQuit', () => this.handlers.onQuitToTitle()),
    );

    panel.append(this.pauseTitle, this.pauseMeta, actions);
    view.append(panel);
    return view;
  }

  private buildWardrobeView(): HTMLElement {
    const view = document.createElement('section');
    view.className = 'menu-view wardrobe-view';

    view.append(this.buildClassicTitle('wardrobeTitle'));

    const layout = document.createElement('div');
    layout.className = 'classic-layout wardrobe-layout';

    const categoryRail = document.createElement('div');
    categoryRail.className = 'wardrobe-category-rail';
    this.wardrobeCategorySelect.className = 'wardrobe-category-select';
    this.wardrobeCategorySelect.addEventListener('change', () => {
      const categoryName = this.wardrobeCategorySelect.value as SkinCategory;
      if (!categoryName) {
        return;
      }
      this.selectWardrobeCategory(categoryName);
    });
    this.wardrobeCategoryList.className = 'wardrobe-category-list';
    this.wardrobeCategoryList.addEventListener('scroll', () => {
      this.wardrobeCategoryScrollTop = this.wardrobeCategoryList.scrollTop;
      this.hydrateVisibleWardrobeCategoryPreviews();
    });
    categoryRail.append(this.wardrobeCategorySelect, this.wardrobeCategoryList);

    const galleryWell = document.createElement('div');
    galleryWell.className = 'menu-well';
    this.wardrobeGalleryHeader.className = 'wardrobe-gallery-header';
    this.wardrobeCategoryTitle.className = 'wardrobe-category-title';
    this.wardrobeHeaderRight.className = 'wardrobe-gallery-header-right';
    this.wardrobeFilterBar.className = 'wardrobe-filter-bar';
    this.wardrobeLoadingIndicator.className = 'wardrobe-loading-indicator';
    this.wardrobeLoadingIndicator.setAttribute('aria-hidden', 'true');
    this.wardrobeHeaderRight.append(this.wardrobeLoadingIndicator, this.wardrobeFilterBar);
    this.wardrobeGalleryHeader.append(this.wardrobeCategoryTitle, this.wardrobeHeaderRight);
    this.wardrobeGallery.className = 'wardrobe-gallery';
    this.wardrobeGallery.addEventListener('scroll', () => {
      if (!this.currentWardrobeGalleryKey) {
        return;
      }
      const scrollTop = this.wardrobeGallery.scrollTop;
      this.wardrobeGalleryScrollByKey.set(this.currentWardrobeGalleryKey, scrollTop);

      if (this.currentScreen !== 'wardrobe' || this.wardrobeGalleryPendingSkins.length === 0) {
        return;
      }
      const remaining =
        this.wardrobeGallery.scrollHeight - (scrollTop + this.wardrobeGallery.clientHeight);
      if (remaining <= 220) {
        void this.loadNextWardrobeGalleryChunk(this.wardrobeRenderRequestId);
      }
      this.hydrateVisibleWardrobeCardPreviews();
    });
    this.wardrobeEmptyLabel.className = 'empty-worlds';
    galleryWell.append(this.wardrobeGalleryHeader, this.wardrobeGallery, this.wardrobeEmptyLabel);

    const previewWell = document.createElement('div');
    previewWell.className = 'wardrobe-preview-column';
    const stage = document.createElement('div');
    stage.className = 'menu-player-stage bare-player-stage wardrobe-stage';
    this.wardrobeSkinViewer = new SkinViewer(stage, null, { animationMode: 'idle', targetFps: 60 });
    this.wardrobeSkinName.className = 'wardrobe-skin-name';
    this.wardrobeValidateButton.type = 'button';
    this.wardrobeValidateButton.className = 'menu-button wardrobe-validate-button';
    this.localizeText(this.wardrobeValidateButton, 'validate');
    this.wardrobeValidateButton.addEventListener('click', () => this.applyWardrobePendingSelection());
    previewWell.append(stage, this.wardrobeSkinName, this.wardrobeValidateButton);
    layout.append(categoryRail, galleryWell, previewWell);

    const footer = document.createElement('div');
    footer.className = 'classic-footer-row one-column';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'menu-button secondary';
    this.localizeText(backButton, 'back');
    backButton.addEventListener('click', () => {
      this.discardWardrobePendingSelection();
      this.showScreen('home');
    });
    footer.append(backButton);

    view.append(layout, footer);
    return view;
  }

  private buildClassicTitle(titleKey: MenuMessageKey, subtitleKey?: MenuMessageKey): HTMLElement {
    const header = document.createElement('div');
    header.className = 'classic-screen-header';

    const titleHost = document.createElement('div');
    this.registerLocalized(() => {
      const titleText = this.t(titleKey);
      const titleBitmap = createBitmapText(titleText, {
        className: 'classic-screen-title classic-title-text',
        uppercase: true,
        ariaLabel: titleText,
        glyphGapEm: 0.04,
      });
      titleHost.replaceChildren(titleBitmap);
    });
    header.append(titleHost);

    if (subtitleKey) {
      const subtitle = document.createElement('p');
      subtitle.className = 'classic-screen-subtitle';
      this.localizeText(subtitle, subtitleKey);
      header.append(subtitle);
    }
    return header;
  }

  private buildMainButton(
    labelKey: MenuMessageKey,
    onClick: () => void,
    disabled = false,
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-button menu-button-large';
    this.localizeText(button, labelKey);
    button.disabled = disabled;
    button.addEventListener('click', onClick);
    return button;
  }

  private buildHomeIconButton(
    labelKey: MenuMessageKey,
    icon: HomeActionIcon,
    onClick: () => void,
    disabled = false,
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'home-icon-button';
    button.disabled = disabled;
    this.registerLocalized(() => {
      const label = this.t(labelKey);
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    button.addEventListener('click', onClick);
    button.append(this.createHomeActionIcon(icon, 'home-icon-svg'));
    return button;
  }

  private createHomeActionIcon(icon: HomeActionIcon, className: string): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add(className);
    for (const pathValue of HOME_ACTION_ICON_PATHS[icon]) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathValue);
      path.setAttribute('fill', 'currentColor');
      svg.append(path);
    }
    return svg;
  }

  private showScreen(screen: MenuScreen): void {
    const previousScreen = this.currentScreen;
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
    this.renderPerformanceView();
    this.renderPauseView();
    this.renderStatsView();
    this.renderLanguageView();
    if (screen === 'wardrobe') {
      this.renderWardrobe();
    } else if (previousScreen === 'wardrobe') {
      this.discardWardrobePendingSelection();
      this.cleanupWardrobeView();
    }
    if (screen === 'home') {
      this.alignHomeToViewportCenter();
    }
    this.updateMenuRenderActivity();
    if (this.isVisible()) {
      this.focusFirstInteractiveElement();
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
      this.createNameInput.value = this.t('worldNamePlaceholder');
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

    const createEntry = document.createElement('button');
    createEntry.type = 'button';
    createEntry.className = 'world-entry world-entry-create';
    createEntry.addEventListener('click', () => this.openCreateWorldScreen());

    const createPreview = document.createElement('div');
    createPreview.className = 'world-entry-preview world-entry-create-preview';
    createPreview.textContent = '+';

    const createDetail = document.createElement('div');
    createDetail.className = 'world-entry-detail';
    const createTitle = document.createElement('strong');
    createTitle.textContent = this.t('createWorld');
    const createLabel = document.createElement('span');
    createLabel.textContent = this.t('createWorldAction');
    createDetail.append(createTitle, createLabel);
    createEntry.append(createPreview, createDetail);
    this.worldList.append(createEntry);

    if (this.worlds.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-worlds';
      empty.textContent = this.t('emptyWorlds');
      this.worldList.append(empty);
    } else {
      this.worlds.forEach((world) => {
        const row = document.createElement('div');
        row.className = 'world-entry-row';

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

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'menu-square-button world-entry-edit';
        const editLabel = this.t('edit');
        editButton.title = editLabel;
        editButton.setAttribute('aria-label', editLabel);
        const editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        editIcon.setAttribute('viewBox', '0 0 24 24');
        editIcon.setAttribute('aria-hidden', 'true');
        const editIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        editIconPath.setAttribute(
          'd',
          'M3 17.25V21h3.75L19.81 7.94 16.06 4.19 3 17.25zm18-11.5a1.003 1.003 0 0 0 0-1.42l-1.34-1.34a1.003 1.003 0 0 0-1.42 0l-1.05 1.05 3.75 3.75L21 5.75z',
        );
        editIconPath.setAttribute('fill', 'currentColor');
        editIcon.append(editIconPath);
        editButton.append(editIcon);
        editButton.addEventListener('click', (event) => {
          event.stopPropagation();
          this.selectedWorldId = world.id;
          this.openEditWorldScreen();
        });

        const preview = document.createElement('div');
        preview.className = 'world-entry-preview';
        preview.style.backgroundImage = `url("${this.getWorldPreviewUrl(world)}")`;

        const detail = document.createElement('div');
        detail.className = 'world-entry-detail';
        const title = document.createElement('strong');
        title.textContent = world.name;
        const created = document.createElement('span');
        created.textContent = this.tf('worldCreatedAt', { date: this.formatDate(world.createdAt) });
        const lastPlayed = document.createElement('span');
        lastPlayed.textContent = this.tf('worldLastPlayedAt', { date: this.formatDate(world.lastPlayedAt) });
        detail.append(title, created, lastPlayed);

        button.append(preview, detail);
        row.append(button, editButton);
        this.worldList.append(row);
      });
    }

    const hasSelection = this.getSelectedWorld() !== null;
    this.playWorldButton.disabled = !hasSelection;
  }

  private renderEditWorldScreen(): void {
    const world = this.getSelectedWorld();
    if (!world) {
      this.editWorldPreview.style.backgroundImage = '';
      this.editWorldTitle.textContent = this.t('noWorldSelected');
      this.editWorldMeta.textContent = '';
      this.editNameInput.value = '';
      this.saveEditWorldButton.disabled = true;
      this.deleteWorldButton.disabled = true;
      return;
    }

    this.editWorldPreview.style.backgroundImage = `url("${this.getWorldPreviewUrl(world)}")`;
    this.editWorldTitle.textContent = world.name;
    this.editWorldMeta.textContent =
      `${this.tf('worldCreatedAt', { date: this.formatDate(world.createdAt) })} | ${this.tf('worldLastPlayedAt', { date: this.formatDate(world.lastPlayedAt) })}`;
    if (document.activeElement !== this.editNameInput || this.editNameInput.dataset.worldId !== world.id) {
      this.editNameInput.value = world.name;
      this.editNameInput.dataset.worldId = world.id;
    }
    this.saveEditWorldButton.disabled = false;
    this.deleteWorldButton.disabled = false;
  }

  private renderStatsView(): void {
    this.renderStatsTitle();
    this.statsCategoryButtons.forEach((button, category) => {
      button.classList.toggle('active', category === this.selectedStatsCategory);
    });

    const showingPauseWorldStats = this.mode === 'pause';
    const snapshot = this.pauseWorld ?? {
      id: 'none',
      name: this.t('pauseDefaultWorldName'),
      seed: this.t('pauseNotAvailable'),
      worldStats: createEmptyWorldStats(),
    };

    const entries: Array<[string, string]> = showingPauseWorldStats
      ? this.selectedStatsCategory === 'general'
        ? [
            [this.t('playTime'), this.formatDuration(snapshot.worldStats.playTimeMs)],
            [this.t('distanceTravelled'), `${Math.round(snapshot.worldStats.distanceTravelled).toLocaleString()} m`],
            [this.t('jumps'), snapshot.worldStats.jumps.toLocaleString()],
            [this.t('pauseWorldName'), snapshot.name],
          ]
        : [
            [this.t('blocksMined'), snapshot.worldStats.blocksMined.toLocaleString()],
            [this.t('blocksPlaced'), snapshot.worldStats.blocksPlaced.toLocaleString()],
            [this.t('craftedItems'), snapshot.worldStats.craftedItems.toLocaleString()],
            [this.t('pauseWorldSeed'), snapshot.seed],
          ]
      : this.selectedStatsCategory === 'general'
        ? [
            [this.t('playTime'), this.formatDuration(this.globalStats.totalPlayTimeMs)],
            [this.t('distanceTravelled'), `${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],
            [this.t('jumps'), this.globalStats.totalJumps.toLocaleString()],
            [this.t('worldsCreated'), this.globalStats.worldsCreated.toLocaleString()],
          ]
        : [
            [this.t('blocksMined'), this.globalStats.totalBlocksMined.toLocaleString()],
            [this.t('blocksPlaced'), this.globalStats.totalBlocksPlaced.toLocaleString()],
            [this.t('craftedItems'), this.globalStats.totalCraftedItems.toLocaleString()],
            [this.t('worldsSaved'), this.worlds.length.toLocaleString()],
          ];

    this.statsList.replaceChildren(...this.buildStatsRows(entries));
  }

  private renderPauseView(): void {
    const snapshot = this.pauseWorld ?? {
      id: 'none',
      name: this.t('pauseDefaultWorldName'),
      seed: this.t('pauseNotAvailable'),
      worldStats: createEmptyWorldStats(),
    };

    this.pauseTitle.textContent = snapshot.name;
    this.pauseMeta.textContent = this.tf('pauseSeed', { seed: snapshot.seed });
  }

  private renderGraphicsView(): void {
    this.startupFullscreenToggleButton.textContent = `${this.t('fullscreen')}: ${
      this.settings.startFullscreen ? this.t('stateOn') : this.t('stateOff')
    }`;
    this.developerDebugModeToggleButton.textContent = `${this.t('developerDebugMode')}: ${
      this.settings.developerDebugMode ? this.t('stateOn') : this.t('stateOff')
    }`;
  }

  private renderPerformanceView(): void {
    const progressRatio =
      (this.settings.renderDistanceChunks - MIN_RENDER_DISTANCE_CHUNKS) /
      Math.max(1, MAX_RENDER_DISTANCE_CHUNKS - MIN_RENDER_DISTANCE_CHUNKS);
    this.renderDistanceSlider.value = String(this.settings.renderDistanceChunks);
    this.renderDistanceSlider.style.setProperty('--slider-progress', `${Math.round(progressRatio * 100)}%`);
    this.renderDistanceSlider.setAttribute('aria-valuenow', String(this.settings.renderDistanceChunks));
    this.renderDistanceSlider.setAttribute(
      'aria-valuetext',
      `${this.settings.renderDistanceChunks} chunks`,
    );
    this.renderDistanceValue.textContent = `${this.settings.renderDistanceChunks} chunks`;
  }

  private renderLanguageView(): void {
    this.languageButtons.forEach((button, language) => {
      button.classList.toggle('active', language === this.settings.language);
    });
  }

  private renderWardrobe(): void {
    this.resetWardrobePendingSelection();
    const categories = getSkinCategories();
    this.syncWardrobeCategories(categories);

    if (categories.length > 0 && !this.wardrobeCategoriesByName.has(this.selectedWardrobeCategory)) {
      this.selectedWardrobeCategory = categories[0].name;
    }
    const selectedCategory = this.wardrobeCategoriesByName.get(this.selectedWardrobeCategory) ?? null;

    this.updateWardrobeCategoryButtons();
    this.renderWardrobeFilterBar(selectedCategory, categories.length);

    this.wardrobeEmptyLabel.style.display = 'none';
    this.wardrobeEmptyLabel.textContent = '';
    void this.renderWardrobeGallery(selectedCategory, categories.length);
    this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName());
    void this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl);
    this.updateWardrobeValidateButton();
  }

  private syncWardrobeCategories(categories: CatalogCategory[]): void {
    this.wardrobeCategoriesByName.clear();
    categories.forEach((category) => {
      this.wardrobeCategoriesByName.set(category.name, category);
    });

    const renderKey = categories
      .map((category) => `${category.name}:${category.skins.length}:${category.supportsGenderFilter ? 1 : 0}`)
      .join('|');
    if (renderKey === this.wardrobeCategoriesRenderKey && this.wardrobeCategoryButtons.size > 0) {
      return;
    }

    this.wardrobeCategoriesRenderKey = renderKey;
    this.renderWardrobeCategoryRail(categories);
  }

  private renderWardrobeCategoryRail(categories: CatalogCategory[]): void {
    const previousScrollTop = this.wardrobeCategoryScrollTop;

    this.disposeWardrobeCategoryPreviews();
    this.wardrobeCategoryButtons.clear();
    this.wardrobeCategoryList.replaceChildren();
    this.renderWardrobeCategorySelect(categories);

    categories.forEach((category) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'wardrobe-category-tile';
      button.classList.toggle('active', category.name === this.selectedWardrobeCategory);
      button.addEventListener('click', () => this.selectWardrobeCategory(category.name));

      const stage = document.createElement('div');
      stage.className = 'wardrobe-category-stage';
      const previewSkin = category.skins[0] ?? null;
      if (previewSkin) {
        stage.classList.add('loading-3d');
        stage.append(this.createWardrobe3dLoadingPlaceholder());
        void loadCatalogSkinUrl(previewSkin).then((url) => {
          if (!url) {
            return;
          }
          if (this.currentScreen !== 'wardrobe' || !stage.isConnected) {
            return;
          }
          stage.dataset.skinUrl = url;
          const observer = this.ensureWardrobeCategoryObserver();
          observer.observe(stage);
          this.hydrateVisibleWardrobeCategoryPreviews();
        });
      } else {
        stage.classList.add('empty');
        const stageLabel = document.createElement('span');
        stageLabel.className = 'wardrobe-category-stage-label';
        stageLabel.textContent = category.name.slice(0, 1).toUpperCase();
        stage.append(stageLabel);
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
    importLabel.textContent = this.t('import');
    importTile.append(importIcon, importLabel, this.wardrobeImportInput);
    this.wardrobeCategoryList.append(importTile);

    requestAnimationFrame(() => {
      this.wardrobeCategoryList.scrollTop = previousScrollTop;
      this.hydrateVisibleWardrobeCategoryPreviews();
    });
  }

  private renderWardrobeCategorySelect(categories: CatalogCategory[]): void {
    this.wardrobeCategorySelect.replaceChildren();

    if (categories.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = this.t('noCategory');
      this.wardrobeCategorySelect.append(option);
      this.wardrobeCategorySelect.disabled = true;
      this.wardrobeCategorySelect.value = '';
      return;
    }

    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name.toUpperCase();
      this.wardrobeCategorySelect.append(option);
    });

    this.wardrobeCategorySelect.disabled = false;
    this.updateWardrobeCategorySelect();
  }

  private updateWardrobeCategorySelect(): void {
    if (this.wardrobeCategorySelect.disabled) {
      return;
    }
    this.wardrobeCategorySelect.value = this.selectedWardrobeCategory;
  }

  private selectWardrobeCategory(categoryName: SkinCategory): void {
    if (categoryName === this.selectedWardrobeCategory) {
      return;
    }

    this.selectedWardrobeCategory = categoryName;
    this.wardrobeGenderFilter = 'all';
    this.updateWardrobeCategoryButtons();
    const selectedCategory = this.wardrobeCategoriesByName.get(categoryName) ?? null;
    this.renderWardrobeFilterBar(selectedCategory, this.wardrobeCategoriesByName.size);
    void this.renderWardrobeGallery(selectedCategory, this.wardrobeCategoriesByName.size);
  }

  private renderWardrobeFilterBar(category: CatalogCategory | null, categoryCount: number): void {
    this.wardrobeCategoryTitle.textContent =
      category ? category.name : categoryCount === 0 ? this.t('noCategory') : '';
    this.wardrobeFilterButtons.clear();
    this.wardrobeFilterBar.replaceChildren();

    if (!category || !category.supportsGenderFilter) {
      this.wardrobeGenderFilter = 'all';
      this.wardrobeFilterBar.style.display = 'none';
      return;
    }

    this.wardrobeFilterBar.style.display = 'flex';
    const filters: Array<{ value: WardrobeGenderFilter; label: string }> = [
      { value: 'all', label: this.t('all') },
      { value: 'male', label: this.t('male') },
      { value: 'female', label: this.t('female') },
    ];

    filters.forEach((entry) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-button wardrobe-filter-button';
      button.textContent = entry.label;
      button.addEventListener('click', () => {
        if (this.wardrobeGenderFilter === entry.value) {
          return;
        }
        this.wardrobeGenderFilter = entry.value;
        this.updateWardrobeFilterButtons();
        void this.renderWardrobeGallery(category, categoryCount);
      });
      this.wardrobeFilterButtons.set(entry.value, button);
      this.wardrobeFilterBar.append(button);
    });

    this.updateWardrobeFilterButtons();
  }

  private updateWardrobeCategoryButtons(): void {
    this.wardrobeCategoryButtons.forEach((button, category) => {
      button.classList.toggle('active', category === this.selectedWardrobeCategory);
    });
    this.updateWardrobeCategorySelect();
  }

  private updateWardrobeFilterButtons(): void {
    this.wardrobeFilterButtons.forEach((button, filter) => {
      button.classList.toggle('active', filter === this.wardrobeGenderFilter);
    });
  }

  private createWardrobe3dLoadingPlaceholder(): HTMLElement {
    const loading = document.createElement('span');
    loading.className = 'wardrobe-3d-loading';
    loading.setAttribute('aria-hidden', 'true');
    return loading;
  }

  private filterWardrobeSkins(skins: CatalogSkin[]): CatalogSkin[] {
    if (this.wardrobeGenderFilter === 'all') {
      return skins;
    }
    return skins.filter((skin) => skin.gender === this.wardrobeGenderFilter);
  }

  private getWardrobeGalleryKey(selectedCategory: CatalogCategory | null): string {
    if (!selectedCategory) {
      return '__none__';
    }
    return `${selectedCategory.name}:${this.wardrobeGenderFilter}`;
  }

  private async renderWardrobeGallery(
    selectedCategory: CatalogCategory | null,
    categoryCount: number,
  ): Promise<void> {
    if (this.currentWardrobeGalleryKey) {
      this.wardrobeGalleryScrollByKey.set(this.currentWardrobeGalleryKey, this.wardrobeGallery.scrollTop);
    }

    const requestId = ++this.wardrobeRenderRequestId;
    const nextGalleryKey = this.getWardrobeGalleryKey(selectedCategory);
    const restoreScrollTop = this.wardrobeGalleryScrollByKey.get(nextGalleryKey) ?? 0;

    this.disposeWardrobeCardPreviews();
    this.resetWardrobeGalleryPagination();
    this.wardrobeGallery.replaceChildren();
    this.wardrobeGallery.scrollTop = 0;
    this.currentWardrobeGalleryKey = nextGalleryKey;
    this.setWardrobeLoadingIndicator(false);

    if (!selectedCategory) {
      this.wardrobeEmptyLabel.style.display = '';
      this.wardrobeEmptyLabel.textContent =
        categoryCount === 0 ? this.t('noCategoryDot') : this.t('noSkinDot');
      return;
    }

    const skins = this.filterWardrobeSkins(getCatalogSkins(selectedCategory.name));
    if (skins.length === 0) {
      this.wardrobeEmptyLabel.style.display = '';
      this.wardrobeEmptyLabel.textContent = this.t('noSkinDot');
      return;
    }

    this.wardrobeEmptyLabel.style.display = 'none';
    this.wardrobeEmptyLabel.textContent = '';
    this.wardrobeGalleryPendingSkins = skins;
    this.wardrobeGalleryNextIndex = 0;
    this.wardrobeGalleryLoading = false;

    this.wardrobeGallerySentinel = document.createElement('div');
    this.wardrobeGallerySentinel.className = 'wardrobe-gallery-sentinel';
    this.wardrobeGallery.append(this.wardrobeGallerySentinel);

    this.wardrobeGalleryLoadObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        void this.loadNextWardrobeGalleryChunk(requestId);
      },
      {
        root: this.wardrobeGallery,
        rootMargin: '220px 0px',
        threshold: 0,
      },
    );
    this.wardrobeGalleryLoadObserver.observe(this.wardrobeGallerySentinel);

    await this.loadNextWardrobeGalleryChunk(requestId);
    while (
      requestId === this.wardrobeRenderRequestId &&
      this.currentScreen === 'wardrobe' &&
      this.wardrobeGalleryNextIndex < this.wardrobeGalleryPendingSkins.length &&
      this.wardrobeGallery.scrollHeight < restoreScrollTop + this.wardrobeGallery.clientHeight + 24
    ) {
      await this.loadNextWardrobeGalleryChunk(requestId);
    }
    if (requestId === this.wardrobeRenderRequestId && this.currentScreen === 'wardrobe') {
      this.wardrobeGallery.scrollTop = restoreScrollTop;
    }
    this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName());
  }

  private resetWardrobeGalleryPagination(): void {
    if (this.wardrobeGalleryLoadObserver) {
      this.wardrobeGalleryLoadObserver.disconnect();
      this.wardrobeGalleryLoadObserver = null;
    }
    if (this.wardrobeGallerySentinel) {
      this.wardrobeGallerySentinel.remove();
      this.wardrobeGallerySentinel = null;
    }
    this.wardrobeGalleryPendingSkins = [];
    this.wardrobeGalleryNextIndex = 0;
    this.wardrobeGalleryLoading = false;
    this.setWardrobeLoadingIndicator(false);
  }

  private setWardrobeLoadingIndicator(loading: boolean): void {
    this.wardrobeLoadingIndicator.classList.toggle('visible', loading);
    this.wardrobeLoadingIndicator.setAttribute('aria-hidden', loading ? 'false' : 'true');
  }

  private async loadNextWardrobeGalleryChunk(requestId: number): Promise<void> {
    if (this.wardrobeGalleryLoading) {
      return;
    }

    const total = this.wardrobeGalleryPendingSkins.length;
    if (this.wardrobeGalleryNextIndex >= total) {
      this.setWardrobeLoadingIndicator(false);
      return;
    }

    const start = this.wardrobeGalleryNextIndex;
    const end = Math.min(start + this.wardrobeGalleryChunkSize, total);
    const chunk = this.wardrobeGalleryPendingSkins.slice(start, end);
    this.wardrobeGalleryLoading = true;
    this.setWardrobeLoadingIndicator(true);

    try {
      const loadedChunk = await Promise.all(
        chunk.map(async (skin) => ({
          skin,
          url: await loadCatalogSkinUrl(skin),
        })),
      );

      if (requestId !== this.wardrobeRenderRequestId || this.currentScreen !== 'wardrobe') {
        return;
      }

      const observer = this.ensureWardrobeCardObserver();
      const fragment = document.createDocumentFragment();

      loadedChunk.forEach(({ skin, url }) => {
        if (!url) {
          return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'wardrobe-skin-card';
        button.dataset.skinUrl = url;
        button.title = skin.name;
        button.classList.toggle('selected', url === this.wardrobePendingSkinUrl);
        button.addEventListener('click', () => this.selectCatalogSkin(skin, url));

        const preview = document.createElement('div');
        preview.className = 'wardrobe-skin-preview-3d loading-3d';
        preview.dataset.skinUrl = url;
        preview.dataset.skinName = skin.name;
        preview.append(this.createWardrobe3dLoadingPlaceholder());
        observer.observe(preview);

        const label = document.createElement('span');
        label.className = 'wardrobe-skin-card-name';
        label.textContent = this.formatWardrobeSkinName(skin.name);
        button.append(preview, label);
        fragment.append(button);

        if (url === this.wardrobePendingSkinUrl) {
          this.wardrobePendingSkinName = skin.name;
        }
      });

      if (this.wardrobeGallerySentinel) {
        this.wardrobeGallery.insertBefore(fragment, this.wardrobeGallerySentinel);
      } else {
        this.wardrobeGallery.append(fragment);
      }

      this.wardrobeGalleryNextIndex = end;
      this.highlightSelectedWardrobeCard();
      this.hydrateVisibleWardrobeCardPreviews();

      if (end >= total) {
        if (this.wardrobeGalleryLoadObserver) {
          this.wardrobeGalleryLoadObserver.disconnect();
          this.wardrobeGalleryLoadObserver = null;
        }
        if (this.wardrobeGallerySentinel) {
          this.wardrobeGallerySentinel.remove();
          this.wardrobeGallerySentinel = null;
        }
        this.setWardrobeLoadingIndicator(false);
        return;
      }

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (this.wardrobeGallery.scrollHeight <= this.wardrobeGallery.clientHeight + 8) {
        requestAnimationFrame(() => {
          void this.loadNextWardrobeGalleryChunk(requestId);
        });
      } else {
        this.setWardrobeLoadingIndicator(false);
      }
    } finally {
      this.wardrobeGalleryLoading = false;
      if (requestId !== this.wardrobeRenderRequestId || this.currentScreen !== 'wardrobe') {
        this.setWardrobeLoadingIndicator(false);
      }
    }
  }

  private ensureWardrobeCardObserver(): IntersectionObserver {
    if (this.wardrobeCardObserver) {
      return this.wardrobeCardObserver;
    }

    this.wardrobeCardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const host = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            this.disposeWardrobeCardViewer(host);
            return;
          }
          this.mountWardrobeCardViewer(host);
        });
      },
      {
        root: this.wardrobeGallery,
        rootMargin: '24px 0px',
        threshold: 0.1,
      },
    );

    return this.wardrobeCardObserver;
  }

  private mountWardrobeCardViewer(host: HTMLElement): void {
    if (this.wardrobeCardViewers.has(host)) {
      return;
    }
    const skinUrl = host.dataset.skinUrl;
    if (!skinUrl) {
      return;
    }
    try {
      const viewer = new SkinViewer(host, skinUrl, { animated: false });
      this.wardrobeCardViewers.set(host, viewer);
      host.classList.add('has-3d');
      host.classList.remove('loading-3d');
    } catch {
      host.classList.remove('has-3d');
      host.classList.add('loading-3d');
    }
  }

  private isWardrobePreviewVisible(host: HTMLElement): boolean {
    const hostRect = host.getBoundingClientRect();
    const rootRect = this.wardrobeGallery.getBoundingClientRect();
    return (
      hostRect.bottom > rootRect.top - 40 &&
      hostRect.top < rootRect.bottom + 40 &&
      hostRect.right > rootRect.left &&
      hostRect.left < rootRect.right
    );
  }

  private disposeWardrobeCardViewer(host: HTMLElement, hydrateAfter = true): void {
    const viewer = this.wardrobeCardViewers.get(host);
    if (!viewer) {
      return;
    }
    viewer.dispose();
    host.classList.remove('has-3d');
    host.classList.add('loading-3d');
    this.wardrobeCardViewers.delete(host);
    if (hydrateAfter) {
      this.hydrateVisibleWardrobeCardPreviews();
    }
  }

  private disposeWardrobeCardPreviews(): void {
    if (this.wardrobeCardObserver) {
      this.wardrobeCardObserver.disconnect();
      this.wardrobeCardObserver = null;
    }
    this.wardrobeCardViewers.forEach((viewer, host) => {
      viewer.dispose();
      host.classList.remove('has-3d');
      host.classList.add('loading-3d');
    });
    this.wardrobeCardViewers.clear();
  }

  private hydrateVisibleWardrobeCardPreviews(): void {
    if (this.currentScreen !== 'wardrobe') {
      return;
    }

    const hosts = this.wardrobeGallery.querySelectorAll<HTMLElement>('.wardrobe-skin-preview-3d');
    for (const host of hosts) {
      if (this.wardrobeCardViewers.has(host) || !this.isWardrobePreviewVisible(host)) {
        continue;
      }
      this.mountWardrobeCardViewer(host);
    }
  }

  private ensureWardrobeCategoryObserver(): IntersectionObserver {
    if (this.wardrobeCategoryObserver) {
      return this.wardrobeCategoryObserver;
    }

    this.wardrobeCategoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const host = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            this.disposeWardrobeCategoryViewer(host);
            return;
          }
          this.mountWardrobeCategoryViewer(host);
        });
      },
      {
        root: this.wardrobeCategoryList,
        rootMargin: '32px 0px',
        threshold: 0.1,
      },
    );

    return this.wardrobeCategoryObserver;
  }

  private mountWardrobeCategoryViewer(host: HTMLElement): void {
    if (this.wardrobeCategoryViewers.has(host)) {
      return;
    }
    const skinUrl = host.dataset.skinUrl;
    if (!skinUrl) {
      return;
    }
    try {
      const viewer = new SkinViewer(host, skinUrl, { animated: false });
      this.wardrobeCategoryViewers.set(host, viewer);
      host.classList.add('has-3d');
      host.classList.remove('loading-3d');
    } catch {
      host.classList.remove('has-3d');
      host.classList.add('loading-3d');
    }
  }

  private isWardrobeCategoryPreviewVisible(host: HTMLElement): boolean {
    const hostRect = host.getBoundingClientRect();
    const rootRect = this.wardrobeCategoryList.getBoundingClientRect();
    return (
      hostRect.bottom > rootRect.top - 40 &&
      hostRect.top < rootRect.bottom + 40 &&
      hostRect.right > rootRect.left &&
      hostRect.left < rootRect.right
    );
  }

  private disposeWardrobeCategoryViewer(host: HTMLElement): void {
    const viewer = this.wardrobeCategoryViewers.get(host);
    if (!viewer) {
      return;
    }
    viewer.dispose();
    host.classList.remove('has-3d');
    host.classList.add('loading-3d');
    this.wardrobeCategoryViewers.delete(host);
  }

  private disposeWardrobeCategoryPreviews(): void {
    if (this.wardrobeCategoryObserver) {
      this.wardrobeCategoryObserver.disconnect();
      this.wardrobeCategoryObserver = null;
    }
    this.wardrobeCategoryViewers.forEach((viewer, host) => {
      viewer.dispose();
      host.classList.remove('has-3d');
      host.classList.add('loading-3d');
    });
    this.wardrobeCategoryViewers.clear();
  }

  private hydrateVisibleWardrobeCategoryPreviews(): void {
    if (this.currentScreen !== 'wardrobe') {
      return;
    }

    const hosts = this.wardrobeCategoryList.querySelectorAll<HTMLElement>('.wardrobe-category-stage[data-skin-url]');
    for (const host of hosts) {
      if (this.wardrobeCategoryViewers.has(host) || !this.isWardrobeCategoryPreviewVisible(host)) {
        continue;
      }
      this.mountWardrobeCategoryViewer(host);
    }
  }

  private highlightSelectedWardrobeCard(): void {
    const selectedUrl = this.wardrobePendingSkinUrl;
    this.wardrobeGallery.querySelectorAll<HTMLButtonElement>('.wardrobe-skin-card').forEach((button) => {
      button.classList.toggle(
        'selected',
        selectedUrl !== null && button.dataset.skinUrl === selectedUrl,
      );
    });
  }

  private resolveCommittedWardrobeSkinName(): string {
    const selectedUrl = this.settings.skinDataUrl;
    if (!selectedUrl) {
      return this.t('defaultSkin');
    }
    if (this.selectedSkinName) {
      return this.selectedSkinName;
    }
    const catalogName = findCatalogSkinNameByUrl(selectedUrl);
    if (catalogName) {
      this.selectedSkinName = this.formatWardrobeSkinName(catalogName);
      return this.selectedSkinName;
    }
    if (this.importedSkinName) {
      this.selectedSkinName = this.importedSkinName;
      return this.importedSkinName;
    }
    return this.t('importedSkin');
  }

  private resolvePendingWardrobeSkinName(): string {
    const selectedUrl = this.wardrobePendingSkinUrl;
    if (!selectedUrl) {
      this.wardrobePendingSkinName = this.t('defaultSkin');
      return this.t('defaultSkin');
    }
    if (this.wardrobePendingSkinName) {
      return this.wardrobePendingSkinName;
    }
    const catalogName = findCatalogSkinNameByUrl(selectedUrl);
    if (catalogName) {
      this.wardrobePendingSkinName = this.formatWardrobeSkinName(catalogName);
      return this.wardrobePendingSkinName;
    }
    if (this.wardrobePendingImportedSkinName) {
      this.wardrobePendingSkinName = this.wardrobePendingImportedSkinName;
      return this.wardrobePendingImportedSkinName;
    }
    this.wardrobePendingSkinName = this.t('importedSkin');
    return this.t('importedSkin');
  }

  private formatWardrobeSkinName(name: string): string {
    if (!name) {
      return name;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private selectCatalogSkin(skin: CatalogSkin, skinUrl: string): void {
    this.selectedWardrobeCategory = skin.category;
    this.wardrobePendingSkinUrl = skinUrl;
    this.wardrobePendingImportedSkinName = null;
    this.wardrobePendingSkinName = this.formatWardrobeSkinName(skin.name);
    this.highlightSelectedWardrobeCard();
    this.renderWardrobeSkinName(this.wardrobePendingSkinName);
    void this.wardrobeSkinViewer.setSkin(skinUrl);
    this.updateWardrobeValidateButton();
  }

  private syncSkinSelectionFromSettings(): void {
    const selectedUrl = this.settings.skinDataUrl;
    this.selectedSkinUrl = selectedUrl;

    if (!selectedUrl) {
      this.selectedSkinName = this.t('defaultSkin');
      return;
    }

    const catalogSkin = findCatalogSkinByUrl(selectedUrl);
    if (catalogSkin) {
      this.selectedWardrobeCategory = catalogSkin.category;
      this.importedSkinName = null;
      this.selectedSkinName = this.formatWardrobeSkinName(catalogSkin.name);
      return;
    }

    if (this.importedSkinName) {
      this.selectedSkinName = this.importedSkinName;
    } else {
      this.selectedSkinName = this.t('importedSkin');
    }
  }

  private resetWardrobePendingSelection(): void {
    this.wardrobePendingSkinUrl = this.selectedSkinUrl;
    this.wardrobePendingImportedSkinName = this.importedSkinName;
    this.wardrobePendingSkinName = this.resolveCommittedWardrobeSkinName();
    this.updateWardrobeValidateButton();
  }

  private discardWardrobePendingSelection(): void {
    this.resetWardrobePendingSelection();
  }

  private hasWardrobePendingChanges(): boolean {
    return this.wardrobePendingSkinUrl !== this.settings.skinDataUrl;
  }

  private updateWardrobeValidateButton(): void {
    this.wardrobeValidateButton.disabled = !this.hasWardrobePendingChanges();
  }

  private applyWardrobePendingSelection(): void {
    if (!this.hasWardrobePendingChanges()) {
      return;
    }

    this.selectedSkinUrl = this.wardrobePendingSkinUrl;
    this.importedSkinName = this.wardrobePendingImportedSkinName;
    this.selectedSkinName = this.wardrobePendingSkinName;
    this.commitSkinSelection(this.wardrobePendingSkinUrl);
    this.updateWardrobeValidateButton();
  }

  private updateViewerSkins(): void {
    void this.homeSkinViewer.setSkin(this.settings.skinDataUrl);
    const wardrobeSkinUrl =
      this.currentScreen === 'wardrobe' ? this.wardrobePendingSkinUrl : this.settings.skinDataUrl;
    void this.wardrobeSkinViewer.setSkin(wardrobeSkinUrl);
  }

  private alignHomeToViewportCenter(): void {
    if (this.currentScreen !== 'home' || !this.homeActionsColumn || !this.homeLeftColumn) {
      return;
    }

    this.panel.style.setProperty('--home-center-nudge', '0px');
    if (window.innerWidth <= 900) {
      return;
    }

    const refine = (pass: number): void => {
      if (!this.homeActionsColumn || !this.homeLeftColumn || this.currentScreen !== 'home') {
        return;
      }

      const actionsStyle = window.getComputedStyle(this.homeActionsColumn);
      const columnStyle = window.getComputedStyle(this.homeLeftColumn);
      if (actionsStyle.display === 'none' || columnStyle.position !== 'fixed') {
        return;
      }

      const rect = this.homeActionsColumn.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
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

  private cleanupWardrobeView(): void {
    this.wardrobeRenderRequestId += 1;
    this.disposeWardrobeCategoryPreviews();
    this.disposeWardrobeCardPreviews();
    this.resetWardrobeGalleryPagination();
    this.wardrobeCategoryButtons.clear();
    this.wardrobeCategoriesByName.clear();
    this.wardrobeCategoriesRenderKey = '';
    this.wardrobeGalleryScrollByKey.clear();
    this.currentWardrobeGalleryKey = null;
    this.wardrobeFilterButtons.clear();
    this.wardrobeCategoryList.replaceChildren();
    this.wardrobeCategoryScrollTop = 0;
    this.wardrobeCategoryList.scrollTop = 0;
    this.wardrobeCategorySelect.replaceChildren();
    this.wardrobeCategorySelect.disabled = true;
    this.wardrobeCategorySelect.value = '';
    this.wardrobeFilterBar.replaceChildren();
    this.wardrobeFilterBar.style.display = 'none';
    this.wardrobeCategoryTitle.textContent = '';
    this.setWardrobeLoadingIndicator(false);
    this.wardrobeGallery.replaceChildren();
    this.wardrobeEmptyLabel.style.display = 'none';
    this.wardrobeEmptyLabel.textContent = '';
    clearCatalogSkinLookupCache();
  }

  private commitSkinSelection(skinDataUrl: string | null): void {
    this.selectedSkinUrl = skinDataUrl;
    if (!skinDataUrl) {
      this.importedSkinName = null;
      this.selectedSkinName = this.t('defaultSkin');
    }
    this.settings = this.createSettingsSnapshot({ skinDataUrl });
    this.emitSettingsChange();
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
    const clearBinding = event.code === 'Escape' || event.code === 'Backspace' || event.code === 'Delete';
    if (event.code === 'Escape') {
      this.skipNextEscapeShortcut = true;
    }
    if (clearBinding) {
      this.settings.keyBindings[action][slot] = null;
    } else {
      this.settings.keyBindings[action][slot] = event.code;
    }
    this.listeningBinding = null;
    this.renderBindings();
    this.emitSettingsChange();
  }

  private handleMenuNavigationKey(event: KeyboardEvent): void {
    if (!this.isVisible() || this.listeningBinding) {
      return;
    }
    if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const code = event.code;
    const isArrow =
      code === 'ArrowUp' ||
      code === 'ArrowDown' ||
      code === 'ArrowLeft' ||
      code === 'ArrowRight';
    const isEnter = code === 'Enter' || code === 'NumpadEnter';
    if (!isArrow && !isEnter) {
      return;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    if (isArrow && this.isTextInput(activeElement)) {
      return;
    }

    const focusables = this.getCurrentScreenFocusables();
    if (focusables.length === 0) {
      return;
    }

    if (isEnter) {
      if (!activeElement || !focusables.includes(activeElement)) {
        focusables[0].focus();
        event.preventDefault();
        return;
      }

      if (
        activeElement instanceof HTMLButtonElement ||
        (activeElement instanceof HTMLInputElement &&
          (activeElement.type === 'button' ||
            activeElement.type === 'submit' ||
            activeElement.type === 'checkbox' ||
            activeElement.type === 'radio'))
      ) {
        activeElement.click();
        event.preventDefault();
      }
      return;
    }

    const moveBackward = code === 'ArrowUp' || code === 'ArrowLeft';
    const currentIndex = activeElement ? focusables.indexOf(activeElement) : -1;
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + (moveBackward ? -1 : 1) + focusables.length) % focusables.length;
    focusables[nextIndex].focus();
    event.preventDefault();
  }

  private focusFirstInteractiveElement(): void {
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement && this.views.get(this.currentScreen)?.contains(activeElement)) {
      return;
    }

    const focusables = this.getCurrentScreenFocusables();
    focusables[0]?.focus();
  }

  private getCurrentScreenFocusables(): HTMLElement[] {
    const currentView = this.views.get(this.currentScreen);
    if (!currentView) {
      return [];
    }

    const selector =
      'button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(currentView.querySelectorAll<HTMLElement>(selector)).filter((element) => {
      if (element.tabIndex < 0 || element.getAttribute('aria-hidden') === 'true') {
        return false;
      }
      return element.offsetParent !== null;
    });
  }

  private isTextInput(element: HTMLElement | null): boolean {
    if (!element) {
      return false;
    }

    if (element instanceof HTMLTextAreaElement) {
      return true;
    }

    if (element instanceof HTMLInputElement) {
      return (
        element.type === 'text' ||
        element.type === 'search' ||
        element.type === 'password' ||
        element.type === 'email' ||
        element.type === 'url' ||
        element.type === 'number'
      );
    }

    return element.isContentEditable;
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
        button.textContent = isListening
          ? this.t('pressKey')
          : formatKeyCode(binding, this.settings.language);
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

  private renderStatsTitle(): void {
    const titleKey: MenuMessageKey = this.mode === 'pause' ? 'statsWorldTitle' : 'statsTitle';
    const titleText = this.t(titleKey);
    const titleBitmap = createBitmapText(titleText, {
      className: 'classic-screen-title classic-title-text',
      uppercase: true,
      ariaLabel: titleText,
      glyphGapEm: 0.04,
    });
    this.statsTitleHost.replaceChildren(titleBitmap);
  }

  private getBackScreenForEscape(screen: MenuScreen): MenuScreen | null {
    switch (screen) {
      case 'singleplayer':
      case 'wardrobe':
        return 'home';
      case 'create-world':
      case 'edit-world':
        return 'singleplayer';
      case 'keybindings':
      case 'graphics':
      case 'languages':
      case 'performance':
        return 'settings';
      case 'settings':
      case 'stats':
        return this.mode === 'pause' ? 'pause' : 'home';
      case 'pause':
      case 'home':
        return null;
      default:
        return null;
    }
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
    const locale = this.settings.language === 'fr' ? 'fr-FR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
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

