"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

type DeskObject = {
  id: string;
  label: string;
  skills: string[];
  note: string;
  x: string;
  y: string;
  w: string;
  r: number;
  svg: React.ReactNode;
};

const S = { stroke: "#232323", strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const OBJECTS: DeskObject[] = [
  {
    id: "laptop",
    label: "the laptop",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS"],
    note: "Where most of my hours live. Interfaces that feel inevitable, typed end to end.",
    x: "34%", y: "12%", w: "30%", r: -2,
    svg: (
      <svg viewBox="0 0 200 130">
        <rect x="30" y="10" width="140" height="88" rx="6" fill="#F4EEE5" stroke="#232323" strokeWidth="2.4" />
        <rect x="40" y="20" width="120" height="68" rx="3" fill="#EFE7DB" />
        <path d="M58 44 l-12 12 l12 12 M84 44 l12 12 l-12 12 M76 38 l-8 42" {...S} stroke="#C4A484" />
        <path d="M110 42 h40 M110 56 h40 M110 70 h28" {...S} stroke="#6E675F" strokeWidth="2" />
        <path d="M14 98 h172 l-10 16 h-152 z" fill="#EFE7DB" stroke="#232323" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: "notebook",
    label: "the notebook",
    skills: ["Java", "Data Structures", "Algorithms", "Problem Solving"],
    note: "Graph paper and patience. Every hard problem gets drawn before it gets typed.",
    x: "6%", y: "34%", w: "22%", r: 4,
    svg: (
      <svg viewBox="0 0 160 120">
        <rect x="20" y="10" width="120" height="100" rx="4" fill="#F4EEE5" stroke="#232323" strokeWidth="2.4" />
        <path d="M36 10 v100" {...S} stroke="#D9A7B5" strokeWidth="1.6" />
        <path d="M48 34 h76 M48 52 h76 M48 70 h58 M48 88 h66" {...S} stroke="#6E675F" strokeWidth="1.6" />
        <circle cx="104" cy="66" r="16" {...S} stroke="#A8B6A0" />
        <path d="M104 50 v-8 M104 82 v8 M88 66 h-8 M120 66 h8" {...S} stroke="#A8B6A0" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "mug",
    label: "the coffee mug",
    skills: ["Late-night debugging", "Stubborn optimism", "Root-cause hunting"],
    note: "Still warm. The bug is never where you think it is, and the third coffee knows it.",
    x: "70%", y: "38%", w: "13%", r: 0,
    svg: (
      <svg viewBox="0 0 110 110">
        <ellipse cx="50" cy="96" rx="34" ry="8" fill="#C4A484" opacity="0.25" />
        <path d="M22 40 h56 v40 a14 14 0 0 1 -14 14 h-28 a14 14 0 0 1 -14 -14 z" fill="#F4EEE5" stroke="#232323" strokeWidth="2.4" />
        <path d="M78 48 h8 a10 10 0 0 1 0 22 h-8" {...S} />
        <ellipse cx="50" cy="40" rx="28" ry="7" fill="#C4A484" opacity="0.5" stroke="#232323" strokeWidth="2.4" />
        <path d="M40 26 q 4 -8 0 -14 M56 28 q 4 -8 0 -14" {...S} stroke="#6E675F" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "plant",
    label: "the plant",
    skills: ["Continuous learning", "AI & LLMs", "MCP", "Cloud"],
    note: "Grows a little every week, mostly toward whatever light is newest.",
    x: "86%", y: "8%", w: "13%", r: 0,
    svg: (
      <svg viewBox="0 0 110 140">
        <path d="M36 100 h38 l-5 32 h-28 z" fill="#D9A7B5" opacity="0.5" stroke="#232323" strokeWidth="2.4" />
        <path d="M55 100 v-34" {...S} />
        <path d="M55 78 q -24 -8 -26 -34 q 26 2 26 30 M55 66 q 24 -10 24 -36 q -26 4 -24 32 M55 88 q -14 -2 -18 -16 M55 88 q 16 -4 18 -18" {...S} stroke="#A8B6A0" />
      </svg>
    ),
  },
  {
    id: "mirror",
    label: "the mirror",
    skills: ["Leadership", "Design Head @ CodeStorm", "Mentoring", "Honest retros"],
    note: "Leadership starts here — you can't direct a team you haven't looked at honestly.",
    x: "2%", y: "4%", w: "15%", r: -3,
    svg: (
      <svg viewBox="0 0 110 150">
        <ellipse cx="55" cy="60" rx="40" ry="52" fill="#EFE7DB" stroke="#232323" strokeWidth="2.4" />
        <ellipse cx="55" cy="60" rx="30" ry="42" fill="#F8F5EF" stroke="#C4A484" strokeWidth="1.6" />
        <path d="M40 40 q 10 -12 24 -6" {...S} stroke="#C4A484" strokeWidth="1.8" />
        <path d="M45 112 l-10 30 h40 l-10 -30" {...S} />
      </svg>
    ),
  },
  {
    id: "camera",
    label: "the camera",
    skills: ["UI Design", "UX Thinking", "Figma", "Composition"],
    note: "Framing is everything. A screen is just a photograph the user lives inside.",
    x: "68%", y: "66%", w: "18%", r: 3,
    svg: (
      <svg viewBox="0 0 150 100">
        <rect x="12" y="26" width="126" height="62" rx="8" fill="#F4EEE5" stroke="#232323" strokeWidth="2.4" />
        <rect x="52" y="14" width="34" height="14" rx="3" fill="#EFE7DB" stroke="#232323" strokeWidth="2.4" />
        <circle cx="75" cy="57" r="20" fill="#EFE7DB" stroke="#232323" strokeWidth="2.4" />
        <circle cx="75" cy="57" r="11" fill="none" stroke="#C4A484" strokeWidth="2" />
        <circle cx="118" cy="40" r="4" fill="#D9A7B5" />
      </svg>
    ),
  },
  {
    id: "books",
    label: "the book stack",
    skills: ["Literature", "AI papers", "Problem solving", "Curiosity, generally"],
    note: "Fiction on top of attention-is-all-you-need. Both teach you about people.",
    x: "30%", y: "60%", w: "22%", r: 1,
    svg: (
      <svg viewBox="0 0 170 110">
        <rect x="20" y="74" width="130" height="22" rx="3" fill="#A8B6A0" opacity="0.6" stroke="#232323" strokeWidth="2.4" />
        <rect x="30" y="50" width="112" height="22" rx="3" fill="#D9A7B5" opacity="0.55" stroke="#232323" strokeWidth="2.4" />
        <rect x="26" y="26" width="100" height="22" rx="3" fill="#C4A484" opacity="0.5" stroke="#232323" strokeWidth="2.4" />
        <path d="M46 85 h78 M52 61 h68 M46 37 h60" {...S} stroke="#232323" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "tablet",
    label: "the tablet",
    skills: ["Three.js", "Creative coding", "SVG & Canvas", "Motion design"],
    note: "The sketchbook that runs shaders. Where the playful experiments live.",
    x: "10%", y: "66%", w: "17%", r: -4,
    svg: (
      <svg viewBox="0 0 130 100">
        <rect x="10" y="8" width="110" height="82" rx="8" fill="#F4EEE5" stroke="#232323" strokeWidth="2.4" />
        <path d="M30 62 q 14 -30 30 -12 t 32 -14" {...S} stroke="#D9A7B5" />
        <circle cx="42" cy="36" r="7" {...S} stroke="#A8B6A0" />
        <path d="M92 66 l14 -34" {...S} stroke="#C4A484" />
      </svg>
    ),
  },
];

export default function SkillsDesk() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<DeskObject | null>(null);

  return (
    <section ref={ref} id="skills" className="relative bg-paper paper-texture">
      <ChapterHeading number="05" title="The Desk" note="everything here means something" />

      <div className="mx-auto max-w-6xl px-6 pb-36">
        <p data-reveal className="max-w-xl text-warmgray leading-relaxed -mt-6 mb-10">
          No progress bars, no percentages. Just a desk, and the objects a person collects when
          they love what they do. <span className="font-hand text-xl text-champagne">pick something up.</span>
        </p>

        {/* the desk */}
        <div
          data-reveal
          className="relative w-full aspect-16/10 md:aspect-2/1 rounded-sm overflow-visible"
          style={{
            background: "linear-gradient(160deg, #EFE7DB 0%, #E8DED1 100%)",
            boxShadow: "inset 0 2px 24px rgba(35,35,35,0.08), 0 30px 60px -30px rgba(35,35,35,0.3)",
          }}
        >
          <div className="absolute inset-0 paper-texture pointer-events-none" />
          {OBJECTS.map((o) => (
            <motion.button
              key={o.id}
              onClick={() => setActive(active?.id === o.id ? null : o)}
              className="absolute cursor-pointer group"
              style={{ left: o.x, top: o.y, width: o.w, rotate: o.r }}
              whileHover={{ y: -8, rotate: 0, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              aria-label={`${o.label}: ${o.skills.join(", ")}`}
            >
              <div className="drop-shadow-[0_10px_10px_rgba(35,35,35,0.15)]">{o.svg}</div>
              <span className="pointer-events-none absolute left-1/2 -bottom-6 -translate-x-1/2 font-hand text-xl text-warmgray opacity-0 group-hover:opacity-100 transition-opacity duration-400 whitespace-nowrap">
                {o.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* examination card */}
        <div className="min-h-44 mt-14">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 26, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: -0.5 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="paper-card max-w-2xl mx-auto p-8 relative"
              >
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />
                <p className="text-[10px] tracking-[0.35em] uppercase text-warmgray">picked up · {active.label}</p>
                <p className="font-serif-display italic text-2xl text-ink mt-3">{active.note}</p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {active.skills.map((s) => (
                    <span key={s} className="px-4 py-1.5 border border-champagne/60 text-sm text-ink bg-linen/50">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center font-hand text-2xl text-warmgray/70 pt-10"
              >
                the desk is quiet. touch something.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
