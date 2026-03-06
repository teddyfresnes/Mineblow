import { PLAYER_CONFIG, SAVE_CONFIG, WORLD_CONFIG } from './Config';
import {
  cloneBindings,
  createDefaultSettings,
  type GameSettings,
} from './Controls';
import { GameLoop } from './GameLoop';
import { Inventory, MAX_STACK } from '../inventory/Inventory';
import {
  canCraftRecipe,
  craftRecipe,
  getRecipesForMode,
  type CraftingMode,
} from '../inventory/RecipeBook';
import { InputController } from '../player/InputController';
import { PlayerController, type PlayerFrameUpdate } from '../player/PlayerController';
import { SpawnResolver } from '../player/SpawnResolver';
import { ChunkMesher } from '../render/ChunkMesher';
import { Renderer } from '../render/Renderer';
import { SaveRepository, type LoadedWorld } from '../save/SaveRepository';
import type { BlockId } from '../types/blocks';
import type { InventorySlot, PlayerState } from '../types/player';
import {
  createEmptyGlobalStats,
  createEmptyWorldStats,
  type GlobalStats,
  type WorldStats,
} from '../types/save';
import type { VoxelHit } from '../types/world';
import { debounce } from '../utils/debounce';
import { DebugOverlay } from '../ui/DebugOverlay';
import { Hud } from '../ui/Hud';
import {
  InventoryScreen,
  type InventoryScreenState,
  type SlotInteractEvent,
} from '../ui/InventoryScreen';
import { StartMenu } from '../ui/StartMenu';
import {
  getMineDurationMs,
  getUiBlockColor,
  isMineableBlock,
  isPlaceableBlock,
  isSolidBlock,
  isWaterBlock,
} from '../world/BlockRegistry';
import { VoxelRaycaster } from '../world/VoxelRaycaster';
import { World } from '../world/World';

interface Session {
  seed: string;
  world: World;
  player: PlayerController;
  inventory: Inventory;
  worldStats: WorldStats;
}

interface DroppedItem {
  id: string;
  blockId: BlockId;
  position: [number, number, number];
  velocity: [number, number, number];
  ageMs: number;
}

const EMPTY_CURSOR: InventorySlot = {
  blockId: null,
  count: 0,
};
const PRIMARY_MINING_HOLD_MS = 120;
const PRIMARY_PUNCH_LOCK_MS = 0;

export class Game {
  private readonly shell = document.createElement('div');
  private readonly canvas = document.createElement('canvas');
  private readonly renderer: Renderer;
  private readonly input: InputController;
  private readonly menu: StartMenu;
  private readonly hud: Hud;
  private readonly debugOverlay: DebugOverlay;
  private readonly inventoryScreen: InventoryScreen;
  private readonly saveRepository = new SaveRepository();
  private readonly gameLoop: GameLoop;
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
  private readonly droppedItems = new Map<string, DroppedItem>();

  constructor(private readonly root: HTMLElement) {
    this.shell.className = 'mineblow-shell';
    this.canvas.className = 'mineblow-canvas';
    this.shell.append(this.canvas);
    this.root.append(this.shell);

    this.renderer = new Renderer(this.canvas);
    this.input = new InputController(this.canvas);
    this.hud = new Hud(this.shell);
    this.debugOverlay = new DebugOverlay(this.shell);
    this.inventoryScreen = new InventoryScreen(this.shell, {
      onClose: () => {
        void this.closeInventory();
      },
      onSlotInteract: (event) => {
        this.handleInventorySlotInteract(event);
      },
      onRecipeCraft: (recipeId) => {
        this.handleCraftRecipe(recipeId);
      },
      onSkinChange: (skinDataUrl) => {
        this.applySettings({
          keyBindings: cloneBindings(this.settings.keyBindings),
          skinDataUrl,
        });
      },
    });
    this.menu = new StartMenu(this.shell, {
      onContinue: () => {
        void this.continueWorld();
      },
      onNewGame: (seed) => {
        void this.startNewWorld(seed);
      },
      onResume: () => {
        void this.resumeSession();
      },
      onSettingsChange: (settings) => {
        this.applySettings(settings);
      },
    });

    this.gameLoop = new GameLoop(1 / 60, (dt) => this.update(dt), () => this.render());
    this.handleResize = this.handleResize.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
  }

