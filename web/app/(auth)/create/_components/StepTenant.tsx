"use client";

import { useState } from "react";
import { Building2, User2, Briefcase, Search, SignalHigh, SignalMedium, SignalLow } from "lucide-react";
import { TenantData } from "../../../types/auth-create";
import { formatCPFCNPJ } from "@/app/utils/mascara";

// Componentes Shadcn/UI
import Modal from "@/app/_components/modal";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/lib/utils";

interface CnpjData {
  razao_social: string;
  nome_fantasia?: string;
  cnpj: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  municipio: string;
  uf: string;
}

interface StepTenantProps {
  data: TenantData;
  onChange: (d: TenantData) => void;
  onCnpjFetch: (data: CnpjData) => void;
}

export const StepTenant = ({ data, onChange, onCnpjFetch }: StepTenantProps) => {
  const [feedbackModal, setFeedbackModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const showFeedback = (title: string, message: string, type: "success" | "error") => {
    setFeedbackModal({ open: true, title, message, type });
  };

  const fetchCNPJData = async (cnpjWithMask: string) => {
    const cleanCNPJ = cnpjWithMask.replace(/\D/g, "");
    if (cleanCNPJ.length !== 14) return;

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
      if (!response.ok) throw new Error("CNPJ não encontrado");

      const result = await response.json();
      onCnpjFetch(result);
      showFeedback("Sucesso!", "Dados da empresa importados com sucesso.", "success");
    } catch {
      showFeedback("Erro!", "Não conseguimos localizar este CNPJ automaticamente.", "error");
    }
  };

  const handleTypeChange = (value: string) => {
    onChange({
      ...data,
      type: value,
      size: value === "PHYSICAL" ? "SMALL" : "",
      name: value === "PHYSICAL" ? "EMPRESA PESSOA FISICA" : "",
      cnpj: "",
    });
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
        {/* TIPO DE CADASTRO */}
        <div className="grid gap-2">
          <Label htmlFor="type" className="text-green-600 font-bold flex items-center gap-2">Tipo de Cadastro</Label>
          <Select value={data.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type" className="h-12 bg-white rounded-xl border-zinc-200">
              <SelectValue placeholder="Selecione o tipo de conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHYSICAL">
                <div className="flex items-center gap-2">
                  <User2 size={16} className="text-zinc-500" />
                  <span>Pessoa Física</span>
                </div>
              </SelectItem>
              <SelectItem value="LEGAL">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-zinc-500" />
                  <span>Pessoa Jurídica</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.type === "LEGAL" && (
          <div className="grid gap-5 animate-in fade-in zoom-in-95 duration-300">
            {/* PORTE DA EMPRESA */}
            <div className="grid gap-2">
              <Label htmlFor="size" className="text-green-600 font-bold flex items-center gap-2">Porte da Empresa</Label>
              <Select value={data.size} onValueChange={(val) => onChange({ ...data, size: val })}>
                <SelectTrigger id="size" className="h-12 bg-white rounded-xl border-zinc-200">
                  <SelectValue placeholder="Selecione o porte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMALL">
                    <div className="flex items-center gap-2">
                        <SignalLow size={16} className="text-zinc-500" />
                        <span>Pequena</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    <div className="flex items-center gap-2">
                        <SignalMedium size={16} className="text-zinc-500" />
                        <span>Média</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="LARGE">
                    <div className="flex items-center gap-2">
                        <SignalHigh size={16} className="text-zinc-500" />
                        <span>Grande</span>
                    </div>                
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CNPJ COM BUSCA AUTOMÁTICA */}
            <div className="grid gap-2">
              <Label htmlFor="cnpj" className="text-green-600 font-bold flex items-center gap-2">CNPJ</Label>
              <p className="text-[11px] text-red-400 ml-1 italic">
                Preencha o CNPJ para buscar os dados automaticamente.
              </p>
              <div className="relative">
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  className="h-12 bg-white rounded-xl pl-10 border-zinc-200 focus-visible:ring-blue-500/20"
                  value={formatCPFCNPJ(data.cnpj || "", "LEGAL")}
                  onChange={(e) => {
                    const val = e.target.value;
                    const formattedValue = formatCPFCNPJ(val, "LEGAL");
                    onChange({ ...data, cnpj: formattedValue });
                    if (formattedValue.replace(/\D/g, "").length === 14) {
                      fetchCNPJData(formattedValue);
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              </div>
            </div>

            {/* RAZÃO SOCIAL */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-green-600 font-bold flex items-center gap-2">Razão Social / Nome Fantasia</Label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Ex: Minha Empresa LTDA"
                  className="h-12 bg-white rounded-xl pl-10 border-zinc-200"
                  value={data.name}
                  onChange={(e) => onChange({ ...data, name: e.target.value })}
                />
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE FEEDBACK */}
      <Modal isOpen={feedbackModal.open} onClose={() => setFeedbackModal({ ...feedbackModal, open: false })}>
        <div className="p-8 text-center">
          <div className={cn(
            "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors",
            feedbackModal.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
          )}>
            {feedbackModal.type === "success" ? <Building2 size={28} /> : <Search size={28} />}
          </div>

          <h3 className={cn(
            "text-xl font-bold mb-2",
            feedbackModal.type === "success" ? "text-emerald-700" : "text-red-700"
          )}>
            {feedbackModal.title}
          </h3>

          <p className="text-zinc-600 mb-8 text-sm leading-relaxed">
            {feedbackModal.message}
          </p>

          <Button
            onClick={() => setFeedbackModal({ ...feedbackModal, open: false })}
            className={cn(
              "w-full h-12 rounded-xl font-bold transition-all shadow-md active:scale-95",
              feedbackModal.type === "success" 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "bg-zinc-900 hover:bg-zinc-800 text-white"
            )}
          >
            {feedbackModal.type === "success" ? "Excelente!" : "Entendido"}
          </Button>
        </div>
      </Modal>
    </>
  );
};