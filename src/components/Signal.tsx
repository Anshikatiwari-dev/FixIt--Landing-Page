"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import {
  SmartphoneCharging,
  ScanLine,
  SearchCheck,
  Wrench,
  ChevronRight,
} from "lucide-react";

export function Signal() {
  const { signal } = siteContent;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <SmartphoneCharging className="w-6 h-6 text-teal-400" />;
      case 1:
        return <ScanLine className="w-6 h-6 text-cyan-400" />;
      case 2:
        return <SearchCheck className="w-6 h-6 text-teal-300" />;
      case 3:
      default:
        return <Wrench className="w-6 h-6 text-cyan-300" />;
    }
  };

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-block">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-teal-400 uppercase">
              {signal.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {signal.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {signal.subheading}
          </p>
        </motion.div>

        {/* 4 Flow Cards with Connecting Line */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] -translate-y-8 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {signal.steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-teal-400/40 shadow-lg hover:shadow-[0_0_30px_-5px_rgba(45,212,191,0.2)] transition-all duration-300"
              >
                {/* Arrow indicator between cards on desktop */}
                {idx < signal.steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-900 border border-teal-500/30 items-center justify-center text-teal-400 shadow-md group-hover:scale-110 group-hover:border-teal-400 transition-transform"
                    aria-hidden="true"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}

                {/* Card Icon */}
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-500/20 transition-all">
                  {getStepIcon(idx)}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base tracking-wide uppercase mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Step indicator tag */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-teal-400/80">
                  <span>STEP 0{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
