import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Mail, User, CircleX } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface UserData{
    email: string;
    name: string;
}

interface CustomJwtPayload {
  sub: string;       // ID do usuário (Responsible)
  tenantId: string;  // ID da empresa
}

interface UserCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: UserData;
    onChange: (data: UserData) => void;
}

const UserCreateModal = ({ isOpen, onClose, data, onChange }: UserCreateModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getCookie("token");
      // Se o cookie 'tenantId' não existe, vamos extrair do próprio objeto data ou de onde você armazena
      const decoded = jwtDecode<CustomJwtPayload>(token as string);
      const tenantId = decoded.tenantId 
      const responsibleId = decoded.sub

      const response = await fetch("http://localhost:9090/api/private/user-create", {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private/user-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          tenantId: tenantId, // Certifique-se que o nome do cookie é exatamente 'tenantId'
          responsibleId: responsibleId 
        }),
      });

      // IMPORTANTE: Checar se é JSON antes de dar parse
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`O servidor retornou um formato inesperado (Status: ${response.status}). Verifique se a API está rodando em ${process.env.NEXT_PUBLIC_API_URL}`);
      }

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || "Erro ao criar usuário");
      alert("Usuário criado com sucesso!");
      onClose(); // Fecha o modal
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Erro na requisição:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Loading 
          fullScreen 
          label="Cadastrando membro..." 
          className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
        />
      )}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-1 bg-green-500 rounded-full" />
              <DialogTitle className="text-xl font-black uppercase tracking-tight">
                Adicionar Membro
              </DialogTitle>
            </div>
            <DialogDescription className="text-zinc-500 font-medium">
              O usuário receberá um e-mail para validar o acesso a plataforma.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in">
              <CircleX size={14} />
              {error}
            </div>
          )}

          <div className="space-y-2 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-green-600 font-bold flex items-center gap-2">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input 
                  id="email"
                  type="email"
                  className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 lowercase"
                  placeholder="seu@email.com" 
                  value={data.email.toLowerCase()} 
                  onChange={(e) => onChange({ ...data, email: e.target.value })} 
                />
              </div>
            </div>
            {/* NOME DE EXIBIÇÃO */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="displayName" className="text-green-600 font-bold flex items-center gap-2">
                Nome de Exibição
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <Input 
                  id="displayName"
                  className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 uppercase"
                  placeholder="Como quer ser chamado?" 
                  value={data.name.toUpperCase()} 
                  onChange={(e) => onChange({ ...data, name: e.target.value })} 
                />
              </div>
            </div>
            {/* Botões de Ação */}
            <div className="flex w-full justify-center gap-3 mt-4">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 font-black h-11 transition-all active:scale-[0.98]"
                onClick={handleConfirm} // Alterado aqui
                disabled={isLoading} 
                >
                Confirmar
              </Button>
              <Button 
                onClick={onClose} 
                disabled={isLoading} 
                className="w-full bg-red-500 hover:bg-red-700 font-black h-11 transition-all active:scale-[0.98]"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UserCreateModal;