"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

type Vaccination = {
  id: string;
  child_name: string;
  vaccine_name: string;
  date_given: string;
  next_due_date: string;
  notes: string;
};

export default function ChildProfilePage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.id as string;

  const [child, setChild] = useState<Child | null>(null);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [clinicName, setClinicName] = useState("");

  useEffect(() => {
    const fetchChildProfile = async () => {
      const { data: childData, error: childError } = await supabase
        .from("children")
        .select("*")
        .eq("id", childId)
        .single();

      if (!childError && childData) {
        setChild(childData);

        setFullName(childData.full_name);
        setDateOfBirth(childData.date_of_birth);
        setGender(childData.gender);
        setParentName(childData.parent_name);
        setParentPhone(childData.parent_phone);
        setClinicName(childData.clinic_name);

        const { data: vaccineData } = await supabase
          .from("vaccinations")
          .select("*")
          .eq("child_name", childData.full_name)
          .order("date_given", { ascending: false });

        if (vaccineData) {
          setVaccinations(vaccineData);
        }
      }

      setLoading(false);
    };

    if (childId) {
      fetchChildProfile();
    }
  }, [childId]);

  const handleUpdate = async () => {
    setMessage("Updating child profile...");

    if (!child) return;

    const oldName = child.full_name;

    const { error } = await supabase
      .from("children")
      .update({
        full_name: fullName,
        date_of_birth: dateOfBirth,
        gender,
        parent_name: parentName,
        parent_phone: parentPhone,
        clinic_name: clinicName,
      })
      .eq("id", childId);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (oldName !== fullName) {
      await supabase
        .from("vaccinations")
        .update({ child_name: fullName })
        .eq("child_name", oldName);
    }

    setChild({
      ...child,
      full_name: fullName,
      date_of_birth: dateOfBirth,
      gender,
      parent_name: parentName,
      parent_phone: parentPhone,
      clinic_name: clinicName,
    });

    setMessage("Child profile updated successfully!");
    setEditMode(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this child record? This action cannot be undone."
    );

    if (!confirmed || !child) return;

    setMessage("Deleting child record...");

    await supabase
      .from("vaccinations")
      .delete()
      .eq("child_name", child.full_name);

    const { error } = await supabase
      .from("children")
      .delete()
      .eq("id", childId);

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/children-list");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-50 print:bg-white">
      <Navbar />

      <div className="p-6 print:p-0">
        <div className="mx-auto max-w-6xl space-y-6">
          {loading ? (
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-slate-600">Loading child profile...</p>
            </div>
          ) : !child ? (
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-slate-600">Child not found.</p>
            </div>
          ) : (
            <>
              <div className="rounded-3xl bg-white p-8 shadow-xl print:shadow-none">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                      {child.full_name}
                    </h1>
                    <p className="mt-2 text-slate-600">
                      Child vaccination profile and history.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 print:hidden">
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="rounded-2xl bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
                    >
                      {editMode ? "Cancel Edit" : "Edit Child"}
                    </button>

                    <button
                      onClick={handlePrint}
                      className="rounded-2xl bg-slate-700 px-4 py-2 text-white font-semibold hover:bg-slate-800"
                    >
                      Print Card
                    </button>

                    <button
                      onClick={handleDelete}
                      className="rounded-2xl bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
                    >
                      Delete Child
                    </button>
                  </div>
                </div>

                {editMode ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Parent Name"
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <input
                      type="text"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="Parent Phone"
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <input
                      type="text"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      placeholder="Clinic Name"
                      className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                    />

                    <div className="md:col-span-2">
                      <button
                        onClick={handleUpdate}
                        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Date of Birth</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {child.date_of_birth}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Gender</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {child.gender}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Parent / Guardian</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {child.parent_name}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Parent Phone</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {child.parent_phone}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Clinic</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {child.clinic_name}
                      </p>
                    </div>
                  </div>
                )}

                {message && (
                  <p className="mt-6 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
                    {message}
                  </p>
                )}
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-xl print:shadow-none">
                <h2 className="text-2xl font-bold text-slate-800">
                  Vaccination History
                </h2>
                <p className="mt-2 text-slate-600">
                  All vaccines recorded for this child.
                </p>

                {vaccinations.length === 0 ? (
                  <p className="mt-6 text-slate-600">
                    No vaccination records found yet.
                  </p>
                ) : (
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse overflow-hidden rounded-2xl">
                      <thead>
                        <tr className="bg-emerald-600 text-left text-white">
                          <th className="px-4 py-3">Vaccine</th>
                          <th className="px-4 py-3">Date Given</th>
                          <th className="px-4 py-3">Next Due Date</th>
                          <th className="px-4 py-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vaccinations.map((vaccine) => (
                          <tr
                            key={vaccine.id}
                            className="border-b border-slate-200 hover:bg-slate-50"
                          >
                            <td className="px-4 py-3">{vaccine.vaccine_name}</td>
                            <td className="px-4 py-3">{vaccine.date_given}</td>
                            <td className="px-4 py-3">
                              {vaccine.next_due_date || "—"}
                            </td>
                            <td className="px-4 py-3">{vaccine.notes || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}