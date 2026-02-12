"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, KeyRound, LogInIcon, LogOut, User } from "lucide-react";

import { Button } from "./ui/button";
import Modal from "./modal";
import { Loading } from "./loading";
import IdleTimer from "./idLeTimer";
interface CustomJwtPayload {
  name?: string;
  sub?: string;
  type?: string
  role?: string;
}

interface NavLinkItem {
  href: string;
  label: string;
  tenantTypePJ?: boolean;
  adminOnly?: boolean;
}

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isPJ, setIsPJ] = useState(false); // Estado para tipo de usuário

  const [userRole, setUserRole] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // 1. Memoize as rotas de autenticação para evitar re-cálculos
  const isAuthPage = useMemo(() => {
    return ["/login", "/verify-email", "/not-found", "/create"].includes(pathname);
  }, [pathname]);

  const logoutAction = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("lastActivity")
    setIsLoggedIn(false);
    setUserName("");
    setIsPJ(false);
    router.push("/login");
  }, [router]);

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else if (response.status === 401) {
        // Token expirado ou inválido
        logoutAction();
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  }, [logoutAction]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const syncAuthState = useCallback(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoggedIn(false);
      setUserName("");
      setIsPJ(false);
      setUserRole(null);
      return;
    }

    setIsLoggedIn(true);
    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        if (decoded.name) setUserName(decoded.name);
        if (decoded.type) {
          setIsPJ(decoded.type === "LEGAL");
        }        
        if (decoded.role) {
          setUserRole(decoded.role);
        }
    } catch (e) {
        console.error("Token malformado", e);
    }

    if (!isAuthPage) {
        fetchUserProfile(token);
    }
  }, [fetchUserProfile, isAuthPage]);

  useEffect(() => {
    if (mounted) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        syncAuthState();
    }
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, [mounted, pathname, syncAuthState]);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    setIsLoggingOut(true);
    
    // Simulação de delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    logoutAction();
    setIsLoggingOut(false);
  };

  if (!mounted || isAuthPage) return null;

  const nav_links = [
    { href: "/dashboard", label: "Dashboard", tenantTypePJ: false, adminOnly: false },
    { href: "/transacoes", label: "Transações", tenantTypePJ: false, adminOnly: false  },
  ] 

  const user_links: NavLinkItem[] = [
    { href: "/profile", label: "Perfil" },
    { href: "/settings", label: "Configurações" },
    { href: "/logs", label: "Histórico", tenantTypePJ: true, adminOnly: true },
    { href: "/companies", label: "Empresas", tenantTypePJ: true, adminOnly: true },
    { href: "/users", label: "Usuários", tenantTypePJ: true, adminOnly: true}  
  ];


  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-800 backdrop-blur-md px-6 py-0">
        <div className="mx-auto flex max-w-9xl items-center justify-between">
          {isLoggedIn ? (
              <div className="flex justify-center items-center flex-col gap-1 mt-1">
                <Image src="/logo-light.svg" alt="Finance AI" width={130} height={30} priority />
                <IdleTimer />
              </div>
            ) : (
              <Link href="/" className="transition-opacity hover:opacity-80">
                <Image src="/logo-light.svg" alt="Finance AI" width={130} height={30} priority />
              </Link>
            )
          }

          <div className="hidden items-center gap-6 md:flex">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-6 pr-6 border-r border-zinc-800">
                {nav_links
                  .filter(link => {
                    const isAllowedRole = !link.adminOnly || userRole?.toUpperCase() === "ADMIN";
                    const isAllowedTenant = !link.tenantTypePJ || isPJ;
                    return isAllowedRole && isAllowedTenant;
                  })
                  .map((link) => (
                    <NavLink key={link.href} href={link.href}>
                      {link.label}
                    </NavLink>
                  ))
                }
                </div>
                <div className="relative">
                  {/* Gatilho do Dropdown */}
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300">
                      {userName?.substring(0, 2).toUpperCase() || <User size={16} />}
                    </div>
                    <span className="capitalize max-w-[120px] truncate">
                      {userName.toUpperCase() || "Usuário"}
                    </span>
                    {/* Ícone de seta opcional */}
                    <ChevronDown size={14} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Menu Suspenso */}
                  {isUserMenuOpen && (
                    <>
                      {/* Overlay invisível para fechar ao clicar fora */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsUserMenuOpen(false)} 
                      />
                      
                      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl z-20">
                        <div className="flex flex-col gap-1">
                          {user_links
                            .filter(link => {
                                const isAllowedRole = !link.adminOnly || userRole === "ADMIN";
                                const isAllowedTenant = !link.tenantTypePJ || isPJ;
                                return isAllowedRole && isAllowedTenant;
                            })
                            .map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                          
                          <div className="my-1 border-t border-zinc-800" />
                          
                          <button
                            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-500/10 rounded-lg transition-colors w-full text-left"
                          >
                            <KeyRound size={14} />
                            Trocar senha
                          </button>
                          <div className="my-1 border-t border-zinc-800" />
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsLogoutModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left"
                          >
                            <LogOut size={14} />
                            Sair
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="group flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2 font-bold text-white transition-all hover:bg-green-500 mt-1 mb-1"
              >
                <LogInIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Entrar
              </Button>
            )}
          </div>
        </div>
      </nav>
      <Modal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)}
        disableClose={isLoggingOut}
      >
        <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <LogOut size={24} />
            </div>
            
            <h3 className="mb-2 text-lg font-bold text-gray-800">Deseja realmente sair?</h3>
            <p className="mb-6 text-sm text-gray-600">
                Você precisará fazer login novamente para acessar suas finanças.
            </p>

            <div className="flex gap-3">
              <Button 
                  variant="outline" 
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 border-zinc-800 text-gray-600 hover:bg-gray-900 hover:text-white"
              >
                  Cancelar
              </Button>
              <Button 
                  onClick={handleLogout} // Chama a função real de logout
                  className="flex-1 bg-red-600 font-bold text-white hover:bg-red-700"
              >
                  Sair agora
              </Button>
            </div>
        </div>
      </Modal>
      {isLoggingOut && (
        <Loading 
          fullScreen 
          label="Saindo da conta..." 
          variant="dark"
          className="bg-black/60 backdrop-blur-md z-10" // Garante que fique acima de tudo
        />
      )}
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors hover:text-white ${
                isActive ? "text-white" : "text-zinc-400"
            }`}
        >
            {children}
        </Link>
    );
}