"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { LogIn, Pencil, TrashIcon } from "lucide-react";
import {
  USER_STATE
} from "@/app/_constants/user";
// import EditTransactionButton from "../_components/edit-transaction-button";
// import { deleteTransaction } from "@/app/_actions/upsert-transaction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import type { SerializedUser } from "./types";
import { Badge } from "@/app/_components/ui/badge";
import { userDeletarUsuarioAction } from "@/app/actions/user/deletar";
import { useState } from "react";

export const userColumns: ColumnDef<SerializedUser>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Usuário",
  },
  {
    accessorKey: "state",
    header: "Status",
    cell: ({ row: { original: user } }) =>
      USER_STATE[user.state],
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: user } }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [loading, setLoading] = useState(false);
        const handleDelete = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            setLoading(true);

            try {
                const response = await userDeletarUsuarioAction(user.id, token);

                if (!response.success) {
                    console.error("Erro ao deletar usuário:", response.message);
                    return;
                }

                console.log("Usuário deletado com sucesso:", user.name);

                // Atualiza a tabela removendo o usuário
                window.dispatchEvent(
                    new CustomEvent("userDeleted", { detail: user.id })
                );

            } catch (error) {
                console.error("Erro inesperado ao deletar usuário:", error);
            } finally {
                setLoading(false);
            }
        };
      return (
        <div className="flex flex-row justify-center space-x-1">
      {/* EDIÇÃO */}
      <Badge className="cursor-pointer bg-muted bg-opacity-10 font-bold text-primary hover:border-primary hover:bg-primary">
        {/* <EditUserButton /> */}
        <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white bg-primary hover:bg-primary"
        >
            <Pencil/>
        </Button>
      </Badge>
      {/* EXCLUSÃO */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Badge className="cursor-pointer bg-red-500 bg-opacity-10 font-bold text-red-500 hover:border-red-500 hover:bg-red-500">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white bg-red-500 hover:bg-red-500"
              disabled={loading} // 🔥 desabilita enquanto carrega
            >
              <TrashIcon />
            </Button>
          </Badge>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja realmente excluir este usuário?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita. O usuário será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-400 dark:border-white/10">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={loading} // 🔥 desabilita enquanto carrega
            >
              {loading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Badge className="cursor-pointer bg-blue-500 bg-opacity-10 font-bold text-blue-500 hover:border-blue-500 hover:bg-blue-500">
        <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white bg-blue-500 hover:bg-blue-500"
        >
            <LogIn/>
        </Button>
      </Badge>
    </div>
      );
    },
  },
];