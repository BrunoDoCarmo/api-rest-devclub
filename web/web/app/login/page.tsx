
import Image from "next/image";
import { LogInIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import Modal from "../_components/modal";
import { useState } from "react";

const LoginPage = async () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className="relative flex h-full flex-col bg-black lg:grid lg:grid-cols-2">
      {/* ESQUERDA */}
      <div className="relative z-10 flex h-screen w-full flex-col justify-center py-16 text-white lg:mx-auto lg:max-w-[550px] lg:px-10">
        <div className="flex flex-col items-center bg-black p-8 lg:items-start lg:bg-transparent">
          {/* LOGO */}
          <Image
            src="/logo-light.svg"
            width={173}
            height={39}
            alt="Finance AI"
            className="mb-8 brightness-200 lg:brightness-100"
          />

          {/* TÍTULO */}
          <h1 className="mb-4 text-center text-4xl font-bold lg:text-left">
            Bem-vindo
          </h1>

          {/* DESCRIÇÃO */}
          <p className="mb-10 max-w-md text-center text-gray-200 lg:text-left lg:text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>

          {/* BOTÃO */}
            <Button
              variant="outline"
              className="flex items-center gap-2 border-white bg-black hover:bg-white hover:text-black lg:border-gray-300"
              onClick={() => setOpen(true)}
            >
              <LogInIcon className="h-5 w-5" />
              Fazer login ou criar conta
            </Button>
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
      </div>
    </div>
    <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Título do Modal</h2>
        <p>Conteúdo dentro do modal.</p>
      </Modal>
    </>
  );
};

export default LoginPage;
