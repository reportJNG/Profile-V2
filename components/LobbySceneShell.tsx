"use client";

import { AnimatePresence } from "motion/react";
import type { CSSProperties } from "react";
import { ModeProgressMarkers } from "@/components/ModeProgressMarkers";
import { ModeScene } from "@/components/ModeScene";
import { portfolioSections } from "@/lib/portfolio-content";

type Direction = 1 | -1;

type LobbySceneShellProps = {
  activeIndex: number;
  direction: Direction;
  isEntered: boolean;
  isSwitching: boolean;
  onEnterMode: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

export function LobbySceneShell({
  activeIndex,
  direction,
  isEntered,
  isSwitching,
  onEnterMode,
  onNextMode,
  onPreviousMode,
}: LobbySceneShellProps) {
  const activeSection = portfolioSections[activeIndex];

  return (
    <main
      aria-label="Game style portfolio menu"
      className="lobby-scene-shell"
      data-switching={isSwitching}
      style={
        {
          "--mode-accent": activeSection.accent,
          "--mode-secondary": activeSection.secondaryAccent,
          "--mode-shadow": activeSection.shadowColor,
        } as CSSProperties
      }
    >
      <AnimatePresence custom={direction} initial={false} mode="sync">
        <ModeScene
          key={activeSection.id}
          direction={direction}
          isEntered={isEntered}
          mode={activeSection}
          onEnterMode={onEnterMode}
          onNextMode={onNextMode}
          onPreviousMode={onPreviousMode}
        />
      </AnimatePresence>

      <ModeProgressMarkers
        activeIndex={activeIndex}
        isEntered={isEntered}
        modes={portfolioSections}
        onEnterMode={onEnterMode}
        onNextMode={onNextMode}
        onPreviousMode={onPreviousMode}
      />
    </main>
  );
}
