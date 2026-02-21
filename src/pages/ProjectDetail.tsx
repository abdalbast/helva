import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';
import { getProjectBySlug, projects } from '@/data/projects';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <AnimatedPage>
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
      </AnimatedPage>
    );
  }

  const tp = (key: string) => t(`data.projects.${project.slug}.${key}`);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <AnimatedPage>
      <>
        <PageMeta title={tp('title')} description={tp('description')} path={`/projects/${project.slug}`} lang={currentLang} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />
          {/* ... keep existing code (project detail sections) ... */}
        </main>
      </>
    </AnimatedPage>
  );
};

export default ProjectDetail;
