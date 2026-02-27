"use client"

import { Label } from "@/app/_components/ui/label";
import { useState } from "react";
import { 
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    CircleX,
    AtSign
} from "lucide-react";

import { Input } from "@/app/_components/ui/input";

import { cn } from "@/lib/utils";

import { UpdateUserCreateAccount } from "../../../types/auth-create";
import { Loading } from "@/app/_components/loading";
import Modal from "@/app/_components/modal";

interface FormComponentProps {
  data: UpdateUserCreateAccount;
  onChange: (d: UpdateUserCreateAccount) => void;
}

export const FormComponent = ({ data, onChange }: FormComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [modal, setModal] = useState<{ open: boolean; message: string; type: "error" | "success" }>({
        open: false,
        message: "",
        type: "success",
    });
    
    // Regras de validação
    const requirements = [
        { label: "Mínimo de 8 caracteres", test: (data?.password?.length ?? 0) >= 8 },
        { label: "Letra maiúscula", test: /[A-Z]/.test(data?.password ?? "") },
        { label: "Letra minúscula", test: /[a-z]/.test(data?.password ?? "") },
        { label: "Número (0-9)", test: /[0-9]/.test(data?.password ?? "") },
        { label: "Símbolo (!@#$%^&*)", test: /[^A-Za-z0-9]/.test(data?.password ?? "") },
        { 
            label: data?.password === confirmPassword && confirmPassword !== "" ? "As senhas coincidem" : "As senhas não coincidem", 
            test: data?.password === confirmPassword && confirmPassword !== "" 
        },
    ];

    const calculateStrength = () => {
        const passed = requirements.filter(r => r.label !== "As senhas coincidem" && r.test).length;
        return (passed / 5) * 100;
    };

    const handleActivateAccount = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams(window.location.search)
            const userEmail = params.get("email")
            const tenantIdEmail = params.get("tenant")
            const responsibleIdEmail = params.get("responsible")
            const token = params.get("token")

            if (!userEmail || !tenantIdEmail || !responsibleIdEmail) {
                throw new Error("Dados de convite incompletos na URL.");
            }

            const responseUpdate = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/public/auth/update-user-create/${userEmail}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: token,
                        tenantId: tenantIdEmail, // CamelCase conforme padrão Prisma
                        responsibleId: responsibleIdEmail, // CamelCase
                        username: data.username.toLowerCase(),
                        password: data.password,
                    })
                }
            );

            if(!responseUpdate.ok) {
                const errorData = await responseUpdate.json();
                throw new Error(errorData.message || "Erro desconhecido ao ativar conta.");
            }
            setModal({ open: true, message: "Sua conta foi ativada! Você já pode fazer login.", type: "success" });
        } catch (error) {
            setModal({ open: true, message: (error as Error).message || "Erro ao ativar conta.", type: "error" });
        } finally {
            setLoading(false);
        }        
    }

    return (
        <>
            {loading && (
                <Loading 
                    fullScreen 
                    label="Ativando conta..." 
                    className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
                />
            )}
            <div className="w-full space-y-5">
                {/* USERNAME */}
                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="username" className="text-green-600 font-bold flex items-center gap-2">
                        Usuário
                    </Label>
                    <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input 
                            id="username"
                            className="pl-10 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus-visible:ring-green-500/20 lowercase"
                            placeholder="ex: joao.silva" 
                            value={data.username.toLowerCase()} 
                            onChange={(e) => onChange({ ...data, username: e.target.value })} 
                            />
                    </div>
                </div>

                {/* SENHA */}
                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="password" className="text-green-600 font-bold flex items-center gap-2">Senha</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                        id="password"
                        type={showPassword ? "text" : "password"} 
                        className={cn(
                            "pl-10 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus-visible:ring-green-500/20",
                            confirmPassword && (data.password === confirmPassword ? "border-emerald-500" : "border-red-500")
                        )}
                        placeholder="••••••••" 
                        value={data.password} 
                        onChange={(e) => onChange({ ...data, password: e.target.value })} 
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
                <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="confirmPassword" className="text-green-600 font-bold flex items-center gap-2">Confirmar Senha</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <Input 
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"} 
                            className={cn(
                                "pl-10 h-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus-visible:ring-green-500/20",
                                confirmPassword && (data.password === confirmPassword ? "border-emerald-500" : "border-red-500")
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

                {/* GRID DE REQUISITOS (2 COLUNAS) */}
                <div className="flex flex-col gap-2 col-span-2">
                    <div className="bg-zinc-900 space-y-4">
                        {/* INDICADOR DE FORÇA */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                                    Força da Senha
                                </span>
                                <span
                                    className={cn(
                                        "text-[10px] font-bold uppercase",
                                        calculateStrength() < 40 ? "text-red-500" : 
                                        calculateStrength() < 80 ? "text-amber-500" :
                                        calculateStrength() < 100 ? "text-emerald-500" : "text-green-700"
                                    )}
                                >
                                    {
                                        calculateStrength() < 40 ? "Fraca" : 
                                        calculateStrength() < 80 ? "Média" :
                                        calculateStrength() < 100 ? "Forte" : "Excelente"
                                    }
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
                        {
                            requirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-2 group">
                                    {req.test ? (
                                        <CheckCircle2 size={14} className="text-emerald-500 transition-transform group-hover:scale-110" />
                                    ) : (
                                        <CircleX size={14} className="text-red-300" />
                                    )}
                                    <span
                                        className={cn(
                                            "text-[11px] transition-colors",
                                            req.test ? "text-emerald-700 font-medium" : "text-red-400"
                                        )}
                                    >
                                        {req.label}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button
                    onClick={handleActivateAccount}
                    disabled={status === "loading" || !requirements.every(r => r.test)}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold disabled:opacity-50"
                >
                    Ativar Minha Conta
                </button>
            </div>
            <Modal isOpen={modal.open} onClose={() => setModal({ ...modal, open: false })}>
                <div className="p-6 text-center space-y-4">
                    <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mx-auto",
                        modal.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {modal.type === "success" ? <CheckCircle2 size={24} /> : <CircleX size={24} />}
                    </div>
                    <p className={cn("font-medium", modal.type === "success" ? "text-emerald-400" : "text-red-400")}>
                        {modal.message}
                    </p>
                    <button 
                        onClick={() => setModal({ ...modal, open: false })}
                        className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </Modal>
        </>
    );
}
