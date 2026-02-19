import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const Terms = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <>
      <PageMeta title={t('terms.title')} description={t('terms.subtitle')} path="/terms" lang={currentLang} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
      <GrainOverlay />
      <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('terms.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('terms.title')}</h1>
          <p className="animate-reveal stagger-2 text-lg text-foreground/80 max-w-2xl leading-relaxed font-light mb-12">{t('terms.subtitle')}</p>

          <div className="space-y-10 text-foreground/70 leading-relaxed">
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3">{t('terms.useTitle')}</h2>
              <p>{t('terms.useDesc')}</p>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3">{t('terms.ipTitle')}</h2>
              <p>{t('terms.ipDesc')}</p>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3">{t('terms.liabilityTitle')}</h2>
              <p>{t('terms.liabilityDesc')}</p>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3">{t('terms.changesTitle')}</h2>
              <p>{t('terms.changesDesc')}</p>
            </div>
            <p className="text-sm text-muted-foreground">{t('terms.lastUpdated')}</p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Terms;
