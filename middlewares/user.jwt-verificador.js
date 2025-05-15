const jwt = require('jsonwebtoken');
const express = require('express');

const jwtverificador = (req = express.request, res = express.response, next = express.next) => {
    const authHeader = req.headers['authorization']; // nota: lowercase
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'
    if (!token) return res.status(400).json({
        message: 'Falta el token de autorizacion'
    });
    try {
        const decode = jwt.verify( token, process.env.SECRET_KEY);
        console.log(decode);
        next();
    } catch (error) {
        res.status(400).json({
            message: 'El token no es correcto',
            error
        });
    }
    
}

module.exports = jwtverificador;