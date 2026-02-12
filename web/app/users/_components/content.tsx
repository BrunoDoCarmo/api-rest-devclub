"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { 
  Filter, 
  MoreHorizontal, 
  Search, 
  ShieldCheck, 
  User, 
  UserCog, 
  UserPlus,
} from "lucide-react";

// Componentes shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Loading } from "../../_components/loading";
import { CustomPagination } from "../../_components/paginacao";
import Modal from "../../_components/modal";
import UserCreateModal from "./userCreateModal";


interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  password: string;
  state: string;
  emailVerified: boolean;
}

interface UserData{
    email: string;
    name: string;
    username: string;
    password: string;
}

const UserContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  // ADICIONE ESTE ESTADO AQUI:
  const [formData, setFormData] = useState<UserData>({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const [totalItems, setTotalItems] = useState(0); // Total de registros no banco
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const usersPerPage = 25;

  const totalPages = Math.ceil(totalItems / usersPerPage);  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/private/user-list?page=${currentPage}&limit=${usersPerPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Falha ao carregar usuários");

        const result = await response.json();
        setUsers(result.data);
        setTotalItems(result.meta.total);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Não foi possível carregar a lista de usuários.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  if (loading) return <Loading fullScreen label="Carregando usuários..." />;
  
  const tableHeader = [
    { title: "", width: "5%" },
    { title: "Nome", width: "25%" },
    { title: "Tipo", width: "10%" },
    { title: "Perfil do Usuário", width: "15%" },
    { title: "Usuário", width: "15%" },
    { title: "Status de Acesso", width: "10%" },
    { title: "Status de Verificação", width: "10%" },
    { title: "Gerenciar", width: "10%" },
  ]
  
  return (
    <div className="w-full mx-auto p-6 space-y-6 antialiased">
      
      {/* Header & Actions */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-green-500 rounded-full" />
            <h1 className="text-3xl font-black tracking-tight uppercase">Membros</h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium ml-3">
            {users.length} usuários registrados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Buscar membro..." 
              className="pl-10 w-64 border-zinc-800 focus-visible:ring-green-500/20 focus-visible:border-green-500"
            />
          </div>
          
          <Button variant="outline" size="icon" className="border-zinc-800 bg-transparent hover:bg-zinc-900">
            <Filter size={20} className="text-zinc-400" />
          </Button>

          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-white text-black border border-black hover:border-green-500 hover:bg-green-500 hover:text-white font-bold px-6 transition-colors duration-400">
            <UserPlus size={18} className="mr-2" />
            Novo Membro
          </Button>
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-2xl">
          <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900/20">
              <TableRow className="hover:bg-transparent border-zinc-800/50">
                {tableHeader.map((header, index) => (
                  <TableHead 
                    key={index} 
                    className="px-8 py-5 text-[11px] font-black uppercase text-black"
                    style={{ width: header.width }}
                  >
                    {header.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="group transition-all">
                  <TableCell className="px-8 py-4">
                    <div className="py-1 flex items-center justify-center gap-4">
                      <Avatar className="h-12 w-12 rounded-2xl border border-zinc-700/50 ">
                        <AvatarFallback className="bg-linear-to-br from-zinc-800 to-black rounded-2xl text-white font-black">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                        {/* {user.state === "ACTIVE" && (
                          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-zinc-950 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                          </span>
                        )} */}
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-700 font-medium">
                          {user.name.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <Badge 
                      variant="outline" 
                      className={`uppercase tracking-widest text-[10px] font-black px-3 py-1 rounded-lg transition-all ${
                        // Verificação direta: se for true, aplica verde. Se for false, aplica cinza.
                        user.role === "ADMIN"
                        ? "bg-blue-500 border-blue-500/20 text-white" 
                        : "bg-orange-800/30 border-orange-700/50 text-orange-500"
                      }`}
                    >
                      {user.role === "ADMIN" ? "Administrador" : "Usuário Comum"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-700 font-medium">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-700 font-medium">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <Badge 
                      variant="outline" 
                      className={`uppercase tracking-widest text-[10px] font-black px-3 py-1 rounded-lg transition-all ${
                        user.state === "ACTIVE" 
                        ? "bg-green-500 border-green-500/20 text-white" 
                        : "bg-red-800/30 border-red-700/50 text-white"
                      }`}
                    >
                      {user.state === "ACTIVE" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-4">
                    <Badge 
                      variant="outline" 
                      className={`uppercase tracking-widest text-[10px] font-black px-3 py-1 rounded-lg transition-all ${
                        // Verificação direta: se for true, aplica verde. Se for false, aplica cinza.
                        user.emailVerified === true
                        ? "bg-green-500 border-green-500/20 text-white" 
                        : "bg-zinc-800/30 border-zinc-700/50 text-zinc-500"
                      }`}
                    >
                      {user.emailVerified === true ? "Verificado" : "Pendente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-4 text-right">
                    <div className="flex justify-center items-center gap-1 ">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-green-500">
                        <UserCog size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:bg-orange-400 hover:text-white">
                        <MoreHorizontal size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="fixed bottom-2 w-full h-auto left-0 right-0">
            {totalPages > 1 && (
              <CustomPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </div>
          {users.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full" />
                <div className="relative h-20 w-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center">
                  <ShieldCheck className="text-zinc-700" size={40} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-200">A lista está vazia</h3>
              <p className="text-muted-foreground text-sm mt-2 font-medium">
                Não encontramos usuários cadastrados para este tenant.
              </p>
            </div>
          )}
        </div>
      )}
      
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <UserCreateModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          data={formData} 
          onChange={setFormData} 
        />
      </Modal>
    </div>
  );
};

export default UserContent;
