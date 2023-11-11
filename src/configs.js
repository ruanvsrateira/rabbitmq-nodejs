const { config } = require("dotenv");

const SERVER_PORT = process.env.SERVER_PORT;
const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASS = process.env.RABBITMQ_PASS;
const RABBITMQ_PORT = process.env.RABBITMQ_PORT;
const RABBITMQ_HOST = process.env.RABBITMQ_HOST;
const RABBITMQ_QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME;

module.exports = {
  SERVER_PORT,
  RABBITMQ_QUEUE_NAME,
  RABBITMQ_URL: `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
};
