// models/user.model.js

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


UserSchema.methods.generateAuthToken = function (mykey) {
  const token = jwt.sign(
    { _id: this._id, username: this.username, emailaddress: this.emailaddress },
    mykey , 
    { expiresIn: '3d' } 
  );
  return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
