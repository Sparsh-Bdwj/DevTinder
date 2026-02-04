const express = require("express");
const User = require("../models/user");
const { signupValidator } = require("../utils/validator");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// signup controller
authRouter.post("/signup", async (req, res) => {
  try {
    const userData = signupValidator(req);
    const { password } = userData;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashPassword });
    if (!user) {
      throw new Error();
    }
    await user.save();
    res.status(200).send("User created successfully ");
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

// login controller
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Input feild is empty");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isvalidpassword = await user.verifyPassword(password);
    if (!isvalidpassword) {
      throw new Error("Invaid credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token);
    res.status(200).send("login successfull");
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .send("Logout successfull");
});

module.exports = authRouter;
