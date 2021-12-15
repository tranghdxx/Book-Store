const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "appointment", "success", "cancel"],
    default: "pending",
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

module.exports = mongoose.model("contacts", contactSchema);
