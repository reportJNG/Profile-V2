"use client";

import { useCallback, useEffect, useState } from "react";
import { LobbyBackground } from "@/components/LobbyBackground";
import { LobbyOverlay } from "@/components/LobbyOverlay";
import { LobbyStage } from "@/components/LobbyStage";
import { LobbyTabs } from "@/components/LobbyTabs";
import { lobbyTabs } from "@/lib/lobby-tabs";

export function LobbyShell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeTab = lobbyTabs[activeIndex];

  const selectTab = useCallback(
    (nextIndex: number, explicitDirection?: number) => {
      if (nextIndex === activeIndex) {
        return;
      }

      setDirection(explicitDirection ?? (nextIndex > activeIndex ? 1 : -1));
      setActiveIndex(nextIndex);
    },
    [activeIndex],
  );

  const goNext = useCallback(() => {
    selectTab((activeIndex + 1) % lobbyTabs.length, 1);
  }, [activeIndex, selectTab]);

  const goPrevious = useCallback(() => {
    selectTab((activeIndex - 1 + lobbyTabs.length) % lobbyTabs.length, -1);
  }, [activeIndex, selectTab]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
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
