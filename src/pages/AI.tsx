import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const capabilities = [
  {
    title: 'Intelligent Automation',
    description: 'Automate repetitive workflows while maintaining quality and consistency. From content generation to data processing.',
    icon: '⚡',
  },
  {
    title: 'Personalization Engines',
    description: 'Dynamic experiences that adapt to individual users. Learning systems that get smarter with every interaction.',
    icon: '🎯',
  },
  {
    title: 'Natural Language',
    description: 'Conversational interfaces and text analysis. Making human-computer interaction feel natural and intuitive.',
    icon: '💬',
  },
  {
    title: 'Predictive Analytics',
    description: 'Turn data into foresight. Pattern recognition and forecasting that helps you make better decisions.',
    icon: '📊',
  },
];

const principles = [
  {
    title: 'Human-Centered',
    description: 'AI should augment human capability, not replace human judgment. We build tools that empower, not automate away.',
  },
  {
    title: 'Transparent',
    description: 'No black boxes. We believe in explainable AI that users can understand, trust, and control.',
  },
  {
    title: 'Ethical',
    description: 'Privacy by design, bias awareness, and responsible deployment. Technology that serves everyone fairly.',
  },
];

const AI = () => {
  return (
    <>
      <PageMeta title="AI" description="Helva's AI philosophy — intelligent automation, personalization, and natural language capabilities built with intention." path="/ai" />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Hero */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            Intelligence Layer
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
            AI
          </h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
            Artificial intelligence that feels natural. We integrate AI thoughtfully across our products — not as a gimmick, but as genuine capability.
          </p>
        </section>

        {/* Capabilities Grid */}
        <section className="col-span-12 py-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
            Capabilities
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, idx) => (
              <div
                key={capability.title}
                className={`animate-reveal stagger-${(idx % 4) + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500`}
              >
                <span className="text-2xl mb-4 block">{capability.icon}</span>
                <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How We Think About AI */}
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                Philosophy
              </span>
              <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">
                AI with intention.
              </h2>
            </div>
            <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
              <p>
                The best AI is invisible. It doesn't demand attention — it simply makes everything work better.
              </p>
              <p>
                We don't add AI to check a box. We integrate it where it genuinely improves the experience, and we leave it out where it doesn't.
              </p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="col-span-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="space-y-4 p-6 border-l-2 border-primary/30">
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Note */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Currently Integrating
          </p>
          <p className="text-foreground/80 text-lg max-w-xl mx-auto">
            AI capabilities are being woven into <span className="text-primary font-medium">Pulse</span>, <span className="text-primary font-medium">Lingua</span>, and <span className="text-primary font-medium">Nexus</span> — our upcoming product family.
          </p>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default AI;
