"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { PiggyBank, Clock, ShieldCheck, Leaf } from "lucide-react";

export function WhyFixIt() {
  const { whyFixIt } = siteContent;

  const getItemIcon = (index: number) => {
    switch (index) {
      case 0:
        return <PiggyBank className="w-6 h-6 text-teal-400" />;
      case 1:
        return <Clock className="w-6 h-6 text-cyan-400" />;
      case 2:
        return <ShieldCheck className="w-6 h-6 text-teal-300" />;
      case 3:
      default:
        return <Leaf className="w-6 h-6 text-cyan-300" />;
    }
  };

  return (
    <section id="why-fixit" className="relative py-20 sm:py-28 px-4 sm:px-6">
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
              {whyFixIt.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {whyFixIt.heading}
          </h2>
        </motion.div>

        {/* 4 Items in horizontal row (responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFixIt.items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-teal-400/40 shadow-lg hover:shadow-[0_0_25px_-5px_rgba(45,212,191,0.2)] transition-all duration-300 flex flex-col group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-teal-500/20 transition-all">
                {getItemIcon(idx)}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base tracking-wide uppercase mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
