import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import sv from './locales/sv.json';
import ku from './locales/ku.json';
import ar from './locales/ar.json';

export const supportedLanguages = ['en', 'sv', 'ku', 'ar'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  sv: 'Svenska',
  ku: 'کوردی',
  ar: 'العربية',
};

export const rtlLanguages: SupportedLanguage[] = ['ku', 'ar'];

export const isRtl = (lang: string) => rtlLanguages.includes(lang as SupportedLanguage);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sv: { translation: sv },
      ku: { translation: ku },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: supportedLanguages as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;
