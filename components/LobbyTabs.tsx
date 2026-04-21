"use client";

import {
  Archive,
  BookOpen,
  Map,
  Swords,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { LobbyTab, LobbyTabId } from "@/lib/lobby-tabs";
import { cn } from "@/lib/utils";

const tabIcons: Record<LobbyTabId, LucideIcon> = {
  story: BookOpen,
  adventure: Map,
  "free-battle": Swords,
  "online-battle": Wifi,
  collection: Archive,
};

type LobbyTabsProps = {
  activeIndex: number;
  tabs: readonly LobbyTab[];
  onSelect: (index: number) => void;
};

export function LobbyTabs({ activeIndex, tabs, onSelect }: LobbyTabsProps) {
  return (
    <nav
      aria-label="Main lobby modes"
      className="lobby-tab-rail fixed bottom-4 z-20 px-1 sm:bottom-5 sm:px-8 lg:px-14"
    >
      <div className="grid h-24 w-full grid-cols-5 gap-px sm:h-20 sm:gap-2 lg:h-[4.5rem]">
        {tabs.map((tab, index) => {
          const Icon = tabIcons[tab.id];
          const isActive = activeIndex === index;
          const words = tab.title.split(" ");

          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(index)}
              className={cn(
                "group relative flex min-w-0 items-center justify-center overflow-hidden border px-0.5 text-white/68 outline-none backdrop-blur-md transition-[background,border-color,box-shadow,color,transform] duration-300 [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)] focus-visible:ring-2 focus-visible:ring-white/80 sm:gap-3 sm:px-3 sm:[clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]",
                isActive
                  ? "z-10 border-white/70 bg-white/18 text-white shadow-[0_0_32px_rgba(255,255,255,.16)] sm:-translate-y-1"
                  : "border-white/15 bg-black/42 shadow-[0_0_18px_rgba(0,0,0,.28)] hover:border-white/38 hover:bg-white/10 hover:text-white/90",
              )}
              style={
                {
                  "--tab-accent": tab.accent,
                  borderColor: isActive ? `${tab.accent}cc` : undefined,
                  boxShadow: isActive
                    ? `0 0 0 1px ${tab.accent}66, 0 0 34px ${tab.accent}38`
                    : undefined,
                } as CSSProperties
              }
            >
              <span
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  isActive && "opacity-100",
                )}
                style={{
                  background: `linear-gradient(105deg, ${tab.accent}36, transparent 62%)`,
                }}
              />
              <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--tab-accent),transparent)] opacity-70" />
              <span className="relative flex min-w-0 flex-col items-center gap-1.5 sm:flex-row">
                <Icon
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-300 sm:h-6 sm:w-6",
                    isActive && "scale-110",
                  )}
                  strokeWidth={isActive ? 2.6 : 2}
                />
                <span className="max-w-full text-center text-[9px] font-black uppercase leading-[1.05] tracking-[0.01em] sm:text-left sm:text-sm sm:leading-tight sm:tracking-[0.08em]">
                  {words.map((word, wordIndex) => (
                    <span key={word} className="block sm:inline">
                      {word}
                      {wordIndex < words.length - 1 ? (
                        <span className="hidden sm:inline"> </span>
                      ) : null}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
