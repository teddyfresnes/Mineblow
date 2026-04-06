import { PLAYER_CONFIG, SAVE_CONFIG, WORLD_CONFIG } from './Config';
import {
  cloneBindings,
  createDefaultSettings,
  getInterfaceZoomPercent,
  normalizeInterfaceSize,
  type GameSettings,
} from './Controls';
import { GameLoop } from './GameLoop';
import { INVENTORY_LAYOUT, Inventory, MAX_STACK } from '../inventory/Inventory';
import {
  canCraftRecipe,
  craftRecipe,
  getRecipesForMode,
  type CraftingMode,
} from '../inventory/RecipeBook';
import { InputController } from '../player/InputController';
import { PlayerController, type PlayerFrameUpdate } from '../player/PlayerController';
import { SpawnResolver } from '../player/SpawnResolver';
import { ChunkMesher, waterLevelToSurfaceHeight } from '../render/ChunkMesher';
import { Renderer } from '../render/Renderer';
import { SaveRepository, type LoadedWorld } from '../save/SaveRepository';
import type { BlockId } from '../types/blocks';
import type { InventorySlot, PlayerState } from '../types/player';
import type {
  WorldEnvironmentState,
} from '../types/weather';
import {
  createEmptyGlobalStats,
  createEmptyWorldStats,
  type GlobalStats,
  type WorldSummary,
  type WorldStats,
} from '../types/save';
import type { VoxelHit } from '../types/world';
import { debounce } from '../utils/debounce';
import { setCurrentLanguage, translate } from '../i18n/Language';
import { ChatOverlay, type ChatInputMode } from '../ui/ChatOverlay';
import { DebugOverlay } from '../ui/DebugOverlay';
import { Hud, type HotbarInteractEvent } from '../ui/Hud';
import {
  autocompleteChatCommand,
  type ChatCommandAutocompleteState,
} from './ChatCommandAutocomplete';
import {
  InventoryScreen,
  type InventoryScreenState,
  type SlotInteractEvent,
} from '../ui/InventoryScreen';
import { StartMenu } from '../ui/StartMenu';
import {
  createInitialEnvironmentState,
  isWeatherPreset,
  isWeatherSkyPreset,
  normalizeEnvironmentState,
} from '../world/Weather';
import { WeatherController } from '../world/WeatherController';
import {
  getWaterLevel,
  getMineDurationMs,
  getUiBlockColor,
  isMineableBlock,
  isPlaceableBlock,
  isSolidBlock,
  isWaterBlock,
  isWaterSource,
} from '../world/BlockRegistry';
import { VoxelRaycaster } from '../world/VoxelRaycaster';
import { World } from '../world/World';

interface Session {
  id: string;
  name: string;
  seed: string;
  world: World;
  player: PlayerController;
  inventory: Inventory;
  worldStats: WorldStats;
  environment: WorldEnvironmentState;
}

interface DroppedItem {
  id: string;
  blockId: BlockId;
  position: [number, number, number];
  velocity: [number, number, number];
  ageMs: number;
  pickupDelayMs: number;
  wasInWater: boolean;
  waterOutflowExitImpulse: [number, number];
}

interface UnderwaterViewState {
  enabled: boolean;
  depth: number;
}

const EMPTY_CURSOR: InventorySlot = {
  blockId: null,
  count: 0,
};
const PRIMARY_MINING_HOLD_MS = 120;
const PRIMARY_PUNCH_LOCK_MS = 0;
const MENU_MUSIC_URL = new URL('../../assets/sounds/menu/menu.mp3', import.meta.url).href;
const INTRO_SPLASH_MIN_VISIBLE_MS = 3000;
const INTRO_SPLASH_DURATION_MS = INTRO_SPLASH_MIN_VISIBLE_MS;
const WORLD_PREVIEW_CAPTURE_DELAY_FRAMES = 16;
const WORLD_PREVIEW_SIZE = 256;
const DROP_PICKUP_DELAY_MS = 2000;
const PAUSE_MENU_KEY = 'KeyP';
const CHUNK_MESH_SYNC_BUDGET_MS = 2;
const UNDERWATER_SURFACE_SCAN_MAX_BLOCKS = 160;
const ITEM_WATER_FLOW_ACCELERATION = 4.25;
const ITEM_WATER_OUTFLOW_ACCELERATION = 2.1;
const ITEM_WATER_OUTFLOW_EXIT_IMPULSE_SCALE = 0.84;
const DAY_NIGHT_CYCLE_SECONDS = 20 * 60;
const MOON_PHASE_COUNT = 8;
const CHAT_COMMAND_TIME = 'time';
const CHAT_COMMAND_WEATHER = 'weather';
const CHAT_SUBCOMMAND_CLOCK = 'clock';
const CHAT_SUBCOMMAND_NEXTDAY = 'nextday';
const CHAT_SUBCOMMAND_MOON = 'moon';
const CHAT_SUBCOMMAND_AUTO = 'auto';
const CHAT_SUBCOMMAND_SET_CLOUDS = 'setclouds';
const CHAT_SUBCOMMAND_SET_RAIN = 'setrain';
const CHAT_SUBCOMMAND_SET_SKY = 'setsky';
const CHAT_SUBCOMMAND_DEBUG = 'debug';
const CHAT_CLOCK_HOUR_MIN = 0;
const CHAT_CLOCK_HOUR_MAX = 24;
const CHAT_MOON_PHASE_MIN = 1;
const CHAT_MOON_PHASE_MAX = MOON_PHASE_COUNT;
const SUNRISE_CLOCK_HOUR = 8;

export class Game {
  private readonly shell = document.createElement('div');
  private readonly canvas = document.createElement('canvas');
  private readonly entryGate = document.createElement('div');
  private readonly entryGateButton = document.createElement('button');
  private readonly introSplash = document.createElement('div');
  private readonly introSplashLabel = document.createElement('div');
  private readonly introSplashLoader = document.createElement('div');
  private readonly worldLoadingOverlay = document.createElement('div');
  private readonly worldLoadingCard = document.createElement('div');
  private readonly worldLoadingSpinner = document.createElement('div');
  private readonly worldLoadingLabel = document.createElement('div');
  private readonly renderer: Renderer;
  private readonly input: InputController;
  private readonly menu: StartMenu;
  private readonly hud: Hud;
  private readonly chat: ChatOverlay;
  private readonly debugOverlay: DebugOverlay;
  private readonly inventoryScreen: InventoryScreen;
  private readonly saveRepository = new SaveRepository();
  private readonly weatherController = new WeatherController();
  private readonly gameLoop: GameLoop;
  private readonly menuMusic = new Audio(MENU_MUSIC_URL);
  private readonly persistDirtyChunks = debounce(() => {
    void this.saveDirtyChunks();
  }, SAVE_CONFIG.worldSaveDebounceMs);

  private session: Session | null = null;
  private settings: GameSettings = createDefaultSettings();
  private globalStats: GlobalStats = createEmptyGlobalStats();
  private miningTargetKey: string | null = null;
  private miningProgressMs = 0;
  private targetHit: VoxelHit | null = null;
  private savePlayerElapsedMs = 0;
  private statsPanelRefreshElapsedMs = 0;
  private fpsFrames = 0;
  private fpsElapsedMs = 0;
  private fpsValue = 0;
  private lastRenderTime = performance.now();
  private inventoryMode: CraftingMode = 'player';
  private inventoryCursor: InventorySlot = { ...EMPTY_CURSOR };
  private movementIntensity = 0;
  private primaryHoldMs = 0;
  private primaryPunchPending = false;
  private primaryPunchLockMs = 0;
  private wasPrimaryDown = false;
  private dropSequence = 0;
  private menuMusicUnlockRegistered = false;
  private entryGateReady = false;
  private entryGateActivated = false;
  private entryGateDelayElapsed = false;
  private entryGateDismissed = false;
  private pauseShortcutLatch = false;
  private resumePointerLockPending = false;
  private introSplashTimeoutId: number | null = null;
  private entryGateDelayTimeoutId: number | null = null;
  private pendingWorldPreviewCapture: { worldId: string; framesRemaining: number } | null = null;
  private readonly droppedItems = new Map<string, DroppedItem>();
  private worldTransitionPending = false;
  private hotbarDirty = false;
  private timeOfDay = 0;
  private moonPhase = 0;
  private restorePointerLockAfterChat = false;
  private chatAutocompleteState: ChatCommandAutocompleteState | null = null;

  constructor(private readonly root: HTMLElement) {
    this.shell.className = 'mineblow-shell';
    this.canvas.className = 'mineblow-canvas';
    this.canvas.style.visibility = 'hidden';
    this.entryGate.className = 'entry-gate';
    this.entryGateButton.type = 'button';
    this.entryGateButton.className = 'entry-gate-button';
    this.entryGateButton.textContent = 'Acceder a Mineblow';
    this.entryGateButton.disabled = true;
    this.introSplash.className = 'intro-splash';
    this.introSplashLabel.className = 'intro-splash-label';
    this.introSplashLabel.textContent = 'made by teddyfresnes';
    this.introSplashLoader.className = 'intro-splash-loader';
    this.introSplashLoader.setAttribute('aria-hidden', 'true');
    this.introSplash.append(this.introSplashLabel, this.introSplashLoader);
    this.worldLoadingOverlay.className = 'world-loading-overlay';
    this.worldLoadingOverlay.setAttribute('aria-hidden', 'true');
    this.worldLoadingCard.className = 'world-loading-card';
    this.worldLoadingSpinner.className = 'world-loading-spinner';
    this.worldLoadingSpinner.setAttribute('aria-hidden', 'true');
    this.worldLoadingLabel.className = 'world-loading-label';
    this.worldLoadingCard.append(this.worldLoadingSpinner, this.worldLoadingLabel);
    this.worldLoadingOverlay.append(this.worldLoadingCard);
    this.shell.append(this.canvas);
    const entryGateBody = document.createElement('div');
    entryGateBody.className = 'entry-gate-body';
    entryGateBody.append(this.entryGateButton);
    this.entryGate.append(entryGateBody);
    this.shell.append(this.entryGate, this.introSplash, this.worldLoadingOverlay);
    this.root.append(this.shell);

    this.menuMusic.loop = true;
    this.menuMusic.volume = 0.42;
    this.handleMenuMusicUnlock = this.handleMenuMusicUnlock.bind(this);
    this.handleEntryGateClick = this.handleEntryGateClick.bind(this);
    this.entryGateButton.addEventListener('click', this.handleEntryGateClick);

    this.renderer = new Renderer(this.canvas);
    this.renderer.setFirstPersonHandVisible(false);
    this.renderer.setFirstPersonHeldBlock(null);
    this.input = new InputController(this.canvas);
    this.hud = new Hud(this.shell, {
      onHotbarInteract: (event) => {
        this.handleHudHotbarInteract(event);
      },
    });
    this.chat = new ChatOverlay(this.shell, {
      onSubmit: (mode, value) => {
        this.handleChatSubmit(mode, value);
      },
      onCancel: () => {
        this.closeChat();
      },
      onAutocomplete: (mode, value, selectionStart, selectionEnd, direction) =>
        this.handleChatAutocomplete(mode, value, selectionStart, selectionEnd, direction),
    });
    this.chat.setVisible(false);
    this.debugOverlay = new DebugOverlay(this.shell);
    this.inventoryScreen = new InventoryScreen(this.shell, {
      onSlotInteract: (event) => {
        this.handleInventorySlotInteract(event);
      },
      onRecipeCraft: (recipeId) => {
        this.handleCraftRecipe(recipeId);
      },
      onCursorDrop: () => {
        this.handleInventoryCursorDrop();
      },
    });
    this.menu = new StartMenu(this.shell, {
      onPlayWorld: (worldId) => {
        void this.runMenuWorldTransition(() => this.loadWorld(worldId));
      },
      onCreateWorld: (name, seed) => {
        void this.runMenuWorldTransition(() => this.startNewWorld(name, seed));
      },
      onRenameWorld: (worldId, name) => {
        void this.renameWorld(worldId, name);
      },
      onDeleteWorld: (worldId) => {
        void this.deleteWorld(worldId);
      },
      onResume: () => {
        void this.resumeSession(false);
      },
      onQuitToTitle: () => {
        void this.quitToTitle();
      },
      onSettingsChange: (settings) => {
        this.applySettings(settings);
      },
    });

    this.gameLoop = new GameLoop(1 / 60, (dt) => this.update(dt), () => this.render());
    this.handleResize = this.handleResize.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
    this.handleEscapeKeyDown = this.handleEscapeKeyDown.bind(this);
    setCurrentLanguage(this.settings.language);
    this.hud.setLanguage(this.settings.language);
    this.chat.setLanguage(this.settings.language);
    this.inventoryScreen.setLanguage(this.settings.language);
    this.updateWorldLoadingLabel();
  }

