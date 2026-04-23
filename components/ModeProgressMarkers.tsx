"use client";

import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import type { PortfolioSection } from "@/lib/portfolio-content";

type ModeProgressMarkersProps = {
  activeIndex: number;
  isEntered: boolean;
  modes: readonly PortfolioSection[];
  onEnterMode: () => boolean;
  onOpenMode: (index: number) => boolean;
  onSelectMode: (index: number) => boolean;
};

export function ModeProgressMarkers({
  activeIndex: _activeIndex,
  isEntered: _isEntered,
  modes: _modes,
  onEnterMode: _onEnterMode,
  onOpenMode: _onOpenMode,
  onSelectMode: _onSelectMode,
}: ModeProgressMarkersProps) {
  void _activeIndex;
  void _isEntered;
  void _modes;
  void _onEnterMode;
  void _onOpenMode;
  void _onSelectMode;

  return (
    <nav className="mode-progress" aria-label="Game mode menu controls">
      <div className="mode-progress__keys" aria-label="Controls hint">
        <span className="mode-progress__keycap">
          <ArrowUp aria-hidden="true" size={16} strokeWidth={2.2} />
          <b>Up</b>
        </span>
        <span className="mode-progress__keycap">
          <ArrowDown aria-hidden="true" size={16} strokeWidth={2.2} />
          <b>Down</b>
        </span>
        <span className="mode-progress__keycap mode-progress__keycap--enter">
          <CornerDownLeft aria-hidden="true" size={16} strokeWidth={2.2} />
          <b>Enter</b>
        </span>
      </div>
    </nav>
  );
}
