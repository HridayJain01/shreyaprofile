"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

/* ------------------------------- stickers ------------------------------- */

const H = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const STICKERS: Record<string, React.ReactNode> = {
  books: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="22" y="78" width="76" height="16" rx="3" fill="#D9A7B5" stroke="#232323" strokeWidth="2.4" />
      <rect x="28" y="62" width="64" height="16" rx="3" fill="#EFD9DF" stroke="#232323" strokeWidth="2.4" />
      <rect x="25" y="46" width="70" height="16" rx="3" fill="#C4A484" opacity="0.85" stroke="#232323" strokeWidth="2.4" />
      {/* sleeping cat on top */}
      <path d="M42 46 q 2 -12 16 -12 q 16 0 18 10 q 8 -2 8 4 l -6 -1" {...H} stroke="#232323" strokeWidth="2.4" />
      <path d="M46 36 l -2 -6 l 6 3 M60 33 l 1 -6 l 4 5" {...H} stroke="#232323" strokeWidth="2.2" />
      <path d="M52 40 q 3 2 6 0" {...H} stroke="#232323" strokeWidth="1.8" />
      <path d="M100 30 q 4 -4 8 0 q 4 4 0 7 l -8 6 l -8 -6 q -4 -3 0 -7 q 4 -4 8 0" fill="#D9A7B5" opacity="0.7" />
    </svg>
  ),
  movies: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="22" y="48" width="76" height="46" rx="4" fill="#FDFCF8" stroke="#232323" strokeWidth="2.4" />
      <path d="M22 48 l 8 -18 h 68 l -8 18 z" fill="#EFD9DF" stroke="#232323" strokeWidth="2.4" />
      <path d="M36 30 l -6 15 M52 30 l -6 15 M68 30 l -6 15 M84 30 l -6 15" stroke="#232323" strokeWidth="2.2" />
      <path d="M56 66 q 4 -5 8 0 q 4 -5 8 0 q 3 5 -8 12 q -11 -7 -8 -12" fill="#D9A7B5" />
      <text x="60" y="88" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#232323">MOVIES</text>
    </svg>
  ),
  hope: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <text x="60" y="52" textAnchor="middle" fontSize="15" fill="#A8B6A0" fontStyle="italic" className="font-hand">to live for the</text>
      <text x="60" y="74" textAnchor="middle" fontSize="15" fill="#A8B6A0" fontStyle="italic" className="font-hand">hope of it all</text>
      <path d="M30 84 q 30 10 60 0" {...H} stroke="#D9A7B5" strokeWidth="2" />
    </svg>
  ),
  engineer: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="34" fill="#EFD9DF" stroke="#232323" strokeWidth="2.4" />
      <circle cx="60" cy="60" r="26" fill="none" stroke="#D9A7B5" strokeWidth="2" strokeDasharray="4 4" />
      <text x="60" y="65" textAnchor="middle" fontSize="14" fill="#232323" fontStyle="italic" className="font-hand">engineer ✦</text>
      <path d="M24 30 l 3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#D9A7B5" />
      <path d="M96 78 l 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="#C4A484" />
    </svg>
  ),
  diva: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="16" y="42" width="88" height="36" rx="6" fill="#FDFCF8" stroke="#232323" strokeWidth="2.4" />
      <text x="60" y="67" textAnchor="middle" fontSize="20" fontFamily="monospace" fill="#D9A7B5" fontWeight="bold">&lt;div&gt;a</text>
    </svg>
  ),
  gitgirl: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="18" y="28" width="84" height="64" rx="6" fill="#FDFCF8" stroke="#232323" strokeWidth="2.4" transform="rotate(-3 60 60)" />
      <text x="32" y="48" fontSize="11" fontFamily="monospace" fill="#232323" transform="rotate(-3 60 60)">&gt; dream it</text>
      <text x="32" y="63" fontSize="11" fontFamily="monospace" fill="#232323" transform="rotate(-3 60 60)">&gt; code it</text>
      <rect x="27" y="68" width="66" height="16" fill="#D9A7B5" transform="rotate(-3 60 60)" />
      <text x="32" y="80" fontSize="11" fontFamily="monospace" fill="#181818" fontWeight="bold" transform="rotate(-3 60 60)">&gt; git it girl</text>
    </svg>
  ),
  club: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="60" r="36" fill="#F7E3E7" stroke="#232323" strokeWidth="2.4" />
      <path id="clubArc" d="M60 32 a 28 28 0 1 1 -0.1 0" fill="none" />
      <text fontSize="9" letterSpacing="3" fill="#232323">
        <textPath href="#clubArc">GIRLS · WHO · CODE · CLUB ·</textPath>
      </text>
      <rect x="44" y="52" width="14" height="10" rx="1.5" fill="none" stroke="#232323" strokeWidth="2" />
      <rect x="62" y="52" width="14" height="10" rx="1.5" fill="none" stroke="#232323" strokeWidth="2" />
      <path d="M51 62 v 5 h 18 v -5 M46 70 h 28" {...H} stroke="#232323" strokeWidth="2" />
      <path d="M60 78 q 2 -3 4 0 q 2 3 -4 6 q -6 -3 -4 -6 q 2 -3 4 0" fill="#D9A7B5" />
    </svg>
  ),
  loading: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <rect x="20" y="44" width="80" height="14" fill="#C9B8E8" stroke="#232323" strokeWidth="2" />
      <text x="26" y="55" fontSize="10" fontFamily="monospace" fill="#181818">LOADING…</text>
      <rect x="20" y="62" width="80" height="16" fill="none" stroke="#232323" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={24 + i * 12} y="66" width="8" height="8" fill="#B49FD9" />
      ))}
    </svg>
  ),
  croissant: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <text x="60" y="46" textAnchor="middle" fontSize="15" fill="#232323" fontStyle="italic" className="font-hand">un croissant</text>
      <text x="60" y="66" textAnchor="middle" fontSize="15" fill="#232323" fontStyle="italic" className="font-hand">s&apos;il vous plaît</text>
      <path d="M44 86 q -10 -2 -8 -8 q 3 -6 12 -2 q 4 -8 12 -8 q 8 0 12 8 q 9 -4 12 2 q 2 6 -8 8 q -16 6 -32 0"
        fill="#E8C89A" stroke="#232323" strokeWidth="2" />
      <path d="M52 78 q 8 6 16 0" {...H} stroke="#232323" strokeWidth="1.6" />
    </svg>
  ),
  oops: (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <path d="M60 22 q 14 -6 22 4 q 14 0 14 14 q 10 8 2 18 q 4 12 -8 16 q -2 12 -16 10 q -8 10 -18 4 q -14 4 -18 -8 q -12 -2 -10 -14 q -8 -10 2 -18 q -2 -14 12 -16 q 6 -12 18 -10"
        fill="#3D3548" stroke="#232323" strokeWidth="2" />
      <text x="60" y="54" textAnchor="middle" fontSize="17" fill="#F8F5EF" fontWeight="bold" fontStyle="italic">OOPS!</text>
      <text x="60" y="70" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#D9C9F0">I STARTED A</text>
      <text x="60" y="81" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#D9C9F0">NEW HOBBY</text>
    </svg>
  ),
};

