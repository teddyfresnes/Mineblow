export class GameLoop {
  private running = false;
  private lastTime = 0;
  private accumulator = 0;
  private animationFrameId = 0;

  constructor(
    private readonly fixedStepSeconds: number,
    private readonly update: (dt: number) => void,
    private readonly render: (alpha: number) => void,
  ) {
    this.tick = this.tick.bind(this);
  }

  start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastTime = performance.now();
    this.animationFrameId = window.requestAnimationFrame(this.tick);
  }

  stop(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    window.cancelAnimationFrame(this.animationFrameId);
  }

  private tick(time: number): void {
    if (!this.running) {
      return;
    }

    const frameSeconds = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;
    this.accumulator += frameSeconds;

    while (this.accumulator >= this.fixedStepSeconds) {
      this.update(this.fixedStepSeconds);
      this.accumulator -= this.fixedStepSeconds;
    }

    this.render(this.accumulator / this.fixedStepSeconds);
    this.animationFrameId = window.requestAnimationFrame(this.tick);
  }
}