  async bootstrap(): Promise<void> {
    this.input.connect();
    this.input.setPointerLockListener(this.handlePointerLockChange);
    this.hud.setVisible(false);
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    const [continueAvailable, settings, globalStats, worldSummary] = await Promise.all([
      this.saveRepository.hasContinueState(),
      this.saveRepository.loadSettings(),
      this.saveRepository.loadGlobalStats(),
      this.saveRepository.loadWorldSummary(),
    ]);

    this.settings = settings;
    this.globalStats = globalStats;
    this.menu.setContinueAvailable(continueAvailable);
    this.menu.setSettings(settings);
    this.menu.setGlobalStats(globalStats);
    this.menu.setWorldStats(worldSummary ? this.normalizeWorldStats(worldSummary.worldStats) : null);
    this.hud.setHandSkin(settings.skinDataUrl);
    this.menu.showBoot();
    this.gameLoop.start();
  }

  private async startNewWorld(seedInput: string): Promise<void> {
    const seed = seedInput || `mineblow-${Date.now().toString(36)}`;
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

    await this.saveRepository.clear();
    await this.saveRepository.createNewWorld(seed, playerState, inventory.snapshot(), worldStats);
    this.globalStats = await this.saveRepository.loadGlobalStats();
    this.menu.setGlobalStats(this.globalStats);
    this.menu.setWorldStats(worldStats);
    await this.activateSession({
      seed,
      world,
      player: new PlayerController(playerState),
      inventory,
      worldStats,
    });
    this.menu.setContinueAvailable(true);
  }

  private async continueWorld(): Promise<void> {
    const loaded = await this.saveRepository.loadWorld();
    if (!loaded) {
      this.menu.setContinueAvailable(false);
      this.menu.showBoot();
      return;
    }

    this.renderer.clearChunks();
    await this.activateLoadedWorld(loaded);
  }

  private async activateLoadedWorld(loaded: LoadedWorld): Promise<void> {
    const world = new World(loaded.save.seed, loaded.chunkDiffs);
    world.primeAround(loaded.save.player.position[0], loaded.save.player.position[2], 1);
    world.primeAround(0, 0, 1);
    const playerState = this.createSafePlayerState(loaded.save.player, world);
    const inventory = new Inventory(loaded.save.inventory, playerState.selectedSlot);
    const worldStats = this.normalizeWorldStats(loaded.save.worldStats);
    await this.activateSession({
      seed: loaded.save.seed,
      world,
      player: new PlayerController(playerState),
      inventory,
      worldStats,
    });
    this.menu.setWorldStats(worldStats);
  }

  private async activateSession(session: Session): Promise<void> {
    this.session = session;
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
    this.hud.setVisible(true);
    this.hud.setHandSkin(this.settings.skinDataUrl);
    this.renderer.setPlayerSkin(this.settings.skinDataUrl);
    this.updateFirstPersonHandVisibility(session.inventory);
    this.hud.updateHotbar(
      session.inventory.getHotbarSlots(),
      session.inventory.getSelectedHotbarIndex(),
    );
    this.hud.setGenerating(session.world.hasPendingGeneration() || session.world.hasPendingMeshes());
    await this.resumeSession();
  }

  private async resumeSession(): Promise<void> {
    this.hud.setVisible(true);
    this.menu.hide();
    try {
      await this.input.requestPointerLock();
    } catch {
      this.menu.showPause();
    }
  }

