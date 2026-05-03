"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import {
  createBackgroundVariants,
  lobbyBackgroundTransition,
} from "@/lib/lobby-motion";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type Direction = 1 | -1;

type BackgroundLayerProps = {
  direction: Direction;
  mode: PortfolioSection;
};

export function BackgroundLayer({ direction, mode }: BackgroundLayerProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const variants = createBackgroundVariants(Boolean(shouldReduceMotion));

  return (
    <div aria-hidden="true" className="background-layer pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="background-depth absolute -inset-[10%] animate-[scene-breathe_11s_ease-in-out_infinite_alternate] will-change-transform"
        custom={direction}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
      >
        <div className="background-base absolute inset-0 bg-[#071018]" />

        <motion.div
          className="background-photo absolute -inset-[3%] overflow-hidden opacity-[0.36] mix-blend-soft-light will-change-[transform,opacity,filter]"
          animate={{
            x: shouldReduceMotion ? 0 : direction > 0 ? -24 : 24,
            y: shouldReduceMotion ? 0 : direction > 0 ? -10 : 10,
            scale: shouldReduceMotion ? 1.01 : 1.045,
            rotate: shouldReduceMotion ? 0 : direction > 0 ? -0.35 : 0.35,
            opacity: shouldReduceMotion
              ? Math.max(mode.background.imageOpacity - 0.08, 0.56)
              : mode.background.imageOpacity,
          }}
          transition={lobbyBackgroundTransition}
        >
          <Image
            src={mode.background.image}
            alt=""
            fill
            sizes="100vw"
            preload={mode.id === "about"}
            draggable={false}
            className="background-photo__image object-cover"
            style={
              {
                filter: mode.background.filter,
                objectPosition: mode.background.objectPosition,
              } as CSSProperties
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(2, 3, 8, 0.42), transparent 34%, transparent 68%, rgba(2, 3, 8, 0.38)), linear-gradient(180deg, rgba(2, 3, 8, 0.18), transparent 46%, rgba(2, 3, 8, 0.54))",
            }}
          />
        </motion.div>

        <div className="scene-paint absolute inset-0 opacity-[0.94]" />
        <div className="scene-sky absolute inset-0 opacity-[0.96]" />
        <div className="scene-glow absolute inset-0 opacity-[0.32] mix-blend-screen" />
        <div className="scene-flare absolute inset-0 opacity-[0.24] mix-blend-screen" />
        <div className="scene-horizon scene-horizon--back absolute inset-x-0 bottom-[22%] top-auto h-1/4 origin-bottom skew-x-[-9deg] opacity-[0.88]" />
        <div className="scene-horizon scene-horizon--mid absolute inset-x-0 bottom-[14%] top-auto h-[18%] origin-bottom skew-x-[-9deg] opacity-[0.88]" />
        <div className="scene-horizon scene-horizon--front absolute inset-x-0 bottom-[7%] top-auto h-[17%] origin-bottom skew-x-[-9deg] opacity-[0.88]" />
        <div className="scene-grid absolute inset-0 opacity-[0.16]" />
        <div className="scene-ground absolute inset-x-0 bottom-0 top-auto" />
        <div className="scene-energy scene-energy--one absolute inset-0 animate-[energy-slide-one_9s_ease-in-out_infinite_alternate] opacity-[0.44] mix-blend-screen" />
        <div className="scene-energy scene-energy--two absolute inset-0 animate-[energy-slide-two_8.5s_ease-in-out_infinite_alternate] opacity-[0.44] mix-blend-screen" />
      </motion.div>
    </div>
  );
}