  async bootstrap(): Promise<void> {
    this.input.connect();
    this.input.setPointerLockListener(this.handlePointerLockChange);
    window.addEventListener('keydown', this.handleEscapeKeyDown);
    this.hud.setVisible(false);
    this.updateCanvasVisibility();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    const [settings, globalStats, worlds] = await Promise.all([
      this.saveRepository.loadSettings(),
      this.saveRepository.loadGlobalStats(),
      this.saveRepository.listWorlds(),
    ]);

    let migratedBindings = false;
    if (
      settings.keyBindings.drop.primary === 'KeyD' &&
      settings.keyBindings.drop.secondary === 'Numpad6'
    ) {
      settings.keyBindings.drop.primary = 'KeyT';
      migratedBindings = true;
    }
    if (settings.keyBindings.pause.primary !== PAUSE_MENU_KEY || settings.keyBindings.pause.secondary !== null) {
      settings.keyBindings.pause.primary = PAUSE_MENU_KEY;
      settings.keyBindings.pause.secondary = null;
      migratedBindings = true;
    }
    if (migratedBindings) {
      await this.saveRepository.saveSettings(settings);
    }

    this.settings = settings;
    setCurrentLanguage(this.settings.language);
    this.applyInterfaceZoom(this.settings.interfaceSize);
    this.globalStats = globalStats;
    this.menu.setSettings(settings);
    this.menu.setGlobalStats(globalStats);
    this.menu.setWorlds(worlds);
    this.hud.setHandSkin(settings.skinDataUrl);
    this.hud.setLanguage(this.settings.language);
    this.chat.setLanguage(this.settings.language);
    this.inventoryScreen.setLanguage(this.settings.language);
    this.updateWorldLoadingLabel();

    if (this.settings.developerDebugMode) {
      await this.startDeveloperDebugSession(worlds);
      this.gameLoop.start();
      return;
    }

    this.entryGateReady = true;
    this.entryGateButton.disabled = false;
    if (this.entryGateActivated) {
      this.finishEntryGate();
    }
    this.gameLoop.start();
  }

  private async refreshMenuWorlds(selectedWorldId?: string | null): Promise<void> {
    const worlds = await this.saveRepository.listWorlds();
    this.menu.setWorlds(worlds);
    if (selectedWorldId !== undefined) {
      this.menu.setSelectedWorld(selectedWorldId);
    }
  }

  private async runMenuWorldTransition(run: () => Promise<void>): Promise<void> {
    if (this.worldTransitionPending) {
      return;
    }

    this.worldTransitionPending = true;
    this.showWorldLoadingOverlay();
    await this.waitForNextPaint();
    try {
      await run();
    } finally {
      this.hideWorldLoadingOverlay();
      this.worldTransitionPending = false;
    }
  }

  private showWorldLoadingOverlay(): void {
    this.updateWorldLoadingLabel();
    this.worldLoadingOverlay.classList.add('active');
    this.worldLoadingOverlay.setAttribute('aria-hidden', 'false');
  }

  private hideWorldLoadingOverlay(): void {
    this.worldLoadingOverlay.classList.remove('active');
    this.worldLoadingOverlay.setAttribute('aria-hidden', 'true');
  }

  private updateWorldLoadingLabel(): void {
    this.worldLoadingLabel.textContent = translate('menu.loadingWorld', {}, this.settings.language);
  }

  private async waitForNextPaint(): Promise<void> {
    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
  }

  private disposeSessionWorld(session: Session | null): void {
    session?.world.dispose();
  }

  private markHotbarDirty(): void {
    this.hotbarDirty = true;
  }

  private syncHotbarHud(): void {
    if (!this.session || !this.hotbarDirty) {
      return;
    }

    this.hud.updateHotbar(
      this.session.inventory.getHotbarSlots(),
      this.session.inventory.getSelectedHotbarIndex(),
    );
    this.hotbarDirty = false;
  }

  private async startDeveloperDebugSession(worlds: WorldSummary[]): Promise<void> {
    this.entryGateDismissed = true;
    this.entryGateActivated = true;
    this.entryGateDelayElapsed = true;
    this.entryGate.remove();
    this.introSplash.remove();
    this.menu.hide();
    this.hud.setVisible(false);

    if (this.settings.startFullscreen) {
      void this.requestFullscreen();
    }

    const latestWorld = worlds[0] ?? null;
    if (latestWorld) {
      const loaded = await this.saveRepository.loadWorld(latestWorld.id);
      if (loaded) {
        await this.activateLoadedWorld(loaded, false);
        return;
      }
    }

    await this.startNewWorld('Debug World', '', false);
  }

  private async renameWorld(worldId: string, name: string): Promise<void> {
    const renamed = await this.saveRepository.renameWorld(worldId, name);
    await this.refreshMenuWorlds(renamed?.id ?? worldId);
    if (this.session && this.session.id === worldId && renamed) {
      this.session.name = renamed.name;
      this.updatePauseMenuSnapshot();
    }
  }

  private async deleteWorld(worldId: string): Promise<void> {
    await this.saveRepository.deleteWorld(worldId);
    await this.refreshMenuWorlds();
  }

  private updatePauseMenuSnapshot(): void {
    if (!this.session) {
      this.menu.setPauseWorld(null);
      return;
    }

    this.menu.setPauseWorld({
      id: this.session.id,
      name: this.session.name,
      seed: this.session.seed,
      worldStats: this.session.worldStats,
    });
  }

  private async quitToTitle(): Promise<void> {
    if (this.session) {
      await this.flushSaves();
    }

    this.disposeSessionWorld(this.session);
    this.session = null;
    this.timeOfDay = 0;
    this.moonPhase = 0;
    this.weatherController.reset();
    this.applyEnvironmentState();
    this.pendingWorldPreviewCapture = null;
    this.input.exitPointerLock();
    this.closeChat(false);
    this.chat.clear();
    this.chat.setVisible(false);
    this.inventoryScreen.setVisible(false);
    this.inventoryCursor = { ...EMPTY_CURSOR };
    this.targetHit = null;
    this.miningTargetKey = null;
    this.miningProgressMs = 0;
    this.primaryHoldMs = 0;
    this.primaryPunchPending = false;
    this.primaryPunchLockMs = 0;
    this.wasPrimaryDown = false;
    this.dropSequence = 0;
    this.resumePointerLockPending = false;
    this.droppedItems.clear();
    this.renderer.clearChunks();
    this.renderer.clearDroppedItems();
    this.renderer.setFirstPersonHandVisible(false);
    this.renderer.setFirstPersonHeldBlock(null);
    this.renderer.setMiningOverlay(null, 0);
    this.hud.setMiningProgress(0);
    this.hud.setInventoryOverlayActive(false);
    this.hud.setVisible(false);
    this.hotbarDirty = false;
    this.menu.setGlobalStats(this.globalStats);
    this.menu.setPauseWorld(null);
    this.updateCanvasVisibility();
    await this.refreshMenuWorlds();
    this.menu.showBoot();
    void this.playMenuMusic();
  }

  private async startNewWorld(
    nameInput: string,
    seedInput: string,
    openPauseOnPointerLockFailure = true,
  ): Promise<void> {
    const seed =
      seedInput.trim() ||
      String(Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000);
    this.renderer.clearChunks();

    const world = new World(seed);
    world.primeAround(0, 0, 1);
    const spawnPoint = SpawnResolver.resolve(world);
    const playerState: PlayerState = {
      position: [...spawnPoint],
      velocity: [0, 0, 0],
      yaw: 0,
      pitch: 0,
      selectedSlot: 0,
      spawnPoint: [...spawnPoint],
    };
    const inventory = new Inventory();
    const worldStats = createEmptyWorldStats();
    const environment = createInitialEnvironmentState();

    const createdWorld = await this.saveRepository.createNewWorld(
      nameInput,
      seed,
      playerState,
      inventory.snapshot(),
      worldStats,
      environment,
    );
    this.globalStats = await this.saveRepository.loadGlobalStats();
    this.menu.setGlobalStats(this.globalStats);
    await this.refreshMenuWorlds(createdWorld.id);
    await this.activateSession({
      id: createdWorld.id,
      name: createdWorld.name,
      seed,
      world,
      player: new PlayerController(playerState),
      inventory,
      worldStats,
      environment,
    }, openPauseOnPointerLockFailure);
  }

  private async loadWorld(worldId: string): Promise<void> {
    const loaded = await this.saveRepository.loadWorld(worldId);
    if (!loaded) {
      await this.refreshMenuWorlds();
      this.menu.showBoot();
      return;
    }

    this.renderer.clearChunks();
    await this.activateLoadedWorld(loaded);
  }

  private async activateLoadedWorld(
    loaded: LoadedWorld,
    openPauseOnPointerLockFailure = true,
  ): Promise<void> {
    const world = new World(loaded.save.seed, loaded.chunkDiffs);
    world.primeAround(loaded.save.player.position[0], loaded.save.player.position[2], 1);
    world.primeAround(0, 0, 1);
    const playerState = this.createSafePlayerState(loaded.save.player, world);
    const inventory = new Inventory(loaded.save.inventory, playerState.selectedSlot);
    const worldStats = this.normalizeWorldStats(loaded.save.worldStats);
    const environment = normalizeEnvironmentState(loaded.save.environment);
    await this.refreshMenuWorlds(loaded.save.id);
    await this.activateSession({
      id: loaded.save.id,
      name: loaded.save.name,
      seed: loaded.save.seed,
      world,
      player: new PlayerController(playerState),
      inventory,
      worldStats,
      environment,
    }, openPauseOnPointerLockFailure);
  }

