const express = require("express");
const { connectDB } = require("./config/dbConnection.js");
const User = require("./models/user.js");
const { signupValidator } = require("./utils/validator.js");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json()); // middleware to parse data to js object

// add user data to data base
// signup controler
app.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "amit",
  //   lastName: "jaat",
  //   email: "test@123",
  //   password: "1q2w3e",
  //   age: 21,
  //   gender: "Male",
  // });
  // const user = new User({ ...req.body });
  // till now we were not handling the requests in porper order let do so
  try {
    // 1-> validate req.body
    const userData = signupValidator(req);
    // 2-> hash the password
    const { password } = userData;
    const hashPassword = await bcrypt.hash(password, 10);
    // 3-> store it into the db
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
// login controler
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Input feild is empty");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    console.log(user);
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      throw new Error("Invaid credentials");
    }
    res.status(200).send("login successfull");
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

// get a single user from the db
app.get("/user", async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(404).send("email not found");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("user with this email don't exists");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});
// get a user feed from the db
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("something went wrong");
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

// deleting a user by it's ID
app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      res.status(404).send("no userId is beign passed");
    }
    // const userDeleted = await User.findByIdAndDelete({_id: userId})
    await User.findByIdAndDelete(userId);
    res.status(200).send("user deleted successfully, user details ");
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

// updating a existing user
app.patch("/user", async (req, res) => {
  const { userId, userLastName, gender, email } = req.body;
  try {
    // this is a api level senitation
    if (email) {
      throw new Error("can't update email");
    }
    if (!userId || !userLastName) {
      res.status(404).send("User Id or update feild is missing");
    }
    await User.findByIdAndUpdate(
      userId,
      {
        lastName: userLastName,
        gender: gender,
      },
      { runValidators: true, returnDocument: "after" }, // runValidators inables to apply validate fn with patch, put request, and retrunDocument returns the doc before or after the operation
    );
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send(`error message: ${error.message}`);
  }
});

app.use("/", (err, req, res) => {
  console.log(err);
  res.status(500).send("Internal server error");
});

connectDB()
  .then(() => {
    console.log("Connected to the DB");
    app.listen(3000, () => {
      console.log("Server is listing on the port 3000");
    });
  })
  .catch((err) => {
    console.log("can't connect to DB");
    console.log(err.message);
  }); // this is the perfect way of doing things

// ^ is used for the minor and patch update
// ~ is used for the patch update only
