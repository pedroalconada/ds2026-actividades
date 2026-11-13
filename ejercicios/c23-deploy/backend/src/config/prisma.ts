import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function getConnectionString(): string {
  let url = process.env.DATABASE_URL || "";
  url = url.replace(/\$\{([^}]+)\}/g, (_, key) => process.env[key] || "");
  if (!process.env.DOCKER && url.includes("@db:")) {
    url = url.replace("@db:", "@localhost:");
  }
  return url;
}

const adapter = new PrismaPg({ connectionString: getConnectionString() });

export const prisma = new PrismaClient({ 
    adapter,
    omit: {
        usuario: {
            passwordHash: true,
        }
    }
 });