"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { portfolioSections } from "@/lib/portfolio-content";
import { lobbyChangeLockMs } from "@/lib/lobby-motion";

type Direction = 1 | -1;

type UseModeSwitchOptions = {
  onModeChange?: (direction: Direction, index: number) => void;
  onEnterMode?: (index: number) => void;
};

function normalizeModeIndex(index: number) {
  return ((index % portfolioSections.length) + portfolioSections.length) % portfolioSections.length;
}

function getClickDirection(currentIndex: number, nextIndex: number): Direction {
  if (nextIndex === currentIndex) {
    return 1;
  }

  const forwardDistance =
    (nextIndex - currentIndex + portfolioSections.length) % portfolioSections.length;
  const backwardDistance =
    (currentIndex - nextIndex + portfolioSections.length) % portfolioSections.length;

  return forwardDistance <= backwardDistance ? 1 : -1;
}

export function useModeSwitch({ onModeChange, onEnterMode }: UseModeSwitchOptions = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isSwitching, setIsSwitching] = useState(false);
  const [enteredIndex, setEnteredIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const lockedUntilRef = useRef(0);
  const releaseTimerRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  const enterMode = useCallback((index = activeIndexRef.current) => {
    const normalizedIndex = normalizeModeIndex(index);
    setEnteredIndex(normalizedIndex);
    onEnterMode?.(normalizedIndex);
    return true;
  }, [onEnterMode]);

  const closeEnteredMode = useCallback(() => {
    setEnteredIndex(null);
  }, []);

  const selectMode = useCallback(
    (nextIndex: number, explicitDirection?: Direction) => {
      const normalizedIndex = normalizeModeIndex(nextIndex);
      const currentIndex = activeIndexRef.current;
      const now = performance.now();

      if (normalizedIndex === currentIndex || now < lockedUntilRef.current) {
        return false;
      }

      const nextDirection =
        explicitDirection ?? getClickDirection(currentIndex, normalizedIndex);

      lockedUntilRef.current = now + lobbyChangeLockMs;
      setDirection(nextDirection);
      setIsSwitching(true);
      setActiveIndex(normalizedIndex);
      setEnteredIndex(null);
      onModeChange?.(nextDirection, normalizedIndex);

      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }

      releaseTimerRef.current = window.setTimeout(() => {
        setIsSwitching(false);
        releaseTimerRef.current = null;
      }, lobbyChangeLockMs - 80);

      return true;
    },
    [onModeChange],
  );

  const openMode = useCallback((nextIndex: number) => {
    const normalizedIndex = normalizeModeIndex(nextIndex);
    if (normalizedIndex !== activeIndexRef.current) {
      selectMode(normalizedIndex);
    }

    return enterMode(normalizedIndex);
  }, [enterMode, selectMode]);

  const goNext = useCallback(() => {
    return selectMode(activeIndexRef.current + 1, 1);
  }, [selectMode]);

  const goPrevious = useCallback(() => {
    return selectMode(activeIndexRef.current - 1, -1);
  }, [selectMode]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === "s" ||
        event.key === "S" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        event.preventDefault();
        goNext();
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "PageUp" ||
        event.key === "w" ||
        event.key === "W" ||
        event.key === "a" ||
        event.key === "A"
      ) {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "Home") {
        event.preventDefault();
        selectMode(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        selectMode(portfolioSections.length - 1);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enterMode();
      }

      if (event.key === "Escape" || event.key === "Backspace") {
        setEnteredIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enterMode, goNext, goPrevious, selectMode]);

  useEffect(() => {
    let wheelRemainder = 0;
    let lastWheelAt = 0;
    let wheelGestureBlockedUntil = 0;
    const wheelQuietMs = 220;

    function handleWheel(event: WheelEvent) {
      const primaryDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(primaryDelta) < 2) {
        return;
      }

      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelAt > wheelQuietMs) {
        wheelRemainder = 0;
      }

      lastWheelAt = now;

      if (now < lockedUntilRef.current || now < wheelGestureBlockedUntil) {
        wheelGestureBlockedUntil = now + wheelQuietMs;
        wheelRemainder = 0;
        return;
      }

      const deltaMultiplier =
        event.deltaMode === 1
          ? 18
          : event.deltaMode === 2
            ? window.innerHeight
            : 1;

      wheelRemainder += primaryDelta * deltaMultiplier;

      if (Math.abs(wheelRemainder) < 58) {
        return;
      }

      const didSwitch = wheelRemainder > 0 ? goNext() : goPrevious();

      if (didSwitch) {
        wheelGestureBlockedUntil = performance.now() + 120;
      }

      wheelRemainder = 0;
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrevious]);

  useEffect(() => {
    function handleTouchStart(event: TouchEvent) {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    }

    function handleTouchEnd(event: TouchEvent) {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY ?? null;
      touchStartYRef.current = null;

      if (startY === null || endY === null) {
        return;
      }

      const deltaY = startY - endY;

      if (Math.abs(deltaY) < 44) {
        return;
      }

      if (deltaY > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrevious]);

  const activeMode = useMemo(() => portfolioSections[activeIndex], [activeIndex]);

  return {
    activeIndex,
    activeMode,
    closeEnteredMode,
    direction,
    enteredIndex,
    enterMode,
    goNext,
    goPrevious,
    isEntered: enteredIndex === activeIndex,
    isSwitching,
    openMode,
    selectMode,
  };
}
