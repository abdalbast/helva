import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';

const Privacy = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const sections = [
    { title: 'dataCollectionTitle', desc: 'dataCollectionDesc' },
    { title: 'cookiesTitle', desc: 'cookiesDesc' },
    { title: 'analyticsTitle', desc: 'analyticsDesc' },
    { title: 'rightsTitle', desc: 'rightsDesc' },
    { title: 'contactTitle', desc: 'contactDesc' },
  ];

  return (
    <PageLayout>
      <PageMeta title={t('privacy.title')} description={t('privacy.subtitle')} path="/privacy" lang={currentLang} />

      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('privacy.label')}</span>
      </div>

      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('privacy.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('privacy.subtitle')}</p>
      </section>

      <section className="col-span-12 lg:col-span-8 mb-16 space-y-12">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display font-bold text-xl mb-4">{t(`privacy.${s.title}`)}</h2>
            <p className="text-muted-foreground leading-relaxed">{t(`privacy.${s.desc}`)}</p>
          </div>
        ))}
        <p className="font-mono text-xs text-muted-foreground">{t('privacy.lastUpdated')}</p>
      </section>
    </PageLayout>
  );
};

export default Privacy;
