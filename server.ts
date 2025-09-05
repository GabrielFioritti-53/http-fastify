import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import swagger from "./src/plugins/swagger.ts";
import usuariosRoutes from "./src/routes/usuarios/usuarios-routes.ts";

const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || "trace",
  transport: {  
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
};

const fastify = Fastify({
  logger: loggerOptions,
}).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(swagger);
await fastify.register(usuariosRoutes);

try {
  await fastify.listen({ host: "::", port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
