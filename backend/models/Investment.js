const mongoose = require('mongoose');

const { Schema } = mongoose;

const InvestmentSchema = new Schema(
  {
    businessOwner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Business'
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    start_date: {
      type: Date,
      required: true,
      trim: true
    },
    end_date: {
      type: Date,
      required: true,
      trim: true
    },
    budget: {
      type: Number,
      required: true
    },
    unitCost: {
      type: Number,
      required: true
    },
    interest: {
      type: String,
      required: true
    },
    investors: [
      {
        investor: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        units: {
          type: Number
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Investment = mongoose.model('investment', InvestmentSchema);
