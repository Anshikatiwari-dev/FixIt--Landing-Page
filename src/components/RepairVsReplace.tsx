"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface RepairVsReplaceProps {
  onCheckProduct?: () => void;
}

export function RepairVsReplace({ onCheckProduct }: RepairVsReplaceProps) {
  const { repairVsReplace } = siteContent;

  const devices = [
    { name: "Smartphone", replaceCost: 9000, repairCost: 1800 },
    { name: "Laptop", replaceCost: 65000, repairCost: 8500 },
    { name: "Smartwatch", replaceCost: 16000, repairCost: 2800 },
    { name: "Tablet", replaceCost: 28000, repairCost: 4500 },
  ];

  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const current = devices[selectedDeviceIndex];
  const savings = current.replaceCost - current.repairCost;
  const savingsPercent = Math.round((savings / current.replaceCost) * 100);

  return (
    <section id="estimator" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Big Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/[0.035] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block">
                <span className="text-xs font-mono font-semibold tracking-[0.2em] text-teal-400 uppercase">
                  {repairVsReplace.eyebrow}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {repairVsReplace.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                {repairVsReplace.paragraph}
              </p>

              {/* Device category selector */}
              <div className="pt-3 flex flex-wrap gap-2">
                {devices.map((dev, idx) => (
                  <button
                    key={dev.name}
                    type="button"
                    onClick={() => setSelectedDeviceIndex(idx)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                      selectedDeviceIndex === idx
                        ? "bg-teal-400 text-slate-950 font-semibold border-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                        : "bg-white/5 text-slate-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {dev.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Comparison Cards & Animated Progress Bar */}
            <div className="lg:col-span-6 space-y-6">
              {/* Two mini cards side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* REPLACE Card */}
                <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono tracking-wider uppercase mb-2">
                    <span>{repairVsReplace.replaceCard.label}</span>
                    <XCircle className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="text-xs text-slate-400">New Product:</div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-200 mt-1">
                    ₹{current.replaceCost.toLocaleString()}
                  </div>
                </div>

                {/* REPAIR Card */}
                <div className="p-5 rounded-2xl bg-teal-500/[0.06] border border-teal-400/40 shadow-[0_0_20px_rgba(45,212,191,0.15)] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-teal-300 font-mono tracking-wider uppercase mb-2">
                    <span className="font-semibold">{repairVsReplace.repairCard.label}</span>
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-xs text-teal-200/80">Estimated Repair:</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-300 mt-1">
                    ₹{current.repairCost.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar & Savings */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 space-y-4">
                {/* Progress bar container */}
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    key={current.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${savingsPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 rounded-full shadow-[0_0_12px_#2dd4bf]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">
                    Repair could save{" "}
                    <strong className="text-teal-400 font-bold">
                      ₹{savings.toLocaleString()}
                    </strong>
                  </span>
                </div>

                {/* Teal Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onCheckProduct}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-95 rounded-xl shadow-[0_0_18px_rgba(45,212,191,0.35)] hover:shadow-[0_0_25px_rgba(45,212,191,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{repairVsReplace.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
