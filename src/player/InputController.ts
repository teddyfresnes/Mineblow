type PointerLockListener = (locked: boolean) => void;
const FUNCTION_KEY_PATTERN = /^F\d{1,2}$/;

export class InputController {
  private readonly pressedKeys = new Set<string>();
  private readonly justPressedKeys = new Set<string>();
  private pointerLocked = false;
  private lookDeltaX = 0;
  private lookDeltaY = 0;
  private primaryDown = false;
  private primaryClicked = false;
  private secondaryClicked = false;
  private wheelSteps = 0;
  private pointerLockListener?: PointerLockListener;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handlePointerLockChange = this.handlePointerLockChange.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  connect(): void {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
  }

  setPointerLockListener(listener: PointerLockListener): void {
    this.pointerLockListener = listener;
  }

  requestPointerLock(): Promise<void> | undefined {
    return this.canvas.requestPointerLock({
      unadjustedMovement: true,
    }) as Promise<void> | undefined;
  }

  exitPointerLock(): void {
    if (document.pointerLockElement === this.canvas) {
      document.exitPointerLock();
    }
  }

  isPointerLocked(): boolean {
    return this.pointerLocked;
  }

  isKeyDown(code: string): boolean {
    return this.pressedKeys.has(code);
  }

  isAnyKeyDown(codes: Array<string | null | undefined>): boolean {
    return codes.some((code) => !!code && this.pressedKeys.has(code));
  }

  consumeLookDelta(): { x: number; y: number } {
    const delta = { x: this.lookDeltaX, y: this.lookDeltaY };
    this.lookDeltaX = 0;
    this.lookDeltaY = 0;
    return delta;
  }

  isPrimaryDown(): boolean {
    return this.primaryDown;
  }

  consumePrimaryClick(): boolean {
    const clicked = this.primaryClicked;
    this.primaryClicked = false;
    return clicked;
  }

  consumeSecondaryClick(): boolean {
    const clicked = this.secondaryClicked;
    this.secondaryClicked = false;
    return clicked;
  }

  consumeWheelSteps(): number {
    const steps = this.wheelSteps;
    this.wheelSteps = 0;
    return steps;
  }

  consumeJustPressedKey(code: string): boolean {
    const has = this.justPressedKeys.has(code);
    if (has) {
      this.justPressedKeys.delete(code);
    }
    return has;
  }

  consumeAnyJustPressed(codes: Array<string | null | undefined>): boolean {
    for (const code of codes) {
      if (!code) {
        continue;
      }
      if (this.consumeJustPressedKey(code)) {
        return true;
      }
    }
    return false;
  }

  consumeNumberSlot(): number | null {
    for (let index = 1; index <= 9; index += 1) {
      if (this.consumeJustPressedKey(`Digit${index}`)) {
        return index - 1;
      }
    }
    return null;
  }

  endFrame(): void {
    this.justPressedKeys.clear();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (FUNCTION_KEY_PATTERN.test(event.code)) {
      event.preventDefault();
    }
    if (!this.pressedKeys.has(event.code)) {
      this.justPressedKeys.add(event.code);
    }
    this.pressedKeys.add(event.code);
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.pressedKeys.delete(event.code);
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.pointerLocked) {
      return;
    }

    this.lookDeltaX += event.movementX;
    this.lookDeltaY += event.movementY;
  }

  private handleMouseDown(event: MouseEvent): void {
    if (event.button === 0) {
      this.primaryDown = true;
      this.primaryClicked = true;
    }
    if (event.button === 2) {
      this.secondaryClicked = true;
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    if (event.button === 0) {
      this.primaryDown = false;
    }
  }

  private handleWheel(event: WheelEvent): void {
    if (!this.pointerLocked) {
      return;
    }

    event.preventDefault();
    this.wheelSteps += Math.sign(event.deltaY);
  }

  private handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  private handlePointerLockChange(): void {
    this.pointerLocked = document.pointerLockElement === this.canvas;
    this.pointerLockListener?.(this.pointerLocked);
  }
}
