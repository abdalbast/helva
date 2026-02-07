import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  return (
    <nav className="col-span-12 flex justify-between items-start border-b border-foreground/10 pb-5 mb-10">
      <Link
        to="/"
        className="font-display font-extrabold text-2xl tracking-tighter uppercase hover:text-primary transition-colors duration-300"
      >
        Helva
      </Link>
      
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
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

        {/* Divider */}
        <span className="hidden md:block w-px h-4 bg-border/50" />

        {/* Animated City Hub */}
        <div className="relative h-4 overflow-hidden min-w-[80px] flex items-center justify-end">
          <span
            className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70 absolute right-0 ${
              isAnimating ? 'city-slide-out' : 'city-slide-in'
            }`}
          >
            {cities[currentCityIndex]}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
