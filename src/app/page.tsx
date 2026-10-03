"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoriesSection } from "@/components/CategoriesSection";
import { Signal } from "@/components/Signal";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { RepairVsReplace } from "@/components/RepairVsReplace";
import { WhyFixIt } from "@/components/WhyFixIt";
import { CircularEconomy } from "@/components/CircularEconomy";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { BackgroundGlows } from "@/components/BackgroundGlows";
import { ShowProblemModal } from "@/components/ShowProblemModal";
import { DemoModal } from "@/components/DemoModal";
import { LoginModal } from "@/components/LoginModal";
import { FloatingChat } from "@/components/FloatingChat";

export default function Home() {
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenProblemModal = (categoryId?: string) => {
    setSelectedCategoryId(categoryId || null);
    setIsProblemModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-teal-500/30 selection:text-white">
      {/* Background radial glows and blueprint grid */}
      <BackgroundGlows />

      {/* 1. Navbar */}
      <Navbar
        onOpenScanModal={() => handleOpenProblemModal()}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      <main className="relative z-10">
        {/* 2. Hero Section with rotating chips */}
        <Hero
          onOpenScanModal={() => handleOpenProblemModal()}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* Feature 2: WHAT CAN FIXIT FIX? (Multi-Category Grid Section) */}
        <CategoriesSection
          onSelectCategory={(catId) => handleOpenProblemModal(catId)}
        />

        {/* 3. The FixIt Signal */}
        <Signal />

        {/* 4. How FixIt Works */}
        <HowItWorks />

        {/* 5. Full Repair Intelligence */}
        <Features />

        {/* 6. Repair vs Replace Comparison */}
        <RepairVsReplace onCheckProduct={() => handleOpenProblemModal()} />

        {/* 7. Why FixIt */}
        <WhyFixIt />

        {/* 8. Circular By Design */}
        <CircularEconomy />

        {/* 9. Final CTA */}
        <FinalCTA onOpenScanModal={() => handleOpenProblemModal()} />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Floating AI Chat Assistant */}
      <FloatingChat />

      {/* Feature 1: Show Your Problem Camera + Upload Modal */}
      <ShowProblemModal
        isOpen={isProblemModalOpen}
        onClose={() => setIsProblemModalOpen(false)}
        preselectedCategoryId={selectedCategoryId}
      />

      {/* Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenScan={() => {
          setIsDemoModalOpen(false);
          handleOpenProblemModal();
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
