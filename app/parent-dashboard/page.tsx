import { createClient } from "@/lib/supabase/server";

export default async function ParentDashboardPage() {
  const supabase = await createClient();

  // Load first child for testing
  const { data: children } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  const child = children?.[0];

  if (!child) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="mt-4 text-slate-600">No child found yet.</p>
        </div>
      </main>
    );
  }

  const { data: vaccinations } = await supabase
    .from("vaccinations")
    .select("*")
    .eq("child_id", child.id)
    .order("date_given", { ascending: false });

  const today = new Date();

  const upcomingVaccines =
    vaccinations?.filter((vaccine) => {
      if (!vaccine.next_due_date) return false;
      return new Date(vaccine.next_due_date) >= today;
    }) || [];

  const missedVaccines =
    vaccinations?.filter((vaccine) => {
      if (!vaccine.next_due_date) return false;
      return new Date(vaccine.next_due_date) < today;
    }) || [];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Monitor your child’s vaccination progress and upcoming vaccines.
          </p>
        </div>

        {/* Child Summary */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">{child.full_name}</h2>
          <p className="mt-2 text-slate-600">
            Child health and vaccination overview.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="mt-1 font-medium">{child.date_of_birth}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Sex</p>
              <p className="mt-1 font-medium">{child.sex}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Clinic</p>
              <p className="mt-1 font-medium">{child.clinic_name}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">County</p>
              <p className="mt-1 font-medium">{child.county}</p>
            </div>
          </div>
        </div>

        {/* Vaccination History */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Vaccination History</h2>

          {!vaccinations || vaccinations.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-slate-600">
              No vaccination records yet.
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
                  {vaccinations.map((vaccine) => (
                    <tr key={vaccine.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-medium">
                        {vaccine.vaccine_name}
                      </td>
                      <td className="px-4 py-3">{vaccine.dose_number}</td>
                      <td className="px-4 py-3">{vaccine.date_given}</td>
                      <td className="px-4 py-3">{vaccine.next_due_date}</td>
                      <td className="px-4 py-3">{vaccine.clinician_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upcoming Vaccines */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-700">
            Upcoming Vaccines
          </h2>

          {upcomingVaccines.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-6 text-emerald-700">
              No upcoming vaccines currently scheduled.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {upcomingVaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className="rounded-2xl bg-emerald-50 p-4"
                >
                  <p className="font-semibold">{vaccine.vaccine_name}</p>
                  <p className="text-sm text-slate-600">
                    Due on: {vaccine.next_due_date}
                  </p>
                  <p className="text-sm text-slate-600">
                    Clinician: {vaccine.clinician_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Missed Vaccines */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-red-700">Missed Vaccines</h2>

          {missedVaccines.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-red-50 p-6 text-red-700">
              No missed vaccines. Great job keeping up!
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {missedVaccines.map((vaccine) => (
                <div key={vaccine.id} className="rounded-2xl bg-red-50 p-4">
                  <p className="font-semibold">{vaccine.vaccine_name}</p>
                  <p className="text-sm text-slate-600">
                    Was due on: {vaccine.next_due_date}
                  </p>
                  <p className="text-sm text-slate-600">
                    Please visit the clinic as soon as possible.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}