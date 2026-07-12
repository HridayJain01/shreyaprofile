"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

type Decision = {
  did: string;
  keyword: string;
  cond: string;
  call: string;
  accent: string;
};

const DECISIONS: Decision[] = [
  {
    did: "Said yes to CodeStorm.",
    keyword: "if",
    cond: "opportunity.appears()",
    call: "sayYes();",
    accent: "#D9A7B5",
  },
  {
    did: "Talked to a stranger in a Tira queue.",
    keyword: "if",
    cond: "conversation.starts()",
    call: "stayCurious();",
    accent: "#C4A484",
  },
  {
    did: "Built one website.",
    keyword: "if",
    cond: "someone.trustsMe()",
    call: "overDeliver();",
    accent: "#A8B6A0",
  },
  {
    did: "Posted consistently on Pinterest.",
    keyword: "while",
    cond: "nobody.isWatching()",
    call: "keepShowingUp();",
    accent: "#D9A7B5",
  },
  {
    did: "Started writing product ideas.",
    keyword: "if",
    cond: "idea.keepsReturning()",
    call: "build();",
    accent: "#C4A484",
  },
  {
    did: "Read Atomic Habits.",
    keyword: "while",
    cond: "alive",
    call: "compound(1%);",
    accent: "#A8B6A0",
  },
];

function DecisionCard({ d, i }: { d: Decision; i: number }) {
  return (
    <figure data-reveal className="w-full max-w-sm md:w-96 shrink-0">
      <div
        className="paper-card p-8 relative transition-transform duration-500 hover:-translate-y-2"
        style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
      >
        <span className="tape -top-3 left-1/2 -translate-x-1/2" />
        <span className="font-serif-display italic text-5xl leading-none" style={{ color: d.accent, opacity: 0.7 }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <p className="font-serif-display text-2xl md:text-[1.7rem] leading-snug text-ink-deep mt-4">
          {d.did}
        </p>

        <div className="flex justify-center my-5">
          <svg width="18" height="34" viewBox="0 0 18 34">
            <path d="M9 2 v24 m -7 -8 l 7 9 l 7 -9" fill="none" stroke={d.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="bg-[#faf7f1] border border-ink/10 rounded-sm px-5 py-4 font-mono text-[14px] leading-relaxed">
          <p>
            <span className="text-blush">{d.keyword}</span>{" "}
            <span className="text-warmgray">(</span>
            <span className="text-ink">{d.cond}</span>
            <span className="text-warmgray">)</span>
          </p>
          <p className="pl-6">
            <span style={{ color: "#8a9a80" }}>{d.call}</span>
          </p>
        </div>
      </div>
    </figure>
  );
}

export default function Achievements() {
  const ref = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Walk between the decisions: pinned section, horizontal scrub.
  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const scroll = () => track.scrollWidth - pin.clientWidth;
      gsap.to(track, {
        x: () => -scroll(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${scroll()}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} id="achievements" className="relative bg-paper paper-texture overflow-hidden">
      <ChapterHeading number="08" title="Decisions That Compound" note="small choices, run in a loop" />

      <div ref={pinRef} className="md:h-screen md:flex md:items-center">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-12 md:gap-20 px-6 md:px-[12vw] pb-24 md:pb-0 md:w-max items-center"
        >
          {DECISIONS.map((d, i) => (
            <DecisionCard key={d.did} d={d} i={i} />
          ))}
          <div className="shrink-0 md:pr-[10vw]">
            <p className="font-hand text-3xl text-warmgray max-w-52">
              return interest; <br />
              <span className="text-champagne">// it compounds.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
