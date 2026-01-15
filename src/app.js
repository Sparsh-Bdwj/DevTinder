const express = require("express");

const app = express();

// playing with the routs
// "?" ->value before it is optional
// "+" -> value before can be added multiple times
// "*" -> any thing can be entered in place of * eg "/a*b" -> /acdefb
// we can aslo do chainig in this with () /a(bc)+d -> /abcbcbcbcd /abcd
// can also use regex
// "/a/" -> any thig can be written in place of a
// "/*fly$" -> anything can be written in the start but must end's with fly

// Now we will params and query

// Query
// app.get("/user", (req, res) => {
//   const { user_id, password } = req.query;
//   console.log(user_id, password);
//   res.send("The query have been accepted");
// });

// Params
app.get("/user/:userName/:userId/:password", (req, res) => {
  const { userName, userId, password } = req.params;
  console.log(userName, userId, password);
  res.send("This is the params");
});

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
