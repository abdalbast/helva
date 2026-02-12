import { Link } from 'react-router-dom';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <>
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-24 lg:py-40 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            Page Not Found
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(4rem,12vw,10rem)] leading-[0.9] text-primary tracking-tighter mb-8">
            404
          </h1>
          <p className="animate-reveal stagger-2 text-xl text-foreground/60 max-w-md mx-auto mb-12 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="animate-reveal stagger-3 inline-block font-mono text-xs uppercase tracking-[0.15em] px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Return home
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default NotFound;
