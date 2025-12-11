"use client"

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";

const FormClient = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div>
          <div className="mt-2 sm:mt-1">
            <FormField
              control={form.control} // ✅ OBRIGATÓRIO
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome..."
                      {...field}
                      className="uppercase placeholder:uppercase"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="button"
            variant="outline"
            className="border-gray-400 dark:border-white/10"
          >
            Cancelar
          </Button>

          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormClient;
