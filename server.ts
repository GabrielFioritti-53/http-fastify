import Fastify from "fastify";
import rootRoutes from "./src/routes/root-modules.ts";
import exampleRoutes from "./src/routes/example-routes.ts";
import swagger from "./src/plugins/swagger.ts";
import usuariosRoutes from "./src/services/service.ts";
const fastify = Fastify({
  logger: true,
});

fastify.register(swagger);
fastify.register(rootRoutes);
fastify.register(exampleRoutes);
fastify.register(usuariosRoutes);

try {
  await fastify.listen({ host: "::", port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
