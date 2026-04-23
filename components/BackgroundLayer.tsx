"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import {
  createBackgroundVariants,
  lobbyBackgroundTransition,
} from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";

type Direction = 1 | -1;

type BackgroundLayerProps = {
  direction: Direction;
  mode: PortfolioSection;
};

export function BackgroundLayer({ direction, mode }: BackgroundLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = createBackgroundVariants(Boolean(shouldReduceMotion));

  return (
    <div aria-hidden="true" className="background-layer">
      <motion.div
        className="background-depth"
        custom={direction}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
      >
        <div className="background-base" />

        <motion.div
          className="background-photo"
          animate={{
            x: shouldReduceMotion ? 0 : direction > 0 ? -18 : 18,
            y: shouldReduceMotion ? 0 : direction > 0 ? -12 : 12,
            scale: shouldReduceMotion ? 1.02 : 1.06,
            rotate: shouldReduceMotion ? 0 : direction > 0 ? -0.5 : 0.5,
            opacity: shouldReduceMotion ? 0.32 : 0.38,
          }}
          transition={lobbyBackgroundTransition}
        >
          <Image
            src={mode.background.image}
            alt=""
            fill
            sizes="100vw"
            preload={mode.id === "story"}
            draggable={false}
            className="background-photo__image"
            style={
              {
                filter: mode.background.filter,
                objectPosition: mode.background.objectPosition,
              } as CSSProperties
            }
          />
        </motion.div>

        <div className="scene-paint" />
        <div className="scene-sky" />
        <div className="scene-glow" />
        <div className="scene-flare" />
        <div className="scene-horizon scene-horizon--back" />
        <div className="scene-horizon scene-horizon--mid" />
        <div className="scene-horizon scene-horizon--front" />
        <div className="scene-grid" />
        <div className="scene-ground" />
        <div className="scene-energy scene-energy--one" />
        <div className="scene-energy scene-energy--two" />
      </motion.div>
    </div>
  );
}
