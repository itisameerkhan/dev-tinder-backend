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

app.get("/api/get/users", async(req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "data fetched successfully",
      data: users
    })
  } catch(e) {
    console.log(e);
  }
})