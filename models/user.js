const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = bcrypt.genSaltSync(10); // Use bcrypt.genSaltSync for non-promise version
  this.password = bcrypt.hashSync(this.password, salt);  // Use bcrypt.hashSync for non-promise version
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compareSync(password, this.password);  // Use bcrypt.compareSync for non-promise version
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = mongoose.model('User', UserSchema);