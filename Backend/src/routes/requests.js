import express from "express";
import { userAuth } from "../middlewares/auth.js";
const requestRouter = express.Router();
import { ConnectionRequest } from "../models/connectionRequest.js";
import { User } from "../models/user.js";

requestRouter.post(
  "/api/send-connection-request",
  userAuth,
  async (req, res) => {
    try {
      res.json({
        success: true,
        message: "sending connection request",
      });
    } catch (e) {
      res.json({
        success: false,
        message: "something went wrong",
        error: e.message,
      });
    }
  }
);

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        throw new Error("invalid status type" + status);
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        throw new Error("user not found");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId: fromUserId,
            toUserId: toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("connection request already exists");
      }

      const connectionRequestModel = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestModel.save();

      const message =
        status == "interested"
          ? `${req.user.firstName} is interested in ${toUser.firstName}`
          : `${req.user.firstName} is ignored ${toUser.firstName}`;

      res.json({
        success: true,
        message: message,
        data: data,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "something went wrong",
        error: e.message,
      });
    }
  }
);

export default requestRouter;
