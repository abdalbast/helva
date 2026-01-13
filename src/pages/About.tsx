import { Link } from 'react-router-dom';
import GrainOverlay from '@/components/GrainOverlay';

const About = () => {
  return (
    <>
      <GrainOverlay />
      <main className="min-h-screen p-5 lg:p-10">
        {/* Navigation */}
        <nav className="flex justify-between items-start border-b border-foreground/10 pb-5 mb-16">
          <Link to="/" className="font-display font-extrabold text-2xl tracking-tighter uppercase hover:text-primary transition-colors">
            Helva
          </Link>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            About
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-3xl mb-20 animate-reveal">
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-primary leading-[0.9] tracking-tight mb-8">
            The Helva<br />Story.
          </h1>
          <p className="text-xl lg:text-2xl text-foreground/80 leading-relaxed">
            Build life as a whole — with products that feel human and work like systems.
          </p>
        </section>

        {/* Brand Story */}
        <article className="max-w-2xl space-y-12 text-foreground/80 leading-relaxed">
          <section className="animate-reveal stagger-1">
            <p className="text-lg">
              Helva began as a simple idea: the modern world doesn't need more noise — it needs better systems.
            </p>
          </section>

          <section className="animate-reveal stagger-2">
            <p>
              Everything we build today is fragmented. Tools don't talk to each other. Brands feel inconsistent. Learning, health, work, and creativity live in separate boxes. People end up stitching their lives together with hacks, tabs, and half-finished plans.
            </p>
          </section>

          <section className="animate-reveal stagger-3">
            <h2 className="font-display font-extrabold text-2xl text-primary mb-4">
              Helva exists to bring it back to whole.
            </h2>
          </section>

          {/* The Name */}
          <section className="border-l-2 border-primary/30 pl-6 animate-reveal stagger-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              The Name
            </h3>
            <p className="mb-4">
              The name carries three truths: <strong className="text-foreground">completeness</strong>, <strong className="text-foreground">warmth</strong>, and <strong className="text-foreground">shareability</strong>.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-primary font-medium">Swedish:</span> In Swedish it echoes <em>hel</em> — the feeling of something finished, balanced, and complete.
              </li>
              <li>
                <span className="text-primary font-medium">Sorani Kurdish:</span> It nods to <em>halva</em> — something made with care and shared in meaningful moments.
              </li>
              <li>
                <span className="text-primary font-medium">English:</span> It stays clean and open — a word we get to define through what we make.
              </li>
            </ul>
          </section>

          {/* What We Build */}
          <section className="animate-reveal stagger-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              What We Build
            </h3>
            <p>
              We are building a family of products and services designed to feel like they belong together: beautifully crafted, deeply practical, and quietly powerful. Whether it's fitness, language learning, design systems, or digital operations, Helva is about making things that reduce friction and increase momentum.
            </p>
          </section>

          {/* Our Obsessions */}
          <section className="grid gap-6 md:grid-cols-3 animate-reveal stagger-4">
            <div className="bg-cobblestone/50 p-6 rounded">
              <h4 className="font-display font-bold text-primary mb-2">Details</h4>
              <p className="text-sm">
                We obsess over details because small details create trust.
              </p>
            </div>
            <div className="bg-cobblestone/50 p-6 rounded">
              <h4 className="font-display font-bold text-primary mb-2">Clarity</h4>
              <p className="text-sm">
                We design for clarity because clarity creates action.
              </p>
            </div>
            <div className="bg-cobblestone/50 p-6 rounded">
              <h4 className="font-display font-bold text-primary mb-2">Longevity</h4>
              <p className="text-sm">
                We build for longevity because the best products don't just launch — they last.
              </p>
            </div>
          </section>

          {/* Foundation */}
          <section className="animate-reveal stagger-4">
            <p className="text-lg">
              Helva is a modern foundation: <strong className="text-primary">warm enough to feel human</strong>, <strong className="text-primary">structured enough to scale</strong>.
            </p>
          </section>

          <section className="animate-reveal stagger-4 pb-20">
            <p className="text-lg italic text-muted-foreground">
              We don't chase trends. We build things that make life feel simpler, cleaner, and more complete.
            </p>
          </section>
        </article>

        {/* Back Link */}
        <div className="fixed bottom-10 left-10">
          <Link 
            to="/" 
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default About;
