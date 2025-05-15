const { Router } = require('express');
const { validateLogin, validateUser } = require('../middlewares/user.middleware');
const authController = require('../controllers/auth.controller');
const ValidationResult = require('../middlewares/validation-result');
const { loginUserValidator, createUserValidator, googleSignIn } = require('../middlewares/user.validator');

class AuthRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post('/newuser', createUserValidator, ValidationResult, validateUser, authController.createUser);
        this.router.post('/login', loginUserValidator, ValidationResult, validateLogin, authController.login);
        this.router.post('/googleSignIn', googleSignIn, ValidationResult, authController.googleSignIn);
    }
}

module.exports = new AuthRoutes().router;