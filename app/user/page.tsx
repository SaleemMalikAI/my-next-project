"use client";
import { useState, FormEvent } from "react";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      setMessage(data.message || "Saved!");
      setName("");
      setEmail("");
    } catch {
      setMessage("Error saving user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[28px] bg-white px-8 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
            User form
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Create a new user
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Add a name and email to save the user data in the database. form ko run krne ke liye npm run dev command run kro package.json file main
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 rounded-2xl px-4 py-3 text-sm ${message.includes("Error") ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
