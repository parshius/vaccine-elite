import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold text-emerald-700">
            Vaccine Elite
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            A digital vaccination and child health tracking platform designed
            for clinics, parents, and public health systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/children"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Register Child</h2>
            <p className="mt-2 text-slate-600">
              Add a new child into the system.
            </p>
          </Link>

          <Link
            href="/children-list"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">View Children</h2>
            <p className="mt-2 text-slate-600">
              Open all registered child records.
            </p>
          </Link>

          <Link
            href="/vaccinations"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Add Vaccination</h2>
            <p className="mt-2 text-slate-600">
              Record vaccines administered by clinicians.
            </p>
          </Link>

          <Link
            href="/parent-dashboard"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Parent Dashboard</h2>
            <p className="mt-2 text-slate-600">
              Monitor a child’s vaccine progress and due dates.
            </p>
          </Link>

          <Link
            href="/clinician-dashboard"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Clinician Dashboard</h2>
            <p className="mt-2 text-slate-600">
              Manage clinic records and vaccine follow-ups.
            </p>
          </Link>

          <Link
            href="/admin-dashboard"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="mt-2 text-slate-600">
              View overall platform activity and reports.
            </p>
          </Link>

          <Link
            href="/reminders"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Reminders</h2>
            <p className="mt-2 text-slate-600">
              Track upcoming and overdue vaccines.
            </p>
          </Link>

          <Link
            href="/reports"
            className="rounded-3xl bg-white p-8 shadow-sm hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">Reports</h2>
            <p className="mt-2 text-slate-600">
              See totals, summaries, and follow-up insights.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}