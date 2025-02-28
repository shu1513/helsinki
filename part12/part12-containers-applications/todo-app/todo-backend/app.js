const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();
console.log("new app");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
