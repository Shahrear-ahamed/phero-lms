const express = require("express");
const cors = require("cors");
const app = express();
const compression = require("compression");

// route require are here
const userRouter = require("./routers/user.router");
const courseRouter = require("./routers/course.router");
const cartRouter = require("./routers/cart.router");
const reviewRouter = require("./routers/review.router");
const paymentRouter = require("./routers/payment.router");
const verifyToken = require("./middlewares/verifyToken");

// middle ware are here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

// router call are here
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", verifyToken, cartRouter);
app.use("/api/v1/review", verifyToken, reviewRouter);
app.use("/api/v1/course", verifyToken, courseRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: "server is ready and work perfectly" });
});

module.exports = app;
