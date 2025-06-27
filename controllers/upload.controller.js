const express = require('express');
const path = require('path');
const util = require('util');
const fs = require('fs');
const fileUploader = require('../helpers/file-uploader');
const { isValidObjectId } = require('mongoose');
const userModel = require('../models/user');
const productModel = require('../models/product');
const cloudinaryConfiguration = require('../config/cloudinary');

class uploadController {
    async upload(req = express.request, res = express.response) {
        try {
            const { file } = req.files;
            if (!req.files || Object.keys(req.files).length === 0 || !file) {
                return res.status(400).send('Ningun archivo fue subido.');
            }


            await fileUploader(file);

            res.status(200).json({
                message: 'File updated'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }
    async uploadFileByModel(req = express.request, res = express.response) {
        const { table, id } = req.params;
        const { file } = req.files;
        if (!req.files || Object.keys(req.files).length === 0 || !file) {
            return res.status(400).send('Ningun archivo fue subido.');
        }
        if (!table || !id) return res.status(400).json({
            message: 'Tabla o id incorrecto'
        });
        if (!isValidObjectId(id)) return res.status(400).json({
            message: 'No es un mongo ID correcto'
        });

        try {
            switch (table) {
                case 'users': {
                    const findUser = await userModel.findById(id);
                    if (!findUser) return res.status(400).json({
                        message: 'User not found'
                    });
                    const { fileName, uploadPath } = await fileUploader(file);
                    //uploading to Cloudinary
                    const { secure_url, display_name } = await cloudinaryConfiguration.uploader.upload(uploadPath, {
                        folder: 'uploads'
                    });
                    await userModel.findByIdAndUpdate(id, { img: secure_url });
                    fs.unlinkSync(uploadPath);
                    return res.status(201).json({
                        secure_url,
                        display_name
                    });
                }
                case 'products': {
                    const findProducts = await productModel.findById(id);
                    if (!findProducts) return res.status(400).json({
                        message: 'Product not found'
                    });
                    const { fileName, uploadPath } = await fileUploader(file);
                    //uploading to Cloudinary
                    const { secure_url, display_name } = await cloudinaryConfiguration.uploader.upload(uploadPath, {
                        folder: 'uploads'
                    });
                    await productModel.findByIdAndUpdate(id, { img: secure_url });
                    fs.unlinkSync(uploadPath);
                    return res.status(201).json({
                        secure_url,
                        display_name
                    });
                }

                default:
                    return res.status(400).json({ message: 'Tabla no válida: debe ser "users" o "products"' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }


    }

}

module.exports = new uploadController();