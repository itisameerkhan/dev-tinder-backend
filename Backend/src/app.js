import express from "express";
import { adminAuthFunction, userAuthFunction } from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("SERVER IS LISTENING TO PORT: 8080");
});

app.use("/api/admin", adminAuthFunction);

app.get("/api/admin/get-user", (req, res) => {
  res.send("/api/admin/get-user");
});

app.get("/api/admin/delete-user", (req, res) => {
  res.send("/api/admin/delete-user");
});

app.get("/api/user/create", (req, res) => {
  res.send("user created successfully");
});

app.get("/api/user/login", userAuthFunction, (req, res) => {
  res.send("user login successful");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});