/* ------------------------------ the ten things ------------------------------ */

type Thing = {
  sticker: string;
  text: string;
  x: number;
  y: number;
  r: number;
  bg: string;
  cap: "left" | "right" | "below";
};

const THINGS: Thing[] = [
  { sticker: "books", text: "I read like I breathe — fast, emotional, and endlessly hopeful.", x: 38, y: 12, r: -3, bg: "#FDFCF8", cap: "left" },
  { sticker: "movies", text: "I treat my life like a rom-com montage.", x: 62, y: 12, r: 2, bg: "#FDFCF8", cap: "right" },
  { sticker: "hope", text: "I have a Pinterest account that's practically a museum of my personality.", x: 76, y: 30, r: 3, bg: "#F9F9F7", cap: "right" },
  { sticker: "engineer", text: "I do DSA for fun (and survival).", x: 81, y: 55, r: -2, bg: "#FDFCF8", cap: "right" },
  { sticker: "diva", text: "Java is my go-to for DSA — we click.", x: 76, y: 80, r: 2, bg: "#F4F2EE", cap: "right" },
  { sticker: "gitgirl", text: "I build full-stack projects that look soft, load fast, and don't break (usually).", x: 62, y: 90, r: -2, bg: "#F4F2EE", cap: "below" },
  { sticker: "club", text: "LeetCode is where I practice patience more than perfection.", x: 38, y: 90, r: 3, bg: "#FBEEF0", cap: "below" },
  { sticker: "loading", text: "I'm learning AI one curious experiment at a time.", x: 24, y: 80, r: -3, bg: "#F6EBFA", cap: "left" },
  { sticker: "croissant", text: "I'm learning French because life sounds prettier in soft accents.", x: 19, y: 55, r: 2, bg: "#FDFCF8", cap: "left" },
  { sticker: "oops", text: "I fall in and out of hobbies like it's character development — crocheting in January, painting in March, journalling in June.", x: 24, y: 30, r: -2, bg: "#FDFCF8", cap: "left" },
];

