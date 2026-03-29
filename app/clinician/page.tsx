export default function ClinicianDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Clinician Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Track vaccinations, schedules, and patient records.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Today’s Patients</h2>
            <p className="mt-2 text-slate-600">18 scheduled</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Vaccines Due</h2>
            <p className="mt-2 text-slate-600">7 children due today</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p className="mt-2 text-slate-600">Reminder system active</p>
          </div>
        </div>
      </div>
    </main>
  );
}