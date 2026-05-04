"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { AudioToggleButton } from "@/components/AudioToggleButton";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ModePageControls } from "@/components/ModePageControls";
import { ModePageContent } from "@/components/mode-pages/ModePageContent";
import { getContactTileHref } from "@/lib/contact-data";
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
  "items-start pb-32 pt-[5.8rem] lg:items-center lg:pb-[clamp(5.8rem,9dvh,6.6rem)] lg:pt-[clamp(4.5rem,7dvh,5.8rem)]";
const skillsModePageFrameClass =
  "items-center overflow-hidden px-3 pb-[5.2rem] pt-[4.2rem] sm:px-8 sm:pb-[5.4rem] sm:pt-[4.8rem] lg:px-10 lg:pb-[4.9rem] lg:pt-[4.8rem] [@media(max-height:680px)]:pb-[4.5rem] [@media(max-height:680px)]:pt-[3.8rem]";
const contactModePageFrameClass =
  "items-center overflow-hidden px-3 pb-[5.2rem] pt-[4.2rem] sm:px-8 sm:pb-[5.4rem] sm:pt-[4.8rem] lg:px-10 lg:pb-[4.9rem] lg:pt-[4.8rem] [@media(max-height:680px)]:pb-[4.5rem] [@media(max-height:680px)]:pt-[3.8rem]";

export function ModePageShell({ section }: ModePageShellProps) {
  const router = useRouter();
  const {
    isMusicEnabled,
    playEnterSound,
    playMoveSound,
    toggleMusic,
  } = useLobbyAudio();
  const isAboutPage = section.id === "about";
  const isSkillsPage = section.id === "skills";
  const isContactPage = section.id === "contact";
  const usesFixedPageControls = isSkillsPage || isContactPage;
  const [panelState, setPanelState] = useState({
    direction: 1 as 1 | -1,
    index: 0,
    sectionId: section.id,
  });
  const panelCount = getModePagePanelCount(section.id);
  const activePanelIndex =
    panelState.sectionId === section.id ? panelState.index : 0;
  const activePanelDirection =
    panelState.sectionId === section.id ? panelState.direction : 1;

  const movePanel = useCallback(
    (direction: 1 | -1) => {
      if (panelCount === 0) {
        return false;
      }

      playMoveSound(direction, "keyboard");
      setPanelState((currentState) => {
        const currentIndex =
          currentState.sectionId === section.id ? currentState.index : 0;

        return {
          direction,
          index:
            ((currentIndex + direction) % panelCount + panelCount) %
            panelCount,
          sectionId: section.id,
        };
      });

      return true;
    },
    [panelCount, playMoveSound, section.id],
  );

  const movePanelByOffset = useCallback(
    (offset: number) => {
      if (panelCount === 0 || offset === 0) {
        return false;
      }

      const direction = offset > 0 ? 1 : -1;

      playMoveSound(direction, "keyboard");
      setPanelState((currentState) => {
        const currentIndex =
          currentState.sectionId === section.id ? currentState.index : 0;

        return {
          direction,
          index:
            ((currentIndex + offset) % panelCount + panelCount) % panelCount,
          sectionId: section.id,
        };
      });

      return true;
    },
    [panelCount, playMoveSound, section.id],
  );

  const returnToPreviousPage = useCallback(() => {
    playEnterSound();
    window.setTimeout(() => {
      if (window.history.length > 1) {
        router.back();
        return;
      }

      router.push("/");
    }, enterSoundDelayMs);

    return true;
  }, [playEnterSound, router]);

  const openActiveContactTile = useCallback(() => {
    if (!isContactPage) {
      return false;
    }

    const href = getContactTileHref(activePanelIndex);

    if (!href) {
      return false;
    }

    playEnterSound();

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return true;
    }

    window.location.href = href;
    return true;
  }, [activePanelIndex, isContactPage, playEnterSound]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (usesFixedPageControls) {
        if (isSkillsPage && event.key === "ArrowRight") {
          if (panelCount === 0) {
            return;
          }

          event.preventDefault();
          movePanelByOffset(1);
          return;
        }

        if (isContactPage && event.key === "ArrowDown") {
          if (panelCount === 0) {
            return;
          }

          event.preventDefault();
          movePanelByOffset(1);
          return;
        }

        if (isSkillsPage && event.key === "ArrowLeft") {
          if (panelCount === 0) {
            return;
          }

          event.preventDefault();
          movePanelByOffset(-1);
          return;
        }

        if (isContactPage && event.key === "ArrowUp") {
          if (panelCount === 0) {
            return;
          }

          event.preventDefault();
          movePanelByOffset(-1);
          return;
        }

        if (isContactPage && event.key === "Enter") {
          event.preventDefault();
          openActiveContactTile();
          return;
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          returnToPreviousPage();
          return;
        }

        if (event.code === "Space") {
          event.preventDefault();
          toggleMusic();
          return;
        }

        return;
      }

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
        return;
      }

      if (isAboutPage && event.code === "Space") {
        event.preventDefault();
        toggleMusic();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isContactPage,
    isAboutPage,
    isSkillsPage,
    movePanel,
    movePanelByOffset,
    openActiveContactTile,
    panelCount,
    returnToPreviousPage,
    toggleMusic,
    usesFixedPageControls,
  ]);

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

      <section
        className={`${modePageFrameBaseClass} ${
          section.id === "projects"
            ? projectsModePageFrameClass
            : section.id === "skills"
              ? skillsModePageFrameClass
              : section.id === "contact"
                ? contactModePageFrameClass
              : ""
        }`}
      >
        <div
          className={`mx-auto w-full ${
            section.id === "projects"
              ? "max-w-[86rem]"
              : section.id === "skills" || section.id === "contact"
                ? "max-w-[88rem]"
                : "max-w-6xl"
          } ${
            section.id === "skills" || section.id === "contact"
              ? "h-full min-h-0 overflow-hidden"
              : ""
          }`}
        >
          <ModePageContent
            activePanelIndex={activePanelIndex}
            onBack={returnToPreviousPage}
            panelDirection={activePanelDirection}
            section={section}
          />
        </div>
      </section>

      <AudioToggleButton
        isEnabled={isMusicEnabled}
      />

      {usesFixedPageControls ? (
        <ModePageControls
          isMusicMouseClickable={false}
          panelAxis={isContactPage ? "vertical" : "horizontal"}
          placement="fixed"
          onActivatePanel={isContactPage ? openActiveContactTile : undefined}
          onBack={returnToPreviousPage}
          onMoveDownPanel={
            isContactPage ? () => movePanelByOffset(1) : undefined
          }
          onMoveUpPanel={
            isContactPage ? () => movePanelByOffset(-1) : undefined
          }
          onMusicToggle={() => {
            toggleMusic();
            return true;
          }}
          onNextPanel={panelCount > 0 ? () => movePanel(1) : undefined}
          onPreviousPanel={panelCount > 0 ? () => movePanel(-1) : undefined}
        />
      ) : section.id !== "projects" ? (
        <ModePageControls
          isMusicMouseClickable={false}
          onBack={returnToPreviousPage}
          onMusicToggle={
            isAboutPage
              ? () => {
                  toggleMusic();
                  return true;
                }
              : undefined
          }
          onNextPanel={panelCount > 0 ? () => movePanel(1) : undefined}
          onPreviousPanel={panelCount > 0 ? () => movePanel(-1) : undefined}
        />
      ) : null}
    </main>
  );
}
