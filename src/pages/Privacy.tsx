import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';

const Privacy = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <AnimatedPage>
      <>
        <PageMeta title={t('privacy.title')} description={t('privacy.subtitle')} path="/privacy" lang={currentLang} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          {/* ... keep existing code (privacy sections) ... */}
        </main>
      </>
    </AnimatedPage>
  );
};

export default Privacy;
