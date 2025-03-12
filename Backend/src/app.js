import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log("SERVER IS LISTENING TO PORT: 8080");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.post("/api/user/new", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
    });

    await user.save();

    res.json({
      success: true,
      message: "data created successfully",
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/get/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "data fetched successfully",
      data: users,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/get/user/email", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (user.length > 0) {
      res.json({
        success: true,
        message: "find successfull",
        data: user,
      });
    } else {
      throw new Error("user not found");
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

app.get("/api/get/one/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (user) {
      res.json({
        success: true,
        message: "data fetched successfully",
        data: user,
      });
    } else {
      throw new Error("error");
    }
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

app.get("/api/get/user/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const user = await User.findById(_id);
    res.json({
      success: true,
      message: "success",
      data: user,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

app.delete("/api/delete/user/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params._id);
    if (user) {
      res.json({
        success: true,
        message: "user deletion successfull",
      });
    } else {
      throw new Error("no user found");
    }
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

app.patch("/api/update/user/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params._id, {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
    });
    if (user) {
      res.json({
        success: true,
        message: "user updation successful",
      });
    } else {
      throw new Error("something went wrong");
    }
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
      error: e,
    });
  }
});

app.patch("/api/update/user", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const user = await User.findOneAndUpdate(
      { emailId: email },
      {
        firstName,
        lastName,
      }
    );
    if (user) {
      res.json({
        success: true,
        message: "user updated successfully",
      });
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
});
