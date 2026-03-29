import { createClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await createClient();

  const { count: childrenCount } = await supabase
    .from("children")
    .select("*", { count: "exact", head: true });

  const { count: vaccinationCount } = await supabase
    .from("vaccinations")
    .select("*", { count: "exact", head: true });

  const { data: allVaccinations } = await supabase
    .from("vaccinations")
    .select("*");

  const today = new Date();

  const overdue =
    allVaccinations?.filter((item) => {
      if (!item.next_due_date) return false;
      return new Date(item.next_due_date) < today;
    }) || [];

  const upcoming =
    allVaccinations?.filter((item) => {
      if (!item.next_due_date) return false;
      return new Date(item.next_due_date) >= today;
    }) || [];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="mt-2 text-slate-600">
            Quick summary of vaccine records and child registrations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Children</p>
            <p className="mt-2 text-3xl font-bold">{childrenCount || 0}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Vaccinations</p>
            <p className="mt-2 text-3xl font-bold">{vaccinationCount || 0}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Upcoming Due</p>
            <p className="mt-2 text-3xl font-bold">{upcoming.length}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overdue</p>
            <p className="mt-2 text-3xl font-bold">{overdue.length}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Interpretation</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            <p>• Total children currently registered in the system.</p>
            <p>• Total vaccination records captured by clinicians.</p>
            <p>• Upcoming due vaccines that need attention soon.</p>
            <p>• Overdue vaccines requiring urgent follow-up.</p>
          </div>
        </div>
      </div>
    </main>
  );
}