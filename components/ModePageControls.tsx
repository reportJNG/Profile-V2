"use client";

import { ArrowDown, ArrowUp, Delete } from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";

type ModePageControlsProps = {
  onBack: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

export function ModePageControls({
  onBack,
  onNextMode,
  onPreviousMode,
}: ModePageControlsProps) {
  return (
    <GameControlHud
      ariaLabel="Portfolio page controls"
      label="Page keys"
      actions={[
        {
          actionLabel: "Prev",
          hint: "Previous portfolio page",
          icon: ArrowUp,
          keyLabel: "UP",
          onClick: onPreviousMode,
        },
        {
          actionLabel: "Next",
          hint: "Next portfolio page",
          icon: ArrowDown,
          keyLabel: "DN",
          onClick: onNextMode,
        },
        {
          actionLabel: "Back",
          hint: "Backspace to previous page",
          icon: Delete,
          keyLabel: "BSP",
          onClick: onBack,
          wide: true,
        },
      ]}
    />
  );
}
