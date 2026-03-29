"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            Vaccine Elite
          </Link>
          <p className="text-sm text-slate-500">
            Smart Child Immunization System
          </p>
        </div>

        <nav className="flex flex-wrap gap-4">
          <Link href="/" className="text-slate-700 hover:text-emerald-700">
            Home
          </Link>
          <Link href="/children" className="text-slate-700 hover:text-emerald-700">
            Add Child
          </Link>
          <Link href="/children-list" className="text-slate-700 hover:text-emerald-700">
            Children
          </Link>
          <Link href="/child-search" className="text-slate-700 hover:text-emerald-700">
            Search
          </Link>
          <Link href="/vaccinations" className="text-slate-700 hover:text-emerald-700">
            Vaccinations
          </Link>
          <Link href="/reminders" className="text-slate-700 hover:text-emerald-700">
            Reminders
          </Link>
          <Link href="/reports" className="text-slate-700 hover:text-emerald-700">
            Reports
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="rounded-2xl bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}