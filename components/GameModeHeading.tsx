"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LobbyMode } from "@/lib/lobby-modes";

type GameModeHeadingProps = {
  activeIndex: number;
  mode: LobbyMode;
  total: number;
};

export function GameModeHeading({
  activeIndex,
  mode,
  total,
}: GameModeHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="game-mode-heading"
      initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -22 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="game-mode-heading__slash" />
      <span className="game-mode-heading__text">Game Mode Select</span>
      <span className="game-mode-heading__count">
        {String(activeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className="game-mode-heading__echo">
        {mode.title}
      </span>
    </motion.div>
  );
}
