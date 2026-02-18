import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import { getProjectBySlug, projects } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          <section className="col-span-12 lg:col-span-6 lg:col-start-4 py-24 text-center">
            <h1 className="font-display font-extrabold text-4xl text-primary tracking-tighter mb-4">{t('projects.projectNotFound')}</h1>
            <p className="text-foreground/60 mb-8">{t('projects.projectNotFoundDesc')}</p>
            <Link to={`/${currentLang}/projects`} className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors">{t('projects.backToProjects')}</Link>
          </section>
          <Footer />
        </main>
      </>
    );
  }

  const tp = (key: string) => t(`data.projects.${project.slug}.${key}`);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageMeta title={tp('title')} description={tp('description')} path={`/projects/${project.slug}`} lang={currentLang} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
      <GrainOverlay />
      <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <Link to={`/${currentLang}/projects`} className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors mb-8 inline-block animate-reveal">{t('projects.backToProjects')}</Link>
          <div className="flex items-center gap-3 mb-6 animate-reveal stagger-1">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">{project.status}</span>
          </div>
          <h1 className="animate-reveal stagger-2 font-display font-extrabold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-primary tracking-tighter mb-6">{tp('title')}</h1>
          <p className="animate-reveal stagger-3 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{tp('heroTagline')}</p>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <div key={metric.label} className={`animate-reveal stagger-${(idx % 4) + 1} p-6 border border-border/30 bg-card/20`}>
                <span className="block font-display font-extrabold text-2xl lg:text-3xl text-primary tracking-tight mb-1">{metric.value}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
        {[
          { label: t('projects.theProblem'), content: tp('problem') },
          { label: t('projects.ourSolution'), content: tp('solution') },
          { label: t('projects.theOutcome'), content: tp('outcome') },
        ].map((section, idx) => (
          <section key={section.label} className={`col-span-12 lg:col-span-8 lg:col-start-3 py-8 ${idx < 2 ? 'border-b border-border/20' : ''}`}>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">{section.label}</span>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">{section.content}</p>
          </section>
        ))}
        {project.testimonial && (
          <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-12">
            <div className="border-l-2 border-primary/30 pl-8">
              <blockquote className="text-xl lg:text-2xl text-foreground/80 font-light leading-relaxed italic mb-6">"{tp('testimonialQuote') !== `data.projects.${project.slug}.testimonialQuote` ? tp('testimonialQuote') : project.testimonial.quote}"</blockquote>
              <div>
                <span className="block font-display font-bold text-foreground text-sm">{tp('testimonialAuthor') !== `data.projects.${project.slug}.testimonialAuthor` ? tp('testimonialAuthor') : project.testimonial.author}</span>
                <span className="font-mono text-xs text-muted-foreground">{tp('testimonialRole') !== `data.projects.${project.slug}.testimonialRole` ? tp('testimonialRole') : project.testimonial.role}</span>
              </div>
            </div>
          </section>
        )}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-8 border-t border-border/20">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground px-3 py-1.5 border border-border/30">{tag}</span>
            ))}
          </div>
        </section>
        {otherProjects.length > 0 && (
          <section className="col-span-12 py-12 border-t border-border/20">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">{t('projects.otherProjects')}</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <Link key={p.slug} to={`/${currentLang}/projects/${p.slug}`} className="group p-8 bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:bg-card/50">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs text-muted-foreground tracking-wide">{p.index}</span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary/70 px-2 py-1 border border-primary/20">{p.status}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{t(`data.projects.${p.slug}.title`)}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <Footer />
      </main>
    </>
  );
};

export default ProjectDetail;
