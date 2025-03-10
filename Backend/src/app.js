const express = require("express");

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("SERVER IS LISTENING TO PORT: 8080");
});

// app.use("/", (req, res) => {
//     res.send("HELLO FROM / ");
//  });

app.use("/api/helloworld", (req, res) => {
  res.send("/API/HELLOWORLD");
});

app.get("/", (req, res) => {
  res.send("GET /");
});

app.use("/api/test", (req, res) => {
  res.send("/API/TEST");
});

app.post("/api/post/data", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
    message: "POST call ok",
    data: req.body,
  });
});

app.get("/api/get/user", (req, res) => {

    console.log(req.query);

  res.json({
    success: true,
    message: "ok",
    data: {
      firstName: "Ameer",
      lastName: "Khan",
    },
  });
});

app.patch("/api/update/user/1", (req, res) => {
  res.json({
    success: true,
    message: "data updated successfully",
  });
});

app.delete("/api/delete/user/1", (req, res) => {
  res.json({
    success: true,
    message: "data deleted successfully",
  });
});

app.get("/api/get/user/:userId", (req, res) => {

    console.log(req.params);

  res.json({
    success: true,
    message: "ok",
    data: {
      firstName: "Ameer",
      lastName: "Khan",
    },
    userId: req.params
  });
});