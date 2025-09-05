import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { Usuario } from "../../model/usuariosmodel.ts";
import {
  usuarios,
  usuarioGetSchema,
  usuarioPostSchema,
  usuarioPutSchema,
} from "../../services/schemas.ts";
import errorSchema from "../../model/sharedmodel.ts";
import { NoEncontradoError, ErrorValidacion} from "../../util/errorManager.ts";

let id_actual = usuarios.length + 1;

export const usuariosRoutes: FastifyPluginAsyncTypebox = async function (
  fastify,
  options: object
) {
  fastify.get(
    "/", //en vez de params ahora usa querystring *1
    {
      schema: {
        summary: "Obtener todos los usuarios",
        description: "Retorna la lista de usuarios",
        tags: ["listaUsuarios"],
        //params: Type.Pick(Usuario, ["id_usuario"]),
        querystring: Type.Object({
          nombre: Type.Optional(Type.String({ minLength: 2 })),
        }),
        response: {
          //200: Usuario,
          200: Type.Array(Usuario),
          404: NoEncontradoError,
        },
      },
    },
    //sacamos el handler y async no da error por el 200:Type.Array(Usuario)
    async function (request, reply) {
      const query = request.query as { nombre: string };
      if (query.nombre) {
        return usuarios.filter((u) => u.nombre == query.nombre);
      }
      return usuarios;
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear usuario",
        descrption: "Estas ruta permite crear un nuevo usuario. ",
        tags: ["usuarios"],
        querystring: Type.Object({
          nombre: Type.Optional(Type.String({ minLength: 2 })),
        }),
        body: usuarioPostSchema,
        response: {
          201: Usuario,
          400: ErrorValidacion,
        },
      },
    },

    async function (request, reply) {
      const { nombre, isAdmin } = request.body as Usuario;
      const usuario = { nombre, isAdmin, id_usuario: id_actual++ }; //Con una constante como id, unicamente subiendo, nos aseguramos que cada user tenga un id unico
      usuarios.push(usuario);
      reply.code(201);
      return usuario;
    }
  );
  fastify.put(
    "/:id_usuario", //tenia body y le cambie a params *2
    {
      schema: {
        summary: "Modificar un usuario",
        description: "Esta ruta permite modificar un usuario",
        tags: ["usuarios"],
        body: usuarioPutSchema,
        params: Type.Object({
          id_usuario: Type.Number(),
        }),
        response: {
          204: Usuario,
          404: NoEncontradoError,
          },
        },
      },
    async function (request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };
      const { nombre } = request.body as { nombre: string };
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario); //Es importante buscar los user por su id pues es el unico elto que es unico por user.
      if (usuarioId === -1) {
        reply.code(404);
        return NoEncontradoError;
      } else {
        usuarios[usuarioId].nombre = nombre;
        reply.code(204);
      }
    }
  );

  fastify.delete(
    "/:id_usuario", // pasa lo mismo que en el put *2
    {
      schema: {
        summary: "Eliminar un usuario",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        //body: usuarioDeleteSchema,
        params: Type.Object({
          id_usuario: Type.Number(),
        }),
        response: {
          204: Usuario,
          404: NoEncontradoError
          },
        },
      },
    async function handler(request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario);
      if (usuarioId === -1) {
        reply.code(404);
        return NoEncontradoError;
      } else {
        usuarios.splice(usuarioId, 1);
        reply.code(204);
      }
    }
  );

  fastify.get(
    "/:id_usuario",
    {
      schema: {
        summary: "Obtener un usuario por ID",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        params: usuarioGetSchema,
        response: {
          200: Usuario,
          404: NoEncontradoError,
        },
      },
    },
    async function handler(request, reply) {
      const { id_usuario } = request.params as {
        id_usuario: string;
      };
      const idNumber = parseInt(id_usuario);
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === idNumber);
      if (usuarioId === -1) {
        reply.code(404);
        return NoEncontradoError;
      }
      reply.code(200);
      return usuarios[usuarioId];
    }
  );
};
export default usuariosRoutes;

//*1 params se usa para identificar un recurso unico y querystring se usa para filtros y busquedas
//*2 URL(dice que recurso) y body(dice que hacer con el) Put y Delete usa params para el id en lugar de body ya que el id del recuso a modificar va en el URL (segun REST)
