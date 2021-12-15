const mongoose = require("mongoose");

const promotionCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountRate: {
    type: Number,
    min: 0,
    max: 100,
  },
  discountPrice: {
    type: Number,
  },
  description: {
    type: String,
    required: false,
  },
  startAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  },
  usableCount: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("promotion_codes", promotionCodeSchema);
