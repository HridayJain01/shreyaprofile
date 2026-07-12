"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReveal } from "@/lib/useReveal";

/** Minimal continuous-line portrait — monochrome, editorial. */
function LinePortrait() {
  return (
    <svg viewBox="0 0 300 380" className="w-full h-auto" role="img" aria-label="Line portrait of Shreya">
      <rect width="300" height="380" fill="#EFE7DB" />
      <path
        d="M150 62
           c -34 0 -56 26 -58 58 c -1.5 24 6 40 2 54 c -3 11 -12 18 -10 24 c 2 5 10 4 12 9
           c 2 6 -3 12 0 17 c 3 5 9 3 11 8 c 2 6 -2 14 4 18 c 8 6 24 4 34 4
           c -2 14 -4 28 -14 38 c -16 16 -46 18 -64 34 c -14 12 -18 34 -19 54 h 224
           c -1 -20 -5 -42 -19 -54 c -18 -16 -48 -18 -64 -34 c -10 -10 -12 -24 -14 -38
           c 18 -2 34 -12 42 -30 c 10 -22 8 -50 4 -74 c -5 -32 -30 -58 -71 -58 z"
        fill="none"
        stroke="#232323"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M118 148 q 10 -8 22 -2" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M162 146 q 10 -8 22 -2" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M148 158 q -2 14 -6 20 q 4 5 10 3" fill="none" stroke="#232323" strokeWidth="2" strokeLinecap="round" />
      <path d="M132 198 q 18 12 38 1" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M96 120 c -6 -34 24 -62 56 -60 c 30 2 52 22 54 52 c 1 18 -4 34 -2 52"
        fill="none" stroke="#232323" strokeWidth="2.4" strokeLinecap="round"
      />
      <circle cx="205" cy="300" r="26" fill="#D9A7B5" opacity="0.35" />
      <circle cx="88" cy="86" r="18" fill="#A8B6A0" opacity="0.3" />
    </svg>
  );
}

export default function WhoAmI() {
  const ref = useReveal<HTMLElement>();
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Cursor gently drifts the loose paper pieces.
  useEffect(() => {
    const zone = parallaxRef.current;
    if (!zone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pieces = zone.querySelectorAll<HTMLElement>("[data-drift]");
    const setters = Array.from(pieces).map((p) => ({
      x: gsap.quickTo(p, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(p, "y", { duration: 1.2, ease: "power3.out" }),
      depth: Number(p.dataset.drift || 1),
    }));

    const onMove = (e: MouseEvent) => {
      const r = zone.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setters.forEach((s) => {
        s.x(nx * 18 * s.depth);
        s.y(ny * 12 * s.depth);
      });
    };

    zone.addEventListener("mousemove", onMove);
    return () => zone.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={ref} id="who-am-i" className="relative min-h-screen paper-texture overflow-hidden">
      <div ref={parallaxRef} className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:pt-32">
        {/* masthead */}
        <div data-reveal className="flex items-end justify-between border-b-2 border-ink pb-4">
          <span className="text-[11px] tracking-[0.4em] uppercase text-warmgray">
            Chapter 01 · Who am I?
          </span>
          <span className="text-[11px] tracking-[0.4em] uppercase text-warmgray hidden sm:block">
            Mumbai, India — Vol. I
          </span>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* headline column */}
          <div className="lg:col-span-7 relative z-10">
            <h1
              data-reveal
              className="font-serif-display text-[16vw] lg:text-[9.5rem] leading-[0.9] font-medium tracking-tight text-ink-deep"
            >
              Shreya
              <br />
              <span className="italic font-light">Chawale</span>
            </h1>

            <p
              data-reveal
              data-reveal-delay="0.15"
              className="mt-10 max-w-md text-lg leading-relaxed text-warmgray"
            >
              A software engineer from Mumbai who finds inspiration in{" "}
              <em className="text-ink font-serif-display text-xl">books</em> as often as in{" "}
              <em className="text-ink font-serif-display text-xl">code</em>, believing both are
              meant to <em className="text-ink font-serif-display text-xl">move people</em>.
            </p>

            <div data-reveal data-reveal-delay="0.25" className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-warmgray">Education</div>
                <div className="font-serif-display text-xl mt-1">B.E. Information Technology, TSEC</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-warmgray">CGPA</div>
                <div className="font-serif-display text-xl mt-1">8.91</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-warmgray">Currently</div>
                <div className="font-serif-display text-xl mt-1">In my software engineer era.</div>
              </div>
            </div>

            {/* pull quote scrap */}
            <div data-reveal data-reveal-delay="0.35" className="relative mt-16 max-w-sm">
              <div data-drift="1.4" className="paper-card p-6 -rotate-1 relative">
                <span className="tape -top-3 left-8 -rotate-3" />
                <p className="font-serif-display italic text-2xl leading-snug text-ink">
                  &ldquo;Return to the work. Again. And again.&rdquo;
                </p>
                <p className="font-hand text-lg text-champagne mt-2">— a note to myself, always</p>
              </div>
            </div>
          </div>

          {/* portrait column */}
          <div className="lg:col-span-5 relative">
            <div data-reveal data-reveal-delay="0.2" className="relative max-w-sm mx-auto lg:mt-8">
              <div data-drift="0.8" className="polaroid rotate-2 relative">
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />
                <LinePortrait />
                <p className="font-hand text-2xl text-ink text-center mt-3">me, thinking in systems ✳</p>
              </div>

              {/* handwritten annotations */}
              <div data-drift="2" className="absolute -left-16 top-8 hidden md:block -rotate-6">
                <p className="font-hand text-2xl text-blush">warm, curious,</p>
                <p className="font-hand text-2xl text-blush">detail-obsessed →</p>
              </div>
              <div data-drift="1.6" className="absolute -right-8 -bottom-14 hidden md:block rotate-3">
                <p className="font-hand text-2xl text-sage">always building ·</p>
                <p className="font-hand text-2xl text-sage">always learning ·</p>
                <p className="font-hand text-2xl text-sage">always curious</p>
              </div>

              <div className="coffee-stain w-24 h-24 -bottom-20 -left-10 rotate-12" />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div data-reveal className="mt-28 flex items-center gap-4 text-warmgray">
          <span className="font-hand text-2xl">keep turning the pages</span>
          <svg width="60" height="24" viewBox="0 0 60 24" className="mt-1">
            <path d="M2 6 q 26 16 54 8 m -8 -6 l 8 6 l -10 4" fill="none" stroke="#C4A484" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
