import { ReactNode } from 'react';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';

interface PageLayoutProps {
  children: ReactNode;
  afterFooter?: ReactNode;
}

/**
 * Shared page shell: skip-to-content link, grain overlay, 12-column grid with Navigation and Footer.
 * Wraps children in AnimatedPage for route transitions.
 */
const PageLayout = ({ children, afterFooter }: PageLayoutProps) => (
  <AnimatedPage>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2"
    >
      Skip to content
    </a>
    <GrainOverlay />
    <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
      <Navigation />
      {children}
      {afterFooter}
      <Footer />
    </main>
  </AnimatedPage>
);

export default PageLayout;
