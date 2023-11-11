const { Router } = require("express");
const { MailController } = require("./controllers/mail.controller");

const routes = Router();

routes.post("/send-email", MailController.sendEmail);

module.exports = { routes };
