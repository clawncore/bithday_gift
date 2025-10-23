import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Prisma client
const prisma = new PrismaClient();

export { prisma };