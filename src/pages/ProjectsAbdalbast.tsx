import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AnimatedPage from "@/components/AnimatedPage";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] border px-3 py-1 transition-colors duration-300 ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
      }`}
    >
      {label}
    </button>
  );

  return (
    <AnimatedPage>
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
          <section className="col-span-12 lg:col-span-8 mb-12">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Founder projects</span>
            <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">Projects</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A living directory of work across Helva Group. Use search or filters to find what is relevant.
            </p>
          </section>

          {/* Search */}
          <section className="col-span-12 lg:col-span-8 mb-6">
            <input
              type="text"
              placeholder="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </section>

          {/* Filters */}
          <section className="col-span-12 mb-10 space-y-4">
            <div>
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => pill(c, activeCategory === c, () => setActiveCategory(activeCategory === c ? null : c)))}
              </div>
            </div>
            <div>
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Status</span>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => pill(s, activeStatus === s, () => setActiveStatus(activeStatus === s ? null : s)))}
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="col-span-12 mb-16">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground">No projects match your filters.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((p) => (
                  <div key={p.title} className="border border-border/30 p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-lg">{p.title}</h3>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] border border-border/50 px-3 py-0.5 text-muted-foreground whitespace-nowrap">{p.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 leading-relaxed">{p.summary}</p>
                    <p className="font-mono text-[0.6rem] text-muted-foreground/60 mb-3">{p.category}</p>
                    <div className="mt-auto flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.label} href={l.href} className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors duration-300 underline underline-offset-4">{l.label}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Internal links */}
          <section className="col-span-12 mb-16">
            <div className="flex flex-wrap gap-3">
              <Link to="/about-abdalbast-khdhir" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">About Abdalbast</Link>
              <Link to="/abdalbast-khdhir-portfolio" className="font-mono text-[0.7rem] uppercase tracking-[0.15em] border border-border/50 px-5 py-2.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300">Portfolio</Link>
            </div>
          </section>

          <Footer />
        </main>
      </>
    </AnimatedPage>
  );
};

export default ProjectsAbdalbast;
