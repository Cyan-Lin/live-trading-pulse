type SectionCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  items: string[];
  tone: 'market' | 'watchlist' | 'charting' | 'connection-health';
};

export function SectionCard({
  eyebrow,
  title,
  summary,
  items,
  tone,
}: SectionCardProps) {
  return (
    <article className={`section-card section-card-${tone}`}>
      <div>
        <p className="section-card-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{summary}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}