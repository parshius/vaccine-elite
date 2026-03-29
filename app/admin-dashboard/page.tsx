import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { count: childrenCount } = await supabase
    .from("children")
    .select("*", { count: "exact", head: true });

  const { count: vaccinationCount } = await supabase
    .from("vaccinations")
    .select("*", { count: "exact", head: true });

  const { data: recentChildren } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentVaccinations } = await supabase
    .from("vaccinations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">
            System overview for Vaccine Elite.
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
            <p className="text-sm text-slate-500">Recent Children</p>
            <p className="mt-2 text-3xl font-bold">{recentChildren?.length || 0}</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Recent Vaccines</p>
            <p className="mt-2 text-3xl font-bold">{recentVaccinations?.length || 0}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Recent Child Registrations</h2>

            {!recentChildren || recentChildren.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-slate-600">
                No child records yet.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {recentChildren.map((child) => (
                  <div key={child.id} className="rounded-2xl bg-slate-100 p-4">
                    <p className="font-semibold">{child.full_name}</p>
                    <p className="text-sm text-slate-600">
                      DOB: {child.date_of_birth}
                    </p>
                    <p className="text-sm text-slate-600">
                      Clinic: {child.clinic_name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Recent Vaccinations</h2>

            {!recentVaccinations || recentVaccinations.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-slate-600">
                No vaccination records yet.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {recentVaccinations.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-slate-100 p-4">
                    <p className="font-semibold">{item.vaccine_name}</p>
                    <p className="text-sm text-slate-600">
                      Dose: {item.dose_number}
                    </p>
                    <p className="text-sm text-slate-600">
                      Date Given: {item.date_given}
                    </p>
                    <p className="text-sm text-slate-600">
                      Clinician: {item.clinician_name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}