const { check } = require('express-validator');

const createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('El nombre de la categoria es obligatorio'),

    check('userId')
        .isMongoId().withMessage('ID no válido'),
];

const updateCategoryValidator = [
    check('id').isMongoId().withMessage('ID no válido'),
    check('name').notEmpty().withMessage('La categoria es necesaria')
];

const deleteCategoryValidator = [
    check('id').isMongoId().withMessage('ID no válido')
];


module.exports = {
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator

};