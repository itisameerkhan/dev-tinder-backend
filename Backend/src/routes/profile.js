import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { User } from "../models/user.js";
import { validateProfileEdit } from "../utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";

const profileRouter = express.Router();

profileRouter.get("/api/profile/view", userAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: "user login successfull",
      data: req.user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error: e.message,
    });
  }
});

profileRouter.patch("/api/edit/profile", userAuth, async (req, res) => {
  try {
    if (!validateProfileEdit(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      success: true,
      message: "user updated successfully",
    });
    
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error: e.message,
    });
  }
});

profileRouter.patch(
  "/api/profile/update/password",
  userAuth,
  async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      const loggedInUser = req.user;

      const isPasswordValid = await bcrypt.compare(
        password,
        loggedInUser.password
      );

      if (!isPasswordValid) {
        throw new Error("incorrect password");
      }

      const isSamePassword = await bcrypt.compare(
        newPassword,
        loggedInUser.password
      );

      if (isSamePassword) {
        throw new Error("New Password is same as old password");
      }

      if (!validator.isStrongPassword(newPassword)) {
        throw new Error("new password is not strong enough");
      }

      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      console.log(loggedInUser.password);
      loggedInUser.password = newHashedPassword;
      console.log(loggedInUser.password);

      await loggedInUser.save();

      res.json({
        success: true,
        message: "password reset successfull",
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

export default profileRouter;
