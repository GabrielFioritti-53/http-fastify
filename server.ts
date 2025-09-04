import Fastify from "fastify"
import swagger from "./src/plugins/swagger.ts";
import usuariosRoutes from "./src/services/service.ts";

const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || 'trace',
  transport: {
    target: 'pino-pretty', 
    options: {
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    }
  }
}

const fastify = Fastify({
  logger: loggerOptions
}).withTypeProvider<TypeBoxTypeProvider>();


await fastify.register(swagger); 
fastify.register(usuariosRoutes);

try {
  await fastify.listen({ host: "::", port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
