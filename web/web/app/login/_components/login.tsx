
import { userLoginAction } from "@/app/actions/login";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface UserLoginProps {
  setScreen: (value: "login" | "cadastro" | "esqueceu") => void;
  active: boolean
}

const UserLogin = ({ setScreen, active }: UserLoginProps) => {
    const identifierRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
    
        const form = new FormData()
        form.append("identifier", identifierRef.current?.value || "")
        form.append("password", passwordRef.current?.value || "")

        const result = await userLoginAction(form)

        if(result.success) {
            localStorage.setItem("token",result.token)
            localStorage.setItem("userId",result.userId)
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
            const el = identifierRef.current;
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
            <h2 className="text-xl font-bold mb-4">Fazer login</h2>
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-4">
              <input
                ref={identifierRef}
                type="text"
                placeholder="Email ou usuário"
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 
                           transition-all rounded-lg text-white font-semibold"
              >
                Entrar
              </button>
            </form>
            <div className="flex items-center justify-between">
              <button
                className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline"
                onClick={() => setScreen("cadastro")}
              >
                Criar conta!
              </button>
              {/* <button
                className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline"
                onClick={() => setScreen("esqueceu")}
              >
                Esqueceu a senha?
              </button> */}
            </div>
          </>
     );
}
 
export default UserLogin;