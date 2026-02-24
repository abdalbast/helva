import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';
import LlmSummary from '@/components/LlmSummary';

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
    <AnimatedPage>
      <>
        <PageMeta title={t('solutions.title')} description={t('solutions.subtitle')} path="/solutions" lang={currentLang} />
        <LlmSummary
          quickAnswer="Helva offers services for startups (design systems, brand identity, product strategy), enterprises (system modernisation, process automation), and agencies (white-label products, technical partnerships)."
          audience={["Startup founders", "Enterprise teams", "Agency partners"]}
          actions={["Explore startup foundations", "Learn about enterprise modernisation", "Discover agency partnership models", "Contact Helva for a project"]}
          relatedPages={[
            { label: "Helva Products", href: "/en/projects" },
            { label: "Contact Helva", href: "/en/contact" },
          ]}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />

          {/* Label */}
          <div className="col-span-12 mb-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('solutions.label')}</span>
          </div>

          {/* Hero */}
          <section className="col-span-12 lg:col-span-8 mb-16">
            <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('solutions.title')}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('solutions.subtitle')}</p>
          </section>

          {/* Solution Cards */}
          <section className="col-span-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {solutions.map((sol) => (
                <div key={sol.titleKey} className="border border-border/30 p-8">
                  <h2 className="font-display font-bold text-2xl tracking-tight mb-4">{t(`solutions.${sol.titleKey}`)}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(`solutions.${sol.descKey}`)}</p>
                  <ul className="space-y-2">
                    {sol.featureKeys.map((fk) => (
                      <li key={fk} className="font-mono text-xs text-foreground/80 flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {t(`solutions.${fk}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Our Approach */}
          <section className="col-span-12 mb-16">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">{t('solutions.approachLabel')}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {approaches.map((a) => (
                <div key={a.index} className="border border-border/30 p-6">
                  <span className="font-mono text-xs text-primary mb-3 block">{a.index}</span>
                  <h3 className="font-display font-bold text-lg mb-3">{t(`solutions.${a.titleKey}`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`solutions.${a.descKey}`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="col-span-12 mb-16 py-12 border-t border-b border-border/30 text-center">
            <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight mb-4">{t('solutions.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8">{t('solutions.ctaSubtitle')}</p>
            <Link
              to={`/${currentLang}/contact`}
              onClick={() => trackEvent('solutions_cta_click')}
              className="inline-block font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {t('solutions.ctaButton')}
            </Link>
          </section>

          <Footer />
        </main>
      </>
    </AnimatedPage>
  );
};

export default Solutions;
