"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/parent");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-slate-600">
          Sign in to access Vaccine Elite.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
          />
          <button className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}