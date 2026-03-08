import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { initAnalytics } from '@/lib/analytics';

const CONSENT_KEY = 'helva_cookie_consent';

export type ConsentValue = 'accepted' | 'declined' | null;

export function getConsent(): ConsentValue {
  return localStorage.getItem(CONSENT_KEY) as ConsentValue;
}

const CookieConsent = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === 'accepted') {
      initAnalytics();
    } else if (consent === null) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    initAnalytics();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-lg mx-auto bg-card border border-border/50 p-5 md:p-6 shadow-lg">
        <p className="text-sm text-foreground/80 leading-relaxed mb-1 font-medium">
          {t('cookie.title')}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {t('cookie.description')}{' '}
          <Link to={`/${currentLang}/privacy`} className="underline hover:text-primary transition-colors" aria-label={t('cookie.learnMore') + ' — ' + t('cookie.title')}>
            {t('cookie.learnMore')}
          </Link>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="font-mono text-xs uppercase tracking-[0.15em] bg-primary text-primary-foreground px-5 py-2 hover:bg-primary/90 transition-colors"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={decline}
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground px-5 py-2 border border-border/50 transition-colors"
          >
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
