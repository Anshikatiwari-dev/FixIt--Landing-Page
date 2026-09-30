"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, ShieldCheck } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md rounded-3xl bg-[#050B1F] border border-teal-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(45,212,191,0.25)] z-10 overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-widest">
                    FIXIT ACCOUNT
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">Welcome back</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Enter your email to receive a passwordless instant login link.
                  </p>
                </div>

                <div>
                  <label htmlFor="login-email" className="block text-xs text-slate-300 font-medium mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-teal-400 focus:outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Continue with Magic Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Secure 256-bit encrypted authentication</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Check your email</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  We've sent a magic link to <strong className="text-teal-300">{email}</strong>.
                  Click it to sign in instantly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
