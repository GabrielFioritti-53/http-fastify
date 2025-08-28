import type { FastifyInstance, FastifySchema } from "fastify";
async function exampleRoutes(fastify: FastifyInstance, options: object) {
  fastify.get(
    "/example",
    {
      schema: {
        summary: "Summary de example",
        description: "Descripcion de example",
        tags: ["examples"],
      } as FastifySchema,
    },
    async function handler(request, reply) {
      return { example: true };
    }
  );
}

export default exampleRoutes;
