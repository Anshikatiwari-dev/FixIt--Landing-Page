"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundGlows } from "@/components/BackgroundGlows";
import { FloatingChat } from "@/components/FloatingChat";
import { ShowProblemModal } from "@/components/ShowProblemModal";
import { LoginModal } from "@/components/LoginModal";
import {
  Booking,
  BookingStatus,
  TIMELINE_STEPS,
  INITIAL_MOCK_BOOKINGS,
  loadStoredBookings,
  advanceBookingStatus,
  cancelBooking,
  rateBooking,
} from "@/data/bookings";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Check,
  Zap,
  Plus,
  HelpCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  PackageOpen,
} from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_MOCK_BOOKINGS);
  const [activeTab, setActiveTab] = useState<"Active" | "Completed" | "Cancelled">("Active");
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Rating state per booking
  const [ratingInput, setRatingInput] = useState<{ [bookingId: string]: { stars: number; comment: string } }>({});

  useEffect(() => {
    setBookings(loadStoredBookings());
  }, []);

  const handleAdvanceStatus = (id: string) => {
    const updated = advanceBookingStatus(id);
    setBookings(updated);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updated = cancelBooking(id);
      setBookings(updated);
    }
  };

  const handleRateSubmit = (id: string) => {
    const data = ratingInput[id];
    if (!data || data.stars === 0) {
      alert("Please select at least 1 star to rate.");
      return;
    }
    const updated = rateBooking(id, data.stars, data.comment || "");
    setBookings(updated);
  };

  const activeBookings = bookings.filter(
    (b) => b.status !== "Completed" && b.status !== "Cancelled"
  );
  const completedBookings = bookings.filter((b) => b.status === "Completed");
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled");

  const currentList =
    activeTab === "Active"
      ? activeBookings
      : activeTab === "Completed"
      ? completedBookings
      : cancelledBookings;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 border border-teal-400/40 text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            <span>• In Progress</span>
          </span>
        );
      case "Technician Assigned":
      case "En Route":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-400/40 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>• {status}</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>• Completed</span>
          </span>
        );
      case "Cancelled":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 border border-rose-400/40 text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span>• Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-white">
      <BackgroundGlows />

      <Navbar
        onOpenScanModal={() => setIsProblemModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      <main className="flex-1 relative z-10 pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* ================= PAGE HEADER ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                My Bookings & Live Status
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Track assigned verified specialists, verify service OTP, and review service history.
              </p>
            </div>

            {/* + Book Another Service Button */}
            <button
              type="button"
              onClick={() => setIsProblemModalOpen(true)}
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_28px_rgba(45,212,191,0.6)] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Book Another Service</span>
            </button>
          </div>

          {/* ================= STATUS TABS ================= */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
            {(["Active", "Completed", "Cancelled"] as const).map((tab) => {
              const count =
                tab === "Active"
                  ? activeBookings.length
                  : tab === "Completed"
                  ? completedBookings.length
                  : cancelledBookings.length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === tab
                      ? "bg-teal-400 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono ${
                      activeTab === tab ? "bg-slate-950/20 text-slate-950" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ================= BOOKINGS LIST ================= */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {currentList.length > 0 ? (
                currentList.map((booking) => {
                  const showOtp =
                    booking.status === "Technician Assigned" ||
                    booking.status === "En Route" ||
                    booking.status === "In Progress";

                  const canCancel =
                    booking.status === "Booking Confirmed" ||
                    booking.status === "Technician Assigned";

                  return (
                    <motion.div
                      key={booking.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="rounded-3xl bg-white/[0.035] hover:bg-white/[0.05] backdrop-blur-2xl border border-white/10 hover:border-teal-500/30 shadow-2xl transition-all overflow-hidden"
                    >
                      {/* Top Row: ID chip, Booked date, Service Title, Status, Price */}
                      <div className="p-6 sm:p-7 border-b border-white/10 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {/* Left: ID & Booked time */}
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs font-bold text-teal-300 bg-teal-500/10 border border-teal-400/30 px-2.5 py-1 rounded-lg">
                              {booking.id}
                            </span>
                            <span className="text-xs text-slate-400">
                              • {booking.bookedAt}
                            </span>
                          </div>

                          {/* Right: Status Pill & Price */}
                          <div className="flex items-center gap-4">
                            {getStatusBadge(booking.status)}
                            <span className="text-2xl font-extrabold text-white font-mono">
                              ₹{booking.price}
                            </span>
                          </div>
                        </div>

                        {/* Service Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {booking.serviceTitle}
                        </h2>
                      </div>

                      {/* ================= LIVE SERVICE TIMELINE ================= */}
                      <div className="px-6 sm:px-7 py-6 border-b border-white/10 bg-slate-950/30">
                        <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-teal-400 uppercase block mb-5">
                          LIVE SERVICE TIMELINE
                        </span>

                        {/* Horizontal Timeline (Desktop) */}
                        <div className="hidden sm:block relative">
                          {/* Progress Track */}
                          <div className="absolute top-4 left-6 right-6 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 shadow-[0_0_12px_#2dd4bf] transition-all duration-700"
                              style={{
                                width: `${((booking.stepIndex - 1) / 4) * 100}%`,
                              }}
                            />
                          </div>

                          {/* 5 Steps */}
                          <div className="relative z-10 flex items-start justify-between">
                            {TIMELINE_STEPS.map((stepName, sIdx) => {
                              const stepNum = sIdx + 1;
                              const isCompleted = stepNum < booking.stepIndex;
                              const isCurrent = stepNum === booking.stepIndex;

                              return (
                                <div key={stepName} className="flex flex-col items-center text-center max-w-[110px]">
                                  {/* Step Circle */}
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                      isCompleted
                                        ? "bg-teal-400 text-slate-950 shadow-[0_0_12px_rgba(45,212,191,0.6)]"
                                        : isCurrent
                                        ? "bg-slate-950 text-teal-300 border-2 border-teal-400 ring-4 ring-teal-400/20 animate-pulse"
                                        : "bg-slate-900 border border-white/15 text-slate-500"
                                    }`}
                                  >
                                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                                  </div>

                                  {/* Step Label */}
                                  <span
                                    className={`mt-2 text-[11px] leading-tight font-medium ${
                                      isCurrent
                                        ? "text-teal-300 font-bold"
                                        : isCompleted
                                        ? "text-slate-200"
                                        : "text-slate-500"
                                    }`}
                                  >
                                    {stepName}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Vertical Timeline (Mobile) */}
                        <div className="sm:hidden space-y-3 pl-2">
                          {TIMELINE_STEPS.map((stepName, sIdx) => {
                            const stepNum = sIdx + 1;
                            const isCompleted = stepNum < booking.stepIndex;
                            const isCurrent = stepNum === booking.stepIndex;

                            return (
                              <div key={stepName} className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    isCompleted
                                      ? "bg-teal-400 text-slate-950"
                                      : isCurrent
                                      ? "border-2 border-teal-400 text-teal-300"
                                      : "bg-slate-800 text-slate-500"
                                  }`}
                                >
                                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                                </div>
                                <span
                                  className={`text-xs ${
                                    isCurrent ? "text-teal-300 font-bold" : isCompleted ? "text-slate-200" : "text-slate-500"
                                  }`}
                                >
                                  {stepName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* ================= DETAILS ROW ================= */}
                      <div className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Left Column: Appointment Window & Location */}
                        <div className="lg:col-span-6 space-y-5">
                          {/* Appointment Window */}
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <strong className="text-white text-sm block">
                                {booking.appointmentWindow}
                              </strong>
                              <span className="text-xs text-slate-400">
                                Service Appointment Window
                              </span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <strong className="text-white text-sm block">
                                {booking.address}
                              </strong>
                              <span className="text-xs text-slate-400">
                                Service Location
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Nested Glass Technician Card */}
                        <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          {/* Technician profile */}
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-slate-950 font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                              {booking.technician.avatarInitial}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-white text-sm">
                                  {booking.technician.name}
                                </strong>
                                {booking.technician.verified && (
                                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                                    VERIFIED
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {booking.technician.experienceYears} years exp • ★ {booking.technician.rating}
                              </div>
                              <a
                                href={`tel:${booking.technician.phone}`}
                                className="inline-flex items-center gap-1 text-xs text-teal-400 hover:underline mt-1 font-mono"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{booking.technician.phone}</span>
                              </a>
                            </div>
                          </div>

                          {/* OTP & Role */}
                          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                            {showOtp ? (
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                                  START OTP
                                </span>
                                <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-teal-300">
                                  {booking.otp}
                                </span>
                              </div>
                            ) : null}
                            <span className="text-xs text-slate-400 mt-1 block">
                              {booking.technician.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ================= RATING SECTION (WHEN COMPLETED) ================= */}
                      {booking.status === "Completed" && (
                        <div className="px-6 sm:px-7 py-5 bg-teal-950/20 border-t border-white/10 space-y-3">
                          <h4 className="text-xs font-mono font-bold tracking-wider text-teal-300 uppercase">
                            Rate your experience with {booking.technician.name}
                          </h4>

                          {booking.userRating ? (
                            <div className="flex items-center gap-3 text-xs text-slate-300">
                              <div className="flex items-center text-amber-400">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-4 h-4 ${
                                      s <= booking.userRating!.stars ? "fill-amber-400" : "text-slate-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span>"{booking.userRating.comment}"</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() =>
                                      setRatingInput((prev) => ({
                                        ...prev,
                                        [booking.id]: {
                                          stars: s,
                                          comment: prev[booking.id]?.comment || "",
                                        },
                                      }))
                                    }
                                    className="p-1 text-slate-500 hover:text-amber-400"
                                  >
                                    <Star
                                      className={`w-5 h-5 ${
                                        (ratingInput[booking.id]?.stars || 0) >= s
                                          ? "text-amber-400 fill-amber-400"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>

                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Leave a quick review comment..."
                                  value={ratingInput[booking.id]?.comment || ""}
                                  onChange={(e) =>
                                    setRatingInput((prev) => ({
                                      ...prev,
                                      [booking.id]: {
                                        stars: prev[booking.id]?.stars || 5,
                                        comment: e.target.value,
                                      },
                                    }))
                                  }
                                  className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRateSubmit(booking.id)}
                                  className="px-4 py-1.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs shadow-md hover:bg-teal-300"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ================= FOOTER STRIP ================= */}
                      <div className="px-6 sm:px-7 py-3.5 bg-slate-950/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                        {/* Left: Advance Status (Demo Step X/5) */}
                        {booking.status !== "Completed" && booking.status !== "Cancelled" ? (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStatus(booking.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all font-mono font-medium cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-teal-400" />
                            <span>
                              ⚡ Advance Status (Demo Step {booking.stepIndex}/5)
                            </span>
                          </button>
                        ) : (
                          <div className="text-slate-400 font-mono text-[11px]">
                            {booking.status === "Completed"
                              ? "Service successfully resolved"
                              : "Booking cancelled"}
                          </div>
                        )}

                        {/* Right: Need Help? & Cancel Booking */}
                        <div className="flex items-center gap-4">
                          <a
                            href="#help"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Opening 24x7 priority support channel for booking: " + booking.id);
                            }}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            Need Help?
                          </a>

                          {canCancel && (
                            <button
                              type="button"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-rose-400 hover:text-rose-300 font-medium transition-colors cursor-pointer"
                            >
                              Cancel Booking
                            </button>
                          )}

                          {booking.status === "Completed" && (
                            <button
                              type="button"
                              onClick={() => setIsProblemModalOpen(true)}
                              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                            >
                              Book Again
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                /* Empty state */
                <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                    <PackageOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">No {activeTab.toLowerCase()} bookings</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
                    Have an appliance, fixture, furniture, or gadget with an issue? Show it to FixIt to get upfront pricing and doorstep repair.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsProblemModalOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-teal-400 text-slate-950 font-bold text-xs shadow-md hover:bg-teal-300"
                  >
                    Show Your Problem
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Chat Panel */}
      <FloatingChat />

      {/* Modals */}
      <ShowProblemModal
        isOpen={isProblemModalOpen}
        onClose={() => setIsProblemModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
