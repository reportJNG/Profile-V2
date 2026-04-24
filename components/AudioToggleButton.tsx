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
      aria-pressed={!isEnabled}
      className="group absolute right-4 top-4 z-50 grid h-14 w-[4.9rem] place-items-center overflow-hidden border border-white/14 bg-black/34 text-white outline-none backdrop-blur-md transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/80 sm:right-6 sm:top-6 sm:h-16 sm:w-[5.55rem] lg:right-8 lg:top-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.13), rgba(255,255,255,0.03) 38%, rgba(0,0,0,0.25)), rgba(5, 7, 14, 0.82)",
        borderColor:
          "color-mix(in srgb, var(--mode-secondary), transparent 64%)",
        boxShadow:
          "0 12px 22px rgba(0,0,0,0.34), 0 0 22px color-mix(in srgb, var(--mode-secondary), transparent 68%), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -4px 0 rgba(0,0,0,0.48)",
        clipPath:
          "polygon(0.55rem 0, calc(100% - 0.55rem) 0, 100% 0.55rem, 100% calc(100% - 0.45rem), calc(100% - 0.45rem) 100%, 0.45rem 100%, 0 calc(100% - 0.55rem), 0 0.45rem)",
      }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: isEnabled
          ? "drop-shadow(0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 54%))"
          : "drop-shadow(0 0 0 rgba(0,0,0,0))",
      }}
      transition={lobbyTitleTransition}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-1 border border-white/10"
        style={{
          clipPath:
            "polygon(0.35rem 0, calc(100% - 0.35rem) 0, 100% 0.35rem, 100% calc(100% - 0.35rem), calc(100% - 0.35rem) 100%, 0.35rem 100%, 0 calc(100% - 0.35rem), 0 0.35rem)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-3 inset-y-2 border border-black/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 30%), linear-gradient(180deg, rgba(4,8,14,0.74), rgba(3,4,8,0.9))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -2px 0 rgba(0,0,0,0.42)",
          clipPath:
            "polygon(0.38rem 0, calc(100% - 0.38rem) 0, 100% 0.38rem, 100% calc(100% - 0.38rem), calc(100% - 0.38rem) 100%, 0.38rem 100%, 0 calc(100% - 0.38rem), 0 0.38rem)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-2 top-1 h-px opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 12%), transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute left-1.5 top-1.5 size-1.5 rounded-full border border-white/10 bg-black/48"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute right-1.5 top-1.5 size-1.5 rounded-full border border-white/10 bg-black/48"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute left-2.5 top-[1.05rem] grid grid-cols-2 gap-0.5 sm:left-3"
      >
        <span
          className="block size-1 rounded-[1px]"
          style={{
            background: isEnabled
              ? "color-mix(in srgb, var(--mode-secondary), white 10%)"
              : "rgba(255,255,255,0.24)",
            boxShadow: isEnabled
              ? "0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 38%)"
              : "none",
          }}
        />
        <span className="block size-1 rounded-[1px] bg-white/20" />
        <span className="block size-1 rounded-[1px] bg-white/16" />
        <span
          className="block size-1 rounded-[1px]"
          style={{
            background: isEnabled
              ? "rgba(255,255,255,0.22)"
              : "rgba(255,255,255,0.12)",
          }}
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[0.7rem] left-2.5 flex h-5 w-2 items-end gap-[2px] sm:left-3"
      >
        {[0.35, 0.62, 0.9].map((height, index) => (
          <span
            key={height}
            className="block w-[2px] rounded-full transition-all"
            style={{
              height: isEnabled
                ? `${height * 100}%`
                : `${(0.28 + index * 0.08) * 100}%`,
              background: isEnabled
                ? "color-mix(in srgb, var(--mode-secondary), white 12%)"
                : "rgba(255,255,255,0.24)",
              boxShadow: isEnabled
                ? "0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 40%)"
                : "none",
            }}
          />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-y-2 right-[0.55rem] w-px opacity-44"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--mode-secondary), white 10%), transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -inset-6 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 58% 42%, color-mix(in srgb, var(--mode-secondary), transparent 56%), transparent 45%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute right-[0.62rem] grid size-10 place-items-center border shadow-lg transition sm:right-[0.72rem] sm:size-11"
        style={{
          background: isEnabled
            ? "radial-gradient(circle at 38% 26%, rgba(255,255,255,0.52), transparent 22%), linear-gradient(180deg, color-mix(in srgb, var(--mode-secondary), white 16%), color-mix(in srgb, var(--mode-accent), black 2%) 58%, color-mix(in srgb, var(--mode-accent), black 30%))"
            : "radial-gradient(circle at 38% 26%, rgba(255,255,255,0.24), transparent 23%), linear-gradient(180deg, rgba(104,108,116,0.92), rgba(41,44,53,0.96) 58%, rgba(14,16,22,0.98))",
          borderColor: isEnabled
            ? "color-mix(in srgb, var(--mode-secondary), white 14%)"
            : "rgba(255,255,255,0.2)",
          boxShadow: isEnabled
            ? "0 0 18px color-mix(in srgb, var(--mode-secondary), transparent 40%), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -2px 0 rgba(0,0,0,0.28)"
            : "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.45)",
          clipPath:
            "polygon(20% 0, 80% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 80%, 0 20%)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[3px] border border-black/24"
          style={{
            clipPath:
              "polygon(18% 0, 82% 0, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0 82%, 0 18%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-2 top-1.5 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent)",
          }}
        />
        {isEnabled ? (
          <>
            <span className="absolute left-[0.62rem] top-[0.82rem] size-1.5 rounded-[0.12rem] bg-black/78 shadow-[0_0_7px_rgba(0,0,0,0.35)] sm:left-[0.72rem] sm:top-[0.92rem]" />
            <span className="absolute right-[0.62rem] top-[0.82rem] size-1.5 rounded-[0.12rem] bg-black/78 shadow-[0_0_7px_rgba(0,0,0,0.35)] sm:right-[0.72rem] sm:top-[0.92rem]" />
            <span className="absolute bottom-[0.68rem] h-2 w-4 rounded-b-full border-b-2 border-black/76 sm:bottom-[0.78rem]" />
            <span
              className="absolute -right-1 top-1/2 h-3 w-1 -translate-y-1/2"
              style={{
                background:
                  "color-mix(in srgb, var(--mode-secondary), white 10%)",
                boxShadow:
                  "0 0 8px color-mix(in srgb, var(--mode-secondary), transparent 38%)",
                clipPath: "polygon(0 0, 100% 28%, 100% 72%, 0 100%)",
              }}
            />
          </>
        ) : (
          <>
            <span className="absolute left-[0.56rem] top-[0.76rem] h-2.5 w-2.5 sm:left-[0.66rem] sm:top-[0.86rem]">
              <span className="absolute left-1/2 top-0 h-2.5 w-0.5 -translate-x-1/2 rotate-45 rounded-full bg-black/74" />
              <span className="absolute left-1/2 top-0 h-2.5 w-0.5 -translate-x-1/2 -rotate-45 rounded-full bg-black/74" />
            </span>
            <span className="absolute right-[0.56rem] top-[0.76rem] h-2.5 w-2.5 sm:right-[0.66rem] sm:top-[0.86rem]">
              <span className="absolute left-1/2 top-0 h-2.5 w-0.5 -translate-x-1/2 rotate-45 rounded-full bg-black/74" />
              <span className="absolute left-1/2 top-0 h-2.5 w-0.5 -translate-x-1/2 -rotate-45 rounded-full bg-black/74" />
            </span>
            <span className="absolute bottom-[0.86rem] h-0.5 w-4 rounded-full bg-black/72" />
            <span
              className="absolute -right-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-white/16"
              style={{
                clipPath: "polygon(0 0, 100% 28%, 100% 72%, 0 100%)",
              }}
            />
          </>
        )}
        <Icon
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 size-4 rounded-[0.18rem] border border-white/12 bg-black/82 p-0.5 text-white shadow-md sm:size-[1.15rem]"
          strokeWidth={2.8}
        />
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 right-3 h-0.5 w-8 rounded-full"
        style={{
          background: isEnabled
            ? "linear-gradient(90deg, transparent, color-mix(in srgb, var(--mode-secondary), white 12%), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 left-3 h-0.5 w-5 rounded-full opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
        }}
      />
    </motion.button>
  );
}
