import { WORLD_CONFIG } from './Config';
import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';
import { isSpecialKeyCode } from '../i18n/messages';

export const CONTROL_ACTIONS = [
  'moveForward',
  'moveBackward',
  'moveLeft',
  'moveRight',
  'jump',
  'crouch',
  'sprint',
  'inventory',
  'chat',
  'chatCommand',
  'drop',
  'debug',
  'pause',
] as const;

export type ControlAction = (typeof CONTROL_ACTIONS)[number];

export interface KeyBinding {
  primary: string | null;
  secondary: string | null;
}

export type KeyBindings = Record<ControlAction, KeyBinding>;

export interface GameSettings {
  keyBindings: KeyBindings;
  skinDataUrl: string | null;
  startFullscreen: boolean;
  interfaceSize: number;
  language: UiLanguage;
  developerDebugMode: boolean;
  renderDistanceChunks: number;
}

export const DEFAULT_INTERFACE_SIZE = 5;
export const MIN_INTERFACE_SIZE = 1;
export const MAX_INTERFACE_SIZE = 8;
export const DEFAULT_RENDER_DISTANCE_CHUNKS = WORLD_CONFIG.loadRadius;
export const MIN_RENDER_DISTANCE_CHUNKS = 1;
export const MAX_RENDER_DISTANCE_CHUNKS = WORLD_CONFIG.preloadRadius;
const DEFAULT_SKIN_URL = new URL('../../assets/skins/boys default/colin.png', import.meta.url).href;

export const getControlLabel = (
  action: ControlAction,
  language: UiLanguage = DEFAULT_UI_LANGUAGE,
): string => translate(`controls.actions.${action}`, {}, language);

export const DEFAULT_KEY_BINDINGS: KeyBindings = {
  moveForward: { primary: 'KeyW', secondary: 'ArrowUp' },
  moveBackward: { primary: 'KeyS', secondary: 'ArrowDown' },
  moveLeft: { primary: 'KeyA', secondary: 'ArrowLeft' },
  moveRight: { primary: 'KeyD', secondary: 'ArrowRight' },
  jump: { primary: 'ControlRight', secondary: 'Space' },
  crouch: { primary: 'Numpad0', secondary: 'ControlLeft' },
  sprint: { primary: 'ShiftLeft', secondary: 'ShiftRight' },
  inventory: { primary: 'KeyI', secondary: 'Tab' },
  chat: { primary: 'KeyC', secondary: null },
  chatCommand: { primary: 'KeyH', secondary: null },
  drop: { primary: 'KeyT', secondary: 'Numpad6' },
  debug: { primary: 'F3', secondary: null },
  pause: { primary: 'KeyP', secondary: null },
};

export const createDefaultSettings = (): GameSettings => ({
  keyBindings: structuredClone(DEFAULT_KEY_BINDINGS),
  skinDataUrl: DEFAULT_SKIN_URL,
  startFullscreen: true,
  interfaceSize: DEFAULT_INTERFACE_SIZE,
  language: DEFAULT_UI_LANGUAGE,
  developerDebugMode: false,
  renderDistanceChunks: DEFAULT_RENDER_DISTANCE_CHUNKS,
});

export const normalizeInterfaceSize = (value: number): number => {
  if (!Number.isFinite(value)) {
    return DEFAULT_INTERFACE_SIZE;
  }
  const rounded = Math.round(value);
  return Math.min(MAX_INTERFACE_SIZE, Math.max(MIN_INTERFACE_SIZE, rounded));
};

export const getNextInterfaceSize = (current: number): number => {
  const normalized = normalizeInterfaceSize(current);
  if (normalized >= MAX_INTERFACE_SIZE) {
    return MIN_INTERFACE_SIZE;
  }
  return normalized + 1;
};

export const getInterfaceZoomPercent = (interfaceSize: number): number => {
  const normalized = normalizeInterfaceSize(interfaceSize);
  if (normalized <= DEFAULT_INTERFACE_SIZE) {
    return 100 + (DEFAULT_INTERFACE_SIZE - normalized) * 20;
  }
  return Math.max(10, 100 - (normalized - DEFAULT_INTERFACE_SIZE) * 10);
};

export const normalizeRenderDistanceChunks = (value: number): number => {
  if (!Number.isFinite(value)) {
    return DEFAULT_RENDER_DISTANCE_CHUNKS;
  }
  const rounded = Math.round(value);
  return Math.min(MAX_RENDER_DISTANCE_CHUNKS, Math.max(MIN_RENDER_DISTANCE_CHUNKS, rounded));
};

export const getNextRenderDistanceChunks = (current: number): number => {
  const normalized = normalizeRenderDistanceChunks(current);
  if (normalized >= MAX_RENDER_DISTANCE_CHUNKS) {
    return MIN_RENDER_DISTANCE_CHUNKS;
  }
  return normalized + 1;
};

export const cloneBindings = (bindings: KeyBindings): KeyBindings => {
  const clone = {} as KeyBindings;
  CONTROL_ACTIONS.forEach((action) => {
    clone[action] = {
      primary: bindings[action].primary,
      secondary: bindings[action].secondary,
    };
  });
  return clone;
};

export const formatKeyCode = (
  code: string | null,
  language: UiLanguage = DEFAULT_UI_LANGUAGE,
): string => {
  if (!code) {
    return translate('controls.unbound', {}, language);
  }
  if (isSpecialKeyCode(code)) {
    return translate(`controls.specialKeys.${code}`, {}, language);
  }
  if (code.startsWith('Key')) {
    return code.replace('Key', '').toUpperCase();
  }
  if (code.startsWith('Digit')) {
    return code.replace('Digit', '');
  }
  if (code.startsWith('Mouse')) {
    return code.replace('Mouse', language === 'fr' ? 'Souris ' : 'Mouse ');
  }
  return code;
};
