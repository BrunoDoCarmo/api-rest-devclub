import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export function prismaTenant(tenant: any) {

  // 🟦 1) Porte PEQUENA → single schema + tenantId
  if (tenant.porte === "pequena") {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    });

    // tudo no schema public mas filtrado pelo tenantId
    return new PrismaClient({ adapter }).$extends({
      query: {
        user: {
          async findMany({ args, query }) {
            args.where = { ...args.where, tenantId: tenant.id };
            return query(args);
          },
          async findFirst({ args, query }) {
            args.where = { ...args.where, tenantId: tenant.id };
            return query(args);
          },
          async create({ args, query }) {
            args.data = { ...args.data, tenantId: tenant.id };
            return query(args);
          }
        }
      }
    });
  }

  // 🟧 2) Porte MÉDIA → schema separado no mesmo banco
  if (tenant.porte === "media") {]
    const adapter = new PrismaPg({
      connectionString: `${process.env.DATABASE_URL!}?schema=tenant_${tenant.id}`,
    });

    return new PrismaClient({ adapter });
  }

  // 🟥 3) Porte GRANDE → banco totalmente separado
  if (tenant.porte === "grande") {
    const adapter = new PrismaPg({
      connectionString: process.env[`DATABASE_URL_TENANT_${tenant.id}`]!,
    });

    return new PrismaClient({ adapter });
  }

  throw new Error("Porte de tenant inválido");
}