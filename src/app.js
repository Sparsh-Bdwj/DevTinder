const express = require("express");

const app = express();

app.use("/api", (req, res) => {
  return res.json("This is the api route");
});
app.use("/", (req, res) => {
  return res.json("This is the home route");
});

app.listen(3000, () => {
  console.log("Server is listing on the port 3000");
});

// ^ is used for the minor and patch update
// ~ is used for the patch update only
