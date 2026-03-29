import { createClient } from "@/lib/supabase/server";

export default async function TestDbPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("children").select("*").limit(5);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Supabase Test</h1>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Error</h2>
          <pre className="mt-2 rounded-2xl bg-slate-100 p-4 text-sm overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Data</h2>
          <pre className="mt-2 rounded-2xl bg-slate-100 p-4 text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
