"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting:", form);

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

    console.log("Supabase result:", result);

    if (result.error) {
      alert(result.error.message);
      console.error(result.error);
    } else {
      alert("Ticket dispatched!");
      console.log("Inserted row:", result.data);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-20 px-4 max-w-xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-8">
        Contact Secretariat
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 border rounded"
      >
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <textarea
          placeholder="Message"
          rows={4}
          required
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="w-full border p-2 text-sm rounded"
        />

        <button
          type="submit"
          className="bg-brand-terracotta text-white px-4 py-2 text-sm rounded"
        >
          Send Ticket
        </button>
      </form>
    </div>
  );
}