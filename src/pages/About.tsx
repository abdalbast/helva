import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';

const About = () => {
    return (
        <>
            <GrainOverlay />
            <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
                <Navigation />

                {/* Hero */}
                <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
                        Brand Story
                    </span>
                    <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
                        Helva
                    </h1>
                    <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
                        The modern world doesn't need more noise — it needs better systems.
                    </p>
                </section>

                {/* The Problem */}
                <section className="col-span-12 lg:col-span-10 lg:col-start-2 py-16 border-t border-border/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                                The Challenge
                            </span>
                            <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">
                                Everything is fragmented.
                            </h2>
                        </div>
                        <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                            <p>
                                Everything we build today is fragmented. Tools don't talk to each other. Brands feel inconsistent. Learning, health, work, and creativity live in separate boxes.
                            </p>
                            <p>
                                People end up stitching their lives together with hacks, tabs, and half-finished plans.
                            </p>
                            <p className="text-primary font-medium text-xl">
                                Helva exists to bring it back to whole.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Name */}
                <section className="col-span-12 py-16 border-t border-border/30">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">
                        The Name
                    </span>

                    <div className="max-w-3xl mb-12">
                        <p className="text-foreground/80 text-xl leading-relaxed mb-8">
                            The name carries three truths:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Truth 1 - Completeness */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-ochre-500 flex items-center justify-center">
                                <span className="font-mono text-primary-foreground text-sm font-medium">01</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Completeness
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                In Swedish it echoes <span className="text-foreground italic">hel</span> — the feeling of something finished, balanced, and complete.
                            </p>
                        </div>

                        {/* Truth 2 - Warmth */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-terracotta flex items-center justify-center">
                                <span className="font-mono text-foreground text-sm font-medium">02</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Warmth
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                In Sorani Kurdish it nods to <span className="text-foreground italic">halva</span> — something made with care and shared in meaningful moments.
                            </p>
                        </div>

                        {/* Truth 3 - Shareability */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-cobblestone border border-border flex items-center justify-center">
                                <span className="font-mono text-foreground text-sm font-medium">03</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Shareability
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                In English, it stays clean and open — a word we get to define through what we make.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What We Build */}
                <section className="col-span-12 lg:col-span-10 lg:col-start-2 py-16 border-t border-border/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                                What We Build
                            </span>
                            <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">
                                A family of products.
                            </h2>
                        </div>
                        <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                            <p>
                                We are building a family of products and services designed to feel like they belong together: <span className="text-foreground font-medium">beautifully crafted, deeply practical, and quietly powerful</span>.
                            </p>
                            <p>
                                Whether it's fitness, language learning, design systems, or digital operations — Helva is about making things that reduce friction and increase momentum.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Obsessions */}
                <section className="col-span-12 py-16 border-t border-border/30">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">
                        Our Obsessions
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        <div className="space-y-4 p-6 bg-card/50 border border-border/30">
                            <h3 className="font-display font-extrabold text-lg text-primary tracking-tight">
                                Details
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                We obsess over details because small details create trust.
                            </p>
                        </div>

                        <div className="space-y-4 p-6 bg-card/50 border border-border/30">
                            <h3 className="font-display font-extrabold text-lg text-primary tracking-tight">
                                Clarity
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                We design for clarity because clarity creates action.
                            </p>
                        </div>

                        <div className="space-y-4 p-6 bg-card/50 border border-border/30">
                            <h3 className="font-display font-extrabold text-lg text-primary tracking-tight">
                                Longevity
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                We build for longevity because the best products don't just launch — they last.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Foundation Quote */}
                <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-20 lg:py-32 border-t border-border/30">
                    <div className="text-center">
                        <blockquote className="font-display font-extrabold text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] text-foreground tracking-tight mb-8">
                            Helva is a modern foundation: <span className="text-primary">warm enough to feel human, structured enough to scale</span>.
                        </blockquote>
                        <p className="text-foreground/60 text-lg max-w-xl mx-auto leading-relaxed">
                            We don't chase trends. We build things that make life feel simpler, cleaner, and more complete.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="col-span-12 py-12 border-t border-border/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="font-display font-extrabold text-lg tracking-tighter uppercase text-muted-foreground">
                            Helva
                        </div>
                        <div className="font-mono text-xs text-muted-foreground tracking-wide">
                            Stockholm // Digital Architecture
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
};

export default About;
