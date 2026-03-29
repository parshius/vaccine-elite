import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Kenya • Digital Immunization Tracking
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
              Smarter Vaccination Tracking for Every Child
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Vaccine Elite helps parents, clinicians, and health facilities
              manage child immunization records, reminders, overdue vaccines,
              and follow-up care in one secure platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-800">What Vaccine Elite Does</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-800">Child Registration</h3>
                <p className="text-slate-600">Save child profiles and parent information.</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-800">Vaccination Tracking</h3>
                <p className="text-slate-600">Record vaccines and calculate upcoming doses.</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-800">Reminders & Follow-Up</h3>
                <p className="text-slate-600">Track upcoming and overdue immunizations.</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-800">Reports & Insights</h3>
                <p className="text-slate-600">View vaccination trends and clinic activity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}