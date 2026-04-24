"use client";

import { AnimatePresence } from "motion/react";
import type { CSSProperties } from "react";
import { AudioToggleButton } from "@/components/AudioToggleButton";
import { ModeProgressMarkers } from "@/components/ModeProgressMarkers";
import { ModeScene } from "@/components/ModeScene";
import { portfolioSections } from "@/lib/portfolio-content";

type Direction = 1 | -1;

type LobbySceneShellProps = {
  activeIndex: number;
  direction: Direction;
  isEntered: boolean;
  isMusicEnabled: boolean;
  isSwitching: boolean;
  onEnterMode: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
  onToggleMusic: () => void;
};

export function LobbySceneShell({
  activeIndex,
  direction,
  isEntered,
  isMusicEnabled,
  isSwitching,
  onEnterMode,
  onNextMode,
  onPreviousMode,
  onToggleMusic,
}: LobbySceneShellProps) {
  const activeSection = portfolioSections[activeIndex];

  return (
    <main
      aria-label="Cinematic portfolio menu"
      className="lobby-scene-shell"
      data-switching={isSwitching}
      style={
        {
          "--mode-accent": activeSection.accent,
          "--mode-secondary": activeSection.secondaryAccent,
        } as CSSProperties
      }
    >
      <AnimatePresence custom={direction} initial={false} mode="sync">
        <ModeScene
          key={activeSection.id}
          direction={direction}
          isEntered={isEntered}
          section={activeSection}
          onEnterMode={onEnterMode}
          onNextMode={onNextMode}
          onPreviousMode={onPreviousMode}
        />
      </AnimatePresence>

      <AudioToggleButton
        isEnabled={isMusicEnabled}
        onToggle={onToggleMusic}
      />

      <ModeProgressMarkers
        onEnterMode={onEnterMode}
        onNextMode={onNextMode}
        onPreviousMode={onPreviousMode}
      />
    </main>
  );
}
