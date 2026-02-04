require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/dbConnection.js");
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute.js");
const profileRouter = require("./routes/profileRoute.js");
const requestRouter = require("./routes/requestRouter.js");
const userRouter = require("./routes/userRoute.js");
const app = express();
app.use(express.json()); // middleware to parse data to js object
app.use(cookieParser());

app.use("/api/auth/", authRouter);
app.use("/api/user-profile/", profileRouter);
app.use("/api/request/", requestRouter);
app.use("/api/user/", userRouter);

app.use("/", (req, res) => {
  res.status(500).send(`Internal server error Worng request`);
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
