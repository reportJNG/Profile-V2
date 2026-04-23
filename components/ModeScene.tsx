"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { GameModeHeading } from "@/components/GameModeHeading";
import { OverlayLayer } from "@/components/OverlayLayer";
import { createLobbySwapVariants } from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";

type Direction = 1 | -1;

type ModeSceneProps = {
  direction: Direction;
  isEntered: boolean;
  mode: PortfolioSection;
  onEnterMode: () => boolean;
};

export function ModeScene({
  direction,
  isEntered,
  mode,
  onEnterMode,
}: ModeSceneProps) {
  const shouldReduceMotion = useReducedMotion();
  const sceneVariants = createLobbySwapVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      aria-label={mode.kicker}
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
        } as CSSProperties
      }
    >
      <BackgroundLayer direction={direction} mode={mode} />
      <OverlayLayer direction={direction} mode={mode} />

      <div className="mode-composition">
        <GameModeHeading mode={mode} />

        <div className="mode-ornament mode-ornament--top" aria-hidden="true" />
        <div className="mode-ornament mode-ornament--bottom" aria-hidden="true" />

        <div className="landing-layout">
          <motion.div
            className="landing-title-wrap"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: direction > 0 ? 24 : -24, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: direction > 0 ? -24 : 24, scale: 1.02 }
            }
            transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className={`landing-title ${isEntered ? "is-entered" : ""}`}
              data-title={mode.title}
              onClick={() => onEnterMode()}
            >
              {mode.title.split(" ").map((word) => (
                <span key={`${mode.id}-${word}`}>{word}</span>
              ))}
            </h1>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
