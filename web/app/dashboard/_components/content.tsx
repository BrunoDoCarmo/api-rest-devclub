"use client";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export interface MeResponse {
  user: {
    id: string;
    name: string;
    role: string;
  };
  tenant: {
    name: string;
    type: string;
  }
}

export function DashboardContent() {
  const [data, setData] = useState<MeResponse | null>(null);

  useEffect(() => {
    async function loadMe() {
      const token = getCookie("token");
      
      if (!token) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/private/user/me`;
        
        console.log("DEBUG: Chamando a URL:", url);

        const res = await fetch(url, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          // Se der 404 aqui, verifique se o backend está rodando na porta certa
          throw new Error(`Resposta negativa da API: ${res.status}`);
        }

        const json = await res.json();
        setData(json);

      } catch (err) {
        console.error("DEBUG: Falha total no fetch:", err);
      }
    }
    loadMe();
  }, []);

  if (!data) return <p>Aguardando dados...</p>

  return (
    <div className="p-6">
      {/* Usamos encadeamento opcional (?.) para evitar quebras */}
      <h1 className="text-2xl font-bold">
        Bem-vindo, {data?.user?.name || data?.user.name} 👋
      </h1>
      
      <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
        <p className="text-indigo-900 font-medium">
          🏢 Empresa conectada: 
          <span className="ml-2 font-bold uppercase">
            {/* Tenta pegar do objeto tenant ou direto do data dependendo da sua API */}
            {data?.tenant?.name || "Empresa não identificada"}
          </span>
        </p>
      </div>
    </div>
  );
}