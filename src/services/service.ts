import {
    FastifyPluginAsyncTypebox,
    Static,
    Type,
} from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifySchema } from "fastify";
import errorSchema from "../model/sharedmodel";
import { Usuario } from "../model/usuariosmodel";
import { usuarios } from "../routes/usuarios/usuarios-routes";
import { usuarioDeleteSchema } from "../routes/usuarios/usuarios-routes";
import { usuarioGetSchema } from "../routes/usuarios/usuarios-routes";
import { usuarioPostSchema } from "../routes/usuarios/usuarios-routes";
import { usuarioPutSchema } from "../routes/usuarios/usuarios-routes";

let id_actual = usuarios.length + 1;

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

    fastify.put(
    "/usuarios/:id_usuario",
    {
        schema: {
        summary: "Modificar un usuario",
        description: "Esta ruta permite modificar un usuario",
        tags: ["usuarios"],
        body: usuarioPutSchema,
        response: {
            204: Usuario,
            404: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
            },
        },  
        },
    },
    async function handler(request, reply) {
        const { id_usuario, nombre } = request.body as {
        id_usuario: number;
        nombre: string;
        };
      const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario); //Es importante buscar los user por su id pues es el unico elto que es unico por user.
        if (usuarioId === -1) {
        reply.code(404);
        return { error: "Usuario inexistente" }; //Es importante controlar que el id existe para evitar un elto undifined
        } else {
        usuarios[usuarioId].nombre = nombre;
        reply.code(204);
        }
    }
    );

    fastify.delete(
    "/usuarios/:id_usuario",
    {
        schema: {
        summary: "Eliminar un usuario",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        body: usuarioDeleteSchema,
        response: {
            204: Usuario,
            404: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
            },
        },
        },
    },
    async function handler(request, reply) {
        const { id_usuario } = request.body as {
        id_usuario: number;
        };
        const usuarioId = usuarios.findIndex((u) => u.id_usuario === id_usuario);
        if (usuarioId === -1) {
        reply.code(404);
        return { error: "Usuario inexistente" };
        } else {
        usuarios.splice(usuarioId, 1);
        reply.code(204);
        }
    }
    );

    fastify.get(
    "/usuarios/:id_usuario",
    {
        schema: {
        summary: "Obtener un usuario por ID",
        description: "Esta ruta permite eliminar un usuario",
        tags: ["usuarios"],
        params: usuarioGetSchema,
        response: {
            200: Usuario,
            404: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
            },
        },
        },
    },
    async function handler(request, reply) {
        const { id_usuario } = request.params as {
        id_usuario: string;
        };
        const idNumber = parseInt(id_usuario);
        const usuarioId = usuarios.findIndex((u) => u.id_usuario === idNumber);
        if (!usuarioId) {
        reply.code(404);
        return { error: "Usuario inexistente" };
        }
        reply.code(200);
        return usuarios[usuarioId];
    }
    );
};
export default usuariosRoutes;
