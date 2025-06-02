const {Router} = require('express');
const searchController = require('../controllers/search.controller');
const { searchTableValidator, searchQueryValidator } = require('../middlewares/search.validator');
const ValidationResult = require('../middlewares/validation-result');
const jwtverificador = require('../middlewares/user.jwt-verificador');

class SearchRoutes {
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get( '/:table/:query', jwtverificador, searchTableValidator, searchQueryValidator, ValidationResult, searchController.search);
    }

}
module.exports = new SearchRoutes().router;