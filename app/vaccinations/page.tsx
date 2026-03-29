"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Child = {
  id: string;
  full_name: string;
};

export default function VaccinationsPage() {
  const supabase = createClient();

  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    child_id: "",
    vaccine_name: "",
    dose_number: "",
    date_given: "",
    next_due_date: "",
    clinician_name: "",
    notes: "",
  });

  useEffect(() => {
    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("id, full_name")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setChildren(data);
      }
    };

    fetchChildren();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      dose_number: form.dose_number ? Number(form.dose_number) : null,
    };

    const { error } = await supabase.from("vaccinations").insert([payload]);

    setLoading(false);

    if (error) {
      alert("Error saving vaccination: " + error.message);
      return;
    }

    alert("Vaccination record saved successfully!");

    setForm({
      child_id: "",
      vaccine_name: "",
      dose_number: "",
      date_given: "",
      next_due_date: "",
      clinician_name: "",
      notes: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Vaccination Record</h1>
        <p className="mt-2 text-slate-600">
          Record a vaccine given to a child.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <select
            name="child_id"
            value={form.child_id}
            onChange={handleChange}
            className="rounded-2xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select Child</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.full_name}
              </option>
            ))}
          </select>

          <input
            name="vaccine_name"
            value={form.vaccine_name}
            onChange={handleChange}
            placeholder="Vaccine Name (e.g. BCG, OPV, Pentavalent)"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="dose_number"
            value={form.dose_number}
            onChange={handleChange}
            placeholder="Dose Number"
            type="number"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="date_given"
            value={form.date_given}
            onChange={handleChange}
            type="date"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="next_due_date"
            value={form.next_due_date}
            onChange={handleChange}
            type="date"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            name="clinician_name"
            value={form.clinician_name}
            onChange={handleChange}
            placeholder="Clinician / Doctor Name"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button
            disabled={loading}
            className="rounded-2xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Vaccination"}
          </button>
        </form>
      </div>
    </main>
  );
}