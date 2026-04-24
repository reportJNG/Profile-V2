"use client";

import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

export function SelectTechModeHeading() {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <motion.header
      aria-label="Select tech mode"
      className="absolute left-4 top-4 z-30 max-w-[calc(100vw-6.5rem)] overflow-hidden rounded-md border border-white/12 bg-[#050812]/70 px-5 py-3 shadow-2xl backdrop-blur-md [box-shadow:0_18px_46px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.13)] sm:left-8 sm:top-6 sm:max-w-[calc(100vw-8rem)] lg:left-14 lg:top-8"
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
      <span className="relative block font-mono text-sm font-black uppercase leading-none tracking-[0.26em] text-white [text-shadow:0_0_16px_color-mix(in_srgb,var(--mode-secondary),transparent_48%),0_2px_12px_rgba(0,0,0,0.55)] sm:text-base">
        select tech mode
      </span>
    </motion.header>
  );
}
