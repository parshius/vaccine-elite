export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Monitor all clinics, patients, and vaccine coverage.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Clinics</h2>
            <p className="mt-2 text-slate-600">24 active</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Children</h2>
            <p className="mt-2 text-slate-600">2,142 registered</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Coverage</h2>
            <p className="mt-2 text-slate-600">81% completion</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Alerts</h2>
            <p className="mt-2 text-slate-600">5 stock warnings</p>
          </div>
        </div>
      </div>
    </main>
  );
}