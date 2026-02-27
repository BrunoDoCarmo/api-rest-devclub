"use client";

import { User, AtSign, Lock, EyeOff, Eye, CheckCircle2, CircleX, Mail } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { UserData } from "../../../types/auth-create";
import { MembershipsData } from "../../../types/auth-create";

// Componentes do Shadcn/UI
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

interface StepUserProps {
  dataUser: UserData;
  dataMemberships: MembershipsData,
  onChangeUser: (dU: UserData) => void;
  onChangeMemberships: (dM: MembershipsData) => void;
  activeSubTab: number;
}

export const StepUser = ({ dataUser, dataMemberships, onChangeUser, onChangeMemberships, activeSubTab }: StepUserProps) => {
  const tabs = [
    { label: "Membro", icon: User },
    { label: "Usuário", icon: User },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  // Regras de validação
  const requirements = [
    { label: "Mínimo de 8 caracteres", test: dataUser.password.length >= 8 },
    { label: "Letra maiúscula", test: /[A-Z]/.test(dataUser.password) },
    { label: "Letra minúscula", test: /[a-z]/.test(dataUser.password) },
    { label: "Número (0-9)", test: /[0-9]/.test(dataUser.password) },
    { label: "Símbolo (!@#$%^&*)", test: /[^A-Za-z0-9]/.test(dataUser.password) },
    { 
      label: dataUser.password === confirmPassword && confirmPassword !== "" ? "As senhas coincidem" : "As senhas não coincidem", 
      test: dataUser.password === confirmPassword && confirmPassword !== "" 
    },
  ];

  // Cálculo de força da senha (0 a 100)
  const calculateStrength = () => {
    const passed = requirements.filter(r => r.label !== "As senhas coincidem" && r.test).length;
    return (passed / 5) * 100;
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Navegação de Sub-abas */}
      <div className="flex gap-2 p-1 bg-zinc-100 rounded-xl border border-zinc-200">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === i;
          return (
            <div
              key={tab.label}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all",
                isActive 
                  ? "bg-white shadow-sm text-blue-600" 
                  : "text-zinc-500 opacity-60"
              )}
            >
              <Icon size={14} className={isActive ? "text-blue-600" : "text-zinc-400"} />
              <span className="hidden sm:inline">{tab.label}</span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[300px] text-left">
        {/* ABA 0: MEMBRO */}
        {activeSubTab === 0 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
            <div className="grid grid-cols-2 gap-4">
              {/* NOME DE EXIBIÇÃO */}
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="displayName" className="text-green-600 font-bold flex items-center gap-2">
                  Nome de Exibição
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="displayName"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 uppercase"
                    placeholder="Como quer ser chamado?" 
                    value={dataMemberships.name} 
                    onChange={(e) => onChangeMemberships({ ...dataMemberships, name: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 1: USUÁRIO */}
        {activeSubTab === 1 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
            <div className="grid grid-cols-2 gap-4">
              
              {/* EMAIL */}
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="email" className="text-green-600 font-bold flex items-center gap-2">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="email"
                    type="email"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 lowercase"
                    placeholder="seu@email.com" 
                    value={dataUser.email.toLowerCase()} 
                    onChange={(e) => onChangeUser({ ...dataUser, email: e.target.value })} 
                  />
                </div>
              </div>

              {/* USERNAME */}
              <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <Label htmlFor="username" className="text-green-600 font-bold flex items-center gap-2">
                  Usuário
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="username"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 lowercase"
                    placeholder="ex: joao.silva" 
                    value={dataUser.username.toLowerCase()} 
                    onChange={(e) => onChangeUser({ ...dataUser, username: e.target.value })} 
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
                    className="pl-10 pr-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20"
                    placeholder="••••••••" 
                    value={dataUser.password} 
                    onChange={(e) => onChangeUser({ ...dataUser, password: e.target.value })} 
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
                      "pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 transition-colors",
                      confirmPassword && (dataUser.password === confirmPassword ? "border-emerald-500" : "border-red-500")
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
                <div className="bg-zinc-50 p-4 space-y-4 rounded-xl border border-zinc-100 shadow-sm">
                  {/* INDICADOR DE FORÇA */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                        Força da Senha
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase",
                        calculateStrength() < 40 ? "text-red-500" : 
                        calculateStrength() < 80 ? "text-amber-500" :
                        calculateStrength() < 100 ? "text-emerald-500" : "text-green-700"
                      )}>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};