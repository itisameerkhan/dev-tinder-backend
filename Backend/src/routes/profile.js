import express from "express";
import { userAuth } from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/api/profile", userAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "everything fine",
      user: req.user,
    });
    
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
      error: e.message,
    });
  }
});

export default profileRouter;