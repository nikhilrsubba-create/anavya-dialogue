"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SubmitAbstract() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    phone: "",
    theme: "Other related themes",
    title: "",
    abstractText: "",
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [wordCount, setWordCount] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const text = form.abstractText.trim();
    setWordCount(text === "" ? 0 : text.split(/\s+/).length);
  }, [form.abstractText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (wordCount < 250 || wordCount > 300) {
      setStatus(
        `Error: Abstract is ${wordCount} words. Must be 250-300 words.`
      );
      return;
    }

    setStatus("Uploading...");

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
        } = supabase.storage
          .from("abstracts")
          .getPublicUrl(fileName);

        pdfUrl = publicUrl;
      }

      const { error } = await supabase
        .from("submissions")
        .insert([
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

      setStatus("Success! Abstract and PDF submitted.");

      setForm({
        name: "",
        email: "",
        affiliation: "",
        phone: "",
        theme: "Other related themes",
        title: "",
        abstractText: "",
      });

      setPdfFile(null);
    } catch (err: any) {
      setStatus(err.message || "Submission failed.");
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-20 px-4 max-w-2xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-6">
        Abstract Submission
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 border rounded shadow-sm space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <input
          type="text"
          placeholder="Affiliation"
          required
          onChange={(e) =>
            setForm({ ...form, affiliation: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          required
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <input
          type="text"
          placeholder="Paper Title"
          required
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <div className="text-right text-xs text-brand-terracotta font-mono">
          Words: {wordCount} (Target: 250-300)
        </div>

        <textarea
          placeholder="Paste abstract..."
          rows={8}
          required
          onChange={(e) =>
            setForm({
              ...form,
              abstractText: e.target.value,
            })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <div>
          <label className="block mb-2 font-medium">
            Upload PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPdfFile(e.target.files?.[0] || null)
            }
            className="w-full border p-2 text-sm rounded"
          />
        </div>

        {status && (
          <div className="text-sm p-2 bg-brand-cream rounded">
            {status}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-brand-terracotta text-white py-3 rounded text-sm font-medium"
        >
          Submit Abstract
        </button>
      </form>
    </div>
  );
}