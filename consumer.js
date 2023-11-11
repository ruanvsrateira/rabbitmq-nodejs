const log = require("debug")("api:system");
const amqp = require("amqplib");
const { RABBITMQ_QUEUE_NAME, RABBITMQ_URL } = require("./src/configs");

class Consumer {
  async startConsumer() {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();

      process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });

      await channel.assertQueue(RABBITMQ_QUEUE_NAME, { durable: false });
      await channel.consume(
        RABBITMQ_QUEUE_NAME,
        (message) => {
          if (message) {
            log("new message:", JSON.parse(message.content.toString()));
          }
        },
        { noAck: true }
      );

      log("System ready to receive new messages");
    } catch (err) {
      console.warn(err);
    }
  }
}

module.exports = { Consumer: new Consumer() };
