import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, languageNames, SupportedLanguage } from '@/i18n/config';

const cities = ['Edinburgh'];

const ThemeIcon = ({ theme }: { theme: string }) => {
  if (theme === 'dark') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.35" />
        <path
          d="M12 3.25v2.15M12 18.6v2.15M3.25 12h2.15M18.6 12h2.15M5.82 5.82l1.52 1.52M16.66 16.66l1.52 1.52M18.18 5.82l-1.52 1.52M7.34 16.66l-1.52 1.52"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M18.35 14.25A7.35 7.35 0 0 1 9.75 5.65 7.75 7.75 0 1 0 18.35 14.25Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langHighlightedIndex, setLangHighlightedIndex] = useState(0);
  const langRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLButtonElement>(null);
  const langOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuFirstRef = useRef<HTMLAnchorElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { currentLang, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.products'), to: `/${currentLang}/products` },
    { label: t('nav.solutions'), to: `/${currentLang}/solutions` },
    { label: t('nav.ai'), to: `/${currentLang}/ai` },
    { label: t('nav.thesis'), to: `/${currentLang}/thesis` },
    { label: t('nav.about'), to: `/${currentLang}/about` },
  ];

  const isNavActive = useCallback((to: string) => location.pathname === to, [location.pathname]);

  const openLangMenu = useCallback(() => {
    const idx = supportedLanguages.indexOf(currentLang as SupportedLanguage);
    setLangHighlightedIndex(idx >= 0 ? idx : 0);
    setLangOpen(true);
  }, [currentLang]);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const id = requestAnimationFrame(() => {
      langOptionRefs.current[langHighlightedIndex]?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [langOpen, langHighlightedIndex]);

  useEffect(() => {
    if (!mobileOpen) return;
    const id = requestAnimationFrame(() => {
      mobileMenuFirstRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileOpen]);

  const handleListboxKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = supportedLanguages.length - 1;
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setLangHighlightedIndex((prev) => (prev >= last ? 0 : prev + 1));
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setLangHighlightedIndex((prev) => (prev <= 0 ? last : prev - 1));
        break;
      }
      case 'Home': {
        e.preventDefault();
        setLangHighlightedIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setLangHighlightedIndex(last);
        break;
      }
      case 'Escape': {
        e.preventDefault();
        setLangOpen(false);
        langTriggerRef.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  const selectLanguage = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    setLangOpen(false);
    langTriggerRef.current?.focus();
  };

  return (
    <nav className="col-span-12 border-b border-foreground/10 pb-5 mb-10">
      <div className="flex justify-between items-center">
        <Link
          to={`/${currentLang}`}
          className="font-display font-extrabold text-2xl tracking-tighter uppercase hover:text-primary transition-colors duration-300"
        >
          Helva
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  isNavActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 start-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <span className="hidden md:block w-px h-4 bg-border/50" aria-hidden="true" />

          <div className="relative" ref={langRef}>
            <button
              ref={langTriggerRef}
              type="button"
              id="lang-trigger"
              onClick={() => {
                if (langOpen) {
                  setLangOpen(false);
                } else {
                  openLangMenu();
                }
              }}
              onKeyDown={(e) => {
                if (!langOpen && e.key === 'ArrowDown') {
                  e.preventDefault();
                  openLangMenu();
                }
              }}
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] min-w-[44px] px-2 inline-flex items-center justify-center"
              aria-label={`${currentLang.toUpperCase()}, change language`}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-controls="lang-menu"
            >
              {currentLang.toUpperCase()}
            </button>
            {langOpen && (
              <div
                id="lang-menu"
                role="listbox"
                aria-labelledby="lang-trigger"
                onKeyDown={handleListboxKeyDown}
                className="absolute top-full end-0 mt-2 bg-background border border-border/50 shadow-lg z-50 min-w-[120px]"
              >
                {supportedLanguages.map((lang, index) => (
                  <button
                    key={lang}
                    ref={(el) => {
                      langOptionRefs.current[index] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={currentLang === lang}
                    tabIndex={-1}
                    onClick={() => selectLanguage(lang as SupportedLanguage)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectLanguage(lang as SupportedLanguage);
                      }
                    }}
                    className={`block w-full text-start px-4 py-2 font-mono text-xs transition-colors duration-200 ${
                      currentLang === lang
                        ? 'text-primary bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="hidden md:block w-px h-4 bg-border/50" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Toggle theme"
          >
            <ThemeIcon theme={theme} />
          </button>

          <span className="hidden md:block w-px h-4 bg-border/50" aria-hidden="true" />

          <div className="hidden md:flex relative h-4 overflow-hidden min-w-[80px] items-center justify-end" aria-hidden="true">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{cities[0]}</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center h-11 w-11 min-h-[44px] min-w-[44px] gap-[5px]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden grid motion-reduce:transition-none transition-[grid-template-rows,opacity,margin-top] duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
          mobileOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 pb-2">
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                ref={i === 0 ? mobileMenuFirstRef : undefined}
                to={item.to}
                className={`font-mono text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isNavActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    changeLanguage(lang as SupportedLanguage);
                    setMobileOpen(false);
                  }}
                  className={`font-mono text-xs uppercase tracking-[0.15em] min-h-[44px] px-3 py-2 border transition-all duration-300 ${
                    currentLang === lang
                      ? 'border-primary text-primary'
                      : 'border-border/30 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>

            <div className="relative h-4 overflow-hidden flex items-center pt-2 border-t border-border/20" aria-hidden="true">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{cities[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
