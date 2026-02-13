"use client";

import { userLoginAction } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import Modal from "./modal";
import { Button } from "./ui/button";
import { Loading } from "./loading";
import { User2, Lock } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface UserLoginProps {
  // setScreen agora é opcional, caso você use este form em uma página fixa
  setScreen?: (value: "login" | "esqueceu") => void;
  active?: boolean;
  onLoginSuccess?: () => void;
}

const UserLogin = ({ setScreen, active = true, onLoginSuccess }: UserLoginProps) => {
  const [loading, setLoading] = useState(false);
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Dentro do componente UserLogin
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  // Função auxiliar para abrir o erro
  const showError = (msg: string) => {
    setErrorModal({ open: true, message: msg });
    setLoading(false);
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const identifier = identifierRef.current?.value;
    const password = passwordRef.current?.value;

    if (!identifier || !password) {
      showError("Informe usuário/email e senha"); // <-- Substituído
      setLoading(false);
      return;
    }

    try {
      const result = await userLoginAction({ identifier, password });

      if (!result.success) {
        showError(result.message);
        return;
      }

      // Configuração dos Cookies
      Cookies.set('token', result.accessToken, { 
        path: '/', 
      });
      
      if (result.refreshToken) {
        Cookies.set('refreshToken', result.refreshToken, {
          path: '/' 
        });
      }

      localStorage.setItem("lastActivity", Date.now().toString());

      window.dispatchEvent(new Event('storage')); // Notifica outras abas sobre a mudança
      router.push("/dashboard"); // Redireciona para o dashboard após o login bem-sucedido
      
      if (onLoginSuccess) onLoginSuccess();
      
      // Refresh para garantir que o middleware e a Navbar capturem o novo cookie// Dentro do try no handleLogin
      if (onLoginSuccess) onLoginSuccess();

      // O push é suficiente. Se o Dashboard for uma Server Component, 
      // ele lerá o novo cookie automaticamente ao entrar.
    } catch {
      alert("Erro inesperado ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (active) {
      identifierRef.current?.focus();
    }
  }, [active]);

  return (
    <>
      {loading && (
        <Loading 
          fullScreen 
          label="Autenticando..." 
          className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
        />
      )}
      <div className="w-full max-w-md mx-auto p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleLogin(e)
          }} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2" htmlFor="identifier">
                Usuário ou E-mail
              </Label>
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input 
                  id="identifier"
                  type="text"
                  className="pl-10 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus-visible:ring-blue-500/20"
                  placeholder="seu@email.com" 
                  ref={identifierRef}
                />
              </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-green-600 font-bold flex items-center gap-2" htmlFor="password">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <Input 
                id="password"
                type="password"
                className="pl-10 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus-visible:ring-blue-500/20"
                placeholder="••••••••" 
                ref={passwordRef}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-green-600/20"
          >
            Entrar
          </button>
        </form>
        <div className="flex flex-col gap-3 mt-8 items-center">
          <button
            type="button"
            className="text-sm text-zinc-400 hover:text-white transition underline-offset-4 hover:underline"
            onClick={() => {
              if (setScreen) {
                setScreen("esqueceu"); // Isso vai disparar o setIsEsqueceuModalOpen(true) no pai
              }
            }}
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>
      <Modal 
        isOpen={errorModal.open} 
        onClose={() => setErrorModal({ ...errorModal, open: false })}
      >
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-red-500 mb-2">Ops! Algo deu errado</h3>
          <p className="text-zinc-600 mb-6">{errorModal.message}</p>
          <Button 
            onClick={() => setErrorModal({ ...errorModal, open: false })}
            className="w-full bg-gray-800 hover:bg-gray-700"
          >
            Entendido
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserLogin;