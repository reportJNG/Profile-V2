import type { Variants } from "motion/react";

export const lobbyEase = [0.22, 1, 0.36, 1] as const;

export const lobbyTransition = {
  duration: 0.58,
  ease: lobbyEase,
};

export const lobbyFastTransition = {
  duration: 0.34,
  ease: lobbyEase,
};

export const lobbyChangeLockMs = 500;

export function createLobbySwapVariants(shouldReduceMotion: boolean): Variants {
  const transition = shouldReduceMotion
    ? { duration: 0.16, ease: "easeOut" as const }
    : lobbyTransition;

  return {
    enter: (direction: number) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? 44 : -44,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition,
    },
    exit: (direction: number) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? -44 : 44,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
      transition,
    }),
  };
}
