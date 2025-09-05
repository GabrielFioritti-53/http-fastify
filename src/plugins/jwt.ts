import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyJwtNamespace, FastifyJWTOptions } from "@fastify/jwt";

export default fastifyPlugin(async function (fastify) {
    const secret = process.env.FASTIFY_SECRET;
    const jwtOptions : FastifyJWTOptions = {
        secret: secret || "" 
    }

    fastify.register(fastifyJwt, jwtOptions);
});

declare module "fastify" {
    interface FastifyInstance extends
    FastifyJwtNamespace<{namespace: "security"}>{

    }
}

/* 
async (request, reply) => {
    const payload : Usuario = { 
    id: 1,
    nombre: "Franco",
    isAdmin: true,
    }

    const 

*/

    