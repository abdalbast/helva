import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

const cities = ['Edinburgh', 'Stockholm', 'Columbus', 'Portland', 'Sulaimani', 'Erbil'];

const navItems = [
  { label: 'Projects', to: '/projects' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'AI', to: '/ai' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

const Navigation = () => {
  const location = useLocation();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="col-span-12 border-b border-foreground/10 pb-5 mb-10">
      <div className="flex justify-between items-center">
        <Link
          to="/"
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
                  location.pathname === item.to
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
          mobileOpen ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="flex flex-col gap-4 pb-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`font-mono text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                location.pathname === item.to
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}

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
