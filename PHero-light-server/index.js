require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.SERVER_DB)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(`DB connection failed becouse ${err.message}`));

app.listen(port, () => console.log(`Server is connected in this ${port} port`));
