"use client";

import { InventorySlot } from "@/components/project-inventory/InventorySlot";
import {
  projectIconMap,
  type ProjectItem,
} from "@/components/project-inventory/projectsData";

const slotCount = 12;

type InventoryGridProps = {
  projects: readonly ProjectItem[];
  selectedIndex: number;
};

export function InventoryGrid({ projects, selectedIndex }: InventoryGridProps) {
  return (
    <div
      className="mx-auto grid w-full grid-cols-3 gap-2.5 sm:gap-3 lg:w-[min(100%,35.5rem)] lg:gap-[clamp(0.7rem,0.86vw,0.95rem)]"
      role="grid"
      aria-label="Project inventory slots"
    >
      {Array.from({ length: slotCount }, (_, index) => {
        const project = projects[index];
        const Icon = project ? projectIconMap[project.icon] : null;

        return (
          <InventorySlot
            key={project?.id ?? `locked-${index}`}
            icon={Icon}
            isSelected={selectedIndex === index}
            project={project}
          />
        );
      })}
    </div>
  );
}
