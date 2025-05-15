const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  }
}, {
  versionKey: false
});

const categoryModel = mongoose.model('CategoryModel', categorySchema, 'categories');

module.exports = categoryModel;