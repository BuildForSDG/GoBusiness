const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    auth: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
