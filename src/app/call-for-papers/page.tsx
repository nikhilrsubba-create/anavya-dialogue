"use client";

import { motion } from "framer-motion";
import {
  Music, Film, Radio, Users, Sprout, Scale, Star, Plane,
  Landmark, BookOpen, Globe2, Building2, Sparkles, Trophy, MoreHorizontal,
} from "lucide-react";
import { SUB_THEMES } from "@/lib/themes";

const icons = [
  Music, Film, Radio, Users, Sprout, Scale, Star, Plane,
  Landmark, BookOpen, Globe2, Building2, Sparkles, Trophy, MoreHorizontal,
];

export default function CallForPapers() {
  return (
    <div className="bg-brand-cream min-h-screen py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Call for Papers</p>
        <h1 className="text-4xl font-serif text-brand-darkNavy mb-3">Indicative Sub-Themes</h1>
        <p className="text-sm text-brand-charcoal/60 mb-10 max-w-2xl">
          These sub-themes are starting points, not boundaries — we welcome papers that cut across categories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUB_THEMES.map((theme, idx) => {
            const Icon = icons[idx] ?? MoreHorizontal;
            return (
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white p-5 rounded-xl border border-brand-gold/20 hover:border-brand-terracotta/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-brand-gold/10 text-brand-terracotta rounded-lg flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-medium text-brand-charcoal leading-snug">{theme}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
