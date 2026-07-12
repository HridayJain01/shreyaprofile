"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

// Pin coordinates (percent of wall) — the thread connects these in order.
const PINS = [
  { x: 22, y: 18 }, // pass
  { x: 62, y: 14 }, // poster
  { x: 84, y: 44 }, // ticket
  { x: 58, y: 62 }, // moodboard
  { x: 24, y: 66 }, // note
  { x: 40, y: 36 }, // photo
];

export default function Leadership() {
  const ref = useReveal<HTMLElement>();
  const threadRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = threadRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path.closest("[data-wall]"),
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.8,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const d = PINS.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <section ref={ref} id="leadership" className="relative bg-linen paper-texture">
      <ChapterHeading number="07" title="The Wall" note="connect the threads" />

      <div className="mx-auto max-w-6xl px-6 pb-36">
        <p data-reveal className="max-w-xl text-warmgray leading-relaxed -mt-6 mb-10">
          Design Head of <strong className="text-ink">TSEC CodeStorm</strong>. This is the wall
          above my desk that year — every event, poster, and 2 a.m. decision, held together by
          one long thread.
        </p>

        <div
          data-wall
          data-reveal
          className="relative w-full min-h-[42rem] md:min-h-[38rem] rounded-sm p-4"
          style={{
            background: "linear-gradient(150deg, #F4EEE5, #EFE7DB)",
            boxShadow: "inset 0 0 40px rgba(110,103,95,0.1), 0 30px 60px -30px rgba(35,35,35,0.25)",
          }}
        >
          {/* the thread */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path ref={threadRef} d={d} fill="none" stroke="#D9A7B5" strokeWidth="0.35" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
          </svg>

          {/* pins */}
          {PINS.map((p, i) => (
            <span
              key={i}
              className="pin"
              style={{ left: `calc(${p.x}% - 7px)`, top: `calc(${p.y}% - 7px)`, background: i % 2 ? "#C4A484" : "#D9A7B5" }}
            />
          ))}

          {/* committee pass */}
          <div className="absolute left-[8%] top-[8%] w-44 md:w-56 paper-card p-4 -rotate-3">
            <p className="text-[9px] tracking-[0.35em] uppercase text-warmgray">TSEC CodeStorm · name card</p>
            <p className="font-serif-display text-2xl text-ink mt-2">Shreya Chawale</p>
            <p className="font-hand text-xl text-blush">Design Head</p>
            <p className="text-[12px] text-warmgray leading-snug mt-2">
              Applied because I wanted to know how events happened. Stayed because I learned how
              people make them happen.
            </p>
            <div className="mt-3 h-8 bg-linen flex items-center justify-center">
              <span className="font-mono text-[10px] tracking-[0.5em] text-warmgray">||| || |||| |</span>
            </div>
          </div>

          {/* poster */}
          <div className="absolute left-[50%] top-[6%] w-40 md:w-48 bg-ink text-paper p-5 rotate-2 shadow-xl">
            <p className="text-[9px] tracking-[0.4em] uppercase text-champagne">flagship event</p>
            <p className="font-serif-display text-3xl leading-none mt-2">CODE<br />STORM</p>
            <p className="font-hand text-lg text-blush mt-3">one poster. twenty versions.<br />version three won.</p>
          </div>

          {/* ticket */}
          <div className="absolute right-[4%] top-[36%] w-44 paper-card p-3 rotate-6 border-dashed border-2 border-champagne/50">
            <p className="text-[9px] tracking-[0.3em] uppercase text-warmgray">admit one · 200 seats</p>
            <p className="font-serif-display text-lg text-ink">Months of planning.</p>
            <p className="font-hand text-lg text-sage">three hours of controlled chaos ✓</p>
          </div>

          {/* moodboard */}
          <div className="absolute left-[46%] top-[52%] w-48 md:w-56 paper-card p-3 -rotate-1">
            <p className="text-[9px] tracking-[0.3em] uppercase text-warmgray mb-2">brand moodboard</p>
            <div className="grid grid-cols-4 gap-1.5">
              {["#232323", "#D9A7B5", "#C4A484", "#A8B6A0", "#EFE7DB", "#6E675F", "#F4EEE5", "#181818"].map((c) => (
                <div key={c} className="aspect-square" style={{ background: c }} />
              ))}
            </div>
            <p className="font-hand text-lg text-warmgray mt-2">
              turns out, the hardest design decision is knowing what to remove.
            </p>
          </div>

          {/* sticky note */}
          <div className="absolute left-[10%] top-[58%] w-40 sticky-note p-4 rotate-2" style={{ background: "#F4E9C9" }}>
            <p className="font-hand text-xl text-ink leading-snug">
              if I&apos;d stop scrolling for it, it&apos;s ready.
            </p>
          </div>

          {/* photo */}
          <div className="absolute left-[30%] top-[26%] w-36 md:w-40 polaroid rotate-1 hidden sm:block">
            <svg viewBox="0 0 140 100" className="w-full bg-linen">
              <circle cx="40" cy="45" r="14" fill="none" stroke="#232323" strokeWidth="2" />
              <circle cx="75" cy="42" r="14" fill="none" stroke="#232323" strokeWidth="2" />
              <circle cx="108" cy="46" r="14" fill="none" stroke="#232323" strokeWidth="2" />
              <path d="M26 92 q 14 -24 28 0 M61 90 q 14 -24 28 0 M94 92 q 14 -24 28 0" fill="none" stroke="#232323" strokeWidth="2" />
            </svg>
            <p className="font-hand text-lg text-center text-ink mt-2">
              joined to design. left knowing how to build with people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
