export const CONTROL_ACTIONS = [
  'moveForward',
  'moveBackward',
  'moveLeft',
  'moveRight',
  'jump',
  'crouch',
  'sprint',
  'inventory',
  'debug',
  'pause',
] as const;

export type ControlAction = (typeof CONTROL_ACTIONS)[number];

export interface KeyBinding {
  primary: string;
  secondary: string | null;
}

export type KeyBindings = Record<ControlAction, KeyBinding>;

export interface GameSettings {
  keyBindings: KeyBindings;
  skinDataUrl: string | null;
  startFullscreen: boolean;
  interfaceSize: number;
}

export const DEFAULT_INTERFACE_SIZE = 5;
export const MIN_INTERFACE_SIZE = 1;
export const MAX_INTERFACE_SIZE = 8;

export const CONTROL_LABELS: Record<ControlAction, string> = {
  moveForward: 'Move Forward',
  moveBackward: 'Move Backward',
  moveLeft: 'Strafe Left',
  moveRight: 'Strafe Right',
  jump: 'Jump',
  crouch: 'Crouch',
  sprint: 'Sprint',
  inventory: 'Inventory',
  debug: 'Debug Overlay',
  pause: 'Pause Menu',
};

export const DEFAULT_KEY_BINDINGS: KeyBindings = {
  moveForward: { primary: 'KeyW', secondary: 'ArrowUp' },
  moveBackward: { primary: 'KeyS', secondary: 'ArrowDown' },
  moveLeft: { primary: 'KeyA', secondary: 'ArrowLeft' },
  moveRight: { primary: 'KeyD', secondary: 'ArrowRight' },
  jump: { primary: 'ControlRight', secondary: 'Space' },
  crouch: { primary: 'Numpad0', secondary: 'ControlLeft' },
  sprint: { primary: 'ShiftLeft', secondary: 'ShiftRight' },
  inventory: { primary: 'KeyI', secondary: 'Tab' },
  debug: { primary: 'F3', secondary: null },
  pause: { primary: 'Escape', secondary: null },
};

export const createDefaultSettings = (): GameSettings => ({
  keyBindings: structuredClone(DEFAULT_KEY_BINDINGS),
  skinDataUrl: null,
  startFullscreen: true,
  interfaceSize: DEFAULT_INTERFACE_SIZE,
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

const SPECIAL_LABELS: Record<string, string> = {
  Escape: 'Esc',
  Space: 'Space',
  ControlLeft: 'Ctrl Left',
  ControlRight: 'Ctrl Right',
  ShiftLeft: 'Shift Left',
  ShiftRight: 'Shift Right',
  AltLeft: 'Alt Left',
  AltRight: 'Alt Right',
  ArrowUp: 'Arrow Up',
  ArrowDown: 'Arrow Down',
  ArrowLeft: 'Arrow Left',
  ArrowRight: 'Arrow Right',
  Numpad0: 'Num 0',
  Numpad1: 'Num 1',
  Numpad2: 'Num 2',
  Numpad3: 'Num 3',
  Numpad4: 'Num 4',
  Numpad5: 'Num 5',
  Numpad6: 'Num 6',
  Numpad7: 'Num 7',
  Numpad8: 'Num 8',
  Numpad9: 'Num 9',
};

export const formatKeyCode = (code: string | null): string => {
  if (!code) {
    return 'Unbound';
  }
  if (SPECIAL_LABELS[code]) {
    return SPECIAL_LABELS[code];
  }
  if (code.startsWith('Key')) {
    return code.replace('Key', '').toUpperCase();
  }
  if (code.startsWith('Digit')) {
    return code.replace('Digit', '');
  }
  if (code.startsWith('Mouse')) {
    return code.replace('Mouse', 'Mouse ');
  }
  return code;
};
