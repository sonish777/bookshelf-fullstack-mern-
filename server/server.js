process.on("uncaughtException", (err) => {
  console.log("--------UNCAUGHT EXCEPTION---------");
  console.log(err);
  process.exit();
});

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);

const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.static("client/build"));

mongoose.connect(
  config.DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log("DB CONNECTED");
  }
);

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log("----------UNHANDLED REJECTION----------");
  console.log(err);
  process.exit();
});

// console.log(lkajsdf);
