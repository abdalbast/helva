import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';

const Careers = () => {
  const { currentLang } = useLanguage();

  return (
    <PageLayout>
      <PageMeta
        title="Careers — Helva"
        description="Join Helva. Explore internship opportunities and career openings at an AI product company based in Edinburgh."
        path="/careers"
        lang={currentLang}
      />

      {/* Label */}
      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Join Us</span>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-16">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">
          Careers
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Helva is a small, focused team building AI products that solve real problems. We value clarity, craftsmanship, and quiet ambition. If that resonates, we would be glad to hear from you.
        </p>
      </section>

      {/* Open Positions */}
      <section className="col-span-12 mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-6 block">Open Positions</span>

        {/* Internship Card */}
        <div className="border border-border/30 p-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] bg-primary/10 text-primary px-3 py-1">
              Coming Soon
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground/60">
              Internship Programme
            </span>
          </div>

          <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight mb-4">
            Summer Internship Programme 2026
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            We are launching our first internship programme, beginning at the end of June 2026. This is an opportunity to work directly on Helva's AI products alongside the founding team — contributing to real projects from day one.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Start Date', value: 'End of June 2026' },
              { label: 'Location', value: 'Remote / Edinburgh' },
              { label: 'Applications Open', value: 'In one week' },
            ].map(({ label, value }) => (
              <div key={label} className="border border-border/20 p-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground/60 block mb-1">{label}</span>
                <span className="font-display font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/20 pt-6">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">What to Expect</span>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                'Work on production AI products used by real customers',
                'Collaborate directly with the founding team',
                'Gain experience across the full stack — from model integration to user interface',
                'Contribute to open problems in AI product design and engineering',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Culture Note */}
      <section className="col-span-12 lg:col-span-10 mb-16 py-12 border-t border-b border-border/30">
        <blockquote className="text-xl lg:text-2xl font-display leading-relaxed mb-4">
          "We build tools we would want to use ourselves — with care, without shortcuts, and with respect for the people who rely on them."
        </blockquote>
        <p className="text-muted-foreground">Applications will open shortly. Check back soon.</p>
      </section>
    </PageLayout>
  );
};

export default Careers;
