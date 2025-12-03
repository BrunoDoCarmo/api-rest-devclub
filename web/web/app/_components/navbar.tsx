"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleUserRound, Menu, X } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";
import LogoutButton from "./logout-button";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);

  const [ userName, setUserName ] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("username");
    }
    return null
  })
  

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const toggleSubmenu = useCallback((label: string) => {
    setSubmenuOpen((prev) => (prev === label ? null : label));
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setSubmenuOpen(null);
  }, []);

  /** Memoriza os links para não recriar a cada render */
  // Tipos seguros para os links
  type NavLink =
    | { href: string; label: string }
    | { label: string; submenu: { href: string; label: string }[] };

  const links: NavLink[] = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },

    {
      label: "Cadastro",
      submenu: [
        { href: "/register=client", label: "Cliente" },
        { href: "/register=product", label: "Produto" },
        { href: "/register=supplier", label: "Fornecedor" },
      ],
    },

    { href: "/financial", label: "Financeiro" },
  ];


  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-400 bg-background px-6 py-4 dark:border-white/10">
      <div className="flex items-center gap-3">
        <h2>Logo</h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 transition-colors hover:bg-muted"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/65 transition-opacity duration-300",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeMenu}
      />

      {/* MENU MOBILE */}
      <div
        className={clsx(
          "fixed right-0 top-0 z-50 h-full w-full border-l border-gray-400 bg-background px-1 shadow-xl transition-transform duration-300 dark:border-white/10 lg:w-1/2 lg:max-w-[300px]",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <strong className="text-lg font-semibold">Menu</strong>
          <Button onClick={closeMenu}>
            <X size={24} />
          </Button>
        </div>

        <div className="flex flex-col divide-y divide-gray-300 overflow-hidden border border-gray-300 dark:divide-white/15 dark:border-white/15">
          {links.map((link) => {
            if ("submenu" in link) {
              const isOpen = submenuOpen === link.label;
              return (
                <div key={link.label} className="w-full">
                  <button
                    onClick={() => toggleSubmenu(link.label)}
                    className={clsx(
                      "flex w-full items-center justify-between px-6 py-2 text-sm transition-colors",
                      pathname === link.label
                        ? "bg-primary/20 font-bold text-primary dark:bg-primary/25"
                        : "hover:bg-gray-200 hover:text-primary dark:hover:bg-muted/40",
                    )}
                  >
                    {link.label}
                    <span
                      className={clsx(
                        "transition-transform",
                        isOpen ? "rotate-90" : "rotate-0",
                      )}
                    >
                      <ChevronRight size={16} />
                    </span>
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-40" : "max-h-0",
                    )}
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeMenu}
                        className={clsx(
                          "flex w-full items-center justify-between px-6 py-2 text-sm transition-colors",
                          pathname === sub.href
                            ? "bg-primary/20 font-bold text-primary dark:bg-primary/25"
                            : "hover:bg-gray-200 hover:text-primary dark:hover:bg-muted/40",
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={clsx(
                  "w-full px-6 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-primary/20 font-bold text-primary dark:bg-primary/25"
                    : "hover:bg-gray-200 hover:text-primary dark:hover:bg-muted/40",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-gray-400 bg-background px-2 py-2 dark:border-white/15">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <CircleUserRound />
              <span className="text-sm">{userName ?? "Usuário"}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <LogoutButton/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;