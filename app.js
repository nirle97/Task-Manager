const express = require("express");
const app = express();
const ticketsRoute = require("./routes/tickets");
app.use(express.static("client/build"));
app.use("/api/tickets", ticketsRoute);
module.exports = app;
