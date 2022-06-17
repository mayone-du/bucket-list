import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const prisma = new PrismaClient();

  return { req, res, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
