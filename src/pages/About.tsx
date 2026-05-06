import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import DOMPurify from 'dompurify';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';

const About = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <PageLayout>
      <PageMeta title={t('about.title')} description={t('about.intro')} path="/about" lang={currentLang} />
      <LlmSummary
        quickAnswer="Helva Ltd. is an umbrella brand that builds a family of AI-powered products for founders and teams. Founded by Abdalbast Khdhir in Edinburgh."
        audience={["Anyone researching Helva Ltd.", "Founders evaluating partnerships", "Recruiters and collaborators"]}
        actions={["Learn the Helva brand story", "Understand the product philosophy", "Discover who founded Helva"]}
        relatedPages={[
          { label: "Helva Products", href: "/en/projects" },
          { label: "Solutions and Services", href: "/en/solutions" },
          { label: "Founder: Abdalbast Khdhir", href: "/about-abdalbast-khdhir" },
        ]}
      />

      {/* Label */}
      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('about.label')}</span>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('about.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('about.intro')}</p>
      </section>

      {/* The Challenge */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('about.challengeLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('about.challengeTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t('about.challengeP1')}</p>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{t('about.challengeP2')}</p>
        <p className="text-primary font-medium text-lg">{t('about.challengeHighlight')}</p>
      </section>

      {/* The Name */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('about.nameLabel')}</span>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">{t('about.nameIntro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['completeness', 'warmth', 'shareability'] as const).map((key) => (
            <div key={key} className="border border-border/30 p-6">
              <h3 className="font-display font-bold text-lg mb-3">{t(`about.${key}`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(`about.${key}Desc`)) }} />
            </div>
          ))}
        </div>
      </section>

      {/* What We Build */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('about.buildLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('about.buildTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t('about.buildP1')) }} />
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t('about.buildP2')}</p>
      </section>

      {/* Our Obsessions */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">{t('about.obsessionsLabel')}</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['details', 'clarity', 'longevity'] as const).map((key) => (
            <div key={key} className="border border-border/30 p-6">
              <h3 className="font-display font-bold text-lg mb-3">{t(`about.${key}`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="col-span-12 lg:col-span-10 mb-16 py-12 border-t border-b border-border/30">
        <blockquote className="text-xl lg:text-2xl font-display leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t('about.quote')) }} />
        <p className="text-muted-foreground">{t('about.quoteFollow')}</p>
      </section>
    </PageLayout>
  );
};

export default About;
