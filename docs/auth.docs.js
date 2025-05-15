/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/v1/auth/newuser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */

/**
* @swagger
* /api/v1/auth/login:
*   post:
*     summary: Iniciar sesion
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: Usuario registrado exitosamente
*       400:
*         description: Usuario no encontrado
*/

/**
* @swagger
* /api/v1/auth/googleSignIn:
*   post:
*     summary: Crear o loguear usuario con google
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id_token:
*                 type: string
*     responses:
*       200:
*         description: Usuario google creado exitosamente
*       400:
*         description: Token invalido, o usuario deberia de hacer login con email y contrasenia
*       401:
*         description: Usuario bloqueado
*/