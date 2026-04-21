"use client";

import { LayoutGroup, motion } from "motion/react";
import {
  Archive,
  BookOpen,
  Map,
  Swords,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { lobbyTransition } from "@/lib/lobby-motion";
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
  const activeTab = tabs[activeIndex];

  return (
    <nav
      aria-label="Main lobby modes"
      className="lobby-tab-rail fixed bottom-4 z-20 px-2 sm:bottom-6 sm:px-8 lg:px-14"
      style={{ "--lobby-accent": activeTab.accent } as CSSProperties}
    >
      <LayoutGroup id="main-lobby-tabs">
        <div className="mx-auto grid h-[86px] w-full max-w-[1080px] grid-cols-5 gap-1 sm:h-[78px] sm:gap-2 lg:h-[74px]">
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
                  "group relative flex min-w-0 items-center justify-center overflow-hidden border px-1 text-white/64 outline-none backdrop-blur-md transition-[border-color,box-shadow,color,transform] duration-300 [clip-path:polygon(9px_0,100%_0,calc(100%-9px)_100%,0_100%)] focus-visible:ring-2 focus-visible:ring-white/80 sm:gap-3 sm:px-3",
                  isActive
                    ? "z-10 -translate-y-1 border-white/72 text-white shadow-[0_0_32px_rgba(255,255,255,.16)]"
                    : "border-white/14 text-white/62 shadow-[0_0_18px_rgba(0,0,0,.3)] hover:border-white/36 hover:text-white/90",
                )}
                style={
                  {
                    "--tab-accent": tab.accent,
                    borderColor: isActive ? `${tab.accent}d8` : undefined,
                    boxShadow: isActive
                      ? `0 0 0 1px ${tab.accent}66, 0 0 34px ${tab.accent}36`
                      : undefined,
                  } as CSSProperties
                }
              >
                <span className="absolute inset-0 bg-black/54" />
                {isActive ? (
                  <motion.span
                    layoutId="lobby-active-tab-backplate"
                    className="absolute inset-0"
                    transition={lobbyTransition}
                    style={{
                      background: `linear-gradient(105deg, ${tab.accent}46, rgba(255,255,255,.12) 44%, transparent 74%)`,
                    }}
                  />
                ) : null}
                {isActive ? (
                  <motion.span
                    layoutId="lobby-active-tab-marker"
                    className="absolute inset-x-3 top-0 h-[3px] shadow-[0_0_18px_currentColor]"
                    transition={lobbyTransition}
                    style={{
                      backgroundColor: tab.accent,
                      color: tab.accent,
                    }}
                  />
                ) : null}
                <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--tab-accent),transparent)] opacity-70" />
                <span className="absolute inset-x-2 bottom-0 h-px bg-white/18" />
                <span className="relative flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300 sm:h-6 sm:w-6",
                      isActive && "scale-110",
                    )}
                    strokeWidth={isActive ? 2.6 : 2}
                  />
                  <span className="max-w-full text-center text-[9px] font-black uppercase leading-[1.05] sm:text-left sm:text-[13px] sm:leading-tight">
                    {words.map((word, wordIndex) => (
                      <span key={`${word}-${wordIndex}`} className="block sm:inline">
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
      </LayoutGroup>
    </nav>
  );
}
