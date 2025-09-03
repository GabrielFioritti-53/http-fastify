import {
  FastifyPluginAsyncTypebox,
  Static,
  Type,
} from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifySchema } from "fastify";
import errorSchema from "../model/sharedmodel";
import { Usuario } from "../model/usuariosmodel";
import { usuarios } from "../routes/usuarios/usuarios-routes";

const usuariosRoutes: FastifyPluginAsyncTypebox = async function (fastify) {
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener todos los usuarios",
        description: "Retorna la lista de usuarios",
        tags: ["listaUsuarios"],
        params: Type.Pick(Usuario, ["id_usuario"]),
        response: {
          200: Usuario,
          404: errorSchema,
        },
      },
    },
    async function handler(request, reply) {
      const query = request.query as { nombre: string };
      if (query.nombre) return usuarios.filter((u) => u.nombre == query.nombre);
      return usuarios;
    }
  );

  fastify.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuario",
        descrption: "Estas ruta permite crear un nuevo usuario. ",
        tags: ["usuarios"],
        querystring: Type.Object({
          nobre: Type.Optional(Type.String({ minLength: 2 })),
        }),
        response: { 201: Type.Array(Usuario) },
      },
    },
    async function handler(request, reply) {
      const { nombre, isAdmin } = request.body as Usuario;
      const usuario = { nombre, isAdmin, id_usuario: id_actual++ }; //Con una constante como id, unicamente subiendo, nos aseguramos que cada user tenga un id unico
      usuarios.push(usuario);
      reply.code(201);
      return usuario;
    }
  );
};
