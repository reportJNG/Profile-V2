"use client";

import { BadgeCheck, Gamepad2, Gauge, Globe, Terminal, UserRound } from "lucide-react";
import { InventorySlot } from "@/components/project-inventory/InventorySlot";

const slotCount = 12;

const iconMap = {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
};

export function InventoryGrid({ projects, selectedIndex }) {
  return (
    <div className="inventory-grid" role="grid" aria-label="Project inventory slots">
      {Array.from({ length: slotCount }, (_, index) => {
        const project = projects[index];
        const Icon = project ? iconMap[project.icon] || Globe : null;

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
