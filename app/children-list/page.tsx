"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import Navbar from "@/components/Navbar";

type Child = {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  parent_name: string;
  parent_phone: string;
  clinic_name: string;
};

export default function ChildrenListPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setChildren(data);
      }

      setLoading(false);
    };

    fetchChildren();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-800">Registered Children</h1>
          <p className="mt-2 text-slate-600">
            View all child profiles saved in the Vaccine Elite system.
          </p>

          {loading ? (
            <p className="mt-6 text-slate-600">Loading children...</p>
          ) : children.length === 0 ? (
            <p className="mt-6 text-slate-600">No children registered yet.</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse overflow-hidden rounded-2xl">
                <thead>
                  <tr className="bg-emerald-600 text-left text-white">
                    <th className="px-4 py-3">Full Name</th>
                    <th className="px-4 py-3">Date of Birth</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Parent Name</th>
                    <th className="px-4 py-3">Parent Phone</th>
                    <th className="px-4 py-3">Clinic</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((child) => (
                    <tr key={child.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-3">{child.full_name}</td>
                      <td className="px-4 py-3">{child.date_of_birth}</td>
                      <td className="px-4 py-3">{child.gender}</td>
                      <td className="px-4 py-3">{child.parent_name}</td>
                      <td className="px-4 py-3">{child.parent_phone}</td>
                      <td className="px-4 py-3">{child.clinic_name}</td>
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