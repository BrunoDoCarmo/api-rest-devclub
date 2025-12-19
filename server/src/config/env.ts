import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

console.log("ENV carregado:", NODE_ENV);

export const env = {
  NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: Number(process.env.PORT) || 3333,
};
