import { Link } from 'react-router-dom';
import GrainOverlay from '@/components/GrainOverlay';
import { trackEvent } from '@/lib/analytics';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const solutions = [
  {
    title: 'For Startups',
    description: 'Launch faster with foundational systems. Design infrastructure, operational frameworks, and scalable architecture from day one.',
    features: ['Design Systems', 'Brand Identity', 'Product Strategy', 'Technical Architecture'],
  },
  {
    title: 'For Enterprises',
    description: 'Modernize legacy systems without disruption. Phased migration, unified design language, and seamless integration.',
    features: ['System Modernization', 'Design Unification', 'Process Automation', 'Team Training'],
  },
  {
    title: 'For Agencies',
    description: 'White-label solutions and partnership frameworks. Extend your capabilities with our expertise and infrastructure.',
    features: ['White-Label Products', 'Technical Partnership', 'Resource Augmentation', 'Joint Ventures'],
  },
];

const approaches = [
  {
    index: '01',
    title: 'Discovery',
    description: 'We start by understanding your world — your challenges, your users, your vision. No assumptions, just listening.',
  },
  {
    index: '02',
    title: 'Architecture',
    description: 'We design systems, not just screens. Every decision considers scale, maintenance, and long-term evolution.',
  },
  {
    index: '03',
    title: 'Execution',
    description: 'We build with precision and care. Regular checkpoints, transparent progress, and quality at every step.',
  },
  {
    index: '04',
    title: 'Evolution',
    description: 'Launch is just the beginning. We partner for the long term, iterating and improving as you grow.',
  },
];

const Solutions = () => {
  return (
    <>
      <PageMeta title="Solutions" description="Tailored digital solutions for startups, enterprises, and agencies — from design systems to process automation." path="/solutions" />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Hero */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            What We Offer
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
            Solutions
          </h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
            Tailored approaches for different stages and scales. From founding teams to established enterprises.
          </p>
        </section>

        {/* Solutions Grid */}
        <section className="col-span-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((solution, idx) => (
              <div
                key={solution.title}
                className={`animate-reveal stagger-${idx + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500`}
              >
                <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-6">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-mono text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach */}
        <section className="col-span-12 py-16 border-t border-border/30 mt-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">
            Our Approach
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach) => (
              <div key={approach.index} className="space-y-4">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center">
                  <span className="font-mono text-xs text-primary">{approach.index}</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground tracking-tight">
                  {approach.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 text-center border-t border-border/30">
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-foreground tracking-tight mb-4">
            Ready to build something meaningful?
          </h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Let's discuss how we can help you create systems that last.
          </p>
          <Link
            to="/contact"
            onClick={() => trackEvent('cta_click', { location: 'solutions_page', label: 'Start a conversation' })}
            className="inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Start a conversation
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Solutions;
