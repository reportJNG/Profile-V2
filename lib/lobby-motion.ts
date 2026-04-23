import type { Variants } from "motion/react";

export const lobbyEase = [0.22, 1, 0.36, 1] as const;
export const lobbyBackgroundEase = [0.18, 1, 0.3, 1] as const;

export const lobbyTransition = {
  duration: 0.76,
  ease: lobbyEase,
};

export const lobbyFastTransition = {
  duration: 0.42,
  ease: lobbyEase,
};

export const lobbyTitleTransition = {
  duration: 0.66,
  ease: lobbyEase,
};

export const lobbyCharacterTransition = {
  duration: 0.82,
  ease: lobbyEase,
};

export const lobbyBackgroundTransition = {
  duration: 1.08,
  ease: lobbyBackgroundEase,
};

export const lobbyChangeLockMs = 780;

export function createLobbySwapVariants(shouldReduceMotion: boolean): Variants {
  const transition = shouldReduceMotion
    ? { duration: 0.16, ease: "easeOut" as const }
    : lobbyTransition;

  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 86 : -86,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.972,
      rotateX: shouldReduceMotion ? 0 : direction > 0 ? -3 : 3,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(7px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -78 : 78,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.022,
      rotateX: shouldReduceMotion ? 0 : direction > 0 ? 2 : -2,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(7px)",
      transition,
    }),
  };
}

export function createBackgroundVariants(shouldReduceMotion: boolean): Variants {
  return {
    enter: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? 56 : -56,
      x: shouldReduceMotion ? 0 : direction > 0 ? 40 : -40,
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 1.1,
      filter: shouldReduceMotion ? "none" : "saturate(1.18) blur(5px)",
    }),
    center: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "saturate(1) blur(0px)",
      transition: shouldReduceMotion
        ? { duration: 0.16, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    },
    exit: (direction: number) => ({
      y: shouldReduceMotion ? 0 : direction > 0 ? -48 : 48,
      x: shouldReduceMotion ? 0 : direction > 0 ? -34 : 34,
      opacity: shouldReduceMotion ? 0 : 0,
      scale: shouldReduceMotion ? 1 : 1.065,
      filter: shouldReduceMotion ? "none" : "saturate(1.18) blur(5px)",
      transition: shouldReduceMotion
        ? { duration: 0.12, ease: "easeOut" as const }
        : lobbyBackgroundTransition,
    }),
  };
}
