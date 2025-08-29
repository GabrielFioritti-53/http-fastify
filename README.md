# Servidor de Usuarios con Fastify

Este proyecto es una API RESTful para gestionar usuarios, construida con Fastify en TypeScript.

## Características

- Crear, leer, actualizar y eliminar usuarios
- Validación de datos con JSON Schema
- Tipado TypeScript
- Filtrado de usuarios por nombre

## Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:

npm install

## Ejecución del Servidor

Para iniciar el servidor en modo desarrollo:

npm run dev

Para compilar y ejecutar en producción:

npm run build
npm start

El servidor estará disponible en: http://localhost:3000

## Endpoints de la API

### Obtener todos los usuarios
GET /usuarios

### Obtener usuarios filtrados por nombre
GET /usuarios?nombre=Jorge

### Obtener un usuario específico por ID
GET /usuarios/:id_usuario

### Crear un nuevo usuario
POST /usuarios
Body: { "nombre": "NuevoUsuario", "isAdmin": false }

### Actualizar un usuario existente
PUT /usuarios/:id_usuario
Body: { "id_usuario": 1, "nombre": "NombreActualizado" }

### Eliminar un usuario
DELETE /usuarios/:id_usuario
Body: { "id_usuario": 1 }

## Ejemplos de uso con curl

### Obtener todos los usuarios
curl http://localhost:3000/usuarios

### Crear un usuario
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Maria", "isAdmin": true}'

### Actualizar un usuario
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"id_usuario": 1, "nombre": "JorgeActualizado"}'

### Eliminar un usuario
curl -X DELETE http://localhost:3000/usuarios/2 \
  -H "Content-Type: application/json" \
  -d '{"id_usuario": 2}'

## Estructura de datos

Los usuarios tienen la siguiente estructura:
{
  id_usuario: number,
  nombre: string,
  isAdmin: boolean
}

## Documentación de la API

Cuando el servidor está ejecutándose, puedes acceder a la documentación automática de la API en:
- http://localhost:3000/documentation (si está configurado fastify-swagger)
- Los esquemas de validación están definidos para cada endpoint

## Dependencias principales

- fastify: Framework web rápido y con baja sobrecarga
- typescript: Lenguaje tipado que compila a JavaScript

## Estructura del proyecto

-src/routes/usuarios.ts
-package.json
-tsconfig.json
-README.md

## Notas importantes

- Los datos se almacenan en memoria (se perderán al reiniciar el servidor)
- Los IDs de usuario se autoincrementan automáticamente
- La validación asegura que los nombres tengan al menos 2 caracteres
- Las operaciones de modificación requieren el ID del usuario

Para cualquier problema, verifica que el servidor esté ejecutándose y que las URLs y cuerpos de las peticiones sean correctos.
