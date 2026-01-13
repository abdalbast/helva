import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="col-span-12 flex justify-between items-start border-b border-foreground/10 pb-5 mb-10">
      <Link to="/" className="font-display font-extrabold text-2xl tracking-tighter uppercase hover:text-primary transition-colors">
        Helva
      </Link>
      <Link to="/about" className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
        About
      </Link>
    </nav>
  );
};

export default Navigation;
