"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-cream border-b border-brand-gold/10 overflow-hidden">
      {/* Ambient background glow -- ultra subtle, paused for reduced-motion */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-brand-terracotta/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-24 -right-16 w-[380px] h-[380px] rounded-full bg-brand-gold/15 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center relative z-10 py-12"
      >
        {/* Logo */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo.jpeg"
              alt="Anvaya Logo"
              width={250}
              height={250}
              priority
              className="object-contain drop-shadow-sm"
            />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={item} className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">
          International Conference Call for Papers
        </motion.p>

        {/* Main Title */}
        <motion.h1 variants={item} className="text-4xl sm:text-6xl font-serif text-brand-charcoal">
          Popular Culture in South Asia
          <span className="block text-2xl sm:text-3xl font-medium font-sans text-brand-charcoal/80 mt-3 italic">
            Identities, Media and Everyday Life
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p variants={item} className="text-base sm:text-lg text-brand-charcoal/70 max-w-3xl mx-auto mt-8">
          Exploring the diverse forms of popular culture across South Asia
          and their structural roles in shaping communities, identities,
          media narratives and everyday experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/submit-abstract"
              className="w-full sm:w-auto bg-brand-terracotta text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <FileText size={18} />
              Submit Abstract
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <Link
              href="/call-for-papers"
              className="w-full sm:w-auto border border-brand-gold/60 px-6 py-3 rounded-lg hover:bg-brand-gold/10 transition-colors inline-block text-center w-full"
            >
              Explore Sub-themes
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
