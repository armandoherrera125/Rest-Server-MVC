const express = require('express');
const mongoose = require('mongoose');

const checkMongoId = ( id ) => {
    return mongoose.isValidObjectId(id);
}

const userCheck = ( req =  express.request , res = express.response , next = express.next) => {
    const {id} = req.params;
    const { password } = req.body;
    if (!password || !id || !checkMongoId(id)) return res.status(400).json({
        message: 'Se esperaba un id valido',
    });
    next();
}

const validateLogin = ( req =  express.request , res = express.response , next = express.next ) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        message: 'Falta informacion para iniciar sesion',
    });
    next();
}

const validateUser = ( req =  express.request , res = express.response , next = express.next ) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) return res.status(400).json({
        message: 'Falta informacion para crear el usuario',
    });
    next();
}
const validateUserEdit = ( req =  express.request , res = express.response , next = express.next ) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!checkMongoId(id) || !name || !email || !password) return res.status(400).json({
        message: 'Falta informacion para editar el usuario',
    }); 
    next();
}
const validateUserDelete = ( req =  express.request , res = express.response , next = express.next ) => {
    const { id } = req.params;
    if (!checkMongoId(id) ) return res.status(400).json({
        message: 'Falta informacion para borrar el usuario',
    }); 
    next();
}
module.exports = {
    userCheck,
    validateUser,
    validateUserEdit,
    validateUserDelete,
    validateLogin
}