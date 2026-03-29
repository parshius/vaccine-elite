"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import Navbar from "@/components/Navbar";

type Reminder = {
  id: string;
  child_name: string;
  vaccine_name: string;
  next_due_date: string;
};

export default function RemindersPage() {
  const [upcoming, setUpcoming] = useState<Reminder[]>([]);
  const [overdue, setOverdue] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("vaccinations")
        .select("*")
        .not("next_due_date", "is", null)
        .order("next_due_date", { ascending: true });

      if (!error && data) {
        setUpcoming(data.filter((item) => item.next_due_date >= today));
        setOverdue(data.filter((item) => item.next_due_date < today));
      }

      setLoading(false);
    };

    fetchReminders();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-800">Vaccination Reminders</h1>
          <p className="mt-2 text-slate-600">
            Track upcoming and overdue vaccinations.
          </p>

          {loading ? (
            <p className="mt-6 text-slate-600">Loading reminders...</p>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-2xl font-bold text-emerald-700">Upcoming</h2>
                {upcoming.length === 0 ? (
                  <p className="mt-4 text-slate-600">No upcoming vaccines.</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {upcoming.map((item) => (
                      <div key={item.id} className="rounded-2xl bg-white p-4 shadow">
                        <p className="font-semibold text-slate-800">{item.child_name}</p>
                        <p className="text-slate-600">{item.vaccine_name}</p>
                        <p className="text-sm text-emerald-700">Due: {item.next_due_date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <h2 className="text-2xl font-bold text-red-700">Overdue</h2>
                {overdue.length === 0 ? (
                  <p className="mt-4 text-slate-600">No overdue vaccines.</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {overdue.map((item) => (
                      <div key={item.id} className="rounded-2xl bg-white p-4 shadow">
                        <p className="font-semibold text-slate-800">{item.child_name}</p>
                        <p className="text-slate-600">{item.vaccine_name}</p>
                        <p className="text-sm text-red-700">Due: {item.next_due_date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}