export const WORLD_CONFIG = {
  chunkSizeX: 16,
  chunkSizeY: 96,
  chunkSizeZ: 16,
  loadRadius: 3,
  preloadRadius: 4,
  maxInteractionDistance: 6,
  generationBudgetPerFrame: 1,
  meshBudgetPerFrame: 1,
  skyColor: '#9cc7f5',
} as const;

export const PLAYER_CONFIG = {
  walkSpeed: 4.4,
  sprintSpeed: 7,
  crouchSpeed: 2.2,
  jumpVelocity: 7.2,
  gravity: 22,
  colliderWidth: 0.6,
  colliderHeight: 1.8,
  eyeHeight: 1.62,
  crouchEyeHeight: 1.15,
  mouseSensitivity: 0.0025,
  sprintDoubleTapWindowMs: 260,
} as const;

export const SAVE_CONFIG = {
  schemaVersion: 4 as const,
  worldId: 'default-world' as const,
  playerSaveIntervalMs: 2000,
  worldSaveDebounceMs: 500,
} as const;
