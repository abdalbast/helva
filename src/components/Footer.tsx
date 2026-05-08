import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

type TrustMark = {
  label: string;
  src: string;
  alt: string;
};

type FooterLink = {
  labelKey: string;
  path: string;
};

type FooterLinkGroup = {
  titleKey: string;
  links: FooterLink[];
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

const footerLinkGroups: FooterLinkGroup[] = [
  {
    titleKey: 'footer.sections.explore',
    links: [
      { labelKey: 'nav.products', path: 'products' },
      { labelKey: 'nav.solutions', path: 'solutions' },
      { labelKey: 'nav.ai', path: 'ai' },
      { labelKey: 'nav.thesis', path: 'thesis' },
    ],
  },
  {
    titleKey: 'footer.sections.company',
    links: [
      { labelKey: 'nav.about', path: 'about' },
      { labelKey: 'footer.careers', path: 'careers' },
      { labelKey: 'nav.contact', path: 'contact' },
    ],
  },
  {
    titleKey: 'footer.sections.trust',
    links: [
      { labelKey: 'footer.trustCentre', path: 'trust' },
      { labelKey: 'footer.privacy', path: 'privacy' },
      { labelKey: 'footer.terms', path: 'terms' },
    ],
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <footer className="col-span-12 mt-16 border-t border-border/30 py-12">
      <div className="grid gap-10 border-b border-border/20 pb-10 lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-5">
          <Link to={`/${currentLang}`} className="font-display font-extrabold text-2xl tracking-tighter uppercase text-foreground hover:text-primary transition-colors duration-300">
            Helva
          </Link>
          <p className="mt-3 max-w-sm font-mono text-xs leading-6 tracking-wide text-muted-foreground">{t('footer.tagline')}</p>
        </div>

        <nav className="grid gap-8 sm:grid-cols-3 lg:col-span-7" aria-label={t('footer.ariaLabel')}>
          {footerLinkGroups.map(({ titleKey, links }) => (
            <div key={titleKey} className="space-y-4">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-foreground/45">
                {t(titleKey)}
              </h2>
              <ul className="space-y-3">
                {links.map(({ labelKey, path }) => (
                  <li key={path}>
                    <Link
                      to={`/${currentLang}/${path}`}
                      className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-wrap items-center gap-3 py-6">
        {trustMarks.map(({ label, src, alt }) => (
          <div
            key={label}
            className="flex h-10 items-center gap-2.5 border border-border/25 bg-foreground/[0.025] px-3 text-muted-foreground"
          >
            <img src={src} alt={alt} className="h-5 w-auto shrink-0 object-contain" loading="lazy" />
            <span className="font-mono text-xs uppercase tracking-[0.16em]">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-border/20 pt-8 md:flex-row md:items-center">
        <p className="font-mono text-xs text-muted-foreground tracking-wide">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
