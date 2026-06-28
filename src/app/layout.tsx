import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anvaya – The Dialogue | Popular Culture in South Asia",
  description: "International Conference on Popular Culture in South Asia. October 30th, 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-brand-cream selection:bg-brand-gold selection:text-white">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
