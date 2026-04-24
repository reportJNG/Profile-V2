"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { OverlayLayer } from "@/components/OverlayLayer";
import { SelectTechModeHeading } from "@/components/PortfolioHeading";
import { createLobbySwapVariants, lobbyTitleTransition } from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type Direction = 1 | -1;

type ModeSceneProps = {
  direction: Direction;
  isEntered: boolean;
  section: PortfolioSection;
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
  section,
  onEnterMode,
  onNextMode,
  onPreviousMode,
}: ModeSceneProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const sceneVariants = createLobbySwapVariants(Boolean(shouldReduceMotion));
  const titleWords = section.title.split(" ");

  return (
    <motion.section
      aria-label={section.kicker}
      className={`mode-scene mode-scene--${section.scene}`}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      variants={sceneVariants}
      style={
        {
          "--mode-accent": section.accent,
          "--mode-secondary": section.secondaryAccent,
          "--title-size": section.titleSize,
        } as CSSProperties
      }
    >
      <BackgroundLayer direction={direction} mode={section} />
      <OverlayLayer direction={direction} mode={section} />

      <div className="relative z-10 min-h-dvh">
        <SelectTechModeHeading />

        <div className="flex min-h-dvh items-center px-4 pb-36 pt-32 sm:px-8 sm:pt-36 lg:px-14 lg:pb-32 lg:pt-32">
          <motion.div
            className="relative isolate z-20 max-w-[min(56rem,100%)] -rotate-1 lg:max-w-[min(58rem,72vw)]"
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
            <span
              aria-hidden="true"
              className="absolute -inset-x-8 -inset-y-6 -z-10 opacity-50 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--mode-accent), transparent 80%), transparent 58%)",
              }}
            />
            <motion.div
              className="mb-3 ml-1 inline-flex skew-x-[-6deg] items-center gap-2 font-mono text-[0.62rem] font-black uppercase leading-none tracking-[0.16em] text-white/80 [text-shadow:0_0_8px_color-mix(in_srgb,var(--mode-secondary),transparent_58%),0_2px_8px_rgba(0,0,0,0.55)] sm:text-xs sm:tracking-[0.2em]"
              initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: 18 }}
              transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : 0.04 }}
            >
              <span
                aria-hidden="true"
                className="h-[0.18rem] w-7 skew-x-[-20deg]"
                style={{
                  background:
                    "color-mix(in srgb, var(--mode-secondary), transparent 36%)",
                  boxShadow:
                    "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 58%)",
                }}
              />
              <span>{section.kicker}</span>
              <span
                aria-hidden="true"
                className="h-[0.18rem] w-3 skew-x-[-20deg] opacity-50"
                style={{
                  background:
                    "color-mix(in srgb, var(--mode-secondary), transparent 36%)",
                  boxShadow:
                    "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 58%)",
                }}
              />
            </motion.div>
            <motion.h1
              className="relative m-0 grid max-w-full origin-left skew-x-[-2deg] cursor-pointer text-[clamp(3.2rem,15vw,5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.052em] text-[#fff8e2] [font-family:var(--font-display),Georgia,serif] sm:text-[clamp(4.6rem,10vw,var(--title-size))] lg:max-w-[9.8ch] lg:text-[var(--title-size)]"
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
                  key={`${section.id}-${word}`}
                  className="relative block min-w-0"
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
                  <span
                    aria-hidden="true"
                    className="absolute left-[0.055em] top-[0.065em] z-0 block text-[rgba(4,4,8,0.82)] blur-[0.15px] [text-shadow:0_0.065em_0_rgba(0,0,0,0.64),0_0.14em_0.16em_rgba(0,0,0,0.42)]"
                  >
                    {word}
                  </span>
                  <span className="relative z-[1] block bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,color-mix(in_srgb,var(--mode-secondary),white_14%)_42%,color-mix(in_srgb,var(--mode-accent),white_12%)_100%)] bg-clip-text text-transparent [-webkit-text-stroke:1.15px_rgba(255,255,255,0.76)] [filter:drop-shadow(0_0.02em_0_rgba(255,255,255,0.42))_drop-shadow(0_0.065em_0_rgba(20,12,8,0.72))_drop-shadow(0_0_0.07em_color-mix(in_srgb,var(--mode-accent),transparent_80%))]">
                    {word}
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.34)_36%,transparent_62%),repeating-linear-gradient(0deg,transparent_0_0.12em,rgba(255,255,255,0.08)_0.13em_0.145em,transparent_0.155em_0.26em)] opacity-25 mix-blend-screen [mask-image:linear-gradient(180deg,#000,transparent_82%)]"
                  >
                    {word}
                  </span>
                </motion.span>
              ))}
            </motion.h1>
            <span
              aria-hidden="true"
              className="absolute left-1 top-[calc(100%+0.72rem)] h-0.5 w-[min(14rem,36vw)] skew-x-[-14deg] rounded-full opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--mode-secondary), white 8%), color-mix(in srgb, var(--mode-accent), white 4%) 42%, transparent 78%)",
                boxShadow:
                  "0 0 14px color-mix(in srgb, var(--mode-secondary), transparent 66%)",
              }}
            />
            <motion.div
              aria-label="Previous section navigation"
              className="pointer-events-none absolute left-[52%] top-[-3.25rem] z-20 -translate-x-1/2 sm:left-[54%] sm:top-[-3.7rem]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.86 }}
              transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
            >
              <TitleArrowButton
                direction="up"
                label="Previous portfolio section"
                onClick={onPreviousMode}
              />
            </motion.div>
            <motion.div
              aria-label="Next section navigation"
              className="pointer-events-none absolute bottom-[-3.55rem] left-[52%] z-20 -translate-x-1/2 sm:bottom-[-4rem] sm:left-[54%]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.86 }}
              transition={{ ...lobbyTitleTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
            >
              <TitleArrowButton
                direction="down"
                label="Next portfolio section"
                onClick={onNextMode}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
