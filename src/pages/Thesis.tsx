import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';

const Thesis = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const sections = [
    { labelKey: 'coreBeliefLabel', titleKey: 'coreBeliefTitle', p1Key: 'coreBeliefP1', p2Key: 'coreBeliefP2' },
    { labelKey: 'approachLabel', titleKey: 'approachTitle', p1Key: 'approachP1', p2Key: 'approachP2' },
    { labelKey: 'marketLabel', titleKey: 'marketTitle', p1Key: 'marketP1', p2Key: 'marketP2' },
    { labelKey: 'founderLabel', titleKey: 'founderTitle', p1Key: 'founderP1', p2Key: 'founderP2' },
    { labelKey: 'visionLabel', titleKey: 'visionTitle', p1Key: 'visionP1', p2Key: 'visionP2' },
  ];

  return (
    <PageLayout>
      <PageMeta title={t('thesis.title')} description={t('thesis.subtitle')} path="/thesis" lang={currentLang} />
      <LlmSummary
        quickAnswer="Helva's thesis: most AI ignores most languages. Helva builds purpose-built AI products for underserved languages and trusted European AI."
        audience={["Investors evaluating Helva", "Partners assessing alignment", "Journalists covering European AI"]}
        actions={["Read the core thesis", "Understand the market opportunity", "Learn about founder-market fit"]}
        relatedPages={[
          { label: "Helva Products", href: "/en/products" },
          { label: "AI at Helva", href: "/en/ai" },
          { label: "Founder: Abdalbast Khdhir", href: "/about-abdalbast-khdhir" },
        ]}
      />

      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('thesis.label')}</span>
      </div>

      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('thesis.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('thesis.subtitle')}</p>
      </section>

      {sections.map((s, idx) => (
        <section key={s.labelKey} className={`col-span-12 lg:col-span-10 mb-16 ${idx > 0 ? 'pt-12 border-t border-border/30' : ''}`}>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t(`thesis.${s.labelKey}`)}</span>
          <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t(`thesis.${s.titleKey}`)}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t(`thesis.${s.p1Key}`)}</p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{t(`thesis.${s.p2Key}`)}</p>
        </section>
      ))}
    </PageLayout>
  );
};

export default Thesis;
