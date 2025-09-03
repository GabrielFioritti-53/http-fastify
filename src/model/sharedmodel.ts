import { Type } from "@fastify/type-provider-typebox";

export const errorSchema = Type.Object({
    //statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.Optional(Type.String()),
    code: Type.Optional(Type.Number()),
});

export default errorSchema;