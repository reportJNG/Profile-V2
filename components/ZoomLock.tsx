"use client";

import { useEffect } from "react";

const blockedZoomKeys = new Set(["+", "-", "=", "_", "0"]);

export function ZoomLock() {
  useEffect(() => {
    function preventZoom(event: Event) {
      event.preventDefault();
    }

    function handleWheel(event: WheelEvent) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && blockedZoomKeys.has(event.key)) {
        event.preventDefault();
      }
    }

    function handleTouchMove(event: TouchEvent) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("gesturestart", preventZoom, { passive: false });
    window.addEventListener("gesturechange", preventZoom, { passive: false });
    window.addEventListener("gestureend", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("gesturestart", preventZoom);
      window.removeEventListener("gesturechange", preventZoom);
      window.removeEventListener("gestureend", preventZoom);
    };
  }, []);

  return null;
}
