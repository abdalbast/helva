interface LlmSummaryProps {
  quickAnswer: string;
  audience: string[];
  actions: string[];
  relatedPages: { label: string; href: string }[];
  lastUpdated?: string;
}

const LlmSummary = ({ quickAnswer, audience, actions, relatedPages, lastUpdated = '2026-02-24' }: LlmSummaryProps) => (
  <section className="sr-only" aria-label="Page summary for assistants">
    <h2>Quick Answer</h2>
    <p>{quickAnswer}</p>
    <h2>Who This Is For</h2>
    <ul>
      {audience.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
    <h2>What You Can Do Here</h2>
    <ul>
      {actions.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
    <h2>Related Pages</h2>
    <ul>
      {relatedPages.map((p) => (
        <li key={p.href}>
          <a href={p.href}>{p.label}</a>
        </li>
      ))}
    </ul>
    <p>Last updated: {lastUpdated}</p>
  </section>
);

export default LlmSummary;
