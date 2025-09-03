import type {
  FastifyPluginAsyncTypebox
} from "@fastify/type-provider-typebox";
import type { FastifyInstance, FastifySchema } from "fastify";
import errorSchema from "../../model/sharedmodel.ts";
import { Usuario } from "../../model/usuariosmodel.ts";


export const usuarios: Usuario[] = [
  { id_usuario: 1, nombre: "Jorge", isAdmin: true },
  { id_usuario: 2, nombre: "Alberto", isAdmin: false },
  { id_usuario: 3, nombre: "Juan", isAdmin: false },
];


export const usuarioPostSchema = {
  type: "object",
  properties: {
    nombre: { type: "string", minLength: 2 },
    isAdmin: { type: "boolean" },
  },
  required: ["nombre", "isAdmin"],
  additionalProperties: false,
};
export const usuarioPutSchema = {
  type: "object",
  properties: {
    id_usuario: { type: "number" },
    nombre: { type: "string", minLength: 2 },
  },
  required: ["id_usuario", "nombre"],
  additionalProperties: false,
};
export const usuarioDeleteSchema = {
  type: "object",
  properties: {
    id_usuario: { type: "number" },
  },
  required: ["id_usuario"],
  additionalProperties: false,
};
export const usuarioGetSchema = {
  type: "object",
  properties: {
    id_usuario: { type: "number" },
  },
  required: ["id_usuario"],
  additionalProperties: false,
};

