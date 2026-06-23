"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-cream/90 backdrop-blur-md shadow-sm border-b border-brand-gold/20 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold font-serif tracking-wide text-brand-charcoal">Anvaya</span>
            <span className="text-xs uppercase tracking-widest text-brand-terracotta -mt-1">The Dialogue</span>
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
            <Link href="/submit-abstract" className="bg-brand-terracotta text-white px-5 py-2.5 rounded text-sm font-medium tracking-wide hover:bg-brand-charcoal transition-colors duration-300 shadow-md">
              Submit Abstract
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal hover:text-brand-terracotta">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
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
