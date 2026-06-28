"use client";

import { motion } from "framer-motion";
import { Film, Radio, Users, Sparkles } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";

const highlightThemes = [
  { title: "Cinema, Streaming & TV", desc: "Analyzing cross-border streaming platforms, narrative shifts, and changing audience topologies.", icon: Film },
  { title: "Social Media & Digital Cultures", desc: "Understanding hyper-local memes, viral content ecosystems, and algorithmic interactions.", icon: Radio },
  { title: "Youth, Fandoms & Identity", desc: "Tracing fandom dynamics, celebrity culture, sub-cultural spaces, and digital ownership.", icon: Users },
  { title: "AI & Digital Creativity", desc: "The emergent frontier of generative artificial intelligence and shifting paradigms of creativity.", icon: Sparkles },
];

export default function ThemesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightThemes.map((theme, idx) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="bg-brand-cream/40 border border-brand-gold/20 p-6 rounded-lg hover:border-brand-terracotta/40 hover:shadow-xl transition-[border-color,box-shadow] group overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-10 h-10 bg-brand-gold/10 text-brand-terracotta rounded flex items-center justify-center mb-4 group-hover:bg-brand-terracotta group-hover:text-white transition-colors"
                >
                  <theme.icon size={20} />
                </motion.div>
                <h3 className="text-lg font-serif font-bold text-brand-charcoal mb-2">{theme.title}</h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed">{theme.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
