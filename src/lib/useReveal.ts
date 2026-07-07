"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals every [data-reveal] descendant as it scrolls into view.
 * Optional attributes: data-reveal-y (px drift), data-reveal-delay (s).
 * Apply to plain wrappers — rotated objects should keep their rotation
 * on an inner element so GSAP's transform doesn't fight it.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: Number(item.dataset.revealY ?? 44) },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: Number(item.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: item, start: "top 88%" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
