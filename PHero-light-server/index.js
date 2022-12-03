require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/phero-lms")
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(`DB connection failed becouse ${err.message}`));

app.listen(port, () => console.log(`Server is connected in this ${port} port`));
