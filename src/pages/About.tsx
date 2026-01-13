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
                        Our Story
                    </span>
                    <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
                        Helva means<br />completeness.
                    </h1>
                    <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
                        In Swedish, the word carries whispers of wholeness — a state where nothing essential is missing, and nothing unnecessary remains.
                    </p>
                </section>

                {/* Philosophy Section */}
                <section className="col-span-12 lg:col-span-10 lg:col-start-2 py-16 border-t border-border/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                                Philosophy
                            </span>
                            <h2 className="font-display font-extrabold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] text-primary tracking-tighter">
                                Warmth in every system.
                            </h2>
                        </div>
                        <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                            <p>
                                We believe the best products aren't cold machines or scattered features — they're <span className="text-foreground font-medium">living systems</span> that breathe warmth into daily life.
                            </p>
                            <p>
                                Like the Stockholm streets where cobblestone meets copper rooftops, we design at the intersection of human intuition and structural elegance. Our products don't just function — they <span className="text-foreground font-medium">feel right</span>.
                            </p>
                            <p>
                                Each element exists for a reason. Each connection serves a purpose. Together, they create something greater than the sum of their parts: <span className="text-primary font-medium">wholeness</span>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="col-span-12 py-16 border-t border-border/30">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">
                        Core Principles
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Value 1 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-ochre-500 flex items-center justify-center">
                                <span className="font-mono text-primary-foreground text-sm font-medium">01</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Human First
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                Technology should adapt to people, not the other way around. Every interface, every interaction is designed with human nature at its core.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-terracotta flex items-center justify-center">
                                <span className="font-mono text-foreground text-sm font-medium">02</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Systems Thinking
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                We don't build features in isolation. Every component is part of a coherent whole — interconnected, purposeful, and scalable.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-cobblestone border border-border flex items-center justify-center">
                                <span className="font-mono text-foreground text-sm font-medium">03</span>
                            </div>
                            <h3 className="font-display font-extrabold text-xl text-foreground tracking-tight">
                                Built to Last
                            </h3>
                            <p className="text-foreground/60 leading-relaxed">
                                In a world of disposable software, we craft digital architecture meant to endure — thoughtful foundations that age with grace.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Name */}
                <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-20 lg:py-32 border-t border-border/30">
                    <div className="text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
                            The Name
                        </span>
                        <blockquote className="font-display font-extrabold text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] text-foreground tracking-tight mb-8">
                            "Helva is the feeling of a space that holds everything you need — <span className="text-primary">nothing more, nothing less</span>."
                        </blockquote>
                        <p className="text-foreground/60 text-lg max-w-xl mx-auto leading-relaxed">
                            Born in Stockholm, shaped by the quiet confidence of Scandinavian design, Helva represents our commitment to building products where every piece matters.
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
