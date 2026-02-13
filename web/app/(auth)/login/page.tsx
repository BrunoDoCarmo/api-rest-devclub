"use client";

import Image from "next/image";

import { useState } from "react";
import UserLogin from "../../_components/login";
import Modal from "@/app/_components/modal";
import EsqueceuModal from "@/app/_components/esqueceu-senha-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [isEsqueceuModalOpen, setIsEsqueceuModalOpen] = useState(false);
  
  return (
    <>
      <div className="relative flex h-full flex-col bg-black lg:grid lg:grid-cols-2">
        {/* ESQUERDA */}
        <div className="relative z-10 flex h-screen w-full flex-col justify-center py-16 text-white lg:mx-auto lg:max-w-[550px] lg:px-10">
          <div className="flex flex-col items-center bg-black p-8 lg:items-start lg:bg-transparent">
            <UserLogin setScreen={() => setIsEsqueceuModalOpen(true)} />
          </div>
        </div>

        {/* DIREITA */}
        <div className="absolute inset-0 lg:relative lg:inset-auto">
          <Image
            src="/login.png"
            alt="Tela de login"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 space-y-2">
              
            <Link href="/" className="flex justify-center w-full mb-2">
              <Image src="/logo-light.svg" alt="Finance AI" width={250} height={140} priority />
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-white">Não tem uma conta?</h1>
            <button
              onClick={() => router.push("/create")}
              className="w-xl mt-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-green-600/20"
            >
              Cadastre-se
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isEsqueceuModalOpen} onClose={() => setIsEsqueceuModalOpen(false)}>
        <EsqueceuModal onClose={() => setIsEsqueceuModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LoginPage;