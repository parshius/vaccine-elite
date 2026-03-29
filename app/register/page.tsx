"use client";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-slate-600">
          Register as a parent or clinic user.
        </p>

        <form onSubmit={handleRegister} className="mt-6 grid gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3"
          />
          <button className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}