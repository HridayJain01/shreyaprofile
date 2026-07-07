"use client";

import { useState } from "react";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

/* --------------------------- Intellimark journal --------------------------- */

function IntellimarkEntry() {
  const [page, setPage] = useState(0);

  const pages = [
    {
      label: "the entry",
      content: (
        <>
          <p className="font-hand text-3xl text-champagne">March 2025.</p>
          <p className="font-serif-display text-2xl md:text-3xl leading-snug text-ink mt-4">
            My first real engineering challenge.
          </p>
          <p className="text-warmgray leading-relaxed mt-6">
            Software Engineer Intern at <strong className="text-ink">Intellimark AI</strong>.
            Not a tutorial, not a demo — production code that real businesses depended on.
            The first week I mostly read. The second week I broke something small. By the
            second month I was shipping features I was proud of.
          </p>
          <p className="font-hand text-2xl text-ink mt-6 -rotate-1">
            note to past self: the codebase is not scary, it&apos;s just older than you thought.
          </p>
        </>
      ),
    },
    {
      label: "what I built",
      content: (
        <>
          <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray">shipped</p>
          <ul className="mt-4 space-y-4">
            {[
              ["Dashboard modules", "React + TypeScript views for AI-driven brand analytics."],
              ["Data pipelines glue", "Python services stitched to LLM outputs — with retries that actually retry."],
              ["Design polish pass", "Spacing, motion, empty states. Small details, big trust."],
            ].map(([title, body]) => (
              <li key={title} className="border-l-2 border-sage pl-4">
                <p className="font-serif-display text-xl text-ink">{title}</p>
                <p className="text-sm text-warmgray mt-1">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 paper-card p-4 font-mono text-[12px] text-ink/80 rounded-sm">
            <span className="text-sage">+ 41 commits</span> · <span className="text-blush">− 3 regressions caught in review</span>
            <br />
            <span className="text-warmgray"># lesson: reviews are a gift wrapped in red ink</span>
          </div>
        </>
      ),
    },
    {
      label: "what I'd improve",
      content: (
        <>
          <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray">with today&apos;s eyes</p>
          <div className="mt-4 space-y-5">
            <div>
              <p className="font-hand text-2xl text-ink">then: shipped fast, tested after.</p>
              <p className="font-hand text-2xl text-sage">now: tests are the design tool.</p>
            </div>
            <div>
              <p className="font-hand text-2xl text-ink">then: asked questions late.</p>
              <p className="font-hand text-2xl text-sage">now: ask embarrassingly early.</p>
            </div>
            <div>
              <p className="font-hand text-2xl text-ink">then: state scattered everywhere.</p>
              <p className="font-hand text-2xl text-sage">now: one source of truth, always.</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div data-reveal className="relative mx-auto max-w-3xl">
      <div className="paper-card notebook-lines p-8 md:p-12 min-h-[30rem] relative rotate-[0.4deg]">
        <span className="tape -top-3 left-12 -rotate-3" />
        <span className="tape -top-3 right-12 rotate-2" />
        <div className="absolute top-0 bottom-0 left-8 w-px bg-blush/40 hidden md:block" />
        <div className="md:pl-8">{pages[page].content}</div>

        <div className="absolute bottom-6 right-8 flex gap-2">
          {pages.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPage(i)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-400 cursor-pointer ${
                page === i
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/25 text-warmgray hover:border-ink/60"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="coffee-stain w-16 h-16 -top-6 -right-4 rotate-45" />
    </div>
  );
}

/* ---------------------------- Etcetera postcards ---------------------------- */

function EtceteraPostcards() {
  const cards = [
    {
      front: "✈ Frontend Developer & Designer",
      back: "Built the customer-facing site — destination pages, booking flows, and a design language warm enough to sell a holiday.",
      stamp: "ETC",
      r: "-2deg",
    },
    {
      front: "🗺 Maps that unfold",
      back: "Interactive itineraries: each trip a story told day by day, pinned to a map that felt hand-drawn.",
      stamp: "GOA",
      r: "1.5deg",
    },
    {
      front: "📱 The phone prototype",
      back: "Mobile-first mockups pinned to the wall until every tap felt inevitable. The founders' favourite artefact.",
      stamp: "BALI",
      r: "-1deg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
      {cards.map((c, i) => (
        <div key={c.stamp} data-reveal data-reveal-delay={String(i * 0.12)} className="group [perspective:1200px]">
          <div
            className="relative h-56 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            style={{ rotate: c.r }}
          >
            {/* front */}
            <div className="absolute inset-0 paper-card p-6 [backface-visibility:hidden] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <p className="font-serif-display italic text-xl text-ink max-w-[70%]">{c.front}</p>
                <div className="w-14 h-16 border-2 border-dashed border-champagne/70 flex items-center justify-center rotate-3 bg-linen">
                  <span className="font-hand text-lg text-champagne">{c.stamp}</span>
                </div>
              </div>
              <p className="font-hand text-xl text-warmgray">flip me over →</p>
            </div>
            {/* back */}
            <div className="absolute inset-0 paper-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="h-full border-l border-ink/15 pl-5 flex flex-col justify-between">
                <p className="text-sm text-warmgray leading-relaxed">{c.back}</p>
                <p className="font-hand text-xl text-champagne">with love, from the design desk</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Chapter --------------------------------- */

export default function Experience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="experience" className="relative bg-linen paper-texture">
      <ChapterHeading number="04" title="Field Notes" note="internships, as I lived them" />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <IntellimarkEntry />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-32">
        <div data-reveal className="flex items-baseline gap-6 mt-10">
          <h3 className="font-serif-display text-3xl md:text-4xl text-ink-deep">Etcetera Holidays</h3>
          <span className="font-hand text-2xl text-champagne">postcards from the job</span>
        </div>
        <EtceteraPostcards />
      </div>
    </section>
  );
}
