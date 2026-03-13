import { I18N_MESSAGES, type BaseMessageCatalog } from './messages';

type DotNotationKey<T> = {
  [Key in keyof T & string]: T[Key] extends string
    ? Key
    : T[Key] extends Record<string, unknown>
      ? `${Key}.${DotNotationKey<T[Key]>}`
      : never;
}[keyof T & string];

export type UiLanguage = keyof typeof I18N_MESSAGES;
export type TranslationKey = DotNotationKey<BaseMessageCatalog>;
export type TranslationParams = Record<string, string | number>;

export const UI_LANGUAGES = Object.freeze(
  Object.keys(I18N_MESSAGES) as UiLanguage[],
);

export const DEFAULT_UI_LANGUAGE: UiLanguage = 'fr';

const LANGUAGE_SET = new Set<UiLanguage>(UI_LANGUAGES);

let currentLanguage: UiLanguage = DEFAULT_UI_LANGUAGE;

export const isUiLanguage = (value: unknown): value is UiLanguage =>
  typeof value === 'string' && LANGUAGE_SET.has(value as UiLanguage);

export const getCurrentLanguage = (): UiLanguage => currentLanguage;

export const setCurrentLanguage = (language: UiLanguage): void => {
  currentLanguage = language;
};

const readMessage = (catalog: BaseMessageCatalog, key: TranslationKey): string | null => {
  const segments = key.split('.');
  let value: unknown = catalog;
  for (const segment of segments) {
    if (!value || typeof value !== 'object' || !(segment in value)) {
      return null;
    }
    value = (value as Record<string, unknown>)[segment];
  }
  return typeof value === 'string' ? value : null;
};

export const interpolateMessage = (
  template: string,
  params: TranslationParams = {},
): string => {
  let message = template;
  Object.entries(params).forEach(([name, value]) => {
    message = message.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
  });
  return message;
};

export const translate = (
  key: TranslationKey,
  params: TranslationParams = {},
  language: UiLanguage = currentLanguage,
): string => {
  const localized =
    readMessage(I18N_MESSAGES[language], key) ?? readMessage(I18N_MESSAGES[DEFAULT_UI_LANGUAGE], key);
  if (!localized) {
    return key;
  }
  return interpolateMessage(localized, params);
};

export const getLanguageLabel = (language: UiLanguage, uiLanguage: UiLanguage): string =>
  translate(`languages.${language}`, {}, uiLanguage);
