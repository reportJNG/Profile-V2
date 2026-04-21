"use client";

import { AnimatePresence } from "motion/react";
import type { CSSProperties } from "react";
import { ModeProgressMarkers } from "@/components/ModeProgressMarkers";
import { ModeScene } from "@/components/ModeScene";
import { lobbyModes } from "@/lib/lobby-modes";

type Direction = 1 | -1;

type LobbySceneShellProps = {
  activeIndex: number;
  direction: Direction;
  isSwitching: boolean;
  onSelectMode: (index: number) => boolean;
};

export function LobbySceneShell({
  activeIndex,
  direction,
  isSwitching,
  onSelectMode,
}: LobbySceneShellProps) {
  const activeMode = lobbyModes[activeIndex];

  return (
    <main
      aria-label="Game Mode Select"
      className="lobby-scene-shell"
      data-switching={isSwitching}
      style={
        {
          "--mode-accent": activeMode.accent,
          "--mode-secondary": activeMode.secondaryAccent,
          "--mode-shadow": activeMode.shadowColor,
        } as CSSProperties
      }
    >
      <AnimatePresence custom={direction} initial={false} mode="sync">
        <ModeScene
          key={activeMode.id}
          activeIndex={activeIndex}
          direction={direction}
          mode={activeMode}
          total={lobbyModes.length}
        />
      </AnimatePresence>

      <ModeProgressMarkers
        activeIndex={activeIndex}
        modes={lobbyModes}
        onSelectMode={onSelectMode}
      />
    </main>
  );
}
