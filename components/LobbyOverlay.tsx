import type { CSSProperties } from "react";
import type { LobbyTab } from "@/lib/lobby-tabs";

type LobbyOverlayProps = {
  activeTab: LobbyTab;
};

export function LobbyOverlay({ activeTab }: LobbyOverlayProps) {
  const accentStyle = {
    "--lobby-accent": activeTab.accent,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={accentStyle}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84)_0%,rgba(0,0,0,.48)_36%,rgba(0,0,0,.10)_68%,rgba(0,0,0,.42)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,rgba(0,0,0,.86)_0%,rgba(0,0,0,.44)_44%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(0,0,0,.58),transparent)]" />
      <div className="lobby-speed-lines absolute inset-0 opacity-35" />
      <div className="lobby-haze absolute inset-0 opacity-55" />
      <div className="lobby-grain absolute inset-0 opacity-25" />
      <div className="absolute left-0 top-[14%] h-px w-[64vw] bg-[linear-gradient(90deg,var(--lobby-accent),transparent)] opacity-70" />
      <div className="absolute bottom-[17%] left-0 h-px w-[52vw] bg-[linear-gradient(90deg,var(--lobby-accent),transparent)] opacity-55" />
    </div>
  );
}
