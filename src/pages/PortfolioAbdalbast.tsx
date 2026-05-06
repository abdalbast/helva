import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import BulletList from "@/components/BulletList";
import { PILL_CLASS } from "@/lib/shared-styles";

const CASE_STUDIES = [
  { title: "Helva Cloud", problem: "Early stage products need a fast path from prototype to production without rewriting everything.", approach: "Set up a repeatable delivery baseline with clear environments, clean data access patterns, and a deployment first mindset.", outcome: "Reduced time to ship new iterations and improved consistency across projects.", stack: "Next.js, TypeScript, Supabase, Vercel", status: "Active" },
  { title: "Helva Toolbox", problem: "Entrepreneurs often need one useful tool now, not a full platform.", approach: "Design small utilities with tight scopes, clear inputs and outputs, and sensible defaults.", outcome: "Faster task completion and less manual admin work.", stack: "Next.js, TypeScript, API integrations", status: "Ongoing" },
  { title: "Flodhästen", problem: "Language learning apps struggle with content structure and retention.", approach: "Create a simple lesson format and a story mode structure that scales cleanly.", outcome: "A content system that can be expanded without rewriting lesson logic.", stack: "React, TypeScript, structured content schemas", status: "Prototype" },
  { title: "OwlSec", problem: "Security feedback is often noisy and hard to action for developers.", approach: "Define a workflow that produces clear findings, prioritisation, and developer friendly guidance.", outcome: "A concept for a review pipeline that focuses on actionable outcomes.", stack: "Web app patterns, automation, AI assisted analysis concepts", status: "Concept" },
  { title: "Operations analytics to automation", problem: "Teams waste time on repetitive reporting and manual checks.", approach: "Translate operational needs into data models and lightweight automations.", outcome: "Less manual work and better visibility for decisions.", stack: "SQL, Python, integrations", status: "Delivered" },
];

const EXPECTATIONS = [
  "End to end ownership from spec to production",
  "Evaluation as part of the feature lifecycle",
  "Clean data models and pragmatic APIs",
  "Grounded AI behaviour with guardrails",
  "Fast prototypes with a production path",
  "Documentation that reduces handoff friction",
];

const PortfolioAbdalbast = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Abdalbast Khdhir Portfolio, Helva Ltd.</title>
        <meta name="description" content="Portfolio of selected product and AI engineering work by Abdalbast Khdhir at Helva Ltd., including production focused implementations and prototypes." />
        <link rel="canonical" href="https://helva.io/abdalbast-khdhir-portfolio" />
        <meta property="og:title" content="Abdalbast Khdhir Portfolio, Helva Ltd." />
        <meta property="og:description" content="Portfolio of selected product and AI engineering work by Abdalbast Khdhir at Helva Ltd., including production focused implementations and prototypes." />
        <meta property="og:url" content="https://helva.io/abdalbast-khdhir-portfolio" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage", name: "Abdalbast Khdhir Portfolio",
          url: "https://helva.io/abdalbast-khdhir-portfolio",
          about: { "@type": "Person", name: "Abdalbast Khdhir", sameAs: ["https://www.linkedin.com/in/abdalbast/", "https://github.com/abdalbast"] },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://helva.io" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://helva.io/abdalbast-khdhir-portfolio" },
          ],
        })}</script>
      </Helmet>

      {/* Back link */}
      <div className="col-span-12 mb-2">
        <Link to="/en" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300">← Back to Helva Ltd.</Link>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Founder portfolio</span>
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">Portfolio</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          A selection of work that shows how I take an idea from problem definition to a shipped feature. Each item below is written in a simple case study format so you can scan quickly.
        </p>
      </section>

      {/* Case studies */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Case studies</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-8">Selected case studies</h2>
        <div className="space-y-6">
          {CASE_STUDIES.map((c) => (
            <div key={c.title} className="border border-border/30 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <h3 className="font-display font-bold text-lg">{c.title}</h3>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] border border-border/50 px-3 py-0.5 text-muted-foreground whitespace-nowrap">{c.status}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-3 text-sm text-muted-foreground mb-4">
                <div><span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Problem</span>{c.problem}</div>
                <div><span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Approach</span>{c.approach}</div>
                <div><span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Outcome</span>{c.outcome}</div>
              </div>
              <p className="font-mono text-[0.6rem] text-muted-foreground/60">Stack: {c.stack}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you can expect */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Standards</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-4">What you can expect from my work</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
          I optimise for reliable delivery, clarity, and measurable impact. I prefer simple architecture, strong interfaces, and fast iteration loops that are backed by evaluation where AI is involved.
        </p>
        <BulletList items={EXPECTATIONS} />
      </section>

      {/* Links */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Links</span>
        <div className="flex flex-wrap gap-3">
          <Link to="/about-abdalbast-khdhir" className={PILL_CLASS}>About Abdalbast</Link>
          <Link to="/abdalbast-khdhir-projects" className={PILL_CLASS}>Projects</Link>
          <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className={PILL_CLASS}>LinkedIn</a>
          <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className={PILL_CLASS}>GitHub</a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="col-span-12 lg:col-span-8 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Get in touch</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-4">Contact</h2>
        <p className="text-muted-foreground mb-2">If you are hiring or want to collaborate, send a message.</p>
        <p className="text-muted-foreground mb-8"><a href="mailto:founder@helva.io" className="text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">founder@helva.io</a></p>
        <ContactForm idPrefix="portfolio" />
      </section>
    </PageLayout>
  );
};

export default PortfolioAbdalbast;
