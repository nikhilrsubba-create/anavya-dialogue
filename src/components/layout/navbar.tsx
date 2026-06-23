"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Conference", path: "/conference" },
  { name: "Call for Papers", path: "/call-for-papers" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progressWidth = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-cream/90 backdrop-blur-md shadow-sm border-b border-brand-gold/20 py-2" : "bg-transparent py-4"}`}>
      <motion.div
        style={{ scaleX: progressWidth }}
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-terracotta via-brand-gold to-brand-terracotta origin-left"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 8, scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
              <Image
                src="/logo.jpeg"
                alt="Anvaya Logo"
                width={42}
                height={42}
                className="object-contain rounded-full"
              />
            </motion.div>
            <span className="flex flex-col">
              <span className="text-xl font-bold font-serif tracking-wide text-brand-charcoal leading-tight">Anvaya</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-terracotta -mt-0.5">The Dialogue</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className="relative group text-sm font-medium tracking-wide text-brand-charcoal hover:text-brand-terracotta transition-colors">
                {item.name}
                {pathname === item.path && (
                  <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-terracotta" />
                )}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/submit-abstract" className="bg-brand-terracotta text-white px-5 py-2.5 rounded text-sm font-medium tracking-wide hover:bg-brand-charcoal transition-colors duration-300 shadow-md inline-block">
                Submit Abstract
              </Link>
            </motion.div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} className="text-brand-charcoal hover:text-brand-terracotta">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-brand-cream border-b border-brand-gold/20 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.path ? "bg-brand-gold/10 text-brand-terracotta" : "text-brand-charcoal hover:bg-brand-gold/5"}`}>
                {item.name}
              </Link>
            ))}
            <Link href="/submit-abstract" onClick={() => setIsOpen(false)} className="block w-full text-center bg-brand-terracotta text-white px-4 py-3 rounded-md font-medium shadow-md">Submit Abstract</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
