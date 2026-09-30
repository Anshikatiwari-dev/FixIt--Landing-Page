"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { Camera, Cpu, FileCheck, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const { howItWorks } = siteContent;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Camera className="w-5 h-5 text-teal-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <FileCheck className="w-5 h-5 text-teal-300" />;
      case 3:
      default:
        return <CheckCircle2 className="w-5 h-5 text-cyan-300" />;
    }
  };

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 px-4 sm:px-6">
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
              {howItWorks.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {howItWorks.heading}
          </h2>
        </motion.div>

        {/* 4 Numbered Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.steps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-teal-400/40 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(45,212,191,0.2)] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Row: Large subtle Step Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold font-mono text-white/20 group-hover:text-teal-400/80 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-teal-500/30 group-hover:bg-teal-500/10 transition-colors">
                    {getStepIcon(idx)}
                  </div>
                </div>

                {/* Title in format "01 — SHOW YOUR PROBLEM" */}
                <h3 className="text-white font-bold text-sm sm:text-base tracking-wide uppercase mb-3 leading-snug">
                  {step.step} — {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator Line */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-mono tracking-widest text-teal-400/60 uppercase">
                  PHASE 0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/40 group-hover:bg-teal-400 group-hover:shadow-[0_0_8px_#2dd4bf] transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
