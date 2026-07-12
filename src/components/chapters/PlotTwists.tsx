"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

const TWISTS = [
  {
    n: "01",
    title: "Backstage with Shilpa Shetty",
    body: "Helped organize and host a Women's Day event alongside Shilpa Shetty.",
    note: "yes, that Shilpa Shetty",
    accent: "#D9A7B5",
    photo: "/photos/plot-twist-1.jpg",
    caption: "women's day · backstage",
  },
  {
    n: "02",
    title: "The Girl with Too Many Accents",
    body: "Won Miss Faisca by performing American, British, Irish, and French accents.",
    note: "the French one is my favourite, obviously",
    accent: "#C4A484",
    photo: "/photos/plot-twist-2.jpg",
    caption: "miss faisca · crowned",
  },
  {
    n: "03",
    title: "100,000 Reasons to Keep Posting",
    body: "Grew my Pinterest account to over 100K monthly views.",
    note: "a museum of my personality, remember?",
    accent: "#A8B6A0",
    photo: "/photos/plot-twist-3.jpg",
    caption: "pinterest · 100k views",
  },
  {
    n: "04",
    title: "A Microphone Instead of a Keyboard",
    body: "Hosted a Roka ceremony as the event anchor.",
    note: "software engineers can hold a room too",
    accent: "#D9A7B5",
    photo: "/photos/plot-twist-4.jpg",
    caption: "roka · on the mic",
  },
  {
    n: "05",
    title: "Conversations That Stayed",
    body: "Organized the TSEC Alumni Meet and spent the evening talking to founders, leaders, and alumni whose journeys inspired me.",
    note: "still thinking about some of those talks",
    accent: "#C4A484",
    photo: "/photos/plot-twist-5.jpg",
    caption: "alumni meet · evening",
  },
  {
    n: "06",
    title: "The Camera Doesn't Scare Me",
    body: "Modeling has always been on my bucket list. Now I'm just waiting for someone to say, “Let's shoot.”",
    note: "manifesting ✨",
    accent: "#A8B6A0",
    photo: "/photos/plot-twist-6.jpg",
    caption: "someday · golden hour",
  },
];

function PhotoOrPlaceholder({ src, accent }: { src: string; accent: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full aspect-4/5 bg-linen flex flex-col items-center justify-center gap-3">
        <svg width="64" height="48" viewBox="0 0 64 48">
          <rect x="4" y="10" width="56" height="34" rx="4" fill="none" stroke="#6E675F" strokeWidth="2" />
          <rect x="22" y="4" width="20" height="8" rx="2" fill="none" stroke="#6E675F" strokeWidth="2" />
          <circle cx="32" cy="27" r="10" fill="none" stroke={accent} strokeWidth="2" />
          <circle cx="32" cy="27" r="4.5" fill="none" stroke={accent} strokeWidth="1.6" />
          <circle cx="52" cy="17" r="2" fill={accent} />
        </svg>
        <p className="font-hand text-xl text-warmgray text-center px-4 leading-snug">
          my photo goes here ♡
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="w-full aspect-4/5 object-cover"
      style={{ filter: "saturate(0.88) contrast(0.98)" }}
      loading="lazy"
    />
  );
}

function TwistPolaroid({ t, i }: { t: (typeof TWISTS)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const rotate = i % 3 === 0 ? -2 : i % 3 === 1 ? 1.5 : -0.5;

  return (
    <div data-reveal data-reveal-delay={String((i % 3) * 0.12)}>
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        className="block w-full text-left cursor-pointer [perspective:1400px] group"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        aria-label={`${t.title} — flip for the story`}
      >
        <motion.div
          className="relative [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0, rotate }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* front — the polaroid */}
          <div className="polaroid [backface-visibility:hidden]" style={{ padding: "12px 12px 16px" }}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2" style={{ transform: `rotate(${rotate * -1.5}deg)` }} />
            <PhotoOrPlaceholder src={t.photo} accent={t.accent} />
            <div className="flex items-baseline justify-between mt-3 px-1">
              <span className="font-serif-display italic text-3xl" style={{ color: t.accent }}>{t.n}</span>
              <span className="font-hand text-xl text-ink">{t.caption}</span>
            </div>
            <p className="font-serif-display text-xl text-ink-deep leading-tight px-1 mt-1">{t.title}</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray/80 px-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              tap for the story →
            </p>
          </div>

          {/* back — the story */}
          <div className="absolute inset-0 paper-card notebook-lines p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col">
            <span className="font-serif-display italic text-4xl" style={{ color: t.accent, opacity: 0.75 }}>{t.n}</span>
            <p className="font-serif-display text-2xl text-ink-deep leading-tight mt-2">{t.title}</p>
            <p className="text-warmgray leading-relaxed mt-3 text-[15px]">{t.body}</p>
            <p className="font-hand text-2xl mt-auto pt-3" style={{ color: t.accent }}>{t.note}</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray/70 mt-2">tap to turn back ←</p>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}

export default function PlotTwists() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="plot-twists" className="relative bg-linen paper-texture">
      <ChapterHeading number="09" title="The Plot Twists" note="things the resume won't tell you" />

      <div className="mx-auto max-w-6xl px-6 pb-36">
        <p data-reveal className="max-w-xl text-warmgray leading-relaxed -mt-6 mb-14">
          Every good editorial saves a few surprises for the back pages. Six photographs, six
          stories — <span className="font-hand text-xl text-champagne">tap a polaroid to turn it over.</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {TWISTS.map((t, i) => (
            <TwistPolaroid key={t.n} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
