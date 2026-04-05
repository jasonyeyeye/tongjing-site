import en from '../i18n/en.json';
import zh from '../i18n/zh.json';
import ja from '../i18n/ja.json';
import de from '../i18n/de.json';

export const locales = ['zh', 'en', 'ja', 'de'] as const;
export type Locale = (typeof locales)[number];

type TranslationSchema = typeof en;
type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}` | K
        : K
      : never
    }[keyof T]
  : never;

const translations: Record<Locale, TranslationSchema> = { en, zh, ja, de };

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return 'en';
}

export function useTranslations<Loc extends Locale>(locale: Loc): TranslationSchema {
  return translations[locale] as TranslationSchema;
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}
