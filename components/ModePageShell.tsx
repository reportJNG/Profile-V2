"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { AudioToggleButton } from "@/components/AudioToggleButton";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { ModePageControls } from "@/components/ModePageControls";
import { OverlayLayer } from "@/components/OverlayLayer";
import { ModePageContent } from "@/components/mode-pages/ModePageContent";
import { portfolioSections } from "@/lib/portfolio-content";
import type { PortfolioSection } from "@/lib/portfolio-content";
import { useLobbyAudio } from "@/lib/use-lobby-audio";

type ModePageShellProps = {
  section: PortfolioSection;
};

const navigationSoundDelayMs = 120;
const enterSoundDelayMs = 170;

function getWrappedSectionIndex(index: number) {
  return ((index % portfolioSections.length) + portfolioSections.length) % portfolioSections.length;
}

export function ModePageShell({ section }: ModePageShellProps) {
  const router = useRouter();
  const lobbyAudio = useLobbyAudio();
  const sectionIndex = useMemo(
    () =>
      Math.max(
        0,
        portfolioSections.findIndex(
          (portfolioSection) => portfolioSection.id === section.id,
        ),
      ),
    [section.id],
  );

  const navigateToSection = useCallback(
    (direction: 1 | -1) => {
      const nextSection =
        portfolioSections[getWrappedSectionIndex(sectionIndex + direction)];

      lobbyAudio.playMoveSound(direction, "keyboard");
      window.setTimeout(() => {
        router.push(`/${nextSection.id}`);
      }, navigationSoundDelayMs);

      return true;
    },
    [lobbyAudio, router, sectionIndex],
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
        event.preventDefault();
        navigateToSection(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        navigateToSection(-1);
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        returnToPreviousPage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToSection, returnToPreviousPage]);

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

      <section className="relative z-10 flex min-h-dvh items-center px-5 pb-28 pt-24 sm:px-10 sm:pb-24 sm:pt-24 lg:px-14">
        <div className="mx-auto w-full max-w-6xl">
          <ModePageContent section={section} />
        </div>
      </section>

      <AudioToggleButton
        isEnabled={lobbyAudio.isMusicEnabled}
        onToggle={lobbyAudio.toggleMusic}
      />

      <ModePageControls
        onBack={returnToPreviousPage}
        onNextMode={() => navigateToSection(1)}
        onPreviousMode={() => navigateToSection(-1)}
      />
    </main>
  );
}
