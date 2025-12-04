"use client";

import { useEffect, useState } from "react";
import { userListarUsuarioAction } from "@/app/actions/user/listar-usuario";

import { USER_STATE } from "../../_constants/user"
import { ListFilter, LogIn, PenIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface UserPageProps {
  id: string;
  name: string;
  email: string;
  username: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<UserPageProps[]>([]);

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
        <div className="space-y-3">
          {users.length > 0 ? (
            <table className="w-full border-collapse overflow-hidden shadow">
              <thead className="bg-gray-300 border-b">
                <tr className="text-center">
                  <th className="border border-black p-3 font-semibold">Nome</th>
                  <th className="border border-black p-3 font-semibold">Email</th>
                  <th className="border border-black p-3 font-semibold">Usuário</th>
                  <th className="border border-black p-3 font-semibold">Status</th>
                  <th className="border border-black p-3 font-semibold">Ações</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border border-red-400">
                    <td className="p-3 border border-black">{user.name}</td>
                    <td className="p-3 border border-black">{user.email}</td>
                    <td className="p-3 text-center border border-black">{user.username}</td>
                    <td className="p-3 text-center border border-black">{USER_STATE[user.state as keyof typeof USER_STATE]}</td>
                    <td className="border border-black w-2 px-2">
                      <div className="flex gap-2 items-center justify-evenly">
                      <Button variant="default"  size="icon"  className="bg-green-500 hover:bg-green-700">
                        <PenIcon size={16}/>
                      </Button>
                      <Button variant="default"  size="icon"  className="bg-red-500 hover:bg-red-700">
                        <TrashIcon size={16}/>
                      </Button>
                      <Button variant="default"  size="icon"  className="bg-blue-500 hover:bg-blue-700">
                        <LogIn size={16}/>
                      </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
  );
};

export default UserPage;
