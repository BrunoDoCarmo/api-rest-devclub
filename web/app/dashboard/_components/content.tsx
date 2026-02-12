"use client";
import { useEffect, useState } from "react";
import type { MeResponse } from "../../types/auth";

export function DashboardContent() {
  const [data, setData] = useState<MeResponse | null>(null);

  useEffect(() => {
    async function loadMe() {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const json: MeResponse = await res.json();
        setData(json);
      }
    }
    loadMe();
  }, []);

  if (!data) return <p>Carregando...</p>;

  return <h1 className="text-2xl font-bold">Bem-vindo, {data.user.name} 👋</h1>;
}