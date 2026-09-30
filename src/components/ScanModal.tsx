"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScanModal({ isOpen, onClose }: ScanModalProps) {
  const [scanStep, setScanStep] = useState<"upload" | "scanning" | "results">("upload");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setScanStep("upload");
      setProgress(0);
    }
  }, [isOpen]);

  const handleStartScan = () => {
    setScanStep("scanning");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanStep("results");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

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
            className="relative w-full max-w-xl rounded-3xl bg-[#050B1F] border border-teal-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(45,212,191,0.25)] z-10 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

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
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                FixIt AI Engine 2.0
              </div>
              <h3 className="text-2xl font-bold text-white">Live AI Product Diagnostic</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Upload or capture a photo of the damaged hardware to detect defects.
              </p>
            </div>

            {/* Content Based on Step */}
            {scanStep === "upload" && (
              <div className="space-y-4">
                <div
                  onClick={handleStartScan}
                  className="border-2 border-dashed border-white/20 hover:border-teal-400/60 rounded-2xl p-8 text-center bg-white/[0.02] hover:bg-teal-500/[0.04] transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">
                    Upload Photo or Drag & Drop
                  </h4>
                  <p className="text-slate-400 text-xs max-w-xs mx-auto mb-4">
                    Supports JPG, PNG, HEIC from smartphones, laptops, audio, or wearables
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-teal-400 text-slate-950 text-xs font-bold shadow-md hover:bg-teal-300"
                  >
                    Simulate Live Scan with Demo Device
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-teal-400" /> End-to-end encrypted
                  </span>
                  <span>94% Diagnostic Accuracy</span>
                </div>
              </div>
            )}

            {scanStep === "scanning" && (
              <div className="py-10 text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping" />
                  <div className="relative w-full h-full rounded-2xl bg-teal-500/10 border border-teal-400/50 flex items-center justify-center text-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.4)]">
                    <RefreshCw className="w-10 h-10 animate-spin" />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Analyzing Hardware Faults...</h4>
                  <p className="text-slate-400 text-xs mt-1">
                    Running neural vision model across 14,000+ repair schematics
                  </p>
                </div>

                {/* Progress bar */}
                <div className="max-w-xs mx-auto">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-right text-[11px] font-mono text-teal-400 mt-1">
                    {progress}%
                  </div>
                </div>
              </div>
            )}

            {scanStep === "results" && (
              <div className="space-y-5">
                {/* Result Card */}
                <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/40 shadow-inner space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span>Scan Successful: Problem Identified</span>
                    </div>
                    <span className="text-xs font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full">
                      Confidence 94%
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div>
                      <strong className="text-white">Detected Issue:</strong> Front Glass & OLED
                      Sub-pixel Micro-fractures
                    </div>
                    <div>
                      <strong className="text-white">Estimated Cost:</strong> ₹1,200 (vs ₹9,000 New
                      Replacement)
                    </div>
                    <div>
                      <strong className="text-white">Recommended Action:</strong> Screen Assembly
                      Replacement
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert("Connecting to nearest verified technician in your pincode!");
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book Verified Tech</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert("Opening step-by-step DIY repair manual with required tools checklist!");
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm text-center border border-white/15 transition-colors"
                  >
                    View DIY Guide (Free)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
