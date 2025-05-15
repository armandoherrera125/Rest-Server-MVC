const { body, param, check } = require('express-validator');

const loginUserValidator = [
    body('email')
        .isEmail().withMessage('El correo no es correcto'),

    body('password')
        .isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'),
];
const googleSignIn = [
    check('id_token').notEmpty().isString().withMessage('Google token invalido')
];

const createUserValidator = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),

    body('email')
        .isEmail().withMessage('El correo no es correcto'),

    body('password')
        .isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'),
];

const updateUserValidator = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('email').optional().isEmail().withMessage('Correo inválido'),
    body('name').optional().notEmpty().withMessage('Nombre no puede estar vacío'),
];

const deleteUserValidator = [
    param('id').isMongoId().withMessage('ID no válido'),
];

const getUserByIdValidator = [
    param('id').isMongoId().withMessage('ID no válido'),
];

module.exports = {
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserByIdValidator,
    loginUserValidator,
    googleSignIn
};