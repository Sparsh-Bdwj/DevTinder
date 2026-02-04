const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_POPULATE_STRING = "firstName lastName age";
userRouter.get("/request-received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age");
    if (connectionRequests.length < 0) {
      return res.status(404).json({
        success: false,
        message: "No requests found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "got all the connection requests",
      requests: connectionRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepeted" },
        { toUserId: loggedInUser._id, status: "accepeted" },
      ],
    })
      .populate("fromUserId", USER_POPULATE_STRING)
      .populate("toUserId", USER_POPULATE_STRING);

    // res.json(connections);
    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    if (!loggedInUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // whey to achive find all the connections requests were loggedin use is invloved
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId");
    const hiddenConnections = new Set();
    connections.forEach((req) => {
      hiddenConnections.add(req.fromUserId.toString());
      hiddenConnections.add(req.toUserId.toString());
    });
    // fetch user which are not in hiddenConnections
    const data = await User.find({
      _id: { $nin: Array.from(hiddenConnections) },
    }).select("firstName lastName age");
    res.json({ success: true, feed: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = userRouter;
