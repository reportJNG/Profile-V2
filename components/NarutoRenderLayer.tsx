"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { lobbyCharacterTransition } from "@/lib/lobby-motion";
import type { LobbyMode } from "@/lib/lobby-modes";

type Direction = 1 | -1;

type NarutoRenderLayerProps = {
  direction: Direction;
  mode: LobbyMode;
};

export function NarutoRenderLayer({ direction, mode }: NarutoRenderLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const gradientId = `ninja-jacket-${mode.id}`;
  const glowId = `ninja-glow-${mode.id}`;

  return (
    <motion.div
      aria-hidden="true"
      className="naruto-layer"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              x: direction > 0 ? 120 : -70,
              y: direction > 0 ? 42 : -42,
              scale: 0.96,
              rotate: direction > 0 ? 2 : -2,
              filter: "blur(5px)",
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
      }}
      exit={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              x: direction > 0 ? -90 : 120,
              y: direction > 0 ? -38 : 38,
              scale: 1.035,
              rotate: direction > 0 ? -2 : 2,
              filter: "blur(4px)",
            }
      }
      transition={lobbyCharacterTransition}
      style={
        {
          "--pose-accent": mode.accent,
          "--pose-secondary": mode.secondaryAccent,
        } as CSSProperties
      }
    >
      <div className="naruto-aura" />
      <svg
        className={`naruto-render naruto-render--${mode.narutoPose}`}
        role="img"
        viewBox="0 0 430 640"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffd35c" />
            <stop offset="43%" stopColor="#ff8e22" />
            <stop offset="100%" stopColor="#d94b17" />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 1 0 1 0 0 0.62 0 0 1 0 0.16 0 0 0 0.56 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="ninja-trails" filter={`url(#${glowId})`}>
          <path d="M92 172 C158 120 270 90 372 118 C309 132 254 173 218 230 C174 214 134 196 92 172Z" />
          <path d="M59 390 C128 350 228 343 366 378 C280 390 215 423 156 494 C122 458 90 424 59 390Z" />
          <path d="M220 79 C286 91 336 126 383 181 C329 164 282 164 232 188 C224 150 220 112 220 79Z" />
        </g>

        <ellipse className="ninja-ground-shadow" cx="224" cy="585" rx="118" ry="22" />

        <g className="ninja-figure">
          <g className="ninja-leg ninja-leg--back">
            <path d="M230 392 C265 420 282 469 294 551 L258 560 C246 504 224 462 195 423Z" />
            <path d="M251 545 C287 545 308 553 326 571 C300 579 272 580 245 570Z" />
          </g>

          <g className="ninja-leg ninja-leg--front">
            <path d="M179 393 C164 439 149 496 122 553 L158 566 C189 513 213 462 231 414Z" />
            <path d="M109 551 C140 544 168 548 191 567 C163 579 134 582 102 570Z" />
          </g>

          <g className="ninja-arm ninja-arm--back">
            <path d="M265 244 C306 263 327 301 333 355 L301 363 C293 320 276 291 242 272Z" />
            <path d="M300 350 C323 348 344 357 356 377 C333 385 311 381 294 366Z" />
          </g>

          <g className="ninja-body">
            <path
              className="ninja-jacket"
              d="M169 221 C202 196 249 195 284 221 C308 264 303 333 273 408 C235 428 188 427 151 407 C126 335 132 267 169 221Z"
              fill={`url(#${gradientId})`}
            />
            <path className="ninja-jacket-dark" d="M170 225 C188 246 204 306 202 421 C181 420 163 415 150 407 C127 334 132 267 170 225Z" />
            <path className="ninja-collar" d="M171 216 C198 246 248 246 280 216 C270 201 252 191 225 190 C198 191 181 202 171 216Z" />
            <path className="ninja-zip" d="M225 240 L223 405" />
            <path className="ninja-waist" d="M145 392 C187 415 238 416 278 392 L272 424 C235 442 190 442 153 424Z" />
          </g>

          <g className="ninja-arm ninja-arm--front">
            <path d="M167 246 C126 270 105 309 103 365 L137 370 C142 326 160 298 191 276Z" />
            <path d="M100 359 C123 355 145 363 158 382 C135 391 111 388 95 373Z" />
          </g>

          <g className="ninja-head">
            <path className="ninja-hair" d="M157 137 L188 86 L203 125 L229 73 L240 126 L276 91 L269 142 L310 128 L281 164 C262 141 185 139 157 137Z" />
            <ellipse className="ninja-face" cx="226" cy="159" rx="47" ry="52" />
            <path className="ninja-ear ninja-ear--left" d="M176 162 C160 163 156 185 172 193 C180 186 181 172 176 162Z" />
            <path className="ninja-ear ninja-ear--right" d="M277 162 C294 164 296 185 281 193 C273 186 272 172 277 162Z" />
            <path className="ninja-headband" d="M178 133 C208 121 247 121 275 134 L274 154 C244 144 209 144 179 154Z" />
            <path className="ninja-plate" d="M207 127 C221 123 237 124 250 128 L249 146 C235 142 221 142 208 146Z" />
            <path className="ninja-eye ninja-eye--left" d="M197 166 C207 160 218 161 226 168" />
            <path className="ninja-eye ninja-eye--right" d="M231 168 C240 160 252 160 262 166" />
            <path className="ninja-mouth" d="M215 190 C225 197 237 197 248 190" />
            <path className="ninja-whisker" d="M187 181 L210 176" />
            <path className="ninja-whisker" d="M187 192 L211 190" />
            <path className="ninja-whisker" d="M264 176 L240 181" />
            <path className="ninja-whisker" d="M263 190 L240 192" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