  private update(dt: number): void {
    const debugPressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.debug.primary,
      this.settings.keyBindings.debug.secondary,
      'F3',
    ]);
    if (debugPressed) {
      this.debugOverlay.toggle();
    }

    const inventoryPressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.inventory.primary,
      this.settings.keyBindings.inventory.secondary,
      'KeyI',
    ]);
    if (inventoryPressed) {
      if (this.inventoryScreen.isVisible()) {
        void this.closeInventory();
      } else if (this.session && !this.menu.isVisible()) {
        this.openInventory('player');
      }
    }

    const pausePressed = this.input.consumeAnyJustPressed([
      this.settings.keyBindings.pause.primary,
      this.settings.keyBindings.pause.secondary,
      'Escape',
    ]);
    if (this.inventoryScreen.isVisible() && pausePressed) {
      void this.closeInventory();
    }

    if (!this.session) {
      this.input.endFrame();
      return;
    }

    const { world, player, inventory, worldStats } = this.session;

    if (
      pausePressed &&
      this.input.isPointerLocked() &&
      !this.inventoryScreen.isVisible() &&
      !this.menu.isVisible()
    ) {
      this.input.exitPointerLock();
      this.menu.showPause();
      this.hud.setVisible(false);
    }

    if (!this.inventoryScreen.isVisible()) {
      const wheelSteps = this.input.consumeWheelSteps();
      if (wheelSteps !== 0) {
        inventory.shiftSelectedHotbar(wheelSteps);
        player.setSelectedSlot(inventory.getSelectedHotbarIndex());
      }

      const directSlot = this.input.consumeNumberSlot();
      if (directSlot !== null) {
        inventory.setSelectedHotbarIndex(directSlot);
        player.setSelectedSlot(inventory.getSelectedHotbarIndex());
      }
    }
    this.updateFirstPersonHandVisibility(inventory);

    const active =
      this.input.isPointerLocked() && !this.menu.isVisible() && !this.inventoryScreen.isVisible();
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
      this.updateDroppedItems(dt);
      this.hud.updateHand(dt, this.movementIntensity, this.miningProgressMs > 0);
      this.renderer.updateHand(dt, this.movementIntensity, this.miningProgressMs > 0);
      this.renderer.updateSpeedFov(
        dt,
        frameUpdate.sprinting,
        frameUpdate.moving,
        player.isGrounded(),
      );
    } else {
      this.input.consumePrimaryClick();
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

    this.renderer.updateTransientEffects(dt);

    world.enqueueStreamingAround(player.getPosition()[0], player.getPosition()[2]);
    world.processGenerationBudget();
    this.syncChunkMeshes();

    this.hud.updateHotbar(inventory.getHotbarSlots(), inventory.getSelectedHotbarIndex());
    this.hud.setGenerating(world.hasPendingGeneration() || world.hasPendingMeshes());
    this.hud.setFps(this.fpsValue);
    this.hud.setHealth(20, 20);
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
      this.menu.setWorldStats(worldStats);
    }

    const [playerX, playerY, playerZ] = player.getPosition();
    this.updateDebugPanel(playerX, playerY, playerZ);
    this.input.endFrame();
  }

  private render(): void {
    if (this.session) {
      const cameraPosition = this.session.player.getCameraPosition();
      const rotation = this.session.player.getRotation();
      this.renderer.setCameraTransform(cameraPosition, rotation.yaw, rotation.pitch);
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

    if (this.targetHit && this.input.consumeSecondaryClick()) {
      if (this.targetHit.blockId === 8) {
        this.openInventory('crafting_table');
        return;
      }

      const selectedBlock = inventory.getSelectedBlock();
      if (
        selectedBlock !== null &&
        isPlaceableBlock(selectedBlock) &&
        world.getBlock(
          this.targetHit.placeWorldX,
          this.targetHit.placeWorldY,
          this.targetHit.placeWorldZ,
        ) === 0 &&
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
        inventory.consumeSelectedBlock();
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

    this.inventoryMode = mode;
    this.inventoryScreen.setVisible(true);
    this.hud.setVisible(false);
    this.input.exitPointerLock();
    this.refreshInventoryScreen();
  }

  private async closeInventory(): Promise<void> {
    if (!this.session) {
      return;
    }

    this.inventoryCursor = this.session.inventory.returnCursor(this.inventoryCursor);
    if (this.inventoryCursor.blockId !== null && this.inventoryCursor.count > 0) {
      this.refreshInventoryScreen();
      return;
    }

    this.inventoryScreen.setVisible(false);
    await this.persistProfile(true);
    await this.resumeSession();
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

    const inventory = this.session.inventory;
    const index = event.index;
    if (event.shift && this.inventoryCursor.blockId === null) {
      if (this.transferStackBetweenSections(inventory, index)) {
        this.refreshInventoryScreen();
      }
      return;
    }

    const slot = inventory.getSlot(index);

    if (event.button === 'left') {
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
      this.hud.updateHotbar(
        this.session.inventory.getHotbarSlots(),
        this.session.inventory.getSelectedHotbarIndex(),
      );
      void this.persistProfile(true);
    }
  }

  private syncChunkMeshes(): void {
    if (!this.session) {
      return;
    }

    for (const chunkKey of this.session.world.drainRemovedChunkKeys()) {
      this.renderer.removeChunkMesh(chunkKey);
    }

    for (const chunk of this.session.world.drainMeshUpdates()) {
      const geometry = ChunkMesher.buildGeometry(chunk, this.session.world, this.renderer.atlas);
      this.renderer.upsertChunkMesh(
        chunk.key,
        geometry,
        this.session.world.getChunkOrigin(chunk.key),
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

    await this.saveRepository.saveChunkDiffs(records);
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
    this.debugOverlay.update(
      [
        `FPS: ${this.fpsValue}`,
        `POS: ${playerX.toFixed(2)}, ${playerY.toFixed(2)}, ${playerZ.toFixed(2)}`,
        `CHUNK: ${chunkCoord.x}, ${chunkCoord.z}`,
        `LOADED: ${this.session.world.getChunkCount()}`,
        `STREAM: ${this.session.world.hasPendingGeneration() || this.session.world.hasPendingMeshes() ? 'busy' : 'steady'}`,
        `SEED: ${this.session.seed}`,
        `MODE: ${this.inventoryScreen.isVisible() ? this.inventoryMode : 'play'}`,
      ].join('\n'),
    );
  }

  private updateFirstPersonHandVisibility(inventory: Inventory): void {
    const selectedSlot = inventory.getSlot(inventory.getSelectedAbsoluteSlotIndex());
    const visible = selectedSlot.blockId === null || selectedSlot.count <= 0;
    this.renderer.setFirstPersonAnimationPreset(visible ? 'hand' : 'item');
    this.renderer.setFirstPersonHandVisible(visible);
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

  private handlePointerLockChange(locked: boolean): void {
    if (!this.session) {
      return;
    }

    if (locked) {
      this.menu.hide();
      if (!this.inventoryScreen.isVisible()) {
        this.hud.setVisible(true);
      }
      return;
    }

    if (this.inventoryScreen.isVisible()) {
      return;
    }

    if (!this.menu.isVisible()) {
      this.menu.setGlobalStats(this.globalStats);
      this.menu.setWorldStats(this.session.worldStats);
      this.menu.showPause();
      this.hud.setVisible(false);
    }
  }

  private handleBeforeUnload(): void {
    void this.flushSaves();
  }

  private async flushSaves(): Promise<void> {
    if (!this.session) {
      return;
    }

    await this.persistProfile(true);
    await this.saveRepository.saveChunkDiffs(this.session.world.getAllDiffRecords());
  }

  private spawnDroppedItem(blockId: BlockId, x: number, y: number, z: number): void {
    const id = `drop-${++this.dropSequence}`;
    const velocity: [number, number, number] = [
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
    };
    this.droppedItems.set(id, dropped);
    this.renderer.spawnDroppedItem(id, getUiBlockColor(blockId), x, y, z);
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
      const blockAtItem = world.getBlock(
        Math.floor(item.position[0]),
        Math.floor(item.position[1]),
        Math.floor(item.position[2]),
      );
      const inWater = isWaterBlock(blockAtItem);

      if (inWater) {
        item.velocity[0] *= 0.9;
        item.velocity[2] *= 0.9;
        item.velocity[1] -= 3.5 * dt;
        if (item.velocity[1] < -1.4) {
          item.velocity[1] = -1.4;
        }
      } else {
        item.velocity[1] -= gravity * dt;
      }

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

      if (item.ageMs > 120 && distanceSquared < magnetRadiusSquared) {
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
        item.ageMs > 180 &&
        distanceSquared < pickupRadiusSquared &&
        inventory.addBlock(item.blockId)
      ) {
        this.droppedItems.delete(id);
        this.renderer.removeDroppedItem(id);
        this.hud.updateHotbar(inventory.getHotbarSlots(), inventory.getSelectedHotbarIndex());
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

  private async persistProfile(saveGlobal: boolean): Promise<void> {
    if (!this.session) {
      return;
    }

    await this.saveRepository.savePlayer(
      this.session.player.getState(),
      this.session.inventory.snapshot(),
      this.session.worldStats,
    );

    if (saveGlobal) {
      await this.saveRepository.saveGlobalStats(this.globalStats);
    }
  }

  private applySettings(settings: GameSettings): void {
    this.settings = {
      keyBindings: cloneBindings(settings.keyBindings),
      skinDataUrl: settings.skinDataUrl,
    };
    this.menu.setSettings(this.settings);
    this.hud.setHandSkin(this.settings.skinDataUrl);
    this.renderer.setPlayerSkin(this.settings.skinDataUrl);
    void this.saveRepository.saveSettings(this.settings);
    if (this.inventoryScreen.isVisible()) {
      this.refreshInventoryScreen();
    }
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

    const toRange = fromIndex < 27 ? [27, 35] as const : [0, 26] as const;
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
}
