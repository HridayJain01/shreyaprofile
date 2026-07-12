"use client";

import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

const TWISTS = [
  {
    n: "01",
    title: "Backstage with Shilpa Shetty",
    body: "Helped organize and host a Women's Day event alongside Shilpa Shetty.",
    note: "yes, that Shilpa Shetty",
    accent: "#D9A7B5",
  },
  {
    n: "02",
    title: "The Girl with Too Many Accents",
    body: "Won Miss Faisca by performing American, British, Irish, and French accents.",
    note: "the French one is my favourite, obviously",
    accent: "#C4A484",
  },
  {
    n: "03",
    title: "100,000 Reasons to Keep Posting",
    body: "Grew my Pinterest account to over 100K monthly views.",
    note: "a museum of my personality, remember?",
    accent: "#A8B6A0",
  },
  {
    n: "04",
    title: "A Microphone Instead of a Keyboard",
    body: "Hosted a Roka ceremony as the event anchor.",
    note: "software engineers can hold a room too",
    accent: "#D9A7B5",
  },
  {
    n: "05",
    title: "Conversations That Stayed",
    body: "Organized the TSEC Alumni Meet and spent the evening talking to founders, leaders, and alumni whose journeys inspired me.",
    note: "still thinking about some of those talks",
    accent: "#C4A484",
  },
  {
    n: "06",
    title: "The Camera Doesn't Scare Me",
    body: "Modeling has always been on my bucket list. Now I'm just waiting for someone to say, “Let's shoot.”",
    note: "manifesting ✨",
    accent: "#A8B6A0",
  },
];

export default function PlotTwists() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="plot-twists" className="relative bg-linen paper-texture">
      <ChapterHeading number="09" title="The Plot Twists" note="things the resume won't tell you" />

      <div className="mx-auto max-w-6xl px-6 pb-36">
        <p data-reveal className="max-w-xl text-warmgray leading-relaxed -mt-6 mb-14">
          Every good editorial saves a few surprises for the back pages. These are mine —
          clippings from the chapters that don&apos;t fit anywhere else.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
          {TWISTS.map((t, i) => (
            <article
              key={t.n}
              data-reveal
              data-reveal-delay={String((i % 2) * 0.12)}
              className={`relative flex gap-6 ${i % 2 ? "md:mt-10" : ""}`}
            >
              <span
                className="font-serif-display italic text-6xl md:text-7xl leading-none select-none"
                style={{ color: t.accent, opacity: 0.75 }}
              >
                {t.n}
              </span>
              <div className="relative paper-card p-6 flex-1" style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}>
                <span className="tape -top-3 right-8" style={{ transform: `rotate(${i % 2 ? -4 : 4}deg)` }} />
                <h3 className="font-serif-display text-2xl md:text-3xl text-ink-deep leading-tight">{t.title}</h3>
                <p className="text-warmgray leading-relaxed mt-3">{t.body}</p>
                <p className="font-hand text-xl mt-3" style={{ color: t.accent }}>
                  {t.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
