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
import { projectsData } from "@/components/project-inventory/projectsData";
import { useInventoryNavigation } from "@/components/project-inventory/useInventoryNavigation";
import { useLobbyAudio } from "@/lib/use-lobby-audio";

const slotCount = 12;
const columnCount = 3;
const fadeDurationMs = 150;

function hasOpenableLink(project) {
  return Boolean(project?.link && project.link !== "#");
}

export default function ProjectInventory({ onBack }) {
  const lobbyAudio = useLobbyAudio();
  const rootRef = useRef(null);
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
    (direction) => {
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
      className="project-inventory"
      aria-label="Project inventory"
    >
      <div className="inventory-panel inventory-panel--grid">
        <div className="inventory-panel-header">
          <p>Project Inventory</p>
          <span>12 Slots</span>
        </div>
        <InventoryGrid projects={projectsData} selectedIndex={selectedIndex} />
      </div>

      <div className="inventory-divider" aria-hidden="true">
        <span>+</span>
      </div>

      <div className="inventory-panel inventory-panel--detail">
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
