import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

console.log("ENV carregado:", NODE_ENV);

export const env = {
  NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  PORT: Number(process.env.PORT) || 3333,
  APP_URL: process.env.APP_URL,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
};
