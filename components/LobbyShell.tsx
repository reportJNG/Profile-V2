"use client";

import { useEffect } from "react";
import { LobbySceneShell } from "@/components/LobbySceneShell";
import { useLobbyAudio } from "@/lib/use-lobby-audio";
import { useModeSwitch } from "@/lib/use-mode-switch";

export function LobbyShell() {
  const lobbyAudio = useLobbyAudio();
  const { toggleMusic } = lobbyAudio;
  const modeSwitch = useModeSwitch({
    onModeChange: (direction, _index, source) =>
      lobbyAudio.playMoveSound(direction, source),
    onEnterMode: () => lobbyAudio.playEnterSound(),
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (modeSwitch.isEntered || event.code !== "Space") {
        return;
      }

      event.preventDefault();
      toggleMusic();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modeSwitch.isEntered, toggleMusic]);

  return (
    <LobbySceneShell
      activeIndex={modeSwitch.activeIndex}
      direction={modeSwitch.direction}
      isEntered={modeSwitch.isEntered}
      isSwitching={modeSwitch.isSwitching}
      isMusicEnabled={lobbyAudio.isMusicEnabled}
      onEnterMode={modeSwitch.enterMode}
      onNextMode={modeSwitch.goNext}
      onPreviousMode={modeSwitch.goPrevious}
      onToggleMusic={() => {
        toggleMusic();
        return true;
      }}
    />
  );
}
