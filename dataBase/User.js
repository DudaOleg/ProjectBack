const {
  Schema,
  model
} = require('mongoose');

const {
  dataBaseName: { USERS },
  userRoles
} = require('../config');

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    trim: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: userRoles.DRIVER,
    enum: Object.values(userRoles)
  }
}, {
  timestamps: true
});

module.exports = model(USERS, userSchema);
