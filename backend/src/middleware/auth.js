const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("User in not allowd to access this URL");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!data) {
      throw new Error("User data not found");
    }
    const user = await User.findById(data._id);
    if (!user) {
      throw new Error("Use not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
};

module.exports = { userAuth };
