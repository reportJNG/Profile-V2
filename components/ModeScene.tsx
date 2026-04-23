"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { GameModeHeading } from "@/components/GameModeHeading";
import { OverlayLayer } from "@/components/OverlayLayer";
import { createLobbySwapVariants, lobbyTitleTransition } from "@/lib/lobby-motion";
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
  const titleWords = mode.title.split(" ");

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

        <motion.div
          className="mode-ornament mode-ornament--top"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.92 }}
          transition={lobbyTitleTransition}
        >
          <span className="mode-ornament__chevron" />
          <span className="mode-ornament__chevron mode-ornament__chevron--inner" />
          <span className="mode-ornament__spark" />
        </motion.div>

        <motion.div
          className="mode-ornament mode-ornament--bottom"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.92 }}
          transition={lobbyTitleTransition}
        >
          <span className="mode-ornament__chevron" />
          <span className="mode-ornament__chevron mode-ornament__chevron--inner" />
          <span className="mode-ornament__spark" />
        </motion.div>

        <div className="landing-layout">
          <motion.div
            className="landing-title-wrap"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: direction > 0 ? 34 : -34, scale: 0.965, rotate: direction > 0 ? -1.1 : 1.1 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: direction > 0 ? -28 : 28, scale: 1.03, rotate: direction > 0 ? 0.8 : -0.8 }
            }
            transition={lobbyTitleTransition}
          >
            <motion.h1
              className={`landing-title ${isEntered ? "is-entered" : ""}`}
              data-title={mode.title}
              onClick={() => onEnterMode()}
              animate={
                shouldReduceMotion
                  ? undefined
                  : isEntered
                    ? { scale: 1.026, filter: "drop-shadow(0 0 34px color-mix(in srgb, var(--mode-secondary), transparent 34%))" }
                    : { scale: 1, filter: "drop-shadow(0 0 0 transparent)" }
              }
              transition={lobbyTitleTransition}
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={`${mode.id}-${word}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: direction > 0 ? -18 : 18, y: direction > 0 ? 12 : -12 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, x: direction > 0 ? 18 : -18, y: direction > 0 ? -12 : 12 }
                  }
                  transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
