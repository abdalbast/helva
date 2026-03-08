import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, languageNames, SupportedLanguage } from '@/i18n/config';

const cities = ['Edinburgh', 'Stockholm', 'Columbus', 'Portland', 'Sulaimani', 'Erbil'];

const Navigation = () => {
  const location = useLocation();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { currentLang, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.projects'), to: `/${currentLang}/projects` },
    { label: t('nav.solutions'), to: `/${currentLang}/solutions` },
    { label: t('nav.ai'), to: `/${currentLang}/ai` },
    { label: t('nav.resources'), to: `/${currentLang}/resources` },
    { label: t('nav.about'), to: `/${currentLang}/about` },
    { label: t('nav.founder'), to: '/about-abdalbast-khdhir' },
    { label: t('nav.contact'), to: `/${currentLang}/contact` },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Close language dropdown on click outside
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
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-mono text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  (location.pathname === item.to || (item.to === '/about-abdalbast-khdhir' && location.pathname.includes('abdalbast')))
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <span className="hidden md:block w-px h-4 bg-border/50" />

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label={`${currentLang.toUpperCase()} — Change language`}
            >
              {currentLang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-background border border-border/50 shadow-lg z-50 min-w-[120px]">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang as SupportedLanguage);
                      setLangOpen(false);
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

          <span className="hidden md:block w-px h-4 bg-border/50" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '●'}
          </button>

          <span className="hidden md:block w-px h-4 bg-border/50" />

          {/* City Hub - desktop */}
          <div className="hidden md:flex relative h-4 overflow-hidden min-w-[80px] items-center justify-end">
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70 absolute right-0 ${
                isAnimating ? 'city-slide-out' : 'city-slide-in'
              }`}
            >
              {cities[currentCityIndex]}
            </span>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-[5px] group"
            aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          mobileOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="flex flex-col gap-4 pb-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`font-mono text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                (location.pathname === item.to || (item.to === '/about-abdalbast-khdhir' && location.pathname.includes('abdalbast')))
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language options - mobile */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
            {supportedLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang as SupportedLanguage)}
                className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${
                  currentLang === lang
                    ? 'border-primary text-primary'
                    : 'border-border/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>

          {/* City Hub - mobile */}
          <div className="relative h-4 overflow-hidden flex items-center pt-2 border-t border-border/20">
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70 absolute ${
                isAnimating ? 'city-slide-out' : 'city-slide-in'
              }`}
            >
              {cities[currentCityIndex]}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
