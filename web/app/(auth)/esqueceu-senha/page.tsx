"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft,
  Lock,
  CheckCircle2,
  Eye,
  EyeOff,
  CircleX, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import Modal from "@/app/_components/modal";
import { Loading } from "@/app/_components/loading";

const RedefinirSenhaPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const requirements = [
        { label: "Mínimo de 8 caracteres", test: password.length >= 8 },
        { label: "Letra maiúscula", test: /[A-Z]/.test(password) },
        { label: "Letra minúscula", test: /[a-z]/.test(password) },
        { label: "Número (0-9)", test: /[0-9]/.test(password) },
        { label: "Símbolo (!@#$%^&*)", test: /[^A-Za-z0-9]/.test(password) },
        { 
            label: password === confirmPassword && confirmPassword !== "" ? "As senhas coincidem" : "As senhas não coincidem", 
            test: password === confirmPassword && confirmPassword !== "" 
        },
    ];

    const calculateStrength = () => {
        const passed = requirements.filter(r => 
            !r.label.includes("coincidem") && r.test
        ).length;
        return (passed / 5) * 100;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (calculateStrength() < 100 || password !== confirmPassword) {
            setError("Cumpra todos os requisitos antes de prosseguir.");
            setIsModalErrorOpen(true); // <--- ADICIONE ISSO
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:9090/api/public/esqueceuSenha/reset", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    password
                })

            })
            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Erro ao atualizar senha.")
                setIsModalErrorOpen(true);
                return
            }

            setIsSuccess(true);
            
            setTimeout(() => router.push("/login"), 3000);
        } catch {
            setError("Erro ao processar. O link pode ter expirado.");
            setIsModalErrorOpen(true); // <--- ADICIONE ISSO
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <Loading 
                    fullScreen 
                    label="Atualizando sua senha..." 
                    className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
                />
            )}
            <div className="fixed inset-0 h-screen w-full flex items-center justify-center bg-black p-4 overflow-hidden">
                <div className="w-full max-w-lg bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-2xl overflow-y-auto max-h-[95vh] scrollbar-hide">
                    <div>
                        {!isSuccess && (
                            <div className="flex items-center flex-col">
                                <Link
                                    href="/login" 
                                    className="group flex items-center justify-center gap-2
                                    font-bold text-white transition-all mb-2"
                                >
                                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-1" /> Voltar para o login
                                </Link>
                                <h1 className="text-xl font-bold text-white tracking-tight">Redefinir Senha</h1>
                                <p className="text-zinc-500 text-xs mt-1">Crie uma nova senha segura para sua conta InovaSoft.</p>
                            </div>
                        )}
                    </div>
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Modal isOpen={isModalErrorOpen} onClose={() => setIsModalErrorOpen(false)}>
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-6 rounded-lg text-center animate-pulse">
                                        <h3 className="font-bold mb-2 uppercase text-xs tracking-widest">Erro</h3>
                                        {error}
                                    </div>
                                </Modal>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {/* CAMPO SENHA */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password" title="Senha" className="text-green-600 font-bold flex items-center gap-2">Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <Input 
                                            id="password"
                                            type={showPassword ? "text" : "password"} 
                                            className={cn(
                                                "pl-10 pr-10 h-12 bg-zinc-900 border border-zinc-800 text-white rounded-xl focus-visible:ring-blue-500/20",
                                                confirmPassword && (password === confirmPassword ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-red-500 ring-2 ring-red-500/10")
                                            )}
                                            placeholder="••••••••" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* CONFIRMAR SENHA */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="confirmPassword" title="Confirmar Senha" className="text-green-600 font-bold flex items-center gap-2">Confirmar Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <Input 
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"} 
                                            className={cn(
                                                "pl-10 pr-10 h-12 bg-zinc-900 border border-zinc-800 text-white rounded-xl focus-visible:ring-blue-500/20",
                                                confirmPassword && (password === confirmPassword ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-red-500 ring-2 ring-red-500/10")
                                            )}
                                            placeholder="••••••••" 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* PAINEL DE FORÇA E REQUISITOS */}
                            <div className="flex flex-col gap-2 col-span-2">
                                <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-4 rounded-xl shadow-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                                                Força da Senha
                                            </span>
                                            <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                                                {calculateStrength() < 40 ? "Fraca" : 
                                                calculateStrength() < 80 ? "Média" :
                                                calculateStrength() < 100 ? "Forte" : "Excelente"}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                                            <div 
                                                className={cn(
                                                "h-full transition-all duration-500 ease-out",
                                                calculateStrength() < 40 ? "bg-red-500" : 
                                                calculateStrength() < 80 ? "bg-amber-500" : 
                                                calculateStrength() < 100 ? "bg-emerald-500" : "bg-green-700"
                                                )}
                                                style={{ width: `${calculateStrength()}%` }}
                                            />
                                        </div>
                                    </div>
                                    {requirements.map((req, i) => (
                                        <div key={i} className="flex items-center gap-2 group">
                                            {req.test ? (
                                                <CheckCircle2 size={14} className="text-emerald-500 transition-transform group-hover:scale-110" />
                                            ) : (
                                                <CircleX size={14} className="text-red-300" />
                                            )}
                                            <span className={cn(
                                                "text-[11px] transition-colors",
                                                req.test ? "text-emerald-700 font-medium" : "text-red-400"
                                            )}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !token || calculateStrength() < 100 || password !== confirmPassword}
                                className="cursor-pointer w-full mt-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-green-600/20"

                            >
                                Redefinir Senha
                            </button>
                        </form>
                    ) : (
                        <div className="group flex flex-col items-center justify-center py-10 space-y-4 animate-in zoom-in duration-300">
                            <CheckCircle2 className="w-20 h-20 text-emerald-500"/>
                            <div className="text-center">
                                <p className="text-white font-bold">Senha atualizada!</p>
                                <p className="text-zinc-500 text-xs">Redirecionando para o login...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RedefinirSenhaPage;