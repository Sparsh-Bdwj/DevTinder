require("dotenv").config();
const mongoose = require("mongoose");

// // now simply connect to the database
// await mongoose.connect(
//   "mongodb+srv://sparshbhardwaj321_db_user:eUrD5WLQXkXkXngG@mongocluster.lwdi3of.mongodb.net/?appName=MongoCluster",
// ); // will this work the answer is no because its a async operation add await
// // now it will work but it this i ideal was no wrap this inside a async funcition to handle connection or error

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

// // now handle connection
// connectDB()
//   .then(() => console.log("connected to db"))
//   .catch((err) => console.log(err.message)); // this should be done in the main file...

// now is this a write behaviour your db is connected after the server start listing to the port this should not happen it's not a good practice first connect to the db if connected then start listning to the server...
// lets do this

module.exports = { connectDB };
