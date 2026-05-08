import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

type TrustMark = {
  label: string;
  src: string;
  alt: string;
};

const trustMarks: TrustMark[] = [
  {
    label: 'GDPR',
    src: '/gdpr-logo.png',
    alt: 'European Union flag — GDPR compliance',
  },
  {
    label: 'Companies House',
    src: '/companies-house-logo.png',
    alt: 'Companies House UK government logo',
  },
  {
    label: 'Scotland Seal',
    src: '/scotland-seal-logo.svg',
    alt: 'Scottish Government crest',
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
