"use client";

import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

export function SelectTechModeHeading() {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <motion.header
      aria-label="Select tech mode"
      className="absolute left-3 top-3 z-30 max-w-[calc(100vw-6.2rem)] overflow-hidden border border-white/10 bg-[#050812]/64 px-4 py-2.5 shadow-xl backdrop-blur-md [box-shadow:0_12px_28px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] sm:left-5 sm:top-5 sm:max-w-[calc(100vw-7.5rem)] lg:left-7 lg:top-7"
      style={{
        clipPath:
          "polygon(0.32rem 0, calc(100% - 0.32rem) 0, 100% 0.32rem, 100% calc(100% - 0.28rem), calc(100% - 0.28rem) 100%, 0.28rem 100%, 0 calc(100% - 0.32rem), 0 0.28rem)",
      }}
      initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -22 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-3 top-0 h-px opacity-90"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 10%), color-mix(in srgb, var(--mode-accent), white 4%), transparent)",
        }}
      />
      <span className="relative block font-mono text-[0.68rem] font-black uppercase leading-none tracking-0 text-white/88 [text-shadow:0_0_12px_color-mix(in_srgb,var(--mode-secondary),transparent_58%),0_2px_10px_rgba(0,0,0,0.55)] sm:text-xs">
        select tech mode
      </span>
    </motion.header>
  );
}
