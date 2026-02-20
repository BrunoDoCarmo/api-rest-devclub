"use client";

import Image from "next/image";
import { useState } from "react";
import { FormComponent } from "./_components/form";
import { UpdateUserCreateAccount } from "../../types/auth-create";

export default function VerifyEmailPage() {
  // 1. Criamos o estado que vai segurar os valores digitados
  const [formData, setFormData] = useState<UpdateUserCreateAccount>({
    tenantId: "",
    username: "",
    password: "",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-zinc-900 p-8 shadow-lg">
        <Image src="/logo-light.svg" alt="Logo" width={150} height={40} className="mb-4" />
        
        {/* 2. Passamos o estado e a função que atualiza esse estado */}
        <FormComponent 
          data={formData} 
          onChange={(newData) => setFormData(newData)} 
        />
      </div>
    </div>
  );
}