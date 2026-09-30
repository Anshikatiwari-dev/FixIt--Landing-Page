"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Play, Sparkles, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/content";
import { CountUp } from "@/components/CountUp";

interface HeroProps {
  onOpenScanModal?: () => void;
  onOpenDemoModal?: () => void;
}

export function Hero({ onOpenScanModal, onOpenDemoModal }: HeroProps) {
  const { hero } = siteContent;
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  // Automatically cycle through multiple household products every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % hero.rotatingExamples.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [hero.rotatingExamples.length]);

  const currentExample = hero.rotatingExamples[currentExampleIndex];

  return (
    <section
      id="home"
      className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-7 text-left"
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                {hero.eyebrow}
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-white tracking-tight leading-[1.08]">
              {hero.h1Line1}
              <span className="block mt-1 text-white">
                {hero.h1Line2}
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              {hero.paragraph}
            </p>

            {/* Two Icon Action Buttons with Tooltips */}
            <div className="flex items-center gap-4 pt-1">
              {/* Button 1: Teal Scan Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={onOpenScanModal}
                  aria-label="Scan your product"
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-teal-400 text-slate-950 flex items-center justify-center hover:bg-teal-300 active:scale-95 shadow-[0_0_24px_rgba(45,212,191,0.45)] hover:shadow-[0_0_32px_rgba(45,212,191,0.65)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <Scan className="w-6 h-6 stroke-[2.2]" />
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900/95 text-teal-300 text-xs font-medium rounded-lg border border-teal-400/30 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all pointer-events-none shadow-xl z-30">
                  Scan your product
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                </div>
              </div>

              {/* Button 2: Dark Play Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  aria-label="Watch demo"
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.05] border border-white/15 text-white flex items-center justify-center hover:bg-white/[0.1] hover:border-teal-400/40 active:scale-95 shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <Play className="w-5 h-5 fill-white/80 translate-x-0.5" />
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900/95 text-slate-200 text-xs font-medium rounded-lg border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all pointer-events-none shadow-xl z-30">
                  Watch demo
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                </div>
              </div>

              {/* Category indicator hint */}
              <span className="text-xs text-slate-400 pl-2 hidden sm:inline-block font-mono">
                AI Vision + Home Services
              </span>
            </div>

            {/* Stats Row with thin vertical dividers */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-6 sm:gap-10">
                {/* Stat 1 */}
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline">
                    <CountUp end={12000} duration={2} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {hero.stats[0].label}
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="w-px h-8 bg-white/20" aria-hidden="true" />

                {/* Stat 2 */}
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline">
                    <CountUp end={4.8} decimals={1} duration={1.8} suffix="/5" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {hero.stats[1].label}
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="w-px h-8 bg-white/20" aria-hidden="true" />

                {/* Stat 3 */}
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Verified
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {hero.stats[2].label}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN (HERO CARD) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Glow Halo behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-teal-500/10 rounded-3xl blur-2xl -z-10 opacity-70" />

            {/* Main Rounded Glass Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/[0.03] backdrop-blur-xl p-2 sm:p-3 shadow-2xl">
              {/* Inner Image Container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950">
                <Image
                  src="/hero-phone.jpg"
                  alt="Product inspection under FixIt AI diagnostic scanner"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover object-center filter brightness-95 contrast-105"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                {/* ================= SCANNER FRAME OVERLAY ================= */}
                <div className="absolute inset-[10%] sm:inset-[12%] pointer-events-none flex flex-col justify-between">
                  {/* Glowing Box Outline */}
                  <div className="absolute inset-0 border border-teal-400/40 bg-teal-400/[0.04] rounded-lg shadow-[0_0_30px_rgba(45,212,191,0.25)]">
                    {/* Top-Left Corner Bracket */}
                    <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-teal-400 rounded-tl-sm shadow-[0_0_8px_#2dd4bf]" />
                    {/* Top-Right Corner Bracket */}
                    <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-teal-400 rounded-tr-sm shadow-[0_0_8px_#2dd4bf]" />
                    {/* Bottom-Left Corner Bracket */}
                    <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-teal-400 rounded-bl-sm shadow-[0_0_8px_#2dd4bf]" />
                    {/* Bottom-Right Corner Bracket */}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-teal-400 rounded-br-sm shadow-[0_0_8px_#2dd4bf]" />

                    {/* Animated Scanning Line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_12px_#2dd4bf] animate-scanline" />
                  </div>

                  {/* Top Scanner Header Badge */}
                  <div className="relative z-10 mx-auto mt-2.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-400/50 flex items-center gap-2 shadow-[0_0_15px_rgba(45,212,191,0.4)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-teal-300 uppercase">
                      LIVE AI PRODUCT SCAN
                    </span>
                  </div>
                </div>

                {/* ================= ROTATING FLOATING GLASS CHIPS ================= */}
                {/* Chip 1: Top-Right — "AI Diagnosis" */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                  <span className="font-semibold text-white">AI Diagnosis</span>
                  <span className="text-slate-400 text-[11px] hidden xs:inline">
                    · Visual scan active
                  </span>
                </motion.div>

                {/* Chip 2: Left — Rotating Problem Detected */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chip2-${currentExampleIndex}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, y: [3, -4, 3] }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-[28%] left-3 sm:left-4 z-20 max-w-[220px] sm:max-w-none px-3 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-teal-500/40 text-xs shadow-xl"
                  >
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] sm:text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Problem Detected</span>
                      <span className="text-[10px] font-mono text-teal-300/80 bg-teal-500/10 px-1.5 rounded">
                        {currentExample.category}
                      </span>
                    </div>
                    <div className="text-slate-200 text-[11px] sm:text-xs mt-0.5 font-medium">
                      {currentExample.problem}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Chip 3: Bottom Left/Center — Rotating Estimated Cost & Recommendation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chip3-${currentExampleIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-3 left-3 right-3 sm:right-auto z-20 px-3.5 py-2.5 rounded-xl bg-slate-950/95 backdrop-blur-md border border-white/15 text-xs shadow-2xl max-w-md"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300 text-[11px] sm:text-xs">
                      <span className="text-white font-bold text-teal-300 text-sm">
                        Estimated Cost: {currentExample.cost}
                      </span>
                      <span className="text-slate-500 hidden sm:inline">·</span>
                      <span className="text-slate-300 font-medium">
                        {currentExample.technicianRole}
                      </span>
                    </div>
                    <div className="text-teal-400 text-[11px] sm:text-xs font-medium mt-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        Recommended: {currentExample.recommendation}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Chip 4: Bottom-Right — Rotating Confidence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chip4-${currentExampleIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-16 right-3 sm:bottom-3 sm:right-3 z-20 px-3 py-1.5 rounded-xl bg-teal-950/90 backdrop-blur-md border border-teal-400/40 text-[11px] sm:text-xs text-teal-200 shadow-xl flex items-center gap-1.5"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-semibold text-white">
                      Confidence: {currentExample.confidence}
                    </span>
                    <span className="text-teal-300/80 hidden sm:inline">· Best repair route</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
