"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { skillsData, type SkillItem } from "@/lib/skills-data";

type SkillCarouselProps = {
  activeSkillIndex: number;
  direction: 1 | -1;
};

function wrapIndex(index: number) {
  return ((index % skillsData.length) + skillsData.length) % skillsData.length;
}

function getSkillStyle(skill: SkillItem) {
  return {
    "--skill-color": skill.color,
    "--skill-exp": `${skill.exp}%`,
    "--skill-glow": skill.glowColor,
  } as CSSProperties;
}

function GhostSkillCard({
  position,
  skill,
}: {
  position: "left" | "right";
  skill: SkillItem;
}) {
  const Icon = skill.icon;

  return (
    <article
      aria-hidden="true"
      className={`skills-ghost-card skills-ghost-card--${position}`}
      style={getSkillStyle(skill)}
    >
      <span className="skills-ghost-card__aura" />
      <Icon className="skills-ghost-card__icon" />
      <span className="skills-ghost-card__title">{skill.title}</span>
      <span className="skills-ghost-card__level">LV {skill.level}</span>
    </article>
  );
}

function ActiveSkillCard({
  direction,
  skill,
}: {
  direction: 1 | -1;
  skill: SkillItem;
}) {
  const Icon = skill.icon;

  return (
    <article
      aria-live="polite"
      className={`skills-active-card ${
        direction > 0
          ? "skills-active-card--from-right"
          : "skills-active-card--from-left"
      }`}
      style={getSkillStyle(skill)}
    >
      <span aria-hidden="true" className="skills-active-card__heat" />
      <span aria-hidden="true" className="skills-active-card__flare" />
      <span aria-hidden="true" className="skills-active-card__ring" />
      <span aria-hidden="true" className="skills-active-card__ring skills-active-card__ring--late" />

      <div className="skills-active-card__icon-shell">
        <span aria-hidden="true" className="skills-active-card__icon-orbit" />
        <Icon aria-hidden="true" className="skills-active-card__icon" />
      </div>

      <div className="skills-active-card__copy">
        <h1 className="skills-active-card__title">{skill.title}</h1>
        <div className="skills-active-card__level">LV {skill.level}</div>
      </div>

      <div
        aria-label={`${skill.title} experience ${skill.exp} percent`}
        className="skills-water-meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.exp}
      >
        <span className="skills-water-meter__track" />
        <span className="skills-water-meter__fill">
          <span className="skills-water-meter__wave" />
          <span className="skills-water-meter__shine" />
        </span>
        <span className="skills-water-meter__value">{skill.exp} EXP</span>
      </div>
    </article>
  );
}

export function SkillCarousel({
  activeSkillIndex,
  direction,
}: SkillCarouselProps) {
  const activeIndex = wrapIndex(activeSkillIndex);
  const activeSkill = skillsData[activeIndex];
  const previousSkill = skillsData[wrapIndex(activeIndex - 1)];
  const nextSkill = skillsData[wrapIndex(activeIndex + 1)];

  return (
    <section className="skills-carousel" aria-label="Full stack skill carousel">
      <div className="skills-carousel__arrows" aria-hidden="true">
        <span className="skills-carousel__arrow skills-carousel__arrow--left">
          <ArrowLeft />
        </span>
        <span className="skills-carousel__arrow skills-carousel__arrow--right">
          <ArrowRight />
        </span>
      </div>

      <div className="skills-carousel__stage">
        <GhostSkillCard position="left" skill={previousSkill} />
        <ActiveSkillCard
          key={activeSkill.id}
          direction={direction}
          skill={activeSkill}
        />
        <GhostSkillCard position="right" skill={nextSkill} />
      </div>
    </section>
  );
}
