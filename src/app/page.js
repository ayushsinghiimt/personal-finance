"use client";
import { useRouter } from "next/navigation";
import { getUserData } from "@/utils";
import { useEffect } from "react";
export default function Page() {
  const router = useRouter();
  const { id } = getUserData();
  if (!id) {
    window.location.reload(); // Refresh the current page
  }
  useEffect(() => {
    if (id) {
      router.push("/dashboard");
    }
  }, [id]);

  return null;
}
