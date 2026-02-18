import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const AI = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const capabilities = [
    { titleKey: 'intelligentAutomation', descKey: 'intelligentAutomationDesc', icon: '⚡' },
    { titleKey: 'personalizationEngines', descKey: 'personalizationEnginesDesc', icon: '🎯' },
    { titleKey: 'naturalLanguage', descKey: 'naturalLanguageDesc', icon: '💬' },
    { titleKey: 'predictiveAnalytics', descKey: 'predictiveAnalyticsDesc', icon: '📊' },
  ];

  const principles = [
    { titleKey: 'humanCentered', descKey: 'humanCenteredDesc' },
    { titleKey: 'transparent', descKey: 'transparentDesc' },
    { titleKey: 'ethical', descKey: 'ethicalDesc' },
  ];

  return (
    <>
      <PageMeta title={t('ai.title')} description={t('ai.subtitle')} path="/ai" lang={currentLang} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
      <GrainOverlay />
      <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('ai.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('ai.title')}</h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('ai.subtitle')}</p>
        </section>
        <section className="col-span-12 py-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">{t('ai.capabilitiesLabel')}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((c, idx) => (
              <div key={c.titleKey} className={`animate-reveal stagger-${(idx % 4) + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500`}>
                <span className="text-2xl mb-4 block">{c.icon}</span>
                <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">{t(`ai.${c.titleKey}`)}</h3>
                <p className="text-foreground/60 leading-relaxed">{t(`ai.${c.descKey}`)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">{t('ai.philosophyLabel')}</span>
              <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">{t('ai.philosophyTitle')}</h2>
            </div>
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
              <p>{t('ai.philosophyP1')}</p>
              <p>{t('ai.philosophyP2')}</p>
            </div>
          </div>
        </section>
        <section className="col-span-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.titleKey} className="space-y-4 p-6 border-l-2 border-primary/30">
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight">{t(`ai.${p.titleKey}`)}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{t(`ai.${p.descKey}`)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{t('ai.integratingLabel')}</p>
          <p className="text-foreground/80 text-lg max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: t('ai.integratingDesc') }} />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default AI;
