"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Sparkles, CheckCircle2, Shield, Wrench } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScan?: () => void;
}

export function DemoModal({ isOpen, onClose, onOpenScan }: DemoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#050B1F] border border-teal-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(45,212,191,0.25)] z-10 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-2 uppercase">
                <Play className="w-3 h-3 fill-teal-400" />
                Product Walkthrough
              </div>
              <h3 className="text-2xl font-bold text-white">How FixIt AI Diagnoses Devices</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                See how a broken smartphone is scanned, diagnosed, and repaired in under 3 minutes.
              </p>
            </div>

            {/* Interactive Mock Video Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-slate-900 flex flex-col items-center justify-center p-6 text-center shadow-inner group">
              <div className="w-16 h-16 rounded-full bg-teal-400/20 border border-teal-400/50 flex items-center justify-center text-teal-300 mb-3 group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-teal-400 ml-1" />
              </div>
              <span className="text-sm font-semibold text-white">Watch Interactive 60s Demo</span>
              <span className="text-xs text-slate-400 mt-1">
                AI Surface Mapping · Price Estimation · Certified Doorstep Tech
              </span>
            </div>

            {/* 3 Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>3-Second Computer Vision Diagnosis</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Upfront Fair Pricing (No Hidden Fees)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                <Shield className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                <span>90-Day Warranty on Replaced Parts</span>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenScan?.();
                }}
                className="px-5 py-2 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Try Live Diagnostic Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
