import { userCadastroAction } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface UserCadastroProps {
    setScreen: (value: "login" | "cadastro" | "esqueceu") => void;
    active: boolean
}

const UserCadastro = ({setScreen, active}: UserCadastroProps) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef  = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    async function handleCadastro(e: React.FormEvent) {
        e.preventDefault()

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