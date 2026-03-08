import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import { articles, categories } from '@/data/articles';
import { resources } from '@/data/resources';
import NewsletterSection from '@/components/NewsletterSection';
import LlmSummary from '@/components/LlmSummary';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const filtered = activeCategory ? articles.filter((a) => a.category === activeCategory) : articles;

  return (
    <PageLayout>
      <PageMeta title={t('resources.title')} description={t('resources.subtitle')} path="/resources" lang={currentLang} />

      {/* Label */}
      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('resources.label')}</span>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('resources.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('resources.subtitle')}</p>
      </section>

      {/* Articles */}
      <section className="col-span-12 mb-16">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-6">{t('resources.articles')}</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2 border transition-colors duration-300 ${
              !activeCategory ? 'border-primary text-primary' : 'border-border/30 text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('resources.all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2 border transition-colors duration-300 ${
                activeCategory === cat ? 'border-primary text-primary' : 'border-border/30 text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link key={article.slug} to={`/${currentLang}/resources/${article.slug}`} className="border border-border/30 p-6 hover:border-primary/50 transition-colors duration-300 group">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{article.category}</span>
              <h3 className="font-display font-bold text-lg mt-2 mb-3 group-hover:text-primary transition-colors duration-300">{article.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] text-muted-foreground">{article.date}</span>
                <span className="font-mono text-[0.6rem] text-muted-foreground">{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free Resources */}
      <section className="col-span-12 mb-16">
        <h2 className="font-display font-bold text-2xl tracking-tight mb-6">{t('resources.freeResources')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.title} className="border border-border/30 p-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-primary">{res.type}</span>
              <h3 className="font-display font-bold text-lg mt-2 mb-3">{res.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{res.description}</p>
              <span className="font-mono text-[0.6rem] text-muted-foreground">{res.format}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="col-span-12 mb-16">
        <NewsletterSection />
      </section>
    </PageLayout>
  );
};

export default Resources;
