/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Endpoints de productos
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtener productos
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */

name, unitPrice, categoryId, available, userId

/**
* @swagger
* /api/v1/products:
*   post:
*     summary: Crear producto
*     tags: [Product]
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
*               unitPrice:
*                 type: number
*               categoryId:
*                 type: string
*               available:
*                 type: boolean
*               userId:
*                 type: string
*     responses:
*       201:
*         description: Categoria creada exitosamente
*/


/**
* @swagger
* /api/v1/products/{id}:
*   put:
*     summary: Editar producto por ID
*     tags: [Product]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del producto
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - unitPrice
*               - available
*             properties:
*               name:
*                 type: string
*                 example: Telefono
*               unitPrice:
*                 type: number
*                 example: 1.25
*               available:
*                 type: boolean
*                 example: true
*     responses:
*       202:
*         description: Producto actualizado exitosamente
*/

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       202:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Producto no encontrado
 */ 

