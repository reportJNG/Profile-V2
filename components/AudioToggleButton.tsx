"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { lobbyTitleTransition } from "@/lib/lobby-motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

type AudioToggleButtonProps = {
  isEnabled: boolean;
  onToggle: () => void;
};

export function AudioToggleButton({
  isEnabled,
  onToggle,
}: AudioToggleButtonProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const Icon = isEnabled ? Volume2 : VolumeX;

  return (
    <motion.button
      type="button"
      aria-label={isEnabled ? "Mute music" : "Unmute music"}
      title={isEnabled ? "Mute music" : "Unmute music"}
      aria-pressed={isEnabled}
      className="group absolute right-3 top-3 z-50 grid h-11 w-[5.05rem] grid-cols-[1.75rem_1fr] items-center gap-1 overflow-hidden border border-white/12 bg-black/36 px-1.5 text-white outline-none backdrop-blur-md transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/80 sm:right-5 sm:top-5 sm:h-12 sm:w-[5.45rem] lg:right-7 lg:top-7"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 46%, rgba(0,0,0,0.32)), rgba(5, 7, 14, 0.78)",
        borderColor:
          "color-mix(in srgb, var(--mode-secondary), transparent 74%)",
        boxShadow:
          "0 10px 20px rgba(0,0,0,0.32), 0 0 14px color-mix(in srgb, var(--mode-accent), transparent 86%), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.48)",
        clipPath:
          "polygon(0.32rem 0, calc(100% - 0.32rem) 0, 100% 0.32rem, 100% calc(100% - 0.28rem), calc(100% - 0.28rem) 100%, 0.28rem 100%, 0 calc(100% - 0.32rem), 0 0.28rem)",
      }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: isEnabled
          ? "drop-shadow(0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 64%))"
          : "drop-shadow(0 0 0 rgba(0,0,0,0))",
      }}
      transition={lobbyTitleTransition}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-1.5 top-0.5 h-px opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="relative grid size-7 place-items-center border border-white/12 sm:size-8"
        style={{
          background: isEnabled
            ? "linear-gradient(180deg, color-mix(in srgb, var(--mode-secondary), white 12%), color-mix(in srgb, var(--mode-accent), black 24%))"
            : "linear-gradient(180deg, rgba(104,108,116,0.86), rgba(18,20,27,0.94))",
          boxShadow: isEnabled
            ? "0 0 14px color-mix(in srgb, var(--mode-secondary), transparent 54%), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -2px 0 rgba(0,0,0,0.3)"
            : "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.46)",
          clipPath:
            "polygon(18% 0, 82% 0, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0 82%, 0 18%)",
        }}
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={2.7} />
      </span>
      <span className="relative grid min-w-0 gap-1">
        <span className="font-mono text-[0.52rem] font-black uppercase leading-none tracking-0 text-white/82 sm:text-[0.58rem]">
          Audio
        </span>
        <span className="flex items-center gap-1">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: isEnabled
                ? "color-mix(in srgb, var(--mode-secondary), white 12%)"
                : "rgba(255,255,255,0.26)",
              boxShadow: isEnabled
                ? "0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 30%)"
                : "none",
            }}
          />
          <span className="font-mono text-[0.45rem] font-black uppercase leading-none tracking-0 text-white/46 sm:text-[0.5rem]">
            {isEnabled ? "On" : "Off"}
          </span>
        </span>
      </span>
    </motion.button>
  );
}
