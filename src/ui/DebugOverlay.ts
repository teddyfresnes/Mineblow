export class DebugOverlay {
  private readonly root = document.createElement('div');
  private readonly panel = document.createElement('div');
  private visible = false;

  constructor(parent: HTMLElement) {
    this.root.className = 'debug-layer';
    this.panel.className = 'debug-panel';
    this.root.append(this.panel);
    parent.append(this.root);
    this.setVisible(false);
  }

  toggle(): void {
    this.setVisible(!this.visible);
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.root.style.display = visible ? '' : 'none';
  }

  update(text: string): void {
    this.panel.textContent = text;
  }
}
