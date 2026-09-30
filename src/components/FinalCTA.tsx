"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface FinalCTAProps {
  onOpenScanModal?: () => void;
}

export function FinalCTA({ onOpenScanModal }: FinalCTAProps) {
  const { finalCta } = siteContent;

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Glow behind the CTA button */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Eyebrow */}
          <div className="inline-block">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-teal-400 uppercase">
              {finalCta.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            {finalCta.heading}
          </h2>

          {/* Subheading */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            {finalCta.subheading}
          </p>

          {/* Teal Glow Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={onOpenScanModal}
              className="relative group px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(45,212,191,0.55)] hover:shadow-[0_0_50px_rgba(45,212,191,0.8)] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-teal-400/50"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{finalCta.buttonText}</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
