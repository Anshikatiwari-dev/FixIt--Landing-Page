"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import {
  BrainCircuit,
  Hammer,
  Gauge,
  IndianRupee,
  Layers,
  ShieldCheck,
  Scale,
  Recycle,
} from "lucide-react";

export function Features() {
  const { features } = siteContent;

  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BrainCircuit className="w-5 h-5 text-teal-400" />;
      case 1:
        return <Hammer className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Gauge className="w-5 h-5 text-teal-300" />;
      case 3:
        return <IndianRupee className="w-5 h-5 text-cyan-300" />;
      case 4:
        return <Layers className="w-5 h-5 text-teal-400" />;
      case 5:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 6:
        return <Scale className="w-5 h-5 text-teal-300" />;
      case 7:
      default:
        return <Recycle className="w-5 h-5 text-cyan-300" />;
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 px-4 sm:px-6">
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
              {features.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {features.heading}
          </h2>
        </motion.div>

        {/* 4x2 Grid of 8 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-teal-400/40 shadow-lg hover:shadow-[0_0_25px_-5px_rgba(45,212,191,0.2)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Feature Icon */}
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-500/20 transition-all">
                  {getFeatureIcon(idx)}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base tracking-tight mb-2 group-hover:text-teal-200 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tiny Teal Tag at Bottom */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-teal-400 uppercase tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-teal-400" />
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
