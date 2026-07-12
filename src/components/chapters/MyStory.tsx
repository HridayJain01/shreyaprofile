"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

type Memory = {
  kind: "polaroid" | "sticky" | "scrap";
  caption: string;
  body?: string;
  color?: string;
  art: React.ReactNode;
};

type Milestone = {
  year: string;
  title: string;
  note: string;
  memory: Memory;
};

const doodle = (paths: string[], stroke = "#232323") => (
  <svg viewBox="0 0 200 140" className="w-full h-auto bg-linen">
    {paths.map((d, i) => (
      <path key={i} d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
);

const MILESTONES: Milestone[] = [
  {
    year: "2022",
    title: "Engineering begins",
    note: "Walked into TSEC with a notebook full of questions. Information Technology chose me back.",
    memory: {
      kind: "polaroid",
      caption: "college ID, day one",
      art: doodle([
        "M30 30 h140 v80 h-140 z",
        "M45 50 a12 12 0 1 1 0.1 0 M38 82 q19 14 38 0",
        "M95 52 h60 M95 66 h60 M95 80 h42",
      ]),
    },
  },
  {
    year: "2023",
    title: "First hackathon — and a win",
    note: "Newbiethon, the beginners' hackathon. Just 3 hours, 3 teammates — and we won. First taste of building under pressure, and of liking it.",
    memory: {
      kind: "sticky",
      color: "#F4E9C9",
      caption: "the maths of it",
      body: "3 hours\n3 teammates\n1 very first win ✿",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "2024",
    title: "Intellimark AI",
    note: "Web developer intern — for a whole year. Real scale, real reviews, real users. The first time my code belonged to something bigger than me.",
    memory: {
      kind: "polaroid",
      caption: "first PR approved ✓",
      art: doodle(
        ["M30 40 h140 M30 40 v70 h140 v-70", "M45 60 h50 M45 72 h70 M45 84 h40", "M130 78 l10 10 l22 -24"],
        "#A8B6A0"
      ),
    },
  },
  {
    year: "2024",
    title: "Etcetera Holidays",
    note: "Frontend developer & designer. Shipping something people actually touch changes how you build everything.",
    memory: {
      kind: "scrap",
      caption: "boarding pass, kept for luck",
      body: "ETC ✈ HOLIDAYS · SEAT 12A · DESIGN & CODE",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "2025",
    title: "Codeissance — we won",
    note: "The big hackathon win. Months of losing gracefully, then one night everything clicked. I still have the confetti somewhere.",
    memory: {
      kind: "sticky",
      color: "#EFD9DF",
      caption: "note from a teammate",
      body: "“shreya carried the design\nAND the deploy” ♡",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "2026",
    title: "Kalptaru Academy",
    note: "Built two websites solo — one for their diamond-jewellery learning academy, one for her skincare brand. Attended events with her, hosting included. My first end-to-end everything.",
    memory: {
      kind: "polaroid",
      caption: "two sites, one me",
      art: doodle(
        [
          "M40 46 l16 -14 l16 14 l-6 0 l0 22 l-20 0 l0 -22 z",
          "M56 44 l0 8 M50 52 l12 0",
          "M110 34 h56 v40 h-56 z M118 46 h40 M118 56 h28",
          "M138 88 q -18 10 0 22 q 18 -12 0 -22",
        ],
        "#C4A484"
      ),
    },
  },
  {
    year: "2026",
    title: "Deloitte, virtually",
    note: "Virtual intern at Deloitte — live sessions with people whose calendars I used to only read about. Learned an unreasonable amount in a short time.",
    memory: {
      kind: "sticky",
      color: "#DFE6DA",
      caption: "session notes, condensed",
      body: "listen hard.\nask sharper.\nwrite it down.",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "someday",
    title: "Future dreams",
    note: "World-class software at the intersection of technology, fashion, beauty, and AI. Built from anywhere in the world. Loved by the people who use it.",
    memory: {
      kind: "scrap",
      caption: "the plan, roughly",
      body: "build elegant things → travel → repeat",
      art: null as unknown as React.ReactNode,
    },
  },
];

function MemoryPiece({ memory }: { memory: Memory }) {
  if (memory.kind === "polaroid") {
    return (
      <div className="polaroid rotate-2 w-56 md:w-64">
        <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
        {memory.art}
        <p className="font-hand text-xl text-ink text-center mt-3">{memory.caption}</p>
      </div>
    );
  }
  if (memory.kind === "sticky") {
    return (
      <div className="sticky-note -rotate-2 w-52 md:w-56 p-5" style={{ background: memory.color }}>
        <p className="text-[10px] tracking-[0.25em] uppercase text-warmgray">{memory.caption}</p>
        <p className="font-hand text-2xl text-ink mt-2 whitespace-pre-line leading-snug">{memory.body}</p>
      </div>
    );
  }
  return (
    <div className="paper-card rotate-1 w-60 md:w-72 p-5 border border-champagne/40">
      <span className="tape -top-3 right-6 rotate-6" />
      <p className="text-[10px] tracking-[0.25em] uppercase text-warmgray">{memory.caption}</p>
      <p className="font-serif-display italic text-xl text-ink mt-2">{memory.body}</p>
    </div>
  );
}

export default function MyStory() {
  const ref = useReveal<HTMLElement>();
  const lineRef = useRef<SVGPathElement>(null);

  // Photos slide out from between the pages as you scroll.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-slide]").forEach((item) => {
        const from = item.dataset.slide === "left" ? -90 : 90;
        gsap.fromTo(
          item,
          { x: from, opacity: 0, rotate: from > 0 ? 6 : -6 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });

      const path = lineRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector("[data-spine]"),
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref} id="my-story" className="relative bg-linen paper-texture">
      <ChapterHeading number="03" title="My Story" note="a notebook that never ends" />

      <div data-spine className="relative mx-auto max-w-4xl px-6 pb-40 notebook-lines">
        {/* red margin line, like a real notebook */}
        <div className="absolute top-0 bottom-0 left-10 md:left-16 w-px bg-blush/50" />

        {/* the ink thread that draws itself down the spine */}
        <svg
          className="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 hidden md:block"
          viewBox="0 0 40 2000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            ref={lineRef}
            d="M20 0 q 12 120 0 250 t 0 250 t 0 250 t 0 250 t 0 250 t 0 250 t 0 250 q -8 130 0 250"
            fill="none"
            stroke="#C4A484"
            strokeWidth="1.6"
          />
        </svg>

        <div className="space-y-28 pt-10">
          {MILESTONES.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={m.title}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  left ? "" : "md:flex-row-reverse"
                }`}
              >
                <div data-reveal className={`md:w-1/2 ${left ? "md:text-right" : ""}`}>
                  <span className="font-hand text-3xl text-champagne">{m.year}</span>
                  <h3 className="font-serif-display text-3xl md:text-4xl font-medium text-ink-deep mt-1">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-warmgray leading-relaxed max-w-sm inline-block">{m.note}</p>
                </div>
                <div data-slide={left ? "right" : "left"} className="md:w-1/2 flex justify-center relative">
                  <MemoryPiece memory={m.memory} />
                </div>
              </div>
            );
          })}
        </div>

        <div data-reveal className="text-center pt-24">
          <p className="font-hand text-3xl text-warmgray">…and the notebook keeps going.</p>
        </div>
      </div>
    </section>
  );
}
