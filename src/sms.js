const dotenv = require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)
const sender = process.env.TWILIO_NUMBER
const destination = process.env.MY_CELL

const sendSMS = msg => {
  client.messages.create({
    body: 'Hi, Mom! I\'m texting you from the computer!',
    from: sender,
    to: destination
   })
  .then(message => console.log(message.sid)).catch(err => console.log(err))
}


