export default function ChapterHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-28 pb-14 md:pt-40 md:pb-20">
      <div data-reveal className="flex items-baseline gap-6">
        <span className="text-xs tracking-[0.35em] uppercase text-warmgray">
          Chapter {number}
        </span>
        <span className="h-px flex-1 bg-warmgray/25" />
        {note && <span className="font-hand text-xl text-champagne">{note}</span>}
      </div>
      <h2
        data-reveal
        data-reveal-delay="0.1"
        className="font-serif-display mt-6 text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tight text-ink-deep"
      >
        {title}
      </h2>
    </header>
  );
}
