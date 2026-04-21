"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { lobbyTransition } from "@/lib/lobby-motion";
import type { LobbyTab } from "@/lib/lobby-tabs";

type LobbyBackgroundProps = {
  activeIndex: number;
  activeTab: LobbyTab;
};

export function LobbyBackground({
  activeIndex,
  activeTab,
}: LobbyBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const panX = shouldReduceMotion ? 0 : (activeIndex - 2) * -34;
  const hazeX = shouldReduceMotion ? 0 : (activeIndex - 2) * -18;
  const lightPosition = shouldReduceMotion ? 64 : 68 - activeIndex * 5;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#050507]">
      <motion.div
        className="absolute inset-y-[-4%] -left-[13%] -right-[13%]"
        animate={{ x: panX, scale: shouldReduceMotion ? 1.01 : 1.075 }}
        transition={lobbyTransition}
      >
        <Image
          src={activeTab.background}
          alt=""
          fill
          priority
          sizes="126vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-y-[-6%] -left-[10%] -right-[10%] mix-blend-screen"
        animate={{ x: hazeX, opacity: shouldReduceMotion ? 0.16 : 0.32 }}
        transition={lobbyTransition}
        style={{
          background: `linear-gradient(105deg, transparent 0%, ${activeTab.accent}26 38%, transparent 68%)`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPositionX: shouldReduceMotion ? "50%" : `${46 + activeIndex * 2}%`,
        }}
        transition={lobbyTransition}
        style={{
          background: `radial-gradient(circle at ${lightPosition}% 48%, ${activeTab.accent}3d 0%, transparent 29%), linear-gradient(90deg, rgba(3,4,7,.9), rgba(3,4,7,.42) 43%, rgba(3,4,7,.12) 72%, rgba(3,4,7,.32) 100%)`,
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        animate={{ opacity: shouldReduceMotion ? 0.76 : 0.86 }}
        transition={lobbyTransition}
        style={{
          background:
            "linear-gradient(0deg, rgba(2,3,6,.95) 0%, rgba(2,3,6,.48) 46%, transparent 100%)",
        }}
      />
    </div>
  );
}
