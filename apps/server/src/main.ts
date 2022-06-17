import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

// FIXME
// @ts-ignore
BigInt.prototype.toJSON = () => this.toString();

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  server.decorate("prisma", prisma);
  server.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });

  await server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });
});

// export type Context = inferAsyncReturnType<typeof createContext>;

const server = fastify({
  maxParamLength: 5000,
});

(async () => {
  try {
    // await server.register(require("@fastify/postgres"), {
    //   connectionString: "postgresql://user:password@localhost:5432",
    // });
    // await server.register(fastifyTRPCPlugin, {
    //   prefix: "/trpc",
    //   trpcOptions: { router: appRouter, createContext },
    // });
    await server.register(require("@fastify/cors"));
    await server.register(prismaPlugin);
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
