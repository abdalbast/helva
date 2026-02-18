import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const Solutions = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const solutions = [
    { titleKey: 'forStartups', descKey: 'forStartupsDesc', featureKeys: ['designSystems', 'brandIdentity', 'productStrategy', 'technicalArchitecture'] },
    { titleKey: 'forEnterprises', descKey: 'forEnterprisesDesc', featureKeys: ['systemModernization', 'designUnification', 'processAutomation', 'teamTraining'] },
    { titleKey: 'forAgencies', descKey: 'forAgenciesDesc', featureKeys: ['whiteLabelProducts', 'technicalPartnership', 'resourceAugmentation', 'jointVentures'] },
  ];

  const approaches = [
    { index: '01', titleKey: 'discovery', descKey: 'discoveryDesc' },
    { index: '02', titleKey: 'architecture', descKey: 'architectureDesc' },
    { index: '03', titleKey: 'execution', descKey: 'executionDesc' },
    { index: '04', titleKey: 'evolution', descKey: 'evolutionDesc' },
  ];

  return (
    <>
      <PageMeta title={t('solutions.title')} description={t('solutions.subtitle')} path="/solutions" lang={currentLang} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
      <GrainOverlay />
      <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('solutions.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('solutions.title')}</h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('solutions.subtitle')}</p>
        </section>
        <section className="col-span-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((s, idx) => (
              <div key={s.titleKey} className={`animate-reveal stagger-${idx + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500`}>
                <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">{t(`solutions.${s.titleKey}`)}</h3>
                <p className="text-foreground/60 leading-relaxed mb-6">{t(`solutions.${s.descKey}`)}</p>
                <ul className="space-y-2">
                  {s.featureKeys.map((fk) => (
                    <li key={fk} className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary/50 rounded-full" />{t(`solutions.${fk}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">{t('solutions.approachLabel')}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((a) => (
              <div key={a.index} className="space-y-4">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center"><span className="font-mono text-xs text-primary">{a.index}</span></div>
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight">{t(`solutions.${a.titleKey}`)}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{t(`solutions.${a.descKey}`)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground tracking-tight mb-4">{t('solutions.ctaTitle')}</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">{t('solutions.ctaSubtitle')}</p>
          <Link to={`/${currentLang}/contact`} onClick={() => trackEvent('cta_click', { location: 'solutions_page', label: 'Start a conversation' })} className="inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">{t('solutions.ctaButton')}</Link>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Solutions;
