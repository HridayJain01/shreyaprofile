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
    year: "2021",
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
    year: "2022",
    title: "The first project",
    note: "It barely worked. It was beautiful to me anyway. That gap — between barely and beautiful — became my obsession.",
    memory: {
      kind: "sticky",
      color: "#F4E9C9",
      caption: "TODO (found in an old notebook)",
      body: "1. make it work\n2. make it right\n3. make it lovely ✿",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "2023",
    title: "First hackathon",
    note: "36 hours, four teammates, too much chai. We didn't win — but I learned I could build under pressure and love it.",
    memory: {
      kind: "polaroid",
      caption: "3:42 AM, still going",
      art: doodle(
        ["M30 100 h60 v-30 h-60 z M40 70 v-12 h40 v12", "M120 95 a16 16 0 1 1 0.1 0 M120 85 v10 h8", "M30 115 h140"],
        "#6E675F"
      ),
    },
  },
  {
    year: "2024",
    title: "Etcetera Holidays",
    note: "My first taste of real users. Frontend developer & designer — I learned that shipping something people touch changes how you build everything.",
    memory: {
      kind: "scrap",
      caption: "boarding pass, kept for luck",
      body: "ETC ✈ HOLIDAYS · SEAT 12A · DESIGN & CODE",
      art: null as unknown as React.ReactNode,
    },
  },
  {
    year: "2025",
    title: "Intellimark AI",
    note: "Software engineer intern. Real scale, real reviews, real engineering. March 2025 — my first real engineering challenge.",
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
    year: "2025",
    title: "Codeissance — we won",
    note: "The hackathon win. Months of losing gracefully, then one night everything clicked. I still have the confetti somewhere.",
    memory: {
      kind: "sticky",
      color: "#EFD9DF",
      caption: "note from a teammate",
      body: "“shreya carried the design\nAND the deploy” ♡",
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
      <ChapterHeading number="02" title="My Story" note="a notebook that never ends" />

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
