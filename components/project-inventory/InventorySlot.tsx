"use client";

import { Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProjectItem } from "@/components/project-inventory/projectsData";

type InventorySlotProps = {
  icon: LucideIcon | null;
  isSelected: boolean;
  project?: ProjectItem;
};

const slotBaseClass =
  "group relative flex aspect-square min-w-0 flex-col items-center justify-center gap-2 overflow-hidden border border-[color-mix(in_srgb,var(--mode-secondary),transparent_78%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.072),rgba(255,255,255,0.014)),radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--mode-secondary),transparent_88%),transparent_48%),rgba(0,0,0,0.34)] p-[clamp(0.72rem,1.5vw,1.1rem)] text-center text-[rgba(247,255,232,0.94)] shadow-[inset_0_-5px_12px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow,transform,background-color] duration-150 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--mode-secondary),white_6%)] hover:shadow-[0_10px_22px_rgba(0,0,0,0.22),0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_76%),inset_0_1px_0_rgba(255,255,255,0.12)] lg:gap-[0.55rem] lg:p-[clamp(0.64rem,0.82vw,0.86rem)]";
const selectedSlotClass =
  "border-[color-mix(in_srgb,var(--mode-secondary),white_20%)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--mode-secondary),transparent_38%),0_0_30px_color-mix(in_srgb,var(--mode-secondary),transparent_46%),inset_0_0_28px_color-mix(in_srgb,var(--mode-accent),transparent_76%)]";
const lockedSlotClass = "text-white/34 opacity-[0.58]";
const iconClass =
  "relative z-[1] size-[clamp(2.05rem,3.2vw,2.7rem)] shrink-0 text-[color-mix(in_srgb,var(--mode-secondary),white_18%)] drop-shadow-[0_0_12px_color-mix(in_srgb,var(--mode-secondary),transparent_52%)] transition group-hover:scale-105 lg:size-[clamp(1.75rem,2vw,2.15rem)]";
const labelClass =
  "relative z-[1] block max-w-full [overflow-wrap:anywhere] [font-family:var(--font-heading),var(--font-geist-sans),sans-serif] text-[clamp(0.74rem,1vw,0.9rem)] font-black uppercase leading-[1.08] tracking-0 text-[rgba(247,255,232,0.94)] lg:text-[clamp(0.68rem,0.78vw,0.82rem)]";

export function InventorySlot({ icon: Icon, isSelected, project }: InventorySlotProps) {
  const isLocked = !project;

  return (
    <div
      aria-current={isSelected ? "true" : undefined}
      aria-selected={isSelected}
      role="gridcell"
      className={[
        slotBaseClass,
        isSelected ? selectedSlotClass : "",
        isLocked ? lockedSlotClass : "",
      ].filter(Boolean).join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.11)_42%,transparent_66%)] opacity-0 transition-opacity duration-150 group-hover:opacity-70"
      />
      {isSelected ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 border border-[color-mix(in_srgb,var(--mode-secondary),white_14%)] shadow-[inset_0_0_16px_color-mix(in_srgb,var(--mode-secondary),transparent_72%)]"
        />
      ) : null}
      {isLocked ? (
        <>
          <Lock
            aria-hidden="true"
            className="relative z-[1] size-[clamp(2rem,3vw,2.55rem)] shrink-0 text-white/38 opacity-30 lg:size-[clamp(1.65rem,1.8vw,2rem)]"
            strokeWidth={1.8}
          />
          <span className={`${labelClass} text-white/38`}>Locked</span>
        </>
      ) : (
        <>
          {Icon ? (
            <Icon aria-hidden="true" className={iconClass} strokeWidth={1.8} />
          ) : null}
          <span className={labelClass}>{project.title}</span>
        </>
      )}
    </div>
  );
}
