import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ClinicianDashboardPage() {
  const supabase = await createClient();

  const { count: childrenCount } = await supabase
    .from("children")
    .select("*", { count: "exact", head: true });

  const { count: vaccinationCount } = await supabase
    .from("vaccinations")
    .select("*", { count: "exact", head: true });

  const { data: recentVaccinations } = await supabase
    .from("vaccinations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Clinician Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Manage child registrations and vaccine follow-ups.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Registered Children</p>
            <p className="mt-2 text-3xl font-bold">{childrenCount || 0}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Vaccinations Recorded</p>
            <p className="mt-2 text-3xl font-bold">{vaccinationCount || 0}</p>
          </div>

          <Link
            href="/children"
            className="rounded-3xl bg-emerald-600 p-6 text-white shadow-sm hover:bg-emerald-700"
          >
            <p className="text-sm">Quick Action</p>
            <p className="mt-2 text-2xl font-bold">+ Add Child</p>
          </Link>

          <Link
            href="/vaccinations"
            className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm hover:bg-blue-700"
          >
            <p className="text-sm">Quick Action</p>
            <p className="mt-2 text-2xl font-bold">+ Add Vaccine</p>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Recent Vaccinations</h2>

          {!recentVaccinations || recentVaccinations.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-slate-600">
              No recent vaccination records.
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-sm text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Vaccine</th>
                    <th className="px-4 py-3">Dose</th>
                    <th className="px-4 py-3">Date Given</th>
                    <th className="px-4 py-3">Next Due</th>
                    <th className="px-4 py-3">Clinician</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVaccinations.map((item) => (
                    <tr key={item.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-medium">{item.vaccine_name}</td>
                      <td className="px-4 py-3">{item.dose_number}</td>
                      <td className="px-4 py-3">{item.date_given}</td>
                      <td className="px-4 py-3">{item.next_due_date}</td>
                      <td className="px-4 py-3">{item.clinician_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}