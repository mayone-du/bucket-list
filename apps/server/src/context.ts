import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { clerkPreHandler } from "./auth";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  // return withAuth((req, res) => {

  // });
  const prisma = new PrismaClient();

  return { req, res, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
