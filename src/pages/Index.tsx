import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FacadeContainer from '@/components/FacadeContainer';

import NewsletterSection from '@/components/NewsletterSection';

const Index = () => {
  return (
    <>
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <HeroSection />
        <FacadeContainer />
        <NewsletterSection />
        
      </main>
    </>
  );
};

export default Index;
