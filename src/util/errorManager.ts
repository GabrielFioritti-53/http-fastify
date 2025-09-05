import createError from '@fastify/error';

// Errores de cliente
export const NoEncontradoError = createError('NO_ENCONTRADO', 'El recurso solicitado no fue encontrado', 404);
export const ErrorAutenticacion = createError('ERROR_AUTENTICACION', 'Error de autenticación', 401);
export const ErrorAutorizacion = createError('ERROR_AUTORIZACION', 'No tienes permisos para realizar esta acción', 403);
export const ErrorValidacion = createError('ERROR_VALIDACION', 'Error de validación de datos', 400);
export const ErrorConflicto = createError('ERROR_CONFLICTO', 'Conflicto al procesar la solicitud', 409);

// Errores de servidor
export const ErrorInterno = createError('ERROR_INTERNO', 'Ha ocurrido un error interno en el servidor', 500);
export const ErrorBaseDatos = createError('ERROR_BASE_DATOS', 'Error al interactuar con la base de datos', 500);
export const ErrorServicioNoDisponible = createError('ERROR_SERVICIO_NO_DISPONIBLE', 'El servicio no está disponible', 503);
export const ErrorTiempoAgotado = createError('ERROR_TIEMPO_AGOTADO', 'La solicitud ha excedido el tiempo límite', 504);