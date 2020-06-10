const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusinessSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    cac_number: {
      type: String,
      required: true,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = Business = mongoose.model('business', BusinessSchema);
