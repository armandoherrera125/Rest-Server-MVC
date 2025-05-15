const { Router } = require('express');
const categoryController = require('../controllers/category.controller');
const { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../middlewares/category.validator');
const ValidationResult = require('../middlewares/validation-result');
const jwtverificador = require('../middlewares/user.jwt-verificador');

class CategoryRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get('/', jwtverificador, categoryController.getCategories);
        this.router.post('/', createCategoryValidator, jwtverificador, ValidationResult, categoryController.createCategory);
        this.router.put('/:id', updateCategoryValidator, jwtverificador, ValidationResult, categoryController.editCategory);
        this.router.delete('/:id', deleteCategoryValidator, jwtverificador, ValidationResult, categoryController.deleteCategory);
    }

}

module.exports = new CategoryRoutes().router;