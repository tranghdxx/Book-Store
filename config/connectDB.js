// kết nối CSDL MongoDB
const mongoose = require("mongoose");
const argon2 = require("argon2");
const User = require("../models/User");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logger: true,
      useFindAndModify: false,
    });

    const admin = await User.findOne({ role: "ROLE_ADMIN" });
    if (!admin) {
      const hashPassword = await argon2.hash("123abc@");
      new User({
        name: "ADMIN",
        email: "admin@gmail.com",
        password: hashPassword,
      }).save();
    }
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Cannot connect to MongoDB");
  }
};
