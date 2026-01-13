import { useState, useRef, useEffect } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Open mailto with pre-filled subject
    const subject = encodeURIComponent('Newsletter Subscription');
    const body = encodeURIComponent(`Please add this email to the Helva newsletter: ${email}`);
    window.location.href = `mailto:updates@helva.group?subject=${subject}&body=${body}`;
    
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="col-span-12 py-24 lg:py-32 border-t border-border/30"
    >
      <div
        className={`max-w-2xl transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Label */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
          Stay Connected
        </span>

        {/* Headline */}
        <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-primary tracking-tighter mb-4">
          Join the Helva circle.
        </h2>

        {/* Subtext */}
        <p className="text-foreground/70 text-lg mb-10 max-w-md">
          Thoughtful updates on systems, products, and ideas built to last.
        </p>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-transparent border-b-2 border-border/50 py-3 px-0 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 font-light text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-8 py-3 font-display font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_hsla(40,68%,52%,0.3)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Join
            </button>
          </form>
        ) : (
          <div className="animate-reveal">
            <p className="text-primary font-mono text-sm tracking-wide">
              Your email client should open. Send the email to complete your subscription.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
