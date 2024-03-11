const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const { connectDb } = require('./db/db');
const { rootPath } = require("./utils/rootPath");

const { userRoute } = require("./routes/user");
const authRoute = require('./routes/auth');
const homeRoute = require("./routes/home");

// Configs
dotEnv.config({ path: "./config/local.env" });

const app = express();

// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Statics
express.static(path.join(rootPath, "public"))


// Routes
app.use("/", homeRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

// start server
connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`server is running at port: ${process.env.PORT} `))
  })
  .catch(() => process.exit())


