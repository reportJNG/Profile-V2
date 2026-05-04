"use client";

import { useEffect, useRef } from "react";
import { InventorySlot } from "@/components/project-inventory/InventorySlot";
import {
  projectIconMap,
  type ProjectItem,
} from "@/components/project-inventory/projectsData";

const colClassMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

type InventoryGridProps = {
  projects: readonly ProjectItem[];
  selectedIndex: number;
  columnCount?: number;
};

export function InventoryGrid({
  projects,
  selectedIndex,
  columnCount = 4,
}: InventoryGridProps) {
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedSlot = slotRefs.current[selectedIndex];
    const grid = gridRef.current;

    if (!selectedSlot || !grid) return;

    // Scroll within the grid container only, never the page
    const gridRect = grid.getBoundingClientRect();
    const slotRect = selectedSlot.getBoundingClientRect();

    const slotTopRelative = slotRect.top - gridRect.top + grid.scrollTop;
    const slotBottomRelative = slotTopRelative + slotRect.height;

    const visibleTop = grid.scrollTop;
    const visibleBottom = grid.scrollTop + grid.clientHeight;

    if (slotTopRelative < visibleTop) {
      grid.scrollTo({ top: slotTopRelative, behavior: "smooth" });
    } else if (slotBottomRelative > visibleBottom) {
      grid.scrollTo({
        top: slotBottomRelative - grid.clientHeight,
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const colClass = colClassMap[columnCount] ?? "grid-cols-4";

  return (
    <div
      ref={gridRef}
      className="mx-auto w-full overflow-y-auto lg:w-[min(100%,31.5rem)]"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className={`grid w-full ${colClass} gap-2.5 sm:gap-3 lg:gap-[clamp(0.58rem,0.72vw,0.8rem)]`}
        role="grid"
        aria-label="Project inventory slots"
      >
        {projects.map((project, index) => {
          const Icon = projectIconMap[project.icon] ?? null;

          return (
            <InventorySlot
              key={project.id}
              ref={(node) => {
                slotRefs.current[index] = node;
              }}
              icon={Icon}
              isSelected={selectedIndex === index}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
}