import express from "express";
import { userAuth } from "../middlewares/auth.js";
const requestRouter = express.Router();

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
export default requestRouter;
