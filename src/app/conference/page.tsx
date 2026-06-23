"use client";
import { Calendar, FileCheck, PartyPopper } from "lucide-react";

const milestones = [
  { label: "Abstract Deadline", date: "1st August 2026", icon: FileCheck, emphasis: true },
  { label: "Acceptance Notification", date: "15th August 2026", icon: Calendar, emphasis: false },
  { label: "Conference Date", date: "30th October 2026", icon: PartyPopper, emphasis: false },
];

export default function ConferencePage() {
  return (
    <div className="bg-brand-cream min-h-[70vh] py-16 sm:py-20 px-4 max-w-3xl mx-auto">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Key Dates</p>
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-3">International Conference Details</h1>
      <p className="text-sm text-brand-charcoal/60 mb-10 max-w-xl">
        Mark your calendar — here's the timeline from submission to the conference itself.
      </p>
      <div className="relative">
        {milestones.map((m, idx) => (
          <div key={m.label} className="flex gap-4 relative">
            <div className="flex flex-col items-center">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${m.emphasis ? "bg-brand-terracotta text-white" : "bg-white border border-brand-gold/30 text-brand-terracotta"}`}>
                <m.icon size={18} />
              </div>
              {idx < milestones.length - 1 && <div className="w-px flex-1 bg-brand-gold/30 my-1" />}
            </div>
            <div className={`pb-10 ${idx === milestones.length - 1 ? "pb-0" : ""}`}>
              <p className="text-sm text-brand-charcoal/60">{m.label}</p>
              <p className={`text-xl font-serif ${m.emphasis ? "text-brand-terracotta" : "text-brand-darkNavy"}`}>{m.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
