import { Type } from "@fastify/type-provider-typebox";

export const errorSchema = Type.Object({
    statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.String(),
    code: Type.Optional(Type.String()),
});

export default errorSchema;