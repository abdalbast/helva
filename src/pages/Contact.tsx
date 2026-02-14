import { useState } from 'react';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageMeta from '@/components/PageMeta';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  company: z.string().trim().max(100, 'Company must be under 100 characters').optional().default(''),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be under 2000 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactForm, string>>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('sending');

    // Mailto fallback until backend is connected
    const subject = encodeURIComponent(`Contact from ${result.data.name}${result.data.company ? ` (${result.data.company})` : ''}`);
    const body = encodeURIComponent(`Name: ${result.data.name}\nEmail: ${result.data.email}\nCompany: ${result.data.company || 'N/A'}\n\n${result.data.message}`);
    window.location.href = `mailto:hello@helva.group?subject=${subject}&body=${body}`;
    trackEvent('contact_form_submit', { company: result.data.company || undefined });
    setStatus('sent');
  };

  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with Helva Group. Let's discuss how we can help you build something meaningful."
        path="/contact"
      />
      <GrainOverlay />
      <main className="min-h-screen grid grid-cols-12 p-5 lg:p-10 gap-5">
        <Navigation />

        {/* Hero */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-16 lg:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 block animate-reveal">
            Get In Touch
          </span>
          <h1 className="animate-reveal stagger-1 font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-primary tracking-tighter mb-8">
            Contact
          </h1>
          <p className="animate-reveal stagger-2 text-xl lg:text-2xl text-foreground/80 max-w-2xl leading-relaxed font-light">
            Have a project in mind? Let's talk about how we can build something meaningful together.
          </p>
        </section>

        {/* Form */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 pb-16">
          {status === 'sent' ? (
            <div className="animate-reveal p-8 bg-card/30 border border-primary/30 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                Thank you
              </span>
              <p className="text-foreground/70 leading-relaxed">
                Your mail client should have opened with the message. If not, feel free to email us directly at{' '}
                <a href="mailto:hello@helva.group" className="text-primary hover:text-primary/80 transition-colors">
                  hello@helva.group
                </a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="font-mono text-xs text-destructive">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={255}
                    className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300"
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="font-mono text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300"
                  placeholder="Your company (optional)"
                />
                {errors.company && <p className="font-mono text-xs text-destructive">{errors.company}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  maxLength={2000}
                  rows={6}
                  className="w-full bg-card/30 border border-border/50 px-4 py-3 text-foreground font-mono text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="font-mono text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="font-mono text-xs uppercase tracking-[0.15em] px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </section>

        {/* Direct contact */}
        <section className="col-span-12 lg:col-span-8 lg:col-start-3 py-12 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">Email</span>
              <a href="mailto:hello@helva.group" className="text-foreground hover:text-primary transition-colors duration-300">
                hello@helva.group
              </a>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground block">Updates</span>
              <a href="mailto:updates@helva.group" className="text-foreground hover:text-primary transition-colors duration-300">
                updates@helva.group
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Contact;
