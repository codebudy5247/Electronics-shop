const express = require("express");
var colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
let app = express();

dotenv.config();

//Import routes
const testRouter = require("./routes/test");
const userRoute = require("./routes/userRoutes");

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log(`Database connected!`.green.bold)
);

//Middlewares
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//Middleware for consoling every request
app.use((req, res, next) => {
  console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);
  next();
});

//Route middleware
app.use("/", testRouter);
app.use("/api/user", userRoute);

//Handlebars
const exphbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/",
  })
);
app.set("view engine", "hbs");

//Init App
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Up and running on port ${PORT}`.yellow.bold);
});
