import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";

const server = fastify({
  maxParamLength: 5000,
});

server.register(require("@fastify/postgres"), {
  connectionString:
    "postgresql://localhost:5432/postgres?user=postgres&password=password",
});
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