const CAPTION_POS: Record<Thing["cap"], string> = {
  left: "absolute right-full top-1/2 -translate-y-1/2 mr-3 w-36 lg:w-44 text-right",
  right: "absolute left-full top-1/2 -translate-y-1/2 ml-3 w-36 lg:w-44 text-left",
  below: "mt-3 text-center",
};

function Envelope({ open }: { open: boolean }) {
  return (
    <div className="relative w-36 h-28 md:w-44 md:h-32" style={{ perspective: 600 }}>
      {/* body */}
      <div className="absolute inset-0 top-6 bg-[#FDFCF8] border-2 border-ink/80 rounded-sm shadow-[0_18px_40px_-14px_rgba(35,35,35,0.35)]" />
      {/* flap */}
      <motion.div
        className="absolute left-0 right-0 top-6 origin-top"
        animate={{ rotateX: open ? 170 : 0 }}
        transition={{ duration: 0.9, ease: [0.6, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", zIndex: open ? 0 : 3 }}
      >
        <svg viewBox="0 0 176 70" className="w-full">
          <path d="M2 2 L88 66 L174 2 Z" fill="#F4EEE5" stroke="#232323" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </motion.div>
      {/* pocket lines */}
      <svg viewBox="0 0 176 104" className="absolute inset-0 top-6 w-full pointer-events-none">
        <path d="M2 102 L88 44 L174 102" fill="none" stroke="#232323" strokeWidth="2" strokeLinejoin="round" opacity="0.55" />
      </svg>
      {/* wax seal */}
      <motion.div
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-blush border-2 border-[#c08a99] flex items-center justify-center z-4"
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-[#7d4b58] text-sm">♡</span>
      </motion.div>
    </div>
  );
}

export default function TenThings() {
  const ref = useReveal<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-25% 0px" });
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(t);
    }
  }, [inView]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={ref} id="ten-things" className="relative bg-ivory paper-texture overflow-hidden">
      <ChapterHeading number="02" title="10 Things About Me" note="straight from the envelope" />

      <div className="mx-auto max-w-6xl px-6 pb-32">
        <p data-reveal className="max-w-xl text-warmgray leading-relaxed -mt-6 mb-4">
          The resume never mentions any of this. So I sealed it in an envelope instead —
          <span className="font-hand text-xl text-champagne"> click it anytime to reseal &amp; reopen.</span>
        </p>

        {/* desktop / tablet: the envelope ring */}
        <div ref={stageRef} className="relative hidden md:block w-full aspect-16/11 lg:aspect-16/10">
          {/* envelope */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            aria-label={open ? "Close the envelope" : "Open the envelope"}
          >
            <motion.div
              animate={open ? { y: [0, 4, 0] } : { y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Envelope open={open} />
            </motion.div>
          </button>

          {/* the ten stickers */}
          {THINGS.map((t, i) => {
            const dx = (50 - t.x) / 100 * size.w;
            const dy = (50 - t.y) / 100 * size.h;
            return (
              <div
                key={t.sticker}
                className="absolute w-[13%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                <motion.div
                  className="relative"
                  initial={false}
                  animate={
                    open
                      ? { x: 0, y: 0, scale: 1, opacity: 1 }
                      : { x: dx, y: dy, scale: 0.1, opacity: 0 }
                  }
                  transition={{
                    duration: 0.95,
                    delay: open ? 0.55 + i * 0.14 : (THINGS.length - i) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className="sticky-note aspect-square p-2"
                    style={{ background: t.bg, transform: `rotate(${t.r}deg)` }}
                  >
                    {STICKERS[t.sticker]}
                  </div>
                  <motion.p
                    className={`text-[13px] leading-snug text-ink/85 ${CAPTION_POS[t.cap]}`}
                    initial={false}
                    animate={{ opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: open ? 0.9 + i * 0.14 : 0 }}
                  >
                    {t.text}
                  </motion.p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* mobile: envelope on top, stickers stack in */}
        <div className="md:hidden">
          <div className="flex justify-center py-8">
            <button onClick={() => setOpen((o) => !o)} aria-label="Open the envelope" className="cursor-pointer">
              <Envelope open />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8">
            {THINGS.map((t, i) => (
              <div key={t.sticker} data-reveal data-reveal-delay={String((i % 2) * 0.1)}>
                <div className="sticky-note aspect-square p-2 max-w-40 mx-auto" style={{ background: t.bg, transform: `rotate(${t.r}deg)` }}>
                  {STICKERS[t.sticker]}
                </div>
                <p className="mt-3 text-[13px] leading-snug text-ink/85 text-center">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
