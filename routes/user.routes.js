const userController = require('../controllers/user.controller');
const { Router } = require('express');
const { userCheck, validateUser, validateUserEdit, validateUserDelete } = require('../middlewares/user.middleware');
const ValidationResult = require('../middlewares/validation-result');
const {
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserByIdValidator
} = require('../middlewares/user.validator');
const jwtverificador = require('../middlewares/user.jwt-verificador');


class UserRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get('/', jwtverificador, userController.getUsers);
        this.router.get('/:id', getUserByIdValidator, jwtverificador, ValidationResult, userController.getUserById);
        this.router.put('/:id', updateUserValidator, jwtverificador, ValidationResult, validateUserEdit, userController.editUser); 
        this.router.delete('/:id', deleteUserValidator, jwtverificador, ValidationResult, validateUserDelete, userController.deleteUser);
    }

}
module.exports = new UserRoutes().router;