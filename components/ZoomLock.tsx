"use client";

import { useEffect } from "react";

const allowedPointerSelector = "[data-hud-control='true']";
const blockedZoomKeys = new Set(["+", "-", "=", "_", "0"]);
const blockedPointerEvents = [
  "auxclick",
  "contextmenu",
  "dblclick",
  "drag",
  "dragend",
  "dragenter",
  "dragover",
  "dragstart",
  "drop",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
] as const;

export function ZoomLock() {
  useEffect(() => {
    function isAllowedPointerTarget(event: Event) {
      const path = event.composedPath();

      return path.some((target) => {
        return (
          target instanceof Element &&
          target.closest(allowedPointerSelector) !== null
        );
      });
    }

    function blockInput(event: Event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function blockInputOutsideHud(event: Event) {
      if (!isAllowedPointerTarget(event)) {
        blockInput(event);
      }
    }

    function handleClick(event: MouseEvent) {
      if (event.detail > 0 && !isAllowedPointerTarget(event)) {
        blockInput(event);
      }
    }

    function handleWheel(event: WheelEvent) {
      blockInput(event);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && blockedZoomKeys.has(event.key)) {
        event.preventDefault();
      }
    }

    function resetScroll() {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    }

    window.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("scroll", resetScroll, { capture: true });
    window.addEventListener("gesturestart", blockInput, { capture: true, passive: false });
    window.addEventListener("gesturechange", blockInput, { capture: true, passive: false });
    window.addEventListener("gestureend", blockInput, { capture: true, passive: false });

    for (const eventName of blockedPointerEvents) {
      window.addEventListener(eventName, blockInputOutsideHud, { capture: true, passive: false });
    }

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("scroll", resetScroll, { capture: true });
      window.removeEventListener("gesturestart", blockInput, { capture: true });
      window.removeEventListener("gesturechange", blockInput, { capture: true });
      window.removeEventListener("gestureend", blockInput, { capture: true });

      for (const eventName of blockedPointerEvents) {
        window.removeEventListener(eventName, blockInputOutsideHud, { capture: true });
      }
    };
  }, []);

  return null;
}
