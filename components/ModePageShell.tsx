"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { AudioToggleButton } from "@/components/AudioToggleButton";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ModePageControls } from "@/components/ModePageControls";
import { OverlayLayer } from "@/components/OverlayLayer";
import { ModePageContent } from "@/components/mode-pages/ModePageContent";
import { getModePagePanelCount } from "@/lib/mode-page-panels";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useLobbyAudio } from "@/lib/use-lobby-audio";

type ModePageShellProps = {
  section: PortfolioSection;
};

const enterSoundDelayMs = 170;
const modePageFrameBaseClass =
  "relative z-10 flex max-h-dvh min-h-dvh items-start overflow-y-auto overflow-x-hidden px-5 pb-28 pt-24 sm:px-10 sm:pb-24 sm:pt-24 lg:items-center lg:px-14 [@media(max-height:680px)]:items-center [@media(max-height:680px)]:pb-[4.8rem] [@media(max-height:680px)]:pt-4";
const projectsModePageFrameClass =
  "items-start pb-32 pt-[5.8rem] lg:items-end lg:pb-[clamp(5.8rem,11dvh,7.2rem)] lg:pt-[clamp(4.5rem,8dvh,6.2rem)]";

export function ModePageShell({ section }: ModePageShellProps) {
  const router = useRouter();
  const lobbyAudio = useLobbyAudio();
  const [panelState, setPanelState] = useState({
    index: 0,
    sectionId: section.id,
  });
  const panelCount = getModePagePanelCount(section.id);
  const activePanelIndex =
    panelState.sectionId === section.id ? panelState.index : 0;

  const selectPanel = useCallback(
    (index: number) => {
      if (panelCount === 0) {
        return false;
      }

      const nextIndex = ((index % panelCount) + panelCount) % panelCount;
      setPanelState({
        index: nextIndex,
        sectionId: section.id,
      });
      return true;
    },
    [panelCount, section.id],
  );

  const movePanel = useCallback(
    (direction: 1 | -1) => {
      if (panelCount === 0) {
        return false;
      }

      lobbyAudio.playMoveSound(direction, "keyboard");
      setPanelState((currentState) => {
        const currentIndex =
          currentState.sectionId === section.id ? currentState.index : 0;

        return {
          index:
            ((currentIndex + direction) % panelCount + panelCount) %
            panelCount,
          sectionId: section.id,
        };
      });

      return true;
    },
    [lobbyAudio, panelCount, section.id],
  );

  const returnToPreviousPage = useCallback(() => {
    lobbyAudio.playEnterSound();
    window.setTimeout(() => {
      if (window.history.length > 1) {
        router.back();
        return;
      }

      router.push("/");
    }, enterSoundDelayMs);

    return true;
  }, [lobbyAudio, router]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        if (panelCount === 0) {
          return;
        }

        event.preventDefault();
        movePanel(1);
      }

      if (event.key === "ArrowUp") {
        if (panelCount === 0) {
          return;
        }

        event.preventDefault();
        movePanel(-1);
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        returnToPreviousPage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePanel, panelCount, returnToPreviousPage]);

  return (
    <main
      className={`mode-scene--${section.scene} relative min-h-dvh w-full overflow-hidden bg-[#071018] text-white`}
      style={
        {
          "--mode-accent": section.accent,
          "--mode-secondary": section.secondaryAccent,
        } as CSSProperties
      }
    >
      <BackgroundLayer direction={1} mode={section} />
      <OverlayLayer direction={1} mode={section} />

      <section
        className={`${modePageFrameBaseClass} ${
          section.id === "projects" ? projectsModePageFrameClass : ""
        }`}
      >
        <div
          className={`mx-auto w-full ${
            section.id === "projects" ? "max-w-[86rem]" : "max-w-6xl"
          }`}
        >
          <ModePageContent
            activePanelIndex={activePanelIndex}
            onBack={returnToPreviousPage}
            onSelectPanel={selectPanel}
            section={section}
          />
        </div>
      </section>

      <AudioToggleButton
        isEnabled={lobbyAudio.isMusicEnabled}
        onToggle={lobbyAudio.toggleMusic}
      />

      {section.id !== "projects" ? (
        <ModePageControls
          onBack={returnToPreviousPage}
          onNextPanel={panelCount > 0 ? () => movePanel(1) : undefined}
          onPreviousPanel={panelCount > 0 ? () => movePanel(-1) : undefined}
        />
      ) : null}
    </main>
  );
}
