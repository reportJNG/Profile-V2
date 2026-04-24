"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CornerDownLeft } from "lucide-react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { OverlayLayer } from "@/components/OverlayLayer";
import {
  createLobbySwapVariants,
  lobbyBackgroundEase,
  lobbyTitleTransition,
} from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type Direction = 1 | -1;

type ModeLoadingScreenProps = {
  direction: Direction;
  section: PortfolioSection;
};

const progressMax = 100;
const loadingDurationMs = 3200;
const letterStartDelay = 0.32;
const letterSettleSeconds = 0.74;

function getLoadingMessage(messages: readonly string[], progress: number) {
  const safeMessages = messages.length > 0 ? messages : ["Preparing page"];
  const index = Math.min(
    safeMessages.length - 1,
    Math.floor((progress / progressMax) * safeMessages.length),
  );

  return safeMessages[index];
}

export function ModeLoadingScreen({
  direction,
  section,
}: ModeLoadingScreenProps) {
  const router = useRouter();
  const shouldReduceMotion = useHydratedReducedMotion();
  const sceneVariants = createLobbySwapVariants(Boolean(shouldReduceMotion));
  const loadingTitle = section.title;
  const animatedLetterCount = useMemo(
    () => Array.from(loadingTitle).filter((letter) => letter !== " ").length,
    [loadingTitle],
  );
  const letterStepDelay = Math.min(
    0.44,
    Math.max(0.18, 3.65 / Math.max(animatedLetterCount - 1, 1)),
  );
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = animatedProgress;
  const message = getLoadingMessage(section.loadingMessages, progress);
  const isComplete = progress >= progressMax;
  const sectionHref = `/${section.id}`;

  const startMode = useCallback(() => {
    if (!isComplete) {
      return;
    }

    router.push(sectionHref);
  }, [isComplete, router, sectionHref]);

  useEffect(() => {
    const startedAt = performance.now();
    let animationFrame = 0;

    function tick(now: number) {
      const elapsed = now - startedAt;
      const linearProgress = Math.min(elapsed / loadingDurationMs, 1);

      setAnimatedProgress(Math.min(progressMax, Math.floor(linearProgress * progressMax)));

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    }

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [section.id]);

  useEffect(() => {
    function handleStartKey(event: KeyboardEvent) {
      if (event.key !== "Enter" || !isComplete) {
        return;
      }

      event.preventDefault();
      startMode();
    }

    window.addEventListener("keydown", handleStartKey);
    return () => window.removeEventListener("keydown", handleStartKey);
  }, [isComplete, startMode]);

  return (
    <motion.section
      aria-label={`${section.title} loading page`}
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
        } as CSSProperties
      }
    >
      <BackgroundLayer direction={direction} mode={section} />
      <OverlayLayer direction={direction} mode={section} />

      <div className="relative z-10 flex min-h-dvh flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-10">
        <motion.div
          className="mt-[7dvh] flex max-w-[calc(100vw-2rem)] flex-col items-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={lobbyTitleTransition}
        >
          <span
            className="relative inline-flex items-center gap-3 overflow-hidden rounded-[0.45rem] border border-white/14 bg-black/28 px-4 py-2.5 shadow-2xl backdrop-blur-md sm:gap-4 sm:px-5"
            style={{
              boxShadow:
                "0 14px 34px rgba(0,0,0,0.34), 0 0 22px color-mix(in srgb, var(--mode-accent), transparent 82%), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 h-px opacity-90"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 12%), color-mix(in srgb, var(--mode-accent), white 8%), transparent)",
              }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 w-16 -skew-x-12 opacity-30"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent)",
              }}
              animate={shouldReduceMotion ? undefined : { x: ["-170%", "520%"] }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatDelay: 1.1,
              }}
            />
            <span
              aria-hidden="true"
              className="relative h-[0.16rem] w-8 skew-x-[-18deg] rounded-full sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%))",
                boxShadow:
                  "0 0 14px color-mix(in srgb, var(--mode-secondary), transparent 50%)",
              }}
            />
            <span className="relative inline-flex items-center gap-2 font-mono text-[0.62rem] font-black uppercase leading-none tracking-[0.26em] text-white/90 [text-shadow:0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_45%),0_2px_10px_rgba(0,0,0,0.58)] sm:text-xs sm:tracking-[0.32em]">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--mode-secondary), white 20%)",
                  boxShadow:
                    "0 0 12px color-mix(in srgb, var(--mode-secondary), transparent 18%)",
                }}
              />
              Selected Mode
            </span>
            <span
              aria-hidden="true"
              className="relative h-[0.16rem] w-8 skew-x-[-18deg] rounded-full sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--mode-accent), white 8%), transparent)",
                boxShadow:
                  "0 0 14px color-mix(in srgb, var(--mode-accent), transparent 50%)",
              }}
            />
          </span>
        </motion.div>

        <div className="flex flex-1 items-center justify-center pb-[7dvh] pt-[2dvh]">
          <div className="relative isolate w-full max-w-[min(44rem,92vw)]">
            <span
              aria-hidden="true"
              className="absolute -inset-x-8 -inset-y-6 -z-10 opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 48%, color-mix(in srgb, var(--mode-accent), transparent 72%), transparent 64%)",
              }}
            />

            <motion.h1
              aria-label={loadingTitle}
              className="mb-8 flex flex-wrap justify-center gap-x-[0.09em] gap-y-2 overflow-visible text-[clamp(3rem,12vw,7.4rem)] font-extrabold uppercase leading-[0.86] tracking-0 [font-family:var(--font-display),Georgia,serif] sm:mb-10"
              initial="hidden"
              animate="visible"
            >
              {loadingTitle.split(" ").map((word, wordIndex, words) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-flex whitespace-nowrap"
                >
                  {Array.from(word).map((letter, letterIndex) => {
                    const globalIndex =
                      words
                        .slice(0, wordIndex)
                        .reduce((count, previousWord) => count + previousWord.length, 0) +
                      letterIndex;
                    const letterDelay = letterStartDelay + globalIndex * letterStepDelay;

                    return (
                      <motion.span
                        key={`${letter}-${wordIndex}-${letterIndex}`}
                        aria-hidden="true"
                        className="relative inline-block"
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: "calc(-52vw - 8rem)",
                            y: 12,
                            scale: 0.72,
                            rotate: -10,
                            filter: "blur(7px)",
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            filter: "blur(0px)",
                            transition: {
                              delay: letterDelay,
                              duration: letterSettleSeconds,
                              ease: lobbyBackgroundEase,
                            },
                          },
                        }}
                      >
                        <motion.span
                          aria-hidden="true"
                          className="absolute -inset-x-3 top-1/2 -z-10 h-[0.11em] -translate-y-1/2 rounded-full opacity-0"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 18%), transparent)",
                            boxShadow:
                              "0 0 18px color-mix(in srgb, var(--mode-secondary), transparent 48%)",
                          }}
                          animate={{
                            opacity: [0, 0.85, 0],
                            scaleX: [0.18, 1.28, 0.42],
                            x: ["-38%", "6%", "30%"],
                          }}
                          transition={{
                            delay: letterDelay + 0.08,
                            duration: 0.46,
                            ease: "easeOut",
                          }}
                        />
                        <span className="relative block bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,color-mix(in_srgb,var(--mode-secondary),white_18%)_42%,color-mix(in_srgb,var(--mode-accent),white_10%)_100%)] bg-clip-text text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.62)] [filter:drop-shadow(0_0.035em_0_rgba(255,255,255,0.3))_drop-shadow(0_0.08em_0_rgba(12,8,10,0.78))_drop-shadow(0_0_0.11em_color-mix(in_srgb,var(--mode-accent),transparent_72%))]">
                          {letter}
                        </span>
                      </motion.span>
                    );
                  })}
                </span>
              ))}
              <span className="sr-only">{loadingTitle}</span>
            </motion.h1>

            <motion.div
              className="mx-auto w-full max-w-[31rem]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              transition={{
                ...lobbyTitleTransition,
                delay: shouldReduceMotion ? 0 : 0.64,
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                <motion.span
                  key={message}
                  className="min-w-0 truncate text-left"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {message}
                </motion.span>
                <span className="shrink-0 text-white">{progress}%</span>
              </div>

              <div
                aria-label={`Loading ${section.title}`}
                aria-valuemax={progressMax}
                aria-valuemin={0}
                aria-valuenow={progress}
                role="progressbar"
                className="relative h-3 overflow-hidden rounded-full border border-white/14 bg-white/8 p-[3px] shadow-2xl backdrop-blur-md"
                style={{
                  boxShadow:
                    "0 16px 36px rgba(0,0,0,0.34), 0 0 22px color-mix(in srgb, var(--mode-accent), transparent 80%), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <motion.div
                  className="relative h-full overflow-hidden rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--mode-accent), white 4%), color-mix(in srgb, var(--mode-secondary), white 20%), rgba(255,255,255,0.94))",
                    boxShadow:
                      "0 0 16px color-mix(in srgb, var(--mode-secondary), transparent 46%)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 w-12 opacity-70"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.74), transparent)",
                    }}
                    animate={shouldReduceMotion ? undefined : { x: ["-80%", "680%"] }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      repeat: shouldReduceMotion ? 0 : Infinity,
                    }}
                  />
                </motion.div>
              </div>

              <motion.p
                className="mt-4 font-mono text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white/50"
                animate={{ opacity: isComplete ? 1 : 0.58 }}
                transition={{ duration: 0.28 }}
              >
                {isComplete ? "Complete" : "Loading selected mode"}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {isComplete && (
        <motion.nav
          aria-label="Start loaded section"
          className="absolute bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
          transition={lobbyTitleTransition}
        >
          <div className="relative flex items-center gap-3 overflow-hidden rounded-[0.6rem] border border-white/10 bg-black/24 p-1.5 pl-4 shadow-xl backdrop-blur-md">
            <div
              aria-hidden="true"
              className="absolute inset-x-2 top-0 h-px opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
              }}
            />
            <motion.span
              className="font-mono text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/82 [text-shadow:0_0_14px_color-mix(in_srgb,var(--mode-accent),transparent_48%),0_2px_10px_rgba(0,0,0,0.58)] sm:text-xs"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.36, 1, 0.36],
                      x: [4, 0, 4],
                    }
              }
              transition={{
                duration: 1.08,
                ease: "easeInOut",
                repeat: shouldReduceMotion ? 0 : Infinity,
              }}
            >
              Press Enter
            </motion.span>
            <motion.div
              aria-label="Press Enter to start"
              title="Press Enter to start"
              className="group relative grid size-11 place-items-center overflow-hidden rounded-[0.42rem] border border-white/14 bg-black/30 text-white/88 outline-none backdrop-blur-md sm:size-11"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02)), rgba(5, 7, 14, 0.72)",
                borderColor:
                  "color-mix(in srgb, var(--mode-secondary), transparent 76%)",
                boxShadow:
                  "0 8px 14px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.34)",
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.72, 1, 0.72],
                      scale: [1, 1.04, 1],
                    }
              }
              transition={{
                duration: 1.05,
                ease: "easeInOut",
                repeat: shouldReduceMotion ? 0 : Infinity,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-1.5 top-1 h-px opacity-55"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
                }}
              />
              <CornerDownLeft
                aria-hidden="true"
                className="relative size-5"
                strokeWidth={2.6}
              />
            </motion.div>
          </div>
        </motion.nav>
      )}
    </motion.section>
  );
}
