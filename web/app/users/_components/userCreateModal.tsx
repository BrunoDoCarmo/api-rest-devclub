import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Mail, User, CircleX, CheckCircle2 } from "lucide-react";
import { Loading } from "@/app/_components/loading";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface UserData {
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
  onCreated?: () => void;
}

const UserCreateModal = ({ isOpen, onClose, data, onChange, onCreated }: UserCreateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getCookie("token") as string;

      if (!token) {
        throw new Error("Sessão expirada. Por favor, faça login novamente");
      }

      const decoded = jwtDecode<CustomJwtPayload>(token);
      const { tenantId, sub: responsibleId } = decoded;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private/user-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: data.email.toLowerCase().trim(),
          name: data.name.toUpperCase().trim(),
          tenantId,
          responsibleId
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("O servidor retornou um formato inválido.");
      }

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || "Erro ao criar usuário");

      setIsSuccess(true);
      onCreated?.();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para limpar estados ao fechar
  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl overflow-hidden">
        {isLoading && (
          <Loading 
            fullScreen 
            label="Cadastrando membro..." 
            className="bg-black/60 backdrop-blur-md z-[\100]\" 
          />
        )}

        {isSuccess ? (
          /* TELA DE SUCESSO */
          <div className="py-8 flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-black text-zinc-800 uppercase tracking-tight">Sucesso!</h2>
            <p className="text-zinc-500 mt-2 mb-8">
              O convite foi enviado para <br/>
              <span className="font-bold text-zinc-700">{data.email.toLowerCase()}</span>
            </p>
            <Button 
              onClick={handleClose}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold h-12 rounded-xl transition-all"
            >
              Continuar
            </Button>
          </div>
        ) : (
          /* FORMULÁRIO OU TELA DE ERRO */
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-green-500 rounded-full" />
                <DialogTitle className="text-xl font-black uppercase tracking-tight">
                  Adicionar Membro
                </DialogTitle>
              </div>
              <DialogDescription className="text-zinc-500 font-medium text-left">
                O usuário receberá um e-mail para validar o acesso à plataforma.
              </DialogDescription>
            </DialogHeader>

            {error ? (
              /* TELA DE ERRO (Dentro do fluxo do Modal) */
              <div className="py-4 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <CircleX size={32} />
                </div>
                <h3 className="font-bold text-red-600 uppercase">Ops! Algo deu errado</h3>
                <p className="text-zinc-500 text-sm mt-1 mb-6">{error}</p>
                <Button 
                  onClick={() => setError(null)}
                  variant="outline"
                  className="w-full border-zinc-200 font-bold h-11 rounded-xl"
                >
                  Tentar Novamente
                </Button>
              </div>
            ) : (
              /* CAMPOS DO FORMULÁRIO */
              <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex flex-col gap-2 text-left">
                  <Label htmlFor="email" className="text-green-600 font-bold ml-1">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                      id="email"
                      type="email"
                      className="pl-10 h-12 bg-zinc-50/50 rounded-xl border-zinc-200 focus-visible:ring-green-500/20 lowercase"
                      placeholder="exemplo@email.com" 
                      value={data.email} 
                      onChange={(e) => onChange({ ...data, email: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <Label htmlFor="displayName" className="text-green-600 font-bold ml-1">
                    Nome de Exibição
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <Input 
                      id="displayName"
                      className="pl-10 h-12 bg-zinc-50/50 rounded-xl border-zinc-200 focus-visible:ring-green-500/20 uppercase"
                      placeholder="NOME DO MEMBRO" 
                      value={data.name} 
                      onChange={(e) => onChange({ ...data, name: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="flex w-full gap-3 mt-6">
                  <Button 
                    variant="ghost"
                    onClick={handleClose} 
                    disabled={isLoading} 
                    className="w-full font-bold h-11 text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 font-black h-11 transition-all active:scale-95 shadow-lg shadow-green-500/20"
                    onClick={handleConfirm}
                    disabled={isLoading || !data.email || !data.name} 
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserCreateModal;