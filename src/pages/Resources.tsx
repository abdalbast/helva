import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const articles = [
  {
    category: 'Design Systems',
    title: 'Building Design Systems That Scale',
    excerpt: 'How to create component libraries that grow with your organization without becoming unwieldy.',
    readTime: '8 min read',
    date: 'Dec 2024',
  },
  {
    category: 'Product Strategy',
    title: 'The Case for Slower Product Development',
    excerpt: 'Why taking time to build foundations pays dividends in the long run.',
    readTime: '5 min read',
    date: 'Nov 2024',
  },
  {
    category: 'Engineering',
    title: 'Choosing Boring Technology',
    excerpt: 'Proven tools over shiny new frameworks. A philosophy for sustainable technical decisions.',
    readTime: '6 min read',
    date: 'Oct 2024',
  },
];

const resources = [
  {
    type: 'Template',
    title: 'Design Token Starter',
    description: 'A minimal foundation for building your own design token system.',
    format: 'Figma + Code',
  },
  {
    type: 'Guide',
    title: 'Component Documentation',
    description: 'How we document our components for clarity and maintainability.',
    format: 'PDF',
  },
  {
    type: 'Checklist',
    title: 'Product Launch Readiness',
    description: 'Everything to verify before shipping a new product or feature.',
    format: 'Notion',
  },
];

const Resources = () => {
  return (
    <>
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Hero */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            Learn & Build
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
            Resources
          </h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
            Insights, templates, and guides from our experience building digital products. Open knowledge for the community.
          </p>
        </section>

        {/* Articles */}
        <section className="col-span-12 py-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
            Latest Articles
          </span>
          <div className="space-y-6">
            {articles.map((article, idx) => (
              <article
                key={article.title}
                className={`animate-reveal stagger-${idx + 1} group p-6 lg:p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">
                        {article.category}
                      </span>
                      <span className="font-mono text-[0.65rem] text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                    <span className="font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
            Free Resources
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group p-6 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                    {resource.type}
                  </span>
                  <span className="font-mono text-[0.65rem] text-primary/60">
                    {resource.format}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors duration-300">
                  Download →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <h2 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-4">
            Stay in the loop
          </h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Occasional updates on new resources, articles, and product launches. No spam, unsubscribe anytime.
          </p>
          <a
            href="mailto:updates@helva.group?subject=Newsletter Subscription"
            className="inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Subscribe to updates
          </a>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Resources;
