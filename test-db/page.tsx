"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                Smart Child Immunization Platform
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
                Vaccine Elite
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A modern child vaccination management system built for clinics,
                hospitals, and healthcare teams to register children, track
                vaccines, monitor follow-ups, and improve immunization care.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  Login
                </Link>

                <Link
                  href="/children"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Add Child
                </Link>

                <Link
                  href="/child-search"
                  className="rounded-2xl border border-emerald-300 bg-emerald-50 px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  Search Child
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-2xl">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-emerald-50 p-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Child Registration
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Register newborns and children with parent and clinic details.
                  </p>
                </div>

                <div className="rounded-3xl bg-blue-50 p-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Vaccine Tracking
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Save vaccination records and monitor next due dates.
                  </p>
                </div>

                <div className="rounded-3xl bg-yellow-50 p-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Reminders
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Keep track of upcoming and overdue vaccines.
                  </p>
                </div>

                <div className="rounded-3xl bg-red-50 p-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Reports
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Generate insights for clinics and immunization follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800">For Clinics</h3>
              <p className="mt-3 text-slate-600 leading-7">
                Organize vaccination workflows, reduce missed appointments, and
                improve patient record management.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800">For Parents</h3>
              <p className="mt-3 text-slate-600 leading-7">
                Ensure children receive vaccines on time and build a complete
                immunization history from birth.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800">For Public Health</h3>
              <p className="mt-3 text-slate-600 leading-7">
                Improve vaccine coverage, reduce missed doses, and support
                better healthcare delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}