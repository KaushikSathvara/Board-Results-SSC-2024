import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// update global type

prisma = new PrismaClient();

export default prisma;
