const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const userSchema = new Schema({
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is invalid.']
    },
  password: {
    type: String,
    required: 'Password is required'
  },
  emailVerificationKey: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordKey: {
    type: String
  }
});

userSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setPasswordKey = function() {
  this.resetPasswordKey = User.createKey();
}

const User = mongoose.model('user', userSchema);

User.hashPassword = function(password) {
  return bcrypt.hashSync(password);
}

User.createKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = User;
