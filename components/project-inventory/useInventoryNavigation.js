"use client";

import { useCallback, useEffect, useState } from "react";

function wrap(value, max) {
  return ((value % max) + max) % max;
}

export function useInventoryNavigation(itemCount, cols, onEnter, onMove) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveHorizontal = useCallback(
    (direction) => {
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
    (direction) => {
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
    function handleKeyDown(event) {
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
