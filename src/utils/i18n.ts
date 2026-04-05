import en from '../i18n/en.json';
import zh from '../i18n/zh.json';
import ja from '../i18n/ja.json';
import de from '../i18n/de.json';

export const locales = ['zh', 'en', 'ja', 'de'] as const;
export type Locale = (typeof locales)[number];

const translations: Record<Locale, Record<string, unknown>> = { en, zh, ja, de };

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return 'zh';
}

export function useTranslations(locale: Locale) {
  return translations[locale] ?? translations.zh;
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}
