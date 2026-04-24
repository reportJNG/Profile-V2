"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PortfolioSection } from "@/lib/portfolio-content";

type PortfolioHeadingProps = {
  section: PortfolioSection;
};

export function PortfolioHeading({ section }: PortfolioHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute left-4 top-4 z-30 inline-flex items-center px-5 py-2.5 text-3xl font-black italic leading-none text-[#fff8b8] drop-shadow-[0_0_14px_rgba(255,245,160,0.55)] [background:linear-gradient(98deg,rgba(4,5,10,0.94),rgba(8,8,14,0.72)_58%,transparent_86%)] [clip-path:polygon(0_20%,7%_6%,32%_12%,53%_0,100%_16%,92%_50%,100%_84%,55%_78%,28%_94%,0_76%)] [font-family:var(--font-heading),Georgia,serif] [text-shadow:0_2px_0_rgba(54,31,8,0.85),0_0_18px_rgba(255,244,158,0.6),0_8px_18px_rgba(0,0,0,0.34)] sm:left-8 sm:top-6 sm:text-4xl lg:left-14 lg:top-8 lg:text-5xl"
      initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -22 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>Portfolio Select</span>
      <span aria-hidden="true" className="sr-only">
        {section.kicker}
      </span>
    </motion.div>
  );
}
