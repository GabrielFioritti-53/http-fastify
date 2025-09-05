import { FastifyPluginAsync } from "fastify";
import { loginSchema } from "../../services/schemas.ts";
import { ErrorAutenticacion } from "../../util/errorManager.ts";
const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Logger",
        description: "Loggear suario",
        tags: ["Logger"],
        body: loginSchema,
        response: {
          200: fastify.log.info("Usuario logueado con exito"),
          401: ErrorAutenticacion
          },
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { usuario } = request.body as typeof loginSchema; //Si da error intentamos con any en vez de loginSchema
      const token = Buffer.from(JSON.stringify(usuario)).toString("base64");
      return { token };
    }
  );
};
