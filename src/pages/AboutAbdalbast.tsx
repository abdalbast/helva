import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(1, "Message is required"),
});

const PROJECTS = [
  {
    title: "Helva Cloud",
    body: "A lightweight setup for shipping prototypes quickly with a clear path to production quality delivery.",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Helva Toolbox",
    body: "Small focused AI utilities that solve specific business tasks without turning into complex platforms.",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Flodhästen",
    body: "A language learning concept combining structured lessons with story based practice and scalable content structure.",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "OwlSec",
    body: "A concept for AI assisted security review workflows that prioritise actionable findings and developer clarity.",
    linkLabel: "View project",
    href: "#",
  },
  {
    title: "Operations analytics to product thinking",
    body: "Experience turning messy operational data into decisions, dashboards, and automation that reduces manual work.",
    linkLabel: "Read more",
    href: "#",
  },
];

const AboutAbdalbast = () => {
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
        <title>Abdalbast Khdhir, About</title>
        <meta name="description" content="About Abdalbast Khdhir at Helva Group. Shipping production AI features with a focus on reliability, evaluation, and end to end delivery." />
        <link rel="canonical" href="https://helva.group/about-abdalbast-khdhir" />
        <meta property="og:title" content="Abdalbast Khdhir, About" />
        <meta property="og:description" content="About Abdalbast Khdhir at Helva Group. Shipping production AI features with a focus on reliability, evaluation, and end to end delivery." />
        <meta property="og:image" content="/og/abdalbast.jpg" />
        <meta property="og:url" content="https://helva.group/about-abdalbast-khdhir" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdalbast Khdhir",
          url: "https://helva.group/about-abdalbast-khdhir",
          worksFor: { "@type": "Organization", name: "Helva Group", url: "https://helva.group" },
          address: { "@type": "PostalAddress", addressLocality: "Edinburgh", addressCountry: "GB" },
          sameAs: ["https://www.linkedin.com/in/abdalbast/", "https://github.com/abdalbast"],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://helva.group" },
            { "@type": "ListItem", position: 2, name: "About Abdalbast Khdhir", item: "https://helva.group/about-abdalbast-khdhir" },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-gray-900">
        <main className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
          {/* Hero */}
          <section className="mb-20">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">Abdalbast Khdhir</h1>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              I build and ship AI powered product features end to end, from prototype to production. My focus is getting real systems working reliably in the hands of users, with clear evaluation, measurable outcomes, and maintainable engineering.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              This page is the short version of who I am and the work I do at Helva Group. If you want the fastest overview, use the links below, or scroll for selected work and working style.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">LinkedIn</a>
              <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">GitHub</a>
              <a href="#contact" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Contact</a>
            </div>
          </section>

          {/* Proof of work */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-8">Proof of work</h2>
            <div className="space-y-4">
              {PROJECTS.map((p) => (
                <div key={p.title} className="rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-600 mb-3">{p.body}</p>
                  <a href={p.href} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">{p.linkLabel}</a>
                </div>
              ))}
            </div>
          </section>

          {/* Background */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Background</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />MSc with distinction in data science and business analytics</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Experience across operations, IT systems, and data work in real environments</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Comfortable owning delivery from requirements to production</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Based in Edinburgh and working through Helva Group</li>
            </ul>
          </section>

          {/* How I work */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">How I work</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Start with user impact and a measurable definition of done</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Ship a thin slice first then iterate with feedback and metrics</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Treat evaluation as part of the feature not an afterthought</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Prefer simple architecture and clean interfaces over clever complexity</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Document decisions and keep handoffs predictable</li>
            </ul>
          </section>

          {/* Collaboration */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Collaboration</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Productionising AI features inside web products</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />RAG and knowledge search that stays grounded and testable</li>
              <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />Agent workflows with guardrails and observable behaviour</li>
            </ul>
          </section>

          {/* Internal links */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">More</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/abdalbast-khdhir-portfolio" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Portfolio</a>
              <a href="/abdalbast-khdhir-projects" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Projects</a>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-20">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-700 mb-2">If you want to collaborate, hire, or talk about shipping AI into real products, reach out.</p>
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
            <a href="/abdalbast-khdhir-portfolio" className="hover:text-gray-700">Portfolio</a>
            <a href="/abdalbast-khdhir-projects" className="hover:text-gray-700">Projects</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutAbdalbast;
