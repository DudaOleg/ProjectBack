const {
  Schema,
  model
} = require('mongoose');
const {
  dataBaseName: {
    TOKEN,
    USERS
  }
} = require('../config');

const tokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USERS
  }
}, {
  timestamps: true
});

module.exports = model(TOKEN, tokenSchema);
