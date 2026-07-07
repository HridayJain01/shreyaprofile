"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LINES = [
  { text: "Hi.", size: "text-4xl md:text-6xl" },
  { text: "I'm Shreya.", size: "text-4xl md:text-6xl" },
  { text: "Since you're here...", size: "text-xl md:text-4xl" },
  { text: "let me tell you my story.", size: "text-xl md:text-4xl" },
] as const;

const MS_PER_CHAR = 95;

function Pencil() {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" className="drop-shadow-sm">
      <g transform="rotate(-140 35 35) translate(20 30)">
        <rect x="8" y="2" width="34" height="10" rx="1.5" fill="#C4A484" />
        <rect x="8" y="2" width="34" height="3.4" rx="1.5" fill="#D9B99A" />
        <rect x="40" y="1" width="7" height="12" rx="2" fill="#D9A7B5" />
        <path d="M8 2 L0 7 L8 12 Z" fill="#EFE7DB" />
        <path d="M3.2 5 L0 7 L3.2 9 Z" fill="#232323" />
      </g>
    </svg>
  );
}

function WrittenLine({
  text,
  size,
  active,
  done,
  onDone,
}: {
  text: string;
  size: string;
  active: boolean;
  done: boolean;
  onDone: () => void;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  const duration = (text.length * MS_PER_CHAR) / 1000;

  useEffect(() => {
    if (textRef.current) setWidth(textRef.current.offsetWidth);
  }, []);

  if (!active && !done) return <div className={`${size} font-script leading-relaxed`}>&nbsp;</div>;

  return (
    <div className="relative">
      <motion.span
        ref={textRef}
        className={`font-script ${size} text-ink-deep inline-block leading-relaxed whitespace-nowrap`}
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        animate={{ clipPath: "inset(-20% 0% -20% 0)" }}
        transition={{ duration, ease: "linear" }}
        onAnimationComplete={onDone}
      >
        {text}
      </motion.span>
      {active && width > 0 && (
        <motion.div
          className="absolute -top-10 pointer-events-none"
          initial={{ x: -14 }}
          animate={{ x: width - 14, y: [0, 2.5, -1, 2, 0] }}
          transition={{
            x: { duration, ease: "linear" },
            y: { duration: 0.42, repeat: Math.ceil(duration / 0.42), ease: "easeInOut" },
          }}
        >
          <Pencil />
        </motion.div>
      )}
    </div>
  );
}

export default function Intro({
  onUnfold,
  onDone,
}: {
  onUnfold: () => void;
  onDone: () => void;
}) {
  const reduced = useReducedMotion();
  // -1: silence · 0..3: writing line n · 4: settle · 5: unfolding
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    if (reduced) {
      onUnfold();
      onDone();
      return;
    }
    const t = setTimeout(() => setPhase(0), 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (phase === 4) {
      const t = setTimeout(() => {
        setPhase(5);
        onUnfold();
      }, 1100);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const skip = () => {
    setPhase(5);
    onUnfold();
  };

  if (reduced) return null;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase < 5 && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] bg-paper paper-texture flex items-center justify-center"
          style={{ transformOrigin: "50% 0%", perspective: 1200 }}
          animate={phase === 4 ? { rotate: -0.6, y: -6 } : {}}
          exit={{
            rotateX: 74,
            y: "-30%",
            opacity: 0,
            transition: { duration: 1.5, ease: [0.6, 0, 0.15, 1] },
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* fold crease */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-ink/[0.04]" />
          <div className="flex flex-col gap-3 md:gap-4 px-8">
            {LINES.map((line, i) => (
              <WrittenLine
                key={line.text}
                text={line.text}
                size={line.size}
                active={phase === i}
                done={phase > i}
                onDone={() => phase === i && setPhase(i + 1)}
              />
            ))}
          </div>
          <button
            onClick={skip}
            className="absolute bottom-8 right-8 text-xs tracking-[0.3em] uppercase text-warmgray/70 hover:text-ink transition-colors cursor-pointer"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
