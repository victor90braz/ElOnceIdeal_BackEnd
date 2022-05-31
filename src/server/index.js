const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const { notFoundError, generalError } = require("../middlewares/errors");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
