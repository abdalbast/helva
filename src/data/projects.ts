export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  category: string;
  status: 'Active' | 'In Development' | 'Coming Soon' | 'Planning';
  year: string;
  description: string;
  heroTagline: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: ProjectMetric[];
  testimonial?: ProjectTestimonial;
  tags: string[];
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'forma',
    title: 'Forma',
    category: 'Design System',
    status: 'Active',
    year: '2024',
    description:
      'A comprehensive design system built for scale. Unified components, tokens, and patterns that bring consistency across all Helva products.',
    heroTagline: 'One system. Every product. Total consistency.',
    problem:
      "As Helva's product family grew, each team developed its own component library and visual language. The result was fragmented user experiences, duplicated engineering effort, and a brand that felt inconsistent across touchpoints. Designers spent more time recreating components than solving real problems.",
    solution:
      "We built Forma -- a living design system with a shared token architecture, a versioned component library, and documentation that bridges design and engineering. Every color, spacing value, and interaction pattern flows from a single source of truth. Teams adopt Forma incrementally, and contributions feed back into the system.",
    outcome:
      'Forma now powers every Helva product. Design-to-development handoff time dropped dramatically, and new features ship with pixel-perfect brand consistency from day one. The system has become a competitive advantage -- new products launch faster because the foundations are already in place.',
    metrics: [
      { label: 'Components', value: '120+' },
      { label: 'Design Tokens', value: '340' },
      { label: 'Faster Handoff', value: '60%' },
      { label: 'Products Using Forma', value: '4' },
    ],
    testimonial: {
      quote:
        'Forma changed how we think about building products. We stopped arguing about button styles and started solving real user problems.',
      author: 'Sara Lindstrom',
      role: 'Lead Designer, Helva',
    },
    tags: ['Design Systems', 'Component Library', 'Brand Consistency'],
  },
  {
    index: '02',
    slug: 'pulse',
    title: 'Pulse',
    category: 'Health & Fitness',
    status: 'In Development',
    year: '2024',
    description:
      'Intelligent fitness tracking that adapts to your rhythm. Personalized programs, progress insights, and seamless integration with your daily life.',
    heroTagline: 'Fitness that learns your rhythm.',
    problem:
      "Most fitness apps treat users as data points -- generic programs, overwhelming metrics, and no understanding of real-life constraints. People start motivated but disengage within weeks because the experience doesn't adapt to their changing schedules, energy levels, or goals.",
    solution:
      'Pulse uses adaptive algorithms to build fitness programs around your actual life. It learns from your activity patterns, adjusts difficulty based on recovery signals, and integrates with calendar data to suggest optimal workout windows. The interface strips away noise -- you see only what matters for today.',
    outcome:
      'Early beta users show significantly higher retention compared to traditional fitness apps. The adaptive scheduling feature alone accounts for a major increase in weekly workout completion. Pulse is on track for public launch in Q3 2025.',
    metrics: [
      { label: 'Beta Users', value: '2,400' },
      { label: 'Retention (30-day)', value: '74%' },
      { label: 'Workout Completion', value: '+38%' },
      { label: 'Target Launch', value: 'Q3 2025' },
    ],
    testimonial: {
      quote:
        "It's the first app that actually understands I have a life outside the gym. The suggestions feel human, not algorithmic.",
      author: 'Marcus Eriksson',
      role: 'Beta Tester',
    },
    tags: ['Health Tech', 'Adaptive AI', 'Mobile App'],
  },
  {
    index: '03',
    slug: 'lingua',
    title: 'Lingua',
    category: 'Language Learning',
    status: 'Coming Soon',
    year: '2025',
    description:
      'Language learning reimagined. Contextual immersion, spaced repetition, and real-world application combined into one cohesive experience.',
    heroTagline: 'Language through context, not drills.',
    problem:
      'Traditional language apps gamify vocabulary memorization but fail at producing confident speakers. Learners accumulate streaks without being able to hold a basic conversation. The gap between knowing words and using them in context remains enormous.',
    solution:
      'Lingua builds language skills through contextual immersion. Instead of isolated flashcards, learners engage with real-world scenarios -- ordering at a cafe, navigating a city, discussing work projects. Spaced repetition is woven into narrative arcs so review feels natural, not repetitive. AI-powered conversation partners adapt to your proficiency in real time.',
    outcome:
      'Internal testing shows learners reach conversational proficiency in roughly half the time compared to traditional methods. The contextual approach produces higher confidence scores and lower dropout rates. Lingua is currently in closed alpha with an initial focus on Swedish and Kurdish (Sorani).',
    metrics: [
      { label: 'Alpha Testers', value: '180' },
      { label: 'Languages (Launch)', value: '2' },
      { label: 'Faster Fluency', value: '~50%' },
      { label: 'Confidence Score', value: '4.6/5' },
    ],
    tags: ['EdTech', 'AI Conversation', 'Spaced Repetition'],
  },
  {
    index: '04',
    slug: 'nexus',
    title: 'Nexus',
    category: 'Operations',
    status: 'Planning',
    year: '2025',
    description:
      'Digital operations infrastructure for growing teams. Workflow automation, knowledge management, and seamless collaboration tools.',
    heroTagline: 'Operations infrastructure that scales with you.',
    problem:
      'Growing teams drown in tooling fragmentation. Knowledge lives in scattered documents, workflows depend on tribal memory, and collaboration requires constant context-switching between platforms. The operational overhead of scaling becomes the bottleneck, not the work itself.',
    solution:
      'Nexus unifies workflow automation, knowledge management, and team collaboration into a single platform. It connects to existing tools rather than replacing them, creating an operational layer that captures institutional knowledge and automates recurring processes. The design philosophy is radical simplicity -- powerful features surfaced only when needed.',
    outcome:
      'Nexus is in the architectural planning phase, with a design sprint scheduled for Q2 2025. Early research interviews with 30+ teams have validated the core thesis: the biggest productivity drain for scaling teams is not missing features -- it is missing connections between existing ones.',
    metrics: [
      { label: 'Research Interviews', value: '30+' },
      { label: 'Design Sprint', value: 'Q2 2025' },
      { label: 'Alpha Target', value: 'Q4 2025' },
      { label: 'Focus', value: '10-50 person teams' },
    ],
    tags: ['SaaS', 'Workflow Automation', 'Knowledge Management'],
  },
];

export const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
export const statuses = ['All', ...Array.from(new Set(projects.map((p) => p.status)))];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
