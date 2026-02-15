import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FacadeContainer from '@/components/FacadeContainer';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  const { currentLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <>
      <PageMeta title={t('home.headline').replace(/<br\/?>/g, ' ')} description={t('home.subheadline')} path="/" lang={currentLang} />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <HeroSection />
        <FacadeContainer />
        <Footer />
      </main>
    </>
  );
};

export default Index;
