const express = require("express");
//const sendSMS = require("./sms/sendsms");
const amqpconnect = require("./rabbitmq/rabbitmq");

const app = express();

module.exports = function smsServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // TODO: Incoming messages route
  app.post("/incoming-messages", (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    res.sendStatus(200);
  });

  // TODO: Delivery reports route
  app.post("/delivery-reports", (req, res) => {
    const data = req.body;
    console.log(`Received report: \n ${data}`);
    res.sendStatus(200);
  });

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`App running on port: ${port}`);
  });
};

//RabbitMq server
amqpconnect();
