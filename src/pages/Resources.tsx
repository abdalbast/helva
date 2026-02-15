import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import { articles, categories } from '@/data/articles';
import { resources } from '@/data/resources';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const filtered = activeCategory ? articles.filter((a) => a.category === activeCategory) : articles;

  return (
    <>
      <PageMeta title={t('resources.title')} description={t('resources.subtitle')} path="/resources" lang={currentLang} />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('resources.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('resources.title')}</h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('resources.subtitle')}</p>
        </section>
        <section className="col-span-12 py-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveCategory(null)} className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${activeCategory === null ? 'border-primary text-primary' : 'border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30'}`}>{t('resources.all')}</button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${activeCategory === cat ? 'border-primary text-primary' : 'border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30'}`}>{cat}</button>
            ))}
          </div>
        </section>
        <section className="col-span-12 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">{t('resources.articles')} · {filtered.length}</span>
          <div className="space-y-6">
            {filtered.map((article, idx) => (
              <Link key={article.slug} to={`/${currentLang}/resources/${article.slug}`} className={`animate-reveal stagger-${Math.min(idx + 1, 4)} group block p-6 lg:p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">{article.category}</span>
                      <span className="font-mono text-[0.65rem] text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{t(`data.articles.${article.slug}.title`)}</h3>
                    <p className="text-foreground/60 leading-relaxed">{t(`data.articles.${article.slug}.excerpt`)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">{article.readTime}</span>
                    <span className="font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t('resources.read')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">{t('resources.freeResources')}</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const rKey = resource.title === 'Design Token Starter' ? 'designTokenStarter' : resource.title === 'Component Documentation' ? 'componentDocumentation' : 'productLaunchReadiness';
              return (
                <div key={resource.title} className="group p-6 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{resource.type}</span>
                    <span className="font-mono text-[0.65rem] text-primary/60">{resource.format}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{t(`data.resourceItems.${rKey}.title`)}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">{t(`data.resourceItems.${rKey}.description`)}</p>
                  <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors duration-300">{t('resources.download')}</span>
                </div>
              );
            })}
          </div>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-4">{t('resources.stayInLoop')}</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">{t('resources.stayInLoopDesc')}</p>
          <a href="mailto:updates@helva.group?subject=Newsletter Subscription" className="inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">{t('resources.subscribeToUpdates')}</a>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Resources;
