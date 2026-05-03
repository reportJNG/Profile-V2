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
  "project-inventory-shell relative mx-auto grid h-auto min-h-0 w-full max-w-[58rem] overflow-hidden border border-[color-mix(in_srgb,var(--mode-secondary),transparent_48%)] bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--mode-secondary),transparent_78%),transparent_34%),radial-gradient(circle_at_16%_88%,color-mix(in_srgb,var(--mode-accent),transparent_72%),transparent_38%),linear-gradient(135deg,rgba(1,8,5,0.7),rgba(5,15,9,0.9)_58%,rgba(0,0,0,0.78))] [clip-path:polygon(0.9rem_0,calc(100%_-_0.9rem)_0,100%_0.9rem,100%_calc(100%_-_0.9rem),calc(100%_-_0.9rem)_100%,0.9rem_100%,0_calc(100%_-_0.9rem),0_0.9rem)] [font-family:var(--font-geist-mono),monospace] text-[rgba(247,255,232,0.94)] shadow-[0_28px_70px_rgba(0,0,0,0.42),0_0_42px_color-mix(in_srgb,var(--mode-accent),transparent_76%),inset_0_1px_0_rgba(255,255,255,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--mode-secondary),white_18%)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:ml-[clamp(0rem,2vw,1.2rem)] lg:mr-auto lg:h-[clamp(29rem,64dvh,37rem)] lg:max-w-[min(100%,66rem)] lg:grid-cols-[minmax(24rem,0.62fr)_1px_minmax(18rem,0.38fr)]";
const panelBaseClass =
  "relative min-w-0 border border-[color-mix(in_srgb,var(--mode-secondary),transparent_66%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)),repeating-linear-gradient(0deg,rgba(255,255,255,0.028)_0_1px,transparent_1px_7px),rgba(2,9,7,0.76)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.035)] lg:p-[clamp(1rem,1.35vw,1.35rem)]";
const gridPanelClass =
  "flex flex-col items-start gap-4 lg:gap-5 lg:justify-between";
const detailPanelClass =
  "flex items-stretch justify-center bg-[radial-gradient(circle_at_20%_16%,color-mix(in_srgb,var(--mode-secondary),transparent_78%),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.016)),rgba(3,10,9,0.88)] lg:items-stretch lg:justify-start lg:p-[clamp(1rem,1.2vw,1.2rem)]";
const headerClass = "grid w-full min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]";
const dividerClass =
  "relative flex h-px w-full items-center justify-center bg-[rgba(0,0,0,0.26)] lg:h-auto lg:w-px before:absolute before:inset-x-0 before:h-px before:bg-[color-mix(in_srgb,var(--mode-secondary),transparent_62%)] lg:before:inset-x-auto lg:before:inset-y-0 lg:before:h-auto lg:before:w-px";

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

  const filledSlotCount = projectsData.length;

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
  const selectedProject = projectsData[selectedIndex];

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
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--mode-secondary),transparent_88%),transparent),repeating-linear-gradient(90deg,transparent_0_46px,rgba(255,255,255,0.03)_47px_48px)] opacity-45 mix-blend-screen"
        />
        <div className={`${panelBaseClass} ${gridPanelClass}`}>
          <InventoryPanelCorners />
          <div className={headerClass}>
            <div className="min-w-0">
              <p className="mb-2 inline-flex items-center gap-2 border border-[color-mix(in_srgb,var(--mode-secondary),transparent_68%)] bg-black/24 px-2.5 py-1.5 text-[0.58rem] font-black uppercase leading-none text-white/58">
                <span className="block size-1.5 bg-[color-mix(in_srgb,var(--mode-secondary),white_18%)] shadow-[0_0_10px_color-mix(in_srgb,var(--mode-secondary),transparent_28%)]" />
                Selected Work Loadout
              </p>
              <h1 className="[font-family:var(--font-heading),var(--font-geist-sans),sans-serif] text-[clamp(1.55rem,3vw,2.55rem)] font-black uppercase leading-[0.92] tracking-0 text-[#f7ffe8] [text-shadow:0_2px_18px_rgba(0,0,0,0.58),0_0_22px_color-mix(in_srgb,var(--mode-accent),transparent_70%)]">
                Project Inventory
              </h1>
            </div>
            <div className="grid shrink-0 grid-cols-3 gap-1.5 self-start text-center">
              <span className="border border-white/10 bg-black/24 px-2 py-1.5">
                <span className="block text-[0.52rem] font-black uppercase leading-none text-white/42">
                  Filled
                </span>
                <span className="mt-1 block text-[0.78rem] font-black leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_22%)]">
                  {filledSlotCount}/{slotCount}
                </span>
              </span>
              <span className="border border-white/10 bg-black/24 px-2 py-1.5">
                <span className="block text-[0.52rem] font-black uppercase leading-none text-white/42">
                  Slot
                </span>
                <span className="mt-1 block text-[0.78rem] font-black leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_22%)]">
                  {selectedIndex + 1}
                </span>
              </span>
              <span className="border border-white/10 bg-black/24 px-2 py-1.5">
                <span className="block text-[0.52rem] font-black uppercase leading-none text-white/42">
                  State
                </span>
                <span className="mt-1 block text-[0.78rem] font-black uppercase leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_22%)]">
                  {selectedProject ? "Ready" : "Lock"}
                </span>
              </span>
            </div>
          </div>
          <InventoryGrid projects={projectsData} selectedIndex={selectedIndex} />
        </div>

        <div className={dividerClass} aria-hidden="true">
          <span className="relative bg-[#07110b] px-1.5 py-0 [font-family:var(--font-heading),serif] text-[1.15rem] font-black leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_18%)] [text-shadow:0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_36%)] lg:px-0 lg:py-1.5">
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
