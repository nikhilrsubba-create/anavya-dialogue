"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { SUB_THEMES } from "@/lib/themes";

export default function SubmitAbstract() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    phone: "",
    theme: SUB_THEMES[SUB_THEMES.length - 1],
    title: "",
    abstractText: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [wordCount, setWordCount] = useState(0);
  const [status, setStatus] = useState<{ type: "idle" | "error" | "success" | "loading"; message: string }>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    const text = form.abstractText.trim();
    setWordCount(text === "" ? 0 : text.split(/\s+/).length);
  }, [form.abstractText]);

  const wordCountInRange = wordCount >= 250 && wordCount <= 300;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wordCountInRange) {
      setStatus({
        type: "error",
        message: `Your abstract is ${wordCount} words. It needs to be between 250 and 300 words.`,
      });
      return;
    }

    setStatus({ type: "loading", message: "Submitting your abstract..." });

    try {
      let pdfUrl = "";

      if (pdfFile) {
        const fileName = `${Date.now()}-${pdfFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("abstracts")
          .upload(fileName, pdfFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("abstracts").getPublicUrl(fileName);

        pdfUrl = publicUrl;
      }

      const { error } = await supabase.from("submissions").insert([
        {
          author_name: form.name,
          author_email: form.email,
          affiliation: form.affiliation,
          phone_number: form.phone,
          selected_theme: form.theme,
          paper_title: form.title,
          abstract_text: form.abstractText,
          word_count: wordCount,
          pdf_url: pdfUrl,
        },
      ]);

      if (error) throw error;

      setStatus({ type: "success", message: "Your abstract has been submitted. We'll be in touch by 15th August 2026." });

      setForm({
        name: "",
        email: "",
        affiliation: "",
        phone: "",
        theme: SUB_THEMES[SUB_THEMES.length - 1],
        title: "",
        abstractText: "",
      });

      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Call for Papers</p>
        <h1 className="text-4xl font-serif text-brand-darkNavy mb-2">Abstract Submission</h1>
        <p className="text-sm text-brand-charcoal/60 mb-8">All fields are required. Abstracts must be 250–300 words.</p>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border border-brand-gold/20 rounded-xl shadow-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Ananya Roy"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="field-input"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@university.edu"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="field-input"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label" htmlFor="affiliation">Affiliation</label>
              <input
                id="affiliation"
                type="text"
                placeholder="University or Institute"
                required
                value={form.affiliation}
                onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                className="field-input"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 00000 00000"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="field-input"
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="theme">Sub-theme</label>
            <select
              id="theme"
              required
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
              className="field-input appearance-none bg-white"
            >
              {SUB_THEMES.map((theme) => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="title">Paper Title</label>
            <input
              id="title"
              type="text"
              placeholder="The title of your paper"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="field-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="field-label !mb-0" htmlFor="abstract">Abstract</label>
              <span className={`text-xs font-mono font-medium ${wordCountInRange ? "text-green-700" : "text-brand-terracotta"}`}>
                {wordCount} / 250–300 words
              </span>
            </div>
            <textarea
              id="abstract"
              placeholder="Paste your abstract here..."
              rows={8}
              required
              value={form.abstractText}
              onChange={(e) => setForm({ ...form, abstractText: e.target.value })}
              className="field-input"
            />
          </div>

          <div>
            <label className="field-label">Upload PDF</label>
            <input
              ref={fileInputRef}
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="sr-only"
            />
            {!pdfFile ? (
              <label
                htmlFor="pdf-upload"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-gold/40 rounded-lg py-8 px-4 text-center cursor-pointer hover:border-brand-terracotta hover:bg-brand-gold/5 transition-colors"
              >
                <UploadCloud size={26} className="text-brand-terracotta" />
                <span className="text-sm text-brand-charcoal/70">
                  <span className="text-brand-terracotta font-medium">Click to upload</span> your abstract PDF
                </span>
              </label>
            ) : (
              <div className="flex items-center justify-between border border-brand-gold/30 bg-brand-gold/5 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-brand-charcoal min-w-0">
                  <FileCheck2 size={18} className="text-brand-terracotta shrink-0" />
                  <span className="truncate">{pdfFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPdfFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  aria-label="Remove file"
                  className="text-brand-charcoal/50 hover:text-brand-terracotta shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            )}
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
            {status.type === "loading" ? "Submitting..." : "Submit Abstract"}
          </button>
        </form>
      </div>
    </div>
  );
}
