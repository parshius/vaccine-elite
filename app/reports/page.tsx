"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import Navbar from "@/components/Navbar";

export default function ReportsPage() {
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalVaccinations, setTotalVaccinations] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split("T")[0];

      const { count: childrenCount } = await supabase
        .from("children")
        .select("*", { count: "exact", head: true });

      const { count: vaccinationsCount } = await supabase
        .from("vaccinations")
        .select("*", { count: "exact", head: true });

      const { data: vaccineData } = await supabase
        .from("vaccinations")
        .select("next_due_date")
        .not("next_due_date", "is", null);

      const upcoming =
        vaccineData?.filter((item) => item.next_due_date >= today).length || 0;

      const overdue =
        vaccineData?.filter((item) => item.next_due_date < today).length || 0;

      setTotalChildren(childrenCount || 0);
      setTotalVaccinations(vaccinationsCount || 0);
      setUpcomingCount(upcoming);
      setOverdueCount(overdue);
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-800">Reports & Insights</h1>
          <p className="mt-2 text-slate-600">
            View clinic totals and immunization follow-up data.
          </p>

          {loading ? (
            <p className="mt-6 text-slate-600">Loading reports...</p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-emerald-50 p-6 shadow">
                <h2 className="text-lg font-semibold text-slate-700">Total Children</h2>
                <p className="mt-3 text-4xl font-bold text-emerald-700">{totalChildren}</p>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6 shadow">
                <h2 className="text-lg font-semibold text-slate-700">Total Vaccinations</h2>
                <p className="mt-3 text-4xl font-bold text-blue-700">{totalVaccinations}</p>
              </div>

              <div className="rounded-3xl bg-yellow-50 p-6 shadow">
                <h2 className="text-lg font-semibold text-slate-700">Upcoming Reminders</h2>
                <p className="mt-3 text-4xl font-bold text-yellow-700">{upcomingCount}</p>
              </div>

              <div className="rounded-3xl bg-red-50 p-6 shadow">
                <h2 className="text-lg font-semibold text-slate-700">Overdue Vaccines</h2>
                <p className="mt-3 text-4xl font-bold text-red-700">{overdueCount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}