"use client";

import { ScrollVideoScrubber } from "@/components/ScrollVideoScrubber";

/**
 * BackgroundGlows — now hosts the scroll-driven video scrubber.
 *
 * Layer order (z-index):
 *   [z-0]  ScrollVideoScrubber  ← 240-frame canvas, scroll-driven
 *   [z-1]  Dark overlay         ← improves text readability
 *   [z-10] <main>               ← all existing site content (unchanged)
 *
 * To restore the original glow orbs + blueprint grid, add them back
 * as additional absolute children inside this wrapper.
 */
export function BackgroundGlows() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Scroll-driven frame scrubber — fills the full viewport */}
      <ScrollVideoScrubber />

      {/* Dark overlay — preserves text/content readability over the video */}
      <div className="absolute inset-0 bg-black/45" style={{ zIndex: 1 }} />
    </div>
  );
}
