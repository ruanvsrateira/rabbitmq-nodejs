const log = require("debug")("api:service");
const amqp = require("amqplib");
const { RABBITMQ_QUEUE_NAME, RABBITMQ_URL } = require("../configs");

class MailService {
  async sendEmail(sender, receiver, title, body) {
    if (!sender || !receiver || !title || !body)
      throw new Error("Invalid arguments");

    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(RABBITMQ_QUEUE_NAME, { durable: false });

      channel.sendToQueue(
        RABBITMQ_QUEUE_NAME,
        Buffer.from(
          JSON.stringify({
            sender,
            receiver,
            title,
            body,
            sended_at: new Date().toLocaleString(),
          })
        )
      );

      return true;
    } catch (err) {
      log(err);
    }
  }
}

module.exports = { MailService: new MailService() };
