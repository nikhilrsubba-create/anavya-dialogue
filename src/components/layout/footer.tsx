import Link from "next/link";
import Image from "next/image";
import { Mail, Globe, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-darkNavy text-brand-cream/90">
      <div className="h-[3px] bg-gradient-to-r from-brand-terracotta via-brand-gold to-brand-terracotta" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image src="/logo.jpeg" alt="Anvaya Logo" width={36} height={36} className="object-contain rounded-full" />
              <h3 className="text-2xl font-serif text-brand-gold">Anvaya</h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-brand-cream/60 mb-4">Education | Culture | Arts | Research | Community</p>
            <p className="text-sm text-brand-cream/70 leading-relaxed max-w-sm">Anvaya: The Dialogue invites global thinkers to exchange insights into popular culture in South Asia.</p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-brand-gold font-semibold mb-4">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/about" className="hover:text-brand-gold">About</Link>
              <Link href="/conference" className="hover:text-brand-gold">Conference</Link>
              <Link href="/call-for-papers" className="hover:text-brand-gold">Call For Papers</Link>
              <Link href="/submit-abstract" className="hover:text-brand-gold">Submit Abstract</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-brand-gold font-semibold mb-4">Official Desk</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@anvayathedialogue.org" className="flex items-center space-x-3 hover:text-brand-gold"><Mail size={16} /> <span>info@anvayathedialogue.org</span></a>
              <a href="https://www.anvayathedialogue.org" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-brand-gold"><Globe size={16} /> <span>www.anvayathedialogue.org</span></a>
              <div className="flex items-center space-x-3 text-brand-cream/70"><MapPin size={16} /> <span>South Asia Focus Group Initiative</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-cream/10 mt-10 pt-6 text-xs text-brand-cream/40">
          © {new Date().getFullYear()} Anvaya: The Dialogue. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
