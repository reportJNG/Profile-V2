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
  "flex aspect-square min-w-0 flex-col items-center justify-center gap-2 border border-[rgba(215,176,87,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012)),rgba(0,0,0,0.34)] p-[clamp(0.85rem,1.4vw,1.18rem)] text-center text-[rgba(255,248,228,0.94)] transition-[border-color,box-shadow] duration-150 lg:gap-[0.45rem] lg:p-[clamp(0.46rem,0.68vw,0.66rem)]";
const selectedSlotClass =
  "border-[color:color-mix(in_srgb,#d6a94b,white_16%)] shadow-[0_0_0_1px_rgba(255,215,128,0.3),0_0_28px_rgba(245,186,68,0.46),inset_0_0_24px_rgba(214,169,75,0.18)]";
const lockedSlotClass = "text-[rgba(220,210,184,0.58)] opacity-[0.64]";
const iconClass =
  "size-[clamp(2rem,3vw,2.7rem)] shrink-0 text-[color:color-mix(in_srgb,#d6a94b,white_12%)] lg:size-[clamp(1.28rem,1.8vw,1.75rem)]";
const labelClass =
  "block max-w-full [overflow-wrap:anywhere] [font-family:var(--font-inventory-cinzel),serif] text-[clamp(0.76rem,1vw,0.92rem)] font-semibold leading-[1.15] tracking-0 text-[rgba(255,248,228,0.94)] lg:text-[clamp(0.58rem,0.72vw,0.68rem)] lg:leading-[1.12]";

export function InventorySlot({ icon: Icon, isSelected, project }: InventorySlotProps) {
  const isLocked = !project;

  return (
    <div
      aria-current={isSelected ? "true" : undefined}
      role="gridcell"
      className={[
        slotBaseClass,
        isSelected ? selectedSlotClass : "",
        isLocked ? lockedSlotClass : "",
      ].filter(Boolean).join(" ")}
    >
      {isLocked ? (
        <>
          <Lock
            aria-hidden="true"
            className="size-[clamp(2rem,3vw,2.7rem)] shrink-0 text-[rgba(220,210,184,0.58)] opacity-25 lg:size-[clamp(1.28rem,1.8vw,1.75rem)]"
            strokeWidth={1.8}
          />
          <span className={`${labelClass} text-[rgba(220,210,184,0.58)]`}>???</span>
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
