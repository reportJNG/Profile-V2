"use client";

import { BadgeCheck, Gamepad2, Gauge, Globe, Terminal, UserRound } from "lucide-react";

const iconMap = {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
};

export function ProjectDetail({ isVisible, project }) {
  const Icon = project ? iconMap[project.icon] || Globe : Globe;

  return (
    <div className={`project-detail-content ${isVisible ? "is-visible" : ""}`}>
      <div className="project-detail-icon" aria-hidden="true">
        <Icon size={40} strokeWidth={1.55} />
      </div>
      <div>
        <p className="project-detail-kicker">Selected Relic</p>
        <h2>{project?.title ?? "Locked Slot"}</h2>
      </div>
      <p className="project-detail-description">
        {project?.description ??
          "This inventory slot is locked. Add another project entry to projectsData.js to reveal it here."}
      </p>
      {project ? <span className="project-detail-hint">[ ENTER ] Open Project -&gt;</span> : null}
    </div>
  );
}
