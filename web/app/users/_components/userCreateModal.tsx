import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { AtSign, Mail, User, Lock, EyeOff, Eye, CheckCircle2, CircleX } from "lucide-react";
import { cn } from "../../_lib/utils";

interface UserData{
    email: string;
    name: string;
    username: string;
    password: string;
}

interface UserCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: UserData;
    onChange: (data: UserData) => void;
}

const UserCreateModal = ({ isOpen, onClose, data, onChange }: UserCreateModalProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const requirements = [
        { label: "Mínimo de 8 caracteres", test: data.password.length >= 8 },
        { label: "Letra maiúscula", test: /[A-Z]/.test(data.password) },
        { label: "Letra minúscula", test: /[a-z]/.test(data.password) },
        { label: "Número (0-9)", test: /[0-9]/.test(data.password) },
        { label: "Símbolo (!@#$%^&*)", test: /[^A-Za-z0-9]/.test(data.password) },
        { 
        label: data.password === confirmPassword && confirmPassword !== "" ? "As senhas coincidem" : "As senhas não coincidem", 
        test: data.password === confirmPassword && confirmPassword !== "" 
        },
    ];

    // Cálculo de força da senha (0 a 100)
    const calculateStrength = () => {
        const passed = requirements.filter(r => r.label !== "As senhas coincidem" && r.test).length;
        return (passed / 5) * 100;
    };

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[425px] rounded-3xl">
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

          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500 text-left">
            <div className="grid grid-cols-2 gap-4">
              {/* EMAIL */}
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="email" className="text-green-600 font-bold flex items-center gap-2">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="email"
                    type="email"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20"
                    placeholder="seu@email.com" 
                    value={data.email} 
                    onChange={(e) => onChange({ ...data, email: e.target.value })} 
                  />
                </div>
              </div>
              
              {/* NOME DE EXIBIÇÃO */}
              <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <Label htmlFor="displayName" className="text-green-600 font-bold flex items-center gap-2">
                  Nome de Exibição
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="displayName"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20"
                    placeholder="Como quer ser chamado?" 
                    value={data.name} 
                    onChange={(e) => onChange({ ...data, name: e.target.value })} 
                  />
                </div>
              </div>

              {/* USERNAME */}
              <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <Label htmlFor="username" className="text-green-600 font-bold flex items-center gap-2">
                  Usuário
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="username"
                    className="pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20"
                    placeholder="ex: joao.silva" 
                    value={data.username} 
                    onChange={(e) => onChange({ ...data, username: e.target.value })} 
                  />
                </div>
              </div>

              {/* SENHA */}
              <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <Label htmlFor="password" className="text-green-600 font-bold flex items-center gap-2">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    className="pl-10 pr-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20"
                    placeholder="••••••••" 
                    value={data.password} 
                    onChange={(e) => onChange({ ...data, password: e.target.value })} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRMAR SENHA */}
              <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <Label htmlFor="confirmPassword" className="text-green-600 font-bold flex items-center gap-2">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} 
                    className={cn(
                      "pl-10 h-12 bg-white rounded-xl border-zinc-200 focus-visible:ring-blue-500/20 transition-colors",
                      confirmPassword && (data.password === confirmPassword ? "border-emerald-500" : "border-red-500")
                    )}
                    placeholder="••••••••" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                <div className="bg-zinc-50 p-4 space-y-4 rounded-xl border border-zinc-100 shadow-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                                Força da Senha
                            </span>
                            <span className={cn(
                                "text-[10px] font-bold uppercase",
                                calculateStrength() < 40 ? "text-red-500" : 
                                calculateStrength() < 80 ? "text-amber-500" :
                                calculateStrength() < 100 ? "text-emerald-500" : "text-green-700"
                            )}>
                                {calculateStrength() < 40 ? "Fraca" : 
                                calculateStrength() < 80 ? "Média" :
                                calculateStrength() < 100 ? "Forte" : "Excelente"}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                            <div 
                                className={cn(
                                "h-full transition-all duration-500 ease-out",
                                calculateStrength() < 40 ? "bg-red-500" : 
                                calculateStrength() < 80 ? "bg-amber-500" : 
                                calculateStrength() < 100 ? "bg-emerald-500" : "bg-green-700"
                                )}
                                style={{ width: `${calculateStrength()}%` }}
                            />
                        </div>
                    </div>
                    {requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 group">
                            {req.test ? (
                                <CheckCircle2 size={14} className="text-emerald-500 transition-transform group-hover:scale-110" />
                            ) : (
                                <CircleX size={14} className="text-red-300" />
                            )}
                            <span className={cn(
                                "text-[11px] transition-colors",
                                req.test ? "text-emerald-700 font-medium" : "text-red-400"
                            )}>
                                {req.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Botões de Ação */}
            <div className="flex flex-col gap-3 mt-4">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-black font-black h-11 transition-all active:scale-[0.98]"
                onClick={onClose} 
              >
                ENVIAR CONVITE AGORA
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose} 
                className="text-zinc-500 hover:text-white hover:bg-zinc-900 font-bold"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};
export default UserCreateModal;