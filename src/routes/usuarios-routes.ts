import type { FastifyInstance, FastifySchema } from "fastify";

type Usuario = {
  id_usuario: number;
  nombre: string;
  isAdmin: boolean;
};

const usuarios: Usuario[] = [
  { id_usuario: 1, nombre: "Jorge", isAdmin: true },
  { id_usuario: 2, nombre: "Alberto", isAdmin: false },
  { id_usuario: 3, nombre: "Juan", isAdmin: false },
];

async function usuariosRoutes(fastify: FastifyInstance, options: object) {
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener todos los usuarios",
        description: "Retorna la lista de usuarios",
        tags: ["listaUsuarios"],
        querystring: {
          type: "object",
          properties: {
            nombre: { type: "string", minLength: 2 },
          },
          required: [],
        },
      },
    },
    async function handler(request, reply) {
      const query = request.query as { nombre: string };
      if (query.nombre) return usuarios.filter((u) => u.nombre == query.nombre);
      return usuarios;
    }
  );
}

export default usuariosRoutes;
