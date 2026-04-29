"use client";

import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";

type ModeProgressMarkersProps = {
  onEnterMode: () => boolean;
  onNextMode: () => boolean;
  onPreviousMode: () => boolean;
};

export function ModeProgressMarkers({
  onEnterMode,
  onNextMode,
  onPreviousMode,
}: ModeProgressMarkersProps) {
  return (
    <GameControlHud
      ariaLabel="Portfolio section controls"
      label="Mode keys"
      actions={[
        {
          actionLabel: "Previous",
          hint: "Previous section",
          icon: ArrowUp,
          keyLabel: "UP",
          onClick: onPreviousMode,
        },
        {
          actionLabel: "Next",
          hint: "Next section",
          icon: ArrowDown,
          keyLabel: "DN",
          onClick: onNextMode,
        },
        {
          actionLabel: "Open",
          hint: "Open selected section",
          icon: CornerDownLeft,
          keyLabel: "ENT",
          onClick: onEnterMode,
          wide: true,
        },
      ]}
    />
  );
}
