const mongoose = require("mongoose");

// creating user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});

// creating user model
const User = mongoose.model("User", userSchema);
module.exports = User;
