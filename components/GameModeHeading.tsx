"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PortfolioSection } from "@/lib/portfolio-content";

type SectionHeadingProps = {
  mode: PortfolioSection;
};

export function GameModeHeading({
  mode,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute left-4 top-4 z-30 inline-flex items-center px-5 py-2.5 text-3xl font-black italic leading-none text-[#fff8b8] drop-shadow-[0_0_14px_rgba(255,245,160,0.55)] sm:left-8 sm:top-6 sm:text-4xl lg:left-14 lg:top-8 lg:text-5xl"
      style={{
        background:
          "linear-gradient(98deg, rgba(4, 5, 10, 0.94), rgba(8, 8, 14, 0.72) 58%, transparent 86%)",
        clipPath:
          "polygon(0 20%, 7% 6%, 32% 12%, 53% 0, 100% 16%, 92% 50%, 100% 84%, 55% 78%, 28% 94%, 0 76%)",
        fontFamily:
          "var(--font-heading), Georgia, 'Palatino Linotype', 'Times New Roman', serif",
        textShadow:
          "0 2px 0 rgba(54, 31, 8, 0.85), 0 0 18px rgba(255, 244, 158, 0.6), 0 8px 18px rgba(0, 0, 0, 0.34)",
      }}
      initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -22 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>Game Mode Select</span>
      <span aria-hidden="true" className="sr-only">
        {mode.kicker}
      </span>
    </motion.div>
  );
}
