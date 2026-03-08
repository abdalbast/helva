import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import DOMPurify from 'dompurify';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';

const AI = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const capabilities = [
    { titleKey: 'intelligentAutomation', descKey: 'intelligentAutomationDesc', icon: '⚡' },
    { titleKey: 'personalizationEngines', descKey: 'personalizationEnginesDesc', icon: '🎯' },
    { titleKey: 'naturalLanguage', descKey: 'naturalLanguageDesc', icon: '💬' },
    { titleKey: 'predictiveAnalytics', descKey: 'predictiveAnalyticsDesc', icon: '📊' },
  ];

  const principles = [
    { titleKey: 'humanCentered', descKey: 'humanCenteredDesc' },
    { titleKey: 'transparent', descKey: 'transparentDesc' },
    { titleKey: 'ethical', descKey: 'ethicalDesc' },
  ];

  return (
    <PageLayout>
      <PageMeta title={t('ai.title')} description={t('ai.subtitle')} path="/ai" lang={currentLang} />
      <LlmSummary
        quickAnswer="Helva integrates AI across its products with capabilities in intelligent automation, personalisation engines, natural language processing, and predictive analytics."
        audience={["Technical buyers", "Founders evaluating AI capabilities", "LLM agents researching AI companies"]}
        actions={["Learn about Helva AI capabilities", "Understand the AI philosophy and principles", "Explore how AI is integrated into Helva products"]}
        relatedPages={[
          { label: "Helva Products", href: "/en/projects" },
          { label: "Solutions and Services", href: "/en/solutions" },
        ]}
      />

      {/* Label */}
      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('ai.label')}</span>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('ai.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('ai.subtitle')}</p>
      </section>

      {/* Capabilities */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">{t('ai.capabilitiesLabel')}</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.titleKey} className="border border-border/30 p-8">
              <span className="text-2xl mb-4 block">{cap.icon}</span>
              <h2 className="font-display font-bold text-xl mb-3">{t(`ai.${cap.titleKey}`)}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`ai.${cap.descKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('ai.philosophyLabel')}</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">{t('ai.philosophyTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{t('ai.philosophyP1')}</p>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">{t('ai.philosophyP2')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div key={p.titleKey} className="border border-border/30 p-6">
              <h3 className="font-display font-bold text-lg mb-3">{t(`ai.${p.titleKey}`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`ai.${p.descKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrating */}
      <section className="col-span-12 mb-16 py-12 border-t border-b border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t('ai.integratingLabel')}</span>
        <p className="text-muted-foreground leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t('ai.integratingDesc')) }} />
      </section>
    </PageLayout>
  );
};

export default AI;
