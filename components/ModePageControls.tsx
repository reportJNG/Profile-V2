"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Delete,
  Space,
} from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";

type ModePageControlsProps = {
  panelAxis?: "horizontal" | "vertical";
  placement?: "absolute" | "fixed";
  onBack: () => boolean;
  onMusicToggle?: () => boolean;
  onNextPanel?: () => boolean;
  onPreviousPanel?: () => boolean;
};

export function ModePageControls({
  panelAxis = "vertical",
  placement,
  onBack,
  onMusicToggle,
  onNextPanel,
  onPreviousPanel,
}: ModePageControlsProps) {
  const isHorizontal = panelAxis === "horizontal";
  const panelActions =
    onPreviousPanel && onNextPanel
      ? [
          {
            actionLabel: "Previous",
            hint: "Previous page panel",
            icon: isHorizontal ? ArrowLeft : ArrowUp,
            keyLabel: isHorizontal ? "LEFT" : "UP",
            onClick: onPreviousPanel,
          },
          {
            actionLabel: "Next",
            hint: "Next page panel",
            icon: isHorizontal ? ArrowRight : ArrowDown,
            keyLabel: isHorizontal ? "RIGHT" : "DN",
            onClick: onNextPanel,
          },
        ]
      : [];
  const musicAction = onMusicToggle
    ? [
        {
          actionLabel: "Music",
          hint: "Space bar to toggle music",
          icon: Space,
          keyLabel: "SPACE",
          onClick: onMusicToggle,
        },
      ]
    : [];

  return (
    <GameControlHud
      ariaLabel="Portfolio page controls"
      label="Page keys"
      placement={placement}
      actions={[
        ...panelActions,
        ...musicAction,
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
