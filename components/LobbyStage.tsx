"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { createLobbySwapVariants, lobbyTransition } from "@/lib/lobby-motion";
import type { LobbyTab } from "@/lib/lobby-tabs";

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
  const variants = createLobbySwapVariants(Boolean(shouldReduceMotion));

  return (
    <section className="relative z-10 flex min-h-dvh items-start px-5 pb-32 pt-[15dvh] sm:px-10 sm:pb-36 sm:pt-[16dvh] lg:px-16 lg:pb-32 lg:pt-[14dvh]">
      <div className="relative min-h-[390px] w-full max-w-[900px] sm:min-h-[470px]">
        <div
          aria-hidden="true"
          className="absolute -left-4 top-7 hidden h-72 w-px bg-[linear-gradient(180deg,transparent,var(--stage-accent),transparent)] opacity-70 sm:block"
          style={{ "--stage-accent": activeTab.accent } as CSSProperties}
        />

        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={activeTab.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-x-0 top-0"
          >
            <motion.div
              className="mb-5 flex items-center gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, x: direction * 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: direction * -18 }}
              transition={lobbyTransition}
            >
              <div
                className="inline-flex items-center gap-3 border border-white/20 bg-black/42 px-4 py-2 text-[11px] font-black uppercase leading-none text-white/82 shadow-[0_0_30px_rgba(0,0,0,.28)] backdrop-blur-md [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)]"
                style={{
                  color: activeTab.accent,
                  borderColor: `${activeTab.accent}88`,
                }}
              >
                <span className="h-2 w-2 bg-current shadow-[0_0_18px_currentColor]" />
                Main Menu
              </div>
              <div
                className="h-px w-28 max-w-[30vw] bg-[linear-gradient(90deg,var(--line-accent),transparent)]"
                style={{ "--line-accent": activeTab.accent } as CSSProperties}
              />
            </motion.div>

            <h1
              className="lobby-brush-title relative max-w-[820px] text-6xl font-black uppercase italic leading-[0.84] text-white sm:text-7xl md:text-8xl lg:text-[8.4rem]"
              style={
                {
                  "--title-accent": activeTab.accent,
                } as CSSProperties
              }
            >
              {titleParts.map((part, index) => (
                <motion.span
                  key={`${part}-${index}`}
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: direction * 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: direction * -22 }}
                  transition={{
                    ...lobbyTransition,
                    delay: shouldReduceMotion ? 0 : index * 0.035,
                  }}
                >
                  {part}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="mt-6 flex min-h-16 flex-wrap items-center gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, x: direction * 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: direction * -18 }}
              transition={lobbyTransition}
            >
              <p
                className="border-l-4 bg-black/46 px-4 py-3 text-sm font-black uppercase leading-tight text-white/88 shadow-[0_18px_45px_rgba(0,0,0,.24)] backdrop-blur-sm sm:text-base"
                style={{ borderColor: activeTab.accent }}
              >
                {activeTab.label}
              </p>
              <div
                className="flex h-14 min-w-24 items-center justify-center border border-white/20 bg-black/42 px-4 font-mono text-lg font-black text-white shadow-[0_0_24px_rgba(0,0,0,.28)] backdrop-blur-sm [clip-path:polygon(9px_0,100%_0,calc(100%-9px)_100%,0_100%)]"
                style={{ borderColor: `${activeTab.accent}88` }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-white/38">/</span>
                <span className="text-white/62">{String(total).padStart(2, "0")}</span>
              </div>
            </motion.div>

            <motion.div
              className="mt-7 flex h-3 max-w-full items-center gap-2"
              initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.82 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scaleX: 0.82 }}
              transition={lobbyTransition}
              style={{ transformOrigin: "left center" }}
            >
              <div
                className="h-[3px] w-56 max-w-[62vw] shadow-[0_0_22px_currentColor]"
                style={{ backgroundColor: activeTab.accent, color: activeTab.accent }}
              />
              <div className="h-px w-24 max-w-[22vw] bg-white/42" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
