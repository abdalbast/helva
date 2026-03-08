import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';
import { getProjectBySlug, projects } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageLayout>
        <section className="col-span-12 lg:col-span-6 lg:col-start-4 py-24 text-center">
          <h1 className="font-display font-extrabold text-4xl text-primary tracking-tighter mb-4">{t('projects.projectNotFound')}</h1>
          <p className="text-foreground/60 mb-8">{t('projects.projectNotFoundDesc')}</p>
          <Link to={`/${currentLang}/projects`} className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors">{t('projects.backToProjects')}</Link>
        </section>
      </PageLayout>
    );
  }

  const tp = (key: string) => t(`data.projects.${project.slug}.${key}`);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <PageLayout>
      <PageMeta title={tp('title')} description={tp('description')} path={`/projects/${project.slug}`} lang={currentLang} />
      {/* Back navigation */}
      <div className="col-span-12 mb-4">
        <Link to={`/${currentLang}/projects`} className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300">← {t('projects.backToProjects')}</Link>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{t(`categories.${project.category}`, project.category)}</span>
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{tp('title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{tp('heroTagline')}</p>
      </section>

      {/* Status & Year */}
      <section className="col-span-12 lg:col-span-4 mb-16">
        <div className="border border-border/30 p-6 space-y-4">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">Status</span>
            <span className="font-mono text-sm">{t(`statuses.${project.status}`, project.status)}</span>
          </div>
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">Year</span>
            <span className="font-mono text-sm">{project.year}</span>
          </div>
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">Tags</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[0.6rem] border border-border/50 px-2 py-0.5 text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution / Outcome */}
      <section className="col-span-12 lg:col-span-10 mb-16">
        <div className="grid gap-12 md:grid-cols-3">
          {(['problem', 'solution', 'outcome'] as const).map((key) => (
            <div key={key}>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">{key}</span>
              <p className="text-muted-foreground leading-relaxed">{tp(key)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Key metrics</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="border border-border/30 p-6 text-center">
              <span className="font-display font-extrabold text-2xl text-primary block mb-1">{m.value}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="col-span-12 lg:col-span-10 mb-16 py-12 border-t border-b border-border/30">
          <blockquote className="text-xl lg:text-2xl font-display leading-relaxed mb-4">"{project.testimonial.quote}"</blockquote>
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">{project.testimonial.author}</span> — {project.testimonial.role}
          </p>
        </section>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <section className="col-span-12 mb-16">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Other projects</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((p) => (
              <Link key={p.slug} to={`/${currentLang}/projects/${p.slug}`} className="group border border-border/30 p-6 hover:border-primary/30 transition-colors duration-300">
                <span className="font-mono text-xs text-muted-foreground">{p.index}</span>
                <h3 className="font-display font-bold text-xl mt-2 mb-2 group-hover:text-primary transition-colors duration-300">{t(`data.projects.${p.slug}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`data.projects.${p.slug}.description`)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ProjectDetail;
