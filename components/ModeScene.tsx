"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
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
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

type TitlePointerControlProps = {
  direction: "up" | "down";
  label: string;
  onClick: () => boolean;
};

function TitleArrowButton({
  direction,
  label,
  onClick,
}: TitlePointerControlProps) {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;

  return (
    <motion.button
      type="button"
      aria-label={label}
      className="pointer-events-auto group relative grid size-11 place-items-center rounded-full border border-white/20 bg-black/25 text-white outline-none backdrop-blur-md transition focus-visible:ring-2 focus-visible:ring-white/80 sm:size-12"
      style={{
        background:
          "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--mode-secondary), white 8%), color-mix(in srgb, var(--mode-accent), transparent 68%) 46%, rgba(5, 7, 14, 0.82) 72%)",
        boxShadow:
          "0 8px 18px rgba(0, 0, 0, 0.32), 0 0 20px color-mix(in srgb, var(--mode-secondary), transparent 42%), inset 0 1px 0 rgba(255, 255, 255, 0.26)",
      }}
      animate={{ y: direction === "up" ? [0, -5, 0] : [0, 5, 0] }}
      transition={{ duration: 1.45, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.14 }}
      whileTap={{ scale: 0.9 }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-1 rounded-full border border-white/15"
      />
      <span
        aria-hidden="true"
        className="absolute size-7 rotate-45 rounded-[0.35rem] border border-white/15 opacity-70"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--mode-secondary), transparent 68%), transparent)",
        }}
      />
      <Icon
        aria-hidden="true"
        className="relative size-7 transition group-hover:scale-110"
        strokeWidth={2.8}
        style={{
          color: "color-mix(in srgb, var(--mode-secondary), white 16%)",
          filter:
            "drop-shadow(0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 32%)) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45))",
        }}
      />
    </motion.button>
  );
}

export function ModeScene({
  direction,
  isEntered,
  mode,
  onEnterMode,
  onNextMode,
  onPreviousMode,
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
                    ? { scale: 1.034 }
                    : { scale: 1 }
              }
              whileHover={shouldReduceMotion ? undefined : { scale: isEntered ? 1.038 : 1.018 }}
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
            <motion.div
              aria-label="Selected mode navigation"
              className="pointer-events-none absolute left-[54%] top-[-3.4rem] z-20 -translate-x-1/2 sm:left-[55%] sm:top-[-3.8rem]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.86 }}
              transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
            >
              <TitleArrowButton
                direction="up"
                label="Previous game mode"
                onClick={onPreviousMode}
              />
            </motion.div>
            <motion.div
              aria-label="Selected mode navigation"
              className="pointer-events-none absolute bottom-[-3.8rem] left-[54%] z-20 -translate-x-1/2 sm:bottom-[-4.1rem] sm:left-[55%]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.86 }}
              transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
            >
              <TitleArrowButton
                direction="down"
                label="Next game mode"
                onClick={onNextMode}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
