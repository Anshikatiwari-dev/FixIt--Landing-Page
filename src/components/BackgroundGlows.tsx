"use client";

export function BackgroundGlows() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 mask-radial" />

      {/* Top Center-Right Teal Glow (Hero focal area) */}
      <div className="absolute -top-[20%] right-[10%] w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Center Blue Glow */}
      <div className="absolute -top-[15%] left-[20%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Mid Section Subtle Cyan Glow */}
      <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Lower Section Blue/Teal Ambient Orb */}
      <div className="absolute top-[70%] right-[5%] w-[700px] h-[600px] bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
    </div>
  );
}
