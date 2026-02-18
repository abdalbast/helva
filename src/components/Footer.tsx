import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

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
        <div className="flex items-center gap-6">
          {/* TODO: Replace # with real Helva social URLs */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300">X</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300">Instagram</a>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 py-8 border-t border-b border-border/20">
        {['projects', 'solutions', 'ai', 'resources', 'about', 'contact'].map((key) => (
          <Link key={key} to={`/${currentLang}/${key}`} className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors duration-300">
            {t(`nav.${key}`)}
          </Link>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
        <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-wide">{t('footer.copyright')}</p>
        <a href="mailto:updates@helva.group" className="font-mono text-[0.65rem] text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide">updates@helva.group</a>
      </div>
    </footer>
  );
};

export default Footer;
