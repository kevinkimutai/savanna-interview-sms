const AfricasTalking = require("africastalking");

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: "USE YOUR AFRICASTALKING APIKEY",
  username: "sandbox",
});

module.exports = async function sendSMS(phonenum, msg) {
  // TODO: Send message
  try {
    const result = await africastalking.SMS.send({
      to: phonenum,
      message: msg,
      from: "60001",
    });
    console.log(result);
    console.log(result.SMSMessageData.SMSMessageData.Recipients);
  } catch (ex) {
    console.error(ex);
  }
};
