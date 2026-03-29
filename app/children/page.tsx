"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChildrenPage() {
  const supabase = createClient();

  const [form, setForm] = useState({
    full_name: "",
    date_of_birth: "",
    sex: "",
    birth_weight: "",
    clinic_name: "",
    county: "",
    allergies: "",
    medical_notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("children").insert([form]);

    setLoading(false);

    if (error) {
      alert("Error saving child record: " + error.message);
      return;
    }

    alert("Child record saved successfully!");

    setForm({
      full_name: "",
      date_of_birth: "",
      sex: "",
      birth_weight: "",
      clinic_name: "",
      county: "",
      allergies: "",
      medical_notes: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Register Child</h1>
        <p className="mt-2 text-slate-600">
          Add a child into the Vaccine Elite system.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Child Full Name"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="date_of_birth"
            value={form.date_of_birth}
            onChange={handleChange}
            type="date"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="sex"
            value={form.sex}
            onChange={handleChange}
            placeholder="Sex"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="birth_weight"
            value={form.birth_weight}
            onChange={handleChange}
            placeholder="Birth Weight"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="clinic_name"
            value={form.clinic_name}
            onChange={handleChange}
            placeholder="Clinic Name"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="county"
            value={form.county}
            onChange={handleChange}
            placeholder="County"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            placeholder="Allergies"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <textarea
            name="medical_notes"
            value={form.medical_notes}
            onChange={handleChange}
            placeholder="Medical Notes"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button
            disabled={loading}
            className="rounded-2xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Child Record"}
          </button>
        </form>
      </div>
    </main>
  );
}