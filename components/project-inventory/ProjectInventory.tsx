"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
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

type ProjectInventoryProps = {
  onBack?: () => boolean;
};

const inventoryShellClass =
  "relative mx-auto grid h-auto min-h-0 w-full max-w-[42rem] overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(214,169,75,0.12),transparent_30%),radial-gradient(circle_at_18%_84%,rgba(75,118,62,0.12),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.48),rgba(12,16,13,0.74))] [font-family:var(--font-inventory-mono),var(--font-geist-mono),monospace] text-[rgba(255,248,228,0.94)] outline-none lg:ml-[clamp(0rem,2vw,1.2rem)] lg:mr-auto lg:h-[clamp(22rem,50dvh,28rem)] lg:max-w-[min(100%,45rem)] lg:grid-cols-[minmax(20rem,0.66fr)_1px_minmax(12.5rem,0.34fr)] lg:bg-[radial-gradient(circle_at_24%_86%,rgba(214,169,75,0.16),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(87,194,48,0.1),transparent_30%),linear-gradient(135deg,rgba(0,0,0,0.54),rgba(9,14,11,0.8))]";
const panelBaseClass =
  "relative min-w-0 border border-[rgba(215,176,87,0.3)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),repeating-linear-gradient(0deg,rgba(255,255,255,0.026)_0_1px,transparent_1px_7px),rgba(4,8,10,0.78)] p-4 lg:p-[clamp(0.9rem,1.25vw,1.2rem)]";
const gridPanelClass =
  "flex flex-col items-start gap-4 lg:justify-between";
const detailPanelClass =
  "flex items-center justify-center bg-[radial-gradient(circle_at_18%_18%,rgba(214,169,75,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.012)),rgba(8,12,14,0.9)] lg:items-start lg:justify-start lg:p-[clamp(0.82rem,1vw,1rem)]";
const headerClass = "flex min-w-0 items-center justify-between gap-3";
const dividerClass =
  "relative flex h-px w-full items-center justify-center lg:h-auto lg:w-px before:absolute before:inset-x-0 before:h-px before:bg-[rgba(215,176,87,0.3)] lg:before:inset-x-auto lg:before:inset-y-0 lg:before:h-auto lg:before:w-px";

function hasOpenableLink(project?: ProjectItem) {
  return Boolean(project?.link && project.link !== "#");
}

function InventoryPanelCorners() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-1 [font-family:var(--font-inventory-cinzel),serif] text-2xl font-bold leading-none text-[#d6a94b] opacity-85 [text-shadow:0_0_12px_rgba(245,186,68,0.46)]"
      >
        [
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 right-1.5 [font-family:var(--font-inventory-cinzel),serif] text-2xl font-bold leading-none text-[#d6a94b] opacity-85 [text-shadow:0_0_12px_rgba(245,186,68,0.46)]"
      >
        ]
      </span>
    </>
  );
}

export default function ProjectInventory({ onBack }: ProjectInventoryProps) {
  const lobbyAudio = useLobbyAudio();
  const rootRef = useRef<HTMLElement>(null);
  const selectedIndexRef = useRef(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isDetailVisible, setIsDetailVisible] = useState(true);

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

  return (
    <section
      ref={rootRef}
      tabIndex={0}
      className={inventoryShellClass}
      aria-label="Project inventory"
    >
      <div className={`${panelBaseClass} ${gridPanelClass}`}>
        <InventoryPanelCorners />
        <div className={headerClass}>
          <p className="[font-family:var(--font-inventory-cinzel),serif] text-[clamp(0.9rem,1vw,1.08rem)] font-bold uppercase leading-none tracking-0 text-[rgba(255,248,228,0.94)]">
            Project Inventory
          </p>
          <span className="shrink-0 border border-[rgba(215,176,87,0.3)] px-2 py-1.5 text-[0.62rem] font-bold uppercase leading-none text-[rgba(220,210,184,0.58)]">
            12 Slots
          </span>
        </div>
        <InventoryGrid projects={projectsData} selectedIndex={selectedIndex} />
      </div>

      <div className={dividerClass} aria-hidden="true">
        <span className="relative bg-[#080d0c] px-1.5 py-0 [font-family:var(--font-inventory-cinzel),serif] text-[1.15rem] font-bold leading-none text-[#d6a94b] [text-shadow:0_0_12px_rgba(245,186,68,0.46)] lg:px-0 lg:py-1.5">
          +
        </span>
      </div>

      <div className={`${panelBaseClass} ${detailPanelClass}`}>
        <InventoryPanelCorners />
        <ProjectDetail
          isVisible={isDetailVisible}
          project={projectsData[displayedIndex]}
        />
      </div>

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
    </section>
  );
}
