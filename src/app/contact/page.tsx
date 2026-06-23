"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{ type: "idle" | "error" | "success" | "loading"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    const result = await supabase
      .from("tickets")
      .insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ])
      .select();

    if (result.error) {
      setStatus({ type: "error", message: result.error.message });
    } else {
      setStatus({ type: "success", message: "Message sent. The secretariat will get back to you shortly." });
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16 sm:py-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="w-11 h-11 bg-brand-terracotta/10 text-brand-terracotta rounded-lg flex items-center justify-center mb-5">
          <Mail size={20} />
        </div>
        <h1 className="text-4xl font-serif text-brand-darkNavy mb-2">Contact Secretariat</h1>
        <p className="text-sm text-brand-charcoal/60 mb-8">Questions about submissions, registration, or the programme? Send us a note.</p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 border border-brand-gold/20 rounded-xl shadow-sm">
          <div>
            <label className="field-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="field-input"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@university.edu"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="field-input"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="How can we help?"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="field-input"
            />
          </div>

          {status.type !== "idle" && (
            <div
              role="status"
              className={`text-sm p-3 rounded-lg ${
                status.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : status.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-brand-gold/10 text-brand-charcoal"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full bg-brand-terracotta text-white py-3 rounded-lg text-sm font-medium tracking-wide hover:bg-brand-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
