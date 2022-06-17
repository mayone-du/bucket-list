import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const user = { name: req.headers.username ?? "anonymous" };

  return { req, res, user, foo: "foo" };
};

export type Context = inferAsyncReturnType<typeof createContext>;
