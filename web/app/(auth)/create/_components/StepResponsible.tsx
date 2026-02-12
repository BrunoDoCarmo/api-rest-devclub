"use client";

import { User, MapPin, Phone, Mail, Hash, Smartphone, Map, LocateFixed, MapPinned, Building2, User2 } from "lucide-react";
import { formatCEP, formatCPFCNPJ, formatPhone } from "@/app/utils/mascara";
import { ResponsibleData } from "../../../types/auth-create";
import { cn } from "@/lib/utils";

// Componentes do Shadcn/UI
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

interface StepResponsibleProps {
  data: ResponsibleData;
  type: string;
  onChange: (d: ResponsibleData) => void;
  activeSubTab: number;
}

export const StepResponsible = ({ data, type, onChange, activeSubTab }: StepResponsibleProps) => {
  const tabs = [
    { label: "Dados Pessoais", icon: User },
    { label: "Endereço", icon: MapPin },
    { label: "Contatos", icon: Phone },
  ];
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
        {/* ABA 0: DADOS PESSOAIS */}
        {activeSubTab === 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2" htmlFor="name">{type === "LEGAL" ? "Nome da Empresa" : "Nome Completo"}</Label>
              <div className="relative">
                {type === "LEGAL" ? 
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" /> : 
                  <User2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                }
                <Input 
                  id="name"
                  placeholder={type === "LEGAL" ? "Ex: Empresa LTDA" : "Ex: João da Silva"} 
                  value={data.name || ""} 
                  onChange={(e) => onChange({ ...data, name: e.target.value })}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2" htmlFor="document">{type === "LEGAL" ? "CNPJ da Empresa" : "CPF do Responsável"}</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  id="document"
                  className="pl-10 bg-white"
                  placeholder={type === "LEGAL" ? "00.000.000/0000-00" : "000.000.000-00"} 
                  value={formatCPFCNPJ(type === "LEGAL" ? (data.cnpj || "") : (data.cpf || ""), type)} 
                  onChange={(e) => {
                    const field = type === "LEGAL" ? "cnpj" : "cpf";
                    onChange({ ...data, [field]: e.target.value });
                  }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* ABA 1: ENDEREÇO (Grid Layout) */}
        {activeSubTab === 1 && (
          <div className="grid grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="col-span-4 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                Rua / Logradouro
              </Label>
              <div className="relative">
                <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Nome da rua" 
                  value={data.public_place} 
                  onChange={(e) => onChange({ ...data, public_place: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-2 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                Número
              </Label>
              <div className="relative">
                <MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Nº" 
                  value={data.number} 
                  onChange={(e) => onChange({ ...data, number: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-6 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                Complemento (Opcional)
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Apto, Bloco, etc." 
                  value={data.complement} 
                  onChange={(e) => onChange({ ...data, complement: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-3 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                CEP
              </Label>
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="00000-000" 
                  value={formatCEP(data.cep || "")} 
                  onChange={(e) => onChange({ ...data, cep: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-3 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                Bairro
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Seu bairro" 
                  value={data.neighborhood} 
                  onChange={(e) => onChange({ ...data, neighborhood: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-4 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                Cidade
              </Label>
              <div className="relative">
                <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Sua cidade" 
                  value={data.city} 
                  onChange={(e) => onChange({ ...data, city: e.target.value })} 
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="col-span-2 grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                UF
              </Label>
              <div className="relative">
                <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="UF" 
                  maxLength={2} 
                  className="pl-10 uppercase bg-white"
                  value={data.uf} 
                  onChange={(e) => onChange({ ...data, uf: e.target.value.toUpperCase() })} 
                />
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: CONTATOS */}
        {activeSubTab === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid gap-2">
              <Label className="text-green-600 font-bold flex items-center gap-2">
                <Mail size={14}/>
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  className="pl-10 bg-white"
                  placeholder="email@exemplo.com" 
                  value={data.email} 
                  onChange={(e) => onChange({ ...data, email: e.target.value })} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-4">
                <Label className="text-green-600 font-bold flex items-center gap-2">
                  <Phone size={14} /> Fixos
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <Input 
                    placeholder="Fixo 1" 
                    value={formatPhone(data.telephone1 || "")} 
                    onChange={(e) => onChange({ ...data, telephone1: e.target.value })} 
                    className="pl-10 bg-white"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <Input 
                    placeholder="Fixo 2" 
                    value={formatPhone(data.telephone2 || "")} 
                    onChange={(e) => onChange({ ...data, telephone2: e.target.value })} 
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-green-600 font-bold flex items-center gap-2">
                  <Smartphone size={14} /> Celulares
                </Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <Input 
                    placeholder="Celular 1" 
                    value={formatPhone(data.cell_phone1 || "")} 
                    onChange={(e) => onChange({ ...data, cell_phone1: e.target.value })} 
                    className="pl-10 bg-white"
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <Input 
                    placeholder="Celular 2" 
                    value={formatPhone(data.cell_phone2 || "")} 
                    onChange={(e) => onChange({ ...data, cell_phone2: e.target.value })} 
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};