const mongoose = require("mongoose");
const validator = require("validator");
// a validator can be added for isEmail, isStrongPassword, isURL and many others validations

// creating user schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 2 },
    lastName: { type: String },
    email: {
      type: String,
      unique: true,
      validator(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is not real, please enter a valid email");
        }
      },
      required: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Gender is not specified");
        }
      },
    },
  },
  { timestamps: true }, // it add's two feild createdAt and updatedAt
);

// there are following checks into the DB such as required, unique, lowercase, minLength, maxLength, min-max (for numbers), trim, default or we can use validate function valudate(val){} but this function will work on object creation not object upation so make it do show while updadating your doc mark runValidators as true

// creating user model
const User = mongoose.model("User", userSchema);
module.exports = User;
