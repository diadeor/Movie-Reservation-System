import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

// 1. Create the native pool
const pool = new Pool({ connectionString });

// 2. Create the adapter
const adapter = new PrismaPg(pool);

// 3. Pass adapter to Prisma
const prisma = new PrismaClient({ adapter });

export default prisma;
