const express = require("express");
const cors = require("cors");
const app = express();

// route require are here
const userRouter = require("./routers/user.router");

// middle ware are here
app.use(express.json());
app.use(cors());

// router call are here
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: "server is ready and work perfectly" });
});

module.exports = app;
