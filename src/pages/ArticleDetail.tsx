import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { useState } from 'react';
import DOMPurify from 'dompurify';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const article = getArticleBySlug(slug || '');
  const related = getRelatedArticles(slug || '', 3);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <PageLayout>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center">
          <h1 className="font-display font-extrabold text-3xl text-foreground tracking-tight mb-4">{t('resources.articleNotFound')}</h1>
          <Link to={`/${currentLang}/resources`} className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors">{t('resources.backToResources')}</Link>
        </section>
      </PageLayout>
    );
  }

  const handleCopyLink = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const shareOnLinkedIn = () => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank'); };
  const shareOnX = () => { window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank'); };

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let key = 0;
    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(<ul key={key++} className="list-disc list-inside space-y-2 text-foreground/80 leading-relaxed mb-6 ml-4">{listItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(item)) }} />)}</ul>);
        listItems = [];
      }
    };
    const formatInline = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>').replace(/`(.+?)`/g, '<code class="font-mono text-sm bg-muted px-1.5 py-0.5">$1</code>');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) { flushList(); continue; }
      if (trimmed.startsWith('### ')) { flushList(); elements.push(<h3 key={key++} className="font-display font-extrabold text-lg text-foreground tracking-tight mt-8 mb-3">{trimmed.slice(4)}</h3>); }
      else if (trimmed.startsWith('## ')) { flushList(); elements.push(<h2 key={key++} className="font-display font-extrabold text-2xl text-foreground tracking-tight mt-12 mb-4">{trimmed.slice(3)}</h2>); }
      else if (trimmed.startsWith('- ')) { listItems.push(trimmed.slice(2)); }
      else if (/^\d+\.\s/.test(trimmed)) { listItems.push(trimmed.replace(/^\d+\.\s/, '')); }
      else { flushList(); elements.push(<p key={key++} className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatInline(trimmed)) }} />); }
    }
    flushList();
    return elements;
  };

  return (
    <PageLayout>
      <PageMeta title={t(`data.articles.${article.slug}.title`)} description={t(`data.articles.${article.slug}.excerpt`)} path={`/resources/${article.slug}`} lang={currentLang} />

      {/* Back link */}
      <div className="col-span-12 mb-4">
        <Link to={`/${currentLang}/resources`} className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300">← {t('resources.backToResources')}</Link>
      </div>

      {/* Article header */}
      <section className="col-span-12 lg:col-span-8 mb-8">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{article.category}</span>
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tighter leading-[0.95] mb-6">{t(`data.articles.${article.slug}.title`)}</h1>
        <div className="flex items-center gap-4 text-muted-foreground font-mono text-[0.65rem]">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <span>{article.author}</span>
        </div>
      </section>

      {/* Article content */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        {renderContent(article.content)}
      </section>

      {/* Share */}
      <section className="col-span-12 lg:col-span-8 mb-16 py-8 border-t border-border/30">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Share</span>
        <div className="flex gap-3">
          <button onClick={handleCopyLink} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">
            {copied ? 'Copied!' : 'Copy link'}
          </button>
          <button onClick={shareOnLinkedIn} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">LinkedIn</button>
          <button onClick={shareOnX} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">X</button>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="col-span-12 mb-16">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Related</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/${currentLang}/resources/${r.slug}`} className="border border-border/30 p-6 hover:border-primary/50 transition-colors duration-300 group">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{r.category}</span>
                <h3 className="font-display font-bold text-lg mt-2 mb-3 group-hover:text-primary transition-colors duration-300">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ArticleDetail;
