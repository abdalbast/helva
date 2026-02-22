import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

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

      <div className="min-h-screen bg-white font-sans text-gray-900">
        <main className="mx-auto max-w-[900px] px-6 py-16 md:py-24">
          {/* Hero */}
          <section className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">Portfolio</h1>
            <p className="text-lg leading-relaxed text-gray-700">
              A selection of work that shows how I take an idea from problem definition to a shipped feature. Each item below is written in a simple case study format so you can scan quickly.
            </p>
          </section>

          {/* Case studies */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8">Selected case studies</h2>
            <div className="space-y-6">
              {CASE_STUDIES.map((c) => (
                <div key={c.title} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <span className="inline-block rounded-full border border-gray-300 px-3 py-0.5 text-xs font-medium text-gray-600 whitespace-nowrap">{c.status}</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-700 mb-4">
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Problem</span>{c.problem}</div>
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Approach</span>{c.approach}</div>
                    <div><span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Outcome</span>{c.outcome}</div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Stack: {c.stack}</p>
                  <a href={c.href} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">{c.linkLabel}</a>
                </div>
              ))}
            </div>
          </section>

          {/* What you can expect */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-4">What you can expect from my work</h2>
            <p className="text-gray-700 mb-6">
              I optimise for reliable delivery, clarity, and measurable impact. I prefer simple architecture, strong interfaces, and fast iteration loops that are backed by evaluation where AI is involved.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />End to end ownership from spec to production</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Evaluation as part of the feature lifecycle</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Clean data models and pragmatic APIs</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Grounded AI behaviour with guardrails</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Fast prototypes with a production path</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Documentation that reduces handoff friction</li>
            </ul>
          </section>

          {/* Links */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Links</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/about-abdalbast-khdhir" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">About Abdalbast</a>
              <a href="/abdalbast-khdhir-projects" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Projects</a>
              <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">LinkedIn</a>
              <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">GitHub</a>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-20">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-700 mb-2">If you are hiring or want to collaborate, send a message.</p>
            <p className="text-gray-700 mb-8"><a href="mailto:hello@helva.group" className="underline underline-offset-4">hello@helva.group</a></p>
            {status === "sent" ? (
              <p className="text-green-700">Message sent. Thank you.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === "sending"} className="rounded bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50">
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                {status === "error" && <p className="text-red-600 text-xs">Something went wrong. Please try again.</p>}
              </form>
            )}
          </section>
        </main>

        <footer className="border-t border-gray-200 py-8 px-6 text-center text-sm text-gray-500">
          <p className="mb-2">© {new Date().getFullYear()} Helva Group</p>
          <div className="flex justify-center gap-4">
            <a href="/en" className="hover:text-gray-700">Home</a>
            <a href="/en/privacy" className="hover:text-gray-700">Privacy</a>
            <a href="/about-abdalbast-khdhir" className="hover:text-gray-700">About</a>
            <a href="/abdalbast-khdhir-projects" className="hover:text-gray-700">Projects</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PortfolioAbdalbast;
