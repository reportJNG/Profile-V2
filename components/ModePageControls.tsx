"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CornerDownLeft,
  Delete,
  Space,
} from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";

type ModePageControlsProps = {
  panelAxis?: "both" | "horizontal" | "vertical";
  placement?: "absolute" | "fixed";
  onActivatePanel?: () => boolean;
  onBack: () => boolean;
  onMoveDownPanel?: () => boolean;
  onMoveLeftPanel?: () => boolean;
  onMoveRightPanel?: () => boolean;
  onMoveUpPanel?: () => boolean;
  isMusicMouseClickable?: boolean;
  onMusicToggle?: () => boolean;
  onNextPanel?: () => boolean;
  onPreviousPanel?: () => boolean;
};

export function ModePageControls({
  panelAxis = "vertical",
  placement,
  onActivatePanel,
  onBack,
  onMoveDownPanel,
  onMoveLeftPanel,
  onMoveRightPanel,
  onMoveUpPanel,
  isMusicMouseClickable = true,
  onMusicToggle,
  onNextPanel,
  onPreviousPanel,
}: ModePageControlsProps) {
  const isHorizontal = panelAxis === "horizontal";
  const isBoth = panelAxis === "both";
  const panelActions =
    onPreviousPanel && onNextPanel && isBoth
      ? [
          {
            actionLabel: "Left",
            hint: "Previous page panel",
            icon: ArrowLeft,
            keyLabel: "LEFT",
            onClick: onMoveLeftPanel ?? onPreviousPanel,
          },
          {
            actionLabel: "Up",
            hint: "Previous page panel",
            icon: ArrowUp,
            keyLabel: "UP",
            onClick: onMoveUpPanel ?? onPreviousPanel,
          },
          {
            actionLabel: "Right",
            hint: "Next page panel",
            icon: ArrowRight,
            keyLabel: "RIGHT",
            onClick: onMoveRightPanel ?? onNextPanel,
          },
          {
            actionLabel: "Down",
            hint: "Next page panel",
            icon: ArrowDown,
            keyLabel: "DN",
            onClick: onMoveDownPanel ?? onNextPanel,
          },
        ]
      : onPreviousPanel && onNextPanel
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
  const enterAction = onActivatePanel
    ? [
        {
          actionLabel: "Open",
          hint: "Enter to open selected page panel",
          icon: CornerDownLeft,
          keyLabel: "ENTER",
          onClick: onActivatePanel,
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
          mouseClickable: isMusicMouseClickable,
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
        ...enterAction,
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
