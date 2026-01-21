const express = require("express");
const { adminAuth } = require("./middleware/adminAuth");

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

// // Params
// app.get("/user/:userName/:userId/:password", (req, res) => {
//   const { userName, userId, password } = req.params;
//   console.log(userName, userId, password);
//   res.send("This is the params");
// });

// // Now let's see multiple route handling
// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("This is the first route handler!!!");
//     // res.send("Response 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("This is second route habdler!!!");
//     // res.send("Response 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("This is third route habdler!!!");
//     res.send("Response 3");
//   }
// );

// Now lets see middleware first why they are neede
// admin -> seeAlldata, setAlldata

// // previously
// app.get("/user/:adminId/seeAlldata", (req, res) => {
//   const { adminId } = req.params;
//   const isAdmin = adminId == "123@";
//   if (!isAdmin) {
//     res.status(401).send("The admin is not authorised");
//   } else {
//     res.status(200).send("This is all the data");
//   }
// });
// app.get("/user/:adminId/setAlldata", (req, res) => {
//   const { adminId } = req.params;
//   const isAdmin = adminId == "123@";
//   if (!isAdmin) {
//     res.status(401).send("The admin is not authorised");
//   } else {
//     res.status(200).send("All the data is set");
//   }
// });

// But the better way of doing the above is to use Middlewares
// app.use("/user/:adminId", (req, res, next) => {
//   const { adminId } = req.params;
//   const isAdmin = adminId == "123@";
//   if (!isAdmin) {
//     res.status(401).send("The admin is not authorised");
//   } else {
//     next();
//   }
// });

// app.post("/user/:adminId/setAlldata", (req, res) => {
//   res.send("All the data is set");
// });
// app.get("/user/:adminId/seeAllData", (req, res) => {
//   res.send("All the data can be seen");
// });

// now there is a more better way then this
app.post("/user/:adminId/setAlldata", adminAuth, (req, res) => {
  res.send("All the data is set");
});
app.get("/user/:adminId/seeAlldata", adminAuth, (req, res) => {
  res.send("All the data can be seen");
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
