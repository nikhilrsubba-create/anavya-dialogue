"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-cream border-b border-brand-gold/10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10 py-12">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.jpeg"
            alt="Anvaya Logo"
            width={250}
            height={250}
            priority
            className="object-contain"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4"
        >
          International Conference Call for Papers
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-serif text-brand-charcoal"
        >
          Popular Culture in South Asia

          <span className="block text-2xl sm:text-3xl font-medium font-sans text-brand-charcoal/80 mt-3 italic">
            Identities, Media and Everyday Life
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-base sm:text-lg text-brand-charcoal/70 max-w-3xl mx-auto mt-8"
        >
          Exploring the diverse forms of popular culture across South Asia
          and their structural roles in shaping communities, identities,
          media narratives and everyday experiences.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            href="/submit-abstract"
            className="w-full sm:w-auto bg-brand-terracotta text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <FileText size={18} />
            Submit Abstract
          </Link>

          <Link
            href="/call-for-papers"
            className="w-full sm:w-auto border border-brand-gold/60 px-6 py-3 rounded-lg hover:bg-brand-gold/10 transition"
          >
            Explore Sub-themes
          </Link>

        </div>
      </div>
    </section>
  );
}