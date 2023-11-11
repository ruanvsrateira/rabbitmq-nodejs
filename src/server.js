const { config } = require("dotenv");

config({
  path: process.env.ENVIRONMENT == "DEVELOPMENT" ? ".env" : ".env.example",
});

const log = require("debug")("api:main");
const { SERVER_PORT } = require("./configs");
const { Consumer } = require("../consumer");
const { app } = require("./app");

try {
  app.listen(SERVER_PORT, () => {
    log(`Server running at port ${SERVER_PORT}`);
    console.log(process.env.ENVIRONMENT);
  });
  Consumer.startConsumer();
} catch (err) {
  log("Error on initialize app.");
}
