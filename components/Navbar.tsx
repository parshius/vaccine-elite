import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          Vaccine Elite
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Home
          </Link>
          <Link href="/children" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Add Child
          </Link>
          <Link href="/children-list" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Children
          </Link>
          <Link href="/vaccinations" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Vaccinations
          </Link>
          <Link href="/parent-dashboard" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Parent
          </Link>
          <Link href="/clinician-dashboard" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Clinician
          </Link>
          <Link href="/admin-dashboard" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Admin
          </Link>
          <Link href="/reminders" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Reminders
          </Link>
          <Link href="/reports" className="rounded-xl px-3 py-2 hover:bg-slate-100">
            Reports
          </Link>
        </nav>
      </div>
    </header>
  );
}