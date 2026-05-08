export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface AudienceCard {
  label: string;
  description: string;
}

export interface WorkflowStep {
  index: string;
  title: string;
  description: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  category: string;
  status: 'Live' | 'In development' | 'Research' | 'Planned';
  year: string;
  description: string;
  heroTagline: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: ProjectMetric[];
  testimonial?: ProjectTestimonial;
  tags: string[];
  audience?: AudienceCard[];
  workflow?: WorkflowStep[];
  differentiators?: string[];
  futureFeatures?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'deqnus',
    title: 'Deqnus',
    category: 'AI Translation',
    status: 'Live',
    year: '2025',
    description:
      'AI-powered Kurdish–English translation built for accuracy in an underserved language pair. Real-time bidirectional translation with dialect awareness.',
    heroTagline: 'Kurdish translation that finally works.',
    problem:
      'Kurdish is one of the most underserved languages in machine translation. Existing tools produce unreliable output, miss dialectal nuance, and fail on idiomatic expressions. Millions of Kurdish speakers have no trustworthy digital translation tool.',
    solution:
      'Deqnus uses fine-tuned language models trained on curated Kurdish–English parallel corpora. It supports Sorani script, handles idiomatic phrases, and provides contextual alternatives. The interface is minimal — paste text, get a translation, copy the result.',
    outcome:
      'Deqnus is live and serving users at deqnus.vercel.app. It is the first dedicated Kurdish–English AI translation tool built with dialect-level accuracy in mind.',
    tags: ['AI', 'NLP', 'Kurdish', 'Translation'],
    audience: [
      { label: 'Kurdish diaspora', description: 'Communicate across languages with family, institutions, and employers.' },
      { label: 'Translators & journalists', description: 'Draft and verify Kurdish–English translations faster.' },
      { label: 'Researchers & NGOs', description: 'Process Kurdish-language documents and reports at scale.' },
    ],
    differentiators: [
      'Purpose-built for Kurdish — not a generic model with Kurdish bolted on.',
      'Sorani-first with dialect-aware output.',
      'Lightweight, fast, and free to use.',
    ],
    futureFeatures: [
      'Kurmanji dialect support',
      'Document-level translation',
      'API access for developers',
      'Mobile app',
    ],
    ctaLabel: 'Try Deqnus',
    ctaHref: 'https://deqnus.vercel.app',
  },
  {
    index: '02',
    slug: 'helva-chat',
    title: 'Helva Chat',
    category: 'Conversational AI',
    status: 'In development',
    year: '2025',
    description:
      'A multilingual AI assistant designed for UK regulatory and cultural context. Private, compliant, and transparent by default.',
    heroTagline: 'AI you can actually trust.',
    problem:
      'Most AI assistants are built for English-first, US-centric contexts. UK users face poor multilingual support, opaque data handling, and models that don\'t understand local regulation, culture, or language nuance. Enterprises can\'t adopt them without compliance risk.',
    solution:
      'Helva Chat is a conversational AI layer built for UK users and organisations. It supports multiple languages natively, respects GDPR by design, and provides transparent reasoning. It is built to be embedded into workflows — not used as a novelty.',
    outcome:
      'Helva Chat is in active development. Early architecture focuses on multilingual reasoning, source attribution, and a plugin system for domain-specific knowledge.',
    tags: ['AI', 'LLM', 'Multilingual', 'GDPR'],
    audience: [
      { label: 'UK enterprises', description: 'Deploy conversational AI without compliance anxiety.' },
      { label: 'Multilingual teams', description: 'Work across languages without switching tools.' },
      { label: 'Regulated industries', description: 'AI with audit trails, source attribution, and data residency.' },
    ],
    differentiators: [
      'UK-first — multilingual from day one, not as an afterthought.',
      'GDPR-compliant architecture with data residency options.',
      'Transparent reasoning with source attribution.',
    ],
    futureFeatures: [
      'Plugin system for domain knowledge',
      'On-premise deployment option',
      'Voice interface',
      'Workflow automation triggers',
    ],
    ctaLabel: 'Join the waitlist',
    ctaHref: undefined,
  },
];

export const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
export const statuses = ['All', ...Array.from(new Set(projects.map((p) => p.status)))];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
