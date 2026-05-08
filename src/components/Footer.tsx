import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

type TrustMark = {
  label: string;
  icon: JSX.Element;
};

const iconClassName = 'h-5 w-5 shrink-0';

const trustMarks: TrustMark[] = [
  {
    label: 'GDPR',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M12 2.75 5.5 5.25v5.85c0 4.15 2.68 7.92 6.5 9.15 3.82-1.23 6.5-5 6.5-9.15V5.25L12 2.75Z"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinejoin="round"
        />
        <path
          d="M8.4 12.1 10.75 14.45 15.75 9.45"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Companies House',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M5 10.25h14M6.25 10.25v8.5M10.08 10.25v8.5M13.92 10.25v8.5M17.75 10.25v8.5M4.25 18.75h15.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M4.75 8.25 12 4.25l7.25 4v2H4.75v-2Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M10.25 6.85h3.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Scotland Seal',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <circle cx="12" cy="12" r="8.65" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="12" cy="12" r="6.15" stroke="currentColor" strokeWidth="0.85" opacity="0.55" />
        <path
          d="M12 16.75v-7.1M8.75 13.65c2.2-.15 3.25.78 3.25 3.1M15.25 13.65c-2.2-.15-3.25.78-3.25 3.1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.65c.72 1.08 1.08 1.92 1.08 2.52 0 .7-.48 1.2-1.08 1.2s-1.08-.5-1.08-1.2c0-.6.36-1.44 1.08-2.52Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <footer className="col-span-12 py-12 border-t border-border/30 mt-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div>
          <Link to={`/${currentLang}`} className="font-display font-extrabold text-2xl tracking-tighter uppercase text-foreground hover:text-primary transition-colors duration-300">
            Helva
          </Link>
          <p className="font-mono text-xs text-muted-foreground mt-2 tracking-wide">{t('footer.tagline')}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 py-8 border-t border-b border-border/20">
        {[
          { key: 'products', path: 'products' },
          { key: 'solutions', path: 'solutions' },
          { key: 'ai', path: 'ai' },
          { key: 'thesis', path: 'thesis' },
          { key: 'about', path: 'about' },
          { key: 'contact', path: 'contact' },
        ].map(({ key, path }) => (
          <Link key={key} to={`/${currentLang}/${path}`} className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300">
            {t(`nav.${key}`)}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 py-6 border-b border-border/20">
        {trustMarks.map(({ label, icon }) => (
          <div
            key={label}
            className="group flex h-10 items-center gap-2.5 border border-border/25 bg-foreground/[0.025] px-3 text-muted-foreground/70 transition-colors duration-300 hover:border-primary/35 hover:text-primary"
            aria-label={label}
            title={label}
          >
            {icon}
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
        <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-wide">{t('footer.copyright')}</p>
        <div className="flex items-center gap-4">
          <Link to={`/${currentLang}/privacy`} className="font-mono text-[0.65rem] text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide">{t('footer.privacy')}</Link>
          <Link to={`/${currentLang}/terms`} className="font-mono text-[0.65rem] text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide">{t('footer.terms')}</Link>
          <a href="mailto:founder@helva.io" className="font-mono text-[0.65rem] text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide">founder@helva.io</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
