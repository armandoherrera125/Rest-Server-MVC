const { Router } = require('express');
const uploadController = require('../controllers/upload.controller');
const fileValidator = require('../middlewares/file.validator');
const ValidationResult = require('../middlewares/validation-result');

class uploadRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.post('/', fileValidator,ValidationResult, uploadController.upload);
        this.router.put('/:table/:id', fileValidator, ValidationResult, uploadController.uploadFileByModel);
    }
}

module.exports = new uploadRoutes().router;

