import { useParams, Link } from 'react-router-dom';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { useState } from 'react';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const related = getRelatedArticles(slug || '', 3);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <>
        <GrainOverlay />
        <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center">
            <h1 className="font-display font-extrabold text-3xl text-foreground tracking-tight mb-4">
              Article not found
            </h1>
            <Link
              to="/resources"
              className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors"
            >
              ← Back to Resources
            </Link>
          </section>
          <Footer />
        </main>
      </>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const shareOnX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  // Simple markdown-to-JSX: headings, bold, lists, paragraphs, inline code
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 text-foreground/80 leading-relaxed mb-6 ml-4">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/`(.+?)`/g, '<code class="font-mono text-sm bg-muted px-1.5 py-0.5">$1</code>');
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={key++} className="font-display font-extrabold text-lg text-foreground tracking-tight mt-8 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={key++} className="font-display font-extrabold text-2xl text-foreground tracking-tight mt-12 mb-4">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith('- ')) {
        listItems.push(trimmed.slice(2));
      } else if (/^\d+\.\s/.test(trimmed)) {
        listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      } else {
        flushList();
        elements.push(
          <p key={key++} className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      }
    }
    flushList();
    return elements;
  };

  return (
    <>
      <PageMeta
        title={article.title}
        description={article.excerpt}
        path={`/resources/${article.slug}`}
      />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Back link */}
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <Link
            to="/resources"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            ← Resources
          </Link>
        </div>

        {/* Article header */}
        <article className="col-span-12 lg:col-span-8 lg:col-start-3 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">
              {article.category}
            </span>
            <span className="font-mono text-[0.65rem] text-muted-foreground">
              {article.date}
            </span>
            <span className="font-mono text-[0.65rem] text-muted-foreground">
              {article.readTime}
            </span>
          </div>

          <h1 className="animate-reveal font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-foreground tracking-tighter mb-6">
            {article.title}
          </h1>

          <p className="animate-reveal stagger-1 text-xl text-foreground/70 leading-relaxed mb-8 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="animate-reveal stagger-2 flex items-center gap-2 mb-12 text-muted-foreground font-mono text-[0.65rem] uppercase tracking-[0.15em]">
            By {article.author}
          </div>

          {/* Content */}
          <div className="animate-reveal stagger-3 border-t border-border/30 pt-10 mb-16">
            {renderContent(article.content)}
          </div>

          {/* Share */}
          <div className="border-t border-border/30 pt-8 mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-4">
              Share this article
            </span>
            <div className="flex gap-3">
              <button
                onClick={shareOnLinkedIn}
                className="font-mono text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                LinkedIn
              </button>
              <button
                onClick={shareOnX}
                className="font-mono text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                X
              </button>
              <button
                onClick={handleCopyLink}
                className="font-mono text-[0.65rem] uppercase tracking-[0.15em] px-4 py-2 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="col-span-12 py-8 border-t border-border/30">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
              Related Articles
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/resources/${rel.slug}`}
                  className="group p-6 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">
                      {rel.category}
                    </span>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      {rel.date}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                    {rel.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
};

export default ArticleDetail;
