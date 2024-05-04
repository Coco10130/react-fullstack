const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product.route.js");
const authRouter = require("./routes/auth.route.js");
const todoListRouter = require("./routes/todoList.route.js");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

//middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/todo", todoListRouter);

// default route
app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect("mongodb://localhost:27017/backendDB")
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
