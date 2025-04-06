require("module-alias/register");
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    // Edit Later
    credentials: {
      "Access-Control-Allow-Origin": "*",
    },
  })
);
app.use(require("./middlewares/morgan"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/measurements", require("@/routes/measurements"));
app.use("/tresiba", require("@/routes/tresiba"));

app.use(require("./middlewares/errorHandler"));

const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () =>
  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV.toUpperCase()} mode on port http://localhost:${PORT}`
        .cyan.underline
    )
  )
);
