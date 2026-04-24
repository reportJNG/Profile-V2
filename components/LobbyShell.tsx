"use client";

import { LobbySceneShell } from "@/components/LobbySceneShell";
import { useLobbyAudio } from "@/lib/use-lobby-audio";
import { useModeSwitch } from "@/lib/use-mode-switch";

export function LobbyShell() {
  const lobbyAudio = useLobbyAudio();
  const modeSwitch = useModeSwitch({
    onModeChange: (direction, _index, source) =>
      lobbyAudio.playMoveSound(direction, source),
    onEnterMode: () => lobbyAudio.playEnterSound(),
  });

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
      onToggleMusic={lobbyAudio.toggleMusic}
    />
  );
}
