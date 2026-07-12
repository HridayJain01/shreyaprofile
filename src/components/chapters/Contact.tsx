"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

type Stage = "writing" | "folding" | "flying" | "sent";

function PaperPlane() {
  return (
    <svg width="90" height="60" viewBox="0 0 90 60">
      <path d="M2 30 L86 4 L58 56 L44 36 Z" fill="#FDFCF8" stroke="#232323" strokeWidth="2" strokeLinejoin="round" />
      <path d="M86 4 L44 36 L46 52" fill="none" stroke="#232323" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 30 L44 36" fill="none" stroke="#6E675F" strokeWidth="1.4" />
    </svg>
  );
}

function Window() {
  return (
    <div className="relative w-full h-full rounded-t-full overflow-hidden border-8 border-[#8a7a66] shadow-[inset_0_0_30px_rgba(35,35,35,0.2)]">
      {/* sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#cfdce4 0%,#e9e2d4 70%,#efe7db 100%)" }} />
      {/* clouds */}
      <motion.div
        className="absolute top-[18%] left-0 w-full"
        animate={{ x: ["-20%", "110%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        <svg width="120" height="40" viewBox="0 0 120 40">
          <path d="M10 30 q 4 -14 20 -12 q 6 -12 22 -8 q 16 -4 20 8 q 16 0 14 12 z" fill="#f8f5ef" opacity="0.9" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-[42%] left-0 w-full"
        animate={{ x: ["100%", "-30%"] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        <svg width="90" height="30" viewBox="0 0 90 30">
          <path d="M8 24 q 3 -10 15 -9 q 5 -9 17 -6 q 12 -3 15 6 q 12 0 10 9 z" fill="#f8f5ef" opacity="0.75" />
        </svg>
      </motion.div>
      {/* sun */}
      <div className="absolute top-[12%] right-[16%] w-10 h-10 rounded-full bg-[#f0dcb4] blur-[1px]" />
      {/* frame bars */}
      <div className="absolute inset-x-0 top-1/2 h-2 bg-[#8a7a66]" />
      <div className="absolute inset-y-0 left-1/2 w-2 bg-[#8a7a66]" />
    </div>
  );
}

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [stage, setStage] = useState<Stage>("writing");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const send = () => {
    if (stage !== "writing") return;
    setStage("folding");
    setTimeout(() => setStage("flying"), 1400);
    setTimeout(() => setStage("sent"), 3600);
  };

  return (
    <section ref={ref} id="contact" className="relative bg-linen paper-texture overflow-hidden">
      <ChapterHeading number="10" title="Write to Me" note="the last page is yours" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 min-h-[36rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* the letter */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence>
              {(stage === "writing" || stage === "folding") && (
                <motion.div
                  key="letter"
                  className="relative paper-card notebook-lines p-8 md:p-10 origin-top"
                  animate={
                    stage === "folding"
                      ? { scaleY: [1, 0.55, 0.22, 0.1], rotateX: [0, 18, 32, 40], opacity: [1, 1, 1, 0] }
                      : {}
                  }
                  transition={{ duration: 1.35, times: [0, 0.4, 0.75, 1], ease: [0.6, 0, 0.2, 1] }}
                  exit={{ opacity: 0 }}
                >
                  <span className="tape -top-3 right-10 rotate-3" />
                  <p className="font-hand text-2xl text-warmgray">Dear Shreya,</p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="write anything — an idea, a role, a hello…"
                    rows={6}
                    className="w-full mt-4 bg-transparent resize-none outline-none font-hand text-2xl leading-9 text-ink placeholder:text-warmgray/50"
                  />
                  <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                    <div>
                      <p className="font-hand text-xl text-warmgray">yours,</p>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="your name"
                        className="bg-transparent outline-none font-hand text-2xl text-ink placeholder:text-warmgray/50 border-b border-warmgray/30 focus:border-champagne transition-colors"
                      />
                    </div>
                    <button
                      onClick={send}
                      disabled={stage !== "writing"}
                      className="px-8 py-3 text-xs tracking-[0.3em] uppercase bg-ink text-paper hover:bg-ink-deep transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Fold &amp; send ✈
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* the airplane */}
            <AnimatePresence>
              {stage === "flying" && (
                <motion.div
                  key="plane"
                  className="absolute left-8 top-24 z-20"
                  initial={{ x: 0, y: 0, rotate: 8, scale: 1, opacity: 1 }}
                  animate={{
                    x: [0, 180, 420, 640],
                    y: [0, -90, -30, -120],
                    rotate: [8, -6, 4, -10],
                    scale: [1, 0.9, 0.65, 0.3],
                    opacity: [1, 1, 1, 0],
                  }}
                  transition={{ duration: 2.1, ease: "easeInOut", times: [0, 0.35, 0.7, 1] }}
                >
                  <PaperPlane />
                </motion.div>
              )}
            </AnimatePresence>

            {stage === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="paper-card p-10 text-center"
              >
                <p className="font-serif-display text-3xl text-ink">Your letter is on its way.</p>
                <p className="font-hand text-2xl text-champagne mt-3">
                  {name ? `thank you, ${name} ♡` : "thank you ♡"} — I read everything.
                </p>
                <button
                  onClick={() => {
                    setStage("writing");
                    setMessage("");
                  }}
                  className="mt-6 text-xs tracking-[0.3em] uppercase text-warmgray hover:text-ink transition-colors cursor-pointer"
                >
                  write another →
                </button>
              </motion.div>
            )}
          </div>

          {/* the open window */}
          <div data-reveal className="lg:col-span-5 h-80 lg:h-96 relative">
            <Window />
            <p className="font-hand text-xl text-warmgray text-center mt-4">
              the window stays open. letters always find their way.
            </p>
          </div>
        </div>
      </div>

      {/* colophon */}
      <footer className="border-t border-ink/10 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-serif-display italic text-lg text-warmgray">
            Shreya Chawale — Mumbai, India
          </p>
          <p className="text-[10px] tracking-[0.35em] uppercase text-warmgray">
            set in Cormorant &amp; Manrope · printed on digital paper · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </section>
  );
}
