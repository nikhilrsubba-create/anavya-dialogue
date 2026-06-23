"use client";
import { motion } from "framer-motion";
import { BookOpen, Shield, Sparkles, Award } from "lucide-react";

const pillars = [
  { title: "Education", desc: "Expanding educational outreach and building alternative knowledge structures.", icon: BookOpen },
  { title: "Culture", desc: "Mapping historical, indigenous, and contemporary cultural transformations.", icon: Shield },
  { title: "Arts", desc: "Fostering creative visual, auditory, and performance practices.", icon: Sparkles },
  { title: "Research & Community", desc: "Sponsoring rigorous critical discourse and multi-disciplinary inquiry.", icon: Award },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-16 sm:py-20 px-4 max-w-4xl mx-auto">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">About</p>
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-6">About Anvaya – &apos;The Dialogue&apos;</h1>
      <p className="text-brand-charcoal text-lg mb-12 max-w-2xl">Anvaya is an international conceptual hub designed to invite scholars and researchers to unpack systemic paradigms framing contemporary South Asian life.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border border-brand-gold/20 p-6 rounded-xl shadow-sm hover:border-brand-terracotta/40 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-brand-gold/10 text-brand-terracotta rounded-lg flex items-center justify-center mb-4">
              <p.icon size={20} />
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-darkNavy mb-2">{p.title}</h3>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
