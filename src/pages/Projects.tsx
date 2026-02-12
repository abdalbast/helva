import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const projects = [
  {
    index: '01',
    title: 'Forma',
    category: 'Design System',
    description: 'A comprehensive design system built for scale. Unified components, tokens, and patterns that bring consistency across all Helva products.',
    status: 'Active',
    year: '2024',
  },
  {
    index: '02',
    title: 'Pulse',
    category: 'Health & Fitness',
    description: 'Intelligent fitness tracking that adapts to your rhythm. Personalized programs, progress insights, and seamless integration with your daily life.',
    status: 'In Development',
    year: '2024',
  },
  {
    index: '03',
    title: 'Lingua',
    category: 'Language Learning',
    description: 'Language learning reimagined. Contextual immersion, spaced repetition, and real-world application combined into one cohesive experience.',
    status: 'Coming Soon',
    year: '2025',
  },
  {
    index: '04',
    title: 'Nexus',
    category: 'Operations',
    description: 'Digital operations infrastructure for growing teams. Workflow automation, knowledge management, and seamless collaboration tools.',
    status: 'Planning',
    year: '2025',
  },
];

const Projects = () => {
  return (
    <>
      <PageMeta title="Projects" description="Explore Helva's family of products — Forma, Pulse, Lingua, and Nexus — designed to feel like they belong together." path="/projects" />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Hero */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            Our Work
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
            Projects
          </h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
            A family of products designed to feel like they belong together — beautifully crafted, deeply practical, and quietly powerful.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="col-span-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className={`animate-reveal stagger-${(idx % 4) + 1} group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:bg-card/50`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-muted-foreground tracking-wide">
                    {project.index}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                  {project.category}
                </p>
                <p className="text-foreground/60 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-border/20">
                  <span className="font-mono text-[0.65rem] text-muted-foreground/60">
                    {project.year}
                  </span>
                  <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors duration-300">
                    Learn more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Projects;
