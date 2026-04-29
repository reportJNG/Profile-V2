"use client";

import { ArrowDown, ArrowUp, Delete } from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";

type ModePageControlsProps = {
  onBack: () => boolean;
  onNextPanel?: () => boolean;
  onPreviousPanel?: () => boolean;
};

export function ModePageControls({
  onBack,
  onNextPanel,
  onPreviousPanel,
}: ModePageControlsProps) {
  const panelActions =
    onPreviousPanel && onNextPanel
      ? [
          {
            actionLabel: "Previous",
            hint: "Previous page panel",
            icon: ArrowUp,
            keyLabel: "UP",
            onClick: onPreviousPanel,
          },
          {
            actionLabel: "Next",
            hint: "Next page panel",
            icon: ArrowDown,
            keyLabel: "DN",
            onClick: onNextPanel,
          },
        ]
      : [];

  return (
    <GameControlHud
      ariaLabel="Portfolio page controls"
      label="Page keys"
      actions={[
        ...panelActions,
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
