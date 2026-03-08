import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@/lib/analytics';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'helva-newsletter', hp }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to subscribe');
      setMessage(data.message);
      setIsSubmitted(true);
      trackEvent('newsletter_signup', { source: 'newsletter-section' });
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="col-span-12 py-24 lg:py-32 border-t border-border/30">
      <div className={`max-w-2xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block">{t('newsletter.stayConnected')}</span>
        <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-primary tracking-tighter mb-4">{t('newsletter.joinCircle')}</h2>
        <p className="text-foreground/70 text-lg mb-10 max-w-md">{t('newsletter.subtitle')}</p>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('home.emailPlaceholder')} required disabled={isLoading} className="w-full bg-transparent border-b-2 border-border/50 py-3 px-0 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 font-light text-base disabled:opacity-50" />
              <input type="text" name="hp" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} />
            </div>
            <button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground px-8 py-3 font-display font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_hsla(40,68%,52%,0.3)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? t('newsletter.joining') : t('newsletter.join')}</button>
          </form>
        ) : (
          <div className="animate-reveal"><p className="text-primary font-mono text-sm tracking-wide">{message}</p></div>
        )}
        {error && <p className="mt-4 text-destructive font-mono text-sm">{error}</p>}
      </div>
    </section>
  );
};

export default NewsletterSection;
