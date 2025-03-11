"use client";

import { useAuth } from "../context/AuthProvider";
import { supabase } from "../../../superbaseClient";

export default function DashboardPage() {
  const { session } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session?.user?.email}! 🚀
        </h1>
        <p>You are logged in!</p>
        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
