const { check } = require('express-validator');
const createProductValidator = [
    check('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('unitPrice').isNumeric().withMessage('El precio unitario tiene que ser un numero'),
    check('categoryId').isMongoId().withMessage('ID no valido'),
    check('available').isBoolean().withMessage('Available es un booleano'),
    check('userId').isMongoId().withMessage('ID no valido'),
];
const editProductValidator = [
    check('id').isMongoId().withMessage('ID no valido'),
    check('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('unitPrice').isNumeric().withMessage('El precio unitario tiene que ser un numero'),
    check('available').isBoolean().withMessage('Available es un booleano'),
];

const deleteProductValidator = [
    check('id').isMongoId().withMessage('ID no valido'),
];

const getProductValidator = [
    check('id').isMongoId().withMessage('ID no valido'),
];

module.exports = {
    createProductValidator,
    editProductValidator,
    deleteProductValidator,
    getProductValidator
};