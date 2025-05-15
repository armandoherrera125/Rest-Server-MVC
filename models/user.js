const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: function () {
      return !this.google;
    }
  },
  google: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE'
  },
  img: String,
  estado: {
    type: Boolean,
    default: true
  },
}, {
  versionKey: false
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const userModel = mongoose.model('UserModel', userSchema, 'users');

module.exports = userModel;