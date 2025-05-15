/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtener usuarios con filtros opcionales
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: integer
 *         description: Desde qué número empezar
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limitar cantidad de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
* @swagger
* /api/v1/users/{id}:
*   get:
*     summary: Obtener un usuario por ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del usuario
*     responses:
*       200:
*         description: Usuario encontrado
*       404:
*         description: Usuario no encontrado
*/

/**
* @swagger
* /api/v1/users/{id}:
*   put:
*     summary: Editar usuario por ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del usuario
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - email
*               - password
*             properties:
*               name:
*                 type: string
*                 example: Armando Herrera
*               email:
*                 type: string
*                 example: armando@example.com
*               password:
*                 type: string
*                 example: armando123
*     responses:
*       200:
*         description: Usuario actualizado exitosamente
*       400:
*         description: Error de validación
*       404:
*         description: Usuario no encontrado
*/

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       202:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */ 