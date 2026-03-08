import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'helva-hero', hp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to subscribe');
      if (data.alreadySubscribed) { setStatus('already'); } else { setStatus('success'); }
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const renderMessage = () => {
    switch (status) {
      case 'success':
        return <p className="text-primary font-mono text-sm tracking-wide animate-reveal">{t('home.welcomeMessage')}</p>;
      case 'already':
        return <p className="text-primary font-mono text-sm tracking-wide animate-reveal">{t('home.alreadyMessage')}</p>;
      case 'error':
        return <p className="text-destructive font-mono text-sm tracking-wide animate-reveal">{errorMessage || t('home.errorMessage')}</p>;
      default:
        return null;
    }
  };

  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-16 lg:mt-0">
      <h1 className="animate-reveal font-display font-extrabold text-[clamp(3.5rem,9vw,7rem)] leading-[0.88] mb-8 text-primary tracking-tighter"><Trans i18nKey="home.headline" components={{ br: <br /> }} /></h1>
      <p className="animate-reveal stagger-1 text-xl max-w-[440px] opacity-80 font-light leading-[1.6] mb-14">{t('home.subheadline')}</p>
      <div className="animate-reveal stagger-2">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5 block">{t('home.joinCircle')}</span>
        {status !== 'success' && status !== 'already' ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <div className="relative flex-1">
              <label htmlFor="hero-newsletter-email" className="sr-only">Email</label>
              <input id="hero-newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('home.emailPlaceholder')} required disabled={status === 'loading'} className="w-full bg-transparent border-b-2 border-border/50 py-3.5 px-0 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 font-light text-lg disabled:opacity-50" />
              <input type="text" name="hp" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} />
            </div>
            <button type="submit" disabled={status === 'loading'} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-display font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_24px_hsla(40,68%,52%,0.3)] hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'loading' ? t('home.joining') : t('home.join')}
            </button>
          </form>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/60 mt-4">Join 500+ founders and operators</p>
        ) : (
          <div className="animate-reveal max-w-md">
            {renderMessage()}
            <button onClick={() => setStatus('idle')} className="mt-3 text-muted-foreground hover:text-primary font-mono text-xs tracking-wide transition-colors underline underline-offset-4">{t('home.subscribeAnother')}</button>
          </div>
        )}
        {status === 'error' && <div className="mt-3">{renderMessage()}</div>}
      </div>
    </section>
  );
};

export default HeroSection;
