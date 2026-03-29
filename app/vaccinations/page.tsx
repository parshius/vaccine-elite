"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

const vaccineOptions = [
  "BCG",
  "OPV 0",
  "OPV 1",
  "OPV 2",
  "OPV 3",
  "Pentavalent 1",
  "Pentavalent 2",
  "Pentavalent 3",
  "PCV 1",
  "PCV 2",
  "PCV 3",
  "Rotavirus 1",
  "Rotavirus 2",
  "Measles-Rubella",
  "Yellow Fever",
  "Vitamin A",
];

type Child = {
  id: string;
  full_name: string;
};

export default function VaccinationsPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [childName, setChildName] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [dateGiven, setDateGiven] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("id, full_name")
        .order("full_name", { ascending: true });

      if (!error && data) {
        setChildren(data);
      }
    };

    fetchChildren();
  }, []);

  const calculateNextDueDate = (vaccine: string, date: string) => {
    if (!date) return "";

    const baseDate = new Date(date);

    const addDays = (days: number) => {
      const newDate = new Date(baseDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate.toISOString().split("T")[0];
    };

    switch (vaccine) {
      case "BCG":
      case "OPV 0":
        return "";
      case "OPV 1":
      case "Pentavalent 1":
      case "PCV 1":
      case "Rotavirus 1":
        return addDays(28);
      case "OPV 2":
      case "Pentavalent 2":
      case "PCV 2":
        return addDays(28);
      case "OPV 3":
      case "Pentavalent 3":
      case "PCV 3":
      case "Rotavirus 2":
        return addDays(180);
      case "Measles-Rubella":
        return addDays(270);
      case "Yellow Fever":
      case "Vitamin A":
        return addDays(180);
      default:
        return "";
    }
  };

  const handleVaccineChange = (selectedVaccine: string) => {
    setVaccineName(selectedVaccine);
    if (dateGiven) {
      const autoDate = calculateNextDueDate(selectedVaccine, dateGiven);
      setNextDueDate(autoDate);
    }
  };

  const handleDateGivenChange = (selectedDate: string) => {
    setDateGiven(selectedDate);
    if (vaccineName) {
      const autoDate = calculateNextDueDate(vaccineName, selectedDate);
      setNextDueDate(autoDate);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Saving vaccination...");

    const { error } = await supabase.from("vaccinations").insert([
      {
        child_name: childName,
        vaccine_name: vaccineName,
        date_given: dateGiven,
        next_due_date: nextDueDate || null,
        notes,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Vaccination saved successfully!");
      setChildName("");
      setVaccineName("");
      setDateGiven("");
      setNextDueDate("");
      setNotes("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">Vaccination Entry</h1>
        <p className="mt-2 text-slate-600">
          Record a child’s vaccine information with automatic next-dose support.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <select
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          >
            <option value="">Select Child</option>
            {children.map((child) => (
              <option key={child.id} value={child.full_name}>
                {child.full_name}
              </option>
            ))}
          </select>

          <select
            value={vaccineName}
            onChange={(e) => handleVaccineChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          >
            <option value="">Select Vaccine</option>
            {vaccineOptions.map((vaccine) => (
              <option key={vaccine} value={vaccine}>
                {vaccine}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateGiven}
            onChange={(e) => handleDateGivenChange(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="date"
            value={nextDueDate}
            onChange={(e) => setNextDueDate(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            rows={4}
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700"
          >
            Save Vaccination
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}