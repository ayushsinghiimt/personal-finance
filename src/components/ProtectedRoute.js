"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/"); // Redirect to login if not authenticated
    }
  }, [session, router]);

  if (!session) return null; // Don't render until session state is known

  return <>{children}</>;
}
