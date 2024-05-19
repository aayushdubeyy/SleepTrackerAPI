const express = require("express");
const app = express();
const sleepRoutes = require("./routes/sleep");
const userRoutes = require("./routes/user");

const database = require("./config/database");

database.connect();
app.use(express.json());
app.use("/api/v1/sleep", sleepRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app;
