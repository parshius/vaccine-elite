"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function ChildrenPage() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Saving child record...");

    const { error } = await supabase.from("children").insert([
      {
        full_name: fullName,
        date_of_birth: dateOfBirth,
        gender,
        parent_name: parentName,
        parent_phone: parentPhone,
      },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Child record saved successfully!");
      setFullName("");
      setDateOfBirth("");
      setGender("");
      setParentName("");
      setParentPhone("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">Add Child</h1>
        <p className="mt-2 text-slate-600">Register a child into Vaccine Elite.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Child Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Parent/Guardian Name"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Parent Phone Number"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700"
          >
            Save Child
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