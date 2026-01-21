const express = require("express");
const { connectDB } = require("./config/dbConnection.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "sparsh",
    lastName: "bhardwaj",
    email: "test@123",
    password: "1q2w3e",
    age: 21,
    gender: "Male",
  });
  await user.save();
  res.send("User created successfully ");
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
