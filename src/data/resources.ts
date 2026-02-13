export interface Resource {
  type: string;
  title: string;
  description: string;
  format: string;
}

export const resources: Resource[] = [
  {
    type: 'Template',
    title: 'Design Token Starter',
    description: 'A minimal foundation for building your own design token system.',
    format: 'Figma + Code',
  },
  {
    type: 'Guide',
    title: 'Component Documentation',
    description: 'How we document our components for clarity and maintainability.',
    format: 'PDF',
  },
  {
    type: 'Checklist',
    title: 'Product Launch Readiness',
    description: 'Everything to verify before shipping a new product or feature.',
    format: 'Notion',
  },
];
