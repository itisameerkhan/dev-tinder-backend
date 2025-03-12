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
    const user = new User(req.body);

    await user.save();

    res.json({
      success: true,
      message: "data created successfully",
    });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      res.json({
        success: false,
        message: "user already exists, duplicate insertion",
      });
    } else {
      res.status(e.code || 400).json({
        success: false,
        message: "something went wrong",
        error: e.message,
        errorCode: e.code || 400,
      });
    }
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
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "age",
      "gender",
      "photoURL",
      "about",
      "skills",
      "phoneNumber",
    ];

    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("updation not possible")
    }

    const user = await User.findByIdAndUpdate(req.params._id, req.body, {
      returnDocument: "after",
      runValidators: true,
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
      message: e.message || "something went wrong",
      error: e || "no error found",
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

app.delete("/api/delete/user", async (req, res) => {
  try {
    const user = await User.deleteOne({ emailId: req.body?.emailId });

    if (user.deletedCount > 0) {
      res.json({
        success: true,
        message: "user deletion successful",
      });
    } else {
      throw new Error("something went wrong");
    }
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

app.delete("/api/delete/users", async (req, res) => {
  try {
    const user = await User.deleteMany({ emailId: req.body?.emailId });

    if (user.deletedCount > 0) {
      res.json({
        success: true,
        message: "user deletion successful",
      });
    } else {
      throw new Error("something went wrong");
    }
  } catch (e) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

app.get("/api/exists/user", async (req, res) => {
  try {
    const user = await User.exists({ emailId: req.body?.emailId });
    console.log(user);

    if (user) {
      res.json({
        success: true,
        message: "user exists",
        data: user,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});
