"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created successfully! Check your email if confirmation is enabled.");
      setFullName("");
      setRole("parent");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
        <p className="mt-2 text-slate-600">Register for Vaccine Elite</p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
          >
            <option value="parent">Parent</option>
            <option value="clinician">Clinician</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}