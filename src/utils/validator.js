const validator = require("validator");
const signupValidator = (req) => {
  const { firstName, lastName, email, password, gender } = req.body;
  if (!firstName || !lastName || !email || !password || !gender) {
    throw new Error("Incorrect or missing input feilds");
  } else if (firstName.lastName <= 2) {
    throw new Error("first name should be grater the 2 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Incorrect email entered");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  } else {
    return { firstName, lastName, email, password, gender };
  }
};

module.exports = {
  signupValidator,
};
