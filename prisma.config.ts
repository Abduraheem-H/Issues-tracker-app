import { defineConfig } from "prisma/config";
import { config as loadEnv } from "dotenv";

// Load .env from project root
loadEnv({ path: "./.env" });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
