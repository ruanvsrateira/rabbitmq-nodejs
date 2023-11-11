const { MailService } = require("../services/mail.service");

class MailController {
  constructor() {}

  async sendEmail(req, res) {
    try {
      const { sender, receiver, title, body } = req.body;
      const success = await MailService.sendEmail(
        sender,
        receiver,
        title,
        body
      );
      if (success) {
        return res.status(200).send({ msg: "mail sended successfully" });
      }
      return res.status(400).send({ error: "Message not sended" });
    } catch (err) {
      if (err.message == "Invalid arguments")
        return res.status(400).send({ error: "Invalid Arguments" });
    }
  }
}

module.exports = { MailController: new MailController() };
