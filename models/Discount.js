const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
  discountRate: {
    type: Number,
    min: 0,
    max: 100,
  },
  discountPrice: {
    type: Number,
    // required: true,
  },
  applyFor: {
    type: String,
    enum: ["all", "category", "subcategory", "brand"],
    default: "all",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: () => this.applyFor === "category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
    required: () => this.applyFor === "subcategory",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: () => this.applyFor === "brand",
  },
  startAt: {
    type: Date,
    default: new Date(),
  },
  endAt: {
    type: Date,
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

module.exports = mongoose.model("discounts", discountSchema);
