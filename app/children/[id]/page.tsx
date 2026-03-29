import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ChildProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: child, error: childError } = await supabase
    .from("children")
    .select("*")
    .eq("id", id)
    .single();

  const { data: vaccinations, error: vaccinationError } = await supabase
    .from("vaccinations")
    .select("*")
    .eq("child_id", id)
    .order("date_given", { ascending: false });

  if (childError || !child) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">Child Not Found</h1>
          <p className="mt-2 text-slate-600">
            We could not load this child record.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{child.full_name}</h1>
              <p className="mt-2 text-slate-600">
                Child medical and vaccination profile.
              </p>
            </div>

            <Link
              href="/vaccinations"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
            >
              + Add Vaccination
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="mt-1 font-medium">{child.date_of_birth}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Sex</p>
              <p className="mt-1 font-medium">{child.sex}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Birth Weight</p>
              <p className="mt-1 font-medium">{child.birth_weight}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Clinic</p>
              <p className="mt-1 font-medium">{child.clinic_name}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">County</p>
              <p className="mt-1 font-medium">{child.county}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Allergies</p>
              <p className="mt-1 font-medium">{child.allergies || "None"}</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 md:col-span-2">
              <p className="text-sm text-slate-500">Medical Notes</p>
              <p className="mt-1 font-medium">
                {child.medical_notes || "No notes"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Vaccination History</h2>
          <p className="mt-2 text-slate-600">
            All vaccines recorded for this child.
          </p>

          {vaccinationError && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-600">
              Error loading vaccinations: {vaccinationError.message}
            </div>
          )}

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
                    <th className="px-4 py-3">Notes</th>
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
                      <td className="px-4 py-3">{vaccine.notes}</td>
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