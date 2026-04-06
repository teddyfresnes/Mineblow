import { WEATHER_PRESET_CHAIN, WEATHER_SKY_PRESET_OPTIONS } from '../types/weather';

const ROOT_COMMANDS = ['time', 'weather'] as const;
const TIME_SUBCOMMANDS = ['clock', 'nextday', 'moon'] as const;
const WEATHER_SUBCOMMANDS = [
  ...WEATHER_PRESET_CHAIN,
  'auto',
  'setclouds',
  'setrain',
  'setsky',
  'debug',
] as const;
const AUTO_VALUE = ['auto'] as const;

interface CommandToken {
  readonly value: string;
  readonly start: number;
  readonly end: number;
}

interface CommandAutocompleteContext {
  readonly body: string;
  readonly contextKey: string;
  readonly currentIndex: number;
  readonly currentToken: string;
  readonly leadingTokens: string[];
  readonly replaceStart: number;
  readonly replaceEnd: number;
}

export interface ChatCommandAutocompleteState {
  readonly contextKey: string;
  readonly matches: string[];
  readonly seedText: string;
}

export interface ChatCommandAutocompleteResult {
  readonly value: string;
  readonly selectionStart: number;
  readonly selectionEnd: number;
  readonly state: ChatCommandAutocompleteState | null;
}

const wrapIndex = (value: number, length: number): number => {
  if (length <= 0) {
    return 0;
  }
  return ((value % length) + length) % length;
};

const getCommonPrefix = (values: readonly string[]): string => {
  if (values.length === 0) {
    return '';
  }

  let prefix = values[0] ?? '';
  for (let index = 1; index < values.length && prefix.length > 0; index += 1) {
    const next = values[index] ?? '';
    let cursor = 0;
    while (cursor < prefix.length && cursor < next.length && prefix[cursor] === next[cursor]) {
      cursor += 1;
    }
    prefix = prefix.slice(0, cursor);
  }

  return prefix;
};

const tokenizeCommandBody = (body: string): CommandToken[] => {
  const tokens: CommandToken[] = [];
  const pattern = /\S+/g;
  let match = pattern.exec(body);
  while (match) {
    tokens.push({
      value: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
    match = pattern.exec(body);
  }
  return tokens;
};

const buildAutocompleteContext = (
  value: string,
  selectionStart: number,
): CommandAutocompleteContext | null => {
  if (!value.startsWith('/')) {
    return null;
  }

  const body = value.slice(1);
  const cursor = Math.max(0, Math.min(selectionStart - 1, body.length));
  const tokens = tokenizeCommandBody(body);

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token || cursor < token.start || cursor > token.end) {
      continue;
    }
    const leadingTokens = tokens
      .slice(0, index)
      .map((entry) => entry.value.toLowerCase());
    return {
      body,
      contextKey: `${leadingTokens.join('\0')}|${index}|${token.start}`,
      currentIndex: index,
      currentToken: token.value.toLowerCase(),
      leadingTokens,
      replaceStart: token.start,
      replaceEnd: token.end,
    };
  }

  const currentIndex = tokens.filter((token) => token.end < cursor).length;
  const leadingTokens = tokens
    .slice(0, currentIndex)
    .map((entry) => entry.value.toLowerCase());

  return {
    body,
    contextKey: `${leadingTokens.join('\0')}|${currentIndex}|${cursor}`,
    currentIndex,
    currentToken: '',
    leadingTokens,
    replaceStart: cursor,
    replaceEnd: cursor,
  };
};

const getCandidatesForContext = (context: CommandAutocompleteContext): readonly string[] => {
  if (context.currentIndex === 0) {
    return ROOT_COMMANDS;
  }

  const command = context.leadingTokens[0] ?? '';
  if (command === 'time') {
    if (context.currentIndex === 1) {
      return TIME_SUBCOMMANDS;
    }
    return [];
  }

  if (command === 'weather') {
    if (context.currentIndex === 1) {
      return WEATHER_SUBCOMMANDS;
    }

    const subcommand = context.leadingTokens[1] ?? '';
    if (context.currentIndex === 2 && subcommand === 'setsky') {
      return WEATHER_SKY_PRESET_OPTIONS;
    }
    if (context.currentIndex === 2 && (subcommand === 'setclouds' || subcommand === 'setrain')) {
      return AUTO_VALUE;
    }
  }

  return [];
};

const applyReplacement = (
  inputValue: string,
  context: CommandAutocompleteContext,
  replacement: string,
  addTrailingSpace: boolean,
  state: ChatCommandAutocompleteState | null,
): ChatCommandAutocompleteResult => {
  const replaceStart = context.replaceStart + 1;
  const replaceEnd = context.replaceEnd + 1;
  const suffix = addTrailingSpace && replaceEnd === inputValue.length ? ' ' : '';
  const nextValue =
    inputValue.slice(0, replaceStart) + replacement + suffix + inputValue.slice(replaceEnd);
  const cursor = replaceStart + replacement.length + suffix.length;

  return {
    value: nextValue,
    selectionStart: cursor,
    selectionEnd: cursor,
    state,
  };
};

export const autocompleteChatCommand = (
  inputValue: string,
  selectionStart: number,
  previousState: ChatCommandAutocompleteState | null = null,
  direction: 1 | -1 = 1,
): ChatCommandAutocompleteResult | null => {
  const context = buildAutocompleteContext(inputValue, selectionStart);
  if (!context) {
    return null;
  }

  const candidates = getCandidatesForContext(context);
  if (candidates.length === 0) {
    return null;
  }

  if (
    previousState &&
    previousState.contextKey === context.contextKey &&
    (previousState.seedText === context.currentToken ||
      previousState.matches.includes(context.currentToken))
  ) {
    const currentIndex = previousState.matches.indexOf(context.currentToken);
    const nextIndex = wrapIndex(
      currentIndex >= 0 ? currentIndex + direction : direction > 0 ? 0 : -1,
      previousState.matches.length,
    );
    const replacement = previousState.matches[nextIndex] ?? previousState.matches[0];
    if (!replacement) {
      return null;
    }
    return applyReplacement(inputValue, context, replacement, false, {
      contextKey: previousState.contextKey,
      matches: previousState.matches,
      seedText: replacement,
    });
  }

  const matches = candidates.filter((candidate) => candidate.startsWith(context.currentToken));
  if (matches.length === 0) {
    return null;
  }

  if (matches.length === 1) {
    const replacement = matches[0];
    if (!replacement) {
      return null;
    }
    return applyReplacement(inputValue, context, replacement, true, null);
  }

  const commonPrefix = getCommonPrefix(matches);
  if (commonPrefix.length > context.currentToken.length) {
    return applyReplacement(inputValue, context, commonPrefix, false, {
      contextKey: context.contextKey,
      matches: [...matches],
      seedText: commonPrefix,
    });
  }

  const replacement = matches[direction > 0 ? 0 : matches.length - 1];
  if (!replacement) {
    return null;
  }
  return applyReplacement(inputValue, context, replacement, false, {
    contextKey: context.contextKey,
    matches: [...matches],
    seedText: replacement,
  });
};
