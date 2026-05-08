import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import DOMPurify from 'dompurify';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';

type CapabilityIconName = 'automation' | 'personalization' | 'language' | 'analytics';

type Capability = {
  titleKey: string;
  descKey: string;
  icon: CapabilityIconName;
};

const capabilityIconClassName = 'mb-4 h-7 w-7 text-primary';

const CapabilityIcon = ({ name }: { name: CapabilityIconName }) => {
  if (name === 'automation') {
    return (
      <svg className={capabilityIconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M13.25 2.75 5.75 13h5.65l-.65 8.25 7.5-10.25H12.6l.65-8.25Z"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === 'personalization') {
    return (
      <svg className={capabilityIconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <circle cx="12" cy="12" r="7.75" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.35" />
        <path d="M12 4.25v3M12 16.75v3M4.25 12h3M16.75 12h3" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'language') {
    return (
      <svg className={capabilityIconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M5.25 5.25h13.5v9.5H10.6l-4.1 3.5v-3.5H5.25v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path d="M8.5 9.1h7M8.5 12h4.75" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={capabilityIconClassName} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M5.25 18.75h13.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M7.25 15.75v-4M12 15.75v-8.5M16.75 15.75v-6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M6.75 6.75 10 9.5l3.15-3.2 4.1 2.45" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const AI = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const capabilities: Capability[] = [
    { titleKey: 'intelligentAutomation', descKey: 'intelligentAutomationDesc', icon: 'automation' },
    { titleKey: 'personalizationEngines', descKey: 'personalizationEnginesDesc', icon: 'personalization' },
    { titleKey: 'naturalLanguage', descKey: 'naturalLanguageDesc', icon: 'language' },
    { titleKey: 'predictiveAnalytics', descKey: 'predictiveAnalyticsDesc', icon: 'analytics' },
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
          {capabilities.map(({ titleKey, descKey, icon }) => (
            <div key={titleKey} className="border border-border/30 p-8">
              <CapabilityIcon name={icon} />
              <h2 className="font-display font-bold text-xl mb-3">{t(`ai.${titleKey}`)}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`ai.${descKey}`)}</p>
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
