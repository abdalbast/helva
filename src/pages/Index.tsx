import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import FacadeContainer from '@/components/FacadeContainer';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';

const Index = () => {
  const { currentLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <PageLayout>
      <PageMeta title={t('home.headline').replace(/<br\/?>/g, ' ')} description={t('home.subheadline')} path="/" lang={currentLang} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Helva Group",
          "url": "https://helva.group",
          "description": "Products, services, and case studies that help founders and teams build and ship modern digital products with AI.",
          "founder": { "@type": "Person", "name": "Abdalbast Khdhir", "url": "https://helva.group/about-abdalbast-khdhir" },
          "address": { "@type": "PostalAddress", "addressLocality": "Edinburgh", "addressCountry": "GB" },
          "contactPoint": { "@type": "ContactPoint", "email": "hello@helva.group", "contactType": "sales" }
        })}</script>
      </Helmet>
      <LlmSummary
        quickAnswer="Helva Group is the umbrella brand for products, services, and case studies that help founders and teams build and ship modern digital products with AI."
        audience={["Founders building digital products", "Small teams scaling operations", "Agencies seeking technical partnerships"]}
        actions={["Explore Helva products (Forma, Pulse, Lingua, Nexus)", "Learn about services for startups, enterprises, and agencies", "Contact Helva for a project"]}
        relatedPages={[
          { label: "About Helva Group", href: "/en/about" },
          { label: "Helva Products", href: "/en/projects" },
          { label: "Solutions and Services", href: "/en/solutions" },
          { label: "AI at Helva", href: "/en/ai" },
          { label: "Contact Helva", href: "/en/contact" },
        ]}
      />
      <HeroSection />
      <FacadeContainer />
    </PageLayout>
  );
};

export default Index;
