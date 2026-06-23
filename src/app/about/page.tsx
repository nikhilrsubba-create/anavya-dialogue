"use client";
import { motion } from "framer-motion";
import { BookOpen, Shield, Sparkles, Award } from "lucide-react";

const pillars = [
  { title: "Education", desc: "Expanding educational outreach and building alternative knowledge structures.", icon: BookOpen },
  { title: "Culture", desc: "Mapping historical, indigenous, and contemporary cultural transformations.", icon: Shield },
  { title: "Arts", flex: 1, desc: "Fostering creative visual, auditory, and performance practices.", icon: Sparkles },
  { title: "Research & Community", desc: "Sponsoring rigorous critical discourse and multi-disciplinary inquiry.", icon: Award },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-6">About Anvaya – &apos;The Dialogue&apos;</h1>
      <p className="text-brand-charcoal text-lg mb-12">Anvaya is an international conceptual hub designed to invite scholars and researchers to unpack systemic paradigms framing contemporary South Asian life.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-white border border-brand-gold/20 p-6 rounded shadow-sm">
            <h3 className="text-lg font-serif font-bold text-brand-darkNavy mb-2">{p.title}</h3>
            <p className="text-sm text-brand-charcoal/70">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
