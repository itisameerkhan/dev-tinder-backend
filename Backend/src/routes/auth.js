import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";

const authRouter = express.Router();

authRouter.post("/api/user/new", async (req, res) => {
  try {
    // validateNewUser(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      phoneNumber,
      skills,
      photoURL,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      skills,
      photoURL,
      phoneNumber,
      password: passwordHash,
    });

    await user.save();

    res.json({
      success: true,
      message: "data created successfully",
    });
  } catch (e) {
    res.status(e.code || 400).json({
      success: false,
      message: "something went wrong",
      error: e.message,
      errorCode: e.code || 400,
    });
  }
});

authRouter.post("/api/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("invalid credentials");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("user not found");
    }

    const isPasswordValid = await user.validatePassword(password);    

    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token);

    res.json({
      success: true,
      message: "login successful",
      token: token,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message || "something went wrong",
    });
  }
});

authRouter.post("/api/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({
      success: true,
      message: "logout successfull",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
      error: e.message,
    });
  }
});

export default authRouter;
