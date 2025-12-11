"use client";

import { Button } from "../../_components/ui/button";
import { ListFilter, PlusIcon } from "lucide-react";

const SupplierPage = () => {
  return (
    <>
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Fornecedor</h1>
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
      </div>
    </>
  );
};

export default SupplierPage;