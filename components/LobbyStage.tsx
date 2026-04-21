"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { LobbyTab } from "@/lib/lobby-tabs";

const lobbyTransition = {
  duration: 0.56,
  ease: [0.22, 1, 0.36, 1] as const,
};

type LobbyStageProps = {
  activeIndex: number;
  activeTab: LobbyTab;
  direction: number;
  total: number;
};

export function LobbyStage({
  activeIndex,
  activeTab,
  direction,
  total,
}: LobbyStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const titleParts = activeTab.title.split(" ");

  const variants = {
    enter: (moveDirection: number) => ({
      x: shouldReduceMotion ? 0 : moveDirection > 0 ? 40 : -40,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: shouldReduceMotion
        ? { duration: 0.18, ease: "easeOut" as const }
        : lobbyTransition,
    },
    exit: (moveDirection: number) => ({
      x: shouldReduceMotion ? 0 : moveDirection > 0 ? -40 : 40,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: "easeOut" as const }
        : lobbyTransition,
    }),
  };

  return (
    <section className="relative z-10 flex min-h-dvh items-center px-5 pb-32 pt-20 sm:px-10 sm:pb-36 lg:px-16 lg:pb-32">
      <div className="w-full max-w-4xl">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeTab.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative"
          >
            <div
              className="mb-5 inline-flex items-center gap-3 border border-white/20 bg-black/35 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white/82 shadow-[0_0_30px_rgba(0,0,0,.28)] backdrop-blur-md"
              style={{ color: activeTab.accent }}
            >
              <span className="h-2 w-2 bg-current shadow-[0_0_18px_currentColor]" />
              Game Mode Select
            </div>

            <h1
              className="lobby-brush-title relative max-w-[780px] text-6xl font-black uppercase italic leading-[0.86] text-white sm:text-7xl md:text-8xl lg:text-9xl"
              style={
                {
                  "--title-accent": activeTab.accent,
                } as CSSProperties
              }
            >
              {titleParts.map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="border-l-4 bg-black/42 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/88 backdrop-blur-sm sm:text-base">
                {activeTab.label}
              </p>
              <div
                className="flex h-14 min-w-24 items-center justify-center border border-white/20 bg-black/38 px-4 font-mono text-lg font-bold text-white shadow-[0_0_24px_rgba(0,0,0,.28)] backdrop-blur-sm"
                style={{ borderColor: `${activeTab.accent}88` }}
              >
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>

            <div
              className="mt-7 h-1 w-52 max-w-full shadow-[0_0_22px_currentColor]"
              style={{ backgroundColor: activeTab.accent, color: activeTab.accent }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
