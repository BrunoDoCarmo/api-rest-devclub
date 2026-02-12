"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { XCircle, Loader2, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  // Ref para evitar que o useEffect execute a chamada duas vezes no Strict Mode
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    
    // Se já iniciou a verificação, não faz nada
    if (initialized.current) return;
    initialized.current = true;

    async function verifyEmail() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/auth/verify-email?token=${token}&type=user`,
          { method: "GET" }
        );

        if (!response.ok) throw new Error("Erro na verificação");

        setStatus("success");
        
        const timeout =setTimeout(() => {
          router.push("/login");
          console.log("Redirecionando para a página de login...");
        }, 5000);
        console.log("Redirecionando em 5 segundos...");

        console.log("Timeout limpo");
        return () => clearTimeout(timeout);

      } catch (error) {
        console.error("Erro ao verificar email:", error);
        setStatus("error");
      }
    }

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-xl bg-zinc-900 p-8 text-center shadow-lg">

        <Image
          src="/logo-light.svg"
          alt="Finance AI"
          width={150}
          height={40}
          className="mb-4"
          priority
        />

        {status === "loading" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin" />
            <h2 className="text-xl font-semibold">Verificando seu email...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-10 w-10 text-green-500" />
            <h2 className="text-xl font-semibold">
              Email verificado com sucesso!
            </h2>

            <button
              onClick={() => router.push("/")}
              className="mt-4 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              Ir para o login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-10 w-10 text-red-500" />
            <h2 className="text-xl font-semibold">
              Token inválido ou expirado
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
