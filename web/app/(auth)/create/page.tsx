"use client";

import Image from "next/image";
import Modal from "../../_components/modal";
import { TermoModal } from "../../_components/termo-modal";
import { useCreateForm } from "./use-create-form";
import { StepTenant } from "./_components/StepTenant";
import { StepResponsible } from "./_components/StepResponsible"; // Criar similar ao StepUser
import { StepUser } from "./_components/StepUser";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const { state, actions, validators } = useCreateForm();
    const [ showTermoModal, setShowTermoModal ] = useState(false);
    const router = useRouter();
    const renderStep = () => {
        switch (state.activeTab) {
        case 0: return ( 
            <StepTenant 
                data={state.tenant}
                onChange={actions.setTenant}
                onCnpjFetch={actions.setTenantWithCnpj}
            />
        );
        case 1: return (
            <StepResponsible 
                data={state.responsible} 
                type={state.tenant.type} 
                onChange={actions.setResponsible}
                activeSubTab={state.responsibleTab} // Nova prop
            />
        );
        case 2: return (
            <StepUser
                data={state.user}
                onChange={actions.setUser}
            />
        );
        default: return null;
        }
    };

    const handleFinalStep = () => {
        if (state.activeTab === 2) {
            setShowTermoModal(true);
        } else {
            actions.handleNext();
        }
    }

    const confirmRegistration = async () => {
        setShowTermoModal(false);
        await actions.handleSubmit();
    }

    return (
        <div className="relative flex min-h-screen bg-black lg:grid lg:grid-cols-2 overflow-hidden text-center">
            <div className="hidden lg:block relative">
                <Image src="/login.png" alt="Background" fill className="object-cover opacity-60" priority />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 space-y-2">
                    <Image src="/logo-light.svg" alt="Finance AI" width={250} height={140} priority />
                    <h1 className="mt-6 text-3xl font-bold text-white">Já tem uma conta?</h1>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-xl mt-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-green-600/20"
                    >
                        Acessar
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center p-6 w-full">
                <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 transition-all">
                    <h2 className="text-3xl font-bold mb-8 text-zinc-900">Criar conta</h2>
                
                    {/* Stepper Visual */}
                    <div className="flex gap-2 mb-8">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={`h-2 flex-1 rounded-full ${state.activeTab >= i ? "bg-blue-600" : "bg-zinc-200"}`} />
                        ))}
                    </div>

                    {renderStep()}

                    <div className="mt-10 flex justify-between gap-4">
                        <button 
                            disabled={state.activeTab === 0 && state.responsibleTab === 0} // Desabilita apenas no início absoluto
                            onClick={actions.handleBack} // Usa a função do hook
                            className={`btn-secondary bg-red-400 rounded-xl px-4 py-3 text-white ${
                                state.activeTab === 0 ? "opacity-50 cursor-not-allowed hidden" : ""
                            }`}
                        >
                            Voltar
                        </button>

                        <button
                            disabled={
                                state.loading || !validators.canAdvance
                            }
                            onClick={handleFinalStep} // Usa a função do hook
                            className={`btn-primary bg-green-500 rounded-xl px-4 py-3 text-white ${
                                (state.loading || !validators.canAdvance) ? "opacity-80 cursor-not-allowed" : ""
                            }`}
                        >
                            {state.loading ? "Processando..." : state.activeTab === 2 ? "Finalizar Cadastro" : "Próximo passo"}
                        </button>
                    </div>
                </div>
            </div>
            <TermoModal 
                isOpen={showTermoModal} 
                onClose={() => setShowTermoModal(false)} 
                onAccept={confirmRegistration} 
            />

            <Modal isOpen={state.modal.open} onClose={() => actions.setModal({ ...state.modal, open: false })}>
                <div className="text-center p-4">
                    <h2 className={`text-2xl font-bold mb-4 ${state.modal.type === "success" ? "text-green-600" : "text-red-600"}`}>
                        {state.modal.type === "success" ? "Sucesso!" : "Erro no Cadastro"}
                    </h2>
                    <p className="text-zinc-600 mb-6">{state.modal.message}</p>
                    <button 
                        onClick={() => state.modal.type === "success" ? window.location.href = "/login" : actions.setModal({ ...state.modal, open: false })}
                        className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold"
                    >
                        {state.modal.type === "success" ? "Ir para o Login" : "Tentar novamente"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CreatePage;