import { useState } from 'react';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // Honeypot field
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'helva-hero',
          hp, // Honeypot - if filled, treated as bot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      if (data.alreadySubscribed) {
        setStatus('already');
      } else {
        setStatus('success');
      }
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const renderMessage = () => {
    switch (status) {
      case 'success':
        return (
          <p className="text-primary font-mono text-sm tracking-wide animate-reveal">
            ✓ Welcome to the circle! You're now subscribed.
          </p>
        );
      case 'already':
        return (
          <p className="text-primary font-mono text-sm tracking-wide animate-reveal">
            ✓ You're already part of the circle!
          </p>
        );
      case 'error':
        return (
          <p className="text-destructive font-mono text-sm tracking-wide animate-reveal">
            {errorMessage || 'Something went wrong. Please try again.'}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-10 lg:mt-0">
      <h1 className="animate-reveal font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.9] mb-6 text-primary tracking-tighter">
        Built to<br />be Whole.
      </h1>
      <p className="animate-reveal stagger-1 text-lg max-w-[400px] opacity-80 font-light leading-relaxed mb-10">
        Build life as a whole — with products that feel human and work like systems.
      </p>

      {/* Newsletter signup integrated into hero */}
      <div className="animate-reveal stagger-2">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
          Join the Circle
        </span>

        {status !== 'success' && status !== 'already' ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <div className="relative flex-1">
              <label htmlFor="hero-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="w-full bg-transparent border-b-2 border-border/50 py-3 px-0 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 font-light text-base disabled:opacity-50"
              />
              {/* Honeypot field - hidden from users, visible to bots */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-primary text-primary-foreground px-6 py-3 font-display font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_hsla(40,68%,52%,0.3)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join'}
            </button>
          </form>
        ) : (
          <div className="animate-reveal max-w-md">
            {renderMessage()}
            <button
              onClick={() => setStatus('idle')}
              className="mt-3 text-muted-foreground hover:text-primary font-mono text-xs tracking-wide transition-colors underline underline-offset-4"
            >
              Subscribe another email
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-3">
            {renderMessage()}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
