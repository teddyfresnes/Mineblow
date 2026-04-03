export class ChatInputHistory {
  private readonly entries: string[] = [];
  private browsingIndex: number | null = null;
  private draftBeforeBrowsing = '';

  constructor(private readonly limit = 128) {}

  record(value: string): void {
    if (!value) {
      return;
    }

    this.entries.push(value);
    if (this.entries.length > this.limit) {
      this.entries.splice(0, this.entries.length - this.limit);
    }
    this.resetNavigation();
  }

  previous(currentDraft: string): string | null {
    if (this.entries.length === 0) {
      return null;
    }

    if (this.browsingIndex === null) {
      this.draftBeforeBrowsing = currentDraft;
      this.browsingIndex = this.entries.length - 1;
      return this.entries[this.browsingIndex];
    }

    if (this.browsingIndex > 0) {
      this.browsingIndex -= 1;
    }

    return this.entries[this.browsingIndex];
  }

  next(): string | null {
    if (this.browsingIndex === null) {
      return null;
    }

    if (this.browsingIndex < this.entries.length - 1) {
      this.browsingIndex += 1;
      return this.entries[this.browsingIndex];
    }

    this.browsingIndex = null;
    return this.draftBeforeBrowsing;
  }

  resetNavigation(draft = ''): void {
    this.browsingIndex = null;
    this.draftBeforeBrowsing = draft;
  }

  clear(): void {
    this.entries.length = 0;
    this.resetNavigation();
  }
}
