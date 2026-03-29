export default function ParentDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Manage your child’s vaccination journey.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Next Vaccine</h2>
            <p className="mt-2 text-slate-600">BCG - 12 April 2026</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Clinic</h2>
            <p className="mt-2 text-slate-600">Mombasa County Referral Clinic</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <p className="mt-2 text-slate-600">2 reminders pending</p>
          </div>
        </div>
      </div>
    </main>
  );
}