/*import type { FastifyInstance, FastifySchema } from "fastify";
async function rootRoutes(fastify: FastifyInstance, options: object) {
  fastify.get(
    "/",
    {
      schema: {
        summary: "Ruta Principal",
        description: "descripcion de la ruta principal",
        tags: ["root"],
      } as FastifySchema,
    },
    async (request, reply) => {
      return { hello: "world" };
    }
  );
}
export default rootRoutes;
*/

import Fastify from "fastify";
import pino from 'pino';

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty", // usar pino-pretty
      options: {
        colorize: true,       // colores en consola
        translateTime: "SYS:standard", // mostrar hora legible
        ignore: "pid,hostname" // no mostrar pid/hostname
      }
    }
  }
});

// Ejemplo de endpoint
fastify.get("/", async () => {
  fastify.log.info("Este es un log bonito");
  return { hello: "world" };
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor corriendo en ${address}`);
});
export default {};