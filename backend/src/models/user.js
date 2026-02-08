const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      enum: {
        values: ["male", 'female', "others"],
        message: `{VALUE}, is not a gender type`,
      },
      // validate(val) {
      //   if (!["male", "female", "others"].includes(val)) {
      //     throw new Error("Gender is not specified");
      //   }
      // },
    },
  },
  { timestamps: true }, // it add's two feild createdAt and updatedAt
);

// schema methods -> these methods are the methods which require user data some how so we get make those methods here
userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.verifyPassword = async function (inputPassword) {
  const isValidpassword = await bcrypt.compare(inputPassword, this.password);
  return isValidpassword;
};

// there are following checks into the DB such as required, unique, lowercase, minLength, maxLength, min-max (for numbers), trim, default or we can use validate function valudate(val){} but this function will work on object creation not object upation so make it do show while updadating your doc mark runValidators as true

// creating user model
const User = mongoose.model("User", userSchema);
module.exports = User;
