import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import LlmSummary from '@/components/LlmSummary';
import { projects, categories, statuses } from '@/data/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const statusMatch = activeStatus === 'All' || p.status === activeStatus;
    return catMatch && statusMatch;
  });

  return (
    <PageLayout>
      <PageMeta title={t('products.title')} description={t('products.subtitle')} path="/products" lang={currentLang} />
      <LlmSummary
        quickAnswer="Helva builds AI products for underserved languages: Deqnus (Kurdish–English translation, live) and Helva Chat (European multilingual AI assistant, in development)."
        audience={["Users seeking Kurdish translation", "Enterprises evaluating European AI", "Investors reviewing the product portfolio"]}
        actions={["Try Deqnus for Kurdish translation", "Learn about Helva Chat", "Contact Helva for partnerships"]}
        relatedPages={[
          { label: "Solutions", href: "/en/solutions" },
          { label: "AI at Helva", href: "/en/ai" },
        ]}
      />

      <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('products.label')}</span>
        <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('products.title')}</h1>
        <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('products.subtitle')}</p>
      </section>

      <section className="col-span-12 lg:col-span-8 lg:col-start-3 pb-4 animate-reveal stagger-3">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground mr-1">{t('products.category')}</span>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${activeCategory === cat ? 'border-primary text-primary bg-primary/5' : 'border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}>
                {cat === 'All' ? t('products.all') : t(`categories.${cat}`, cat)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground mr-1">{t('products.status')}</span>
            {statuses.map((s) => (
              <button key={s} onClick={() => setActiveStatus(s)} className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${activeStatus === s ? 'border-primary text-primary bg-primary/5' : 'border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}>
                {s === 'All' ? t('products.all') : t(`statuses.${s}`, s)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="col-span-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((project, idx) => (
            <Link to={`/${currentLang}/products/${project.slug}`} key={project.title} className={`animate-reveal stagger-${(idx % 4) + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:bg-card/50`}>
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-muted-foreground tracking-wide">{project.index}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">{t(`statuses.${project.status}`, project.status)}</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{t(`data.projects.${project.slug}.title`)}</h3>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">{t(`categories.${project.category}`, project.category)}</p>
              <p className="text-foreground/60 leading-relaxed mb-6">{t(`data.projects.${project.slug}.description`)}</p>
              <div className="flex justify-between items-center pt-4 border-t border-border/20">
                <span className="font-mono text-[0.65rem] text-muted-foreground/60">{project.year}</span>
                <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors duration-300">{t('products.viewCaseStudy')}</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12 font-mono text-sm">{t('products.noMatch')}</p>}
      </section>
    </PageLayout>
  );
};

export default Projects;
