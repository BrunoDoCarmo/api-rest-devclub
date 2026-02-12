"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Rotas que não precisam de autenticação
    const isPublicPage = 
      pathname === "/login" || 
      // pathname === "/register" || 
      pathname === "/verify-email";

    if (!token && !isPublicPage) {
      router.push("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
