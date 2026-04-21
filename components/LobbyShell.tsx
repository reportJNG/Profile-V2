"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LobbyBackground } from "@/components/LobbyBackground";
import { LobbyOverlay } from "@/components/LobbyOverlay";
import { LobbyStage } from "@/components/LobbyStage";
import { LobbyTabs } from "@/components/LobbyTabs";
import { lobbyChangeLockMs } from "@/lib/lobby-motion";
import { lobbyTabs } from "@/lib/lobby-tabs";
import { useLobbySelectSound } from "@/lib/use-lobby-select-sound";

function normalizeTabIndex(index: number) {
  return ((index % lobbyTabs.length) + lobbyTabs.length) % lobbyTabs.length;
}

export function LobbyShell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeIndexRef = useRef(activeIndex);
  const lockedUntilRef = useRef(0);
  const playSelectSound = useLobbySelectSound();
  const activeTab = lobbyTabs[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const selectTab = useCallback(
    (nextIndex: number, explicitDirection?: number) => {
      const normalizedIndex = normalizeTabIndex(nextIndex);
      const currentIndex = activeIndexRef.current;
      const now = performance.now();

      if (normalizedIndex === currentIndex || now < lockedUntilRef.current) {
        return;
      }

      lockedUntilRef.current = now + lobbyChangeLockMs;
      setDirection(
        explicitDirection ?? (normalizedIndex > currentIndex ? 1 : -1),
      );
      setActiveIndex(normalizedIndex);
      playSelectSound();
    },
    [playSelectSound],
  );

  const goNext = useCallback(() => {
    selectTab(activeIndexRef.current + 1, 1);
  }, [selectTab]);

  const goPrevious = useCallback(() => {
    selectTab(activeIndexRef.current - 1, -1);
  }, [selectTab]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "d" ||
        event.key === "D" ||
        event.key === "s" ||
        event.key === "S"
      ) {
        event.preventDefault();
        goNext();
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp" ||
        event.key === "a" ||
        event.key === "A" ||
        event.key === "w" ||
        event.key === "W"
      ) {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious]);

  useEffect(() => {
    let wheelRemainder = 0;

    function handleWheel(event: WheelEvent) {
      const primaryDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(primaryDelta) < 3) {
        return;
      }

      event.preventDefault();

      const now = performance.now();
      if (now < lockedUntilRef.current) {
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

      if (Math.abs(wheelRemainder) < 36) {
        return;
      }

      if (wheelRemainder > 0) {
        goNext();
      } else {
        goPrevious();
      }

      wheelRemainder = 0;
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrevious]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#050507] text-white selection:bg-white/20">
      <LobbyBackground activeIndex={activeIndex} activeTab={activeTab} />
      <LobbyOverlay activeTab={activeTab} />
      <LobbyStage
        activeIndex={activeIndex}
        activeTab={activeTab}
        direction={direction}
        total={lobbyTabs.length}
      />
      <LobbyTabs
        activeIndex={activeIndex}
        tabs={lobbyTabs}
        onSelect={selectTab}
      />
    </main>
  );
}
