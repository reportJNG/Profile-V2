"use client";

import { forwardRef } from "react";
import { Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProjectItem } from "@/components/project-inventory/projectsData";

type InventorySlotProps = {
  icon: LucideIcon | null;
  isSelected: boolean;
  project?: ProjectItem;
};

const slotBaseClass =
  "group relative flex aspect-square min-w-0 scroll-mb-28 scroll-mt-24 flex-col items-center justify-center gap-2.5 overflow-hidden border border-[color-mix(in_srgb,var(--mode-secondary),transparent_78%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.072),rgba(255,255,255,0.014)),radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--mode-secondary),transparent_88%),transparent_48%),rgba(0,0,0,0.34)] p-[clamp(0.78rem,1.55vw,1.18rem)] text-center text-[rgba(247,255,232,0.94)] shadow-[inset_0_-5px_12px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,box-shadow,transform,background-color] duration-150 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--mode-secondary),white_6%)] hover:shadow-[0_10px_22px_rgba(0,0,0,0.22),0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_76%),inset_0_1px_0_rgba(255,255,255,0.12)] lg:gap-[0.68rem] lg:p-[clamp(0.72rem,0.95vw,1rem)]";
const selectedSlotClass =
  "border-[color-mix(in_srgb,var(--mode-secondary),white_20%)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--mode-secondary),transparent_38%),0_0_30px_color-mix(in_srgb,var(--mode-secondary),transparent_46%),inset_0_0_28px_color-mix(in_srgb,var(--mode-accent),transparent_76%)]";
const lockedSlotClass = "text-white/34 opacity-[0.58]";
const iconClass =
  "relative z-[1] size-[clamp(2.15rem,3.35vw,2.9rem)] shrink-0 text-[color-mix(in_srgb,var(--mode-secondary),white_18%)] drop-shadow-[0_0_12px_color-mix(in_srgb,var(--mode-secondary),transparent_52%)] transition group-hover:scale-105 lg:size-[clamp(1.95rem,2.2vw,2.35rem)]";
const labelClass =
  "relative z-[1] block max-w-full [overflow-wrap:anywhere] [font-family:var(--font-heading),var(--font-geist-sans),sans-serif] text-[clamp(0.78rem,1.05vw,0.95rem)] font-black uppercase leading-[1.1] tracking-0 text-[rgba(247,255,232,0.94)] lg:text-[clamp(0.72rem,0.86vw,0.9rem)]";

export const InventorySlot = forwardRef<HTMLDivElement, InventorySlotProps>(
  function InventorySlot({ icon: Icon, isSelected, project }, ref) {
    const isLocked = !project;

    return (
      <div
        ref={ref}
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
              <Icon
                aria-hidden="true"
                className={iconClass}
                strokeWidth={1.8}
              />
            ) : null}
            <span className={labelClass}>{project.title}</span>
          </>
        )}
      </div>
    );
  },
);
