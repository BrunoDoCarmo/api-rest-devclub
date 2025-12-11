"use client";

import { useEffect, useState } from "react";
import { userListarUsuarioAction } from "@/app/actions/user/listar-usuario";
import { userColumns } from "./_columns";

import { ListFilter, PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DataTable } from "@/app/_components/ui/data-table";

import type { SerializedUser } from "./_columns/types";

const UserPage = () => {
  const [users, setUsers] = useState<SerializedUser[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await userListarUsuarioAction(token);

      if (result.success) {
        setUsers(result.users);
      } else {
        alert(result.message);
      }
    }

    fetchUsers();
  }, []);

  // 🔥 Escuta evento de usuário deletado
  useEffect(() => {
    const handleUserDeleted = (e: CustomEvent) => {
      setUsers(prev => prev.filter(u => u.id !== e.detail));
    };

    window.addEventListener("userDeleted", handleUserDeleted as EventListener);

    return () => window.removeEventListener("userDeleted", handleUserDeleted as EventListener);
  }, []);

  return (
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Lista de Usuários</h1>
          <div className="flex gap-2">
            <Button
              className="bg-muted-foreground hover:bg-muted-foreground"
            >
              <ListFilter />
              Filtros
            </Button>
            <Button>
              <PlusIcon />
              Novo Cadastro
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-205px)] w-full rounded-md border-none">
          <div className="w-full overflow-x-auto">
            <div className="w-[calc(100vw-50px)]">
              <DataTable
                columns={userColumns}
                data={users}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
  );
};

export default UserPage;
