var amqp = require("amqplib/callback_api");
const sendsms = require("../sms/sendsms");

function rabbitMQConnect() {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "sms_queue";

      channel.assertExchange(exchange, "fanout", {
        durable: true,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          channel.bindQueue(q.queue, exchange, "");

          channel.consume(
            q.queue,
            function (msg) {
              if (msg.content) {
                let data = JSON.parse(msg.content.toString());
                msgbody = data.msg;
                phonenums = data.phonenumber.toString();
                phonenumsConcat = "+" + phonenums;

                let phoneArr = [];
                phoneArr.push(phonenumsConcat);

                //Send SMS
                sendsms(phoneArr, msgbody);
              }
            },
            {
              noAck: true,
            }
          );
        }
      );
    });
  });
}

module.exports = rabbitMQConnect;
