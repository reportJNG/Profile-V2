import type { Variants } from "motion/react";

export const lobbyEase = [0.22, 1, 0.36, 1] as const;
export const lobbyBackgroundEase = [0.16, 1, 0.28, 1] as const;

export const lobbyTransition = {
  duration: 0.62,
  ease: lobbyEase,
};

export const lobbyTitleTransition = {
  duration: 0.54,
  ease: lobbyEase,
};

export const lobbyBackgroundTransition = {
  duration: 0.72,
  ease: lobbyBackgroundEase,
};

export const lobbyChangeLockMs = 660;

export function createLobbySwapVariants(shouldReduceMotion: boolean): Variants {
  const transition = shouldReduceMotion
    ? { duration: 0.16, ease: "easeOut" as const }
    : lobbyTransition;

  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 104 : -104,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.955,
      rotateX: shouldReduceMotion ? 0 : direction > 0 ? -4 : 4,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(9px) saturate(1.28)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px) saturate(1)",
      transition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -96 : 96,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.035,
      rotateX: shouldReduceMotion ? 0 : direction > 0 ? 3 : -3,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(9px) saturate(1.28)",
      transition,
    }),
  };
}

export function createBackgroundVariants(shouldReduceMotion: boolean): Variants {
  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 74 : -74,
      x: shouldReduceMotion ? 0 : direction > 0 ? 62 : -62,
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 1.095,
      filter: shouldReduceMotion ? "none" : "saturate(1.18) contrast(1.04) blur(4px)",
    }),
    center: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "saturate(1) contrast(1) blur(0px)",
      transition: shouldReduceMotion
        ? { duration: 0.16, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -62 : 62,
      x: shouldReduceMotion ? 0 : direction > 0 ? -54 : 54,
      opacity: shouldReduceMotion ? 0 : 0,
      scale: shouldReduceMotion ? 1 : 1.075,
      filter: shouldReduceMotion ? "none" : "saturate(1.16) contrast(1.04) blur(4px)",
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    }),
  };
}
