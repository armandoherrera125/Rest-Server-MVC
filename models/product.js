const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    unitPrice: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel'
    },
    available: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {
    versionKey: false
});

const productModel = mongoose.model('ProductModel', productSchema, 'products');

module.exports = productModel;