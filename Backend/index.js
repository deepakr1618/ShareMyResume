const express = require("express");
const app = express();
const authenticationRouter = require("./routes/authenticate");
const getUserRouter = require("./routes/getUser");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyparser.urlencoded({ extend: true }));
app.use(express.json());
mongoose.connect(
  "mongodb+srv://root:<PASSWORD>@cluster0.5e92q.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,Auth-Token"
  );
  next();
});

app.use("/", authenticationRouter);
app.use("/users", getUserRouter);

app.listen(5000, console.log("Started"));
