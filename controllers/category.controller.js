const categoryModel = require("../models/category");
const express = require('express');

class CategoryController {

    async createCategory ( req = express.request, res = express.response, next = express.next ) {
        const { name, userId } = req.body;
        try {
            const newCategory = await categoryModel.create({
                name,
                user: userId
            });
            res.status(201).json({
                message: 'Created',
                newCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async getCategories ( req = express.request, res = express.response, next = express.next ) {
        try {
            const categoriesList = await categoryModel.find().populate('user');
            res.status(200).json({
                message: 'List',
                categoriesList
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async editCategory (req = express.request, res = express.response, next = express.next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updateCategory = await categoryModel.findByIdAndUpdate( id,{
                name
            },{ new: true }).lean();
            res.status(202).json({
                message: 'Category edited',
                updateCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async deleteCategory (req = express.request, res = express.response, next = express.next) {
        try {
            const { id } = req.params;
            const deleteCategory = await categoryModel.findByIdAndDelete( id );
            if (!deleteCategory) return res.status(400).json({
                message: 'Category not found'
            });
            res.status(202).json({
                message: 'Category deleted',
                category: deleteCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = new CategoryController();