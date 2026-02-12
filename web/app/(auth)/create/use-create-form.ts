import { useState } from "react";
import { signup } from "@/app/actions/auth-create";

interface CnpjData {
  razao_social: string;
  nome_fantasia?: string;
  cnpj: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string;
  cep: string;
  municipio: string;
  uf: string;
  email?: string;
  ddd_telefone_1?: string;
  ddd_telefone_2?: string;
  ddd_celular_1?: string;
  ddd_celular_2?: string;
}

export const useCreateForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "success" as "success" | "error", message: "" });

  const [tenant, setTenant] = useState({ name: "", type: "", size: "", });
  const [responsible, setResponsible] = useState({
    name: "", cpf: "", cnpj: "", public_place: "", number: "",
    neighborhood: "", complement: "", cep: "", city: "", uf: "",
    telephone1: "", telephone2: "", cell_phone1: "", cell_phone2: "", email: ""
  });
  const [responsibleTab, setResponsibleTab] = useState(0);
  const [user, setUser] = useState({ name: "", email: "", username: "", password: "" });

  const isTenantValid = tenant.name && tenant.type && (tenant.type === "PHYSICAL" || tenant.size);
  const isResponsibleValid = () => {
    const { name, cpf, cnpj, public_place, number, cep, city, uf, email, cell_phone1 } = responsible;
    if (responsibleTab === 0) return name && (tenant.type === "PHYSICAL" ? cpf : cnpj);
    if (responsibleTab === 1) return public_place && number && cep && city && uf;
    if (responsibleTab === 2) return email && cell_phone1;
    return false;
  }
  const isUserValid = user.username && user.email && user.password;

  const canAdvance = () => {
    if (activeTab === 0) return isTenantValid;
    if (activeTab === 1) return isResponsibleValid();
    if (activeTab === 2) return isUserValid;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        tenant: { ...tenant, ...(tenant.type === "PHYSICAL" && { name: "EMPRESA PESSOA FISICA" }) },
        responsible: { 
            ...responsible, 
            cpf: tenant.type === "PHYSICAL" ? responsible.cpf : null, 
            cnpj: tenant.type === "LEGAL" ? responsible.cnpj : null 
        },
        user
      };
      await signup(payload);
      setModal({ open: true, type: "success", message: "Cadastro realizado com sucesso!" });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro inesperado ao realizar cadastro";
      setModal({ open: true, type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      setActiveTab(1);
      setResponsibleTab(0);
    } else if (activeTab === 1) {
      if (responsibleTab < 2) {
        setResponsibleTab(prev => prev + 1);
      } else {
        setActiveTab(2);
      }
    }
  };

  const handleBack = () => {
    if (activeTab === 1) {
      if (responsibleTab > 0) {
        setResponsibleTab(prev => prev - 1);
      } else {
        setActiveTab(0);
      }
    } else if (activeTab === 2) {
      setActiveTab(1);
      setResponsibleTab(2); // Volta para a última sub-aba do responsável
    } else {
      setActiveTab(prev => prev - 1);
    }
  };

  const setTenantWithCnpj = (dataFromApi: CnpjData) => {
    // 1. Atualiza os dados da Empresa (Tenant)
    setTenant((prev) => ({
      ...prev,
      name: dataFromApi.razao_social || dataFromApi.nome_fantasia || prev.name,
      cnpj: dataFromApi.cnpj,
      
    }));
    // 2. Atualiza os dados do Responsável (Endereço e Contatos)
    setResponsible((prev) => ({
      ...prev,
      name: dataFromApi.razao_social || dataFromApi.nome_fantasia|| prev.name,
      cnpj: dataFromApi.cnpj, // Sincroniza o CNPJ no campo do responsável também
      public_place: dataFromApi.logradouro || prev.public_place,
      number: dataFromApi.numero || prev.number,
      neighborhood: dataFromApi.bairro || prev.neighborhood,
      complement: dataFromApi.complemento || prev.complement,
      cep: dataFromApi.cep || prev.cep,
      city: dataFromApi.municipio || prev.city,
      uf: dataFromApi.uf || prev.uf,
      email: dataFromApi.email || prev.email,
      telephone1: dataFromApi.ddd_telefone_1 || prev.telephone1,
      telephone2: dataFromApi.ddd_telefone_2 || prev.telephone2,
      cell_phone1: dataFromApi.ddd_celular_1 || prev.cell_phone1,
      cell_phone2: dataFromApi.ddd_celular_2 || prev.cell_phone2,
    }));
  };

  return {
    state: { tenant, responsible, user, activeTab, loading, modal, responsibleTab },
    actions: { setTenant, setTenantWithCnpj, setResponsible, setUser, setActiveTab, setModal, handleBack, handleNext, setResponsibleTab, handleSubmit },
    validators: { isTenantValid, isUserValid, canAdvance: canAdvance() }
  };
};