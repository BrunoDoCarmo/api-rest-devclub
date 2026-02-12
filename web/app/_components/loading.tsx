import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface LoadingProps {
  className?: string;
  size?: number;
  label?: string;
  fullScreen?: boolean;
  variant?: "default" | "dark" | "transparent";
}

export const Loading = ({ 
  className, 
  size = 40, 
  label = "Carregando...", 
  fullScreen = false,
  variant = "dark"
}: LoadingProps) => {
  const [dynamicLabel, setDynamicLabel] = useState(label);

  // Efeito para bancos de dados que "dormem" (como o Neon)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDynamicLabel("O servidor está acordando, quase lá...");
    }, 8000); // 8 segundos

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    default: "bg-white/80 backdrop-green-sm",
    dark: "bg-zinc-950/80 backdrop-green-md",
    transparent: "bg-transparent"
  };

  const content = (
    <div 
      className={cn("flex flex-col items-center justify-center gap-4 text-center p-6", className)}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        {/* Glow de fundo para o spinner */}
        <div className="absolute inset-0 blur-xl bg-green-600/20 rounded-full animate-pulse" />
        
        <Loader2 
          size={size} 
          className="animate-spin text-green-500 relative z-10" 
          strokeWidth={2.5}
        />
      </div>

      {dynamicLabel && (
        <div className="space-y-1">
          <p className={cn(
            "text-sm font-semibold tracking-wide animate-pulse",
            variant === "dark" ? "text-zinc-200" : "text-zinc-700"
          )}>
            {dynamicLabel}
          </p>
          <p className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">
            Aguarde um momento
          </p>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={cn(
        "fixed inset-0 z-10 flex items-center justify-center transition-all duration-300",
        variants[variant]
      )}>
        {content}
      </div>
    );
  }

  return content;
};