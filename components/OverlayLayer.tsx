"use client";

import { motion } from "motion/react";
import { lobbyBackgroundTransition } from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type Direction = 1 | -1;

type OverlayLayerProps = {
  direction: Direction;
  mode: PortfolioSection;
};

export function OverlayLayer({ direction, mode }: OverlayLayerProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="overlay-layer pointer-events-none absolute inset-0 z-[4] overflow-hidden"
    >
      <div className="overlay-vignette absolute inset-0" />
      <div className="overlay-bottom absolute inset-x-0 bottom-0 h-[42%]" />
      <div className="overlay-left-ink absolute inset-y-0 left-0 w-[46%] opacity-[0.28] [mask-image:linear-gradient(90deg,#000,transparent)] max-[980px]:w-[62%]" />
      <div className="overlay-grain absolute -inset-[5%] animate-[grain-shift_900ms_steps(2,end)_infinite] opacity-[0.16] mix-blend-overlay" />
      <motion.div
        className="overlay-speed absolute inset-0 mix-blend-screen will-change-[transform,opacity] [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]"
        animate={{
          x: shouldReduceMotion ? 0 : direction > 0 ? 20 : -20,
          y: shouldReduceMotion ? 0 : direction > 0 ? -8 : 8,
          opacity: shouldReduceMotion ? 0.12 : 0.3,
        }}
        transition={lobbyBackgroundTransition}
      />
      <motion.div
        className="overlay-sweep absolute -inset-[2%] mix-blend-screen will-change-[transform,opacity]"
        animate={{
          x: shouldReduceMotion ? 0 : direction > 0 ? 28 : -28,
          scale: shouldReduceMotion ? 1 : 1.03,
          opacity: mode.scene === "collection" ? 0.18 : 0.24,
        }}
        transition={lobbyBackgroundTransition}
      />
      <div className="overlay-ui-line absolute inset-x-0 top-[13%] h-px opacity-[0.48]" />
      <div className="overlay-ui-line absolute inset-x-0 bottom-[13%] h-px opacity-[0.48]" />
    </div>
  );
}
