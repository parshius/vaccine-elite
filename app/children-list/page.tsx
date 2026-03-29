"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Child = {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  parent_name: string;
  parent_phone: string;
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
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">Registered Children</h1>
        <p className="mt-2 text-slate-600">View all children saved in the system.</p>

        {loading ? (
          <p className="mt-6 text-slate-600">Loading children...</p>
        ) : children.length === 0 ? (
          <p className="mt-6 text-slate-600">No children found.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">DOB</th>
                  <th className="px-4 py-3 text-left">Gender</th>
                  <th className="px-4 py-3 text-left">Parent</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {children.map((child) => (
                  <tr key={child.id} className="border-t border-slate-200">
                    <td className="px-4 py-3">{child.full_name}</td>
                    <td className="px-4 py-3">{child.date_of_birth}</td>
                    <td className="px-4 py-3">{child.gender}</td>
                    <td className="px-4 py-3">{child.parent_name}</td>
                    <td className="px-4 py-3">{child.parent_phone}</td>
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