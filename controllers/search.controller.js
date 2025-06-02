const express = require('express');
const categoryModel = require('../models/category');
const userModel = require('../models/user');
const productModel = require('../models/product');
const { isValidObjectId } = require('mongoose');

class SearchController {
    async search(req = express.request, res = express.response, next = express.next) {
        const { table, query } = req.params;
        const tableList = ['products', 'users', 'categories'];
        if (!tableList.includes(table)) return res.status(400).json({
            message: 'Esa tabla no existe'
        });
        if (query.length <= 2) return res.status(400).json({
            message: 'Parametro vacio'
        });

        try {
            switch (table) {
                case 'products':
                    if (isValidObjectId(query)) {
                        const product = await productModel.findById(query);
                        if (!product) {
                            return res.status(400).json({
                                message: 'Producto no encontrado'
                            });
                        }
                        return res.status(200).json({
                            product
                        });
                    }
                    const productsList = await productModel.find({ name: { $regex: query, $options: 'i' } }).populate('user category');
                    res.status(200).json({
                        products: productsList
                    });
                    break;
                case 'users':
                    if (isValidObjectId(query)) {
                        const user = await userModel.findById(query);
                        if (!user) {
                            return res.status(400).json({
                                message: 'Usuario no encontrado'
                            });
                        }
                        return res.status(200).json({
                            user
                        });
                    }
                    const usersList = await userModel.find({ name: { $regex: query, $options: 'i' } });
                    res.status(200).json({
                        users: usersList
                    });
                    break;

                case 'categories':
                    if (isValidObjectId(query)) {
                        const category = await categoryModel.findById(query);
                        if (!category) {
                            return res.status(400).json({
                                message: 'Categoria no encontrado'
                            });
                        }
                        return res.status(200).json({
                            category
                        });
                    }
                    const categoriesList = await categoryModel.find({ name: { $regex: query, $options: 'i' } }).populate('user');
                    res.status(200).json({
                        categories: categoriesList
                    });
                    break;

                default:
                    break;
            }
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = new SearchController();