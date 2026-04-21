import type { Variants } from "motion/react";

export const lobbyEase = [0.22, 1, 0.36, 1] as const;

export const lobbyTransition = {
  duration: 0.72,
  ease: lobbyEase,
};

export const lobbyFastTransition = {
  duration: 0.38,
  ease: lobbyEase,
};

export const lobbyTitleTransition = {
  duration: 0.62,
  ease: lobbyEase,
};

export const lobbyCharacterTransition = {
  duration: 0.82,
  ease: lobbyEase,
};

export const lobbyBackgroundTransition = {
  duration: 0.94,
  ease: lobbyEase,
};

export const lobbyChangeLockMs = 780;

export function createLobbySwapVariants(shouldReduceMotion: boolean): Variants {
  const transition = shouldReduceMotion
    ? { duration: 0.16, ease: "easeOut" as const }
    : lobbyTransition;

  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 72 : -72,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(5px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -72 : 72,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.015,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(5px)",
      transition,
    }),
  };
}

export function createBackgroundVariants(shouldReduceMotion: boolean): Variants {
  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 42 : -42,
      x: shouldReduceMotion ? 0 : direction > 0 ? 30 : -30,
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 1.07,
    }),
    center: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0.16, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -38 : 38,
      x: shouldReduceMotion ? 0 : direction > 0 ? -24 : 24,
      opacity: shouldReduceMotion ? 0 : 0,
      scale: shouldReduceMotion ? 1 : 1.045,
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    }),
  };
}
