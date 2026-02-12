import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FacadeContainer from '@/components/FacadeContainer';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Helva Group — Digital Architecture for the Modern World" description="Helva builds beautifully crafted, deeply practical digital products across design systems, health, language learning, and operations." path="/" />
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
