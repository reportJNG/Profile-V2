"use client";

import { LobbySceneShell } from "@/components/LobbySceneShell";
import { useModeSwitch } from "@/lib/use-mode-switch";
import { useMenuSound } from "@/lib/use-menu-sound";

export function LobbyShell() {
  const playMenuSound = useMenuSound();
  const modeSwitch = useModeSwitch({
    onModeChange: () => playMenuSound(),
  });

  return (
    <LobbySceneShell
      activeIndex={modeSwitch.activeIndex}
      direction={modeSwitch.direction}
      isSwitching={modeSwitch.isSwitching}
      onSelectMode={modeSwitch.selectMode}
    />
  );
}
