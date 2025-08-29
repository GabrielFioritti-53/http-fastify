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

let id_actual = usuarios.length +1;

const usuarioSchema={
  type : "object",
  properties:{
    id_usuario:{type: "number",min:0},
    nombre:{type:"string", minLength : 2},
  },
  required:["id_usuario","nombre"],
  additionalProperties:true
}
const usuarioPostSchema = {
  type: "object",
  properties:{
    nombre:{type:"string", minLength : 2},
    isAdmin: {type:"boolean"}
  },
  required:["nombre","isAdmin"],
  additionalProperties:false
}
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
        response:{
          200:{
            type:"array",
            items : usuarioSchema
          }
        }
      },
    },
    async function handler(request, reply) {
      const query = request.query as { nombre: string };
      if (query.nombre) return usuarios.filter((u) => u.nombre == query.nombre);
      return usuarios;
    }
  );

  fastify.post('/usuarios',{
      schema:{
        summary:"Crear usuario",
        descrption : "Estas ruta permite crear un nuevo usuario. ",
        tags:["usuarios"],
        body:usuarioPostSchema,
        response:{
          201:usuarioSchema
        }
      },
    },async function handler(request,reply){
      const{nombre, isAdmin}=request.body as Usuario;
      const usuario = {nombre,isAdmin,id_usuario: id_actual++ } //Con una constante como id, unicamente subiendo, nos aseguramos que cada user tenga un id unico
      usuarios.push(usuario);
      reply.code(201);
      return usuario;
  })
}
//nose si esta bien ahi o va arriba con const usuarios
//y el problema de la declaracion de ultimoID ni idea


//async function usuariosPost(fastify: FastifyInstance, options: object) {
  
export default usuariosRoutes; 

