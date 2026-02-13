export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: 'building-design-systems-that-scale',
    category: 'Design Systems',
    title: 'Building Design Systems That Scale',
    excerpt: 'How to create component libraries that grow with your organization without becoming unwieldy.',
    date: 'Dec 2024',
    readTime: '8 min read',
    author: 'Helva Team',
    tags: ['design', 'systems', 'components'],
    content: `
## The Problem With Ad-Hoc Components

Most teams start building components as they need them. A button here, a modal there. Before long, you have seventeen variations of the same card component scattered across your codebase, each with slightly different padding, font sizes, and hover states.

This isn't a failure of discipline — it's a failure of architecture.

## Start With Tokens, Not Components

The foundation of any scalable design system is a well-defined token layer. Tokens are the atomic values — colors, spacing, typography, shadows — that every component draws from.

When you change a token, every component that references it updates automatically. This is the difference between a design system and a component library.

### What makes a good token system:

- **Semantic naming** — Use \`--color-primary\` instead of \`--blue-500\`. The intent matters more than the value.
- **Layered abstraction** — Global tokens feed into component tokens. \`--button-bg\` references \`--color-primary\`, not a raw hex value.
- **Theme-aware** — Tokens should support multiple themes (light, dark, high-contrast) without changing component code.

## The Component API Contract

Every component in your system is an API. Treat it like one.

Document the props. Define the variants. Specify the states. Write examples. If a developer can't understand how to use your component in under 30 seconds, the API is too complex.

### Rules we follow at Helva:

1. **No more than 5 props** for simple components. If you need more, you probably need two components.
2. **Composition over configuration** — Instead of a \`Card\` with 12 props, provide \`Card\`, \`CardHeader\`, \`CardBody\`, and \`CardFooter\`.
3. **Sensible defaults** — Every prop should have a default that covers 80% of use cases.

## Growing Without Breaking

The real test of a design system isn't how it looks on day one — it's whether it still works on day 300.

Version your components. Use semantic versioning. Deprecate before you delete. Run visual regression tests. And most importantly, talk to the people using your system. Their friction is your roadmap.

## Key Takeaways

A design system that scales is one that respects both the designer's intent and the developer's workflow. Build tokens first, keep component APIs tight, and never stop iterating based on real usage data.
    `,
  },
  {
    slug: 'the-case-for-slower-product-development',
    category: 'Product Strategy',
    title: 'The Case for Slower Product Development',
    excerpt: 'Why taking time to build foundations pays dividends in the long run.',
    date: 'Nov 2024',
    readTime: '5 min read',
    author: 'Helva Team',
    tags: ['product', 'strategy', 'process'],
    content: `
## Speed Is Not Velocity

There's a persistent myth in product development: faster is better. Ship quickly. Move fast and break things. Iterate at all costs.

But speed without direction is just chaos. Velocity — speed with direction — is what actually matters.

## The Cost of Moving Too Fast

When you prioritize speed above everything else, you accumulate debt. Technical debt. Design debt. Organizational debt.

Every shortcut you take today becomes a toll you pay tomorrow. And the interest rate on technical debt is brutal.

### What we've seen go wrong:

- **Architecture decisions made under pressure** that took months to unwind
- **User flows designed around implementation convenience** rather than user needs
- **Teams burning out** from constant firefighting instead of building

## The Foundation Approach

At Helva, we advocate for what we call the Foundation Approach: spend the first 20% of any project timeline on architecture, research, and design exploration — before writing a single line of production code.

This feels slow. It feels unproductive. But it's the opposite.

### What a strong foundation gives you:

1. **Faster iteration later** — When the architecture is right, changes are cheap.
2. **Fewer rewrites** — You build it once, correctly, instead of three times poorly.
3. **Better team alignment** — Everyone understands the why before the what.

## When to Go Fast

We're not saying you should never move quickly. Speed is appropriate when:

- You're validating a hypothesis with a prototype
- The cost of being wrong is low
- You have a strong foundation to build on

The key is knowing which phase you're in. Exploration should be fast and cheap. Production should be deliberate and durable.

## The Bottom Line

Slower product development isn't about being slow — it's about being intentional. Build the right thing, then build it right. Your future self (and your users) will thank you.
    `,
  },
  {
    slug: 'choosing-boring-technology',
    category: 'Engineering',
    title: 'Choosing Boring Technology',
    excerpt: 'Proven tools over shiny new frameworks. A philosophy for sustainable technical decisions.',
    date: 'Oct 2024',
    readTime: '6 min read',
    author: 'Helva Team',
    tags: ['engineering', 'architecture', 'decisions'],
    content: `
## The Innovation Token Budget

Every team gets a limited number of innovation tokens — opportunities to bet on new, unproven technology. Spend them wisely.

Dan McKinley's original essay on this topic resonated deeply with us at Helva. The core idea: you can only afford a few pieces of "exciting" technology in your stack. Everything else should be boring, proven, and well-understood.

## What "Boring" Actually Means

Boring technology isn't bad technology. It's technology that:

- Has been in production for years
- Has well-known failure modes
- Has extensive documentation and community support
- Has people who know how to operate it

PostgreSQL is boring. Redis is boring. React is boring. And that's exactly why they're excellent choices for most projects.

## The Hidden Costs of New

Every new technology comes with hidden costs that don't show up in the README:

### Operational burden
- Who knows how to debug it at 3 AM?
- What are the failure modes?
- How does it behave under load?

### Knowledge silos
- Can you hire people who know it?
- What happens when the one person who understands it leaves?
- How much time do new team members spend learning it?

### Ecosystem maturity
- Are there production-grade libraries?
- Is the API stable or still changing?
- Will this project exist in 3 years?

## When to Choose Exciting

Innovation tokens should be spent where they create genuine competitive advantage. If a new technology enables something that's impossible (or extremely difficult) with boring alternatives, that's a valid use of a token.

### Good reasons to innovate:
- The boring option genuinely can't solve the problem
- The technology directly serves your core value proposition
- You have the team expertise to operate it

### Bad reasons to innovate:
- "It's the hot new thing"
- "Our engineers want to learn it"
- "The old way feels outdated"

## Our Stack Philosophy

At Helva, we default to boring and justify exciting. Our stack choices are deliberately conservative, which means we spend our time solving business problems instead of fighting infrastructure.

When we do choose something new, we contain the blast radius. New technology goes into isolated services, never into the critical path, until it's proven itself in our environment.

## The Takeaway

Your technology choices should optimize for total cost of ownership, not developer excitement. Boring technology lets you focus on what actually matters: building great products for your users.
    `,
  },
  {
    slug: 'accessibility-is-not-optional',
    category: 'Design',
    title: 'Accessibility Is Not Optional',
    excerpt: 'Building inclusive digital products isn\'t just ethical — it\'s good business.',
    date: 'Sep 2024',
    readTime: '7 min read',
    author: 'Helva Team',
    tags: ['accessibility', 'design', 'inclusion'],
    content: `
## The Numbers Don't Lie

Over 1 billion people worldwide live with some form of disability. That's roughly 15% of the global population. When you build inaccessible products, you're not just excluding a minority — you're excluding a massive market segment.

## Beyond Compliance

Too many teams treat accessibility as a checkbox exercise. "We ran an automated tool and fixed the critical issues." That's compliance, not accessibility.

True accessibility means designing products that work for everyone, including people with:

- **Visual impairments** — blindness, low vision, color blindness
- **Motor disabilities** — limited fine motor control, paralysis
- **Cognitive differences** — dyslexia, ADHD, autism
- **Temporary limitations** — broken arm, bright sunlight, noisy environment

## The Curb Cut Effect

When sidewalks were redesigned with curb cuts for wheelchair users, everyone benefited. Parents with strollers. Delivery workers with carts. Travelers with luggage. Skateboarders.

The same principle applies to digital products:

- **Captions** help deaf users, but also people in quiet offices or loud cafes
- **Keyboard navigation** helps motor-impaired users, but also power users who prefer keyboards
- **Clear hierarchy** helps screen reader users, but also everyone scanning content quickly
- **High contrast** helps low-vision users, but also everyone using devices in sunlight

## Practical Steps

### Start with semantics
Use proper HTML elements. A \`<button>\` is a button, not a \`<div>\` with an onClick handler. Semantic HTML gives you accessibility features for free.

### Test with real tools
Use a screen reader at least once a month. Navigate your entire product with only a keyboard. Test with browser zoom at 200%.

### Design with intent
- Minimum 4.5:1 contrast ratio for text
- Touch targets at least 44x44 pixels
- Focus indicators that are visible and obvious
- Error messages that explain what went wrong and how to fix it

### Integrate into your workflow
Accessibility isn't a phase — it's a practice. Include it in your design reviews, code reviews, and QA process.

## The Business Case

Beyond the ethical imperative, accessible products:
- Reach a larger market
- Rank better in search engines (SEO and accessibility overlap significantly)
- Reduce legal risk
- Demonstrate brand values

## Our Commitment

At Helva, every product we build targets WCAG 2.1 AA compliance as a minimum. But we aim higher than compliance. We aim for products that feel natural and effortless for every user, regardless of ability.
    `,
  },
  {
    slug: 'remote-collaboration-that-works',
    category: 'Culture',
    title: 'Remote Collaboration That Actually Works',
    excerpt: 'Lessons from running distributed teams across Edinburgh, Stockholm, and beyond.',
    date: 'Aug 2024',
    readTime: '6 min read',
    author: 'Helva Team',
    tags: ['remote', 'collaboration', 'culture'],
    content: `
## The Distributed Reality

Helva operates across Edinburgh, Stockholm, Columbus, Portland, Sulaimani, and Erbil. We don't have a headquarters. We don't have an "office culture" that remote workers adapt to. Distribution is our culture.

This gives us a unique perspective on what makes remote collaboration actually work — not in theory, but in daily practice.

## Communication as Infrastructure

In a distributed team, communication isn't something that happens naturally by the coffee machine. It's infrastructure that needs to be designed, built, and maintained.

### Our communication stack:

- **Asynchronous by default** — Most communication happens in writing. This respects time zones and gives people space to think before responding.
- **Synchronous by necessity** — Real-time meetings are reserved for decisions that need discussion, creative collaboration, and human connection.
- **Documentation as source of truth** — If it's not written down, it doesn't exist. We document decisions, not just discussions.

## The Async-First Principle

The biggest mistake remote teams make is trying to replicate the office online. Constant video calls. Always-on Slack. "Quick sync" meetings that aren't quick.

Instead, we optimize for async:

1. **Write it down** — Proposals, updates, and decisions go in documents, not messages
2. **Give response windows** — Most things don't need an answer in the next hour
3. **Record, don't repeat** — If you had a meeting, write a summary for everyone who wasn't there
4. **Respect focus time** — Block time for deep work. Notifications can wait.

## Making Meetings Matter

We haven't eliminated meetings. We've made them meaningful.

### Meeting types we keep:

- **Weekly team sync** — 30 minutes, standup format, async pre-read required
- **Design reviews** — Visual work needs real-time discussion. Screen sharing, active critique.
- **Retrospectives** — Bi-weekly. What's working? What's not? What will we change?
- **Social time** — Optional, unstructured, no agenda. Just humans being human.

### Meeting types we killed:

- Status updates (use async updates)
- "Let me share my screen and walk you through this" (record a Loom instead)
- Brainstorming (do it async first, then discuss the best ideas synchronously)

## Trust as Foundation

None of this works without trust. Trust that people are working. Trust that they'll deliver. Trust that they'll ask for help when they need it.

We build trust through:
- **Transparency** — Everyone can see what everyone else is working on
- **Accountability** — Clear ownership, clear deadlines, clear outcomes
- **Grace** — Life happens. Kids get sick. Internet goes down. Flexibility is not a perk, it's a practice.

## The Result

Our distributed model isn't perfect. We miss spontaneous whiteboard sessions. We have timezone math headaches. Some conversations take longer async than they would in person.

But we also have access to talent across continents. Our team members have the flexibility to live where they want. And our documentation is world-class (because it has to be).

The future of work isn't remote vs. office. It's intentional vs. accidental. We choose intentional.
    `,
  },
];

export const categories = [...new Set(articles.map(a => a.category))];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, count = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, count);
  
  return articles
    .filter(a => a.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.tags.filter(t => current.tags.includes(t)).length;
      const bMatch = b.tags.filter(t => current.tags.includes(t)).length;
      return bMatch - aMatch;
    })
    .slice(0, count);
}
