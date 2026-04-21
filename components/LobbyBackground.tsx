"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { LobbyTab } from "@/lib/lobby-tabs";

const lobbyTransition = {
  duration: 0.56,
  ease: [0.22, 1, 0.36, 1] as const,
};

type LobbyBackgroundProps = {
  activeIndex: number;
  activeTab: LobbyTab;
};

export function LobbyBackground({
  activeIndex,
  activeTab,
}: LobbyBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const panX = shouldReduceMotion ? 0 : activeIndex * -24;
  const hazeX = shouldReduceMotion ? 0 : activeIndex * -12;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#050507]">
      <motion.div
        className="absolute inset-y-0 -left-10 -right-10"
        animate={{ x: panX, scale: shouldReduceMotion ? 1.01 : 1.065 }}
        transition={lobbyTransition}
      >
        <Image
          src={activeTab.background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 mix-blend-screen"
        animate={{ x: hazeX, opacity: shouldReduceMotion ? 0.18 : 0.35 }}
        transition={lobbyTransition}
        style={{
          background: `linear-gradient(105deg, transparent 0%, ${activeTab.accent}22 38%, transparent 68%)`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPositionX: shouldReduceMotion
            ? "50%"
            : `${48 + activeIndex * 2}%`,
        }}
        transition={lobbyTransition}
        style={{
          background: `radial-gradient(circle at 71% 48%, ${activeTab.accent}33 0%, transparent 29%), linear-gradient(90deg, rgba(3,4,7,.88), rgba(3,4,7,.32) 46%, rgba(3,4,7,.14) 100%)`,
        }}
      />
    </div>
  );
}
