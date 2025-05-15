/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Endpoints de categorias
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Obtener categorias con filtros opcionales
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
* @swagger
* /api/v1/categories:
*   post:
*     summary: Crear categoria
*     tags: [Category]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               userId:
*                 type: string
*     responses:
*       201:
*         description: Categoria creada exitosamente
*/

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Editar categoria por ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bebidas
 *     responses:
 *       202:
 *         description: Categoria actualizada exitosamente
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Eliminar categoria por ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoria
 *     responses:
 *       202:
 *         description: Categoria eliminada exitosamente
 *       400:
 *         description: Categoria no encontrada
 */