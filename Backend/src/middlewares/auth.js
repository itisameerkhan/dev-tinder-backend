import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      throw new Error("invalid token");
    }

    const decodedObj = jwt.verify(token, "secret-key");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user does not exist");
    }

    req.user = user;
    
    next();

  } catch (e) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error: e.message,
    });
  }
};
