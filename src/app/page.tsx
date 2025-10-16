"use client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (!username) return;
    setLoading(true);
    setRoast("");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setRoast(data.roast);
    } catch {
      setRoast("🔥 Something went wrong! Try again later.");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 to-orange-500 text-center p-6">
      <h1 className="text-4xl font-bold mb-2">GitRoast 🔥</h1>
      <p className="text-gray-600 mb-4">
        Enter your GitHub username — and face the roast you deserve 😈
      </p>

      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="e.g. utsavgpta"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleRoast}
          disabled={loading}
          className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition disabled:opacity-70"
        >
          {loading ? "Cooking..." : "Roast Me 🔥"}
        </button>
      </div>

      {roast && (
        <div className="mt-6 p-4 bg-white text-black shadow rounded-xl border text-lg max-w-md animate-fade-in">
          {roast}
        </div>
      )}
    </main>
  );
}