  private async activateSession(
    session: Session,
    openPauseOnPointerLockFailure = true,
  ): Promise<void> {
    const previousSession = this.session;
    if (previousSession && previousSession !== session) {
      this.disposeSessionWorld(previousSession);
    }
    this.session = session;
    this.timeOfDay = session.environment.timeOfDay;
    this.moonPhase = session.environment.moonPhase;
    this.weatherController.reset(session.environment.weather);
    this.closeChat(false);
    this.chat.clear();
    this.chat.setVisible(true);
    this.updateCanvasVisibility();
    this.stopMenuMusic();
    this.savePlayerElapsedMs = 0;
    this.statsPanelRefreshElapsedMs = 0;
    this.miningTargetKey = null;
    this.miningProgressMs = 0;
    this.targetHit = null;
    this.inventoryCursor = { ...EMPTY_CURSOR };
    this.movementIntensity = 0;
    this.primaryHoldMs = 0;
    this.primaryPunchPending = false;
    this.primaryPunchLockMs = 0;
    this.wasPrimaryDown = false;
    this.dropSequence = 0;
    this.droppedItems.clear();
    this.renderer.clearDroppedItems();
    this.renderer.setMiningOverlay(null, 0);
    this.inventoryScreen.setVisible(false);
    this.hud.setMiningProgress(0);
    this.hud.setHealth(20, 20);
    this.updateLevelHud();

    const [playerX, , playerZ] = session.player.getPosition();
    session.world.enqueueStreamingAround(playerX, playerZ);
    this.syncChunkMeshes();
    this.hud.setInventoryOverlayActive(false);
    this.hud.setVisible(true);
    this.hud.setHandSkin(this.settings.skinDataUrl);
    this.renderer.setPlayerSkin(this.settings.skinDataUrl);
    this.menu.setPauseWorld({
      id: session.id,
      name: session.name,
      seed: session.seed,
      worldStats: session.worldStats,
    });
    this.updateFirstPersonHandVisibility(session.inventory);
    this.markHotbarDirty();
    this.syncHotbarHud();
    this.applyEnvironmentState();
    this.hud.setGenerating(
      this.settings.developerDebugMode &&
        (session.world.hasPendingGeneration() || session.world.hasPendingMeshes()),
    );
    this.queueWorldPreviewCapture(session.id);
    await this.resumeSession(openPauseOnPointerLockFailure);
  }

