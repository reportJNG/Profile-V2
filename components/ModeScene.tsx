"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { GameModeHeading } from "@/components/GameModeHeading";
import { ModeTitle } from "@/components/ModeTitle";
import { NarutoRenderLayer } from "@/components/NarutoRenderLayer";
import { OverlayLayer } from "@/components/OverlayLayer";
import { createLobbySwapVariants } from "@/lib/lobby-motion";
import type { LobbyMode } from "@/lib/lobby-modes";

type Direction = 1 | -1;

type ModeSceneProps = {
  activeIndex: number;
  direction: Direction;
  mode: LobbyMode;
  total: number;
};

export function ModeScene({
  activeIndex,
  direction,
  mode,
  total,
}: ModeSceneProps) {
  const shouldReduceMotion = useReducedMotion();
  const sceneVariants = createLobbySwapVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      aria-label={mode.title}
      className={`mode-scene mode-scene--${mode.scene}`}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      variants={sceneVariants}
      style={
        {
          "--mode-accent": mode.accent,
          "--mode-secondary": mode.secondaryAccent,
          "--mode-shadow": mode.shadowColor,
          "--title-size": mode.titleSize,
          "--figure-scale": mode.figureScale,
        } as CSSProperties
      }
    >
      <BackgroundLayer direction={direction} mode={mode} />
      <OverlayLayer direction={direction} mode={mode} />

      <div className="mode-composition">
        <GameModeHeading activeIndex={activeIndex} mode={mode} total={total} />
        <ModeTitle direction={direction} mode={mode} />
        <NarutoRenderLayer direction={direction} mode={mode} />

        <motion.div
          className="mode-small-label"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: direction > 0 ? 20 : -20 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, x: direction > 0 ? -20 : 20 }
          }
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <b>{mode.shortLabel}</b>
        </motion.div>
      </div>
    </motion.section>
  );
}
