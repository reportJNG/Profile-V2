"use client";

import { LobbySceneShell } from "@/components/LobbySceneShell";
import { useModeSwitch } from "@/lib/use-mode-switch";
import { useMenuSound } from "@/lib/use-menu-sound";

export function LobbyShell() {
  const playMenuSound = useMenuSound();
  const modeSwitch = useModeSwitch({
    onModeChange: () => playMenuSound(),
    onEnterMode: () => playMenuSound(),
  });

  return (
    <LobbySceneShell
      activeIndex={modeSwitch.activeIndex}
      direction={modeSwitch.direction}
      isEntered={modeSwitch.isEntered}
      isSwitching={modeSwitch.isSwitching}
      onEnterMode={modeSwitch.enterMode}
      onNextMode={modeSwitch.goNext}
      onPreviousMode={modeSwitch.goPrevious}
    />
  );
}
