import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import BulletList from "@/components/BulletList";
import { PILL_CLASS } from "@/lib/shared-styles";

const PROJECTS = [
  { title: "Helva Cloud", body: "A lightweight setup for shipping prototypes quickly with a clear path to production quality delivery.", linkLabel: "View project", href: "#" },
  { title: "Helva Toolbox", body: "Small focused AI utilities that solve specific business tasks without turning into complex platforms.", linkLabel: "View project", href: "#" },
  { title: "Flodhästen", body: "A language learning concept combining structured lessons with story based practice and scalable content structure.", linkLabel: "View project", href: "#" },
  { title: "OwlSec", body: "A concept for AI assisted security review workflows that prioritise actionable findings and developer clarity.", linkLabel: "View project", href: "#" },
  { title: "Operations analytics to product thinking", body: "Experience turning messy operational data into decisions, dashboards, and automation that reduces manual work.", linkLabel: "Read more", href: "#" },
];

const BACKGROUND = [
  "MSc with distinction in data science and business analytics",
  "Experience across operations, IT systems, and data work in real environments",
  "Comfortable owning delivery from requirements to production",
  "Based in Edinburgh and working through Helva Group",
];

const PROCESS = [
  "Start with user impact and a measurable definition of done",
  "Ship a thin slice first then iterate with feedback and metrics",
  "Treat evaluation as part of the feature not an afterthought",
  "Prefer simple architecture and clean interfaces over clever complexity",
  "Document decisions and keep handoffs predictable",
];

const COLLABORATION = [
  "Productionising AI features inside web products",
  "RAG and knowledge search that stays grounded and testable",
  "Agent workflows with guardrails and observable behaviour",
];

const AboutAbdalbast = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Abdalbast Khdhir, About</title>
        <meta name="description" content="About Abdalbast Khdhir at Helva Group. Shipping production AI features with a focus on reliability, evaluation, and end to end delivery." />
        <link rel="canonical" href="https://helva.group/about-abdalbast-khdhir" />
        <meta property="og:title" content="Abdalbast Khdhir, About" />
        <meta property="og:description" content="About Abdalbast Khdhir at Helva Group. Shipping production AI features with a focus on reliability, evaluation, and end to end delivery." />
        <meta property="og:url" content="https://helva.group/about-abdalbast-khdhir" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "Person", name: "Abdalbast Khdhir",
            url: "https://helva.group/about-abdalbast-khdhir",
            worksFor: { "@type": "Organization", name: "Helva Group", url: "https://helva.group" },
            address: { "@type": "PostalAddress", addressLocality: "Edinburgh", addressCountry: "GB" },
            sameAs: ["https://www.linkedin.com/in/abdalbast/", "https://github.com/abdalbast"],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://helva.group" },
              { "@type": "ListItem", position: 2, name: "About Abdalbast Khdhir", item: "https://helva.group/about-abdalbast-khdhir" },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Founder</span>
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">Abdalbast Khdhir</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-4">
          I build and ship AI powered product features end to end, from prototype to production. My focus is getting real systems working reliably in the hands of users, with clear evaluation, measurable outcomes, and maintainable engineering.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
          This page is the short version of who I am and the work I do at Helva Group. If you want the fastest overview, use the links below, or scroll for selected work and working style.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className={PILL_CLASS}>LinkedIn</a>
          <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className={PILL_CLASS}>GitHub</a>
          <a href="#contact" className={PILL_CLASS}>Contact</a>
        </div>
      </section>

      {/* Proof of work */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Selected work</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-8">Proof of work</h2>
        <div className="space-y-4">
          {PROJECTS.map((p) => (
            <div key={p.title} className="border border-border/30 p-6">
              <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.body}</p>
              <a href={p.href} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">{p.linkLabel}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Background</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">Background</h2>
        <BulletList items={BACKGROUND} />
      </section>

      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Process</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">How I work</h2>
        <BulletList items={PROCESS} />
      </section>

      <section className="col-span-12 lg:col-span-10 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Collaboration</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-6">Collaboration</h2>
        <BulletList items={COLLABORATION} />
      </section>

      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">More</span>
        <div className="flex flex-wrap gap-3">
          <Link to="/abdalbast-khdhir-portfolio" className={PILL_CLASS}>Portfolio</Link>
          <Link to="/abdalbast-khdhir-projects" className={PILL_CLASS}>Projects</Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="col-span-12 lg:col-span-8 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Get in touch</span>
        <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-4">Contact</h2>
        <p className="text-muted-foreground mb-2">If you want to collaborate, hire, or talk about shipping AI into real products, reach out.</p>
        <p className="text-muted-foreground mb-8">
          <a href="mailto:hello@helva.group" className="text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">hello@helva.group</a>
        </p>
        <ContactForm idPrefix="about" />
      </section>
    </PageLayout>
  );
};

export default AboutAbdalbast;
