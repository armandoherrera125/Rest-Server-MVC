const { Router } = require('express');
const productController = require('../controllers/product.controller');
const jwtverificador = require('../middlewares/user.jwt-verificador');
const ValidationResult = require('../middlewares/validation-result');
const { createProductValidator,
        editProductValidator,
        deleteProductValidator,
        getProductValidator } = require('../middlewares/product.validator');
class ProductRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get('/', ValidationResult, productController.getProduct);
        this.router.get('/:id', getProductValidator, ValidationResult,productController.getProductByID);
        this.router.post('/', jwtverificador, createProductValidator, ValidationResult, productController.createProduct);
        this.router.put('/:id', jwtverificador, editProductValidator, ValidationResult, productController.editProduct);
        this.router.delete('/:id', jwtverificador, deleteProductValidator, ValidationResult, productController.deleteProduct);
    }
}
module.exports = new ProductRoutes().router;