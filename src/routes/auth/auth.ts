import { FastifyPluginAsync } from "fastify";
import { loginSchema } from "../../services/schemas.ts";
const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/login",
    {
      schema: {
        body: loginSchema,
        security: [{ bearerAuth: [] }],
      },
    },
    async (request, reply) => {
      const { usuario } = request.body as typeof loginSchema;
      const token = Buffer.from(JSON.stringify(usuario)).toString("base64");
      return { token };
    }
  );
};
