import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';
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
      <AnimatedPage>
        <>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
          <GrainOverlay />
          <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
            <Navigation />
            <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center">
              <h1 className="font-display font-extrabold text-3xl text-foreground tracking-tight mb-4">{t('resources.articleNotFound')}</h1>
              <Link to={`/${currentLang}/resources`} className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors">{t('resources.backToResources')}</Link>
            </section>
            <Footer />
          </main>
        </>
      </AnimatedPage>
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
    <AnimatedPage>
      <>
        <PageMeta title={t(`data.articles.${article.slug}.title`)} description={t(`data.articles.${article.slug}.excerpt`)} path={`/resources/${article.slug}`} lang={currentLang} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          {/* ... keep existing code (article content, share buttons, related articles) ... */}
        </main>
      </>
    </AnimatedPage>
  );
};

export default ArticleDetail;
