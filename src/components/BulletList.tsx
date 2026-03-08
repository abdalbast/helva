const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 text-muted-foreground">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
        {item}
      </li>
    ))}
  </ul>
);

export default BulletList;
