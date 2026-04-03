import { describe, expect, it } from 'vitest';

import { ChatInputHistory } from './ChatInputHistory';

describe('ChatInputHistory', () => {
  it('recalls sent prompts and restores the in-progress draft when navigating back down', () => {
    const history = new ChatInputHistory();
    history.record('/time clock 12');
    history.record('bonjour');

    expect(history.previous('/')).toBe('bonjour');
    expect(history.previous('/')).toBe('/time clock 12');
    expect(history.next()).toBe('bonjour');
    expect(history.next()).toBe('/');
    expect(history.next()).toBeNull();
  });

  it('caps the number of stored prompts to the configured limit', () => {
    const history = new ChatInputHistory(2);
    history.record('first');
    history.record('second');
    history.record('third');

    expect(history.previous('')).toBe('third');
    expect(history.previous('')).toBe('second');
    expect(history.previous('')).toBe('second');
  });

  it('resets browsing state cleanly when the composer is reopened or cleared', () => {
    const history = new ChatInputHistory();
    history.record('first');
    expect(history.previous('/')).toBe('first');

    history.resetNavigation('/');
    expect(history.next()).toBeNull();
    expect(history.previous('/')).toBe('first');
    expect(history.next()).toBe('/');

    history.clear();
    expect(history.previous('draft')).toBeNull();
  });
});
