"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
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

type GameControlTone = {
  badge: string;
  glow: string;
};

function getActionTone(actionLabel: string, keyLabel: string): GameControlTone {
  const action = `${actionLabel} ${keyLabel}`.toLowerCase();

  if (action.includes("prev") || action.includes("up")) {
    return {
      badge:
        "linear-gradient(180deg, rgba(180,245,255,0.96), rgba(41,151,255,0.92) 54%, rgba(18,70,190,0.96))",
      glow: "rgba(72, 190, 255, 0.42)",
    };
  }

  if (action.includes("next") || action.includes("dn")) {
    return {
      badge:
        "linear-gradient(180deg, rgba(218,255,155,0.96), rgba(74,219,94,0.92) 54%, rgba(21,126,66,0.96))",
      glow: "rgba(91, 238, 119, 0.4)",
    };
  }

  if (action.includes("back") || action.includes("bsp")) {
    return {
      badge:
        "linear-gradient(180deg, rgba(255,198,215,0.96), rgba(255,86,132,0.92) 54%, rgba(174,28,78,0.96))",
      glow: "rgba(255, 96, 150, 0.42)",
    };
  }

  return {
    badge:
      "linear-gradient(180deg, rgba(255,244,181,0.98), color-mix(in srgb, var(--mode-secondary), white 34%) 48%, color-mix(in srgb, var(--mode-accent), black 8%))",
    glow: "color-mix(in srgb, var(--mode-accent), transparent 56%)",
  };
}

function GameControlKey({
  actionLabel,
  hint,
  icon: Icon,
  keyLabel,
  onClick,
}: GameControlHudAction) {
  const actionTone = getActionTone(actionLabel, keyLabel);

  return (
    <motion.button
      type="button"
      aria-label={hint}
      title={hint}
      className="group relative inline-flex min-h-9 items-center gap-2 rounded-full px-1.5 py-1 text-white outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-10 sm:gap-2.5 sm:px-2"
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-70 group-focus-visible:opacity-70"
        style={{
          background: actionTone.glow,
        }}
      />
      <span
        aria-hidden="true"
        className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full text-white shadow-lg transition duration-200 group-hover:brightness-110 sm:size-9"
        style={
          {
            "--control-glow": actionTone.glow,
            background: actionTone.badge,
            boxShadow:
              "0 0 16px var(--control-glow), inset 0 1px 0 rgba(255,255,255,0.58), inset 0 -2px 5px rgba(0,0,0,0.34)",
          } as CSSProperties
        }
      >
        <span className="absolute inset-x-1 top-0.5 h-2 rounded-full bg-white/34 blur-[1px]" />
        <Icon className="size-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.42)] sm:size-[1.05rem]" strokeWidth={2.7} />
      </span>
      <span className="max-w-24 truncate text-left text-[0.72rem] font-semibold leading-none tracking-0 text-white/82 [text-shadow:0_2px_10px_rgba(0,0,0,0.72)] transition duration-200 group-hover:text-white sm:max-w-28 sm:text-[0.82rem]">
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
      className="absolute bottom-3 right-3 z-40 max-w-[calc(100vw-1.5rem)] sm:bottom-5 sm:right-5 sm:max-w-[calc(100vw-2.5rem)]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={lobbyTitleTransition}
    >
      <span className="sr-only">{label}</span>
      <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 rounded-full px-1 py-1 sm:gap-x-4">
        {actions.map((action) => (
          <GameControlKey key={action.hint} {...action} />
        ))}
      </div>
    </motion.nav>
  );
}
