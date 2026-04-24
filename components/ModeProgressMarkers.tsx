"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { lobbyTitleTransition } from "@/lib/lobby-motion";

type ModeProgressMarkersProps = {
  onEnterMode: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

type ControlKeyProps = {
  icon: LucideIcon;
  hint: string;
  onClick: () => boolean;
};

function ControlKey({ icon: Icon, hint, onClick }: ControlKeyProps) {
  return (
    <motion.button
      type="button"
      aria-label={hint}
      title={hint}
      className="group relative grid size-11 place-items-center overflow-hidden rounded-[0.42rem] border border-white/14 bg-black/30 text-white/88 outline-none backdrop-blur-md transition hover:-translate-y-0.5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/75"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02)), rgba(5, 7, 14, 0.72)",
        borderColor: "color-mix(in srgb, var(--mode-secondary), transparent 76%)",
        boxShadow:
          "0 8px 14px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.34)",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-1.5 top-1 h-px opacity-55"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
        }}
      />
      <Icon aria-hidden="true" className="relative size-5" strokeWidth={2.6} />
    </motion.button>
  );
}

export function ModeProgressMarkers({
  onEnterMode,
  onNextMode,
  onPreviousMode,
}: ModeProgressMarkersProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Portfolio section controls"
      className="absolute bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={lobbyTitleTransition}
    >
      <div className="relative flex items-center gap-1.5 overflow-hidden rounded-[0.6rem] border border-white/10 bg-black/24 p-1.5 shadow-xl backdrop-blur-md">
        <div
          aria-hidden="true"
          className="absolute inset-x-2 top-0 h-px opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
          }}
        />
        <ControlKey icon={ArrowUp} hint="Previous section" onClick={onPreviousMode} />
        <ControlKey icon={ArrowDown} hint="Next section" onClick={onNextMode} />
        <ControlKey icon={CornerDownLeft} hint="Open selected section" onClick={onEnterMode} />
      </div>
    </motion.nav>
  );
}
