"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/data/content";
import { Wrench, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenScanModal?: () => void;
  onOpenLoginModal?: () => void;
}

export function Navbar({ onOpenScanModal, onOpenLoginModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#050B1F]/90 backdrop-blur-xl border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-[#050B1F]/70 backdrop-blur-md border-white/10"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-full"
            aria-label="FixIt Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 flex items-center justify-center p-1.5 shadow-[0_0_12px_rgba(45,212,191,0.5)] group-hover:scale-105 transition-transform">
              <Wrench className="w-full h-full text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Fix<span className="text-teal-400">It</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteContent.navigation.links.map((link) => {
              const isCurrent =
                link.href === "/bookings"
                  ? pathname === "/bookings"
                  : pathname === "/" && link.href.startsWith("/#");

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`px-3.5 py-1.5 text-sm rounded-full transition-all duration-200 ${
                      isCurrent
                        ? "text-teal-300 bg-teal-500/15 border border-teal-500/30 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
            >
              {siteContent.navigation.loginText}
            </button>
            <button
              type="button"
              onClick={onOpenScanModal}
              className="px-5 py-1.5 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-95 rounded-full shadow-[0_0_16px_rgba(45,212,191,0.35)] hover:shadow-[0_0_22px_rgba(45,212,191,0.5)] transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 cursor-pointer"
            >
              <span>{siteContent.navigation.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenScanModal}
              className="px-3 py-1 text-xs font-semibold text-slate-950 bg-teal-400 rounded-full"
            >
              Scan
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="sm:hidden mt-2 p-4 rounded-2xl bg-[#050B1F]/95 backdrop-blur-2xl border border-white/15 shadow-2xl"
            >
              <ul className="flex flex-col gap-1.5 mb-4">
                {siteContent.navigation.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-200 hover:text-teal-300 hover:bg-white/5 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLoginModal?.();
                  }}
                  className="w-full py-2.5 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-center"
                >
                  {siteContent.navigation.loginText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScanModal?.();
                  }}
                  className="w-full py-2.5 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl text-center shadow-[0_0_20px_rgba(45,212,191,0.3)] flex items-center justify-center gap-1.5"
                >
                  <span>{siteContent.navigation.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
