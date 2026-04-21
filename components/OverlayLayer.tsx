"use client";

import { motion, useReducedMotion } from "motion/react";
import { lobbyBackgroundTransition } from "@/lib/lobby-motion";
import type { LobbyMode } from "@/lib/lobby-modes";

type Direction = 1 | -1;

type OverlayLayerProps = {
  direction: Direction;
  mode: LobbyMode;
};

export function OverlayLayer({ direction, mode }: OverlayLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="overlay-layer">
      <div className="overlay-vignette" />
      <div className="overlay-bottom" />
      <div className="overlay-left-ink" />
      <div className="overlay-grain" />
      <motion.div
        className="overlay-speed"
        animate={{
          x: shouldReduceMotion ? 0 : direction > 0 ? 22 : -22,
          opacity: shouldReduceMotion ? 0.15 : 0.42,
        }}
        transition={lobbyBackgroundTransition}
      />
      <motion.div
        className="overlay-sweep"
        animate={{
          x: shouldReduceMotion ? 0 : direction > 0 ? 32 : -32,
          opacity: mode.scene === "collection" ? 0.18 : 0.28,
        }}
        transition={lobbyBackgroundTransition}
      />
      <div className="overlay-ui-line overlay-ui-line--top" />
      <div className="overlay-ui-line overlay-ui-line--bottom" />
    </div>
  );
}
