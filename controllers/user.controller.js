const express = require('express');
const userModel = require('../models/user');
const { bcryptPassword, checkbcryptPassword } = require('../helpers/bcrypt');
const jwtgenerator = require('../helpers/jwtgenerator');

class UserController {

    async getUsers(req = express.request, res = express.response, next = express.next) {
        const { start = 0, limit = 5 } = req.query;
        try {
            const usersList = await userModel.find().skip(start).limit(limit);
            const totalUsers = await userModel.countDocuments();
            res.status(200).json({
                message: 'List of Users',
                list: usersList,
                total: totalUsers
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                error: error.message
            });
        }

    }

    async getUserById (req = express.request, res = express.response, next = express.next) {
        const { id } = req.params;
        try {
            const user = await userModel.findById( id );
            if (!user) return res.status(400).json({
                message: 'User not found'
            });
            res.status(200).json({
                message: 'Found',
                user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    async editUser(req = express.request, res = express.response, next = express.next) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const bcrypt = bcryptPassword(password);
            const editUser = await userModel.findByIdAndUpdate(id, { name, email, password: bcrypt }, { new: true }).lean();
            if (!editUser) return res.status(400).json({
                message: 'That user does not exist'
            });
            res.status(201).json({
                message: 'Edited correctly',
                userChange: editUser
            });
        } catch (error) {
            res.status(500).json(
                {
                    message: 'Server error',
                    error: error.message
                }
            );
        }


    }

    async deleteUser(req = express.request, res = express.response, next = express.next) {
        const { id } = req.params;
        try {
            const userDeleted = await userModel.findByIdAndDelete(id);
            if (!userDeleted) return res.status(404).json({
                message: 'User not found'
            });
            res.status(202).json({
                message: 'User deleted',
                userDeleted: userDeleted,
            });
        } catch (error) {
            res.status(500).json(
                {
                    message: 'Server error',
                    error: error.message
                }
            );
        }

    }
}

module.exports = new UserController();