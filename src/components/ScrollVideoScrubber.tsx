"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(5, "0")}.png`;

/**
 * ScrollVideoScrubber
 * -------------------
 * Renders a full-viewport canvas that scrubs through TOTAL_FRAMES PNG images
 * as the user scrolls. The canvas is `fixed` and sits at z-0 so all existing
 * site content (z-10) renders on top of it.
 *
 * Scroll mapping: the animation spans `SCROLL_HEIGHT` pixels of scrollable
 * space (defined on the sentinel spacer div in page.tsx, or auto-derived from
 * document height). Progress is clamped [0,1] and mapped to frame index.
 *
 * Performance notes:
 *  - Images are preloaded into HTMLImageElement objects (no fetch overhead on draw).
 *  - Drawing is gated inside rAF to avoid layout thrash.
 *  - A passive scroll listener updates a ref (no state = no React re-render).
 *  - `object-fit: cover` semantics replicated via drawImage math.
 */
export function ScrollVideoScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ── Resize canvas to viewport ──────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndexRef.current);
    }

    // ── Draw a single frame (cover semantics) ─────────────────────────────
    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover: scale so the image fills the canvas, centred
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.drawImage(img, sx, sy, sw, sh);
    }

    // ── Scroll → frame index ──────────────────────────────────────────────
    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      const newIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (newIndex !== frameIndexRef.current) {
        frameIndexRef.current = newIndex;
        if (!isDrawingRef.current) {
          isDrawingRef.current = true;
          rafRef.current = requestAnimationFrame(() => {
            drawFrame(frameIndexRef.current);
            isDrawingRef.current = false;
          });
        }
      }
    }

    // ── Preload all frames ────────────────────────────────────────────────
    imagesRef.current = new Array(TOTAL_FRAMES);

    function loadImage(i: number) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loadedCountRef.current += 1;
        // Draw frame 0 immediately once it's ready
        if (i === 0) {
          resize();
          drawFrame(0);
        }
      };
      img.src = FRAME_PATH(i);
      imagesRef.current[i] = img;
    }

    // Load frame 0 first for instant first-paint, then the rest
    loadImage(0);
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      // Stagger slightly to avoid hammering the network/parser on mount
      // Use requestIdleCallback if available, otherwise setTimeout(0)
      const load = loadImage.bind(null, i);
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(load);
      } else {
        setTimeout(load, 0);
      }
    }

    // Initial size
    resize();

    // ── Event listeners ───────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