  private async resumeSession(openPauseOnPointerLockFailure = true): Promise<void> {
    this.hud.setInventoryOverlayActive(false);
    this.hud.setVisible(true);
    this.menu.hide();
    this.resumePointerLockPending = true;
    try {
      await this.input.requestPointerLock();
      if (!this.input.isPointerLocked()) {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0);
        });
      }
    } catch {
      // Pointer lock can fail if the browser blocks the request.
    } finally {
      this.resumePointerLockPending = false;
    }

    if (this.input.isPointerLocked()) {
      return;
    }

    if (openPauseOnPointerLockFailure) {
      this.updatePauseMenuSnapshot();
      this.menu.showPause();
      this.hud.setVisible(false);
    }
  }

  private update(dt: number): void {
    const debugPressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.debug.primary,
      this.settings.keyBindings.debug.secondary,
      'F3',
    ]);
    if (debugPressed && !this.chat.isOpen()) {
      this.debugOverlay.toggle();
    }

    const inventoryPressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.inventory.primary,
      this.settings.keyBindings.inventory.secondary,
      'KeyI',
    ]);
    if (inventoryPressed && !this.chat.isOpen()) {
      if (this.inventoryScreen.isVisible()) {
        void this.closeInventory();
      } else if (this.session && !this.menu.isVisible()) {
        this.openInventory('player');
      }
    }

    const pauseBindings = [PAUSE_MENU_KEY];
    const pausePressed = this.input.consumeAnyJustPressed(pauseBindings);
    if (this.pauseShortcutLatch && !this.input.isAnyKeyDown(pauseBindings)) {
      this.pauseShortcutLatch = false;
    }

    let handledPauseShortcut = false;
    if (pausePressed && !this.chat.isOpen() && this.menu.isVisible()) {
      handledPauseShortcut = true;
      if (this.menu.handleEscapeShortcut()) {
        this.pauseShortcutLatch = true;
      }
    } else if (pausePressed && !this.chat.isOpen() && this.inventoryScreen.isVisible()) {
      handledPauseShortcut = true;
      this.pauseShortcutLatch = true;
      void this.closeInventory(false);
    }

    const dropPressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.drop.primary,
      this.settings.keyBindings.drop.secondary,
    ]);

    if (!this.session) {
      this.hud.setPointerUnlockPromptVisible(false);
      this.input.endFrame();
      return;
    }

    const canOpenChat =
      !this.chat.isOpen() && !this.menu.isVisible() && !this.inventoryScreen.isVisible();
    const openChatPressed =
      canOpenChat &&
      this.input.consumeAnyJustPressed([
        this.settings.keyBindings.chat.primary,
        this.settings.keyBindings.chat.secondary,
      ]);
    const openCommandPressed =
      canOpenChat &&
      this.input.consumeAnyJustPressed([
        this.settings.keyBindings.chatCommand.primary,
        this.settings.keyBindings.chatCommand.secondary,
      ]);
    if (openCommandPressed) {
      this.openChat('command');
    } else if (openChatPressed) {
      this.openChat('chat');
    }

    this.advanceEnvironment(dt);
    const { world, player, inventory } = this.session;
    const chatOpen = this.chat.isOpen();

    if (dropPressed && !chatOpen && !this.menu.isVisible()) {
      if (this.inventoryScreen.isVisible() && this.inventoryCursor.blockId !== null && this.inventoryCursor.count > 0) {
        this.handleInventoryCursorDrop();
      } else {
        this.dropSelectedHotbarFromKeybind();
      }
    }

    if (
      pausePressed &&
      !chatOpen &&
      !handledPauseShortcut &&
      !this.inventoryScreen.isVisible() &&
      !this.menu.isVisible()
    ) {
      if (this.input.isPointerLocked()) {
        this.input.exitPointerLock();
      }
      this.closeChat(false);
      this.updatePauseMenuSnapshot();
      this.menu.showPause();
      this.hud.setVisible(false);
      this.pauseShortcutLatch = true;
    }

    if (!chatOpen && !this.menu.isVisible()) {
      if (!this.inventoryScreen.isVisible()) {
        const wheelSteps = this.input.consumeWheelSteps();
        if (wheelSteps !== 0) {
          inventory.shiftSelectedHotbar(wheelSteps);
          player.setSelectedSlot(inventory.getSelectedHotbarIndex());
          this.markHotbarDirty();
        }
      }
      const directSlot = this.input.consumeNumberSlot();
      if (directSlot !== null) {
        inventory.setSelectedHotbarIndex(directSlot);
        player.setSelectedSlot(inventory.getSelectedHotbarIndex());
        this.markHotbarDirty();
        if (this.inventoryScreen.isVisible()) {
          this.refreshInventoryScreen();
        }
      }
    }
    this.updateFirstPersonHandVisibility(inventory);

    const active =
      this.input.isPointerLocked() && !chatOpen && !this.menu.isVisible() && !this.inventoryScreen.isVisible();
    if (active) {
      this.primaryPunchLockMs = Math.max(0, this.primaryPunchLockMs - dt * 1000);
      const primaryDown = this.input.isPrimaryDown();
      const primaryClicked = this.input.consumePrimaryClick();

      if (primaryClicked) {
        if (!primaryDown) {
          if (this.primaryPunchLockMs <= 0) {
            this.primaryPunchLockMs = PRIMARY_PUNCH_LOCK_MS;
            this.renderer.triggerFirstPersonAction(1.55);
          }
          this.primaryPunchPending = false;
          this.primaryHoldMs = 0;
        } else {
          this.primaryPunchPending = true;
          this.primaryHoldMs = 0;
        }
      }
      if (primaryDown && this.primaryPunchPending) {
        this.primaryHoldMs += dt * 1000;
      }
      const before = player.getPosition();
      const frameUpdate = player.update(dt, this.input, world, this.settings.keyBindings);
      if (frameUpdate.jumped) {
        this.renderer.triggerFirstPersonJump(0.85);
      }
      const after = player.getPosition();
      this.trackMovementStats(before, after, dt, frameUpdate);
      this.targetHit = VoxelRaycaster.cast(
        world,
        player.getCameraPosition(),
        player.getLookDirection(),
        WORLD_CONFIG.maxInteractionDistance,
      );

      const holdingMineableTarget =
        primaryDown &&
        this.primaryPunchPending &&
        this.primaryHoldMs >= PRIMARY_MINING_HOLD_MS &&
        !!this.targetHit &&
        isMineableBlock(this.targetHit.blockId);
      if (holdingMineableTarget) {
        this.primaryPunchPending = false;
      }

      const releasedPrimary = !primaryDown && this.wasPrimaryDown;
      if (releasedPrimary) {
        const shouldPunch = this.primaryPunchPending && this.primaryPunchLockMs <= 0;
        this.primaryPunchPending = false;
        this.primaryHoldMs = 0;
        if (shouldPunch) {
          this.primaryPunchLockMs = PRIMARY_PUNCH_LOCK_MS;
          this.renderer.triggerFirstPersonAction(1.55);
        }
      }

      const canMineWithPrimary =
        this.primaryPunchLockMs <= 0 &&
        primaryDown &&
        !this.primaryPunchPending &&
        this.primaryHoldMs >= PRIMARY_MINING_HOLD_MS &&
        !!this.targetHit &&
        isMineableBlock(this.targetHit.blockId);
      this.handleInteractions(dt, canMineWithPrimary);
      this.wasPrimaryDown = primaryDown;
      this.hud.updateHand(dt, this.movementIntensity, this.miningProgressMs > 0);
      this.renderer.updateHand(dt, this.movementIntensity, this.miningProgressMs > 0);
      this.renderer.updateSpeedFov(
        dt,
        frameUpdate.sprinting,
        frameUpdate.moving,
        player.isGrounded(),
      );
    } else {
      if (
        !chatOpen &&
        !this.menu.isVisible() &&
        !this.inventoryScreen.isVisible() &&
        !this.input.isPointerLocked()
      ) {
        const relockRequested =
          this.input.consumePrimaryClick() || this.input.consumeSecondaryClick();
        if (relockRequested) {
          void this.resumeSession(false);
        }
      } else {
        this.input.consumePrimaryClick();
        this.input.consumeSecondaryClick();
      }
      this.primaryHoldMs = 0;
      this.primaryPunchPending = false;
      this.primaryPunchLockMs = 0;
      this.wasPrimaryDown = false;
      this.resetMining();
      this.targetHit = null;
      this.renderer.setMiningOverlay(null, 0);
      this.hud.setMiningProgress(0);
      this.hud.updateHand(dt, 0, false);
      this.renderer.updateHand(dt, 0, false);
      this.renderer.updateSpeedFov(dt, false, false, true);
    }

    if (!this.menu.isVisible()) {
      this.updateDroppedItems(dt);
    }

    this.renderer.updateWeatherEffects(dt, player.getCameraPosition(), world);
    this.renderer.updateAnimatedTextures(dt);
    this.renderer.updateTransientEffects(dt);

    world.enqueueStreamingAround(player.getPosition()[0], player.getPosition()[2]);
    world.processGenerationBudget();
    world.tickFluids(dt);
    this.syncChunkMeshes();

    this.syncHotbarHud();
    this.hud.setGenerating(
      this.settings.developerDebugMode &&
        (world.hasPendingGeneration() || world.hasPendingMeshes()),
    );
    this.hud.setFps(this.fpsValue);
    this.updateLevelHud();

    if (this.inventoryScreen.isVisible()) {
      this.refreshInventoryScreen();
    }

    this.savePlayerElapsedMs += dt * 1000;
    if (this.savePlayerElapsedMs >= SAVE_CONFIG.playerSaveIntervalMs) {
      this.savePlayerElapsedMs = 0;
      void this.persistProfile(true);
    }

    this.statsPanelRefreshElapsedMs += dt * 1000;
    if (this.statsPanelRefreshElapsedMs >= 500) {
      this.statsPanelRefreshElapsedMs = 0;
      this.menu.setGlobalStats(this.globalStats);
      this.updatePauseMenuSnapshot();
    }

    const [playerX, playerY, playerZ] = player.getPosition();
    if (this.debugOverlay.isVisible()) {
      this.updateDebugPanel(playerX, playerY, playerZ);
    }
    this.updatePointerUnlockPromptVisibility();
    this.input.endFrame();
  }

  private advanceEnvironment(dt: number): void {
    this.timeOfDay += dt / DAY_NIGHT_CYCLE_SECONDS;
    while (this.timeOfDay >= 1) {
      this.timeOfDay -= 1;
      this.advanceMoonPhase();
    }
    this.weatherController.update(dt * 1000);
    this.applyEnvironmentState();
  }

  private openChat(mode: ChatInputMode): void {
    if (!this.session || this.menu.isVisible() || this.inventoryScreen.isVisible()) {
      return;
    }

    this.chatAutocompleteState = null;
    this.restorePointerLockAfterChat = this.input.isPointerLocked();
    if (this.input.isPointerLocked()) {
      this.input.exitPointerLock();
    }
    this.input.clearInputState();
    this.hud.setPointerUnlockPromptVisible(false);
    this.chat.openComposer(mode, mode === 'command' ? '/' : '');
  }

  private closeChat(restorePointerLock = true): void {
    if (!this.chat.isOpen()) {
      this.chatAutocompleteState = null;
      this.restorePointerLockAfterChat = false;
      return;
    }

    const shouldRestore =
      restorePointerLock &&
      this.restorePointerLockAfterChat &&
      !!this.session &&
      !this.menu.isVisible() &&
      !this.inventoryScreen.isVisible();
    this.chatAutocompleteState = null;
    this.chat.closeComposer();
    this.restorePointerLockAfterChat = false;
    this.input.clearInputState();
    if (shouldRestore) {
      void this.resumeSession(false);
      return;
    }
    this.updatePointerUnlockPromptVisibility();
  }

  private handleChatSubmit(mode: ChatInputMode, value: string): void {
    void mode;
    this.chatAutocompleteState = null;
    if (value.startsWith('/')) {
      this.chat.addCommandMessage(value);
      this.executeChatCommand(value.slice(1).trim());
    } else {
      this.chat.addPlayerMessage(value);
    }

    this.closeChat();
  }

  private handleChatAutocomplete(
    mode: ChatInputMode,
    value: string,
    selectionStart: number,
    selectionEnd: number,
    direction: 1 | -1,
  ): { value: string; selectionStart: number; selectionEnd: number } | null {
    void mode;
    void selectionEnd;
    if (!value.startsWith('/')) {
      this.chatAutocompleteState = null;
      return null;
    }

    const result = autocompleteChatCommand(
      value,
      selectionStart,
      this.chatAutocompleteState,
      direction,
    );
    this.chatAutocompleteState = result?.state ?? null;
    if (!result) {
      return null;
    }

    return {
      value: result.value,
      selectionStart: result.selectionStart,
      selectionEnd: result.selectionEnd,
    };
  }

  private executeChatCommand(rawCommand: string): void {
    const [commandName = '', ...args] = rawCommand.trim().split(/\s+/);
    if (!commandName) {
      this.chat.addSystemMessage(translate('hud.unknownCommand', {}, this.settings.language), 'error');
      return;
    }

    switch (commandName.toLowerCase()) {
      case CHAT_COMMAND_TIME:
        this.executeTimeCommand(args);
        return;
      case CHAT_COMMAND_WEATHER:
        this.executeWeatherCommand(args);
        return;
      default:
        this.chat.addSystemMessage(
          translate('hud.unknownCommand', {}, this.settings.language),
          'error',
        );
    }
  }

  private executeTimeCommand(args: string[]): void {
    const [subcommand = '', ...subcommandArgs] = args;
    switch (subcommand.toLowerCase()) {
      case CHAT_SUBCOMMAND_CLOCK: {
        const [rawHour] = subcommandArgs;
        const parsedHour = rawHour ? Number.parseInt(rawHour, 10) : Number.NaN;
        if (
          subcommandArgs.length !== 1 ||
          !Number.isInteger(parsedHour) ||
          parsedHour < CHAT_CLOCK_HOUR_MIN ||
          parsedHour > CHAT_CLOCK_HOUR_MAX
        ) {
          this.chat.addSystemMessage(
            translate('hud.timeClockUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.setClockHour(parsedHour);
        this.chat.addSystemMessage(
          translate('hud.timeClockSuccess', { hour: parsedHour }, this.settings.language),
        );
        return;
      }
      case CHAT_SUBCOMMAND_NEXTDAY:
        if (subcommandArgs.length !== 0) {
          this.chat.addSystemMessage(
            translate('hud.timeNextDayUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.advanceMoonPhase();
        this.applyEnvironmentState();
        this.chat.addSystemMessage(
          translate('hud.timeNextDaySuccess', {}, this.settings.language),
        );
        return;
      case CHAT_SUBCOMMAND_MOON: {
        const [rawPhase] = subcommandArgs;
        const parsedPhase = rawPhase ? Number.parseInt(rawPhase, 10) : Number.NaN;
        if (
          subcommandArgs.length !== 1 ||
          !Number.isInteger(parsedPhase) ||
          parsedPhase < CHAT_MOON_PHASE_MIN ||
          parsedPhase > CHAT_MOON_PHASE_MAX
        ) {
          this.chat.addSystemMessage(
            translate('hud.timeMoonUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.setMoonPhase(parsedPhase - 1);
        this.chat.addSystemMessage(
          translate('hud.timeMoonSuccess', { phase: parsedPhase }, this.settings.language),
        );
        return;
      }
      default:
        this.chat.addSystemMessage(translate('hud.timeUsage', {}, this.settings.language), 'error');
    }
  }

  private executeWeatherCommand(args: string[]): void {
    const [subcommand = '', ...subcommandArgs] = args;
    const normalizedSubcommand = subcommand.toLowerCase();

    if (isWeatherPreset(normalizedSubcommand)) {
      this.weatherController.setPreset(normalizedSubcommand);
      this.applyEnvironmentState();
      this.chat.addSystemMessage(
        translate(
          'hud.weatherPresetSuccess',
          { preset: normalizedSubcommand },
          this.settings.language,
        ),
      );
      return;
    }

    switch (normalizedSubcommand) {
      case CHAT_SUBCOMMAND_AUTO:
        if (subcommandArgs.length !== 0) {
          this.chat.addSystemMessage(
            translate('hud.weatherAutoUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.weatherController.setAutoMode();
        this.applyEnvironmentState();
        this.chat.addSystemMessage(
          translate('hud.weatherAutoSuccess', {}, this.settings.language),
        );
        return;
      case CHAT_SUBCOMMAND_SET_CLOUDS: {
        const parsedValue = this.parseWeatherControlValue(subcommandArgs[0]);
        if (subcommandArgs.length !== 1 || parsedValue === 'invalid') {
          this.chat.addSystemMessage(
            translate('hud.weatherSetCloudsUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.weatherController.setCloudCoverage(parsedValue);
        this.applyEnvironmentState();
        this.chat.addSystemMessage(
          translate(
            'hud.weatherSetCloudsSuccess',
            { value: parsedValue === null ? 'auto' : `${Math.round(parsedValue * 100)}%` },
            this.settings.language,
          ),
        );
        return;
      }
      case CHAT_SUBCOMMAND_SET_RAIN: {
        const parsedValue = this.parseWeatherControlValue(subcommandArgs[0]);
        if (subcommandArgs.length !== 1 || parsedValue === 'invalid') {
          this.chat.addSystemMessage(
            translate('hud.weatherSetRainUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.weatherController.setRainIntensity(parsedValue);
        this.applyEnvironmentState();
        this.chat.addSystemMessage(
          translate(
            'hud.weatherSetRainSuccess',
            { value: parsedValue === null ? 'auto' : `${Math.round(parsedValue * 100)}%` },
            this.settings.language,
          ),
        );
        return;
      }
      case CHAT_SUBCOMMAND_SET_SKY: {
        const rawPreset = subcommandArgs[0]?.toLowerCase();
        if (subcommandArgs.length !== 1 || !isWeatherSkyPreset(rawPreset)) {
          this.chat.addSystemMessage(
            translate('hud.weatherSetSkyUsage', {}, this.settings.language),
            'error',
          );
          return;
        }

        this.weatherController.setSkyPreset(rawPreset);
        this.applyEnvironmentState();
        this.chat.addSystemMessage(
          translate(
            'hud.weatherSetSkySuccess',
            { preset: rawPreset },
            this.settings.language,
          ),
        );
        return;
      }
      case CHAT_SUBCOMMAND_DEBUG:
        if (subcommandArgs.length !== 0) {
          this.chat.addSystemMessage(
            translate('hud.weatherDebugUsage', {}, this.settings.language),
            'error',
          );
          return;
        }
        this.printWeatherDebugState();
        return;
      default:
        this.chat.addSystemMessage(
          translate('hud.weatherUsage', {}, this.settings.language),
          'error',
        );
    }
  }

  private parseWeatherControlValue(rawValue: string | undefined): number | null | 'invalid' {
    if (!rawValue) {
      return 'invalid';
    }

    const normalizedValue = rawValue.trim().toLowerCase();
    if (normalizedValue === 'auto') {
      return null;
    }

    const parsed = Number.parseFloat(normalizedValue.replace(',', '.'));
    if (!Number.isFinite(parsed)) {
      return 'invalid';
    }

    const percentageNormalized = parsed > 1 ? parsed / 100 : parsed;
    if (percentageNormalized < 0 || percentageNormalized > 1) {
      return 'invalid';
    }
    return percentageNormalized;
  }

  private printWeatherDebugState(): void {
    const debugState = this.weatherController.getDebugState();
    const visual = debugState.visual;
    const overrides = debugState.overrides;
    this.chat.addSystemMessage(
      translate(
        'hud.weatherDebugState',
        {
          mode: debugState.mode,
          preset: debugState.preset,
          transition: Math.round(debugState.transitionAlpha * 100),
          clouds: Math.round(visual.cloudCoverage * 100),
          rain: Math.round(visual.rainIntensity * 100),
          sky: visual.skyPreset,
          sun: Math.round(visual.sunVisibility * 100),
        },
        this.settings.language,
      ),
    );
    this.chat.addSystemMessage(
      translate(
        'hud.weatherDebugOverrides',
        {
          clouds: overrides.cloudCoverage === null ? 'auto' : `${Math.round(overrides.cloudCoverage * 100)}%`,
          rain: overrides.rainIntensity === null ? 'auto' : `${Math.round(overrides.rainIntensity * 100)}%`,
          sky: overrides.skyPreset,
        },
        this.settings.language,
      ),
    );
  }

  private setClockHour(hour: number): void {
    const normalizedHour = hour % CHAT_CLOCK_HOUR_MAX;
    this.timeOfDay =
      ((normalizedHour - SUNRISE_CLOCK_HOUR + CHAT_CLOCK_HOUR_MAX) % CHAT_CLOCK_HOUR_MAX) /
      CHAT_CLOCK_HOUR_MAX;
    this.applyEnvironmentState();
  }

  private setMoonPhase(phase: number): void {
    this.moonPhase = ((Math.floor(phase) % MOON_PHASE_COUNT) + MOON_PHASE_COUNT) % MOON_PHASE_COUNT;
    this.applyEnvironmentState();
  }

  private advanceMoonPhase(days = 1): void {
    this.moonPhase =
      ((this.moonPhase + Math.floor(days)) % MOON_PHASE_COUNT + MOON_PHASE_COUNT) % MOON_PHASE_COUNT;
  }

  private applyEnvironmentState(): void {
    if (this.session) {
      this.session.environment = this.buildEnvironmentState();
    }
    this.renderer.setCelestialState(this.timeOfDay, this.moonPhase);
    this.renderer.setWeatherState(this.weatherController.getVisualState());
  }

  private render(): void {
    if (!this.session) {
      this.lastRenderTime = performance.now();
      return;
    }

    if (this.session) {
      const cameraPosition = this.session.player.getCameraPosition();
      const rotation = this.session.player.getRotation();
      this.renderer.setCameraTransform(cameraPosition, rotation.yaw, rotation.pitch);
      const underwaterState = this.getCameraUnderwaterState(cameraPosition, this.session.world);
      this.renderer.setUnderwaterView(underwaterState.enabled, underwaterState.depth);
      this.renderer.setChunkEdgeFadeOrigin(cameraPosition.x, cameraPosition.z);
    }

    const now = performance.now();
    this.fpsFrames += 1;
    this.fpsElapsedMs += now - this.lastRenderTime;
    this.lastRenderTime = now;
    if (this.fpsElapsedMs >= 500) {
      this.fpsValue = Math.round((this.fpsFrames * 1000) / this.fpsElapsedMs);
      this.fpsFrames = 0;
      this.fpsElapsedMs = 0;
    }

    this.renderer.render();
    this.capturePendingWorldPreview();
  }

  private getCameraUnderwaterState(
    cameraPosition: { x: number; y: number; z: number },
    world: World,
  ): UnderwaterViewState {
    const blockX = Math.floor(cameraPosition.x);
    const blockY = Math.floor(cameraPosition.y);
    const blockZ = Math.floor(cameraPosition.z);
    const blockAtCamera = world.getBlock(blockX, blockY, blockZ);
    if (!isWaterBlock(blockAtCamera)) {
      return { enabled: false, depth: 0 };
    }

    let topWaterY = blockY;
    for (let step = 0; step < UNDERWATER_SURFACE_SCAN_MAX_BLOCKS; step += 1) {
      const aboveY = topWaterY + 1;
      const aboveBlock = world.getBlock(blockX, aboveY, blockZ);
      if (!isWaterBlock(aboveBlock)) {
        break;
      }
      topWaterY = aboveY;
    }

    const topWaterBlock = world.getBlock(blockX, topWaterY, blockZ);
    const waterLevel = getWaterLevel(topWaterBlock) ?? 0;
    const waterSurfaceY = topWaterY + waterLevelToSurfaceHeight(waterLevel);
    const depth = waterSurfaceY - cameraPosition.y;
    if (depth <= 0.001) {
      return { enabled: false, depth: 0 };
    }

    return { enabled: true, depth };
  }

  private updateCanvasVisibility(): void {
    this.canvas.style.visibility = this.session ? 'visible' : 'hidden';
  }

  private queueWorldPreviewCapture(worldId: string): void {
    this.pendingWorldPreviewCapture = {
      worldId,
      framesRemaining: WORLD_PREVIEW_CAPTURE_DELAY_FRAMES,
    };
  }

  private capturePendingWorldPreview(): void {
    const pending = this.pendingWorldPreviewCapture;
    if (!pending) {
      return;
    }
    if (!this.session || this.session.id !== pending.worldId) {
      this.pendingWorldPreviewCapture = null;
      return;
    }

    if (pending.framesRemaining > 0) {
      pending.framesRemaining -= 1;
      return;
    }

    this.pendingWorldPreviewCapture = null;
    const preview = this.captureWorldPreviewPng();
    if (!preview) {
      return;
    }
    void this.saveRepository.saveWorldPreview(pending.worldId, preview);
  }

  private captureWorldPreviewPng(): string | null {
    const sourceWidth = this.canvas.width;
    const sourceHeight = this.canvas.height;
    if (sourceWidth < 8 || sourceHeight < 8) {
      return null;
    }

    const squareSize = Math.min(sourceWidth, sourceHeight);
    const sourceX = Math.floor((sourceWidth - squareSize) * 0.5);
    const sourceY = Math.floor((sourceHeight - squareSize) * 0.5);
    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = WORLD_PREVIEW_SIZE;
    previewCanvas.height = WORLD_PREVIEW_SIZE;
    const context = previewCanvas.getContext('2d');
    if (!context) {
      return null;
    }

    context.imageSmoothingEnabled = true;
    context.drawImage(
      this.canvas,
      sourceX,
      sourceY,
      squareSize,
      squareSize,
      0,
      0,
      WORLD_PREVIEW_SIZE,
      WORLD_PREVIEW_SIZE,
    );
    return previewCanvas.toDataURL('image/png');
  }

  private handleInteractions(dt: number, canUsePrimary: boolean): void {
    if (!this.session) {
      return;
    }

    const { world, player, inventory } = this.session;

    if (
      canUsePrimary &&
      this.targetHit &&
      isMineableBlock(this.targetHit.blockId)
    ) {
      const targetKey = `${this.targetHit.blockWorldX},${this.targetHit.blockWorldY},${this.targetHit.blockWorldZ}`;
      if (this.miningTargetKey !== targetKey) {
        this.miningTargetKey = targetKey;
        this.miningProgressMs = 0;
      }

      this.miningProgressMs += dt * 1000;
      const mineDurationMs = getMineDurationMs(this.targetHit.blockId);
      const miningProgress = Math.min(1, this.miningProgressMs / mineDurationMs);
      this.hud.setMiningProgress(miningProgress);
      this.renderer.setMiningOverlay(this.targetHit, miningProgress);

      if (this.miningProgressMs >= mineDurationMs) {
        const minedBlock = this.targetHit.blockId;
        if (
          world.setBlock(
            this.targetHit.blockWorldX,
            this.targetHit.blockWorldY,
            this.targetHit.blockWorldZ,
            0,
          )
        ) {
          this.spawnDroppedItem(
            minedBlock,
            this.targetHit.blockWorldX + 0.5,
            this.targetHit.blockWorldY + 0.5,
            this.targetHit.blockWorldZ + 0.5,
          );
          this.renderer.spawnBreakParticles(
            getUiBlockColor(minedBlock),
            this.targetHit.blockWorldX,
            this.targetHit.blockWorldY,
            this.targetHit.blockWorldZ,
          );
          this.session.worldStats.blocksMined += 1;
          this.globalStats.totalBlocksMined += 1;
          this.persistDirtyChunks();
          void this.persistProfile(true);
        }
        this.resetMining();
      }
    } else {
      this.resetMining();
      this.hud.setMiningProgress(0);
      this.renderer.setMiningOverlay(null, 0);
    }

    const secondaryClicked = this.input.consumeSecondaryClick();

    if (this.targetHit && secondaryClicked) {
      if (this.targetHit.blockId === 8) {
        this.openInventory('crafting_table');
        return;
      }

      const targetPlacementBlock = world.getBlock(
        this.targetHit.placeWorldX,
        this.targetHit.placeWorldY,
        this.targetHit.placeWorldZ,
      );
      const canReplaceTargetBlock =
        targetPlacementBlock === 0 || isWaterBlock(targetPlacementBlock);
      const selectedBlock = inventory.getSelectedBlock();
      if (
        selectedBlock !== null &&
        isPlaceableBlock(selectedBlock) &&
        canReplaceTargetBlock &&
        player.canOccupyBlock(
          this.targetHit.placeWorldX,
          this.targetHit.placeWorldY,
          this.targetHit.placeWorldZ,
        ) &&
        world.setBlock(
          this.targetHit.placeWorldX,
          this.targetHit.placeWorldY,
          this.targetHit.placeWorldZ,
          selectedBlock,
        )
      ) {
        this.renderer.triggerFirstPersonAction(1.05);
        inventory.consumeSelectedBlock();
        this.markHotbarDirty();
        this.session.worldStats.blocksPlaced += 1;
        this.globalStats.totalBlocksPlaced += 1;
        this.persistDirtyChunks();
        void this.persistProfile(true);
      }
    }
  }

  private openInventory(mode: CraftingMode): void {
    if (!this.session) {
      return;
    }

    this.closeChat(false);
    this.inventoryMode = mode;
    this.inventoryScreen.setVisible(true);
    this.hud.setInventoryOverlayActive(true);
    this.hud.setVisible(true);
    this.input.exitPointerLock();
    this.refreshInventoryScreen();
  }

  private async closeInventory(
    openPauseOnPointerLockFailure = true,
    preferImmediateResume = false,
  ): Promise<void> {
    if (!this.session) {
      return;
    }

    this.inventoryCursor = this.session.inventory.returnCursor(this.inventoryCursor);
    this.markHotbarDirty();
    this.syncHotbarHud();
    if (this.inventoryCursor.blockId !== null && this.inventoryCursor.count > 0) {
      this.refreshInventoryScreen();
      return;
    }

    this.inventoryScreen.setVisible(false);
    this.hud.setInventoryOverlayActive(false);
    if (preferImmediateResume) {
      const persistPromise = this.persistProfile(true);
      await this.resumeSession(openPauseOnPointerLockFailure);
      await persistPromise;
      return;
    }

    await this.persistProfile(true);
    await this.resumeSession(openPauseOnPointerLockFailure);
  }

  private refreshInventoryScreen(): void {
    if (!this.session) {
      return;
    }

    const recipes = getRecipesForMode(this.inventoryMode);
    const craftableRecipeIds = new Set(
      recipes.filter((recipe) => canCraftRecipe(this.session!.inventory, recipe)).map((recipe) => recipe.id),
    );

    const state: InventoryScreenState = {
      mode: this.inventoryMode,
      slots: this.session.inventory.getSlots(),
      selectedHotbarIndex: this.session.inventory.getSelectedHotbarIndex(),
      cursor: { ...this.inventoryCursor },
      recipes,
      craftableRecipeIds,
      skinDataUrl: this.settings.skinDataUrl,
    };

    this.inventoryScreen.render(state);
  }

  private handleInventorySlotInteract(event: SlotInteractEvent): void {
    if (!this.session || !this.inventoryScreen.isVisible()) {
      return;
    }

    this.interactInventorySlot(event.index, event.button, event.shift);
  }

  private handleHudHotbarInteract(event: HotbarInteractEvent): void {
    if (!this.session || !this.inventoryScreen.isVisible()) {
      return;
    }

    const absoluteIndex = INVENTORY_LAYOUT.hotbarStart + event.index;
    const shiftHeld =
      this.input.isKeyDown('ShiftLeft') ||
      this.input.isKeyDown('ShiftRight') ||
      event.shift;
    this.interactInventorySlot(absoluteIndex, event.button, shiftHeld);
  }

  private handleInventoryCursorDrop(): void {
    if (!this.session || !this.inventoryScreen.isVisible()) {
      return;
    }

    if (this.inventoryCursor.blockId === null || this.inventoryCursor.count <= 0) {
      return;
    }

    this.throwItemsFromPlayer(this.inventoryCursor.blockId, this.inventoryCursor.count);
    this.inventoryCursor = { blockId: null, count: 0 };
    this.refreshInventoryScreen();
    void this.persistProfile(true);
  }

  private dropSelectedHotbarFromKeybind(): void {
    if (!this.session) {
      return;
    }

    const inventory = this.session.inventory;
    const selectedIndex = inventory.getSelectedAbsoluteSlotIndex();
    const selected = inventory.getSlot(selectedIndex);
    if (selected.blockId === null || selected.count <= 0) {
      return;
    }

    const dropWholeStack = this.input.isKeyDown('ControlLeft') || this.input.isKeyDown('ControlRight');
    const dropCount = dropWholeStack ? selected.count : 1;
    const remaining = selected.count - dropCount;

    inventory.setSlot(
      selectedIndex,
      remaining > 0 ? { blockId: selected.blockId, count: remaining } : { blockId: null, count: 0 },
    );
    this.throwItemsFromPlayer(selected.blockId, dropCount);

    this.markHotbarDirty();
    this.syncHotbarHud();
    this.updateFirstPersonHandVisibility(inventory);
    if (this.inventoryScreen.isVisible()) {
      this.refreshInventoryScreen();
    }
    void this.persistProfile(true);
  }

  private throwItemsFromPlayer(blockId: BlockId, count: number): void {
    if (!this.session || count <= 0) {
      return;
    }

    const origin = this.session.player.getCameraPosition();
    const direction = this.session.player.getLookDirection();
    const startX = origin.x + direction.x * 0.5;
    const startY = origin.y - 0.25 + direction.y * 0.25;
    const startZ = origin.z + direction.z * 0.5;

    for (let index = 0; index < count; index += 1) {
      const spread = 0.32;
      const speed = 5.2 + Math.random() * 0.9;
      const velocity: [number, number, number] = [
        direction.x * speed + (Math.random() - 0.5) * spread,
        direction.y * speed * 0.42 + 1.35 + (Math.random() - 0.5) * 0.24,
        direction.z * speed + (Math.random() - 0.5) * spread,
      ];
      this.spawnDroppedItem(blockId, startX, startY, startZ, velocity, DROP_PICKUP_DELAY_MS);
    }
  }

  private interactInventorySlot(index: number, button: 'left' | 'right', shift: boolean): void {
    if (!this.session) {
      return;
    }

    if (index < 0 || index >= INVENTORY_LAYOUT.totalSlotCount) {
      return;
    }

    const inventory = this.session.inventory;
    if (shift && this.inventoryCursor.blockId === null) {
      if (this.transferStackBetweenSections(inventory, index)) {
        this.markHotbarDirty();
        this.refreshInventoryScreen();
      }
      return;
    }

    const slot = inventory.getSlot(index);

    if (button === 'left') {
      if (this.inventoryCursor.blockId === null || this.inventoryCursor.count === 0) {
        if (slot.blockId === null || slot.count === 0) {
          return;
        }
        this.inventoryCursor = inventory.pickUpSlot(index);
      } else {
        this.inventoryCursor = inventory.placeCursor(index, this.inventoryCursor);
      }
    } else {
      this.inventoryCursor = this.handleRightClickInventory(
        inventory,
        index,
        slot,
        this.inventoryCursor,
      );
    }

    this.markHotbarDirty();
    this.refreshInventoryScreen();
  }

  private handleCraftRecipe(recipeId: string): void {
    if (!this.session || !this.inventoryScreen.isVisible()) {
      return;
    }

    const recipe = getRecipesForMode(this.inventoryMode).find((candidate) => candidate.id === recipeId);
    if (!recipe) {
      return;
    }

    if (craftRecipe(this.session.inventory, recipe)) {
      this.session.worldStats.craftedItems += recipe.output.count;
      this.globalStats.totalCraftedItems += recipe.output.count;
      this.refreshInventoryScreen();
      this.markHotbarDirty();
      this.syncHotbarHud();
      void this.persistProfile(true);
    }
  }

  private syncChunkMeshes(): void {
    if (!this.session) {
      return;
    }

    const world = this.session.world;
    for (const chunkKey of world.drainRemovedChunkKeys()) {
      this.renderer.removeChunkMesh(chunkKey);
    }

    const startedAt = performance.now();
    while (performance.now() - startedAt <= CHUNK_MESH_SYNC_BUDGET_MS) {
      const [chunk] = world.drainMeshUpdates(1);
      if (!chunk) {
        break;
      }

      const geometry = ChunkMesher.buildGeometry(chunk, world, this.renderer.atlas);
      this.renderer.upsertChunkMesh(
        chunk.key,
        geometry,
        world.getChunkOrigin(chunk.key),
      );
    }
  }

  private async saveDirtyChunks(): Promise<void> {
    if (!this.session) {
      return;
    }

    const records = this.session.world.drainDirtyDiffs();
    if (records.length === 0) {
      return;
    }

    await this.saveRepository.saveChunkDiffs(this.session.id, records);
  }

  private resetMining(): void {
    this.miningTargetKey = null;
    this.miningProgressMs = 0;
    this.hud.setMiningProgress(0);
  }

  private updateDebugPanel(playerX: number, playerY: number, playerZ: number): void {
    if (!this.session) {
      return;
    }

    const chunkCoord = this.session.world.getPlayerChunkCoord(playerX, playerZ);
    const weatherDebug = this.weatherController.getDebugState();
    this.debugOverlay.update(
      [
        `FPS: ${this.fpsValue}`,
        `POS: ${playerX.toFixed(2)}, ${playerY.toFixed(2)}, ${playerZ.toFixed(2)}`,
        `CHUNK: ${chunkCoord.x}, ${chunkCoord.z}`,
        `LOADED: ${this.session.world.getChunkCount()}`,
        `STREAM: ${this.session.world.hasPendingGeneration() || this.session.world.hasPendingMeshes() ? 'busy' : 'steady'}`,
        `SEED: ${this.session.seed}`,
        `WEATHER: ${weatherDebug.preset} (${weatherDebug.mode})`,
        `CLOUDS: ${Math.round(weatherDebug.visual.cloudCoverage * 100)}% | RAIN: ${Math.round(weatherDebug.visual.rainIntensity * 100)}%`,
        `MODE: ${this.inventoryScreen.isVisible() ? this.inventoryMode : 'play'}`,
      ].join('\n'),
    );
  }

  private updateFirstPersonHandVisibility(inventory: Inventory): void {
    const selectedSlot = inventory.getSlot(inventory.getSelectedAbsoluteSlotIndex());
    const hasHeldBlock = selectedSlot.blockId !== null && selectedSlot.count > 0;
    const firstPersonVisible =
      (this.input.isPointerLocked() || this.chat.isOpen()) &&
      !this.menu.isVisible() &&
      !this.inventoryScreen.isVisible();
    this.renderer.setFirstPersonAnimationPreset(hasHeldBlock ? 'item' : 'hand');
    this.renderer.setFirstPersonHandVisible(firstPersonVisible);
    this.renderer.setFirstPersonHeldBlock(
      firstPersonVisible && hasHeldBlock ? selectedSlot.blockId : null,
    );
  }

  private createSafePlayerState(candidate: PlayerState, world: World): PlayerState {
    const fallback = SpawnResolver.resolve(world);
    const safeSpawn = this.canStandAt(world, candidate.spawnPoint) ? candidate.spawnPoint : fallback;
    const safePosition = this.canStandAt(world, candidate.position) ? candidate.position : safeSpawn;

    return {
      position: [...safePosition],
      velocity: [0, 0, 0],
      yaw: Number.isFinite(candidate.yaw) ? candidate.yaw : 0,
      pitch: Number.isFinite(candidate.pitch)
        ? Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, candidate.pitch))
        : 0,
      selectedSlot: Math.max(0, Math.min(8, candidate.selectedSlot | 0)),
      spawnPoint: [...safeSpawn],
    };
  }

  private canStandAt(world: World, position: [number, number, number]): boolean {
    const [x, y, z] = position;
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      return false;
    }
    if (y < 1 || y > WORLD_CONFIG.chunkSizeY - 2) {
      return false;
    }

    const feetY = Math.floor(y);
    const headY = Math.floor(y + 1);
    const belowY = feetY - 1;
    const samplePoints: Array<[number, number]> = [
      [x, z],
      [x - 0.28, z - 0.28],
      [x + 0.28, z - 0.28],
      [x - 0.28, z + 0.28],
      [x + 0.28, z + 0.28],
    ];

    const belowSolid = samplePoints.some(([sampleX, sampleZ]) =>
      isSolidBlock(world.getBlock(Math.floor(sampleX), belowY, Math.floor(sampleZ))),
    );
    if (!belowSolid) {
      return false;
    }

    return samplePoints.every(([sampleX, sampleZ]) => {
      const blockX = Math.floor(sampleX);
      const blockZ = Math.floor(sampleZ);
      return world.getBlock(blockX, feetY, blockZ) === 0 && world.getBlock(blockX, headY, blockZ) === 0;
    });
  }

  private handleResize(): void {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private updatePointerUnlockPromptVisibility(): void {
    const showPrompt =
      !!this.session &&
      !this.chat.isOpen() &&
      !this.menu.isVisible() &&
      !this.inventoryScreen.isVisible() &&
      !this.input.isPointerLocked();
    this.hud.setPointerUnlockPromptVisible(showPrompt);
  }

  private handlePointerLockChange(locked: boolean): void {
    if (!this.session) {
      return;
    }

    if (locked) {
      this.resumePointerLockPending = false;
      this.menu.hide();
      if (!this.inventoryScreen.isVisible()) {
        this.hud.setVisible(true);
      }
      this.updatePointerUnlockPromptVisibility();
      return;
    }

    if (this.resumePointerLockPending) {
      this.hud.setPointerUnlockPromptVisible(false);
      return;
    }

    if (!this.menu.isVisible() && !this.inventoryScreen.isVisible()) {
      this.hud.setVisible(true);
      this.hud.setInventoryOverlayActive(false);
    }
    this.updatePointerUnlockPromptVisibility();
  }

  private handleEscapeKeyDown(event: KeyboardEvent): void {
    if (event.code !== 'Escape' || event.repeat || !this.session) {
      return;
    }

    if (this.chat.isOpen()) {
      event.preventDefault();
      this.input.consumeJustPressedKey('Escape');
      this.closeChat();
      return;
    }

    if (this.inventoryScreen.isVisible()) {
      event.preventDefault();
      this.pauseShortcutLatch = true;
      this.input.consumeJustPressedKey('Escape');
      void this.closeInventory(false, true);
      return;
    }

    if (!this.menu.isVisible()) {
      this.hud.setPointerUnlockPromptVisible(true);
      return;
    }

    event.preventDefault();
    if (this.menu.handleEscapeShortcut()) {
      this.pauseShortcutLatch = true;
      this.input.consumeJustPressedKey('Escape');
    }
  }

  private handleBeforeUnload(): void {
    if (this.introSplashTimeoutId !== null) {
      window.clearTimeout(this.introSplashTimeoutId);
      this.introSplashTimeoutId = null;
    }
    if (this.entryGateDelayTimeoutId !== null) {
      window.clearTimeout(this.entryGateDelayTimeoutId);
      this.entryGateDelayTimeoutId = null;
    }
    this.stopMenuMusic();
    void this.flushSaves();
  }

  private async flushSaves(): Promise<void> {
    if (!this.session) {
      return;
    }

    await this.persistProfile(true);
    const preview = this.captureWorldPreviewPng();
    if (preview) {
      await this.saveRepository.saveWorldPreview(this.session.id, preview);
    }
    await this.saveRepository.saveChunkDiffs(this.session.id, this.session.world.getAllDiffRecords());
  }

  private spawnDroppedItem(
    blockId: BlockId,
    x: number,
    y: number,
    z: number,
    initialVelocity?: [number, number, number],
    pickupDelayMs = 0,
  ): void {
    const id = `drop-${++this.dropSequence}`;
    const velocity: [number, number, number] = initialVelocity
      ? [initialVelocity[0], initialVelocity[1], initialVelocity[2]]
      : [
          (Math.random() - 0.5) * 2.6,
          2.5 + Math.random() * 1.6,
          (Math.random() - 0.5) * 2.6,
        ];
    const dropped: DroppedItem = {
      id,
      blockId,
      position: [x, y, z],
      velocity,
      ageMs: 0,
      pickupDelayMs,
      wasInWater: false,
      waterOutflowExitImpulse: [0, 0],
    };
    this.droppedItems.set(id, dropped);
    this.renderer.spawnDroppedItem(id, blockId, x, y, z);
  }

  private updateDroppedItems(dt: number): void {
    if (!this.session || this.droppedItems.size === 0) {
      return;
    }

    const { world, player, inventory } = this.session;
    const playerPosition = player.getPosition();
    const pickupRadiusSquared = 1.9 * 1.9;
    const magnetRadius = 5.5;
    const magnetRadiusSquared = magnetRadius * magnetRadius;
    const gravity = 18;

    for (const [id, item] of this.droppedItems.entries()) {
      item.ageMs += dt * 1000;
      const wasInWater = item.wasInWater;
      const waterContact = this.sampleWaterContactAtPoint(
        world,
        item.position[0],
        item.position[1],
        item.position[2],
      );
      const inWater = waterContact.inWater;

      if (inWater) {
        item.velocity[0] *= 0.9;
        item.velocity[2] *= 0.9;
        let flowVelocityX = 0;
        let flowVelocityZ = 0;
        if (waterContact.flowMagnitude > 0) {
          const flowAcceleration = ITEM_WATER_FLOW_ACCELERATION * waterContact.flowMagnitude;
          flowVelocityX += waterContact.flowX * flowAcceleration * dt;
          flowVelocityZ += waterContact.flowZ * flowAcceleration * dt;
        }
        if (waterContact.outflowMagnitude > 0) {
          const outflowAcceleration = ITEM_WATER_OUTFLOW_ACCELERATION * waterContact.outflowMagnitude;
          flowVelocityX += waterContact.outflowX * outflowAcceleration * dt;
          flowVelocityZ += waterContact.outflowZ * outflowAcceleration * dt;
        }
        item.velocity[0] += flowVelocityX;
        item.velocity[2] += flowVelocityZ;

        const outflowImpulseX = waterContact.outflowX * waterContact.outflowMagnitude;
        const outflowImpulseZ = waterContact.outflowZ * waterContact.outflowMagnitude;
        const outflowImpulseMagnitude = Math.hypot(outflowImpulseX, outflowImpulseZ);
        if (outflowImpulseMagnitude > 0.0001) {
          item.waterOutflowExitImpulse[0] =
            (outflowImpulseX / outflowImpulseMagnitude) *
            (outflowImpulseMagnitude * ITEM_WATER_OUTFLOW_EXIT_IMPULSE_SCALE);
          item.waterOutflowExitImpulse[1] =
            (outflowImpulseZ / outflowImpulseMagnitude) *
            (outflowImpulseMagnitude * ITEM_WATER_OUTFLOW_EXIT_IMPULSE_SCALE);
        } else {
          item.waterOutflowExitImpulse[0] *= 0.5;
          item.waterOutflowExitImpulse[1] *= 0.5;
        }
        item.velocity[1] -= 3.5 * dt;
        if (item.velocity[1] < -1.4) {
          item.velocity[1] = -1.4;
        }
      } else {
        if (wasInWater) {
          item.velocity[0] += item.waterOutflowExitImpulse[0];
          item.velocity[2] += item.waterOutflowExitImpulse[1];
        }
        item.waterOutflowExitImpulse[0] *= 0.35;
        item.waterOutflowExitImpulse[1] *= 0.35;
        item.velocity[1] -= gravity * dt;
      }
      item.wasInWater = inWater;

      item.position[0] += item.velocity[0] * dt;
      item.position[1] += item.velocity[1] * dt;
      item.position[2] += item.velocity[2] * dt;

      const belowY = Math.floor(item.position[1] - 0.14);
      const belowId = world.getBlock(Math.floor(item.position[0]), belowY, Math.floor(item.position[2]));
      if (isSolidBlock(belowId) && item.velocity[1] <= 0) {
        item.position[1] = belowY + 1 + 0.14;
        item.velocity[1] = inWater ? -0.2 : 0;
        item.velocity[0] *= 0.72;
        item.velocity[2] *= 0.72;
      }

      const dx = playerPosition[0] - item.position[0];
      const dy = playerPosition[1] + 0.8 - item.position[1];
      const dz = playerPosition[2] - item.position[2];
      const distanceSquared = dx * dx + dy * dy + dz * dz;

      if (item.ageMs > item.pickupDelayMs && distanceSquared < magnetRadiusSquared) {
        const distance = Math.max(0.0001, Math.sqrt(distanceSquared));
        const pull = Math.max(0, Math.min(1, (magnetRadius - distance) / magnetRadius));
        const pullForce = (inWater ? 5.6 : 11.5) * (0.25 + pull * 1.35);
        const invDistance = 1 / distance;
        item.velocity[0] += dx * invDistance * pullForce * dt;
        item.velocity[1] += dy * invDistance * pullForce * dt * 0.58;
        item.velocity[2] += dz * invDistance * pullForce * dt;

        const horizontalSpeed = Math.hypot(item.velocity[0], item.velocity[2]);
        const maxHorizontalSpeed = inWater ? 3.1 : 6.3;
        if (horizontalSpeed > maxHorizontalSpeed) {
          const scale = maxHorizontalSpeed / horizontalSpeed;
          item.velocity[0] *= scale;
          item.velocity[2] *= scale;
        }
      }

      if (
        item.ageMs > item.pickupDelayMs &&
        distanceSquared < pickupRadiusSquared &&
        inventory.addBlock(item.blockId)
      ) {
        this.droppedItems.delete(id);
        this.renderer.removeDroppedItem(id);
        this.markHotbarDirty();
        this.syncHotbarHud();
        continue;
      }

      if (item.ageMs > 120000) {
        this.droppedItems.delete(id);
        this.renderer.removeDroppedItem(id);
        continue;
      }

      const bob = 0.08 * Math.sin(item.ageMs * 0.008);
      const yaw = item.ageMs * 0.0032;
      this.renderer.updateDroppedItem(id, item.position[0], item.position[1], item.position[2], yaw, bob);
    }
  }

  private sampleWaterContactAtPoint(
    world: World,
    x: number,
    y: number,
    z: number,
  ): {
    inWater: boolean;
    flowX: number;
    flowZ: number;
    flowMagnitude: number;
    outflowX: number;
    outflowZ: number;
    outflowMagnitude: number;
  } {
    const blockX = Math.floor(x);
    const blockY = Math.floor(y);
    const blockZ = Math.floor(z);
    const blockId = world.getBlock(blockX, blockY, blockZ);
    if (!isWaterBlock(blockId)) {
      return {
        inWater: false,
        flowX: 0,
        flowZ: 0,
        flowMagnitude: 0,
        outflowX: 0,
        outflowZ: 0,
        outflowMagnitude: 0,
      };
    }

    const level = getWaterLevel(blockId);
    const aboveBlock = world.getBlock(blockX, blockY + 1, blockZ);
    const isPartialFlow = level !== null && !isWaterSource(blockId) && !isWaterBlock(aboveBlock);
    if (isPartialFlow) {
      const fluidTopY = blockY + waterLevelToSurfaceHeight(level);
      if (y >= fluidTopY) {
        return {
          inWater: false,
          flowX: 0,
          flowZ: 0,
          flowMagnitude: 0,
          outflowX: 0,
          outflowZ: 0,
          outflowMagnitude: 0,
        };
      }
    }

    const flow = world.getFlowVectorForWaterCell(blockX, blockY, blockZ);
    return {
      inWater: true,
      flowX: flow.x,
      flowZ: flow.z,
      flowMagnitude: flow.magnitude,
      outflowX: flow.x,
      outflowZ: flow.z,
      outflowMagnitude: flow.edgeBoost,
    };
  }

  private trackMovementStats(
    before: [number, number, number],
    after: [number, number, number],
    dt: number,
    frameUpdate: PlayerFrameUpdate,
  ): void {
    if (!this.session) {
      return;
    }

    const dx = after[0] - before[0];
    const dy = after[1] - before[1];
    const dz = after[2] - before[2];
    const distance = Math.hypot(dx, dy, dz);
    this.movementIntensity = Math.max(
      0,
      Math.min(1.15, distance / Math.max(0.0001, PLAYER_CONFIG.sprintSpeed * dt)),
    );

    this.session.worldStats.distanceTravelled += distance;
    this.globalStats.totalDistanceTravelled += distance;
    this.session.worldStats.playTimeMs += dt * 1000;
    this.globalStats.totalPlayTimeMs += dt * 1000;
    if (frameUpdate.jumped) {
      this.session.worldStats.jumps += 1;
      this.globalStats.totalJumps += 1;
    }
  }

  private updateLevelHud(): void {
    if (!this.session) {
      return;
    }

    const blocksForLevel = 28;
    const level = Math.floor(this.session.worldStats.blocksMined / blocksForLevel) + 1;
    const progress = (this.session.worldStats.blocksMined % blocksForLevel) / blocksForLevel;
    this.hud.setLevel(level, progress);
  }

  private buildEnvironmentState(): WorldEnvironmentState {
    return {
      timeOfDay: this.timeOfDay,
      moonPhase: this.moonPhase,
      weather: this.weatherController.getWeatherState(),
    };
  }

  private async persistProfile(saveGlobal: boolean): Promise<void> {
    if (!this.session) {
      return;
    }

    this.session.environment = this.buildEnvironmentState();

    await this.saveRepository.savePlayer(
      this.session.id,
      this.session.player.getState(),
      this.session.inventory.snapshot(),
      this.session.worldStats,
      this.session.environment,
    );

    if (saveGlobal) {
      await this.saveRepository.saveGlobalStats(this.globalStats);
    }
  }

  private applySettings(settings: GameSettings): void {
    const keyBindings = cloneBindings(settings.keyBindings);
    keyBindings.pause.primary = PAUSE_MENU_KEY;
    keyBindings.pause.secondary = null;
    this.settings = {
      keyBindings,
      skinDataUrl: settings.skinDataUrl,
      startFullscreen: settings.startFullscreen,
      interfaceSize: normalizeInterfaceSize(settings.interfaceSize),
      language: settings.language,
      developerDebugMode: settings.developerDebugMode,
    };
    setCurrentLanguage(this.settings.language);
    this.applyInterfaceZoom(this.settings.interfaceSize);
    this.menu.setSettings(this.settings);
    this.hud.setHandSkin(this.settings.skinDataUrl);
    this.hud.setLanguage(this.settings.language);
    this.chat.setLanguage(this.settings.language);
    this.inventoryScreen.setLanguage(this.settings.language);
    this.updateWorldLoadingLabel();
    if (!this.settings.developerDebugMode) {
      this.hud.setGenerating(false);
    }
    this.renderer.setPlayerSkin(this.settings.skinDataUrl);
    void this.saveRepository.saveSettings(this.settings);
    if (this.inventoryScreen.isVisible()) {
      this.refreshInventoryScreen();
    }
  }

  private applyInterfaceZoom(interfaceSize: number): void {
    const zoomPercent = getInterfaceZoomPercent(interfaceSize);
    this.root.style.setProperty('zoom', `${zoomPercent}%`);
    this.root.style.setProperty('--ui-zoom-factor', `${zoomPercent / 100}`);
  }

  private normalizeWorldStats(stats: WorldStats | undefined): WorldStats {
    if (!stats) {
      return createEmptyWorldStats();
    }

    const read = (value: number | undefined): number => (Number.isFinite(value) ? Number(value) : 0);
    return {
      blocksMined: read(stats.blocksMined),
      blocksPlaced: read(stats.blocksPlaced),
      distanceTravelled: read(stats.distanceTravelled),
      playTimeMs: read(stats.playTimeMs),
      jumps: read(stats.jumps),
      craftedItems: read(stats.craftedItems),
    };
  }

  private handleRightClickInventory(
    inventory: Inventory,
    index: number,
    slot: InventorySlot,
    cursor: InventorySlot,
  ): InventorySlot {
    const emptyCursor = cursor.blockId === null || cursor.count <= 0;

    if (emptyCursor) {
      if (slot.blockId === null || slot.count <= 0) {
        return { blockId: null, count: 0 };
      }
      const pickup = Math.ceil(slot.count / 2);
      inventory.setSlot(index, {
        blockId: slot.blockId,
        count: slot.count - pickup,
      });
      if (slot.count - pickup <= 0) {
        inventory.setSlot(index, { blockId: null, count: 0 });
      }
      return {
        blockId: slot.blockId,
        count: pickup,
      };
    }

    if (slot.blockId === null || slot.count <= 0) {
      inventory.setSlot(index, {
        blockId: cursor.blockId,
        count: 1,
      });
      const next = cursor.count - 1;
      return next > 0
        ? {
            blockId: cursor.blockId,
            count: next,
          }
        : { blockId: null, count: 0 };
    }

    if (slot.blockId !== cursor.blockId || slot.count >= MAX_STACK) {
      return cursor;
    }

    inventory.setSlot(index, {
      blockId: slot.blockId,
      count: Math.min(MAX_STACK, slot.count + 1),
    });
    const next = cursor.count - 1;
    return next > 0
      ? {
          blockId: cursor.blockId,
          count: next,
        }
      : { blockId: null, count: 0 };
  }

  private transferStackBetweenSections(inventory: Inventory, fromIndex: number): boolean {
    const source = inventory.getSlot(fromIndex);
    if (source.blockId === null || source.count <= 0) {
      return false;
    }

    const toRange =
      fromIndex < INVENTORY_LAYOUT.hotbarStart
        ? [INVENTORY_LAYOUT.hotbarStart, INVENTORY_LAYOUT.totalSlotCount - 1] as const
        : [0, INVENTORY_LAYOUT.hotbarStart - 1] as const;
    let remaining = source.count;

    for (let index = toRange[0]; index <= toRange[1]; index += 1) {
      const target = inventory.getSlot(index);
      if (target.blockId !== source.blockId || target.count >= MAX_STACK) {
        continue;
      }

      const transfer = Math.min(MAX_STACK - target.count, remaining);
      inventory.setSlot(index, {
        blockId: target.blockId,
        count: target.count + transfer,
      });
      remaining -= transfer;
      if (remaining === 0) {
        break;
      }
    }

    for (let index = toRange[0]; index <= toRange[1] && remaining > 0; index += 1) {
      const target = inventory.getSlot(index);
      if (target.blockId !== null && target.count > 0) {
        continue;
      }

      const transfer = Math.min(MAX_STACK, remaining);
      inventory.setSlot(index, {
        blockId: source.blockId,
        count: transfer,
      });
      remaining -= transfer;
    }

    if (remaining === source.count) {
      return false;
    }

    if (remaining <= 0) {
      inventory.setSlot(fromIndex, { blockId: null, count: 0 });
    } else {
      inventory.setSlot(fromIndex, {
        blockId: source.blockId,
        count: remaining,
      });
    }
    return true;
  }

  private async playMenuMusic(): Promise<void> {
    if (!this.menuMusic.paused) {
      return;
    }

    try {
      await this.menuMusic.play();
      this.unregisterMenuMusicUnlock();
    } catch {
      this.registerMenuMusicUnlock();
    }
  }

  private stopMenuMusic(): void {
    this.menuMusic.pause();
    this.menuMusic.currentTime = 0;
    this.unregisterMenuMusicUnlock();
  }

  private registerMenuMusicUnlock(): void {
    if (this.menuMusicUnlockRegistered) {
      return;
    }

    this.menuMusicUnlockRegistered = true;
    window.addEventListener('pointerdown', this.handleMenuMusicUnlock);
    window.addEventListener('keydown', this.handleMenuMusicUnlock);
  }

  private unregisterMenuMusicUnlock(): void {
    if (!this.menuMusicUnlockRegistered) {
      return;
    }

    this.menuMusicUnlockRegistered = false;
    window.removeEventListener('pointerdown', this.handleMenuMusicUnlock);
    window.removeEventListener('keydown', this.handleMenuMusicUnlock);
  }

  private handleMenuMusicUnlock(): void {
    void this.playMenuMusic();
  }

  private handleEntryGateClick(): void {
    if (this.entryGateDismissed || this.entryGateActivated) {
      return;
    }

    this.entryGateActivated = true;
    this.entryGateDelayElapsed = false;
    this.entryGateButton.disabled = true;
    this.entryGateButton.classList.add('text-only');
    this.entryGateButton.textContent = this.entryGateReady ? 'Entree...' : 'Chargement...';
    if (this.settings.startFullscreen) {
      void this.requestFullscreen();
    }
    this.showIntroSplash();
    if (this.entryGateDelayTimeoutId !== null) {
      window.clearTimeout(this.entryGateDelayTimeoutId);
    }
    this.entryGateDelayTimeoutId = window.setTimeout(() => {
      this.entryGateDelayElapsed = true;
      this.entryGateDelayTimeoutId = null;
      this.finishEntryGate();
    }, INTRO_SPLASH_MIN_VISIBLE_MS);
    void this.playMenuMusic();
    this.finishEntryGate();
  }

  private finishEntryGate(): void {
    if (!this.entryGateReady || this.entryGateDismissed || !this.entryGateActivated || !this.entryGateDelayElapsed) {
      return;
    }
    this.entryGateDismissed = true;
    this.entryGate.remove();
    this.menu.showBoot();
  }

  private showIntroSplash(): void {
    this.introSplash.classList.remove('active');
    void this.introSplash.offsetWidth;
    this.introSplash.classList.add('active');

    if (this.introSplashTimeoutId !== null) {
      window.clearTimeout(this.introSplashTimeoutId);
    }
    this.introSplashTimeoutId = window.setTimeout(() => {
      this.introSplash.classList.remove('active');
      this.introSplashTimeoutId = null;
    }, INTRO_SPLASH_DURATION_MS);
  }

  private async requestFullscreen(): Promise<void> {
    if (document.fullscreenElement) {
      return;
    }

    try {
      await this.shell.requestFullscreen();
    } catch {
      // Ignore unsupported or denied fullscreen requests.
    }
  }
}
