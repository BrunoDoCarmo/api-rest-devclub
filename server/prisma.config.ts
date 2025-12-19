import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: env("DATABASE_URL"),
  },
});
