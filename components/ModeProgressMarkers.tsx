"use client";

import { ArrowDown, ArrowUp, CornerDownLeft, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { lobbyTitleTransition } from "@/lib/lobby-motion";

type ModeProgressMarkersProps = {
  activeIndex: number;
  isEntered: boolean;
  modes: readonly PortfolioSection[];
  onEnterMode: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

type ControlKeyProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => boolean;
};

function ControlKey({ icon: Icon, label, onClick }: ControlKeyProps) {
  return (
    <motion.button
      type="button"
      className="group relative flex min-h-11 items-center gap-2 overflow-hidden rounded-[0.65rem] border border-white/15 bg-black/35 px-3 py-2 font-mono text-[0.68rem] font-black uppercase tracking-[0.13em] text-white/90 outline-none backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/75"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--mode-accent), transparent 84%), rgba(4, 7, 15, 0.86) 58%, color-mix(in srgb, var(--mode-secondary), transparent 88%))",
        borderColor: "color-mix(in srgb, var(--mode-secondary), transparent 70%)",
        boxShadow:
          "0 12px 22px rgba(0, 0, 0, 0.3), 0 0 22px color-mix(in srgb, var(--mode-accent), transparent 84%), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -3px 0 rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-2 top-1 h-px opacity-65"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 10%), transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-md border border-white/10 bg-white/10 transition group-hover:scale-105"
      >
        <Icon
          aria-hidden="true"
          className="size-4"
          strokeWidth={2.5}
          style={{
            color: "color-mix(in srgb, var(--mode-secondary), white 12%)",
            filter:
              "drop-shadow(0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 44%))",
          }}
        />
      </span>
      <span className="relative leading-none">{label}</span>
    </motion.button>
  );
}

export function ModeProgressMarkers({
  activeIndex,
  isEntered,
  modes,
  onEnterMode,
  onNextMode,
  onPreviousMode,
}: ModeProgressMarkersProps) {
  const shouldReduceMotion = useReducedMotion();
  const activeMode = modes[activeIndex];

  return (
    <motion.nav
      aria-label="Game mode controls"
      className="absolute bottom-4 right-4 z-40 w-[min(21rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={lobbyTitleTransition}
    >
      <div className="relative overflow-hidden rounded-[0.85rem] border border-white/12 bg-black/30 p-3 shadow-2xl backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 10%), transparent)",
          }}
        />
        <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/55">
          <span className="flex items-center gap-2">
            <Gamepad2
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={2.4}
              style={{ color: "color-mix(in srgb, var(--mode-secondary), white 8%)" }}
            />
            Controls
          </span>
          <span className="text-white/45">
            {String(activeIndex + 1).padStart(2, "0")} / {String(modes.length).padStart(2, "0")}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ControlKey icon={ArrowUp} label="Up" onClick={onPreviousMode} />
          <ControlKey icon={ArrowDown} label="Down" onClick={onNextMode} />
          <ControlKey icon={CornerDownLeft} label="Enter" onClick={onEnterMode} />
        </div>
        <div className="mt-2 truncate font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/45">
          {isEntered ? "Selected" : "Current"}:{" "}
          <span
            style={{ color: "color-mix(in srgb, var(--mode-secondary), white 12%)" }}
          >
            {activeMode.kicker}
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
