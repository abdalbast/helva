import { useState } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';
import AnimatedPage from '@/components/AnimatedPage';
import LlmSummary from '@/components/LlmSummary';
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
    <AnimatedPage>
      <>
        <PageMeta title={t('contact.title')} description={t('contact.subtitle')} path="/contact" lang={currentLang} />
        <LlmSummary
          quickAnswer="Contact Helva Group for projects, partnerships, and collaboration. Email hello@helva.group or use the contact form."
          audience={["Founders seeking to start a project", "Agencies exploring partnerships", "Anyone wanting to reach Helva"]}
          actions={["Submit the contact form", "Email hello@helva.group directly", "Email updates@helva.group for newsletters"]}
          relatedPages={[
            { label: "About Helva Group", href: "/en/about" },
            { label: "Solutions and Services", href: "/en/solutions" },
          ]}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 font-mono text-xs bg-primary text-primary-foreground px-4 py-2">Skip to content</a>
        <GrainOverlay />
        <main id="main-content" className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
          <Navigation />

          {/* Label */}
          <div className="col-span-12 mb-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{t('contact.label')}</span>
          </div>

          {/* Hero */}
          <section className="col-span-12 lg:col-span-8 mb-16">
            <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">{t('contact.title')}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t('contact.subtitle')}</p>
          </section>

          {/* Contact Form / Success / Error */}
          <section className="col-span-12 lg:col-span-8 mb-16">
            {status === 'sent' ? (
              <div className="border border-border/30 p-12 text-center">
                <h2 className="font-display font-bold text-2xl mb-4">{t('contact.thankYou')}</h2>
                <p className="text-muted-foreground mb-6">{t('contact.thankYouDesc')}</p>
              </div>
            ) : status === 'error' ? (
              <div className="border border-border/30 p-12 text-center">
                <h2 className="font-display font-bold text-2xl mb-4">{t('contact.errorTitle')}</h2>
                <p className="text-muted-foreground mb-6">{t('contact.errorDesc')}</p>
                <button onClick={() => setStatus('idle')} className="font-mono text-xs text-primary hover:underline">{t('contact.tryAgain')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    {t('contact.name')} <span className="text-primary">{t('contact.required')}</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full bg-transparent border border-border/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    {t('contact.email')} <span className="text-primary">{t('contact.required')}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full bg-transparent border border-border/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={t('contact.companyPlaceholder')}
                    className="w-full bg-transparent border border-border/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    {t('contact.message')} <span className="text-primary">{t('contact.required')}</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={6}
                    className="w-full bg-transparent border border-border/30 px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="font-mono text-xs uppercase tracking-[0.15em] border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
          </section>

          {/* Contact info sidebar */}
          <section className="col-span-12 lg:col-span-4 mb-16">
            <div className="border border-border/30 p-6 space-y-6">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2">{t('contact.emailLabel')}</span>
                <a href="mailto:hello@helva.group" className="font-mono text-sm text-foreground hover:text-primary transition-colors">hello@helva.group</a>
              </div>
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground block mb-2">{t('contact.updatesLabel')}</span>
                <a href="mailto:updates@helva.group" className="font-mono text-sm text-foreground hover:text-primary transition-colors">updates@helva.group</a>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </>
    </AnimatedPage>
  );
};

export default Contact;
