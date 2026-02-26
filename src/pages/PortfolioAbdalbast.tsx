import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import AnimatedPage from "@/components/AnimatedPage";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(1, "Message is required"),
});

const CASE_STUDIES = [
  {
    title: "Helva Cloud",
    problem: "Early stage products need a fast path from prototype to production without rewriting everything.",
    approach: "Set up a repeatable delivery baseline with clear environments, clean data access patterns, and a deployment first mindset.",
    outcome: "Reduced time to ship new iterations and improved consistency across projects.",
    stack: "Next.js, TypeScript, Supabase, Vercel",
    status: "Active",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Helva Toolbox",
    problem: "Entrepreneurs often need one useful tool now, not a full platform.",
    approach: "Design small utilities with tight scopes, clear inputs and outputs, and sensible defaults.",
    outcome: "Faster task completion and less manual admin work.",
    stack: "Next.js, TypeScript, API integrations",
    status: "Ongoing",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Flodhästen",
    problem: "Language learning apps struggle with content structure and retention.",
    approach: "Create a simple lesson format and a story mode structure that scales cleanly.",
    outcome: "A content system that can be expanded without rewriting lesson logic.",
    stack: "React, TypeScript, structured content schemas",
    status: "Prototype",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "OwlSec",
    problem: "Security feedback is often noisy and hard to action for developers.",
    approach: "Define a workflow that produces clear findings, prioritisation, and developer friendly guidance.",
    outcome: "A concept for a review pipeline that focuses on actionable outcomes.",
    stack: "Web app patterns, automation, AI assisted analysis concepts",
    status: "Concept",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Operations analytics to automation",
    problem: "Teams waste time on repetitive reporting and manual checks.",
    approach: "Translate operational needs into data models and lightweight automations.",
    outcome: "Less manual work and better visibility for decisions.",
    stack: "SQL, Python, integrations",
    status: "Delivered",
    linkLabel: "Read more",
    href: "#",
  },
];

const PortfolioAbdalbast = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatedPage>
      <>
        <Helmet>
          <title>Abdalbast Khdhir Portfolio, Helva Group</title>
          <meta name="description" content="Portfolio of selected product and AI engineering work by Abdalbast Khdhir at Helva Group, including production focused implementations and prototypes." />
          <link rel="canonical" href="https://helva.group/abdalbast-khdhir-portfolio" />
          <meta property="og:title" content="Abdalbast Khdhir Portfolio, Helva Group" />
          <meta property="og:description" content="Portfolio of selected product and AI engineering work by Abdalbast Khdhir at Helva Group, including production focused implementations and prototypes." />
          <meta property="og:image" content="/og/abdalbast-portfolio.jpg" />
          <meta property="og:url" content="https://helva.group/abdalbast-khdhir-portfolio" />
          <meta property="og:type" content="website" />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Abdalbast Khdhir Portfolio",
            url: "https://helva.group/abdalbast-khdhir-portfolio",
            about: {
              "@type": "Person",
              name: "Abdalbast Khdhir",
              sameAs: ["https://www.linkedin.com/in/abdalbast/", "https://github.com/abdalbast"],
            },
          })}</script>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://helva.group" },
              { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://helva.group/abdalbast-khdhir-portfolio" },
            ],
          })}</script>
        </Helmet>

        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />

          {/* Back link */}
          <div className="col-span-12 mb-2">
            <Link to="/en" className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300">
              ← Back to Helva Group
            </Link>
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
                  <p className="font-mono text-[0.6rem] text-muted-foreground/60 mb-3">Stack: {c.stack}</p>
                  <a href={c.href} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">{c.linkLabel}</a>
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
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />End to end ownership from spec to production</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Evaluation as part of the feature lifecycle</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Clean data models and pragmatic APIs</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Grounded AI behaviour with guardrails</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Fast prototypes with a production path</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />Documentation that reduces handoff friction</li>
            </ul>
          </section>

          {/* Links */}
          <section className="col-span-12 mb-16">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Links</span>
            <div className="flex flex-wrap gap-3">
              <Link to="/about-abdalbast-khdhir" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">About Abdalbast</Link>
              <Link to="/abdalbast-khdhir-projects" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">Projects</Link>
              <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">LinkedIn</a>
              <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">GitHub</a>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="col-span-12 lg:col-span-8 mb-16">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Get in touch</span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl tracking-tight mb-4">Contact</h2>
            <p className="text-muted-foreground mb-2">If you are hiring or want to collaborate, send a message.</p>
            <p className="text-muted-foreground mb-8"><a href="mailto:hello@helva.group" className="text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">hello@helva.group</a></p>
            {status === "sent" ? (
              <p className="text-primary font-medium">Message sent. Thank you.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="name" className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Name</label>
                  <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Email</label>
                  <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Message</label>
                  <textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === "sending"} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-5 py-2.5 hover:bg-accent transition-colors duration-300 disabled:opacity-50">
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                {status === "error" && <p className="text-destructive text-xs">Something went wrong. Please try again.</p>}
              </form>
            )}
          </section>

          <Footer />
        </main>
      </>
    </AnimatedPage>
  );
};

export default PortfolioAbdalbast;
