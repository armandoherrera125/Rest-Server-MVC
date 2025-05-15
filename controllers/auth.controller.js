const express = require('express');
const userModel = require('../models/user');
const { checkbcryptPassword, bcryptPassword } = require('../helpers/bcrypt');
const jwtgenerator = require('../helpers/jwtgenerator');
const googleVerify = require('../helpers/google-verify');

class AuthController {

    async login(req = express.request, res = express.response, next = express.next) {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) return res.status(400).json({
                message: 'User not found'
            });
            if (!checkbcryptPassword(password, user.password)) return res.status(400).json({
                message: 'User or password are incorrect'
            });
            const token = jwtgenerator({
                name: user.name,
                email: user.email
            });
            res.status(200).json({
                message: 'ok',
                user,
                token
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            });
        }



    }
    async createUser(req = express.request, res = express.response, next = express.next) {
        const { name, email, password } = req.body;
        try {
            const emailUsed = await userModel.findOne({ email });
            if (emailUsed) return res.status(400).json({
                message: 'Email already in use'
            });
            const bcryptpassword = bcryptPassword(password);
            const createUser = await userModel.create({
                name,
                email,
                password: bcryptpassword,
            });
            const token = jwtgenerator({
                name: createUser.name,
                email: createUser.email
            });
            res.status(201).json({
                message: 'Created',
                createUser,
                token
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
    async googleSignIn(req = express.request, res = express.response, next = express.next) {
        const { id_token } = req.body;

        try {
            const { name, email, picture } = await googleVerify(id_token);

            let user = await userModel.findOne({ email });

            if (!user) {
                // Crear usuario nuevo con cuenta de Google
                user = await userModel.create({
                    name,
                    email,
                    google: true,
                    img: picture,
                    estado: true
                });
            } else {
                // Si ya existe pero no es de Google, rechazar
                if (!user.google) {
                    return res.status(400).json({
                        message: 'Please use your email and password to log in'
                    });
                }
            }

            if (!user.estado) {
                return res.status(401).json({
                    message: 'User is blocked'
                });
            }

            const token = jwtgenerator({
                name: user.name,
                email: user.email
            });

            res.status(200).json({
                message: 'Google sign-in success',
                user,
                token
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Invalid Google token'
            });
        }
    }

}

module.exports = new AuthController();