"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { ChevronRight, RefreshCw } from "lucide-react";

export function CircularEconomy() {
  const { circularEconomy } = siteContent;

  return (
    <section id="circular" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Big Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/[0.035] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden text-center"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Heading & Sub */}
          <div className="max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
              <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                {circularEconomy.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {circularEconomy.heading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {circularEconomy.subheading}
            </p>
          </div>

          {/* Horizontal Flow of 4 Pills with Arrows Between Them */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {circularEconomy.stages.map((stage, idx) => (
              <div
                key={stage.title}
                className="w-full md:w-auto flex-1 flex flex-col md:flex-row items-center gap-3 sm:gap-4"
              >
                {/* Pill Card */}
                <div className="w-full py-4 px-6 rounded-2xl bg-white/[0.04] hover:bg-teal-500/[0.08] border border-white/10 hover:border-teal-400/40 text-center transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] group cursor-default">
                  <div className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {stage.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 hidden sm:block">
                    {stage.description}
                  </div>
                </div>

                {/* Arrow between pills */}
                {idx < circularEconomy.stages.length - 1 && (
                  <div
                    className="rotate-90 md:rotate-0 flex items-center justify-center text-teal-400/60"
                    aria-hidden="true"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
