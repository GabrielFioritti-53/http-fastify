import type { FastifyInstance, FastifySchema } from "fastify";
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
