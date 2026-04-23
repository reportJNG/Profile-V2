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
      className="game-mode-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -22 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="game-mode-heading__text">Game Mode Select</span>
      <span aria-hidden="true" className="game-mode-heading__echo">
        {mode.kicker}
      </span>
    </motion.div>
  );
}
