import { DEFAULT_UI_LANGUAGE, translate, type UiLanguage } from '../i18n/Language';

export type ChatInputMode = 'chat' | 'command';
type ChatEntryTone = 'player' | 'command' | 'system' | 'error';

interface ChatEntryRecord {
  element: HTMLDivElement;
  staleTimeoutId: number | null;
}

interface ChatOverlayHandlers {
  onSubmit?: (mode: ChatInputMode, value: string) => void;
  onCancel?: () => void;
}

const CHAT_ENTRY_VISIBLE_MS = 6000;
const CHAT_ENTRY_LIMIT = 128;
const CHAT_AUTO_SCROLL_THRESHOLD_PX = 24;

export class ChatOverlay {
  private readonly root = document.createElement('div');
  private readonly history = document.createElement('div');
  private readonly composer = document.createElement('div');
  private readonly input = document.createElement('input');
  private readonly entries: ChatEntryRecord[] = [];
  private language: UiLanguage = DEFAULT_UI_LANGUAGE;
  private composerOpen = false;
  private mode: ChatInputMode = 'chat';

  constructor(parent: HTMLElement, private readonly handlers: ChatOverlayHandlers = {}) {
    this.root.className = 'chat-overlay';
    this.history.className = 'chat-history';
    this.composer.className = 'chat-composer';
    this.input.className = 'chat-input';
    this.input.type = 'text';
    this.input.maxLength = 220;
    this.input.spellcheck = false;
    this.input.autocomplete = 'off';
    this.input.autocapitalize = 'off';

    this.composer.append(this.input);
    this.root.append(this.history, this.composer);
    parent.append(this.root);

    this.root.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
    this.root.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    this.history.addEventListener('wheel', (event) => {
      event.stopPropagation();
    });

    this.input.addEventListener('keydown', (event) => {
      if (event.isComposing) {
        return;
      }

      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        event.stopPropagation();
        const submittedValue = this.input.value.trim();
        if (!submittedValue) {
          return;
        }
        this.handlers.onSubmit?.(this.mode, submittedValue);
        return;
      }

      if (event.code === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.handlers.onCancel?.();
      }
    });

    this.syncComposerState();
  }

  setVisible(visible: boolean): void {
    this.root.style.display = visible ? '' : 'none';
  }

  setLanguage(language: UiLanguage): void {
    this.language = language;
    this.syncComposerState();
  }

  isOpen(): boolean {
    return this.composerOpen;
  }

  openComposer(mode: ChatInputMode, draft = ''): void {
    this.composerOpen = true;
    this.mode = mode;
    this.input.value = draft;
    this.root.classList.add('open');
    this.syncComposerState();
    this.scrollToBottom();
    window.requestAnimationFrame(() => {
      this.input.focus();
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    });
  }

  closeComposer(): void {
    this.composerOpen = false;
    this.input.value = '';
    this.root.classList.remove('open');
    this.input.blur();
    this.syncComposerState();
    this.scrollToBottom();
  }

  clear(): void {
    for (const entry of this.entries) {
      if (entry.staleTimeoutId !== null) {
        window.clearTimeout(entry.staleTimeoutId);
      }
      entry.element.remove();
    }
    this.entries.length = 0;
    this.closeComposer();
  }

  addPlayerMessage(text: string): void {
    this.addEntry('player', null, text);
  }

  addCommandMessage(text: string): void {
    this.addEntry('command', null, text);
  }

  addSystemMessage(text: string, tone: 'system' | 'error' = 'system'): void {
    this.addEntry(tone, null, text);
  }

  private addEntry(tone: ChatEntryTone, prefix: string | null, text: string): void {
    const shouldAutoScroll = !this.composerOpen || this.isNearBottom();
    const entry = document.createElement('div');
    entry.className = `chat-entry ${tone}`;

    if (prefix) {
      const prefixNode = document.createElement('strong');
      prefixNode.className = 'chat-entry-prefix';
      prefixNode.textContent = prefix;
      entry.append(prefixNode);
    }

    const body = document.createElement('span');
    body.className = 'chat-entry-text';
    body.textContent = text;
    entry.append(body);

    this.history.append(entry);

    const record: ChatEntryRecord = {
      element: entry,
      staleTimeoutId: window.setTimeout(() => {
        entry.classList.add('stale');
        record.staleTimeoutId = null;
      }, CHAT_ENTRY_VISIBLE_MS),
    };
    this.entries.push(record);
    this.trimEntries();
    if (shouldAutoScroll) {
      this.scrollToBottom();
    }
  }

  private trimEntries(): void {
    while (this.entries.length > CHAT_ENTRY_LIMIT) {
      const removed = this.entries.shift();
      if (!removed) {
        return;
      }
      if (removed.staleTimeoutId !== null) {
        window.clearTimeout(removed.staleTimeoutId);
      }
      removed.element.remove();
    }
  }

  private syncComposerState(): void {
    const commandMode = this.mode === 'command';
    this.composer.style.display = this.composerOpen ? '' : 'none';
    this.input.placeholder = translate(
      commandMode ? 'hud.commandPlaceholder' : 'hud.chatPlaceholder',
      {},
      this.language,
    );
  }

  private scrollToBottom(): void {
    this.history.scrollTop = this.history.scrollHeight;
  }

  private isNearBottom(): boolean {
    const remainingScroll =
      this.history.scrollHeight - this.history.clientHeight - this.history.scrollTop;
    return remainingScroll <= CHAT_AUTO_SCROLL_THRESHOLD_PX;
  }
}
