import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Loading } from "./loading";

// Defina o que o componente espera receber
interface EsqueceuModalProps {
  onClose: () => void;
}

// Use a interface na declaração do componente
const EsqueceuModal = ({ onClose }: EsqueceuModalProps) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState("")

  const handleConfirmar = async () => {
    if (!email) {
      setError("Por favor, digite seu email.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:9090/api/public/esqueceuSenha", {
       method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Não foi possível processar sua solicitação.")
      }

      setIsSent(true)
      setTimeout(onClose, 3000)
    } catch {
      setError("Erro ao conectar com o servidor, Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {isLoading && (
        <Loading 
          fullScreen 
          label="Enviando link..." 
          className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
        />
      )}
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-black">Recuperar Senha</h2>
        {!isSent ? (
          <>
            <p className="text-sm text-zinc-600 mb-2">
              Digite seu e-mail para enviarmos as instruções.
            </p>
            <input 
              type="email" 
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full border border-green-500 p-3 rounded-xl outline-none focus:border-green-600 transition" 
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
            <div className="flex gap-3 mt-2">
              <button 
                onClick={onClose} 
                disabled={isLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-2xl font-bold text-white mt-4"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmar}
                disabled={isLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-white mt-4"
              >
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center space-y-3 animate-in fade-in zoom-in">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="text-sm text-zinc-700 font-medium">
              Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes!
            </p>
          </div>
        )}            
      </div>
    </>
  );
};

export default EsqueceuModal;