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
  isActive,
  tile,
}: {
  isActive: boolean;
  tile: ContactTile;
}) {
  const Icon = tile.icon;
  const showsValue = tile.id === "country" || tile.id === "phone";
  const tileKindClass = showsValue
    ? "contact-grid-tile--info"
    : "contact-grid-tile--icon";

  return (
    <article
      aria-current={isActive ? "true" : undefined}
      aria-label={`${tile.label}${showsValue ? `: ${tile.value}` : ""}`}
      className={`contact-grid-tile ${tileKindClass} ${
        isActive ? "contact-grid-tile--active" : ""
      }`}
      style={getContactStyle(tile)}
    >
      <span aria-hidden="true" className="contact-grid-tile__scan" />
      <div className="contact-grid-tile__icon-shell">
        <Icon aria-hidden="true" className="contact-grid-tile__icon" />
      </div>
      <div className="contact-grid-tile__copy">
        <span className="contact-grid-tile__group">{tile.group}</span>
        <h2 className="contact-grid-tile__label">{tile.label}</h2>
        {showsValue ? (
          <p className="contact-grid-tile__value">{tile.value}</p>
        ) : null}
      </div>
    </article>
  );
}

export function ContactModePage({
  activePanelIndex,
  panelDirection,
  section,
}: ContactModePageProps) {
  const activeIndex = wrapIndex(activePanelIndex);
  const activeTile = contactTiles[activeIndex];

  return (
    <section
      className="contact-mode-page contact-grid-page"
      aria-label={`${section.title} contact grid`}
      style={{ color: section.secondaryAccent }}
    >
      <div
        className={`contact-command-board ${
          panelDirection > 0
            ? "contact-command-board--forward"
            : "contact-command-board--back"
        }`}
        style={getContactStyle(activeTile)}
      >
        <span aria-hidden="true" className="contact-command-board__scan" />
        <span aria-hidden="true" className="contact-command-board__flare" />

        <div className="contact-grid" aria-label="Contact options">
          {contactTiles.map((tile, index) => (
            <ContactTileCard
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
