"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { lobbyTitleTransition } from "@/lib/lobby-motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

export type GameControlHudAction = {
  actionLabel: string;
  hint: string;
  icon: LucideIcon;
  keyLabel: string;
  onClick: () => boolean;
  wide?: boolean;
};

type GameControlHudProps = {
  actions: GameControlHudAction[];
  ariaLabel: string;
  label: string;
};

function GameControlKey({
  actionLabel,
  hint,
  icon: Icon,
  keyLabel,
  onClick,
  wide = false,
}: GameControlHudAction) {
  return (
    <motion.button
      type="button"
      aria-label={hint}
      title={hint}
      className={`group relative grid h-9 grid-rows-[1fr_auto] place-items-center overflow-hidden border border-white/12 bg-black/35 px-1 pb-0.5 pt-0.5 text-white/88 outline-none backdrop-blur-md transition hover:-translate-y-0.5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/75 sm:h-10 ${
        wide ? "w-[4.1rem] sm:w-[4.55rem]" : "w-[2.8rem] sm:w-[3.12rem]"
      }`}
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.105), rgba(255,255,255,0.02) 46%, rgba(0,0,0,0.34)), rgba(5, 7, 14, 0.78)",
        borderColor:
          "color-mix(in srgb, var(--mode-secondary), transparent 76%)",
        boxShadow:
          "0 5px 9px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -2px 0 rgba(0,0,0,0.52)",
        clipPath:
          "polygon(0.22rem 0, calc(100% - 0.22rem) 0, 100% 0.22rem, 100% calc(100% - 0.18rem), calc(100% - 0.18rem) 100%, 0.18rem 100%, 0 calc(100% - 0.22rem), 0 0.18rem)",
      }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-1 top-0.5 h-px opacity-55"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 10%), transparent)",
        }}
      />
      <span className="relative flex min-h-0 items-center gap-0.5">
        <Icon aria-hidden="true" className="size-3 sm:size-3.5" strokeWidth={2.8} />
        <span className="font-mono text-[0.48rem] font-black uppercase leading-none tracking-0 text-white/82 sm:text-[0.52rem]">
          {keyLabel}
        </span>
      </span>
      <span className="relative max-w-full truncate font-mono text-[0.43rem] font-black uppercase leading-none tracking-0 text-white/48 sm:text-[0.46rem]">
        {actionLabel}
      </span>
    </motion.button>
  );
}

export function GameControlHud({
  actions,
  ariaLabel,
  label,
}: GameControlHudProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <motion.nav
      aria-label={ariaLabel}
      className="absolute bottom-3 right-3 z-40 sm:bottom-5 sm:right-5"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={lobbyTitleTransition}
    >
      <div
        className="relative flex flex-col gap-0.5 overflow-hidden border border-white/10 bg-black/34 p-1 shadow-xl backdrop-blur-md"
        style={{
          boxShadow:
            "0 10px 20px rgba(0,0,0,0.32), 0 0 14px color-mix(in srgb, var(--mode-accent), transparent 86%)",
          clipPath:
            "polygon(0.32rem 0, calc(100% - 0.32rem) 0, 100% 0.32rem, 100% calc(100% - 0.28rem), calc(100% - 0.28rem) 100%, 0.28rem 100%, 0 calc(100% - 0.32rem), 0 0.28rem)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-2 top-0 h-px opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 8%), transparent)",
          }}
        />
        <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
          <span className="font-mono text-[0.45rem] font-black uppercase leading-none tracking-0 text-white/54 sm:text-[0.48rem]">
            {label}
          </span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full"
            style={{
              background:
                "color-mix(in srgb, var(--mode-secondary), white 14%)",
              boxShadow:
                "0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 28%)",
            }}
          />
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {actions.map((action) => (
            <GameControlKey key={action.hint} {...action} />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
