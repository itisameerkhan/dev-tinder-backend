const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log("SERVER IS LISTENING TO PORT: 8080");
});

app.use((req, res) => {
  res.send("hello from the server");
});



app.get("/api/helloworld", (req, res) => {
    res.json({
        success: true,
        message: "ok"
    })
});

app.use("/api/helloworld",(req, res) => {
    res.send("hello world");
});