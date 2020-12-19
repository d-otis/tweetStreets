const nodemailer = require('nodemailer')
// const dotenv = require('dotenv').config();
const dotenvMe = require('./env.util')

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USR_FROM,
    pass: process.env.EMAIL_APP_PWD
  }
})

const mailOptions = {
  from: process.env.GMAIL_USR_FROM,
  to: process.env.GMAIL_USR_TO,
  subject: `Test Subject @ ${Date.now()}`,
  text: 'i"m oing a crossword puzzle'
}

mail.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Email sent: ' + info.response)
  }
})