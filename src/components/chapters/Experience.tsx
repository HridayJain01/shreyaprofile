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
            The first time my code belonged to something bigger than me.
          </p>
          <p className="text-warmgray leading-relaxed mt-6">
            I joined <strong className="text-ink">Intellimark AI</strong> as a Web Developer
            Intern, where every feature mattered because someone, somewhere, was actually using
            it. Suddenly, software wasn&apos;t assignments or personal projects anymore — it was
            collaboration, production systems, deadlines, and responsibility.
          </p>
          <p className="text-warmgray leading-relaxed mt-4">
            I learned that engineering isn&apos;t about knowing everything. It&apos;s about being
            curious enough to understand what you don&apos;t.
          </p>
          <p className="font-hand text-2xl text-ink mt-6 -rotate-1">
            note to past self: you&apos;ll stop feeling like an outsider sooner than you think.
          </p>
        </>
      ),
    },
    {
      label: "what I built",
      content: (
        <>
          <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray">shipped, for real users</p>
          <ul className="mt-4 space-y-4">
            {[
              ["Four dashboards", "Analytics views a team opened every single morning."],
              ["The HR tool", "Application sifting against job descriptions — the seed of project No. 3."],
              ["Census planning tool", "Planning drilled down to every level, all the way to individual SKUs."],
              ["Chemical dashboard", "Managing the sales team and every product they sold."],
              ["The company website", "Intellimark's own site — designed and built entirely by me."],
            ].map(([title, body]) => (
              <li key={title} className="border-l-2 border-sage pl-4">
                <p className="font-serif-display text-xl text-ink">{title}</p>
                <p className="text-sm text-warmgray mt-1">{body}</p>
              </li>
            ))}
          </ul>
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
              <p className="font-hand text-2xl text-ink">then: I wanted to write more code.</p>
              <p className="font-hand text-2xl text-sage">now: I spend more time understanding the problem.</p>
            </div>
            <div>
              <p className="font-hand text-2xl text-ink">then: I thought the smartest engineer knew every answer.</p>
              <p className="font-hand text-2xl text-sage">now: the best engineers ask better questions.</p>
            </div>
            <div>
              <p className="font-hand text-2xl text-ink">then: I celebrated features shipped.</p>
              <p className="font-hand text-2xl text-sage">now: I celebrate code that still makes sense months later.</p>
            </div>
            <div>
              <p className="font-hand text-2xl text-ink">then: I built projects.</p>
              <p className="font-hand text-2xl text-sage">now: I think in products.</p>
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
        <div className="md:pl-8 pb-14">{pages[page].content}</div>

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

/* ------------------------------ Kalptaru Academy ------------------------------ */

function LipstickStory() {
  return (
    <div data-reveal className="relative max-w-2xl">
      <div className="paper-card notebook-lines p-8 md:p-10 -rotate-[0.6deg] relative">
        <span className="tape -top-3 left-10 -rotate-2" />
        <p className="text-[10px] tracking-[0.35em] uppercase text-warmgray">
          how I got the job · a true story
        </p>
        <p className="font-serif-display text-2xl md:text-3xl leading-snug text-ink mt-4">
          I wasn&apos;t looking for an internship. I was buying lipstick.
        </p>
        <div className="text-warmgray leading-relaxed mt-5 space-y-4">
          <p>
            Not at a career fair. Not on LinkedIn. I struck up a conversation with the girl
            standing in front of me at a Tira event, and we spent the next fifteen minutes
            talking about beauty products.
          </p>
          <p>
            Just before we parted ways, I asked, <em className="text-ink">&ldquo;So… what do you
            do?&rdquo;</em> She ran three businesses. I smiled and said, <em className="text-ink">
            &ldquo;I build websites. If you ever need one, I&apos;d love to help.&rdquo;</em>
          </p>
          <p>
            <em className="text-ink">&ldquo;Reach out in a month.&rdquo;</em> I was convinced it
            was a polite way of saying no. A month later, I sent the message anyway.
            She remembered me.
          </p>
        </div>
        <p className="font-hand text-2xl text-blush mt-6">
          I didn&apos;t just find an opportunity. I found a role model.
        </p>
      </div>
      <div className="coffee-stain w-14 h-14 -bottom-6 left-8" />
    </div>
  );
}

function KalptaruPostcards() {
  const cards = [
    {
      front: "💍 The jewellery academy site",
      back: "A website to book diamond-jewellery courses — essentially e-commerce, designed and built end to end by exactly one person: me.",
      stamp: "KLPT",
      r: "-2deg",
    },
    {
      front: "😰 Built alone (which was scary)",
      back: "I doubted myself before taking the opportunity. Every decision — stack, design, payments, deploy — was mine. It ended up working perfectly.",
      stamp: "SOLO",
      r: "1.5deg",
    },
    {
      front: "🎤 Beyond the code",
      back: "A second site for her skincare brand, plus attending and hosting events alongside her. Some internships teach the job; this one taught the person.",
      stamp: "HOST",
      r: "-1deg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
                <p className="font-hand text-xl text-champagne">with love, from the founder&apos;s desk</p>
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
      <ChapterHeading number="05" title="Field Notes" note="internships, as I lived them" />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <IntellimarkEntry />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-32">
        <div data-reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-1 mt-10 mb-10">
          <h3 className="font-serif-display text-3xl md:text-4xl text-ink-deep">Kalptaru Academy</h3>
          <span className="font-hand text-2xl text-champagne">postcards from before the job</span>
        </div>
        <LipstickStory />
        <KalptaruPostcards />
      </div>
    </section>
  );
}
