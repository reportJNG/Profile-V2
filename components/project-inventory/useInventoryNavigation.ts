"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type InventoryMoveDirection = 1 | -1;
type InventoryMoveHandler = (direction: InventoryMoveDirection) => void;
type InventoryEnterHandler = () => boolean;

type InventoryNavigationState = {
  moveHorizontal: (direction: InventoryMoveDirection) => void;
  moveVertical: (direction: InventoryMoveDirection) => void;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

function wrap(value: number, max: number) {
  return ((value % max) + max) % max;
}

export function useInventoryNavigation(
  itemCount: number,
  cols: number,
  onEnter: InventoryEnterHandler,
  onMove?: InventoryMoveHandler,
): InventoryNavigationState {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveHorizontal = useCallback(
    (direction: InventoryMoveDirection) => {
      setSelectedIndex((currentIndex) => {
        const rowStart = Math.floor(currentIndex / cols) * cols;
        const currentCol = currentIndex % cols;
        return rowStart + wrap(currentCol + direction, cols);
      });
      onMove?.(direction);
    },
    [cols, onMove],
  );

  const moveVertical = useCallback(
    (direction: InventoryMoveDirection) => {
      setSelectedIndex((currentIndex) => {
        const rows = Math.ceil(itemCount / cols);
        const currentRow = Math.floor(currentIndex / cols);
        const currentCol = currentIndex % cols;
        return wrap(currentRow + direction, rows) * cols + currentCol;
      });
      onMove?.(direction);
    },
    [cols, itemCount, onMove],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveHorizontal(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveHorizontal(-1);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveVertical(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveVertical(-1);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        onEnter();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveHorizontal, moveVertical, onEnter, onMove]);

  return { moveHorizontal, moveVertical, selectedIndex, setSelectedIndex };
}
