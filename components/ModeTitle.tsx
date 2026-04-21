"use client";

import { motion, useReducedMotion } from "motion/react";
import { lobbyTitleTransition } from "@/lib/lobby-motion";
import type { LobbyMode } from "@/lib/lobby-modes";

type Direction = 1 | -1;

type ModeTitleProps = {
  direction: Direction;
  mode: LobbyMode;
};

export function ModeTitle({ direction, mode }: ModeTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = mode.title.split(" ");

  return (
    <motion.h1
      aria-label={mode.title}
      className="mode-title"
      custom={direction}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: direction > 0 ? 64 : -64,
              x: direction > 0 ? -16 : 16,
              scale: 0.965,
              filter: "blur(5px)",
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              y: direction > 0 ? -64 : 64,
              x: direction > 0 ? 20 : -20,
              scale: 1.025,
              filter: "blur(4px)",
            }
      }
      transition={lobbyTitleTransition}
    >
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="mode-title__word"
          data-word={word}
          key={`${mode.id}-${word}`}
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: direction > 0 ? 34 : -34,
                  skewX: -12,
                }
          }
          animate={{ opacity: 1, y: 0, skewX: -6 }}
          exit={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: direction > 0 ? -32 : 32,
                  skewX: -16,
                }
          }
          transition={{
            ...lobbyTitleTransition,
            delay: shouldReduceMotion ? 0 : index * 0.055,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
