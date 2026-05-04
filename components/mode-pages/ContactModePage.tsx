"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { contactTiles, type ContactTile } from "@/lib/contact-data";
import type { PortfolioSection } from "@/lib/portfolio-content";

type ContactModePageProps = {
  activePanelIndex: number;
  panelDirection: 1 | -1;
  section: PortfolioSection;
};

function wrapIndex(index: number) {
  return (
    ((index % contactTiles.length) + contactTiles.length) % contactTiles.length
  );
}

function getContactStyle(tile: ContactTile) {
  return {
    "--contact-tone": tile.tone,
    "--contact-glow": tile.glow,
  } as CSSProperties;
}

function ContactTileCard({
  index,
  isActive,
  tile,
}: {
  index: number;
  isActive: boolean;
  tile: ContactTile;
}) {
  const Icon = tile.icon;
  const isStaticInfo = tile.id === "country" || tile.id === "phone";
  const title = isStaticInfo ? tile.value : tile.label;
  const tileKindClass = isStaticInfo
    ? "contact-grid-tile--static"
    : "contact-grid-tile--actionable";

  return (
    <article
      aria-current={isActive ? "true" : undefined}
      aria-label={title}
      className={`contact-grid-tile ${tileKindClass} ${
        isActive ? "contact-grid-tile--active" : ""
      }`}
      style={
        {
          ...getContactStyle(tile),
          "--contact-tile-index": index,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="contact-grid-tile__glow" />
      <div className="contact-grid-tile__icon-shell">
        <Icon aria-hidden="true" className="contact-grid-tile__icon" />
      </div>
      <h2 className="contact-grid-tile__label">{title}</h2>
    </article>
  );
}

export function ContactModePage({
  activePanelIndex,
  section,
}: ContactModePageProps) {
  const [hasSettledEntrance, setHasSettledEntrance] = useState(false);
  const activeIndex = wrapIndex(activePanelIndex);
  const activeTile = contactTiles[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => setHasSettledEntrance(true), 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="contact-mode-page contact-grid-page"
      aria-label={`${section.title} contact grid`}
      style={{ color: section.secondaryAccent }}
    >
      <div
        className={`contact-command-board ${
          hasSettledEntrance ? "contact-command-board--settled" : ""
        }`}
        style={getContactStyle(activeTile)}
      >
        <div
          className={`contact-grid ${
            hasSettledEntrance ? "contact-grid--settled" : ""
          }`}
          aria-label="Contact options"
        >
          {contactTiles.map((tile, index) => (
            <ContactTileCard
              index={index}
              isActive={index === activeIndex}
              key={tile.id}
              tile={tile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
