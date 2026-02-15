import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isRtl, supportedLanguages, SupportedLanguage } from '@/i18n/config';

/**
 * Hook that syncs the URL :lang param with i18next and sets RTL on <html>.
 * Returns the current language and a function to change it.
 */
export function useLanguage() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = (supportedLanguages.includes(lang as SupportedLanguage) ? lang : 'en') as SupportedLanguage;

  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtl(currentLang) ? 'rtl' : 'ltr';
  }, [currentLang, i18n]);

  const changeLanguage = (newLang: SupportedLanguage) => {
    const pathWithoutLang = location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  return { currentLang, changeLanguage };
}
