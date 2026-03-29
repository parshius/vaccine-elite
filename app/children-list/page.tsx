import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ChildrenListPage() {
  const supabase = await createClient();

  const { data: children, error } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Registered Children</h1>
            <p className="mt-2 text-slate-600">
              View all children in Vaccine Elite.
            </p>
          </div>

          <Link
            href="/children"
            className="rounded-2xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
          >
            + Add Child
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-600">
            Error loading children: {error.message}
          </div>
        )}

        {!children || children.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-100 p-6 text-slate-600">
            No children found yet.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-sm text-slate-700">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">DOB</th>
                  <th className="px-4 py-3">Sex</th>
                  <th className="px-4 py-3">Clinic</th>
                  <th className="px-4 py-3">County</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {children.map((child) => (
                  <tr key={child.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">{child.full_name}</td>
                    <td className="px-4 py-3">{child.date_of_birth}</td>
                    <td className="px-4 py-3">{child.sex}</td>
                    <td className="px-4 py-3">{child.clinic_name}</td>
                    <td className="px-4 py-3">{child.county}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/children/${child.id}`}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}