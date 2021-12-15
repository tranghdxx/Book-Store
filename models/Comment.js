const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  content: {
    type: String,
    required: true,
  },
  isReply: {
    type: Boolean,
    default: false,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
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

module.exports = mongoose.model("comments", commentSchema);
