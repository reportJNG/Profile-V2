"use client";

import type { CSSProperties } from "react";
import type { LobbyMode } from "@/lib/lobby-modes";
import { cn } from "@/lib/utils";

type ModeProgressMarkersProps = {
  activeIndex: number;
  modes: readonly LobbyMode[];
  onSelectMode: (index: number) => boolean;
};

export function ModeProgressMarkers({
  activeIndex,
  modes,
  onSelectMode,
}: ModeProgressMarkersProps) {
  return (
    <div className="mode-progress" aria-label="Mode selection markers">
      {modes.map((mode, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            aria-current={isActive ? "true" : undefined}
            aria-label={`Select ${mode.title}`}
            className={cn("mode-progress__marker", isActive && "is-active")}
            key={mode.id}
            onClick={() => onSelectMode(index)}
            style={
              {
                "--marker-accent": mode.accent,
              } as CSSProperties
            }
            type="button"
          >
            <span className="mode-progress__mark" />
          </button>
        );
      })}
    </div>
  );
}
