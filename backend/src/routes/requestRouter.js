const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user?._id.toString();
    const { status, userId: toUserId } = req.params;
    if (!fromUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (toUserId === fromUserId) {
      return res.status(400).json({
        success: false,
        message: "Can't send a connection request to yourself",
      });
    }
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "request status not allowed" });
    }
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // see for exesting connection between the same users and corner cases
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (connectionRequest.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Connection request already exists" });
    }

    const newConnection = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await newConnection.save();

    return res.status(200).json({
      success: true,
      message:
        status === allowedStatus[0]
          ? `Connection request Ignored`
          : `Connection request sent successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { status, requestId } = req.params;
    const allowedStatus = ["accepeted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "request status not allowed" });
    }
    const request = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    request.status = status;
    await request.save();
    return res.status(200).json({
      success: true,
      message: `User request ${status}`,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = requestRouter;
