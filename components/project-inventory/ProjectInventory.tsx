"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Backpack,
  CornerDownLeft,
  Delete,
} from "lucide-react";
import { GameControlHud } from "@/components/GameControlHud";
import { InventoryGrid } from "@/components/project-inventory/InventoryGrid";
import { ProjectDetail } from "@/components/project-inventory/ProjectDetail";
import {
  projectsData,
  type ProjectItem,
} from "@/components/project-inventory/projectsData";
import { useInventoryNavigation } from "@/components/project-inventory/useInventoryNavigation";
import { useLobbyAudio } from "@/lib/use-lobby-audio";

const slotCount = 12;
const columnCount = 3;
const fadeDurationMs = 150;
const inventoryFocusPulseMs = 620;

type ProjectInventoryProps = {
  onBack?: () => boolean;
};

const inventoryShellClass =
  "project-inventory-shell relative mx-auto grid h-auto min-h-0 w-full max-w-[62rem] overflow-hidden border border-[color-mix(in_srgb,var(--mode-secondary),transparent_52%)] bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--mode-secondary),transparent_86%),transparent_34%),radial-gradient(circle_at_16%_88%,color-mix(in_srgb,var(--mode-accent),transparent_82%),transparent_38%),linear-gradient(135deg,rgba(1,8,5,0.72),rgba(4,12,8,0.9)_58%,rgba(0,0,0,0.78))] [clip-path:polygon(0.9rem_0,calc(100%_-_0.9rem)_0,100%_0.9rem,100%_calc(100%_-_0.9rem),calc(100%_-_0.9rem)_100%,0.9rem_100%,0_calc(100%_-_0.9rem),0_0.9rem)] [font-family:var(--font-geist-mono),monospace] text-[rgba(247,255,232,0.94)] shadow-[0_28px_70px_rgba(0,0,0,0.42),0_0_30px_color-mix(in_srgb,var(--mode-accent),transparent_82%),inset_0_1px_0_rgba(255,255,255,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--mode-secondary),white_18%)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:h-[clamp(32rem,70dvh,41rem)] lg:max-w-[min(100%,74rem)] lg:grid-cols-[minmax(28rem,0.58fr)_1px_minmax(23rem,0.42fr)]";
const panelBaseClass =
  "relative min-w-0 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.048),rgba(255,255,255,0.012)),rgba(2,9,7,0.68)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:p-[clamp(1.25rem,1.6vw,1.65rem)]";
const gridPanelClass =
  "flex flex-col items-start justify-center gap-4 lg:gap-5";
const detailPanelClass =
  "flex items-stretch justify-center bg-[radial-gradient(circle_at_20%_16%,color-mix(in_srgb,var(--mode-secondary),transparent_86%),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012)),rgba(3,10,9,0.84)] lg:items-stretch lg:justify-start lg:p-[clamp(1.25rem,1.45vw,1.55rem)]";
const dividerClass =
  "relative h-px w-full bg-[color-mix(in_srgb,var(--mode-secondary),transparent_62%)] lg:h-auto lg:w-px";

function hasOpenableLink(project?: ProjectItem) {
  return Boolean(project?.link && project.link !== "#");
}

function InventoryFocusButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Focus project inventory"
      title="Focus project inventory"
      className="group fixed bottom-3 left-3 z-40 grid size-14 place-items-center overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--mode-secondary),transparent_54%)] bg-[radial-gradient(circle_at_50%_28%,color-mix(in_srgb,var(--mode-secondary),white_12%),color-mix(in_srgb,var(--mode-accent),transparent_28%)_54%,rgba(2,10,7,0.9)_76%)] text-white shadow-[0_0_24px_color-mix(in_srgb,var(--mode-accent),transparent_54%),inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-5px_12px_rgba(0,0,0,0.34)] outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/80 sm:bottom-5 sm:left-5 sm:size-16"
      onClick={onClick}
    >
      <span className="absolute inset-1 rounded-full border border-white/14" />
      <span className="absolute inset-x-3 top-1.5 h-3 rounded-full bg-white/24 blur-[2px]" />
      <Backpack
        aria-hidden="true"
        className="relative size-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.48)] transition group-hover:scale-110 sm:size-8"
        strokeWidth={2.15}
      />
      <span className="sr-only">Inventory</span>
    </button>
  );
}

