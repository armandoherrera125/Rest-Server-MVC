const express = require('express');
const productModel = require('../models/product');
class ProductController {
    async getProduct(req = express.request, res = express.response, next = express.next) {
        try {
            const productList = await productModel.find().populate('user category');
            res.status(200).json({
                message: 'List of products',
                productList
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async getProductByID (req = express.request, res = express.response, next = express.next) {
        const { id } = req.params;
        try {
            const foundProduct = await productModel.findById( id ).populate('user category');
            if (!foundProduct) return res.status(400).json({
                message: 'Product not found'
            });
            res.status(200).json({
                product: foundProduct
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async createProduct(req = express.request, res = express.response, next = express.next) {
        const { name, unitPrice, categoryId, available, userId } = req.body;
        try {
            const product = await productModel.create({
                name,
                unitPrice,
                category: categoryId,
                available,
                user: userId
            });
            res.status(201).json({
                message: 'Product created succesfully',
                product
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    async editProduct(req = express.request, res = express.response, next = express.next) {
        const { name, unitPrice, available } = req.body;
        const { id } = req.params;
        try {
            const product = await productModel.findByIdAndUpdate(id, { name, unitPrice, available }, { new: true }).lean();
            res.status(202).json({
                message: 'Product edited',
                product
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    async deleteProduct(req = express.request, res = express.response, next = express.next) {
        const { id } = req.params;
        try {
            const product = await productModel.findByIdAndDelete(id);
            if (!product) return res.status(400).json({
                message: 'Product not found'
            });
            res.status(202).json({
                message: 'Product deleted',
                product
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = new ProductController();