import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const About = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <>
      <PageMeta title={t('about.title')} description={t('about.intro')} path="/about" lang={currentLang} />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('about.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('about.title')}</h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('about.intro')}</p>
        </section>
        <section className="col-span-12 lg:col-span-10 lg:col-start-2 py-16 border-t border-border/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">{t('about.challengeLabel')}</span>
              <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">{t('about.challengeTitle')}</h2>
            </div>
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
              <p>{t('about.challengeP1')}</p>
              <p>{t('about.challengeP2')}</p>
              <p className="text-primary font-medium text-xl">{t('about.challengeHighlight')}</p>
            </div>
          </div>
        </section>
        <section className="col-span-12 py-16 border-t border-border/30">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">{t('about.nameLabel')}</span>
          <div className="max-w-3xl mb-12"><p className="text-foreground/80 text-xl leading-relaxed mb-8">{t('about.nameIntro')}</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-ochre-500 flex items-center justify-center"><span className="font-mono text-primary-foreground text-sm font-medium">01</span></div>
              <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">{t('about.completeness')}</h3>
              <p className="text-foreground/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.completenessDesc') }} />
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-terracotta flex items-center justify-center"><span className="font-mono text-foreground text-sm font-medium">02</span></div>
              <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">{t('about.warmth')}</h3>
              <p className="text-foreground/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.warmthDesc') }} />
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-cobblestone border border-border flex items-center justify-center"><span className="font-mono text-foreground text-sm font-medium">03</span></div>
              <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">{t('about.shareability')}</h3>
              <p className="text-foreground/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.shareabilityDesc') }} />
            </div>
          </div>
        </section>
        <section className="col-span-12 lg:col-span-10 lg:col-start-2 py-16 border-t border-border/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">{t('about.buildLabel')}</span>
              <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">{t('about.buildTitle')}</h2>
            </div>
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t('about.buildP1') }} />
              <p>{t('about.buildP2')}</p>
            </div>
          </div>
        </section>
        <section className="col-span-12 py-16 border-t border-border/30">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">{t('about.obsessionsLabel')}</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {['details', 'clarity', 'longevity'].map((key) => (
              <div key={key} className="space-y-4 p-6 bg-card/50 border border-border/30">
                <h3 className="font-display font-extrabold text-lg text-primary tracking-tight">{t(`about.${key}`)}</h3>
                <p className="text-foreground/60 leading-relaxed">{t(`about.${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-20 lg:py-32 border-t border-border/30">
          <div className="text-center">
            <blockquote className="font-display font-extrabold text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] text-foreground tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: t('about.quote') }} />
            <p className="text-foreground/60 text-lg max-w-xl mx-auto leading-relaxed">{t('about.quoteFollow')}</p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default About;
