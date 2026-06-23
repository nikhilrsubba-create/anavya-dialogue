"use client";
import { Calendar, FileCheck } from "lucide-react";

export default function ConferencePage() {
  return (
    <div className="bg-brand-cream min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-8">International Conference Details</h1>
      <div className="bg-white p-6 rounded-lg border border-brand-gold/20 shadow-sm space-y-4">
        <div className="flex justify-between border-b pb-2"><span>Abstract Deadline:</span><strong className="text-brand-terracotta">1st August 2026</strong></div>
        <div className="flex justify-between border-b pb-2"><span>Acceptance Notification:</span><strong>15th August 2026</strong></div>
        <div className="flex justify-between pb-2"><span>Conference Date:</span><strong>30th October 2026</strong></div>
      </div>
    </div>
  );
}
