"use client";

import { Lock } from "lucide-react";

export function InventorySlot({ icon: Icon, isSelected, project }) {
  const isLocked = !project;

  return (
    <div
      aria-current={isSelected ? "true" : undefined}
      className={[
        "inventory-slot",
        isSelected ? "inventory-slot--selected" : "",
        isLocked ? "inventory-slot--locked" : "",
      ].join(" ")}
    >
      {isLocked ? (
        <>
          <Lock aria-hidden="true" size={34} strokeWidth={1.8} />
          <span>???</span>
        </>
      ) : (
        <>
          <Icon aria-hidden="true" size={34} strokeWidth={1.8} />
          <span>{project.title}</span>
        </>
      )}
    </div>
  );
}
