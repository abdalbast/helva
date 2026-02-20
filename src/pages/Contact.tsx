import { useState } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  company: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactForm, string>>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => { const key = issue.path[0] as keyof ContactForm; if (!fieldErrors[key]) fieldErrors[key] = issue.message; });
      setErrors(fieldErrors);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      const data = await res.json();
      if (data.success) {
        trackEvent('contact_form_submit', { company: result.data.company || undefined });
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageMeta title={t('contact.title')} description={t('contact.subtitle')} path="/contact" lang={currentLang} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
      <GrainOverlay />
      <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">{t('contact.label')}</span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">{t('contact.title')}</h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">{t('contact.subtitle')}</p>
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 pb-16">
          {status === 'sent' ? (
            <div className="animate-reveal p-8 bg-card/30 border border-primary/30 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 block">{t('contact.thankYou')}</span>
              <p className="text-foreground/70 leading-relaxed">{t('contact.thankYouDesc')}</p>
            </div>
          ) : status === 'error' ? (
            <div className="animate-reveal p-8 bg-card/30 border border-destructive/30 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-destructive mb-4 block">{t('contact.errorTitle')}</span>
              <p className="text-foreground/70 leading-relaxed mb-4">{t('contact.errorDesc')}</p>
              <button onClick={() => setStatus('idle')} className="font-mono text-xs uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors">{t('contact.tryAgain')}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.name')} <span className="text-primary">{t('contact.required')}</span></label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} maxLength={100} className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300" placeholder={t('contact.namePlaceholder')} />
                  {errors.name && <p className="font-mono text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.email')} <span className="text-primary">{t('contact.required')}</span></label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} maxLength={255} className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300" placeholder={t('contact.emailPlaceholder')} />
                  {errors.email && <p className="font-mono text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.company')}</label>
                <input id="company" name="company" type="text" value={form.company} onChange={handleChange} maxLength={100} className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300" placeholder={t('contact.companyPlaceholder')} />
                {errors.company && <p className="font-mono text-xs text-destructive">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.message')} <span className="text-primary">{t('contact.required')}</span></label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} maxLength={2000} rows={6} className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300 resize-none" placeholder={t('contact.messagePlaceholder')} />
                {errors.message && <p className="font-mono text-xs text-destructive">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'sending'} className="font-mono text-xs uppercase tracking-[0.15em] px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{status === 'sending' ? t('contact.sending') : t('contact.send')}</button>
            </form>
          )}
        </section>
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-12 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.emailLabel')}</span>
              <a href="mailto:hello@helva.group" className="text-foreground hover:text-primary transition-colors duration-300">hello@helva.group</a>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">{t('contact.updatesLabel')}</span>
              <a href="mailto:updates@helva.group" className="text-foreground hover:text-primary transition-colors duration-300">updates@helva.group</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Contact;
