const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { updateFieldValidator } = require("../utils/validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send(`User found -> ${user}`);
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }

    if (!updateFieldValidator(req.body)) {
      return res.status(400).json({ message: "These feilds can't be edited" });
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.status(200).json({
      message: "User updated successfully",
      user: loggedInUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/change-password", userAuth, async (req, res) => {
  try {
    if(!req.user){
      return res.status(400).json({message: "Unauthorized"})
    }
    const {oldPassword, newPassword} = req.body;
    const loggedInUser = req.user;
    
    if(!oldPassword && ! newPassword){
      return res.status(401).json({message: "Old password and new password are required"})
    }
    if(newPassword.length < 8) {
      return res.status(400).json({message: "Password must be of 8 characters long"})
    }
    const verifyPassword = await bcrypt.compare(oldPassword, loggedInUser.password);
    if(!verifyPassword){
     return res.status(401).json({message: "Incorrect old password"})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.status(200).json({message: "Password changed successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
})

module.exports = profileRouter;
