import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { usePageTracking } from "@/hooks/usePageTracking";
import '@/i18n/config';
import CookieConsent from "./components/CookieConsent";

// Lazy-loaded route pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Solutions = lazy(() => import("./pages/Solutions"));
const AI = lazy(() => import("./pages/AI"));
const Thesis = lazy(() => import("./pages/Thesis"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutAbdalbast = lazy(() => import("./pages/AboutAbdalbast"));
const PortfolioAbdalbast = lazy(() => import("./pages/PortfolioAbdalbast"));
const ProjectsAbdalbast = lazy(() => import("./pages/ProjectsAbdalbast"));

const queryClient = new QueryClient();

/** Redirect helper for legacy routes */
const LangRedirect = ({ from, to }: { from: string; to: string }) => {
  const location = useLocation();
  const lang = location.pathname.split('/')[1] || 'en';
  return <Navigate to={`/${lang}/${to}`} replace />;
};

/** Inner component so usePageTracking has access to router context */
const AppRoutes = () => {
  usePageTracking();
  const location = useLocation();
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* SEO landing pages */}
          <Route path="/about-abdalbast-khdhir" element={<AboutAbdalbast />} />
          <Route path="/abdalbast-khdhir-portfolio" element={<PortfolioAbdalbast />} />
          <Route path="/abdalbast-khdhir-projects" element={<ProjectsAbdalbast />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang">
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            {/* Canonical product routes */}
            <Route path="products" element={<Projects />} />
            <Route path="products/:slug" element={<ProjectDetail />} />
            {/* Legacy project routes redirect to products */}
            <Route path="projects" element={<Navigate to="../products" replace />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="ai" element={<AI />} />
            <Route path="thesis" element={<Thesis />} />
            {/* Legacy resources redirect to thesis */}
            <Route path="resources" element={<Navigate to="../thesis" replace />} />
            <Route path="resources/:slug" element={<Navigate to="../thesis" replace />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
          <CookieConsent />
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
