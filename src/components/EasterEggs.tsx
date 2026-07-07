"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export default function EasterEggs() {
  const [devNotes, setDevNotes] = useState(false);

  // Konami code → developer notes
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          setDevNotes(true);
          idx = 0;
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {devNotes && (
        <motion.div
          className="fixed inset-0 z-[300] bg-ink-deep/60 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDevNotes(false)}
        >
          <motion.div
            className="paper-card notebook-lines max-w-lg w-full p-8 relative -rotate-1"
            initial={{ y: 40, rotate: -3, opacity: 0 }}
            animate={{ y: 0, rotate: -1, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tape -top-3 left-1/2 -translate-x-1/2" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-warmgray">
              ↑↑↓↓←→←→BA · developer notes, unlocked
            </p>
            <div className="mt-4 space-y-3 font-hand text-2xl text-ink leading-snug">
              <p>· this whole site is paper, tape &amp; three fonts</p>
              <p>· the graph in ch. 03 runs real traversal orders</p>
              <p>· the thread on the wall draws as you scroll</p>
              <p>· future goal: software at the intersection of tech, fashion, beauty &amp; AI</p>
              <p>· secret dream: build it from a different city every season ✈</p>
            </div>
            <button
              onClick={() => setDevNotes(false)}
              className="mt-6 text-xs tracking-[0.3em] uppercase text-warmgray hover:text-ink transition-colors cursor-pointer"
            >
              close the notebook →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
