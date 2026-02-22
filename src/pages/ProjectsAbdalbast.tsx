import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

type Project = {
  title: string;
  summary: string;
  category: string;
  status: string;
  links: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  { title: "Helva Cloud", summary: "Shipping baseline for prototypes with a clear production path.", category: "Full stack", status: "Active", links: [{ label: "Project page", href: "#" }, { label: "GitHub", href: "#" }] },
  { title: "Helva Toolbox", summary: "Focused AI utilities designed for entrepreneurs and small teams.", category: "Automation", status: "Ongoing", links: [{ label: "Project page", href: "#" }] },
  { title: "Flodhästen", summary: "Structured lesson and story mode content system for language learning.", category: "Content systems", status: "Prototype", links: [{ label: "Project page", href: "#" }] },
  { title: "OwlSec", summary: "AI assisted security review workflow concept with actionable outputs.", category: "Security concepts", status: "Concept", links: [{ label: "Project page", href: "#" }] },
  { title: "Workout Tracker", summary: "Workout tracking product concept with analytics, reminders, and global readiness.", category: "Full stack", status: "Prototype", links: [{ label: "Project page", href: "#" }] },
  { title: "RAG knowledge search patterns", summary: "Reusable patterns for grounded retrieval experiences and maintainable content ingestion.", category: "AI", status: "Active", links: [{ label: "Project page", href: "#" }] },
  { title: "Evaluation harness", summary: "A lightweight approach to measuring quality for AI features over time.", category: "AI", status: "Active", links: [{ label: "Project page", href: "#" }] },
  { title: "Agent workflow guardrails", summary: "Design patterns for safe tool use, logging, and predictable behaviour in agent flows.", category: "AI", status: "Prototype", links: [{ label: "Project page", href: "#" }] },
];

const CATEGORIES = ["AI", "Full stack", "Automation", "Content systems", "Security concepts"];
const STATUSES = ["Active", "Prototype", "Concept", "Ongoing", "Delivered"];

const ProjectsAbdalbast = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PROJECTS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.summary.toLowerCase().includes(q)) return false;
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeStatus && p.status !== activeStatus) return false;
      return true;
    });
  }, [search, activeCategory, activeStatus]);

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <Helmet>
        <title>Abdalbast Khdhir Projects, Helva Group</title>
        <meta name="description" content="Projects directory for Abdalbast Khdhir at Helva Group, including AI product prototypes and shipped work." />
        <link rel="canonical" href="https://helva.group/abdalbast-khdhir-projects" />
        <meta property="og:title" content="Abdalbast Khdhir Projects, Helva Group" />
        <meta property="og:description" content="Projects directory for Abdalbast Khdhir at Helva Group, including AI product prototypes and shipped work." />
        <meta property="og:image" content="/og/abdalbast-projects.jpg" />
        <meta property="og:url" content="https://helva.group/abdalbast-khdhir-projects" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Abdalbast Khdhir Projects",
          url: "https://helva.group/abdalbast-khdhir-projects",
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
            { "@type": "ListItem", position: 2, name: "Projects", item: "https://helva.group/abdalbast-khdhir-projects" },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-gray-900">
        <main className="mx-auto max-w-[1000px] px-6 py-16 md:py-24">
          {/* Hero */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">Projects</h1>
            <p className="text-lg leading-relaxed text-gray-700">
              A living directory of work across Helva Group. Use search or filters to find what is relevant.
            </p>
          </section>

          {/* Search */}
          <section className="mb-6">
            <input
              type="text"
              placeholder="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md rounded border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </section>

          {/* Filters */}
          <section className="mb-10 space-y-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => pill(c, activeCategory === c, () => setActiveCategory(activeCategory === c ? null : c)))}
              </div>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Status</span>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => pill(s, activeStatus === s, () => setActiveStatus(activeStatus === s ? null : s)))}
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="mb-20">
            {filtered.length === 0 ? (
              <p className="text-gray-500">No projects match your filters.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((p) => (
                  <div key={p.title} className="rounded-lg border border-gray-200 p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <span className="inline-block rounded-full border border-gray-300 px-3 py-0.5 text-xs font-medium text-gray-600 whitespace-nowrap">{p.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{p.summary}</p>
                    <p className="text-xs text-gray-400 mb-3">{p.category}</p>
                    <div className="mt-auto flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">{l.label}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Internal links */}
          <section className="mb-20">
            <div className="flex flex-wrap gap-3">
              <a href="/about-abdalbast-khdhir" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">About Abdalbast</a>
              <a href="/abdalbast-khdhir-portfolio" className="inline-block rounded border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Portfolio</a>
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-200 py-8 px-6 text-center text-sm text-gray-500">
          <p className="mb-2">© {new Date().getFullYear()} Helva Group</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/about-abdalbast-khdhir" className="hover:text-gray-700">About Abdalbast</a>
            <a href="/abdalbast-khdhir-portfolio" className="hover:text-gray-700">Portfolio</a>
            <a href="https://www.linkedin.com/in/abdalbast/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">LinkedIn</a>
            <a href="https://github.com/abdalbast" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">GitHub</a>
            <a href="/en/privacy" className="hover:text-gray-700">Privacy</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProjectsAbdalbast;
