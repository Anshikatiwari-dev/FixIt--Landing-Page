"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, Category } from "@/data/categories";
import {
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  Waves,
  Wind,
  Utensils,
  Zap,
  Fan,
  Armchair,
  Droplets,
  Plug,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Laptop":
        return <Laptop className="w-5 h-5" />;
      case "Tv":
        return <Tv className="w-5 h-5" />;
      case "Refrigerator":
        return <Refrigerator className="w-5 h-5" />;
      case "Waves":
        return <Waves className="w-5 h-5" />;
      case "Wind":
        return <Wind className="w-5 h-5" />;
      case "Utensils":
        return <Utensils className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Fan":
        return <Fan className="w-5 h-5" />;
      case "Armchair":
        return <Armchair className="w-5 h-5" />;
      case "Droplets":
        return <Droplets className="w-5 h-5" />;
      case "Plug":
        return <Plug className="w-5 h-5" />;
      case "HelpCircle":
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const query = searchQuery.toLowerCase().trim();
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.subItems.some((sub) => sub.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const displayedCategories = showAll || searchQuery.trim()
    ? filteredCategories
    : filteredCategories.slice(0, 8);

  return (
    <section id="categories" className="relative py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-block">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-teal-400 uppercase">
              WHAT CAN FIXIT FIX?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From phones to fridges. <br className="hidden sm:inline" />
            If it's broken, show it.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Snap a photo or video of any faulty gadget, appliance, fixture, or furniture in your home.
            Our neural diagnostic engine identifies the root cause in seconds.
          </p>
        </motion.div>

        {/* Search Box */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your product (e.g. fridge, tap, iron, AC, laptop)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/15 focus:border-teal-400/80 focus:bg-white/[0.07] focus:outline-none text-white text-sm placeholder:text-slate-500 shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-full bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence>
            {displayedCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative p-5 rounded-2xl bg-white/[0.035] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-teal-400/50 shadow-lg hover:shadow-[0_0_25px_-5px_rgba(45,212,191,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-teal-400/80 uppercase bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                      {cat.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base group-hover:text-teal-300 transition-colors mb-1.5 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">
                    {cat.description}
                  </p>
                </div>

                {/* Sub-item pills */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                  {cat.subItems.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[11px] text-slate-300/80 bg-white/[0.04] px-2 py-0.5 rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                  {cat.subItems.length > 3 && (
                    <span className="text-[11px] text-teal-400 font-mono self-center">
                      +{cat.subItems.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Toggle Button */}
        {!searchQuery && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-teal-400/40 text-sm font-semibold text-slate-200 hover:text-white transition-all shadow-md cursor-pointer"
            >
              <span>{showAll ? "Show Less Categories" : `View All ${CATEGORIES.length} Categories`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
