"use client"

import { userCadastroAction } from "@/app/actions/login/cadastro";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface UserCadastroProps {
    setScreen: (value: "login" | "cadastro" | "esqueceu") => void;
    active: boolean
}

const UserCadastro = ({setScreen, active}: UserCadastroProps) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef  = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter()

    const rules = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
      igual: password !== "" && confirmPassword !== "" && password === confirmPassword
    }

    async function handleCadastro(e: React.FormEvent) {
        e.preventDefault()

        const password = passwordRef.current?.value || ""
        const confirmPassword = confirmPasswordRef.current?.value || ""

        if(!(rules.minLength && rules.uppercase && rules.number && rules.special)) {
          alert("A senha não atende os requisitos!")
          return
        }

        if(password !== confirmPassword) {
          alert("As senhas não coincidem")
          return
        }

        const form = new FormData()
        form.append("name", nameRef.current?.value || "")
        form.append("username", usernameRef.current?.value || "")
        form.append("password", passwordRef.current?.value || "")
        form.append("email", emailRef.current?.value || "")

        const result = await userCadastroAction(form)

        if(result.success) {
            router.push("/")
        } else {
            alert(result.message)
        }
    }

    useEffect(() => {
        if (!active) return;

        let cancelled = false;

        const tryFocus = () => {
            if (cancelled) return;
            const el = nameRef.current;
            if (el) {
                el.focus();
                el.select();
                return;
            }
            requestAnimationFrame(tryFocus);
        };

        requestAnimationFrame(tryFocus);

        return () => { cancelled = true; };
    }, [active]);

    return ( 
        <>
            <h2 className="text-xl font-bold mb-4">Criar conta</h2>
            
            <form onSubmit={handleCadastro} className="w-full flex flex-col gap-4 mt-4">
              <input
                ref={nameRef}
                type="text"
                placeholder="Nome"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all"
              />
              <input
                ref={usernameRef}
                type="text"
                placeholder="Usuário"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all"
              />
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirmar Senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all"
              />
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 
                           transition-all rounded-lg text-white font-semibold"
              >
                Entrar
              </button>
            </form>
            <div className="flex flex-col mt-5 text-sm">
              <span className={`flex item-center ${rules.minLength ? "text-green-600" : "text-red-600"}`}>
                { rules.minLength ? <Check /> : <X /> } A senha deve ter ao menos 8 caracteres
              </span>
              <span className={`flex item-center ${rules.uppercase ? "text-green-600" : "text-red-600"}`}>
                { rules.uppercase ? <Check /> : <X /> }
                A senha deve ter ao menos uma letra maiúscula
              </span>
              <span className={`flex item-center ${rules.number ? "text-green-600" : "text-red-600"}`}>
                { rules.number ? <Check /> : <X /> }
                A senha deve ter ao menos um número
              </span>
              <span className={`flex item-center ${rules.special ? "text-green-600" : "text-red-600"}`}>
                { rules.special ? <Check /> : <X /> }
                A senha deve ter ao menos um caractere especial 
              </span>
              <span className={`flex item-center ${rules.igual ? "text-green-600" : "text-red-600"}`}>
                { rules.igual ? <Check /> : <X /> }
                { rules.igual ? "As senhas são iguais" : "As senhas não são iguais" }
              </span>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-blue-600 mt-4"
                onClick={() => setScreen("login")}
              >
                Fazer login
              </button>
            </div>
        </>
    );
}
 
export default UserCadastro;