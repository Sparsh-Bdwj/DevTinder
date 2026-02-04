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

const updateFieldValidator = (fields) => {
  const allowedfieldsToUpdate = ["firstName", "lastName", "age", "gender"];
  const isAllowed = Object.keys(fields).every((key) =>
    allowedfieldsToUpdate.includes(key),
  );
  return isAllowed;
};

module.exports = {
  signupValidator,
  updateFieldValidator,
};
