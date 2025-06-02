const { check,oneOf } = require("express-validator");

const searchTableValidator = [
    check('table').isIn(['products','categories','users']).withMessage('Esa tabla no existe')
];
const searchQueryValidator = [
    oneOf([
        check('query').isMongoId().withMessage('ID no válido'),
        check('query').isString().isLength({min: 3}).notEmpty().withMessage('Parámetro inválido')
    ], 'Debe proporcionar un ID de Mongo válido o un string')
];

module.exports = {
    searchTableValidator,
    searchQueryValidator
};