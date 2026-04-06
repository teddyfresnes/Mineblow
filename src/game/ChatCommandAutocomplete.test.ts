import { describe, expect, it } from 'vitest';
import {
  autocompleteChatCommand,
  type ChatCommandAutocompleteState,
} from './ChatCommandAutocomplete';

describe('autocompleteChatCommand', () => {
  it('completes top-level commands with a trailing space', () => {
    const result = autocompleteChatCommand('/wea', 4);

    expect(result?.value).toBe('/weather ');
    expect(result?.selectionStart).toBe('/weather '.length);
  });

  it('extends to the shared prefix before cycling ambiguous weather presets', () => {
    const result = autocompleteChatCommand('/weather ra', '/weather ra'.length);

    expect(result?.value).toBe('/weather rain');
  });

  it('cycles between ambiguous weather presets on repeated tab presses', () => {
    const first = autocompleteChatCommand('/weather rain_', '/weather rain_'.length);
    expect(first?.value).toBe('/weather rain_light');

    const second = autocompleteChatCommand(
      first?.value ?? '',
      first?.selectionStart ?? 0,
      first?.state as ChatCommandAutocompleteState,
    );
    expect(second?.value).toBe('/weather rain_heavy');
  });

  it('completes nested weather subcommands', () => {
    const result = autocompleteChatCommand('/weather setsky st', '/weather setsky st'.length);

    expect(result?.value).toBe('/weather setsky storm ');
  });
});
