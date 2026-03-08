import { useContactForm } from '@/hooks/useContactForm';

interface ContactFormProps {
  /** HTML id prefix for form fields to avoid collisions */
  idPrefix?: string;
}

const INPUT_CLASS =
  'w-full bg-transparent border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors duration-300';

const ContactForm = ({ idPrefix = 'cf' }: ContactFormProps) => {
  const { form, hp, setHp, status, errors, updateField, handleSubmit } = useContactForm();

  if (status === 'sent') {
    return <p className="text-primary font-medium">Message sent. Thank you.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* Honeypot */}
      <input
        type="text"
        name="hp"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      />
      <div>
        <label htmlFor={`${idPrefix}-name`} className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Name</label>
        <input id={`${idPrefix}-name`} type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className={INPUT_CLASS} />
        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Email</label>
        <input id={`${idPrefix}-email`} type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className={INPUT_CLASS} />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">Message</label>
        <textarea id={`${idPrefix}-message`} rows={4} value={form.message} onChange={(e) => updateField('message', e.target.value)} className={INPUT_CLASS} />
        {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="font-mono text-[0.7rem] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-5 py-2.5 hover:bg-accent transition-colors duration-300 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && <p className="text-destructive text-xs">Something went wrong. Please try again.</p>}
    </form>
  );
};

export default ContactForm;
