import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';

const NotFound = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <AnimatedPage>
      <>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-24 lg:py-40 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('notFound.label')}</span>
            <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(4rem,12vw,10rem)] leading-[0.9] text-primary tracking-tighter mb-8">{t('notFound.title')}</h1>
            <p className="animate-reveal stagger-2 text-xl text-foreground/60 max-w-md mx-auto mb-12 leading-relaxed">{t('notFound.description')}</p>
            <Link to={`/${currentLang}`} className="animate-reveal stagger-3 inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">{t('notFound.returnHome')}</Link>
          </section>
          <Footer />
        </main>
      </>
    </AnimatedPage>
  );
};

export default NotFound;
