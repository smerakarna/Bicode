"use client";

import { useAuth } from "@/auth";

export default function Header() {
  const [auth, setAuth, logout] = useAuth();

  return (
    <header className="relative bg-gray-900 text-white py-4 px-6 text-center">
      {/* Centered content */}
      <div>
        <h1 className="text-2xl font-bold">Welcome to Bicode</h1>
        <p className="mt-2 text-gray-300">Your learning journey begins here</p>
      </div>

      {/* Logout button on the right */}
      <button
        onClick={logout}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
      >
        Logout
      </button>
    </header>
  );
}
