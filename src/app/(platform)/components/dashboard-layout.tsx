"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/check");
      const data = await res.json();

      if (!data.isAuthenticated) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  return <>{children}</>;
}