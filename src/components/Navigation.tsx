import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="col-span-12 flex justify-between items-start border-b border-foreground/10 pb-5 mb-10">
      <Link
        to="/"
        className="font-display font-extrabold text-2xl tracking-tighter uppercase hover:text-primary transition-colors duration-300"
      >
        Helva
      </Link>
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        <span>Stockholm</span>
        <span className="opacity-50">//</span>
        <span>Digital Architecture</span>
        <span className="opacity-50">//</span>
        <Link
          to={isHome ? "/about" : "/"}
          className="text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          {isHome ? "About" : "Home"}
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
