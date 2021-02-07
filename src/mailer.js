const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })
const { formattedTweets } = require('./util')

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USR_FROM,
    pass: process.env.EMAIL_APP_PWD
  }
})

const sendMail = tweets => {

  const recipients = process.env.GMAIL_USR_TO.split(",")

  const mailOptions = {
    from: process.env.GMAIL_USR_FROM,
    to: recipients,
    subject: `PhilaStreets Tweets`,
    text: formattedTweets(tweets)
  }

  mail.sendMail(mailOptions, (err, info) => {
    console.log(`Sending email with ${tweets.length} tweets.`)
    console.log(err ? err : `Email sent: ${info.response}`)
    console.log("====================================")
  })
}

module.exports = sendMail