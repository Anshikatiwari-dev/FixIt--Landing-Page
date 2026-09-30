"use client";

import { siteContent } from "@/data/content";
import { Wrench } from "lucide-react";

export function Footer() {
  const { footer, brand } = siteContent;

  return (
    <footer className="relative border-t border-white/10 bg-[#020617]/95 backdrop-blur-md pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-full"
              aria-label="FixIt Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 flex items-center justify-center p-1.5 shadow-[0_0_12px_rgba(45,212,191,0.5)] group-hover:scale-105 transition-transform">
                <Wrench className="w-full h-full text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Fix<span className="text-teal-400">It</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm italic font-medium">
              "{brand.tagline}"
            </p>

            {/* Social Icons in Small Rounded Squares */}
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/40 flex items-center justify-center text-slate-400 hover:text-teal-300 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/40 flex items-center justify-center text-slate-400 hover:text-teal-300 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/40 flex items-center justify-center text-slate-400 hover:text-teal-300 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase">
              SUPPORT
            </h4>
            <ul className="space-y-2">
              {footer.supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="pt-8 border-t border-white/10 text-center sm:text-left text-xs text-slate-500">
          <div>{brand.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
