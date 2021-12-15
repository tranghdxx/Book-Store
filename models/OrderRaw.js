const mongoose = require("mongoose");

const orderRawSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  total: {
    type: Number,
    required: true,
  },
  shipType: {
    type: String,
    enum: ["standard", "fast"],
    default: "standard",
  },
  orderType: {
    type: String,
    enum: ["COD", "VNPAY"],
    default: "COD",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "packed", "delivered", "success", "cancel"],
    default: "pending",
  },
  isCreatedByAdmin: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order-raws", orderRawSchema);
