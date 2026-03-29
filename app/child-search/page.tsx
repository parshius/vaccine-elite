"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function ChildSearchPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .order("full_name", { ascending: true });

      if (!error && data) {
        setChildren(data);
        setFilteredChildren(data);
      }

      setLoading(false);
    };

    fetchChildren();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();

    const filtered = children.filter(
      (child) =>
        child.full_name.toLowerCase().includes(lower) ||
        child.parent_phone.toLowerCase().includes(lower) ||
        child.parent_name.toLowerCase().includes(lower)
    );

    setFilteredChildren(filtered);
  }, [search, children]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="p-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-800">Search Child</h1>
          <p className="mt-2 text-slate-600">
            Find a child by name, parent name, or phone number.
          </p>

          <input
            type="text"
            placeholder="Search by child name, parent name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
          />

          {loading ? (
            <p className="mt-6 text-slate-600">Loading children...</p>
          ) : filteredChildren.length === 0 ? (
            <p className="mt-6 text-slate-600">No matching child found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredChildren.map((child) => (
                <Link
                  key={child.id}
                  href={`/child-profile/${child.id}`}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-400 hover:bg-white hover:shadow"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {child.full_name}
                      </h2>
                      <p className="text-slate-600">
                        Parent: {child.parent_name} • {child.parent_phone}
                      </p>
                    </div>

                    <div className="text-sm text-slate-500">
                      <p>DOB: {child.date_of_birth}</p>
                      <p>Clinic: {child.clinic_name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}