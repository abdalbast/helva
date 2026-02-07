import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="col-span-12 py-12 border-t border-border/30 mt-16">
      {/* Top section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div>
          <Link
            to="/"
            className="font-display font-extrabold text-2xl tracking-tighter uppercase text-foreground hover:text-primary transition-colors duration-300"
          >
            Helva
          </Link>
          <p className="font-mono text-xs text-muted-foreground mt-2 tracking-wide">
            Digital architecture for the modern world
          </p>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            X
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Middle section - Navigation */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 py-8 border-t border-b border-border/20">
        <Link
          to="/projects"
          className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          Projects
        </Link>
        <Link
          to="/solutions"
          className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          Solutions
        </Link>
        <Link
          to="/ai"
          className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          AI
        </Link>
        <Link
          to="/resources"
          className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          Resources
        </Link>
        <Link
          to="/about"
          className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300"
        >
          About
        </Link>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
        <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-wide">
          © 2024 Helva Group. All rights reserved.
        </p>
        <a
          href="mailto:updates@helva.group"
          className="font-mono text-[0.65rem] text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide"
        >
          updates@helva.group
        </a>
      </div>
    </footer>
  );
};

export default Footer;
