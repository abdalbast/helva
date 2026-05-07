import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FacadeContainer from '@/components/FacadeContainer';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';
import HomeNewsletterSection from '@/components/HomeNewsletterSection';

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
          "name": "Helva",
          "url": "https://helva.io",
          "description": "Helva builds AI products for underserved languages, multilingual knowledge, and trusted European AI.",
          "founder": { "@type": "Person", "name": "Abdalbast Khdhir", "url": "https://helva.io/about-abdalbast-khdhir" },
          "address": { "@type": "PostalAddress", "addressLocality": "Edinburgh", "addressCountry": "GB" },
          "contactPoint": { "@type": "ContactPoint", "email": "founder@helva.io", "contactType": "sales" }
        })}</script>
      </Helmet>
      <LlmSummary
        quickAnswer="Helva builds AI products for underserved languages and trusted European AI. Products: Deqnus (Kurdish–English translation, live) and Helva Chat (multilingual AI assistant, in development)."
        audience={["Founders and investors evaluating Helva", "Users seeking Kurdish translation tools", "Enterprises looking for European-compliant AI"]}
        actions={["Try Deqnus for Kurdish translation", "Learn about Helva Chat", "Read the Helva thesis", "Contact Helva"]}
        relatedPages={[
          { label: "Helva Products", href: "/en/products" },
          { label: "Thesis", href: "/en/thesis" },
          { label: "Solutions", href: "/en/solutions" },
          { label: "AI at Helva", href: "/en/ai" },
          { label: "Contact Helva", href: "/en/contact" },
        ]}
      />
      <HeroSection />
      <FacadeContainer />

      {/* Proof Strip */}
      <section className="col-span-12 py-12 border-t border-border/30 mt-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">{t('home.proofLabel')}</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['proof1', 'proof2', 'proof3'].map((key) => (
            <div key={key} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
              <span className="text-foreground/80 text-sm leading-relaxed">{t(`home.${key}`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Gap */}
      <section className="col-span-12 lg:col-span-10 py-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.gapLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('home.gapTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t('home.gapP1')}</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t('home.gapP2')}</p>
      </section>

      {/* Products */}
      <section className="col-span-12 py-16 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.productsLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-12">{t('home.productsTitle')}</h2>

        {/* Deqnus Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="border border-border/30 p-8">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary mb-4 block">{t('home.deqnusPitchLabel')}</span>
            <h3 className="font-display font-bold text-2xl tracking-tight mb-4">{t('home.deqnusPitchTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{t('home.deqnusPitchDesc')}</p>
            <a href="https://deqnus.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-300">
              {t('home.deqnusCta')} →
            </a>
          </div>

          {/* Helva Chat Pitch */}
          <div className="border border-border/30 p-8">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary mb-4 block">{t('home.helvaChatPitchLabel')}</span>
            <h3 className="font-display font-bold text-2xl tracking-tight mb-4">{t('home.helvaChatPitchTitle')}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{t('home.helvaChatPitchDesc')}</p>
            <Link to={`/${currentLang}/products/helva-chat`} className="inline-block font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-300">
              {t('home.helvaChatCta')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Agentic Engineering */}
      <section className="col-span-12 lg:col-span-10 py-16 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.agenticLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('home.agenticTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t('home.agenticP1')}</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t('home.agenticP2')}</p>
      </section>

      {/* Why Now */}
      <section className="col-span-12 lg:col-span-10 py-16 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.whyNowLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('home.whyNowTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t('home.whyNowP1')}</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t('home.whyNowP2')}</p>
      </section>

      {/* Founder-Market Fit */}
      <section className="col-span-12 lg:col-span-10 py-16 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.founderFitLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('home.founderFitTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t('home.founderFitDesc')}</p>
      </section>

      {/* Roadmap */}
      <section className="col-span-12 py-16 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('home.roadmapLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-8">{t('home.roadmapTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Q1 2026', desc: t('home.roadmapQ1') },
            { label: 'Q2 2026', desc: t('home.roadmapQ2') },
            { label: 'Q3 2026', desc: t('home.roadmapQ3') },
            { label: 'Q4 2026', desc: t('home.roadmapQ4') },
          ].map((item) => (
            <div key={item.label} className="border border-border/30 p-6">
              <span className="font-mono text-xs text-primary mb-3 block">{item.label}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="col-span-12 py-16 border-t border-border/30 text-center">
        <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight mb-4">{t('home.finalCtaTitle')}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('home.finalCtaDesc')}</p>
        <Link
          to={`/${currentLang}/contact`}
          className="inline-block font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {t('home.finalCtaCta')} →
        </Link>
      </section>

      <HomeNewsletterSection />
    </PageLayout>
  );
};

export default Index;
