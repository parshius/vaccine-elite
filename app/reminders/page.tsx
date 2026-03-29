import { createClient } from "@/lib/supabase/server";

export default async function RemindersPage() {
  const supabase = await createClient();

  const { data: vaccinations } = await supabase
    .from("vaccinations")
    .select(`
      *,
      children (
        full_name,
        clinic_name,
        county
      )
    `)
    .order("next_due_date", { ascending: true });

  const today = new Date();

  const upcoming =
    vaccinations?.filter((item) => {
      if (!item.next_due_date) return false;
      return new Date(item.next_due_date) >= today;
    }) || [];

  const overdue =
    vaccinations?.filter((item) => {
      if (!item.next_due_date) return false;
      return new Date(item.next_due_date) < today;
    }) || [];

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Vaccine Reminders</h1>
          <p className="mt-2 text-slate-600">
            Upcoming and overdue vaccine follow-ups.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-emerald-700">
              Upcoming Vaccines
            </h2>

            {upcoming.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-700">
                No upcoming vaccines.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {upcoming.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-emerald-50 p-4">
                    <p className="font-semibold">
                      {item.children?.full_name || "Unknown Child"}
                    </p>
                    <p className="text-sm text-slate-600">
                      Vaccine: {item.vaccine_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      Due: {item.next_due_date}
                    </p>
                    <p className="text-sm text-slate-600">
                      Clinic: {item.children?.clinic_name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-700">
              Overdue Vaccines
            </h2>

            {overdue.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
                No overdue vaccines.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {overdue.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-red-50 p-4">
                    <p className="font-semibold">
                      {item.children?.full_name || "Unknown Child"}
                    </p>
                    <p className="text-sm text-slate-600">
                      Vaccine: {item.vaccine_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      Due: {item.next_due_date}
                    </p>
                    <p className="text-sm text-slate-600">
                      Clinic: {item.children?.clinic_name}
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