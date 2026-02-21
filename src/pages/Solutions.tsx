import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';

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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          {/* ... keep existing code (all sections) ... */}
        </main>
      </>
    </AnimatedPage>
  );
};

export default Solutions;