export default function ProjectInventory({ onBack }: ProjectInventoryProps) {
  const lobbyAudio = useLobbyAudio();
  const rootRef = useRef<HTMLElement>(null);
  const selectedIndexRef = useRef(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isDetailVisible, setIsDetailVisible] = useState(true);
  const [isFocusPulseActive, setIsFocusPulseActive] = useState(false);

  const openSelectedProject = useCallback(() => {
    const project = projectsData[selectedIndexRef.current];

    if (!hasOpenableLink(project)) {
      return false;
    }

    lobbyAudio.playEnterSound();
    window.open(project.link, "_blank", "noopener,noreferrer");
    return true;
  }, [lobbyAudio]);

  const playInventoryMoveSound = useCallback(
    (direction: 1 | -1) => {
      lobbyAudio.playMoveSound(direction, "keyboard");
    },
    [lobbyAudio],
  );

  const { moveHorizontal, moveVertical, selectedIndex } = useInventoryNavigation(
    slotCount,
    columnCount,
    openSelectedProject,
    playInventoryMoveSound,
  );

  const moveLeft = useCallback(() => {
    moveHorizontal(-1);
    return true;
  }, [moveHorizontal]);

  const moveRight = useCallback(() => {
    moveHorizontal(1);
    return true;
  }, [moveHorizontal]);

  const moveUp = useCallback(() => {
    moveVertical(-1);
    return true;
  }, [moveVertical]);

  const moveDown = useCallback(() => {
    moveVertical(1);
    return true;
  }, [moveVertical]);

  const focusInventory = useCallback(() => {
    rootRef.current?.focus();
    lobbyAudio.playEnterSound();
    setIsFocusPulseActive(false);
    window.setTimeout(() => {
      setIsFocusPulseActive(true);
    }, 0);
  }, [lobbyAudio]);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === displayedIndex) {
      return;
    }

    const fadeOutTimer = window.setTimeout(() => {
      setIsDetailVisible(false);
    }, 0);
    const swapTimer = window.setTimeout(() => {
      setDisplayedIndex(selectedIndex);
      setIsDetailVisible(true);
    }, fadeDurationMs);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(swapTimer);
    };
  }, [displayedIndex, selectedIndex]);

  useEffect(() => {
    if (!isFocusPulseActive) {
      return;
    }

    const pulseTimer = window.setTimeout(() => {
      setIsFocusPulseActive(false);
    }, inventoryFocusPulseMs);

    return () => {
      window.clearTimeout(pulseTimer);
    };
  }, [isFocusPulseActive]);

  return (
    <>
      <section
        ref={rootRef}
        tabIndex={0}
        className={`${inventoryShellClass} ${
          isFocusPulseActive ? "animate-[inventory-focus-pulse_620ms_ease-out_1]" : ""
        }`}
        aria-label="Project inventory"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--mode-secondary),transparent_92%),transparent)] opacity-35 mix-blend-screen"
        />
        <div className={`${panelBaseClass} ${gridPanelClass}`}>
          <InventoryGrid projects={projectsData} selectedIndex={selectedIndex} />
        </div>

        <div className={dividerClass} aria-hidden="true" />

        <div className={`${panelBaseClass} ${detailPanelClass}`}>
          <ProjectDetail
            isVisible={isDetailVisible}
            project={projectsData[displayedIndex]}
          />
        </div>
      </section>

      <InventoryFocusButton onClick={focusInventory} />

      <GameControlHud
        ariaLabel="Project inventory controls"
        label="Inventory keys"
        placement="fixed"
        actions={[
          {
            actionLabel: "Left",
            hint: "Move selection left",
            icon: ArrowLeft,
            keyLabel: "LEFT",
            onClick: moveLeft,
          },
          {
            actionLabel: "Right",
            hint: "Move selection right",
            icon: ArrowRight,
            keyLabel: "RIGHT",
            onClick: moveRight,
          },
          {
            actionLabel: "Up",
            hint: "Move selection up",
            icon: ArrowUp,
            keyLabel: "UP",
            onClick: moveUp,
          },
          {
            actionLabel: "Down",
            hint: "Move selection down",
            icon: ArrowDown,
            keyLabel: "DN",
            onClick: moveDown,
          },
          {
            actionLabel: "Enter",
            hint: "Enter to open selected project",
            icon: CornerDownLeft,
            keyLabel: "ENTER",
            onClick: openSelectedProject,
          },
          {
            actionLabel: "Back",
            hint: "Backspace to previous page",
            icon: Delete,
            keyLabel: "BSP",
            onClick: onBack ?? (() => false),
            wide: true,
          },
        ]}
      />
    </>
  );
}
