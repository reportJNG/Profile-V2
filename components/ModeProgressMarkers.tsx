"use client";

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
    <nav className="mode-progress" aria-label="Game mode menu">
      <div className="mode-progress__keys" aria-label="Controls hint">
        <span>UP</span>
        <span>DOWN</span>
        <span>ENTER</span>
      </div>
    </nav>
  );
}
