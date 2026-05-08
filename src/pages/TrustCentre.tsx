import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import PageMeta from '@/components/PageMeta';
import PageLayout from '@/components/PageLayout';

type Tab = 'overview' | 'subprocessors' | 'updates' | 'faq';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'subprocessors', label: 'Subprocessors' },
  { id: 'updates', label: 'Updates' },
  { id: 'faq', label: 'FAQ' },
];

const subprocessors = [
  { name: 'Amazon Web Services (AWS)', logo: '/logos/aws.png', purpose: 'Cloud infrastructure and compute', entity: 'Amazon Web Services, Inc.', location: 'United States' },
  { name: 'Microsoft Azure', logo: '/logos/microsoft.png', purpose: 'Cloud services and AI model hosting', entity: 'Microsoft Corporation', location: 'United States' },
  { name: 'Google Cloud', logo: '/logos/google.png', purpose: 'Cloud infrastructure and AI services', entity: 'Google LLC', location: 'United States' },
  { name: 'Stripe', logo: '/logos/stripe.png', purpose: 'Payment processing', entity: 'Stripe, Inc.', location: 'United States' },
  { name: 'Vercel', logo: '/logos/vercel.png', purpose: 'Application hosting and edge delivery', entity: 'Vercel, Inc.', location: 'United States' },
  { name: 'Supabase', logo: '/logos/supabase.png', purpose: 'Database, authentication and storage', entity: 'Supabase, Inc.', location: 'United States' },
  { name: 'Convex', logo: '/logos/convex.png', purpose: 'Real-time backend and database', entity: 'Convex, Inc.', location: 'United States' },
  { name: 'Resend', logo: '/logos/resend.png', purpose: 'Transactional email delivery', entity: 'Resend, Inc.', location: 'United States' },
  { name: 'Tavily', logo: '/logos/tavily.png', purpose: 'AI-powered web search', entity: 'Tavily, Inc.', location: 'United States' },
  { name: 'Brave Search', logo: '/logos/brave-search.png', purpose: 'Web search API', entity: 'Brave Software, Inc.', location: 'United States' },
  { name: 'ElevenLabs', logo: '/logos/elevenlabs.png', purpose: 'Voice synthesis and audio AI', entity: 'ElevenLabs, Inc.', location: 'United States' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.png', purpose: 'CDN, DNS and DDoS protection', entity: 'Cloudflare, Inc.', location: 'United States' },
  { name: 'Alibaba Cloud', logo: '/logos/alibaba.png', purpose: 'Cloud infrastructure (Asia-Pacific)', entity: 'Alibaba Cloud Computing Ltd.', location: 'China' },
  { name: 'Anthropic', logo: '/logos/anthropic.png', purpose: 'Large language model provider', entity: 'Anthropic, PBC', location: 'United States' },
  { name: 'OpenAI', logo: '/logos/openai.png', purpose: 'Large language model provider', entity: 'OpenAI, LLC', location: 'United States' },
  { name: 'DeepSeek', logo: '/logos/deepseek.png', purpose: 'Large language model provider', entity: 'DeepSeek AI', location: 'China' },
];

const updates = [
  {
    date: 'May 2026',
    title: 'Trust Centre Launch',
    description: 'We have launched the Helva Trust Centre to provide transparency into our security practices, data processing, and the third-party services we rely on. This page will be updated as our infrastructure evolves.',
  },
  {
    date: 'May 2026',
    title: 'Initial Subprocessor List Published',
    description: 'The complete list of subprocessors used across Helva products has been published. We will notify users of material changes to this list in accordance with our data processing commitments.',
  },
];

const faqs = [
  {
    q: 'What data does Helva collect?',
    a: 'Helva collects only the data necessary to provide its services. This includes account information, usage data, and any content you choose to submit through our products. We do not sell personal data to third parties.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Data is primarily stored in the European Union and the United States through our cloud infrastructure providers. We use appropriate safeguards, including Standard Contractual Clauses, for any cross-border transfers.',
  },
  {
    q: 'How does Helva handle AI model data?',
    a: 'When using third-party AI models (Anthropic, OpenAI, DeepSeek), your data is processed according to each provider\'s data processing terms. We do not use your data to train models. Conversations are not stored beyond the session unless you explicitly opt in.',
  },
  {
    q: 'Is Helva GDPR compliant?',
    a: 'Yes. Helva Ltd. is a UK-registered company that processes data in accordance with UK GDPR and the EU General Data Protection Regulation. Our privacy policy and data processing practices reflect these obligations.',
  },
  {
    q: 'How can I request data deletion?',
    a: 'You can request the deletion of your personal data by contacting us through our contact page. We will process your request within 30 days in accordance with applicable data protection laws.',
  },
  {
    q: 'How are subprocessor changes communicated?',
    a: 'Material changes to our subprocessor list are published on this Trust Centre page. We aim to provide at least 30 days\' notice before engaging a new subprocessor that processes personal data.',
  },
];

const TrustCentre = () => {
  const { currentLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <PageLayout>
      <PageMeta
        title="Trust Centre — Helva"
        description="Helva's Trust Centre: security practices, subprocessors, compliance updates, and frequently asked questions about data handling."
        path="/trust"
        lang={currentLang}
      />

      {/* Label */}
      <div className="col-span-12 mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Trust &amp; Security</span>
      </div>

      {/* Hero */}
      <section className="col-span-12 lg:col-span-8 mb-12">
        <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tighter uppercase leading-[0.9] mb-8">
          Trust Centre
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Helva is committed to transparency and responsible data handling. Here you can review our security practices, see which third-party services we use, and find answers to common questions about how we protect your data.
        </p>
      </section>

      {/* Tab Navigation */}
      <nav className="col-span-12 mb-10 flex flex-wrap gap-1 border-b border-border/30 pb-px" aria-label="Trust Centre sections">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-3 transition-colors duration-300 border-b-2 -mb-px ${
              activeTab === id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            aria-selected={activeTab === id}
            role="tab"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="col-span-12">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'subprocessors' && <SubprocessorsTab />}
        {activeTab === 'updates' && <UpdatesTab />}
        {activeTab === 'faq' && <FaqTab />}
      </div>
    </PageLayout>
  );
};

const OverviewTab = () => (
  <div className="space-y-12 max-w-3xl">
    <section>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Our Commitment</span>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Helva Ltd. is registered in Scotland (Companies House) and operates under UK and EU data protection regulations. We design our products with privacy by default and security at every layer.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        We believe that trust is built through transparency. This Trust Centre is our way of providing clear, accessible information about how we handle data, which services we rely on, and how we respond to evolving compliance requirements.
      </p>
    </section>

    <section>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Security Practices</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Encryption', desc: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). API keys and secrets are stored in dedicated vaults.' },
          { title: 'Access Control', desc: 'Role-based access with the principle of least privilege. All administrative actions are logged and auditable.' },
          { title: 'Infrastructure', desc: 'Hosted on industry-leading cloud platforms with SOC 2 and ISO 27001 certifications. Multi-region redundancy where applicable.' },
          { title: 'Incident Response', desc: 'We maintain a documented incident response plan. Any data breach affecting personal data will be communicated within 72 hours as required by GDPR.' },
        ].map(({ title, desc }) => (
          <div key={title} className="border border-border/30 p-6">
            <h3 className="font-display font-bold text-lg mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Compliance</span>
      <div className="flex flex-wrap gap-4">
        {['UK GDPR', 'EU GDPR', 'UK Data Protection Act 2018', 'ePrivacy Directive'].map((item) => (
          <span key={item} className="font-mono text-xs border border-border/30 px-4 py-2 text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </section>
  </div>
);

const SubprocessorsTab = () => (
  <div className="space-y-8">
    <div className="max-w-3xl">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Third-Party Processors</span>
      <p className="text-muted-foreground leading-relaxed mb-8">
        The following third-party services process data on behalf of Helva in the course of delivering our products. Each subprocessor is engaged under appropriate data processing agreements.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subprocessors.map(({ name, logo, purpose, entity, location }) => (
        <div
          key={name}
          className="border border-border/30 p-5 flex gap-4 items-start hover:border-primary/30 transition-colors duration-300"
        >
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-8 w-8 object-contain shrink-0 mt-0.5"
            loading="lazy"
            width={512}
            height={512}
          />
          <div className="min-w-0">
            <h3 className="font-display font-bold text-sm mb-1">{name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{purpose}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="font-mono text-[0.6rem] text-muted-foreground/60">{entity}</span>
              <span className="font-mono text-[0.6rem] text-muted-foreground/60">{location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <p className="font-mono text-[0.65rem] text-muted-foreground/50 pt-4">
      Last updated: May 2026. Changes to this list are documented in the Updates tab.
    </p>
  </div>
);

const UpdatesTab = () => (
  <div className="space-y-8 max-w-3xl">
    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Changelog</span>
    {updates.map(({ date, title, description }) => (
      <article key={title} className="border-l-2 border-primary/30 pl-6 pb-2">
        <span className="font-mono text-[0.65rem] text-muted-foreground/60 block mb-1">{date}</span>
        <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </article>
    ))}
  </div>
);

const FaqTab = () => (
  <div className="space-y-6 max-w-3xl">
    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Frequently Asked Questions</span>
    {faqs.map(({ q, a }) => (
      <details key={q} className="group border border-border/30">
        <summary className="cursor-pointer px-6 py-4 font-display font-bold text-sm flex items-center justify-between hover:text-primary transition-colors duration-300">
          {q}
          <span className="ml-4 text-muted-foreground group-open:rotate-45 transition-transform duration-300 text-lg">+</span>
        </summary>
        <div className="px-6 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </details>
    ))}
  </div>
);

export default TrustCentre;
