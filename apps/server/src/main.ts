import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";

const server = fastify({
  maxParamLength: 5000,
});

(async () => {
  try {
    await server.register(require("@fastify/postgres"), {
      connectionString:
        "postgresql://localhost:5432/develop?user=postgres&password=password",
    });
    await server.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: { router: appRouter, createContext },
    });
    await server.register(require("@fastify/cors"), {});
    await server.listen({ port: 3001 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
