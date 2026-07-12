"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

const MOMENTS = [
  {
    time: "11:58 PM",
    title: "The announcement",
    caption: "Codeissance Hackathon — winners.",
    body: "They said our name and for a second nobody on the team moved. Then everybody moved at once.",
    accent: "#D9A7B5",
    art: (
      <svg viewBox="0 0 200 140" className="w-full bg-linen">
        <path d="M100 24 l10 22 24 3 -17 17 4 24 -21 -11 -21 11 4 -24 -17 -17 24 -3 z" fill="none" stroke="#232323" strokeWidth="2" strokeLinejoin="round" />
        <path d="M30 120 q 20 -14 40 0 M130 120 q 20 -14 40 0" fill="none" stroke="#232323" strokeWidth="2" strokeLinecap="round" />
        <path d="M52 40 l6 6 M148 40 l-6 6 M100 8 v8" stroke="#C4A484" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: "2:17 AM",
    title: "The deploy that worked",
    caption: "late night coding, frozen mid-breath",
    body: "Green checkmarks all the way down. The quietest kind of fireworks.",
    accent: "#A8B6A0",
    art: (
      <svg viewBox="0 0 200 140" className="w-full bg-linen">
        <rect x="30" y="20" width="140" height="86" rx="6" fill="none" stroke="#232323" strokeWidth="2" />
        <path d="M46 44 h60 M46 60 h80 M46 76 h48" stroke="#6E675F" strokeWidth="2" strokeLinecap="round" />
        <path d="M132 70 l10 10 l20 -24" fill="none" stroke="#A8B6A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 106 v14 M130 106 v14 M50 120 h100" stroke="#232323" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    time: "4:40 PM",
    title: "The presentation",
    caption: "design review, all eyes up",
    body: "Twelve slides, one idea: software can feel like it was made by someone who cared.",
    accent: "#C4A484",
    art: (
      <svg viewBox="0 0 200 140" className="w-full bg-linen">
        <rect x="40" y="18" width="120" height="74" rx="4" fill="none" stroke="#232323" strokeWidth="2" />
        <path d="M60 40 q 20 -14 40 0 t 40 0" fill="none" stroke="#D9A7B5" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M60 66 h56" stroke="#6E675F" strokeWidth="2" strokeLinecap="round" />
        <circle cx="66" cy="116" r="10" fill="none" stroke="#232323" strokeWidth="2" />
        <circle cx="100" cy="118" r="10" fill="none" stroke="#232323" strokeWidth="2" />
        <circle cx="134" cy="116" r="10" fill="none" stroke="#232323" strokeWidth="2" />
      </svg>
    ),
  },
  {
    time: "later",
    title: "The celebration",
    caption: "cake, confetti, screenshots",
    body: "Wins are short. The people you win with are the part you keep.",
    accent: "#D9A7B5",
    art: (
      <svg viewBox="0 0 200 140" className="w-full bg-linen">
        <path d="M70 120 h60 v-30 q -30 -12 -60 0 z" fill="none" stroke="#232323" strokeWidth="2" strokeLinejoin="round" />
        <path d="M85 88 v-14 M100 84 v-16 M115 88 v-14" stroke="#232323" strokeWidth="2" strokeLinecap="round" />
        <circle cx="85" cy="70" r="3" fill="#C4A484" />
        <circle cx="100" cy="64" r="3" fill="#D9A7B5" />
        <circle cx="115" cy="70" r="3" fill="#A8B6A0" />
        <path d="M40 30 l6 6 M160 28 l-6 6 M50 60 l8 2 M150 58 l-8 2 M100 20 v8" stroke="#D9A7B5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Achievements() {
  const ref = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Walk between the frozen moments: pinned section, horizontal scrub.
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
      <ChapterHeading number="08" title="Frozen Moments" note="walk between them" />

      <div ref={pinRef} className="md:h-screen md:flex md:items-center">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-12 md:gap-24 px-6 md:px-[12vw] pb-24 md:pb-0 md:w-max items-center"
        >
          {MOMENTS.map((m, i) => (
            <figure key={m.title} data-reveal className="w-full max-w-sm md:w-[26rem] shrink-0">
              <div className="polaroid" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                <span className="tape -top-3 left-1/2 -translate-x-1/2" />
                {m.art}
                <figcaption className="mt-4 px-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-hand text-2xl" style={{ color: m.accent }}>{m.time}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-warmgray">{m.caption}</span>
                  </div>
                  <p className="font-serif-display text-2xl text-ink-deep mt-1">{m.title}</p>
                  <p className="text-sm text-warmgray leading-relaxed mt-2">{m.body}</p>
                </figcaption>
              </div>
            </figure>
          ))}
          <div className="shrink-0 md:pr-[10vw]">
            <p className="font-hand text-3xl text-warmgray max-w-50">more moments currently in development…</p>
          </div>
        </div>
      </div>
    </section>
  );
}
