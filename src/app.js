const { json } = require("body-parser");
const { routes } = require("./routes");
const express = require("express")();

express.use(json());
express.use(routes);

module.exports = { app: express };
